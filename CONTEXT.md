# Edinburgh Orthodox Website

The public website (and the folder of plans and tickets) for the Orthodox Community of
St Andrew, Edinburgh, in the Archdiocese of Thyateira and Great Britain, charity SC054378.
This folder holds the plans, the tickets, and the agreed wording. The website itself is a
static Hugo site in `edinburgh-orthodox/`, published to GitHub Pages and to
edinburgh-orthodox.org.uk when a change is merged into `main`. The old WordPress.com site is
being retired (issues #9 and #32).

## Language

### Places

**Meadow Lane (ML)**:
The smaller chapel at 2 Meadow Lane where the clergy live, with a small hall used for daily
or smaller services.
_Avoid_: "the chapel", "the hall"

**Chapel Street (CS)**:
The larger, less-furnished church at 33 Chapel Street used for busier services, the Sundays
and the large feasts.
_Avoid_: "the main church", "the big church"

**Craigmillar Park Church (CPC)**:
The newly purchased large property at 2c Craigmillar Park, being furnished to become the new
main church. Hosts the Orthodox school and larger meals or social gatherings (for example
ceilidhs).
_Avoid_: "the new church", "the school building"

### The weekly cycle

**Weekly template**:
The fixed default service schedule that repeats every week unless changed.

| Service             | Time                                     | Notes                                         |
| ------------------- | ---------------------------------------- | --------------------------------------------- |
| Weekday Matins      | 07:30                                    | Monday to Friday                              |
| Weekend Matins      | 08:30                                    | Saturday and Sunday, followed by Divine Liturgy |
| Divine Liturgy      | 10:00 (weekend)                          | after Matins                                  |
| Vespers             | 18:30 daily                              |                                               |
| Supplicatory Canon  | 19:00 Monday, after Vespers             | to the Mother of God                          |

_Avoid_: "schedule", "timetable"

**Override**:
A change to the normal week, for one week only. For example a weekday Liturgy (either Matins
05:45 plus Liturgy 07:00, or Matins 08:30 plus Liturgy 10:00), a feast-day change, or an
evening talk (before or after Vespers). A change replaces or adds to one week only.
_Avoid_: "exception", "special service"

### Content tiers

**Announcements**:
The text-only block for the week ahead (upcoming events, priest availability, confessions)
that lives directly under the calendar. It holds the things that do not happen every week,
like Bishop Raphael's talks and Wednesday confessions, because he travels.
_Avoid_: "notices", "news"

**Posts**:
Blog posts documenting community events after the fact, shown below the calendar and the
announcements.
_Avoid_: "articles", "updates"

**Weekly post**:
The hand-assembled document (calendar plus announcements) posted to WhatsApp, Facebook, and
email. The format is the guide in `examples/example-cal-post.md`.

### Calendar

**Day title**:
The feast or commemoration name for a day (for example "Prophet Zecharias", "Feast of the
Nativity of the Most Holy Mother of God"). Filled in from the church-year calendar file, then
checked by the editor when setting the week.
_Avoid_: "saint of the day", "feast name"

**Fasting symbol**:
The mark planned for each calendar day, filled in from the church-year calendar file, then
checked by the editor. The site currently shows the fasting level as text, without symbols.
The file uses five levels (the exact symbols are still to be decided, see the proposal):

| Level in the file           | How many days (2026 to 2027) |
| --------------------------- | ---------------------------- |
| Strict fast                 | 95                           |
| Wine and oil allowed        | 49                           |
| Fish allowed                | 32                           |
| Fast free                   | 31                           |
| Fast day, dairy, eggs, fish | 7 (the Cheesefare week)      |

The site only shows the level. It does not work out the fasting calendar itself, it reads it
from the file.
_Avoid_: "fasting rule", "typikon", "fasting level"

**Weekly announcements**:
The plain text block (with any links) that goes with the calendar, edited by the same people
who edit the week, shown below the calendar.

### Giving

**Wishlist item**:
A fixed-price item for the new church that a donor can select and give toward. Prices come
from a separate list.
_Avoid_: "campaign", "fund", "goal"

## External integrations

- **Google Calendar** is where the calendar is meant to live, edited by the volunteers in
  Google. The homepage does not read it yet; the week is typed into
  `edinburgh-orthodox/data/services.yaml` (see issue #1).
- **Mailchimp** sends the email newsletter and the contact form.
- **Square** takes donations and wishlist payments.
