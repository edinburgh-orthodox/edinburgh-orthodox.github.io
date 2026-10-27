# Website Redesign: What We Want To Do

> **Where this stands (September 2026).** This spec was written for the WordPress site. The
> redesign is now built as a static Hugo site in `edinburgh-orthodox/`, and a merge into
> `main` publishes it. Where the text below says a change is made "in the WordPress admin",
> read that as a change to the files in this repository. The needs and the decisions are
> otherwise unchanged. See `docs/adr/0002-hugo-static-site.md`.

## The Problem

Right now the website (https://edinburgh-orthodox.org.uk) shows the wrong things first.
The homepage opens with a big banner and a row of icons, while the things people actually
need, like this week's service times, how to donate, and how to find the churches, are
hidden in the menu or buried on separate pages.

There is no live calendar of services on the front page. There is no FAQ page. There is no
way for people to give money toward specific items for the new church. The community's
history takes up room on the homepage when it should have its own page. And the volunteers
who update the schedule each week have to type it out again by hand every time they post it
to WhatsApp, Facebook, and email.

## What We Want

Redesign the website we already have. The site is built, as a static Hugo site in this
repository. The pages are Markdown files, the weekly services and the announcements are short
lists in `data/`, and the styling is in `assets/css/`. Changing the site means editing those
files, and anyone can preview a change on their own machine before it goes live.

The homepage becomes live and useful, in this order from top to bottom:

1. The community name and a small bit of branding.
2. Quick links to the most popular pages (service times, find us, donate, newsletter).
3. The services calendar for this week.
4. A "weekly announcements" text block.
5. The three churches and their addresses.
6. Blog posts about past events.
7. Links to History, Wishlist, FAQ, and Donations.

The calendar itself is kept in Google Calendar. Volunteers edit it there, without needing to
log in to WordPress. Each week starts from a set of default services, and fasting notes and
feast names are filled in from a church-year calendar file. A new Wishlist page lets people
give money toward specific items for the new church. A new FAQ page answers common questions.
The Donations page is tidied up.

Two changes from today are important:

- Each service is labelled with where it is held: Meadow Lane, Chapel Street, or Craigmillar
  Park, so people go to the right building.
- The schedule editor can press a button to copy the week as ready-to-paste text for
  WhatsApp, Facebook, and email, instead of retyping it.

## The List of Needs

This is the full list of what different people need the website to do.

1. As someone who attends, I want to see this week's services and times on the homepage, so I know when to come without digging through menus.
2. As someone who attends, I want to see where each service is held (Meadow Lane, Chapel Street, or Craigmillar Park), so I go to the right building.
3. As a first-time visitor, I want quick links to services, find us, donations, and contact at the top of the page, so I can find what I need in one tap.
4. As a first-time visitor, I want an FAQ page grouped by topic, so I can find answers without emailing anyone.
5. As someone who donates, I want the community's history on its own page, so the homepage is not cluttered by it.
6. As someone thinking of supporting the new church, I want to see a wishlist of items with set prices, so I know exactly what the community still needs.
7. As someone who donates, I want to pick one or more wishlist items and pay the combined total in one go, so giving is easy and I can support specific items.
8. As the treasurer, I want to see which wishlist items received money, so I can report on and allocate the gifts.
9. As someone who attends, I want to see the fasting note on each calendar day (strict fast, wine and oil, fish, or normal), so I can keep the fast correctly.
10. As someone who attends, I want to see the day's feast or commemoration name on the calendar, so I know what the day is.
11. As the schedule editor, I want the usual weekly services (Matins, Vespers, Supplicatory Canon, weekend Divine Liturgy) filled in automatically, so I do not type them every week.
12. As the schedule editor, I want to change a single week when something special happens (a weekday Liturgy, a feast-day change, an evening talk), so unusual weeks are easy to set without touching the normal pattern.
13. As the schedule editor, I want to edit the calendar in Google without any WordPress login, so I, a volunteer, can update it from my phone.
14. As the schedule editor, I want to write the weekly announcements in the same place I edit the week, so the calendar and announcements stay together.
15. As the schedule editor, I want Fr Luke's Sunday catechesis to appear every week in the calendar, so it is always shown without being added by hand each time.
16. As the schedule editor, I want things that do not happen every week (Bishop Raphael's talks, Wednesday confessions) listed in the announcements, not the calendar, so the calendar does not claim a service is happening when it is not.
17. As the schedule editor, I want a "copy this week as text" button, so I can paste the calendar and announcements into WhatsApp, Facebook, and email without retyping.
18. As a member of the public, I want the weekly post to reach me on WhatsApp in the community announcements channel, so I stay informed where I already read.
19. As a member of the public, I want the weekly post to appear on our Facebook page, so the public schedule is visible there too.
20. As a newsletter subscriber, I want the weekly post sent to me by email, so I receive the schedule without visiting the site.
21. As a first-time visitor, I want the three churches' addresses and map links at the bottom of the homepage, so I can find the right place.
22. As a regular attendee, I want blog posts about past events kept below the calendar and announcements, so the homepage leads with what is happening now, not what already happened.
23. As the person updating the website, I want a simple picture of how each redesigned page should look, so I know what to build before I start.
24. As the site owner, I want the donations page presented more clearly, so giving feels prominent and trustworthy.

## Decisions We Have Made

Here are the decisions already agreed, in plain terms.

- **We stay where we are, and the site is ours.** The redesign keeps the same site, the same
  address, and the same content. It is built as a static Hugo site in this repository instead
  of being edited inside the WordPress admin, so the WordPress.com subscription can stop
  (ADR-0002). The people who update the week edit a short list of services and the
  announcements text, and the site rebuilds itself when the change is merged.

- **The calendar lives in Google Calendar.** It is shown on the homepage. Volunteers edit it
  in Google. They do not need any WordPress or website account. The homepage does not read it
  yet: the week is currently typed into `edinburgh-orthodox/data/services.yaml` (issue #1).

- **One shared "week" is the heart of it.** The weekly pattern, the special changes for a week, and the announcements block are all part of one thing, and everything else (the calendar, the copy button, the fasting notes) uses that same week. The details:
  - The normal week is: Weekday Matins at 7.30am; Weekend Matins at 8.30am followed by Divine Liturgy at 10.00am; Vespers at 6.30pm every day; Supplicatory Canon on Monday at 7.00pm (after Vespers, to the Mother of God); Fr Luke's Catechesis on Sunday at 4.00pm.
  - Special changes for one week: a weekday Liturgy (either Matins 5.45am and Liturgy 7.00am, or Matins 8.30am and Liturgy 10.00am), a feast-day change, or an evening talk (before or after Vespers).
  - The announcements block is text only, on the same page under the calendar, edited by the same person. It holds the things that do not happen every week (Bishop Raphael's talks, Wednesday confessions) and any upcoming events.

- **Every service is labelled with its building.** There is one calendar showing all three places: Meadow Lane, Chapel Street, and Craigmillar Park. Each service says where it is. The three addresses and map links are listed at the bottom of the homepage.

- **Fasting notes and feast names are filled in from a church-year file, then checked by the editor.** The file covers 1 Sep 2026 to 31 Aug 2027. It is used only for the fasting note and feast name, never for the service times themselves. The file uses five fasting levels:
  - Strict fast (95 days)
  - Wine and oil allowed (49 days)
  - Fish allowed (32 days)
  - Fast free (31 days)
  - Fast day, dairy, eggs, and fish allowed (7 days, the Cheesefare week)
  - The exact symbol or picture to show for each level is still to be decided, except strict fast, which is shown as a cross on red.

- **The wishlist.** Fixed-price items for the new church, with the prices kept in a separate list. In Square, a single checkout page can list several items, and the person picks what they want and pays one combined total. Square reports which items were given to. If that proves awkward, the simple fallback is one Square link per item.

- **The top of the homepage.** Quick links to service times, find us, donate, newsletter, and contact. This list is our own choice of what matters most, not based on website statistics.

- **Posting to WhatsApp, Facebook, and email.** We do it in stages. First, a "copy this week" button that puts the week into plain text ready to paste anywhere. Then, a send through Mailchimp for email. Then, later, automatic posting to Facebook and WhatsApp.

- **The FAQ page.** A page grouped by topic. We set up the structure now and write the questions and answers later.

- **Pictures of how it should look.** See the "Visual design" section below for the live site and the summary of styling changes.

## Visual design

The design was worked out page by page before the site was built:

**https://edinburgh-orthodox.github.io/edinburgh-orthodox.org.uk/**

The mockup files have since been removed. The styling lives in
`edinburgh-orthodox/assets/css/`, and a page-by-page summary of the styling changes is in
`mockup-changes.md`; the main points are below.

### The pages

- The homepage.
- Our Churches, one block per building.
- Giving toward items for the new church.
- Frequently asked questions.
- Giving, including the bookstore honesty-box.
- The priests who serve the community.
- Community news posts, newest first.

### Header (every page)

- One row header with the round church logo next to the site title, and the nav on the right.
- The visible nav links are: Our Churches, Donate, Wishlist, Clergy, News, FAQ.
- The rest (Confessions, Magazine, History, and the Orthodox School) live in a side drawer
  that slides in over the right side of the page when the burger is clicked. On small
  screens the drawer holds every link.

### Homepage

- Introduction block: "Welcome to St Andrew's Orthodox Church - Archdiocese of Thyateira
  and Great Britain. All are welcome!", with a large drop capital.
- Weekly Services is the first block: the full week of services with locations and fasting
  symbols, in a centred column.
- Announcements below the calendar.
- Our Churches: three cards linking to each building's page and Google Maps.
- Our history: a short summary with a "find out more" link.
- Recent news: the latest posts with dates and an "All news" link.

### Card variant (cards.html)

An alternative homepage where the whole Weekly Services block sits inside one wide card and
Announcements becomes a title with a card per announcement.

### Donations page

- A giving section with the charity number and two buttons side by side: "Donate now" and
  "Show bank details" (which reveals sort code, account, and reference).
- Bookstore (honesty box): a cart where you add books by Title, Price, and Number, and it
  totals what you owe. "Choose your books, how many of each, and donate."
- Give toward something specific, at the bottom, points to the Wishlist.

### Things deliberately removed from the homepage

- The large banner and row of icons that currently lead the page.
- The full history paragraph (moved to its own section and page).
- The hidden menu that buries the main links.

## How We Will Check It Is Done

Every change is checked by a person, by hand, against the live website. The build itself is
checked automatically: the workflow in `.github/workflows/hugo.yml` builds the site on every
pull request, so a broken template or a bad data file cannot be merged.

For each item in the list of needs above, the check is: can a normal visitor actually do the thing it describes, by looking at the live site, without any special access.

The one thing to check carefully is that the week stays consistent: the same services, times, fasting notes, and announcements must show up on the homepage, in the copy-for-posting text, and in the correct order and place.

## Not In This Project

These things are deliberately not part of this project:

- Automatic posting to Facebook and WhatsApp. We do the copy button and Mailchimp first.
- Working out the fasting calendar from scratch. The website just shows what the church-year file says and the editor confirms it.
- Showing the daily scripture readings, the Tone, or the Eothinon.
- Deciding the final symbol for each fasting level. Only "cross on red" for strict fast is fixed for now.
- Writing the FAQ questions and answers. We set up the page structure now.
- The final wishlist items and their prices. Those go in a separate list.
- Editing through the WordPress admin. The WordPress.com site is retired once the domain
  moves; see ADR-0002 and issue #32.

## Extra Notes

- The current hand-made format for the weekly post is kept as our guide for what the copy button should produce. The two examples are in the `examples/` folder: `example-cal-post.md` (the calendar plus announcements) and `example-text-post.md` (announcements on their own).
- Editing is shared: the week is kept as a short list of services and the announcements text
  in `edinburgh-orthodox/data/`, and the site shows whatever those files say. The editors are
  not website admins, and they do not need a WordPress login.
- The donate link today is a single Square link. The wishlist improves this to one checkout for several items.
