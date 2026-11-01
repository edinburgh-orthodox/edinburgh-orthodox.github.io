# Edinburgh Orthodox Site

The Hugo source for https://edinburgh-orthodox.org.uk. It replaces the WordPress.com site,
which is retired once the domain moves (issue #9). Content changes are made here, not in a
WordPress admin.

## Development

From the repository root:

```sh
hugo server --source edinburgh-orthodox
```

Open `http://localhost:1313/`. The workflows pin Hugo (extended) version `0.165.0`, so match
that if a build behaves differently on your machine.

## Build and deploy

```sh
hugo --source edinburgh-orthodox --minify
```

The generated static site is written to `edinburgh-orthodox/public/`, which is not committed.
Deployment is automatic: merging into `main` runs `.github/workflows/pages.yml`, which builds
the site and publishes it to GitHub Pages. Every pull request runs
`.github/workflows/hugo.yml`, which builds the site and nothing else. The pre-commit hook in
`lefthook.yml` runs the same build.

## Search

The top bar has a search button that opens a Pagefind dialog. Pagefind reads the finished site
in `public/` and writes a search index to `public/pagefind/`, so both workflows run it straight
after the Hugo build:

```sh
npx -y pagefind@1.6.0 --site edinburgh-orthodox/public
```

Nothing runs on a server. Visitors download the index and the search happens in the browser,
which is why it works on the free GitHub Pages and Cloudflare Pages plans.

The index is not part of `hugo server`, so search cannot work in the normal preview. To try it
locally, build to disk and let Pagefind serve the result:

```sh
hugo --source edinburgh-orthodox --minify -d edinburgh-orthodox/public
npx -y pagefind@1.6.0 --site edinburgh-orthodox/public --serve
```

Open `http://localhost:1414/`. Bump the Pagefind version in both workflows together when you
upgrade it, and keep the pin in the two places in step.

## Add a news post

Add a Markdown file directly under `content/news/`, with TOML front matter:

```toml
+++
title = "Parish feast"
date = 2026-09-02
description = "An optional short summary."
draft = false
+++

Write the post here using Markdown.
```

The filename becomes the URL. For example, `parish-feast.md` is published at
`/news/parish-feast/`. Hugo excludes `draft = true` posts from the published build, so a draft
can sit in `main` safely.

For a post with photographs, make a folder of the same name and put the post in it as
`index.md`, next to the images. Then reference them by filename:

```
content/news/parish-feast/
├── index.md
└── procession.jpg
```

```markdown
![The procession leaving Chapel Street](procession.jpg)
```

## Edit site pages

Most pages are plain Markdown files under `content/`:

- `content/clergy.md`
- `content/contact.md`
- Future pages such as `content/history.md`

Structured information is kept in `data/` when a layout needs it:

- `data/churches.yaml` supplies the homepage and Our Churches page.
- `data/services.yaml` supplies the weekly services. It currently holds a sample week.
- `data/announcements.yaml` supplies the weekly announcements.
- `data/wishlist.yaml` supplies wishlist names and prices.
- `data/faq.yaml` supplies the FAQ questions and answers.

Navigation links are defined once in `hugo.toml` under `menus.main`. A link whose page does
not exist yet carries a `TODO` comment in `hugo.toml` and points at `#`; create the page, then
swap the placeholder URL for a `pageRef`.
