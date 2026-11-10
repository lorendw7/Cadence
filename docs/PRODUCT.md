# Product scope

Updated: 2026-11-10. Cadence is a **time-management application primarily for students, also suitable for teachers and other users**. Courses are one schedule category alongside personal, study and work arrangements. No school identity or affiliation is required. The project is independent and has no university endorsement or integration permission.

## Direction and actual status

Windows, Linux, macOS and **Web are confirmed product targets**. No Android/iOS product is planned. Flutter `shadcn_ui` is selected for an academic-journal interface: muted wine `#7C394B`, warm paper `#F6F5F1`, sage `#6F877C`. It is not installed or implemented yet. See [ADR-004](adr/004-shadcn-web-direction.md).

The learning executable displays Today and two read-only sample tasks with completion labels. Task editing and persistence are not implemented. No functional Web planner exists; the website is a concept presentation. The learner writes core code as lessons progress. The assistant handles delegated docs/website work, teaching, review and appropriate tests/templates, not a substitute implementation.

## Planned first browser-local version

| Area | Future implementation target |
|------|-------------------------------|
| Schedule | Manual course/personal-entry CRUD and bounded weekly repeats |
| Views | Today and week from common planning data |
| Tasks | Manual tasks and completion |
| Language | Japanese / English / Chinese |
| Data | Memory by default; explicit optional browser-local saving |
| Transfer | Strict versioned JSON, maximum 1 MiB UTF-8 and 2,000 total records; preview then confirmed whole-data replacement |
| Control | Private JSON export and clearing application data |
| Interface | Flutter `shadcn_ui`; keyboard and readable desktop-browser layouts |

This is a plan, not an existing MVP. The initial browser version excludes backend/accounts, cloud sync, school APIs, CSV, notifications and single-occurrence changes. Browser saving does not encrypt, synchronize or back up data. The exact adapter is evaluated during implementation; `localStorage` is the proposed small-snapshot option, with explicit limits and failure handling. Private JSON transfer is distinct from future filtered timetable sharing.

## Broader desktop and learning scope

| Area | Planned behavior |
|------|------------------|
| Semester and courses | Academic dates, teaching weeks, configurable periods, multiple rules and odd/even/selected weeks |
| Exceptions | Preview and restore one cancellation, move or room change |
| Personal plans | Independent timed/all-day plans and bounded repeats |
| Schedule | Unified views, understandable conflicts and relevant provenance |
| Coursework | Linked tasks, deadlines and exams; a deadline does not reserve time |
| Editing and storage | SQLite, recoverable drafts, truthful failures and migrations |
| Review/reminders | Local planned-time review; opt-in native reminders with tested limits |
| Files | Filtered timetable sharing, duplicate-aware import, full backup/restore; later CSV/paste |
| Reach | Three languages, accessibility, representative student/teacher trials and native validation |

A public holiday does not cancel a class automatically; file import does not subscribe to updates. [REDESIGN.md](REDESIGN.md) defines these longer-term behaviors. None becomes complete merely because its design exists.

## School feedback and optional integration

Prepare a fictional-data demo only after its individual features pass acceptance. [SCHOOL_DEMO.md](SCHOOL_DEMO.md) describes that future demonstration, not an available app or a sent invitation. Students and teachers may provide feedback without authenticating a school identity.

School identity and read-only timetable import remain optional future possibilities. A supervisor's support or student's consent does not grant system access. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) defines the separate permission route. **School approval is not a prerequisite for developing or independently using the manual planner.**

## Delivery and success

Begin with a small independently usable local slice; release only platforms and capabilities actually validated. Desktop delivery initially uses GitHub Releases; the future Web app needs its own deployment/storage/security checks. Wider use needs support ownership and recovery guidance, not invented adoption claims.

Success means a user can record a commitment, understand today's time, finish a task, recover their own data and get help. Mobile apps, credential collection, unapproved scraping, enrollment/grade writes, AI extraction and unrelated lifestyle dashboards remain excluded. Backend data storage, synchronization and external calendar APIs require separate decisions.
