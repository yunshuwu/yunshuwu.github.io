#!/usr/bin/env python3
"""Check rendered site metadata, local links/resources, anchors and navigation.

Usage: python3 scripts/check_site.py _site [--baseurl /repository]
Only Python's standard library is required. External URLs are not fetched.
"""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links = path, set(), []
        self.current, self.metadata = [], set()
        self.title = False
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                raise ValueError(f"{self.path}: duplicate id {attrs['id']}")
            self.ids.add(attrs["id"])
        if tag == "title":
            self.title = True
        if tag == "meta":
            self.metadata.add(attrs.get("name", attrs.get("property")))
        if attrs.get("aria-current") == "page":
            self.current.append(attrs.get("href"))
        for key in ("href", "src", "poster"):
            if attrs.get(key):
                self.links.append(attrs[key])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site", type=Path)
    parser.add_argument("--baseurl", default="")
    args = parser.parse_args()
    root = args.site.resolve()
    if not (root / "index.html").is_file():
        parser.error("Build the Jekyll site first: no index.html found")
    pages = {p.resolve(): Page(p) for p in root.rglob("*.html")}
    errors = []
    count = 0
    for path, page in pages.items():
        # Only layout-rendered pages, not unrelated static HTML assets.
        if "main-content" not in page.ids:
            continue
        if not page.title or not {"description", "og:title", "og:image", "og:url", "twitter:card"} <= page.metadata:
            errors.append(f"{path}: missing page title or sharing metadata")
        if len(page.current) != 1:
            errors.append(f"{path}: expected one active navigation link, got {page.current}")
        for link in page.links:
            parsed = urlsplit(link)
            if parsed.scheme or parsed.netloc:
                continue
            target_path = unquote(parsed.path)
            if target_path.startswith("/"):
                if args.baseurl and not (target_path == args.baseurl or target_path.startswith(args.baseurl + "/")):
                    errors.append(f"{path}: missing baseurl: {link}")
                    continue
                target_path = target_path[len(args.baseurl):].lstrip("/")
                target = root / target_path
            elif target_path:
                target = path.parent / target_path
            else:
                target = path
            if target.is_dir():
                target /= "index.html"
            target = target.resolve()
            count += 1
            if not target.is_file():
                errors.append(f"{path}: missing local target: {link}")
            elif parsed.fragment and target in pages and unquote(parsed.fragment) not in pages[target].ids:
                errors.append(f"{path}: missing anchor: {link}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} HTML pages; {count} local links/resources and anchors; metadata and active navigation.")


if __name__ == "__main__":
    main()
