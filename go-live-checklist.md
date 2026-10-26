# Go-Live Checklist

Everything left to finish before the Hugo site can go live. Each item is a
checkbox. GitHub shows checkboxes in repository files as read-only, so tick an
item by editing `- [ ]` to `- [x]`. Most of the same work is also tracked with
clickable boxes in issue #32.

## 1. Placeholder or fake content

- [ ] `data/faq.yaml`: replace the three "Fake Holder Question?" entries with real questions once approved by the bishop
- [ ] `content/faq.md`: implement the page once approved by the bishop, and add questions to `data/faq.yaml`
- [ ] `data/services.yaml`: replace the sample week with current, confirmed information
- [ ] `data/services.yaml`: decide whether this file stays the source or is generated from Google Calendar
- [ ] `data/announcements.yaml`: replace with current, confirmed information
- [ ] `data/wishlist.yaml`: replace with the final list once created by George

## 2. Donations and checkout

- [ ] Bookshop: connect the calculated bookstore total to a confirmed checkout process (`layouts/donations.html` line 51)
- [ ] Wishlist: connect the selected items and total to a confirmed Square checkout URL (`layouts/donations.html` line 72)
- [ ] Donation buttons: get the donation link confirmed by the site owner, then enable the "Donate this amount" and "Donate selected items" buttons (lines 54 and 75)

## 3. Weekly services

- [ ] Replace the sample service data with Google Calendar and implement the "copy this week" action (`layouts/home.html` line 21)

## Totals

- 6 placeholder or fake content items
- 3 donation and checkout items
- 1 weekly services item

**10 items remaining.** They are blocked on external input (bishop approval,
George's wishlist, the site owner's donation link and calendar) or are content
tasks that can be done in this repo.
