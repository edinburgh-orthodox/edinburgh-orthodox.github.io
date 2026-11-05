# Update the week and send the notices

The page at `/admin/` edits `edinburgh-orthodox/data/services.yaml` and
`edinburgh-orthodox/data/announcements.yaml`. It saves them to `main`, starts the weekly
notices action, and puts the WhatsApp text on the clipboard.

## Sign in

1. Open https://edinburgh-orthodox.org.uk/admin/ .
2. Create a fine-grained token at https://github.com/settings/tokens?type=beta for the
   `edinburgh-orthodox.org.uk` repository. Give it Contents: Read and write and Actions: Read
   and write.
3. Paste the token into the page and click Sign in.

The browser keeps the token on that device until you click Sign out.

## Update the week

1. Change the dates, the feast notes, and the services. Enter the service or event name, pick
   the time, and choose Meadow Lane, Chapel Street, or Craigmillar Park.
2. Change the announcements. Each box holds one block and can contain Markdown.
3. Click Save changes.

Save writes both files as two commits on `main`. The site rebuilds, and the homepage shows
the new week.

## Send the notices

1. Leave Dry run ticked and click Send notices.
2. Open Actions, then "Send weekly notices", and read the run summary. It holds the text, the
   email preview, and a WhatsApp link.
3. Click Copy for WhatsApp and paste the text into the group.
4. To post for real, clear Dry run and click Send notices. The page asks for confirmation,
   then posts to the Facebook Page and sends the Mailchimp campaign.

Send refuses while the form has unsaved changes, because the action reads the committed
files, not the page.

## Limits

- Send needs `.github/workflows/weekly-notices.yml` on `main`. This page ships in the same
  pull request, so the action is there after the first deploy.
- Send uses both channels every time. If Facebook succeeds and Mailchimp fails, run the
  action from GitHub with one channel selected, so the channel that worked does not post
  twice.
- The page builds the WhatsApp text with `formatText` in
  `edinburgh-orthodox/static/admin/index.html`. `scripts/send_weekly_notices.py` builds the
  same text with `format_text`. Change both functions together.
- `js-yaml` 4.1.0 is vendored at `edinburgh-orthodox/static/admin/js-yaml.min.js`, so the page
  loads no script from a CDN.
- If GitHub rejects the token, create a new one and sign in again.
