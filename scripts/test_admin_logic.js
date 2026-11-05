// Round-trip and formatting checks for the admin page helpers.
// Run with: node scripts/test_admin_logic.js
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const logic = require(path.join(root, 'edinburgh-orthodox/static/admin/admin-logic.js'));
const yaml = require(path.join(root, 'edinburgh-orthodox/static/admin/js-yaml.min.js'));

const data = path.join(root, 'edinburgh-orthodox/data');
const services = yaml.load(fs.readFileSync(path.join(data, 'services.yaml'), 'utf8'));
const announcements = yaml.load(fs.readFileSync(path.join(data, 'announcements.yaml'), 'utf8'));

// Every stored service name and time must survive a split and a join.
let count = 0;
for (const day of services) {
  for (const service of day.services || []) {
    const { name, time } = logic.splitService(service.time);
    assert.strictEqual(logic.joinService(name, time), service.time, service.time);
    count++;
  }
}
assert.ok(count > 0, 'no services found');
assert.ok(announcements.length > 0, 'no announcements found');

// A name that ends in a number colon number keeps its text and gets no time.
assert.deepStrictEqual(logic.splitService('Bible Study: John 3:16'), {
  name: 'Bible Study: John 3:16',
  time: ''
});

// The site label comes from the ISO date.
assert.strictEqual(logic.formatDate('2026-11-03'), 'Tue 3rd Nov');
assert.strictEqual(logic.formatDate('2026-11-01'), 'Sun 1st Nov');
assert.strictEqual(logic.isoDate(new Date('2026-10-26T00:00:00Z')), '2026-10-26');

// Plain text drops heading marks and flattens links, but keeps emphasis.
const text = logic.formatText([], [
  '### Confessions',
  '*Travel* by car',
  'Call [07395 625298](tel:+447395625298) or [the site](https://example.com).'
]);
assert.ok(!text.includes('###'), 'heading marks left in');
assert.ok(text.includes('*Travel* by car'), 'emphasis lost');
assert.ok(text.includes('07395 625298'), 'telephone label lost');
assert.ok(!text.includes(']('), 'markdown link left in');
assert.ok(text.includes('the site (https://example.com)'), 'web link lost');

console.log(`admin logic: ${count} services round-trip, formatting ok`);
