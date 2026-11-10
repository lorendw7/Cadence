# Product scope

Updated: 2026-11-10. Cadence aims to serve **all Kyushu University students** with courses, personal arrangements and coursework in one dependable planner. It is an independent student project; university endorsement, partnership and system access have not been obtained. [REDESIGN.md](REDESIGN.md) defines behavior.

## Audience and promise

Design for undergraduate and graduate students, international students, different campuses and departments, and students using assistive technology. Validate their actual schedules and devices in a representative pilot. Students need to know their teaching week, next class, room, personal commitments and deadlines, and handle changes without breaking the semester timetable.

The planned desktop core works locally, offline and without registration. Optional authorized university integration should reduce setup effort while keeping manual entry and local import available. Personal arrangements and coursework are excluded from timetable sharing. Daily planning and local statistics need no server; installation, updates and any enabled school connection use the internet.

Windows, Linux and macOS are the target platforms. **No Android or iOS product development is planned**; the retained Android runner is legacy scaffolding. A **Web scheduling system is a candidate**, distinct from today's static project website. Evaluate browser-local storage first and justify any backend separately; browser support, data durability, security and operating cost must pass a feasibility decision before committing to delivery. See [SECURITY.md](SECURITY.md).

## Local core and pilot scope

| Area | Required behavior |
|------|-------------------|
| Semester | Explicit week-one Monday, end date, timezone and configurable periods |
| Courses | Multiple rules per course; weekly, odd/even and selected teaching weeks |
| Exceptions | Cancel, move or change one occurrence and restore it |
| Personal arrangements | Independent timed/all-day plans and bounded weekly repetition |
| Unified schedule | Today and time-based week views, with non-blocking conflict warnings |
| Coursework | Course-linked tasks and deadlines; exams as linked timed arrangements |
| Today | Daily unfinished task count, separate overdue and undated groups; refresh after midnight/resume |
| Editing | Direct course editing, recoverable local drafts, automatic persistence with truthful failure status |
| Notifications | Opt-in local OS reminders while the process runs; closed-process delivery separately validated |
| Weekly review | On-device planned time, daily load, completed tasks and current overdue count; see [statistics rules](STATISTICS.md) |
| Files | Previewed timetable sharing, duplicate-aware import, full backup/restore |
| Quick setup | Fixed-template CSV/paste with validation and preview; disclose supported formats |
| University coverage | Validate different academic periods, irregular courses and campus/building labels; no universal preset assumed |
| Language and access | Japanese / English / Chinese, keyboard, screen reader and large-text acceptance |
| Desktop | Windows, Linux and macOS, each validated on its native host |

A task deadline is not a reserved time slot. A public holiday is not proof a class is cancelled. An imported course is not automatically subscribed to future changes.

## University connection and Web candidate

School-approved authentication and read-only timetable import are explicit conditional goals. Authentication and access to an individual's course data require separate confirmation; no public developer timetable API or permission has been confirmed. A willing supervisor may help establish the institutional contact, but their support is not authorization. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) defines consultation, data scope and acceptance. Missing approval does not block the local product.

The Web candidate should answer whether browser access reduces installation barriers without compromising private schedules. Compare a browser-local client with a justified server-backed alternative. Hosting a website does not provide accounts, cross-device sync or durable backups. No Web app, backend or chosen hosting provider is implied by this design.

## Deliberate exclusions

Mobile apps, unapproved school scraping, credential collection, enrollment writes and grade retrieval are outside the plan. External calendar APIs/subscriptions, screenshot/AI extraction, collaborative editing, wages and focus/habit dashboards remain out of active scope. A central account service, hosted personal database, cloud sync and telemetry are not prerequisites; any proposal needs a purpose, security review, owner and cost plan. Initial desktop delivery uses GitHub Releases; no automatic updater or store release is promised.

## Distribution and success

Distribute verified desktop packages through GitHub Releases. Progress from a working local slice to a representative pilot across academic backgrounds, campuses, languages and accessibility needs, then wider university availability. The Web candidate and authorized integration have separate decision gates. Record actual tested coverage and unresolved cases rather than claiming all students are already served.

Success means students can independently set up/import courses, find today's room, handle changes, recover data and get help. Use voluntary usability sessions and privacy-preserving issue reports; do not collect timetable contents or add background analytics. Wider release requires named maintainers, upgrade/recovery guidance and a handover plan, without invented adoption numbers or response guarantees.

## Current status

The repository contains a Today placeholder, a separate task-model exercise, platform scaffolding and check workflows. Course management, storage, imports, school login and the Web system remain unimplemented. Preserve that distinction on the website and retain the small-lesson teaching agreement in [LEARNING.md](LEARNING.md).
