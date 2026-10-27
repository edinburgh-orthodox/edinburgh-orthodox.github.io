# Mockup changes: how the redesign differs from the current website

A summary of the visual and layout changes shown in the `mockups/` folder, compared to the
old WordPress site at https://edinburgh-orthodox.org.uk. The exact link names and final
ordering are still to be decided; the items below describe the styling and structure only.

The site has since been built from these mockups, so they are now a reference rather than the
target. The styling that ships lives in `edinburgh-orthodox/assets/css/`, and the live site is
at https://edinburgh-orthodox.github.io/edinburgh-orthodox.org.uk/.

## The pages

- `index.html` - the redesigned homepage.
- `cards.html` - a card-style variant of the homepage (see "Card variant" below).
- `churches.html` - "Our Churches", one page per building.
- `wishlist.html` - giving toward items for the new church.
- `faq.html` - frequently asked questions.
- `donations.html` - giving, including the bookstore honesty-box.
- `clergy.html` - the priests who serve the community.
- `news.html` - community news posts.

## Overarching design

- Whole site uses a warm off-white paper background, dark ink text, and a deep burgundy
  accent. The current site mixes several accent colours (greens, blues, oranges); the
  redesign uses the deep burgundy as the single accent for links, headings, and buttons.
- Headings and the site title use a serif display face; body copy uses a plain sans face.
- Everything is laid out in a single centred column of readable width, so pages feel calm and
  consistent rather than stretched full-width.

## Header (every page)

- **One row header** with the round church logo next to the site title on the left, and the
  nav on the right. The current site has two logos stacked in the body and a separate menu
  toggle; the redesign puts a single small logo beside the title.
- **Title stays on one line** on desktop; on phones it is allowed to wrap to a couple of
  lines so the burger stays visible.
- **Nav as top links** (not a row of pill buttons). The currently visible links are: Our
  Churches, Donate, Wishlist, Clergy, News, FAQ.
- **The rest of the links live in the burger menu** - a side drawer that slides in over the
  whole right side of the page when you click the burger. It holds Confessions, Magazine,
  History, and the Orthodox School, plus every visible link when you are on a small screen.
  On the current site the menu toggle is a text "Menu" button that opens a simple list.

## Homepage

- **Introduction block** near the top: "Welcome to St Andrew's Orthodox Church - Archdiocese
  of Thyateira and Great Britain. All are welcome!". It starts with a large decorative
  initial letter (a drop capital), with the church name and diocese in bold. The current
  site opens with a large banner, an icon row, and a long history paragraph.
- **Weekly Services** is the first major content block: the services calendar for the whole
  week, starting Monday, with weekday and weekend default times, each service tagged with
  which church it is at (Meadow Lane or Chapel Street), and a small fasting note or symbol
  on the relevant days (strict fast, wine and oil, fish). The title is centred and the list
  sits in a centred column. The current site has no calendar on the homepage at all.
- **Announcements** block directly under the calendar: a short text block for the week
  ahead (upcoming events, confessions, priest availability).
- **Our Churches** section: three clickable cards (Meadow Lane, Chapel Street, Craigmillar
  Park), each linking to its own page and to its Google Maps location. The current site
  lists church details on a separate "find us" page.
- **Our history** section: a one or two sentence summary with a "find out more" link. The
  current site puts the full history at the top of the homepage.
- **Recent news** section at the bottom: a short list of the latest community news posts
  with dates, and an "All news" link to the News page.

## Card variant (cards.html)

The homepage can also be shown as cards. In this version the whole Weekly Services block
sits inside one wide card (all seven days as rows, with the fasting symbols), and
Announcements becomes a title with a separate card for each announcement. This is an
alternative layout - the running list is the default, the cards are the option.

## Our Churches page

- Each of the three buildings has its own block with a short history: where it is, who
  gathers there, and a Google Maps link. Craigmillar Park also links to the Orthodox School,
  which is hosted there.

## Wishlist page

- A list of fixed-price items (each with a checkbox and a price), and a "donate selected
  items" bar showing the running total. The total updates live as you tick boxes. This is a
  new page; the current site has nothing like it.

## FAQ page

- Questions grouped by topic (Visiting, Services, Donations), with the topic subheadings
  left-aligned. This is a new page; the current site has no FAQ. The actual questions and
  answers are filled in later.

## Donations page

- A clear giving section with the charity number, a short explanation, and two buttons
  side by side: "Donate now" and "Show bank details" (which reveals the sort code, account,
  and reference).
- **Bookstore (honesty box)**: a cart where you add books by Title, Price, and Number, and
  it totals what you owe. "Choose your books, how many of each, and donate."
- **Give toward something specific** at the bottom: a pointer to the Wishlist.

## Clergy page

- One card per priest, using the names, addresses, phone numbers, and emails from the
  current site. Each email is a clickable link. The bishop is listed first.

## News page

- A list of community news posts (title and date) in newest-first order.

## Things deliberately removed from the homepage

- The large banner and row of icons that currently lead the page.
- The full history paragraph (moved to its own section and page).
- The hidden menu that buries the main links.
