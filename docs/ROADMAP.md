# Roadmap

Updated: 2026-11-13. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps general time management central, develops the local Windows planner first and defers school access to a later extension. Screenshot import is unscheduled and will be considered only if needed. The learner implements one small lesson at a time. This is a plan, not shipped behavior.

## Repository baseline

The app has in-memory task addition, validation, completion, deletion and latest-delete undo. Saving, calendars, import and mobile support are not implemented. [LEARNING.md](LEARNING.md) records actual checks and pending manual acceptance. The artwork and GitHub Pages website present concepts.

## Working order

**Reliable local tasks -> direct plans and timetable editing -> Today and Week -> Windows trial and release -> Android adaptation -> other platform and store gates -> later personal-service review.**

School feasibility, application preparation and integration are deferred extensions. No school work is scheduled alongside current local development. The local release does not wait for either. Screenshot recognition and CSV/table import have no fixed position in this sequence.

Use [PRODUCT.md](PRODUCT.md#feature-priorities) for priorities. Tasks, deadlines, appointments and available time are core alongside classes. Windows is the first working product, not a disposable prototype. Design compact layouts during that work, then validate Android without waiting for complete macOS/Linux releases.

The survey did not identify a mobile OS. Android fits the current development environment; schedule iOS with a compatible Mac and real device. Shared Flutter code does not replace native tests.

## Evidence and planning alongside delivery

The [survey](SURVEY_FINDINGS.md) supports investigating less entry and clear phone viewing. It does not prove adoption of a manual planner. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) records the B plus C direction and the latest narrower delivery route.

Test the direct-editing loop with a class, a report deadline, a reserved work session and a personal appointment. Measure setup effort, lookup, corrections and voluntary return use. Keep raw responses and personal pitch material outside the public repository.

Prepare a fictional-data demonstration of local planning. Keep [school-access questions](UNIVERSITY_INTEGRATION.md) as a later reference. A concept demonstration may show planned behavior, but must label it. No school login, credentials or real school-data access is needed to demonstrate the proposed value.

## A — Reliable local tasks

- [ ] Continue the async lesson and introduce persistence through learner-owned steps.
- [ ] Offer Save on this device or Temporary use before reading saved records.
- [ ] Introduce one local drift/SQLite adapter when needed; keep one active writer.
- [ ] Add task editing, optional notes and date-only/exact deadlines.
- [ ] Confirm writes before showing saved status; retain input on failure and prevent duplicate submissions.
- [ ] Keep unsaved forms in memory with Save, Discard or Cancel.
- [ ] Verify offline restart, storage failures, damaged data and explicit mode changes.
- [ ] Establish backup/restore/clear safety before private-data trials.

Acceptance: confirmed saves survive restart. Temporary startup leaves an old database unopened. Failures retain input and the last confirmed records. No login or network is needed.

## B — Personal plans, Today and Week

- [ ] Add timed/all-day plans and weekly classes with optional location and notes.
- [ ] Use a stable workspace timezone; test date boundaries, overnight intervals and daylight-saving gaps.
- [ ] Add bounded weekly repeats and visible editing scope.
- [ ] Derive views, counts and conflicts from the same confirmed records and date rules.
- [ ] Keep Today, Week, Tasks and Settings; expose only working destinations.
- [ ] Show the next commitment, daily agenda, due tasks and separate overdue/undated groups.
- [ ] Show free intervals in Week beside an accessible task list.
- [ ] Reserve a separate work plan before a task deadline. Moving that plan must not move the deadline or complete the task.
- [ ] Design readable desktop and compact views with three-language controls, keyboard access and large text.

Acceptance: enter a class, personal appointment and report deadline. Find available time and reserve a writing session. Today and Week agree, overlaps remain visible, and ordinary planning needs no semester setup.

## C — Private backup and first Windows trial

This stage completes the direct-editing local product. Neither screenshot import nor school access is a requirement.

- [ ] Add single-occurrence time/room changes, cancellation and restoration with clear occurrence/series scope.
- [ ] Preserve occurrence identity and prevent duplicate display. Cancellation retains previous overrides; restoring it returns the previous effective time and room.
- [ ] State supported recurrence rules. Reject unsupported rules visibly rather than silently flattening them.
- [ ] Extend versioned JSON backup/restore to tasks, plans, repeats and occurrence corrections.
- [ ] Validate bounds, dates and references before replacement; retain recovery data on failure.
- [ ] Verify clear, temporary cleanup, failed writes, cancelled work and restart in the real Windows package.
- [ ] Retain language support, keyboard access and 200% text scaling.
- [x] Lesson 16 removed the teaching counter under explicit delegation; historical results remain in LEARNING.
- [ ] Run a small Windows trial, fix blocking defects and publish only accepted behavior with a support route.

Acceptance: create commitments, correct one repeated occurrence, see available time and reserve work before a deadline. Restart offline, export, preview a restore and clear data without developer help. A release may be complete within this stated local scope even while school access is unresolved.

## D — Android phone validation

After the working Windows flow, adapt the same data and rules to Android. Complete macOS/Linux releases and a school connection are not prerequisites.

- [ ] Keep Today, Week and Tasks reachable in compact layouts.
- [ ] Make the next commitment, time and location easy to read for a class, meeting or appointment.
- [ ] Use a daily agenda and day selection in Week without shrinking a desktop grid into tiny text.
- [ ] Test local storage, backup export/import, permissions and cancelled file actions on a real device.
- [ ] Test pause/resume, process termination, keyboard overlap, Android Back, rotation, safe areas, touch and screen readers.
- [ ] Test manual Windows-to-phone backup transfer with matching versions and explicit replacement. It is a snapshot, not a merge or automatic sync.
- [ ] Compare daily lookup and plan adjustment with the participant's current method.

Acceptance: the same records remain correct on the phone. A person can edit or restore, inspect commitments, reserve work, correct a change, close/reopen and recover data. A passing build or narrow Windows screenshot is insufficient.

## E — Later platform expansion

Retain iOS, macOS, Linux and Web. Choose bounded targets after the Windows/Android flow is useful.

- For iOS, use a compatible Mac with Xcode, simulator and real iPhone checks for storage, file access, lifecycle, VoiceOver and signing.
- For macOS/Linux, validate native installation, files, dialogs, input, restart, upgrades and the planning flow.
- For Web, define browser-local storage, quota/eviction, tab ownership, reload/offline limits and updates.
- Record platform differences and only advertise accepted capabilities.
- Preserve the existing concept website. A future Web planner needs a separate private-data boundary and deployment review.

Acceptance: the distributed target passes the local user flow plus its platform checks. Missing hardware delays that platform, not independent releases.

## F — Free Android and iOS store releases

Prepare each store release after its native flow passes. Documentation work does not purchase accounts or submit builds.

- [ ] Prepare truthful screenshots, age ratings, support information and privacy declarations.
- [ ] Have the maintainer handle identity, agreements, fees and signing credentials outside Git.
- [ ] Recheck current store requirements before scheduling.
- [ ] Recruit testers where needed, retain feedback, fix defects and retest.
- [ ] Test install, update, offline restart and recovery from the distributed build.

See [official release references](FREE_EDITION.md#delivery-and-testing). Store approval and working distributed behavior are both needed. Store waiting time is separate from development effort.

## After store launch — Review services and income

The selected future personal service remains Google login with Node.js, TypeScript, Fastify and PostgreSQL under [ADR-011](adr/011-optional-sync-service.md), planned at JPY 2,500 per month. Hosting, quotas and launch remain future decisions. Local planning needs no server.

Before a sync pilot, verify repeated cross-device need, session and ownership controls, retries, conflicts, deletion, restore, off-host backups, common quotas and an export/shutdown plan. Follow [CLOUD_SYNC.md](CLOUD_SYNC.md). Personal sync does not discover school timetable changes or grant school-data access.

Review advertising separately for platform support, user impact, privacy and actual publisher revenue. Count no revenue before a working channel exists. Separate monthly cost coverage from recovery of past spending. Everyone receives the same free functions and published service rules.

A school-required intermediary would be a separate integration and operating decision. It does not silently move general personal sync into the first release or fit within the same JPY 2,500 budget without review.

## Import input coverage

Screenshot recognition is optional, unscheduled work. Add it only if actual user needs justify it after comparison with direct editing. A delayed or rejected school application does not automatically trigger OCR work. CSV/table import also waits for a real export-file need.

[QUICK_IMPORT.md](QUICK_IMPORT.md) retains a conditional design. If selected later, require supported samples, bounded files, reviewed uncertainty, date/duplicate checks, cancellation and atomic save. Do not add OCR packages or import architecture before the work is selected.

## Optional — Cloud help with personal API keys

Personal-key cloud assistance is separate later work. Before implementation, show the destination and payload, obtain an explicit send choice, protect keys, bound requests and costs, and preserve drafts on failure. No automatic upload or billable fallback is permitted.

## Later local improvements

Choose reminders, review totals, broader recurrence or sharing from observed need. Basic occurrence correction remains in stage C. Advanced academic rules, automatic scheduling, timers, habits and encrypted storage remain separate work.

<a id="external-academic-systems-removed-from-scope"></a>

## Conditional academic-system access

[UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) is retained as reference for a deferred extension under ADR-013. No research, application or connector work is scheduled now. The steps below apply only if the extension is selected later. No submission, approval or usable interface is confirmed.

1. Prepare a fictional-data demonstration and a small read-only data request.
2. Confirm project eligibility, a responsible contact, data owner, available interface and permitted storage.
3. Only after authorization and test access, estimate and build a bounded connector.
4. Begin with user-requested reads and reviewed changes. Keep local notes separate and show source freshness.
5. Pilot with the authorized audience, test expiry/revocation and failures, and obtain any required production permission before wider use.

Prefer an official API or calendar feed if offered. Do not assume that a Google account, school SSO, a public timetable page or a teacher's support permits academic-data access. No school-password collection, scraping, registration writes or grade access is planned.

## Maintenance and estimates

Re-estimate from working code, preserve historical lessons and count shared work once. [CURRICULUM.md](CURRICULUM.md), [QUALITY.md](QUALITY.md), [SETUP.md](SETUP.md) and [RELEASE.md](RELEASE.md) define learning and acceptance.

### Working estimate at 10-15 hours per week

Planning date: 2026-11-13. The maintainer confirmed 10-15 hours per week. These are engineering planning judgments for learner-written code, not measured velocity or commitments. Hours include learning, implementation and normal debugging. The current weekly budget is for the local product; no school-consultation hours are scheduled.

| Milestone or component | Base effort from the current app | Scope |
|---|---:|---|
| Local demonstration prototype | 30-50 hours, about 2-5 working weeks | Fictional tasks, direct plan/class editing and a limited Today/Week walkthrough; unfinished persistence or recovery must be labelled |
| Useful Windows manual pilot | 100-160 hours, about 7-16 working weeks | Complete local/temporary choice, tasks/deadlines, plans/repeats, Today/Week, occurrence correction and recovery; includes prototype work |
| Android adaptation | Additional 40-80 hours | Native storage, files, lifecycle, touch and recovery for the local flow |
| iOS adaptation | Additional 40-80 hours | Compatible Mac/Xcode, simulator, real iPhone, signing and native acceptance |
| Public-release preparation | Additional 20-40 hours for the selected scenario | Trial fixes, packages, support/privacy/store materials and final checks |

The prototype is a subset of the Windows work. Do not add it again. The following are alternative cumulative scenarios, not stages to sum:

| Public local release scenario | Base total | Total with roughly 30% reserve, rounded | At 10-15 hours per week |
|---|---:|---:|---|
| Windows only | 120-200 hours | 160-260 hours | 11-26 working weeks, roughly 3-6 months |
| Windows and Android | 160-280 hours | 210-365 hours | 14-37 working weeks, roughly 3.5-9 months |
| Windows, Android and iOS | 200-360 hours | 260-470 hours | 18-47 working weeks, roughly 4-11 months |

Do not add reserve again. External store/testing waits, hardware access and breaks can extend calendar time. A useful Windows pilot is provisionally 2-4 months; a first-quarter 2027 pilot remains a working aim. The smaller demonstration could be ready in late November to December 2026 if work starts now. It must not be presented as a safe production app.

These scenarios exclude academic integration, screenshot recognition, CSV import, the Web client, complete macOS/Linux validation, cloud sync, ads and advanced planning tools. Removing OCR reduces planned scope; it does not finish the remaining storage and calendar work.

### Conditional connection estimate

Deferred reference only. These earlier estimates are not part of the active schedule or the QREC eight-week study. Re-estimate if school access is selected as a later extension.

Budget about **8-16 additional hours** for consultation materials, required-field mapping and application preparation. School response and approval time are unknown. The school's published authentication rule asks for an application at least one month before the desired start; it is not an approval-time guarantee. See the verified source and eligibility limits in [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md#previously-reviewed-school-materials).

For **one documented, authorized read-only API or calendar feed**, after permission, sample data and test access are available:

| Connection milestone | Incremental base effort | Scope |
|---|---:|---|
| Connected technical prototype | 30-60 hours, about 2-6 working weeks | Read a bounded own-timetable snapshot and show a reviewed draft on one target |
| Connection ready for a limited production release | 80-160 hours total, including its prototype | Mapping, permitted authentication, review/refresh, expiry, duplicate/conflict handling, retention, supported-client checks and pilot fixes |

With roughly 30% reserve, the connection is **about 105-210 additional hours**, or **7-21 working weeks**. This is added once to the chosen local scenario; preparation is separate. Approval waiting is extra calendar time, though it can overlap useful local work. The same developer cannot perform both sets of development hours at full capacity simultaneously.

These are conditional estimates, not a connected-release date. If no documented interface exists, or custom vendor work, server operations, broader data access or continuous notifications are required, make a new estimate. Do not model those cases as a small connector. A general local release can proceed while the connection remains unavailable.

Revisit local estimates after two weeks of actual work and after saving/recovery. Keep the QREC eight-week investigation focused on local planning and user validation. School research and applications are outside that study.
