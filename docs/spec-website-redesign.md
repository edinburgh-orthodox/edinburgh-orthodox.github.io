# Website Redesign: Current Site and Remaining Work

> **Status (October 2026).** The Hugo site is built and live at
> https://edinburgh-orthodox.github.io/. A merge into `main`
> publishes it. The production domain move and the end of the WordPress subscription are
> tracked in issues #9 and #32.

## What Is Live

The site is a static Hugo build in `edinburgh-orthodox/`. These pages are published:

| Page | What a visitor finds |
|------|----------------------|
| Home | Welcome, the week's services, announcements, church cards, recent news, and a history summary |
| Our Churches | The three buildings, their addresses, descriptions, map links, and the school link |
| Clergy | The bishop and clergy, with email addresses and phone numbers |
| News | All posts newest first, and individual posts with photographs and galleries |
| Contact | The committee, secretary, and treasurer, plus a link to the clergy |
| Donations | The Square giving link, a Show bank details button, and the charity number |
| Catechesis | Classes and how to join them |
| Confessions | Walk-in times and how to make an appointment |
| History | The community's story since 1948 |
| Other Communities | Communities of the Ecumenical Patriarchate in Scotland and the north of England |

On wide screens the header carries Our Churches, Donate, Clergy, News, and Contact. The More
drawer holds Catechesis, Confessions, Other Communities, History, and Orthodox School; on
smaller screens it holds every link. The FAQ content exists, but the page is still a draft and
is not published. There is no Wishlist, bookstore, or Magazine page.

The footer repeats the menu links and shows the contact email, the charity number, and the
constitution.

### The homepage

The homepage shows, in order:

1. A short welcome with the archdiocese and patriarchate names.
2. Weekly Services, with a location for every service and the fasting and feast notes.
3. Announcements.
4. Our Churches, with a Google Maps link for each building and a link to the full page.
5. Recent News, with the three newest posts.
6. Our History, with a short summary and a link to the full page.

The week comes from a sample in `data/services.yaml`. The homepage says the website is a work
in progress and information may not be up to date. The copy-this-week button does not exist
yet.

### What is not live yet

- The live services calendar and the copy-this-week button.
- The Wishlist and the bookstore honesty box.
- The FAQ page.
- The newsletter and the Mailchimp connection.
- The quick links at the top of the homepage.
- Automatic posting to WhatsApp, Facebook, and email.
- The domain move and the end of the WordPress subscription.

## The Original Brief

The old WordPress site opened with a banner and a row of icons, and the things people needed
most were hidden or spread across other pages. The redesign set out to lead with the week's
services, put the churches and news on the homepage, give history its own page, and make
giving clearer.

The full list of needs is in issue #1. The homepage, churches, clergy, news, contact,
catechesis, confessions, history, and donations parts of that brief are live. The rest is
still open.

## Remaining Work

- **The weekly services and announcements.** The pages still use one sample week in
  `data/services.yaml` and the announcement strings in `data/announcements.yaml`. Issue #1
  covers the original calendar plan. Issue #41 proposes Sveltia CMS instead, so that editors
  can change the week through a form at `/admin/` and open a pull request. If #41 is accepted,
  it replaces the Google Calendar plan in the original brief.
- **The Wishlist and bookstore.** The data and the page sections are prepared, but both are
  commented out until the Square checkout is confirmed. See issue #8.
- **The FAQ page.** The content is in `content/faq.md` with `draft = true`. See issue #6.
- **The newsletter and posting.** The copy button, Mailchimp, and automatic posting are not
  built. The current weekly post examples are in `examples/`.
- **The domain and WordPress.** The Hugo site is live on GitHub Pages. The domain move and
  the WordPress cancellation are tracked in issues #9 and #32.

Still to decide:

- Whether the services file stays one week or becomes a normal week plus exceptions.
- The final symbol for wine and oil, fish, and fast-free days. The markers are currently
  removed; the fasting notes remain as text.
- The wishlist items and prices.
- The FAQ questions and answers.

## How the Site Works

- Pages are Markdown files in `edinburgh-orthodox/content/`.
- The weekly services, announcements, churches, wishlist, and FAQ are lists in
  `edinburgh-orthodox/data/`.
- Templates are in `edinburgh-orthodox/layouts/`, and the styling is in
  `edinburgh-orthodox/assets/css/`.
- A pull request builds the site with `.github/workflows/hugo.yml`. A merge into `main`
  publishes it with `.github/workflows/pages.yml`.
- Editors currently need Git access. The CMS in issue #41 is meant to remove that need.

## Design Reference

The live site is the reference for how the site looks and works. The original design files are
in `mockups/`. They include pages and variants that are not live, such as the Wishlist, the
FAQ, the card-style homepage, and the bookstore section. Where a feature is not built, the
live navigation and homepage differ from the mockups. `mockup-changes.md` records the styling
changes.

## How We Check It

- The pull request workflow builds the site, so a broken template or data file cannot be
  merged.
- A person checks each change against the live website by hand.
- For each remaining item, the check is whether a normal visitor can do the thing without any
  special access.

## Not In This Project

- Automatic posting to Facebook and WhatsApp. The copy button and Mailchimp come first.
- Working out the fasting calendar from scratch. The site shows what the church-year file
  says, and the editor confirms it.
- The daily scripture readings, the Tone, or the Eothinon.
- The final symbol for each fasting level.
- Writing the FAQ questions and answers, or choosing the final wishlist items.
- Editing through the WordPress admin. The WordPress site is retired after the domain moves.

## Extra Notes

- The hand-made weekly post examples are in `examples/`: `example-cal-post.md` for the
  calendar and announcements, and `example-text-post.md` for announcements on their own.
- The Donate button is a single Square link. The Wishlist would add a way to give toward
  specific items.
- The bank details on the Donations page are behind the Show bank details button. The values
  are the ones currently on the page.
