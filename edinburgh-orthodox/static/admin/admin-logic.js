// Pure helpers shared by the admin page and scripts/test_admin_logic.js.
// The browser gets these as globals; node gets them from module.exports.
(function (root) {
  const SITE_URL = 'https://edinburgh-orthodox.org.uk';
  const PLACES = ['Meadow Lane', 'Chapel Street', 'Craigmillar Park'];
  const TIME_RE = /\s(\d{1,2}):(\d{2})\s*(am|pm)$/i;

  // The data files keep the service name and the time in one string, for example
  // "Matins 7:30am". The form edits them separately.
  function splitService(text) {
    const value = String(text || '').trim();
    const match = value.match(TIME_RE);
    if (!match) return { name: value, time: '' };
    const hours = (Number(match[1]) % 12) + (match[3].toLowerCase() === 'pm' ? 12 : 0);
    return {
      name: value.slice(0, match.index).trim(),
      time: String(hours).padStart(2, '0') + ':' + match[2]
    };
  }

  function formatTime(value) {
    if (!value) return '';
    const [hours, minutes] = value.split(':').map(Number);
    return (hours % 12 || 12) + ':' + String(minutes).padStart(2, '0') + (hours >= 12 ? 'pm' : 'am');
  }

  function joinService(name, clock) {
    if (!clock) return name;
    return name ? name + ' ' + formatTime(clock) : formatTime(clock);
  }

  // js-yaml turns an unquoted ISO date into a Date. The page stores and shows text.
  function isoDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, '0')}-${String(value.getUTCDate()).padStart(2, '0')}`;
    }
    return String(value || '').slice(0, 10);
  }

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function ordinal(day) {
    const tens = day % 100;
    if (tens >= 11 && tens <= 13) return day + 'th';
    return day + ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
  }

  // Show a date as the site does, for example 2026-11-03 as Tue 3rd Nov. The
  // names are fixed so Node, the browser, and Hugo all print the same label.
  function formatDate(value) {
    const iso = isoDate(value);
    const [year, month, day] = iso.split('-').map(Number);
    if (!year || !month || !day) return String(value || '');
    const date = new Date(year, month - 1, day);
    return `${WEEKDAYS[date.getDay()]} ${ordinal(day)} ${MONTHS[month - 1]}`;
  }

  // The day heading used by the text, the email, and the page.
  function dayHeading(day) {
    const heading = formatDate(day.date);
    const note = String(day.note || '').trim();
    return note ? heading + ' - ' + note : heading;
  }

  // Plain text for Facebook, WhatsApp, and the clipboard. Headings and links
  // do not render there; bold and italics do.
  function plainText(text) {
    return String(text)
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) =>
        /^(tel:|mailto:)/.test(url) ? label : label + ' (' + url + ')');
  }

  // The text sent to every channel. The sender imports this.
  function formatText(services, announcements) {
    const lines = ['SERVICES THIS WEEK', ''];
    for (const day of services) {
      lines.push(dayHeading(day));
      for (const service of day.services || []) {
        const time = String(service.time || '').trim();
        const location = String(service.location || '').trim();
        lines.push(location ? `${time} (${location})` : time);
      }
      lines.push('');
    }
    if (announcements.length) {
      lines.push('ANNOUNCEMENTS', '');
      for (const item of announcements) {
        lines.push(plainText(String(item).trim()));
        lines.push('');
      }
    }
    lines.push(SITE_URL);
    return lines.join('\n').trim() + '\n';
  }

  const api = { SITE_URL, PLACES, TIME_RE, splitService, formatTime, joinService, isoDate, ordinal, formatDate, dayHeading, plainText, formatText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else Object.assign(root, api);
})(typeof globalThis !== 'undefined' ? globalThis : this);
