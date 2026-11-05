#!/usr/bin/env node
// Send the weekly post to Facebook and Mailchimp.
//
// The script reads the Hugo data files, builds the text with the same helpers
// the admin page uses, and posts it. WhatsApp has no official API for group
// posts, so the script writes the text and a wa.me link to the GitHub Actions
// job summary for a manual send.

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'edinburgh-orthodox', 'data');
const yaml = require(path.join(ROOT, 'edinburgh-orthodox', 'static', 'admin', 'js-yaml.js'));
const {
  SITE_URL,
  formatText,
  dayHeading,
  formatDate,
} = require(path.join(ROOT, 'edinburgh-orthodox', 'static', 'admin', 'admin-logic.js'));

const FACEBOOK_API_VERSION = process.env.FACEBOOK_API_VERSION || 'v24.0';

function loadYaml(file) {
  return yaml.load(fs.readFileSync(path.join(DATA, file), 'utf8')) || [];
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

// The announcement blocks use headings, emphasis, and links. Escape first so
// raw HTML in the data stays inert.
function renderInline(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => `<a href="${url}">${label}</a>`)
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
}

function renderMarkdown(block) {
  const parts = [];
  let paragraph = [];
  const flush = () => {
    if (!paragraph.length) return;
    parts.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  for (const line of String(block).split(/\r?\n/)) {
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      const level = heading[1].length;
      parts.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
    } else if (!line.trim()) {
      flush();
    } else {
      paragraph.push(line.trim());
    }
  }
  flush();
  return parts.join('\n');
}

function formatHtml(services, announcements) {
  const parts = [
    '<div style="font-family: Georgia, serif; color: #1c1a17; max-width: 640px; margin: 0 auto; line-height: 1.5;">',
    '<h1 style="color: #7b1e26; font-size: 26px; margin: 0 0 16px;">Services this week</h1>',
  ];
  for (const day of services) {
    parts.push(
      `<h2 style="font-size: 18px; margin: 24px 0 4px;">${escapeHtml(dayHeading(day))}</h2>`
    );
    for (const service of day.services || []) {
      const time = escapeHtml(String(service.time || '').trim());
      const location = String(service.location || '').trim();
      const locationHtml = location
        ? ` <span style="color: #6b635c;">(${escapeHtml(location)})</span>`
        : '';
      parts.push(`<p style="margin: 2px 0;">${time}${locationHtml}</p>`);
    }
  }
  if (announcements.length) {
    parts.push('<h2 style="font-size: 18px; margin: 24px 0 4px;">Announcements</h2>');
    for (const item of announcements) parts.push(renderMarkdown(String(item).trim()));
  }
  parts.push(
    `<p style="margin: 24px 0 0;"><a href="${SITE_URL}" style="color: #7b1e26;">${SITE_URL}</a></p>`
  );
  parts.push('</div>');
  return parts.join('\n');
}

function writeSummary(lines) {
  const content = lines.join('\n').trimEnd() + '\n';
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) fs.appendFileSync(summaryPath, content);
  else process.stdout.write(content);
}

function requireEnv(names) {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length) throw new Error('Missing required secrets: ' + missing.join(', '));
}

async function postForm(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}: ${await response.text()}`);
  }
  return response.json().catch(() => ({}));
}

async function mailchimp(method, apiPath, payload) {
  const key = process.env.MAILCHIMP_API_KEY;
  const prefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const headers = {
    Authorization: 'Basic ' + Buffer.from(`anystring:${key}`).toString('base64'),
  };
  if (payload !== undefined) headers['Content-Type'] = 'application/json';
  const response = await fetch(`https://${prefix}.api.mailchimp.com/3.0${apiPath}`, {
    method,
    headers,
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Mailchimp HTTP ${response.status}: ${await response.text()}`);
  }
  return response.json().catch(() => ({}));
}

async function postFacebook(text) {
  const url = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/${process.env.FACEBOOK_PAGE_ID}/feed`;
  const result = await postForm(url, {
    message: text,
    access_token: process.env.FACEBOOK_PAGE_TOKEN,
  });
  return result.id || 'unknown';
}

async function sendMailchimp(subject, htmlBody) {
  const campaign = await mailchimp('POST', '/campaigns', {
    type: 'regular',
    recipients: { list_id: process.env.MAILCHIMP_AUDIENCE_ID },
    settings: {
      subject_line: subject,
      title: subject,
      from_name: process.env.MAILCHIMP_FROM_NAME || "St Andrew's Orthodox Church",
      reply_to: process.env.MAILCHIMP_REPLY_TO,
    },
  });
  const campaignId = campaign.id;
  await mailchimp('PUT', `/campaigns/${campaignId}/content`, { html: htmlBody });
  await mailchimp('POST', `/campaigns/${campaignId}/actions/send`, {});
  return campaignId;
}

async function main() {
  const dryRun = !/^(0|false|no)$/i.test(String(process.env.DRY_RUN ?? 'true').trim());
  const channels = String(process.env.CHANNELS || 'both').trim().toLowerCase();
  if (!['both', 'facebook', 'mailchimp'].includes(channels)) {
    throw new Error('CHANNELS must be both, facebook, or mailchimp');
  }
  const sendToFacebook = channels === 'both' || channels === 'facebook';
  const sendToMailchimp = channels === 'both' || channels === 'mailchimp';

  const services = loadYaml('services.yaml');
  const announcements = loadYaml('announcements.yaml');
  const text = formatText(services, announcements);
  const subject = services.length
    ? `Services and announcements for the week beginning ${formatDate(services[0].date)}`
    : 'Weekly post';
  const htmlBody = formatHtml(services, announcements);
  const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
  const summary = [
    '## Weekly post',
    '',
    '### WhatsApp',
    '',
    `[Open WhatsApp with this text](${whatsappUrl})`,
    '',
    '<details><summary>Text to post</summary>',
    '',
    '```text',
    text.replace(/\n+$/, ''),
    '```',
    '',
    '</details>',
    '',
  ];

  try {
    if (dryRun) {
      summary.push(`Dry run for ${channels}. Nothing was posted or sent.`);
    } else {
      const required = [];
      if (sendToFacebook) required.push('FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_TOKEN');
      if (sendToMailchimp) {
        required.push(
          'MAILCHIMP_API_KEY',
          'MAILCHIMP_SERVER_PREFIX',
          'MAILCHIMP_AUDIENCE_ID',
          'MAILCHIMP_REPLY_TO'
        );
      }
      requireEnv(required);
      summary.push('### Sent', '');
      if (sendToMailchimp) {
        summary.push(`Mailchimp campaign: \`${await sendMailchimp(subject, htmlBody)}\``);
      }
      if (sendToFacebook) summary.push(`Facebook Page post: \`${await postFacebook(text)}\``);
    }
  } catch (error) {
    summary.push(`Failed: ${error.message}`);
    writeSummary(summary);
    throw error;
  }

  writeSummary(summary);
  console.log(dryRun ? 'Dry run complete.' : 'Weekly post sent.');
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { formatHtml, renderMarkdown, escapeHtml, loadYaml };
