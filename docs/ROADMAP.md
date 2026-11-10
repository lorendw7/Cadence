# Roadmap

Updated: 2026-11-11. Build a **general-purpose local time planner**. Personal plans, tasks, Today and Week come first. Courses are optional; no school, account or semester setup is needed for core use. [ADR-007](adr/007-general-purpose-local-planner.md) replaces the earlier university-first order and school-permission gate for general Web release. Desktop is primary; Web and sync are optional later work.

## Repository baseline

The teaching app supports validated task addition, completion toggling, empty-list feedback, deletion and single-level undo in memory. Current acceptance and pending manual checks are in [LEARNING.md](LEARNING.md). There is no persistent planner, working Web app or feature release. Windows/Linux/macOS runners and debug workflows exist; Android is legacy scaffolding.

The [artwork library](../assets/README.md) and static concept website support design discussion. Windows/macOS launcher references use the v2 mark. Flutter page theming, shadcn_ui installation and macOS/Linux runtime icon acceptance remain future work. Artwork, a source commit or a successful build is not an application release.

## Working order

Follow small learner-written features: task behavior → explicit local/temporary choice → reliable task saving and recovery → personal plans and Today/Week → repeats and private backup/restore → a limited desktop trial. Course features, review/reminders, Web, sync and external sources can be selected afterward. Do not make a basic local planner wait for those extensions.

Introduce only the boundaries used by the current feature. Persistence needs one writer, a small storage port, revision checks and honest save failures. Multiple schedule views need a shared bounded projector and consistent snapshots. Use [APPLICATION.md](APPLICATION.md), [DATABASE.md](DATABASE.md) and [PROJECT_WORKFLOW.md](PROJECT_WORKFLOW.md). The learner implements core code; the assistant teaches, reviews and prepares tests.

## A — Reliable local tasks

- [ ] Explain and offer Save on this device or Temporary use on first use; persist no business data before a choice.
- [ ] Keep temporary use in memory without opening an old private database or writing drafts/automatic backups.
- [ ] Save tasks through one local writer; show success only after acknowledgement and keep input on failure.
- [ ] Open or replace an existing saved copy only through an explicit choice and preview.
- [ ] Test restart recovery, failed mode-preference writes and uncertain retries without duplicate tasks.
- [ ] Add task editing, optional deadlines and dependable completion/deletion behavior without a course dependency.
- [ ] Keep or clear an old local copy explicitly when switching to temporary use.
- [ ] Reject obsolete work after switch/restore/clear; report and resume incomplete cleanup.

Acceptance: create and complete a task without an account, save it on this device, restart offline and recover it. A failed save preserves input and the old saved copy. Temporary startup exposes no old private data. See [session transitions](APPLICATION.md#retention-mode-and-session-transitions).

## B — Personal plans, Today and Week

- [ ] Provide Today / Week / Tasks navigation with Settings in a menu; no required school or semester fields.
- [ ] Add, edit and delete timed and all-day personal plans with a required title and optional category, location and notes as specified in [REDESIGN.md](REDESIGN.md).
- [ ] Use an explicit timezone and test overnight entries, date-only ranges and daylight-saving boundaries.
- [ ] Show due-today, overdue, undated and completed tasks from the same interpretation as their counts.
- [ ] Refresh at precise deadlines, local midnight, timezone changes and resume; see [TODAY.md](TODAY.md).
- [ ] Derive Today and Week from one consistent snapshot and reject stale query results.
- [ ] Offer bounded weekly repeats; implement and test any exposed single-occurrence change scope before offering it.
- [ ] Display overlapping entries separately and allow intentional conflicts; state the checked time range.
- [ ] Introduce shadcn_ui in the UI lesson after compatibility checks; preserve input, focus and selection across resize.
- [ ] Add recoverable drafts only in saving mode; see [EDITING.md](EDITING.md).

Acceptance: plan a meeting, a personal appointment and an all-day reminder without a semester. View the same entries in Today and Week, complete a task and keep counts consistent. A repeat ends on the chosen date; overlapping entries remain independently readable. Failure and restart behavior remain truthful.

## C — Private recovery and first desktop trial

- [ ] Define versioned private export/import with bounded input, strict validation and a replacement preview.
- [ ] Preserve IDs and valid references on full restore; create a verified pre-restore copy only where local retention is allowed.
- [ ] Drain pending work before restore and reject earlier callbacks afterward; failed import/restore leaves the original usable.
- [ ] Verify clear scope, exported-copy limits, data location and recovery after migration failure.
- [ ] Test Japanese/English/Chinese, keyboard access, input methods, screen readers, large text and narrow windows.
- [ ] Run a Windows trial with people planning different work, home and study routines; record actual coverage and feedback.
- [ ] Validate Linux/macOS on native hosts before offering those packages.
- [ ] Provide full packages, checksums, versioned upgrade/recovery guidance, known issues and a support route.
- [ ] Match the website to implemented features and tested platforms; do not add download claims before packages exist.

Acceptance: a person unfamiliar with the project can install the supported desktop app, choose storage, plan a week offline, export private data, recover it and clear local data. Unsupported cases are explained. Follow [QUALITY.md](QUALITY.md) and [RELEASE.md](RELEASE.md); a passing debug build is insufficient.

## Optional — Local review and reminders

- [ ] Calculate planned time and the union of occupied intervals locally, with no claim to measure actual work.
- [ ] Count completed tasks, current overdue tasks and meaningful week comparisons; see [STATISTICS.md](STATISTICS.md).
- [ ] Provide opt-in native reminders while the process runs, with permission, cancellation, resume and failure checks.
- [ ] Reconcile reminders from confirmed records; a reminder failure does not undo a saved plan.

Closed-process delivery requires separate platform acceptance under [NOTIFICATIONS.md](NOTIFICATIONS.md). These features can follow a useful first local release.

## Optional — Course planning and assisted import

- [ ] Introduce semesters, teaching-week anchors, period times and course tables only with the optional course feature.
- [ ] Support multiple rules, odd/even/selected weeks and configurable academic periods without assuming one institution's timetable.
- [ ] Preview semester/rule edits; cancel, move, change room and restore one occurrence without orphaned exceptions.
- [ ] Keep personal plans and independent tasks usable without a selected semester; exams are timed plans, not duplicate task timestamps.
- [ ] Add filtered timetable sharing with an exact field allowlist and export preview.
- [ ] Validate imports, map new/existing semesters and periods, and detect repeated native files without matching only names.
- [ ] Add fixed-template CSV/paste with row errors and explicit duplicate choices; see [QUICK_IMPORT.md](QUICK_IMPORT.md).
- [ ] Test representative academic patterns only if claiming support for them; unknown school formats need real permitted samples and separate validation.

Acceptance: add a course alongside an existing personal week, move one class to another week and restore it. Sharing excludes private plans, notes and tasks. Importing the same native file twice creates no duplicate courses. Removing the course feature's setup requirements from core onboarding remains part of acceptance.

## Optional — Browser-local Web

Choose this extension only after reusable local behavior exists and there is a reason to maintain it. A general Web planner has no school-approval gate. Its browser storage, hosting and security still need their own acceptance.

- [ ] Define the supported browser/OS scope and preserve the explicit temporary/local choice.
- [ ] Evaluate IndexedDB for transactional saves, migrations, quota failures and multiple tabs; never copy desktop file-lock assumptions.
- [ ] Verify offline program resources and upgrades before claiming offline startup; a never-opened app needs its first download.
- [ ] Keep the initial candidate small: manual plans/tasks, bounded repeats, Today/Week and three languages.
- [ ] Validate private JSON with the candidate 1 MiB UTF-8 / 2,000-record limits, preview/cancel/replacement, export and clear.
- [ ] Use an origin separate from the static website, HTTPS, a tested script policy and accurate privacy text.
- [ ] Test hostile input, storage eviction, interrupted writes, stale tabs and recovery before real-data use.

The initial candidate excludes backend/accounts, sync, school APIs, CSV, notifications and single-occurrence changes. It is not committed feature parity with desktop. Re-estimate implementation and maintenance when selected; earlier 8–16 extra-lesson estimates are not promises.

## Optional — Sync and external connections

Sync under [ADR-006](adr/006-optional-multi-client-sync.md) and [SYNC.md](SYNC.md) needs separate consent, identity, operating ownership and tests for retries, conflicts, deletion, expired devices and recovery. It is not required for local planning. School identity is only one possible integration, not a universal prerequisite.

A school or other external source needs the relevant access, retention and export permission, a supported interface and a reviewed import flow. Do not collect passwords or use unapproved scraping as a fallback. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) holds the school-specific reference. If access is unavailable or withdrawn, manual planning and eligible saved local data remain useful. The general app's development or release does not wait for a connection.

## Maintenance and estimates

Before wider release, assign releases, support, security reports and handover. Keep a public bug route and a private route for sensitive reports. Test upgrades and withdrawal/recovery using actual packages. Do not require telemetry or invent adoption targets. If a service is later added, define its cost, limits, deletion, backup, ownership and shutdown plan separately.

Implement data protection with the relevant storage and release stages under [DATA_PROTECTION.md](DATA_PROTECTION.md). Installing a package does not pass encryption or recovery acceptance. Keep proposed mechanisms separate from verified behavior.

Older course-first, university-wide and combined desktop/Web estimates describe earlier scope. Re-estimate the local core and each optional extension from working code, teaching progress and target-device evidence. Separate learning time, engineering effort, testing access and external integration work; do not turn an old total into a completion date.
