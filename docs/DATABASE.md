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
  category      TEXT NOT NULL CHECK (category IN ('class','meeting','todo')),
  color         TEXT,
  start_time    TEXT NOT NULL,                    -- local wall time, ISO 8601 (no zone)
  end_time      TEXT,
  all_day       INTEGER NOT NULL DEFAULT 0,
  location      TEXT,
  priority      TEXT CHECK (priority IN ('high','medium','low')),  -- todo only
  completed     INTEGER NOT NULL DEFAULT 0,       -- todo only
  completed_at  TEXT,
  reminder_min  INTEGER,                          -- notify N minutes before start
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

-- ── Focus sessions (v0.4) ───────────────────────────────────────
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
-- keys: language ('en'|'zh'|'ja'|'system'), theme ('light'|'dark'|'system'),
--       week_start ('mon'|'sun'), todo_rollover ('0'|'1'),
--       daily_summary_time ('07:30'), backup_keep_days ('14')
```

drift manages `schema_version` internally via its `MigrationStrategy` — bump `schemaVersion`, write an `onUpgrade` step, done.

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
