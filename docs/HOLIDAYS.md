# Holiday Calendars — Import Any Region

Cadence ships with **Japanese public holidays built in** (computed from the 祝日法 rules — see [ARCHITECTURE.md](ARCHITECTURE.md)). Every other region works through the same door: **import a holiday file yourself**. No app update, no network permission, no waiting on the developer.

This document is both the user guide for that feature and the spec the import code is built against. The import/switch UI ships in v0.5 ([ROADMAP.md](ROADMAP.md)); the "None" switch ships in v0.1.

---

## The model: one active source

Settings → Holidays shows a list of holiday calendars. Exactly **one** is active at a time:

| Source | What it is |
|---|---|
| **日本の祝日 (built-in)** | Default. Computed from law rules — correct for any year, no maintenance. |
| **Imported calendars** | Any `.ics` / JSON / 内閣府-CSV file you import, shown by name. Re-import to update, delete when obsolete. |
| **None** | A plain calendar with no holidays at all. |

The active source drives everything holiday-related: red dates, agenda labels, and 休講 recurrence skipping. One source at a time keeps those meanings unambiguous — a red date always means "holiday according to *your* calendar".

**Fallback rule:** when an imported calendar is active, years it doesn't cover fall back to the built-in Japanese rules. A file covering only 2027 can't blank out 2028. (If you want *no* fallback — say, a Hong Kong calendar with no Japanese holidays ever — include all years you care about in the file; a future toggle may make fallback optional.)

---

## Supported file formats

### 1. iCalendar (`.ics`) — the common case

Most public sources publish holidays as an iCal feed. Cadence reads **all-day events**:

- Each `VEVENT` with `DTSTART;VALUE=DATE` becomes one holiday; `SUMMARY` is the name.
- Multi-day all-day events (a `DTEND` more than one day later) mark **every covered day**.
- Timed events (with a clock time) are ignored — a holiday is a date, not an appointment.

### 2. JSON — the hand-editable format

```jsonc
{
  "format": 1,                        // required; bumped if the shape ever changes
  "name": "Hong Kong Public Holidays 2026–2027",
  "holidays": [
    { "date": "2026-01-01", "name": "The first day of January" },
    { "date": "2026-02-17", "name": "Lunar New Year's Day" }
  ]
}
```

- `date` is a local calendar date, ISO `YYYY-MM-DD`. No times, no time zones.
- Duplicate dates in one file are an error — the importer validates the whole file first and rejects it with a clear message (validate-then-transact, same as every other import in Cadence).
- This is also the format to use for **merging regions**: paste two sources into one file if you want, say, Japanese + home-country holidays in a single calendar.

### 3. 内閣府 CSV — the official Japanese source, as-is

The Cabinet Office publishes `syukujitsu.csv` (all national holidays, past and announced). Cadence accepts that exact layout directly — including its Shift-JIS encoding — so the authoritative Japanese source needs no conversion.

---

## Where to get holiday data

Download in any browser, then open the file with Cadence (Android share/open-with, Windows file dialog). Always sanity-check a downloaded file against an official announcement — Cadence displays what you import, it can't verify it.

| Region | Source |
|---|---|
| 🇯🇵 Japan | Built in — importing is optional. Official file: 内閣府「国民の祝日」CSV (`syukujitsu.csv`). |
| 🇭🇰 Hong Kong | GovHK publishes general holidays as iCal and JSON (1823.gov.hk). |
| 🇬🇧 UK | GOV.UK bank holidays, published as JSON and `.ics`. |
| 🇹🇼 Taiwan | Government open-data platform (data.gov.tw) — annual administrative calendar, CSV/JSON. |
| 🇸🇬 Singapore | Ministry of Manpower list; data.gov.sg offers `.ics`/CSV downloads. |
| 🇨🇳 Mainland China | The State Council announces each year's holidays (usually Nov–Dec). Community projects (e.g. *holiday-cn* on GitHub) convert the announcement to JSON. ⚠️ 调休 make-up **workdays** cannot be represented — Cadence marks holidays only; a shifted working Saturday simply stays a normal day. |
| 🌍 Anywhere else | Google Calendar publishes a public-holiday `.ics` feed per country ("Holidays in …"). Open the feed URL in a browser, save the `.ics`, import it. |

Convert anything else (a table on a government site, a PDF) by hand into the JSON format above — sixteen-ish lines per year.

---

## Everyday operations (Settings → Holidays)

- **Import**: pick a file → Cadence validates it, shows a preview (name, date range, count), and saves it as a named calendar.
- **Switch**: tap any calendar in the list to make it active. Switching is instant and non-destructive — nothing is deleted.
- **Update**: re-import a newer file into an existing calendar; its dates are replaced wholesale and the `imported_at` stamp bumps. **This is how holiday data stays current — the app never needs a release for it.**
- **Delete**: remove an imported calendar; if it was active, the source falls back to built-in.
- Imported calendars ride along in the normal JSON export/backup, like all your data.

---

## FAQ

**Why not fetch holidays automatically?** Cadence has no network permission — that's the product's core privacy promise, locked in [PRODUCT.md](PRODUCT.md) non-goals. Holidays are announced 1–2 years ahead; a once-a-year manual import beats a permanent network hole.

**Can I show two regions at once?** Not as two active calendars — red dates and 休講 skipping need a single authority. Merge the two sources into one JSON file instead. If real demand shows up, a multi-active mode with per-calendar colors is a possible post-1.0 feature; it's deliberately not in scope now.

**Do imported calendars affect 休講 (class skipping)?** Yes — "skip holidays" always means the *active* calendar. Switch to None and no class is ever skipped.

**What about lunar-calendar holidays (旧正月, 中秋)?** They're fixed dates once a government announces them — which is exactly what the published files contain. Cadence doesn't compute lunar dates; it displays what the file says.
