# Yunshu Wu · Academic Homepage

基于 [Minimal Light](https://github.com/yaoyao-liu/minimal-light) 的 Jekyll 多页面个人学术主页。页面组织参考 [Yushun Dong 的主页](https://yushundong.github.io/)，保留本站的简洁字体与配色。

| 栏目 | URL | 内容来源 |
| --- | --- | --- |
| Home | `/` | `index.md`、`_data/news.yml`、`_data/publications.yml` 中的精选论文 |
| Publications | `/publications/` | `_data/publications.yml` |
| Projects | `/projects/` | `_data/projects.yml`，资源链接从论文数据读取 |
| Blog | `/blog/` | `_posts/YYYY-MM-DD-slug.md` |
| Talks | `/talks/` | `_data/talks.yml` |
| Service | `/service/` | `_includes/services.md` |

`_data/navigation.yml` 定义六项顶部导航；`_layouts/homepage.html` 是共用布局；`_layouts/post.html` 负责全文；`assets/css/content.scss` 集中管理新增样式。没有新增运行时框架或 Jekyll 插件。首页不再展示完整履历，也不包含 Education。

### 首页与研究系列

首页只展示 About Me、Research Interests、最近最多五条 News，以及 Selected Publications（DSL NeurIPS 2026 Poster、DSL-LLaDA EMNLP 2026 Findings、DSL NeurIPS 2025 Workshop）。`_data/news.yml` 优先展示三篇 DSL 相关论文，其余新闻由新到旧维护；只知道年份时使用 `year`，有确切日期时可使用 `date`，不推断月份或日期。超过五条的新闻自动放进原生 `<details>` 折叠区。

在 `_data/projects.yml` 添加研究系列，并在其 `projects` 列表添加项目：

```yaml
- id: research-series
  title: Research Series
  description: "研究系列简介"
  projects:
    - id: my-project
      title: "项目名称"
      paper_id: stable-paper-id
      description: "项目的简短说明"
      featured: false
```

`paper_id` 关联论文的稳定 `id`，项目自动读取其真实 Paper、Code、Blog、Talk 和社媒链接。项目入口为 `/projects/#project-my-project`，系列入口为 `/projects/#series-research-series`。首页精选论文改由 `_data/publications.yml` 的 `selected: true` 管理，与 Projects 页的系列组织分开维护。论文的 `page` 可指向对应项目入口。新增配图或 GIF 时在论文记录中填写 `image`，使用真实资源路径；缺图不占空列。

## 内容维护

所有栏目沿用 Minimal Light 的字体、颜色和自动深色模式，不需要新增 Jekyll 插件。普通页面共享顶部导航与个人信息侧栏；博客全文隐藏侧栏，提供最多 760px 的阅读宽度。当前没有提供真实博客和报告，因此正式页面显示空状态；`_drafts/example-post.md` 仅供本地草稿预览，不在正常构建中发布。

顶部导航的太阳／月亮按钮可手动切换浅色和深色，选择保存在浏览器本地，刷新与跨页后保持。尚未手动选择时，`auto_dark_mode: true` 跟随系统主题；设为 `false` 时默认浅色，仍可手动切换。

### 本地预览与构建

安装 Ruby 和 Bundler 后运行：

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1
# http://127.0.0.1:4000/

# 仅本地查看明确标记的示例草稿
bundle exec jekyll serve --drafts --host 127.0.0.1
# http://127.0.0.1:4000/blog/example-post/

# 正式构建与本地链接检查（Python 3 标准库，无额外依赖）
bundle exec jekyll build --strict_front_matter
python3 scripts/check_site.py _site

# 验证 GitHub Pages 项目子路径
bundle exec jekyll build --baseurl /preview --destination /tmp/minimal-light-preview
python3 scripts/check_site.py /tmp/minimal-light-preview --baseurl /preview
```

`_config.yml` 中 `url` 必须改成自己的站点域名（不含路径和末尾 `/`）；当前留空，等待你的真实域名。使用仓库项目路径时设置 `baseurl: "/repository-name"`，独立域名或用户主页使用 `baseurl: ""`。模板的站内链接均使用 `relative_url`，canonical 和社交预览使用 `absolute_url`。更新部署配置后重启 Jekyll。此任务只准备本地版本，不自动部署。

### 新增 Markdown 博客

新建 `_posts/YYYY-MM-DD-your-slug.md`，例如以下**未发布的格式示例**（请替换日期、标题、摘要和正文）：

```yaml
---
content_id: my-research-note # 全站唯一，后续不改
slug: my-research-note      # URL 为 /blog/my-research-note/，后续不改
layout: post
nav: blog
title: "文章标题"
date: 2000-01-01            # 示例：首次发布日期，请替换
# updated: 2000-01-02       # 示例：实际修订时再添加
description: "文章简短摘要"
tags: [research]
paper_ids: []               # 如 [contrastive-diffusion-loss]，仅关联确实相关的论文
# paper: https://example.org/paper # 可选：未在本站列出的论文
# twitter: https://x.com/your-account/status/your-post-id
# linkedin: https://www.linkedin.com/posts/your-post-id
# image: /assets/img/share-image.png
math: true
---
```

`title`、`date`、`description` 和 `content_id` 为维护时应填写的字段；`updated`、`tags`、`paper_ids`、`paper`、`twitter`、`linkedin`、`image` 可省略。`date` 是首次发布日期，后续修改保持不变，仅填写或更新 `updated`；二者在文章页和分享元数据中分别展示。博客列表按 `date` 倒序，不按 `updated` 排序。首页不展示博客列表。文件名日期也应与 `date` 一致。原生 Jekyll 的 `id` 已有内部用途，博客的稳定关联标识因此命名为 `content_id`。使用 `published: false` 或放入 `_drafts/` 保留未发布内容。未来日期的文章默认不发布。

正文支持 Markdown 标题、列表、引用、代码围栏和图片。图片和 GIF 使用：

```liquid
![图片说明]({{ '/assets/img/your-image.gif' | relative_url }})

<video controls preload="metadata" aria-label="视频说明">
  <source src="{{ '/assets/video/your-video.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/video/your-video.mp4' | relative_url }}">下载视频</a>
</video>

<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="视频说明" loading="lazy" allowfullscreen></iframe>
```

数学公式使用 `$$E=mc^2$$`（行内，不独占一行）和 `$$ ... $$`（独立公式）。`math: true` 时按需加载固定版本 MathJax；首次渲染需要网络。设置 `math: false` 可禁用。长文限制阅读宽度，代码、表格和长公式支持横向滚动，媒体宽度适配手机。

### 新增报告

仅维护 `_data/talks.yml`，把初始空列表 `[]` 替换为记录列表。以下为**格式示例，不代表真实经历**：

```yaml
- id: my-talk                 # 全站唯一，后续不改
  title: "报告标题"
  event: "活动或主办机构"
  date: "2000-01-01"           # 示例日期，请替换；统一使用带引号的 YYYY-MM-DD
  location: "Online"           # 或真实城市、会场
  description: "可选简介"
  published: false            # 准备好真实内容后删除本行或改为 true
  paper_ids: []                # 可填 publications.yml 中已有 id
  post_ids: []                 # 可填博客的 content_id
  # slides: /assets/files/my-slides.pdf
  # video: https://example.org/video
  # paper: https://example.org/paper
  # project: https://example.org/project
  # twitter: https://x.com/your-account/status/your-post-id
  # linkedin: https://www.linkedin.com/posts/your-post-id
```

`id`、`title`、`date` 应填写，其余字段可省略；缺失的简介、地点、主办方或链接不显示。所有正式记录只在 Talks 页按报告日期倒序、按年份分组；首页不展示报告列表。`published: false` 的记录在所有页面隐藏；未来日期报告如需暂不展示，也设置此字段。稳定入口为 `/talks/#talk-my-talk`。`post_ids` 会同时在报告处显示博客链接、在关联博客顶部显示报告链接。

### 论文与社媒链接

已有论文仍由 `_data/publications.yml` 的 `main` 列表管理，图片（包括 GIF 动画）、标题、作者、会议、备注和原有 Paper/Code/Project/BibTex 链接保持支持（数据中的 `pdf` 字段仍兼容）。新增可选字段：

```yaml
id: stable-paper-id            # 永久标识，入口为 /publications/#paper-stable-paper-id
conference_year: 2000          # 示例：真实会议年份；与 conference 文本保持一致
first_public_date: "1999-12-01" # 示例：真实首次公开日期，不从会议年份推测
contribution: "可选核心贡献"
blog: /blog/my-research-note/  # 可选：手动指定站内或外部博客
talk: /talks/#talk-my-talk     # 也可用外部链接
twitter: https://x.com/your-account/status/your-post-id
linkedin: https://www.linkedin.com/posts/your-post-id
```

博客或报告的 `paper_ids` 引用论文 `id` 后，会自动建立双向链接：文章/报告链接回论文，论文条目显示相关 Blog/Talk。不需要再手动重复填写 `blog` 或 `talk`；这两个字段适合外部内容或手动覆盖用途（若重复填写会同时展示）。所有 ID 建议仅用小写字母、数字与连字符，不含空格。

`twitter` 与 `linkedin` 填的是**具体帖子 URL**，不是账号主页；填写你实际发布的帖子，留空则隐藏。文章顶部和论文/报告条目会直接展示这些帖子链接。左侧个人账号仍在 `_config.yml` 的 `twitter`、`linkedin` 中配置。论文首次公开日期、会议年份、博客首次发表和更新日期、报告日期各自独立维护，切勿相互推算。

### 当前个人内容来源与待补充项

主页内容来自 `Yunshu_resume.pdf`，Google 任职与 video agents 方向来自本次明确说明。简历仅作为本地内容来源，不提供 CV 入口，原始简历和模板 CV 文件均已排除在网站构建之外；博士经历写为 “Ph.D. research”，未据预计毕业时间推断学位已经授予。未在简历中提供的个人 GitHub、Twitter/X、LinkedIn、Analytics ID 已留空，头像仍是原模板占位图。`url` 留空，部署前填写真实域名。

论文列表保留了简历提供的论文、作者与有效 URL，不添加不存在的配图、代码链接或首次公开日期。简历未列作者的三篇 COLM workshop 论文不补写作者；“Agents Learn From What They Cannot Predict” 的 PDF 注释实际是标题文本，不是可用 URL，因此暂不添加论文链接。

DSL 按本人更新拆分为 NeurIPS 2026 Poster（https://arxiv.org/abs/2602.16169）与 NeurIPS 2025 FPI Workshop（https://openreview.net/forum?id=y4gmj1Gwpl）两个独立条目，保留 `discrete-stochastic-localization` 为主会议版本 ID，workshop 使用 `discrete-stochastic-localization-workshop`。NeurIPS 2026 Poster 状态由本人确认；OpenReview 页面受浏览器验证限制，workshop 沿用原作者信息。DSL-LLaDA 更新为 EMNLP 2026 Findings，标题及作者顺序据 ACL Anthology（https://aclanthology.org/2026.findings-emnlp.2101/）同步，保留本人提供的共同一作标记。三篇 DSL 论文置于完整列表与 News 顶部，并全部加入首页精选；Multiverse Mechanica 保留在完整列表，不加入精选。AAAI 2026 两篇保持简历中的 submitted 状态，不当作已录用。三篇 COLM workshop 论文缺少完整作者列表，待补充。

Blog 和 Talks 尚无真实内容，保持空列表；示例博客仅供草稿预览。侧栏不展示任职机构或工作方向；网页描述和分享预览也不关联 Google 与 video agents。首页 About Me 正文由本人手动维护。


## License and theme credit

Based on [Minimal Light](https://github.com/yaoyao-liu/minimal-light), [pages-themes/minimal](https://github.com/pages-themes/minimal), [orderedlist/minimal](https://github.com/orderedlist/minimal), and [al-folio](https://github.com/alshedivat/al-folio). See `LICENSE` for the original CC0 license.


### Selected Publications 配图草稿

论文记录添加 `selected: true` 即出现在首页，复用完整论文页的展示组件。`image` 填站内图片路径，`image_alt` 填图片说明。当前 DSL 图片复制自本地 `dsl-project-page/assets/state_space_static.png`，保存在 `assets/img/publications/dsl-state-space.png`；不依赖项目仓库的本地路径。DSL 的 `page` 指向真实项目页 https://yunshuwu.github.io/dsl-project-page/。后续可替换为论文动画或其他真实代表图。DSL-LLaDA 已加入首页精选，配图来自共同作者主页 https://fengsxy.github.io/assets/img/dsl_llada.png，保存在 `assets/img/publications/dsl-llada.png`；两个 DSL 版本共用 DSL 系列示意图。缩略图使用 fengsxy.github.io 的 `<abbr class="badge">` 结构，在相对定位的图片容器内叠加紫底白字会议标签（top: 8px, left: 16px），显示会议与年份，`conference_badge` 可覆盖默认的 `conference_short` + `conference_year`，用于明确区分 Findings 和 Workshop。


### 侧栏联系方式

侧栏按 Email、Twitter、LinkedIn、GitHub、Google Scholar 顺序展示文字标签。Email 使用 `_config.yml` 的 `email`，填写正常邮箱地址，自动生成 `mailto:` 链接；其他四项分别使用 `twitter`、`linkedin`、`github_link`、`google_scholar`。未提供真实账号时只显示不可点击的标签，不生成通用平台首页或猜测账号。CV 不在侧栏展示，`Yunshu_resume.pdf` 和模板 `assets/files/curriculum_vitae.pdf` 均在 `exclude` 内，保持本地源文件不会随网站发布。


### 全部论文配图

Publications 中的全部 14 个条目均有左侧配图，首页仍只精选三篇 DSL 论文。CDL、Less is More、Semisort、TENALIGN、Measurement-Aligned Flows、Spectral Regularization 的图片直接截取自对应论文 PDF 中的图（分别为图 1、1、2、1、1、1）；Semisort 使用作者公开版本 https://www.cs.ucr.edu/~yihans/papers/2023/SPAA23/semisort.pdf，其余来源为各条目的论文 URL。图像保存在 `assets/img/publications/`，无需外部图片服务。

Multiverse Mechanica、PersonaEval、MicroVerse、Synthetic Persona Grounding 的 OpenReview PDF 当前无法下载，暂使用按题目和已有研究简介绘制的原生 SVG 主题示意图；Agents Learn From What They Cannot Predict 没有公开 PDF，也使用 SVG 示意图。这五张图明确包含 “Concept illustration”，不代表论文实验结果，可随时替换成正式配图。未录用稿件的图片标签使用 Preprint 或 Manuscript，不把投稿会议显示成录用会议。


### 2025 DSL workshop 原版存档

- 独立页：`/publications/discrete-stochastic-localization-2025-workshop/`。
- 托管 PDF：`/publications/discrete-stochastic-localization-2025-workshop/NIPS25_39_Discrete_Stochastic_Localiz.pdf`；原文件仍保留在 `publications/`。两者 SHA-256 均为 `81c41e52470d46220478f5e1e2c66dc7b5d0203ffd912322b4c073b64bc5c5a8`，1,476,147 字节，19 页，有可提取文字，不加密。
- 标题、5 位作者与完整摘要来自作者提供的原版 PDF，集中维护于 `_data/papers/dsl_workshop_2025.yml`。原 workshop 条目误列的 Partha Thakuria 已按原版删除，2026 条目和项目页链接保留。发表时间仅记录 `2025`，不采用 PDF 创建时间或网站上传时间。
- workshop 正式名称依据官方征稿页 https://fpineurips.framer.website/call_for_papers ，为 “Frontiers in Probabilistic Inference: Sampling Meets Learning”。该页链接到 NeurIPS 2025 FPI OpenReview venue。原始论文链接 https://openreview.net/forum?id=y4gmj1Gwpl 仍保留；本次直接读取 forum/PDF 遭遇浏览器验证，公开 API 返回 403，因此未完成 OpenReview 论文记录交叉核验。
- 正文、BibTeX 和 `citation_*` 标签由 Jekyll 输出为静态 HTML；JavaScript 只增强复制按钮。`citation_publication_date` 是 `2025`，作者每人独立一项。PDF 位于论文页同目录。
- 原项目无 sitemap 文件或插件配置；新增原生 Liquid/Jekyll `sitemap.xml`，自动列出使用 layout 的页面、文章和论文数据中的 PDF。`robots.txt` 允许抓取并声明 sitemap，不引入额外插件或上传日期。
- **生产地址待确认**：`_config.yml` 的 `url` 仍为空。需要填写实际 origin，并按部署位置设置 `baseurl`；`absolute_url` 将同时生成 citation PDF URL、canonical、sitemap 和 robots 的绝对地址。不能将当前相对 URL 视为已满足生产抓取配置。项目中已有的 `https://yunshuwu.github.io/` 本次匿名访问返回 404，故未据此猜测站点域名。
- 本地验证：Jekyll 严格 front matter 构建、`scripts/check_site.py`、静态 head 标签/摘要/版本链接检查、sitemap XML 解析、PDF 字节比对通过。另使用 `https://example.invalid` 和 `/preview` 的临时配置测试部署路径与绝对链接；此域名仅用于本地验证，不写入生产配置。
- 未部署本次修改，也未验证新增页面/PDF 的线上匿名访问、服务器响应头或 Google Scholar 收录。实际域名和部署确认后，还需检查生产页面与 PDF 返回 200、无登录要求和 `X-Robots-Tag: noindex`，并确认生产构建的引用地址。
