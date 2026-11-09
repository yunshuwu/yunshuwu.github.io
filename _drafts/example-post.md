---
layout: post
nav: blog
content_id: example-post
title: "Draft / example: writing a research post"
slug: example-post
date: 2000-01-01
updated: 2000-01-02
description: "Local preview example only. Replace all sample content and dates before publication."
tags: [example, draft]
math: true
paper_ids: []
# paper: https://example.org/paper
# twitter: https://x.com/your-account/status/your-post-id
# linkedin: https://www.linkedin.com/posts/your-post-id
# image: /assets/img/your-share-image.png
---

This is an **example draft**, not a real research announcement. Its dates are sample values. It appears only when you explicitly preview drafts.

## Markdown and media

- Write posts in Markdown.
- Keep the original `date` when editing; change only `updated`.
- Add related paper IDs and social post URLs in the front matter.

> A quotation or a short observation can go here.

```python
print("A reproducible research note")
```

### Images and GIFs

Use the same Liquid path filter for either file type. This existing template image illustrates the syntax:

![Example template image]({{ '/assets/img/teaser_example.png' | relative_url }})

### Mathematics

An inline formula: $$E = mc^2$$.

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### Video

For your own video, add an HTML `<video controls preload="metadata">` with a source path passed through `relative_url`. For hosted video, use the provider's embed URL in an `<iframe title="Descriptive video title" loading="lazy" allowfullscreen>`.

No example video is embedded because none has been supplied.
