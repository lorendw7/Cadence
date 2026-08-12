# Database

SQLite via **drift**, one file `cadence.db` in the app's documents directory (`path_provider`). Identical schema and file format on Android and Windows — which is what makes JSON export/import and manual file copy between devices trivially reliable.

drift declares tables in Dart and generates typed row classes and queries. The SQL below is the conceptual schema; the Dart table classes mirror it 1:1.

---

## Schema

```sql
-- ── Events: class | meeting | todo ──────────────────────────────
CREATE TABLE events (
  id            TEXT PRIMARY KEY,                 -- UUID v4
  title         TEXT NOT NULL,
  description   TEXT,
  category      TEXT NOT NULL CHECK (category IN ('class','meeting','todo','shift')),
  color         TEXT,
  start_time    TEXT NOT NULL,                    -- local wall time, ISO 8601 (no zone)
  end_time      TEXT,
  all_day       INTEGER NOT NULL DEFAULT 0,
  location      TEXT,
  priority      TEXT CHECK (priority IN ('high','medium','low')),  -- todo only
  completed     INTEGER NOT NULL DEFAULT 0,       -- todo only
  completed_at  TEXT,
  reminders     TEXT NOT NULL DEFAULT '[]',       -- JSON array of minutes-before, e.g. [1440,30,10]
  insistent     INTEGER NOT NULL DEFAULT 0,       -- re-notify until acknowledged (per event)
  -- class-only fields
  room          TEXT,                             -- 教室 (shown in the 時間割 grid)
  teacher       TEXT,
  skip_holidays INTEGER NOT NULL DEFAULT 1,       -- 休講 on 祝日: recurrence skips the active holiday calendar
  -- shift-only fields
  workplace_id  TEXT REFERENCES workplaces(id) ON DELETE SET NULL,
  break_min     INTEGER NOT NULL DEFAULT 0,       -- unpaid break minutes
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL
);
CREATE INDEX idx_events_start    ON events(start_time);
CREATE INDEX idx_events_category ON events(category);

-- ── Recurrence: one row per recurring event ─────────────────────
CREATE TABLE recurrence_rules (
  event_id    TEXT PRIMARY KEY REFERENCES events(id) ON DELETE CASCADE,
  rrule       TEXT NOT NULL,                      -- "FREQ=WEEKLY;BYDAY=MO,WE,FR"
  exceptions  TEXT NOT NULL DEFAULT '[]'          -- JSON array of skipped dates
);

-- ── Habits ──────────────────────────────────────────────────────
CREATE TABLE habits (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  description     TEXT,
  color           TEXT,
  icon            TEXT,                            -- emoji: 💊 🏃 📖
  frequency       TEXT NOT NULL CHECK (frequency IN ('daily','weekdays','custom')),
  custom_days     TEXT,                            -- JSON: [1,3,5] = Mon/Wed/Fri
  target_per_week INTEGER,                         -- "3× per week" goals
  remind_time     TEXT,                            -- "08:00" local
  archived        INTEGER NOT NULL DEFAULT 0,      -- hide without losing history
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

-- ── Habit check-ins ─────────────────────────────────────────────
CREATE TABLE habit_logs (
  id         TEXT PRIMARY KEY,
  habit_id   TEXT NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  date       TEXT NOT NULL,                        -- local date "YYYY-MM-DD"
  completed  INTEGER NOT NULL DEFAULT 1,
  note       TEXT,
  UNIQUE(habit_id, date)                           -- one check-in per habit per day
);
CREATE INDEX idx_habit_logs_habit ON habit_logs(habit_id);

-- ── Workplaces (アルバイト先, v0.4) ─────────────────────────────
CREATE TABLE workplaces (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,                     -- "コンビニ", "塾講師"
  color       TEXT,
  archived    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

-- Wage history: a wage applies FROM a date, so past months stay correct
CREATE TABLE wage_periods (
  id            TEXT PRIMARY KEY,
  workplace_id  TEXT NOT NULL REFERENCES workplaces(id) ON DELETE CASCADE,
  hourly_yen    INTEGER NOT NULL,                -- integer yen: no floating-point money
  valid_from    TEXT NOT NULL,                   -- local date "YYYY-MM-DD"
  UNIQUE(workplace_id, valid_from)
);
-- Monthly estimate = Σ over shifts: (end−start−break) × wage valid at shift date.
-- Estimate only (見込み) — tax/insurance/night-premium are out of scope (see PRODUCT.md).

-- ── Focus sessions (v0.6) ───────────────────────────────────────
CREATE TABLE focus_sessions (
  id          TEXT PRIMARY KEY,
  event_id    TEXT REFERENCES events(id) ON DELETE SET NULL,  -- attached class/todo (optional)
  started_at  TEXT NOT NULL,                    -- local wall time
  duration_s  INTEGER NOT NULL,                 -- actual focused seconds (breaks excluded)
  completed   INTEGER NOT NULL DEFAULT 1,       -- 0 = abandoned early
  note        TEXT
);
CREATE INDEX idx_focus_started ON focus_sessions(started_at);
-- Per-subject stats join focus_sessions → events(title/category).
-- ON DELETE SET NULL: deleting a course keeps the focus history (unattributed).

-- ── Settings ────────────────────────────────────────────────────
CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
-- keys: language ('ja'|'en'|'zh'|'system'), theme ('light'|'dark'|'system'),
--       week_start ('mon'|'sun'), todo_rollover ('0'|'1'),
--       daily_summary_time ('07:30'),      -- morning digest notification
--       evening_preview_time ('21:00'),    -- tomorrow-preview notification
--       insistent_interval_min ('3'),      -- re-ring cadence for insistent events
--       backup_keep_days ('14'),
--       periods (JSON: [{"n":1,"start":"09:00","end":"10:30"}, …]),  -- 時間割 grid
--       term_start / term_end ('2026-10-01' …),                      -- 前期/後期 presets
--       wareki ('0'|'1'),        -- show 令和 years
--       rokuyo ('0'|'1'),        -- show 六曜 (default 0)
--       quiet_start / quiet_end ('23:00' / '07:00'),                 -- notification quiet hours
--       holiday_source ('builtin_jp' | 'none' | 'calendar:<id>')     -- active holiday calendar (default 'builtin_jp')
```

drift manages `schema_version` internally via its `MigrationStrategy` — bump `schemaVersion`, write an `onUpgrade` step, done.

## Mostly not in the database: 祝日 (public holidays)

The **built-in Japan pack** is computed by a rules engine (祝日法 rules: fixed dates, Nth-Monday holidays, equinox formulas, 振替休日/国民の休日 logic) plus a tiny bundled overrides asset for rare law changes — see ARCHITECTURE.md. No annual data shipping.

The DB stores only **user-imported holiday calendars** — named sets the user manages in Settings: import, re-import to update, switch the active one, delete. The active source lives in `settings.holiday_source`: `'builtin_jp'` (default), `'none'` (plain holiday-free calendar), or `'calendar:<id>'` (an imported set):

```sql
CREATE TABLE holiday_calendars (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL,      -- shown in Settings ("日本の祝日 2027", "HK holidays")
  source_file  TEXT NOT NULL,      -- original filename — "where did this come from"
  imported_at  TEXT NOT NULL       -- ISO timestamp; re-import replaces the rows and bumps this
);

CREATE TABLE holiday_dates (
  calendar_id  INTEGER NOT NULL REFERENCES holiday_calendars(id) ON DELETE CASCADE,
  date         TEXT NOT NULL,      -- "YYYY-MM-DD"
  name         TEXT NOT NULL,
  PRIMARY KEY (calendar_id, date)
);
```

When an imported calendar is active, years it doesn't cover fall back to the built-in rules (a one-year file can't blank out the future). Included in export/backup like everything else.

---

## Design decisions worth remembering

| Decision | Why it matters for daily use |
|----------|------------------------------|
| `UNIQUE(habit_id, date)` on logs | Check-in is **idempotent** — double-tap can't corrupt a streak; enables clean upserts. |
| `CHECK` constraints on enums | A typo like `'meetng'` is rejected at write time, not discovered as a blank calendar later. |
| Indexes on `start_time`, `category`, `habit_id` | The calendar queries a date range on every swipe; keep it O(log n). |
| `archived` on habits | Stop a habit without deleting months of history. |
| `completed_at` + `updated_at` | "When did I finish?"; sorting by recency; backup diffing. |
| `exceptions DEFAULT '[]'` | Always valid JSON — no null checks downstream. |
| Events = local wall time; habit logs = local date | See ARCHITECTURE.md "Time model". The split is deliberate; don't unify it. |
| Money = **integer yen** (`hourly_yen`) | Floating-point money is how you show someone a wrong salary. Yen has no cents — integers are exact. |
| `wage_periods` instead of a wage column | A raise changes future months only; past estimates must not silently rewrite themselves. |
| `skip_holidays` on the event, not global | 大学の授業 skips 祝日, but a バイト shift on a holiday is normal — per-item control matches reality. |
| `holiday_source` is a settings key, not a schema change | Switching holiday calendars (built-in / imported / none) is one row update; imported files are the update channel, so holiday correctness never waits on an app release. |
| `reminders` as a JSON list, not one column | Busy people layer reminders (前日 + 30分前 + 10分前). A single `reminder_min` would be a migration two months in — model it right from day one. |

---

## Export format (the portability contract)

```jsonc
{
  "format": 1,                 // bump when the shape changes; importer switches on it
  "exported_at": "2026-08-12T21:00:00",
  "app_version": "0.3.0",
  "events": [ … ],             // raw rows, snake_case keys as in the schema
  "recurrence_rules": [ … ],
  "habits": [ … ],
  "habit_logs": [ … ],
  "settings": [ … ]
}
```

Rules:
- Import **validates before writing** (parse fully, then apply in one transaction — never half-import).
- Import offers **merge** (skip rows whose `id` exists) or **replace** (wipe + restore). Replace asks for explicit confirmation.
- The format is documented here so a user could reconstruct their data with a text editor — that's the point of local-first.
