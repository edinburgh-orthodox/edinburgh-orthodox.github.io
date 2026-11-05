# Weekly editing happens on `/admin/`, not in a CMS

The week and the announcements are edited on a page in the site,
`edinburgh-orthodox/static/admin/index.html`. The page calls the GitHub API to commit the two
data files and to start the weekly notices action. The editor signs in with a GitHub token
that the browser stores.

Why: the editing page has to do three things. It edits the two data files, it sends the
notices, and it puts the WhatsApp text on the clipboard. Sveltia CMS covers the first and
cannot do the other two, because it runs entirely in the browser and has no way to trigger a
workflow or to render a copy button. A separate page for sending would mean two places to
learn and two to maintain. The custom page is one HTML file plus a vendored YAML library, and
Save, Send, and Copy share one form state.

Considered options: Sveltia CMS, recorded in issue #41, and Sveltia plus a separate publish
page. Both leave the send and the copy in GitHub's interface.

Consequences: each editor needs a GitHub account and a token with write access, so the page
suits one or two people and not a group of volunteers. The WhatsApp text is built twice, in
`formatText` in the page and in `format_text` in `scripts/send_weekly_notices.py`, so the two
functions must change together. Saves commit straight to `main` with no review step, which
this repository allows because `main` has no branch protection.

This supersedes the Sveltia CMS choice in issue #41.

Status: accepted.
