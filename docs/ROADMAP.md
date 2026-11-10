# Roadmap

Updated: 2026-11-10. Goal: **a course and personal planner for all Kyushu University students**. [REDESIGN.md](REDESIGN.md) defines product behavior. Windows, Linux and macOS are the product targets; no Android or iOS product is planned. A Web system is a candidate to evaluate, not a committed hosted service. A useful offline core, representative student trials and sustainable support come first. Official school integration is a separate, conditional workstream.

## Repository baseline

The current application is a Today placeholder with separate task-model learning work. Windows, Linux, macOS and Android runners and desktop check workflows exist. Android is retained legacy scaffolding, not a release commitment; there is no iOS runner or functional Web app. The public website is a static project site. Feature checkboxes below remain open until implementation and acceptance pass. The starter package version is not a completed release. No school partnership, integration permission or student adoption is established.

## Implementation order

The stages group product acceptance, not the order of beginner lessons. Follow [LEARNING.md](LEARNING.md): task model → in-memory task list → local persistence and recoverable drafts → Today/personal plans → course rules → review/files/reminders. The current focus is task foundations; the executable still has no task editor or saved schedule. Build a usable local slice before expanding infrastructure; evaluate Web feasibility and school-interface conditions without making either a dependency for local progress.

The [architecture decision](adr/001-local-application-boundaries.md) and [application contracts](APPLICATION.md) define the next boundaries. Add them per working slice, without prebuilding empty layers. Persistence introduces revision-checked commands, one database writer and honest save failures. Multiple schedule consumers introduce consistent snapshots and one bounded occurrence projector. These are design decisions, not completed features.

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

## D — Representative student pilot

- [ ] Run a limited Windows pilot, then validate Linux/macOS on native hosts before offering those packages.
- [ ] Recruit voluntary participants across campuses, faculties, undergraduate/graduate study, domestic/international backgrounds and accessibility needs; document gaps in coverage.
- [ ] Verify actual academic-period, teaching-week, period-time, room and irregular-course needs with participants instead of treating one faculty's timetable as universal.
- [ ] Japanese / English / Chinese strings and usable keyboard navigation.
- [ ] Light/dark modes, small windows and large text.
- [ ] Data retained across app updates; clear data-folder instructions.
- [ ] Downloadable packages, checksums, known issues and manual upgrade notes.
- [ ] Website matches available features and actual tested platforms.
- [ ] Record voluntary feedback about first setup, next-class lookup, changed classes and recovery without collecting complete private schedules.

Acceptance: students outside the developer's own class can complete the core flows without developer assistance, and identified unsupported academic patterns are either fixed or clearly documented. Serving all students describes the audience; it does not imply every device is supported. Publish the desktop requirements and access gaps honestly.

## E — Candidate Web system decision

- [ ] Identify the student need and browser/platform coverage a Web system would address; distinguish it from the current public project website.
- [ ] Compare a static client-local application with an application that has a backend. Evaluate local browser storage, file exchange, offline behavior, hosting/maintenance cost and data exposure before choosing.
- [ ] Use fictional data for a feasibility prototype. Verify storage denial/quota, browser data clearing, private mode, export/recovery and application updates; do not promise browser storage is permanent or automatically synchronized.
- [ ] Review threat boundaries and data flows. Prevent imported titles/notes from executing as markup or scripts; restrict third-party scripts and define an effective content security policy for the chosen host.
- [ ] Keep private schedules, credentials and tokens out of public static assets, source maps, URLs, logs and service-worker caches. Decide cache scope and recovery behavior before adding a service worker.
- [ ] If a backend is justified, define authentication, per-user authorization, session/CSRF protection, token handling, encryption, retention/deletion, abuse limits and operational ownership before using real student data.
- [ ] Record a decision to proceed, narrow scope or defer. A proceed decision needs its own implementation, security acceptance and limited-pilot plan; school connection approval remains separate.

Acceptance: a documented feasibility and security decision with explicit data location, supported browsers, recovery limits, costs and owner. This stage does not promise a Web release, accounts or cloud synchronization. Follow [ARCHITECTURE.md](ARCHITECTURE.md) and [QUALITY.md](QUALITY.md) for boundaries and candidate-specific checks. No phone app work is included.

## Parallel track — Approved university integration

- [ ] Seek a willing Kyushu University staff contact, potentially a supervisor, and confirm project eligibility and the application route.
- [ ] Confirm authentication approval separately from access to students' course data; record available interfaces and allowed uses.
- [ ] Define minimum read-only fields, student consent, retention, disconnect behavior, failure recovery and responsibility before implementation.
- [ ] If approved, prototype with authorized accounts and fixtures, then run a limited voluntary trial before wider availability.
- [ ] Validate provenance, last successful refresh, duplicate detection and previewed changes without overwriting private local edits.
- [ ] Retain useful manual entry/import when authorization is denied, withdrawn or temporarily unavailable.

Follow [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). No credential collection, simulated-login scraping or claim of university endorsement is an assumed fallback. School approval and data availability are external dependencies, not promised milestone dates. A local/manual release can progress independently.

## F — University-wide availability and maintenance

- [ ] Broaden desktop rollout after representative pilot findings and native acceptance; publish supported systems, academic patterns and known gaps. Any accepted Web project follows its own pilot and security gates.
- [ ] Assign release, support, privacy/security and school-contact responsibilities; document handover when the student maintainer graduates or leaves.
- [ ] Provide onboarding, accessible help, a public issue route and a private route for sensitive reports, with realistic response expectations.
- [ ] Verify upgrade/recovery procedures, dependency review and rollback/release-withdrawal handling with actual packages.
- [ ] Publish an accurate privacy notice before enabling any network service; document data flow and service operators.
- [ ] If approved integration introduces a backend, assess expected concurrency, request limits, operating costs and service degradation before enabling it broadly.
- [ ] Review success through voluntary task-based feedback and support outcomes; do not require telemetry or invent adoption targets/results.

Acceptance: supported students can discover, install, use and recover the app without knowing its developer; support and maintenance remain assigned. Academic coverage and platform gaps are visible. Being available to all students does not mean claiming every student uses it.

## Estimation and deferred scope

The earlier 80–140-hour figure covered a narrower local desktop plan and is not an estimate for this university-wide goal. Re-estimate each stage after a working persisted slice, representative timetable samples, any Web decision and official interface conditions are known. Separate engineering effort from beginner learning, tester/device availability, signing costs and school review time. Do not commit to a total completion date from the old figure.

Cross-device cloud synchronization, external calendar integrations, AI extraction, collaborative editing and actual-time tracking remain separate proposals requiring demonstrated demand and their own designs. The expanded audience does not by itself justify adding a hosted database or mandatory account to the offline core.
