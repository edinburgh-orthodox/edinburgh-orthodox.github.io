#!/usr/bin/env python3
"""Send the weekly services and announcements to Facebook and Mailchimp.

The script reads the Hugo data files, builds a plain text and HTML notice, and
posts it. WhatsApp has no official API for group posts, so the script writes
the text and a wa.me link to the GitHub Actions job summary for a manual send.
"""

from __future__ import annotations

import base64
import html
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "edinburgh-orthodox" / "data"
SITE_URL = os.environ.get("SITE_URL", "https://edinburgh-orthodox.org.uk")
FACEBOOK_API_VERSION = os.environ.get("FACEBOOK_API_VERSION", "v24.0")


def load_yaml(path: Path) -> Any:
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle) or []


def format_text(services: list[dict], announcements: list[str]) -> str:
    lines = ["SERVICES THIS WEEK", ""]
    for day in services:
        heading = str(day.get("date", "")).strip()
        note = str(day.get("note", "")).strip()
        mark = str(day.get("mark", "")).strip()
        if note:
            heading = f"{heading} - {note}"
        if mark:
            heading = f"{heading} {mark}"
        lines.append(heading)
        for service in day.get("services") or []:
            time = str(service.get("time", "")).strip()
            location = str(service.get("location", "")).strip()
            lines.append(f"{time} ({location})" if location else time)
        lines.append("")
    if announcements:
        lines.extend(["ANNOUNCEMENTS", ""])
        for item in announcements:
            lines.append(str(item).strip())
            lines.append("")
    lines.append(SITE_URL)
    return "\n".join(lines).strip() + "\n"


def format_html(services: list[dict], announcements: list[str]) -> str:
    parts = [
        '<div style="font-family: Georgia, serif; color: #1c1a17; max-width: 640px; margin: 0 auto; line-height: 1.5;">',
        '<h1 style="color: #7b1e26; font-size: 26px; margin: 0 0 16px;">Services this week</h1>',
    ]
    for day in services:
        heading = html.escape(str(day.get("date", "")).strip())
        note = str(day.get("note", "")).strip()
        mark = str(day.get("mark", "")).strip()
        if note:
            heading += " - " + html.escape(note)
        if mark:
            heading += " " + html.escape(mark)
        parts.append(f'<h2 style="font-size: 18px; margin: 24px 0 4px;">{heading}</h2>')
        for service in day.get("services") or []:
            time = html.escape(str(service.get("time", "")).strip())
            location = str(service.get("location", "")).strip()
            location_html = (
                f' <span style="color: #6b635c;">({html.escape(location)})</span>'
                if location
                else ""
            )
            parts.append(f'<p style="margin: 2px 0;">{time}{location_html}</p>')
    if announcements:
        parts.append('<h2 style="font-size: 18px; margin: 24px 0 4px;">Announcements</h2>')
        parts.append('<ul style="margin: 0; padding-left: 20px;">')
        for item in announcements:
            parts.append(f"<li>{html.escape(str(item).strip())}</li>")
        parts.append("</ul>")
    parts.append(
        f'<p style="margin: 24px 0 0;"><a href="{SITE_URL}" style="color: #7b1e26;">{SITE_URL}</a></p>'
    )
    parts.append("</div>")
    return "\n".join(parts)


def write_summary(lines: list[str]) -> None:
    content = "\n".join(lines).rstrip() + "\n"
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if path:
        with open(path, "a", encoding="utf-8") as handle:
            handle.write(content)
    else:
        print(content)


def require_env(names: list[str]) -> None:
    missing = [name for name in names if not os.environ.get(name)]
    if missing:
        raise RuntimeError("Missing required secrets: " + ", ".join(missing))


def post_form(url: str, data: dict[str, str]) -> dict[str, Any]:
    body = urllib.parse.urlencode(data).encode()
    request = urllib.request.Request(url, data=body, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read() or b"{}")
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", "replace")
        raise RuntimeError(f"HTTP {error.code} from {url}: {detail}") from error


def mailchimp_request(
    method: str, path: str, payload: dict[str, Any] | None = None
) -> dict[str, Any]:
    key = os.environ["MAILCHIMP_API_KEY"]
    prefix = os.environ["MAILCHIMP_SERVER_PREFIX"]
    url = f"https://{prefix}.api.mailchimp.com/3.0{path}"
    data = json.dumps(payload).encode() if payload is not None else None
    request = urllib.request.Request(url, data=data, method=method)
    request.add_header("Content-Type", "application/json")
    token = base64.b64encode(f"anystring:{key}".encode()).decode()
    request.add_header("Authorization", f"Basic {token}")
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read() or b"{}")
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", "replace")
        raise RuntimeError(f"Mailchimp HTTP {error.code}: {detail}") from error


def post_facebook(text: str) -> str:
    page_id = os.environ["FACEBOOK_PAGE_ID"]
    token = os.environ["FACEBOOK_PAGE_TOKEN"]
    url = f"https://graph.facebook.com/{FACEBOOK_API_VERSION}/{page_id}/feed"
    result = post_form(url, {"message": text, "access_token": token})
    return result.get("id", "unknown")


def send_mailchimp(subject: str, html_body: str) -> str:
    audience_id = os.environ["MAILCHIMP_AUDIENCE_ID"]
    reply_to = os.environ["MAILCHIMP_REPLY_TO"]
    from_name = os.environ.get(
        "MAILCHIMP_FROM_NAME", "St Andrew's Orthodox Church"
    )
    campaign = mailchimp_request(
        "POST",
        "/campaigns",
        {
            "type": "regular",
            "recipients": {"list_id": audience_id},
            "settings": {
                "subject_line": subject,
                "title": subject,
                "from_name": from_name,
                "reply_to": reply_to,
            },
        },
    )
    campaign_id = campaign["id"]
    mailchimp_request(
        "PUT", f"/campaigns/{campaign_id}/content", {"html": html_body}
    )
    mailchimp_request("POST", f"/campaigns/{campaign_id}/actions/send", {})
    return campaign_id


def main() -> None:
    dry_run = os.environ.get("DRY_RUN", "true").strip().lower() not in {
        "0",
        "false",
        "no",
    }
    channels = os.environ.get("CHANNELS", "both").strip().lower()
    if channels not in {"both", "facebook", "mailchimp"}:
        raise RuntimeError("CHANNELS must be both, facebook, or mailchimp")
    send_to_facebook = channels in {"both", "facebook"}
    send_to_mailchimp = channels in {"both", "mailchimp"}
    services = load_yaml(DATA / "services.yaml")
    announcements = load_yaml(DATA / "announcements.yaml")
    text = format_text(services, announcements)
    subject = (
        f"Services and notices for the week beginning {services[0]['date']}"
        if services
        else "Weekly notices"
    )
    html_body = format_html(services, announcements)
    whatsapp_url = "https://wa.me/?text=" + urllib.parse.quote(text, safe="")
    summary = [
        "## Weekly notices",
        "",
        "### WhatsApp",
        "",
        f"[Open WhatsApp with this text]({whatsapp_url})",
        "",
        "<details><summary>Text to post</summary>",
        "",
        "```text",
        text.rstrip(),
        "```",
        "",
        "</details>",
        "",
    ]

    try:
        if dry_run:
            summary.append(f"Dry run for {channels}. Nothing was posted or sent.")
        else:
            required = []
            if send_to_facebook:
                required.extend(["FACEBOOK_PAGE_ID", "FACEBOOK_PAGE_TOKEN"])
            if send_to_mailchimp:
                required.extend(
                    [
                        "MAILCHIMP_API_KEY",
                        "MAILCHIMP_SERVER_PREFIX",
                        "MAILCHIMP_AUDIENCE_ID",
                        "MAILCHIMP_REPLY_TO",
                    ]
                )
            require_env(required)
            summary.extend(["### Sent", ""])
            if send_to_mailchimp:
                campaign_id = send_mailchimp(subject, html_body)
                summary.append(f"Mailchimp campaign: `{campaign_id}`")
            if send_to_facebook:
                facebook_id = post_facebook(text)
                summary.append(f"Facebook Page post: `{facebook_id}`")
    except Exception as error:
        summary.append(f"Failed: {error}")
        write_summary(summary)
        raise

    write_summary(summary)
    print("Dry run complete." if dry_run else "Weekly notices sent.")


if __name__ == "__main__":
    main()
