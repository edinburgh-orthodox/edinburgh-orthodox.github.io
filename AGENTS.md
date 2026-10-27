# AGENTS.md: Edinburgh Orthodox Website Project

## Repo purpose

This repo holds the website of the Orthodox Community of St Andrew, Edinburgh, plus the
plans and tickets for it. The site is a static Hugo build in `edinburgh-orthodox/`. The
plans are the proposal, the spec, the tickets, and the visual mockups at the repo root.

The site used to run on WordPress.com. It is being retired: the Hugo site is live on GitHub
Pages now, and the WordPress subscription should stop once the domain points here (see issues
#32 and #9). Do not plan new work in the WordPress admin.

## The website

- **Engine:** Hugo (extended), pinned to version `0.165.0` in `.github/workflows/`. Source
  lives in `edinburgh-orthodox/`.
- **Build:** `hugo --source edinburgh-orthodox --minify`
- **Preview:** `hugo server --source edinburgh-orthodox`, then http://localhost:1313/
- **Deploy:** a merge into `main` publishes the site. `.github/workflows/pages.yml` builds it
  and deploys the artifact to GitHub Pages at
  https://edinburgh-orthodox.github.io/edinburgh-orthodox.org.uk/ .
  `.github/workflows/hugo.yml` builds every pull request.
- **Rules on `main`:** pull requests only, squash merges only, one approval, no self-approval.
  Repository admins can bypass the review rule when there is no other reviewer.
- **Production domain:** https://edinburgh-orthodox.org.uk (registration and DNS move are
  tracked in issue #9).
- **Identity:** Orthodox Community of St Andrew, Edinburgh; Archdiocese of Thyateira and Great
  Britain; charity **SC054378**.
- **External integrations:** Square (donations and the wishlist), Mailchimp (newsletter and
  contact form), Google Calendar (where the schedule is meant to live; the homepage does not
  read it yet).

## Where things live in the Hugo site

- `edinburgh-orthodox/content/` - one Markdown file per page, front matter in TOML (`+++`).
  A page with `layout = "..."` uses the matching template in `layouts/`.
- `edinburgh-orthodox/content/news/` - news posts, one file or page bundle each.
  `draft = true` keeps a post out of the published build.
- `edinburgh-orthodox/data/` - the structured content: `services.yaml`, `announcements.yaml`,
  `churches.yaml`, `wishlist.yaml`, `faq.yaml`.
- `edinburgh-orthodox/layouts/` - templates, including the header, footer, and news list
  partials.
- `edinburgh-orthodox/assets/css/` - SCSS partials, imported by `main.scss`. The design
  follows the mockups in `mockups/` at the repo root.
- `hugo.toml` - site title, parameters, permalinks, and the navigation menu. Navigation links
  are defined once, in `menus.main`; a link with no page yet points at `#` and carries a TODO.

## Facts an agent needs that the site config won't tell it

- A merge into `main` is a deployment. There is no separate publish step and no undo for a
  live page, so check the build before asking for a merge.
- Hugo excludes `draft = true` pages from the production build, so unfinished content can sit
  in `main` safely.
- `lefthook.yml` runs `hugo --source edinburgh-orthodox --minify --cleanDestinationDir` before
  every commit.
- The site is public. Never commit personal data, and treat contact details and the charity
  number as high risk.
- Two places are knowingly unfinished: `data/services.yaml` holds a sample week and the
  homepage still says the calendar is edited in Google Calendar, and `data/faq.yaml` waits on
  the bishop's approval. Issues #1 and #32 cover finishing them.

## Priorities

- Broken or outdated information (service times, clergy, donation details) before cosmetic or
  SEO polish.
- Any change touching charity identity, donation details, or contact info is high-risk. Be
  exact, and add a comment on the ticket noting it needs the site owner's confirmation.

## Writing style

- The proposal, spec, `CONTEXT.md`, and ADRs are read by non-technical people who edit the
  site. Write them in plain, friendly English.
- No em-dashes (use a comma, full stop, or "and"). No arrows like `→`. No jargon unless the
  person needs it, and explain it when you use it.

## Agent skills

### Issue tracker

Issues live in the repo's GitHub Issues (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Defaults kept: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` at the root plus `docs/adr/`. See `docs/agents/domain.md`.
