# Roadmap

Updated: 2026-11-10. Goal: **a time planner primarily for students, also suitable for teachers and other users**. Courses are one schedule category; no school identity is required. Windows/Linux/macOS and Web are confirmed targets, with Flutter shadcn_ui selected but not installed. No mobile product is planned. [REDESIGN.md](REDESIGN.md) defines behavior; [ADR-004](adr/004-shadcn-web-direction.md) records the current direction.

## Repository baseline

The current learning application displays Today and two read-only sample tasks. Lesson 3 format, static analysis and all nine automated tests pass, including two window sizes; local Windows visual confirmation remains pending. Windows, Linux, macOS and Android runners and desktop check workflows exist. Android is retained legacy scaffolding, not a release commitment; there is no iOS runner or functional Web app. The public website is a static project site. Feature checkboxes below remain open until implementation and acceptance pass. The starter package version is not a completed release. No school partnership, integration permission or adoption is established. All application features remain learner-led work; the read-only list is the learner's implementation, with assistant-prepared tests and progress documentation.

## Implementation order

The stages group product acceptance, not the order of beginner lessons. Follow [LEARNING.md](LEARNING.md): task model → in-memory task list → local persistence and recoverable drafts → Today/personal plans → course rules → review/files/reminders. The current focus is task foundations; the executable still has no task editor or saved schedule. Build a usable local slice before expanding infrastructure; plan Web implementation and separately confirm school-interface conditions without making either a dependency for local progress.

The [architecture decision](adr/001-local-application-boundaries.md) and [application contracts](APPLICATION.md) define the next boundaries. Add them per working slice, without prebuilding empty layers. Persistence introduces revision-checked commands, one database writer and honest save failures. Multiple schedule consumers introduce consistent snapshots and one bounded occurrence projector. These are design decisions, not completed features.

Use [PROJECT_WORKFLOW.md](PROJECT_WORKFLOW.md) to turn one acceptance outcome at a time into a small task, branch, tested/reviewed PR and eventual versioned release. A lesson may complete one internal step; a feature closes only when its acceptance passes. The learner writes application code while the assistant teaches, tests and reviews. Lesson planning and its provisional estimates belong in [LEARNING.md](LEARNING.md), not in release-readiness claims.

## A — Course timetable

- [ ] Three main destinations: Today / Week / Tasks; courses and review under Week, settings in a menu.
- [ ] Today counts and overdue/undated groups, with midnight/resume refresh; see [TODAY.md](TODAY.md).
- [ ] Course editor with recoverable drafts and honest save status; see [EDITING.md](EDITING.md).
- [ ] Local database, migrations, injected clock and basic locale support.
- [ ] Application storage ports, revision checks, consistent read snapshots and stale-result rejection.
- [ ] One writer per data directory; startup/migration failures preserve recovery options.
- [ ] Semester anchor, end date, timezone and configurable periods.
- [ ] Multiple course rules, odd/even/selected teaching weeks.
- [ ] Time-based weekly view with visible teaching-week number.
- [ ] Cancel/move/change room for one occurrence; restore the original.
- [ ] Validate week boundaries, moved-in occurrences and semester edits.

Acceptance: create a semester and course; move one class to another week; verify original removal, one target instance and successful restoration.

## B — Personal arrangements

- [ ] Timed and all-day arrangements independent of a semester.
- [ ] Bounded weekly repeats with selected weekdays and week interval.
- [ ] Single-occurrence changes and cancellation.
- [ ] Unified Today and week projection; filter courses/personal plans.
- [ ] Explain overlap warnings and permit intentional conflicts.
- [ ] Test overnight plans, timezone display and half-open boundaries.

Acceptance: a personal appointment conflicts with a moved class; both remain visible, and restoring the class leaves the appointment unchanged.

## C — Coursework and files

- [ ] Course-linked and independent tasks; date/time deadlines and completion.
- [ ] Exams as course-linked personal arrangements.
- [ ] Versioned timetable file with exact export preview and field allowlist.
- [ ] Validated import, new/existing semester mapping and duplicate detection.
- [ ] Fixed-template CSV/paste entry with row errors and a confirmation preview; see [QUICK_IMPORT.md](QUICK_IMPORT.md).
- [ ] Validate supported school-export formats only when real, appropriately shared examples and permitted use are available; retain manual entry as a complete path.
- [ ] Full private backup and transactional restore with pre-restore backup.
- [ ] Test malformed/future-version files and rollback.
- [ ] Exclusive restore drains pending writes and invalidates all pre-restore commands/previews.

Acceptance: a student can set up a timetable without a school connection or app account, import a supported file twice without duplicate courses, and recover a full backup. Shared files exclude personal arrangements, private notes and tasks. Unsupported school formats receive an honest explanation and a manual/template alternative.

## Local review and notifications

- [ ] Planned time and daily union of occupied intervals; no actual-time claim.
- [ ] Completed tasks, current overdue count and clearly scoped week comparison.
- [ ] Offline aggregation and boundary tests; see [STATISTICS.md](STATISTICS.md).
- [ ] Opt-in local system notifications while the application process runs.
- [ ] Cancel/reconcile reminders after changes; permissions and resume tests; see [NOTIFICATIONS.md](NOTIFICATIONS.md).

Closed-process delivery requires separate platform acceptance. All these features remain planned.

## D — Representative student and teacher pilot

- [ ] Run a limited Windows pilot, then validate Linux/macOS on native hosts before offering those packages.
- [ ] Recruit voluntary student and teacher participants across academic backgrounds and accessibility needs; document gaps in coverage.
- [ ] Verify actual academic-period, teaching-week, period-time, room and irregular-course needs with participants instead of treating one faculty's timetable as universal.
- [ ] Japanese / English / Chinese strings and usable keyboard navigation.
- [ ] Light/dark modes, small windows and large text.
- [ ] Data retained across app updates; clear data-folder instructions.
- [ ] Downloadable packages, checksums, known issues and manual upgrade notes.
- [ ] Website matches available features and actual tested platforms.
- [ ] Record voluntary feedback about first setup, next-class lookup, changed classes and recovery without collecting complete private schedules.

Acceptance: students outside the developer's own class can complete the core flows without developer assistance, and identified unsupported academic patterns are either fixed or clearly documented. Serving students and teachers describes the audience; it does not imply every device is supported. Publish the desktop requirements and access gaps honestly.

## E — Planned Web implementation

Web is a confirmed target, not yet developed. Complete reusable local behavior first; the learner implements this stage through small lessons.

- [ ] Introduce the selected shadcn_ui package in the UI stage after pinned-SDK and dependency checks.
- [ ] Build manual schedule CRUD, bounded weekly repeats, tasks/completion and Today/Week in the browser with three-language controls.
- [ ] Default to memory; require explicit selection for browser-local saving. Validate the proposed localStorage snapshot adapter, failures, clearing and single/multiple-tab limits.
- [ ] Implement strict versioned JSON with 1 MiB UTF-8 / 2,000-record limits, preview, cancel, confirmed whole-data replacement, private export and clearing.
- [ ] Test malicious input, invalid files, quota/unavailable storage, failed replacement and restoration from export using fictional data.
- [ ] Verify browser layout, keyboard access, resource paths, hosting security, privacy explanation and actual deployed behavior.
- [ ] Only after acceptance, prepare a functional school/user demonstration following [SCHOOL_DEMO.md](SCHOOL_DEMO.md).

Acceptance: the declared browser-local flows work and limitations are visible. No backend, account, cloud sync, school API, CSV, notifications or single-occurrence class change is included. The website currently shows concepts only. This stage is provisionally 8–16 extra lessons after reusable desktop behavior exists; see [CURRICULUM.md](CURRICULUM.md), not a fixed delivery promise.

## Parallel track — Approved university integration

- [ ] Seek a willing Kyushu University staff contact, potentially a supervisor, and confirm project eligibility and the application route.
- [ ] Confirm authentication approval separately from access to students' course data; record available interfaces and allowed uses.
- [ ] Define minimum read-only fields, student consent, retention, disconnect behavior, failure recovery and responsibility before implementation.
- [ ] If approved, prototype with authorized accounts and fixtures, then run a limited voluntary trial before wider availability.
- [ ] Validate provenance, last successful refresh, duplicate detection and previewed changes without overwriting private local edits.
- [ ] Retain useful manual entry/import when authorization is denied, withdrawn or temporarily unavailable.

Follow [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). No credential collection, simulated-login scraping or claim of university endorsement is an assumed fallback. School approval and data availability are external dependencies, not promised milestone dates. A local/manual release can progress independently.

## F — Wider availability and maintenance

- [ ] Broaden desktop rollout after representative pilot findings and native acceptance; publish supported systems, academic patterns and known gaps. The planned Web app passes its own pilot and security gates.
- [ ] Assign release, support, privacy/security and school-contact responsibilities; document handover when the student maintainer graduates or leaves.
- [ ] Provide onboarding, accessible help, a public issue route and a private route for sensitive reports, with realistic response expectations.
- [ ] Verify upgrade/recovery procedures, dependency review and rollback/release-withdrawal handling with actual packages.
- [ ] Publish an accurate privacy notice before enabling any network service; document data flow and service operators.
- [ ] If approved integration introduces a backend, assess expected concurrency, request limits, operating costs and service degradation before enabling it broadly.
- [ ] Review success through voluntary task-based feedback and support outcomes; do not require telemetry or invent adoption targets/results.

Acceptance: supported students can discover, install, use and recover the app without knowing its developer; support and maintenance remain assigned. Academic coverage and platform gaps are visible. A broad target audience does not mean claiming every student or teacher uses it.

## Estimation and deferred scope

The earlier 80–140-hour figure covered a narrower local desktop plan and is not an estimate for this broader product goal. Re-estimate each stage after a working persisted slice, representative timetable samples, Web implementation constraints and official interface conditions are known. Separate engineering effort from beginner learning, tester/device availability, signing costs and school review time. Do not commit to a total completion date from the old figure.

Cross-device cloud synchronization, external calendar integrations, AI extraction, collaborative editing and actual-time tracking remain separate proposals requiring demonstrated demand and their own designs. The expanded audience does not by itself justify adding a hosted database or mandatory account to the offline core.
