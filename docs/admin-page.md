# Update the week and send the weekly post

The page at `/admin/` edits `edinburgh-orthodox/data/services.yaml` and
`edinburgh-orthodox/data/announcements.yaml`. It saves them to `main`, starts the weekly post
action, and puts the WhatsApp text on the clipboard.

## Sign in

1. Open https://edinburgh-orthodox.org.uk/admin/ .
2. Create a fine-grained token at https://github.com/settings/tokens?type=beta for the
   `edinburgh-orthodox.github.io` repository. Give it Contents: Read and write and Actions:
   Read and write.
3. Paste the token into the page and click Sign in.

The browser keeps the token on that device until you click Sign out.

## Update the week

1. Pick each date. Add day starts on the day after the last one. Change the feast notes and
   the services: enter the service or event name, pick the time, and choose Meadow Lane,
   Chapel Street, or Craigmillar Park.
2. Change the announcements. Set Week of to the first day of the week, and the page writes it
   as the first line. Each other box holds one block. Markdown works: `### Heading`,
   `*label*`, and `[text](https://example.com)`.
3. Click Save changes.

The toolbar under the form says what changed since the last save, when the post last ran, and
how many days and blocks the WhatsApp text holds. Save is greyed out when nothing changed.

Save writes both files as two commits on `main`. The site rebuilds, and the homepage shows
the new week.

Links stay links on the site and in the email. The WhatsApp text shows the label, or the label
and the address for a web link, because WhatsApp does not read Markdown links. It keeps bold
and italic marks.

## Send the post

1. Leave Dry run ticked and click Send weekly post.
2. Open Actions, then "Send weekly post", and read the run summary. It holds the text and a
   WhatsApp link. A dry run does not show the email.
3. Click Copy for WhatsApp and paste the text into the group.
4. To post for real, clear Dry run and click Send weekly post. The page asks for confirmation,
   then posts to the Facebook Page and sends the Mailchimp campaign.

Send refuses while the form has unsaved changes, because the action reads the committed
files, not the page.

## Limits

- Send needs `.github/workflows/weekly-post.yml` on `main`. This page ships in the same pull
  request, so the action is there after the first deploy.
- Send uses both channels every time. If Facebook succeeds and Mailchimp fails, run the
  action from GitHub with one channel selected, so the channel that worked does not post
  twice.
- The page and `scripts/send_weekly_post.js` both use
  `edinburgh-orthodox/static/admin/admin-logic.js`, so the WhatsApp text is built once.
- `js-yaml` 4.1.0 is vendored at `edinburgh-orthodox/static/admin/js-yaml.js`, so the page
  loads no script from a CDN.
- If GitHub rejects the token, create a new one and sign in again.
