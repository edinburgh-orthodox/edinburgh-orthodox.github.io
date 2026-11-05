// Formatting checks for the weekly post sender. Run with:
// node scripts/test_send_weekly_post.js
const assert = require('node:assert');
const send = require('./send_weekly_post.js');
const logic = require('../edinburgh-orthodox/static/admin/admin-logic.js');

const services = [
  {
    date: '2026-09-07',
    note: 'Forefeast',
    services: [{ time: 'Matins 7:30am', location: 'Meadow Lane' }],
  },
  {
    date: '2026-09-08',
    services: [{ time: 'Vespers 6:30pm', location: 'Chapel Street' }],
  },
];

const text = logic.formatText(services, ['Parish meeting']);
assert.ok(text.includes('SERVICES THIS WEEK'), 'no heading');
assert.ok(text.includes('Mon 7th Sep - Forefeast'), 'no day label');
assert.ok(text.includes('Matins 7:30am (Meadow Lane)'), 'no service line');
assert.ok(text.includes('Tue 8th Sep'), 'no second day');
assert.ok(text.includes('ANNOUNCEMENTS'), 'no announcements heading');
assert.ok(text.includes('Parish meeting'), 'no announcement');
assert.ok(text.trimEnd().endsWith(logic.SITE_URL), 'no site url');

const plain = logic.formatText([], [
  '### Confessions',
  '*Travel* by car',
  'Call [07395 625298](tel:+447395625298) or [the site](https://example.com).',
]);
assert.ok(!plain.includes('###'), 'heading marks left in');
assert.ok(plain.includes('*Travel* by car'), 'emphasis lost');
assert.ok(plain.includes('07395 625298'), 'telephone label lost');
assert.ok(!plain.includes(']('), 'markdown link left in');
assert.ok(plain.includes('the site (https://example.com)'), 'web link lost');

const html = send.formatHtml(
  [
    {
      date: '2026-09-07',
      note: 'A & B',
      services: [{ time: 'Matins', location: 'Meadow <Lane>' }],
    },
  ],
  ['<script>alert(1)</script>']
);
assert.ok(html.includes('A &amp; B'), 'note not escaped');
assert.ok(html.includes('Meadow &lt;Lane&gt;'), 'location not escaped');
assert.ok(!html.includes('<script>'), 'raw HTML passed through');

const markdown = send.renderMarkdown(
  '### Confessions\n*Travel* by car, [call](tel:+441234).'
);
assert.ok(markdown.includes('<h3>Confessions</h3>'), 'heading not rendered');
assert.ok(markdown.includes('<em>Travel</em> by car'), 'emphasis not rendered');
assert.ok(markdown.includes('<a href="tel:+441234">call</a>'), 'link not rendered');

assert.strictEqual(logic.formatDate('2026-09-07'), 'Mon 7th Sep');
assert.strictEqual(logic.formatDate('2026-11-03'), 'Tue 3rd Nov');

console.log('send script: ok');
