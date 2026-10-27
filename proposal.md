# Website Redesign Proposal

Working document of all proposed changes to https://edinburgh-orthodox.org.uk. This is the
plan we refined together, and it feeds into the spec and the tickets. This folder is where
the plan and the tickets live.

The plan was written when the site ran on WordPress.com. We have since built the site as a
static Hugo site in `edinburgh-orthodox/`, so the parts below that describe working inside
the WordPress admin no longer apply. The needs and the decisions still stand. The move is
recorded in `docs/adr/0002-hugo-static-site.md`.

## Decisions We Are Starting From

| # | Decision | Yes |
|---|----------|-----|
| 1 | Redesign the site we already have | ✓, but not in WordPress.com: the site is built in Hugo (ADR-0002) |
| 2 | Pictures of how it should look are plain HTML and CSS, no special tooling | ✓ |
| 3 | The calendar lives in Google Calendar and is shown on the site | ✓ (recorded in ADR-0001) |
| 4 | Fasting notes are filled in from a yearly calendar file, then checked by the editor | ✓ |
| 5 | Posting to WhatsApp, Facebook, and email starts with a copy button | ✓ |
| 6 | The wishlist is fixed-price items, pick some and pay once | ✓ |

## 1. The homepage, top to bottom

1. **The community name** plus a small bit of branding. No big banner, no row of icons.
2. **Quick links** to the most popular pages (service times, find us, donate, newsletter).
   These replace the hidden menu.
3. **The calendar**, showing this week's services. This is the centrepiece.
4. **Weekly announcements**, a text block directly under the calendar (upcoming events,
   priest availability, confessions).
5. **Our churches** with addresses and map links.
6. **Blog posts** about past events, below the calendar and announcements.
7. Secondary links to History, Wishlist, FAQ, and Donations.

The difference between **Announcements** (text for the week ahead) and **Posts** (write-ups
of past events) is defined in `CONTEXT.md`.

## 2. The services calendar

- **Where it lives**: in Google Calendar, shown on the site (recorded in ADR-0001).
  Volunteers edit it in Google.
- **The normal week** (also in `CONTEXT.md`): Weekday Matins 7.30am; Weekend Matins 8.30am
  followed by Divine Liturgy 10.00am; Vespers 6.30pm daily; Supplicatory Canon Monday 7.00pm
  (after Vespers, to the Mother of God); Fr Luke's Catechesis Sunday 4.00pm.
- **Changes for a single week** (set by the editor): a weekday Liturgy (either Matins 5.45am
  and Liturgy 7.00am, or Matins 8.30am and Liturgy 10.00am), a feast-day change, or an
  evening talk.
- **Locations**: one calendar showing all three places, each service tagged Meadow Lane,
  Chapel Street, or Craigmillar Park.
- **Fasting notes** on each day: cross on red for strict fast, grapes for wine and oil, fish,
  or nothing for a normal day. The exact symbol for each level is still to be decided (see
  section 8).
- **Feast names and fasting notes are filled in from the church-year file** (`examples/planner2026-en.ics`,
  kept in this folder, covering 1 Sep 2026 to 31 Aug 2027). The file lists five fasting
  levels for the year: Strict fast (95 days), Wine and oil (49), Fish (32), Fast free (31),
  and Fast day with dairy, eggs, and fish (7, the Cheesefare week). It also carries the
  feast name for each day. We use this file only for the fasting notes and feast names, never
  for the service times themselves.

## 3. Weekly announcements

- A text block directly under the calendar, on the same page, edited by the same people who
  edit the calendar.
- Holds the things that do not happen every week: Bishop Raphael's talks, Wednesday
  confessions, upcoming events, priest availability.
- Is posted out together with the calendar as the **weekly post** (section 5).

## 4. New pages

### History
Move the community's history off the homepage onto its own History page, linked from the
homepage.

### Wishlist (for Craigmillar Park)
- Fixed-price items, with the prices kept in a separate list.
- The visitor picks one or more items and pays the combined total in one go, through Square.
- How the checkout works: Square's checkout links can list several items on one page (in the
  Square dashboard this is the "multiple items" option). Each wishlist item becomes a Square
  item with a set price. The visitor ticks what they want and pays once. Square's reports
  then show which items were given to. If that proves awkward, the simple fallback is one
  Square link per item, like the single link we use today.
- Both ways are written up for the person doing the work.

### FAQ
- A page grouped by topic (Visiting, Services, Donations).
- We set up the structure now and write the questions and answers later (orthodoxintro.org
  is the example).

### Donations
- Presented more clearly, still using Square.

## 5. Posting the weekly post to WhatsApp, Facebook, and email

The current hand-made format is our guide: `examples/example-cal-post.md` (calendar plus
announcements) and `examples/example-text-post.md` (announcements on their own).

Where it needs to go: WhatsApp (the community announcements channel), Facebook (the page
facebook.com/edinburghorthodox), and email (Mailchimp).

We do this in stages:

1. A "copy this week" button that puts the week into plain text, ready to paste into any of
   the three. No setup needed.
2. Then a send through Mailchimp for email (the list already exists).
3. Automatic posting to Facebook and WhatsApp comes later, once the copy button is being
   used and it is worth the extra setup.

## 6. The WordPress site we are replacing (checked September 2026)

- The donate link is a single Square link today.
- The churches page lists 33 Chapel Street and 2 Meadow Lane. Craigmillar Park is not listed
  yet.
- The services page is thin: headings for Matins, Divine Liturgy, and Vespers, plus an old
  block for February to May 2026. No live calendar.
- There is no History page, no FAQ, and no Wishlist. The history sits on the homepage.
- The menu holds the links (Home, Catechetical Classes, Clergy, Confessions, Contact Us,
  Donations, Services, Other Communities). There is no row of quick links.
- The homepage opens with a big banner and an icon-led layout, which is the part we are
  replacing.

## 7. Pictures of how it should look

Simple HTML and CSS files, openable by double-click, kept in the `mockups/` folder as a
visual guide. They cover every page: the homepage, a card-style variant, Our Churches,
Wishlist, FAQ, Donations (with the bookstore honesty-box), Clergy, and News. They are the
design the site was built from, and the styling now lives in `edinburgh-orthodox/assets/css/`.
A summary of every styling change, compared to the old site, is in `mockup-changes.md`.

## 8. The fasting symbol (still to decide)

The church-year file uses five fasting levels, but we described symbols for four. We still
need to decide the symbol for "wine and oil" against "fish" and for the Cheesefare week
(dairy, eggs, and fish), and whether the five levels share four symbols or get a fifth. This
is only about which picture to show. The data behind it is already ready in the file.

## 9. Smaller style improvements (from looking at the site)

These are small, cheap changes that make the current look tidier. They are separate from the
big homepage redesign, but they can be done at the same time.

- **One logo, not two.** The header now shows two logos side by side (the archdiocese logo
  and the church's red logo). Keep one, and put the fuller wording in text next to it.
- **Trim the history on the front page.** The history text is currently the biggest block on
  the homepage. It moves to its own History page (already part of the plan), and the
  homepage keeps only one short sentence, with a link to read more.
- **One accent colour, used sparingly.** The site already uses a deep red (burgundy) as its
  main colour. Make that the single accent for links and buttons, and avoid the mixed greens,
  blues, and oranges that show up in places. This gives the whole site one steady look.
- **Same heading style everywhere.** At the moment the pages use different heading sizes and
  styles. Make every page use the same heading sizes in the same order, so the pages feel
  like one site.
- **Space things out a little more.** Add a bit of breathing room between sections on the
  pages, especially the services and donations pages, which are thin and cramped.
- **Make buttons look the same.** The "Sign me up" button and any "Donate" button should
  share one style (same colour, same corners), so it is clear where to tap.
- **Add alt text to the pictures.** The church and logo images have no text description,
  which also matters for people using screen readers. Add a short description to each.

These smaller items are shown in the visual mockups in this folder, so the person doing the
work can copy what they see.
