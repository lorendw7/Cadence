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
  reminder_min  INTEGER,                          -- notify N minutes before start
  -- class-only fields
  room          TEXT,                             -- 教室 (shown in the 時間割 grid)
  teacher       TEXT,
  skip_holidays INTEGER NOT NULL DEFAULT 1,       -- 休講 on 祝日: recurrence skips bundled holidays
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
--       daily_summary_time ('07:30'), backup_keep_days ('14'),
--       periods (JSON: [{"n":1,"start":"09:00","end":"10:30"}, …]),  -- 時間割 grid
--       term_start / term_end ('2026-10-01' …),                      -- 前期/後期 presets
--       wareki ('0'|'1'),        -- show 令和 years
--       rokuyo ('0'|'1'),        -- show 六曜 (default 0)
--       quiet_start / quiet_end ('23:00' / '07:00')                  -- notification quiet hours
```

drift manages `schema_version` internally via its `MigrationStrategy` — bump `schemaVersion`, write an `onUpgrade` step, done.

## Not in the database: 祝日 (public holidays)

Japanese public holidays ship as a **bundled asset** (`assets/holidays_jp.json`, generated from the Cabinet Office CSV), not a DB table: the data is static per app release, identical for every user, and must never require network. Recurrence expansion and the calendar painter read it through one `HolidayService`. Refreshed once a year with an app update.

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
