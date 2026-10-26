# Go-Live Checklist

Everything left to finish before the Hugo site can go live. Each item is a
checkbox. GitHub shows checkboxes in repository files as read-only, so tick an
item by editing `- [ ]` to `- [x]`. Most of the same work is also tracked with
clickable boxes in issue #32.

## 1. Missing pages

These navigation links point to a placeholder `#` and need a real page.

- [x] Confessions: create `content/confessions.md` and change `url = "#"` to `pageRef` in `hugo.toml`
- [ ] Magazine: create `content/magazine.md` and change `url = "#"` to `pageRef` in `hugo.toml` (line 68)
- [x] History: create `content/history.md` and change `url = "#"` to `pageRef` in `hugo.toml`
- [x] Catechesis: create the page and change `pageRef = "#"` in `hugo.toml` (line 66)

## 2. Placeholder or fake content

- [ ] `data/faq.yaml`: replace the three "Fake Holder Question?" entries with real questions once approved by the bishop
- [ ] `content/faq.md`: implement the page once approved by the bishop, and add questions to `data/faq.yaml`
- [ ] `data/services.yaml`: replace the sample week with current, confirmed information
- [ ] `data/services.yaml`: decide whether this file stays the source or is generated from Google Calendar
- [ ] `data/announcements.yaml`: replace with current, confirmed information
- [ ] `data/wishlist.yaml`: replace with the final list once created by George

## 3. Empty news posts

All six publish as blank pages because the article body is missing. Each one
needs the original article body and any confirmed photographs.

- [ ] `content/news/anton-caius-gurgu-ordained-holy-diaconate.md`
- [ ] `content/news/homes-for-ukraine.md`
- [ ] `content/news/ordination-bishop-raphael-of-ilion.md`
- [ ] `content/news/ordination-deacon-janis-stumbris.md`
- [ ] `content/news/ordination-holy-priesthood-caius-anton-gurgu.md`
- [ ] `content/news/ordination-reader-caius-gurgu.md`

## 4. Details needing confirmation

These are high risk because they touch contact and identity. They need the
site owner's confirmation before going live.

- [x] `content/clergy.md`: confirm the clergy details
- [x] `content/contact.md`: confirm the committee and contact details

## 5. Donations and checkout

- [ ] Bookshop: connect the calculated bookstore total to a confirmed checkout process (`layouts/donations.html` line 48)
- [ ] Wishlist: connect the selected items and total to a confirmed Square checkout URL (`layouts/donations.html` line 69)
- [ ] Donation buttons: get the donation link confirmed by the site owner, then enable the "Donate this amount" and "Donate selected items" buttons (lines 51 and 72)

## 6. Weekly services

- [ ] Replace the sample service data with Google Calendar and implement the "copy this week" action (`layouts/home.html` line 19)

## Totals

- 4 missing pages
- 6 placeholder or fake content items
- 6 empty news posts
- 2 confirmation items
- 3 donation and checkout items
- 1 weekly services item

**22 items in total. 5 done, 17 remaining.** The Catechesis, Confessions and
History pages and the two confirmations in section 4 are done. The rest are
blocked on external input (bishop approval, George's wishlist, the site owner's
donation link and calendar) or are content tasks that can be done in this repo.
