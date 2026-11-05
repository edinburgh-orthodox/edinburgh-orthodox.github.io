# Weekly notices action

`.github/workflows/weekly-notices.yml` posts the week's services and announcements to the Facebook Page and Mailchimp. It is started by hand, so nothing is sent until an editor runs it.

The action reads `edinburgh-orthodox/data/services.yaml` and `edinburgh-orthodox/data/announcements.yaml`, builds a plain text notice and an HTML email, and writes a prefilled WhatsApp link and the text to the workflow summary.

## Why it is manual

The action posts to public channels. A dry run is the default, and the workflow has a concurrency lock so two runs cannot send at the same time.

WhatsApp has no official API for posting to a group. The action writes a `wa.me` link and the text to the summary. The editor taps the link and sends it to the group. The email and Facebook post are automatic.

## Secrets

Add these in the repository settings under Actions secrets.

| Secret | What it is |
| --- | --- |
| `FACEBOOK_PAGE_ID` | The numeric ID of the parish Facebook Page |
| `FACEBOOK_PAGE_TOKEN` | A Page access token with `pages_manage_posts` |
| `MAILCHIMP_API_KEY` | A Mailchimp API key |
| `MAILCHIMP_SERVER_PREFIX` | The data centre prefix from the API key, for example `us21` |
| `MAILCHIMP_AUDIENCE_ID` | The audience that receives the weekly email |
| `MAILCHIMP_REPLY_TO` | The reply-to address for the email |

The Facebook token is the fragile part. A token from the Graph API Explorer expires in about an hour. Create a long-lived Page token for the parish app, and replace it when Meta invalidates it.

The Mailchimp campaign sends to the whole audience in `MAILCHIMP_AUDIENCE_ID`. Use a dedicated weekly notices audience, or a segment, so the weekly email does not go to the full newsletter list by accident.

## Run it

1. Confirm the week in `data/services.yaml` and `data/announcements.yaml` is real. The files still contain sample text.
2. Open the repository on GitHub.
3. Go to Actions, then "Send weekly notices".
4. Click "Run workflow" on the `main` branch.
5. Leave "Preview only" ticked for the first run.
6. Open the job summary. Check the text and the WhatsApp link.
7. Run it again with "Preview only" unticked to post to Facebook and send the Mailchimp campaign. Choose `both`, or one channel if a previous run failed after the other succeeded.
8. Open the WhatsApp link in the summary and send it to the group.

The summary shows the Facebook post ID and the Mailchimp campaign ID after a real run. If a step fails, the summary shows the error and the text is still there for a manual send.

## Local dry run

```bash
python3 -m venv /tmp/notices-venv
/tmp/notices-venv/bin/pip install pyyaml
DRY_RUN=true GITHUB_STEP_SUMMARY=/tmp/notices.md /tmp/notices-venv/bin/python scripts/send_weekly_notices.py
```

Open `/tmp/notices.md` to check the formatted text.

## Limits

- The action does not post to WhatsApp groups. No official API does.
- If one channel succeeds and the other fails, the summary lists what was sent. Rerun with only the failed channel selected, otherwise the successful channel is sent twice.
- The Facebook token expires and needs replacing.
- `FACEBOOK_API_VERSION` in the workflow is `v24.0`. Update it when Meta retires that version.
- Mailchimp sends to the whole audience, so use a dedicated audience or segment.
- The action reads the current single-week data shape. If the data model changes to a weekly pattern plus exceptions, update the script with it.
