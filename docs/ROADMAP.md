# Roadmap

Updated: 2026-11-11. [ADR-008](adr/008-small-free-local-product.md) sets a small free local release. Tasks, personal plans, Today and Week come first. The learner writes the core one lesson at a time. This is a plan, not shipped behavior.

## Repository baseline

The app has in-memory task addition, validation, completion, deletion and one-level undo. Current tests and pending manual checks belong in [LEARNING.md](LEARNING.md). The existing artwork and GitHub Pages website present the concept. They are not a released planner. Preserve current code and historical lesson results during design work.

## Working order

Keep the accepted theme and layout lessons using Material controls. Then build saving and explicit editing, personal plans, Today/Week and backup recovery. A working free Windows package is the first target. Linux/macOS packages follow native checks. Do not require a UI-library migration, Riverpod, saved draft recovery, encryption or a service before that trial.

## A — Reliable local tasks

- [ ] Offer Save on this device or Temporary use before reading saved data.
- [ ] Add one small drift/SQLite store and a memory mode; allow only one writer process.
- [ ] Add explicit task editing and confirmed saves. Keep input on failure and prevent duplicate submissions.
- [ ] Keep unsaved forms in memory; closing changed input offers Save, Discard or Cancel.
- [ ] Verify offline restart recovery, failed writes, damaged data and mode preference errors.
- [ ] Make switching mode a clear session change. Use export/restore for transfer; no live merge wizard.
- [ ] Implement clear with truthful partial-failure reporting and interruption recovery.

Acceptance: saved tasks survive restart; temporary startup does not open an old database. Failure preserves input and the last confirmed data. There is no promise to recover an unsaved form after a crash.

## B — Personal plans, Today and Week

- [ ] Keep Today / Week / Tasks with Settings; expose only working destinations.
- [ ] Add one-off timed and all-day plans with optional location and notes.
- [ ] Use one workspace timezone, initially the system timezone; test date boundaries, overnight plans and daylight-saving gaps.
- [ ] Derive lists, counts, overlaps and views from the same confirmed data and date rules.
- [ ] Add basic weekly repeats with an end date. Clearly edit/delete the whole series; defer single-occurrence changes.
- [ ] Refresh at deadlines, midnight and resume; discard obsolete query results.
- [ ] Keep the journal layout, keyboard access, readable narrow windows and three-language behavior with existing Flutter controls.

Acceptance: record a meeting, an all-day plan and a task without a school or account. Today and Week agree. Repeats end on the chosen date. Real overlaps remain visible and allowed.

## C — Private backup and first Windows trial

- [ ] Define one versioned unencrypted JSON backup for supported records and settings. Explain its private contents.
- [ ] Validate bounds, references and dates before replacement preview; confirm before writing.
- [ ] Preserve a verified recovery copy before local restore/migration; use a transaction and keep original data on failure.
- [ ] Exclude credentials, screenshots and unsaved forms from backup. Clear app-managed recovery copies with local data.
- [ ] Test real release packages, offline use, upgrade/recovery, keyboard use, input methods, large text and each offered language.
- [ ] Run a small trial covering work, home and study. Record observed problems and unsupported cases.
- [ ] Publish a complete Windows bundle with checksums, known limits, manual update instructions and a support route.

Acceptance: a person unfamiliar with the project can install, choose storage, plan a week, restart, export, restore and clear data without developer help. Ordinary SQLite and JSON are not encrypted; the UI must not say otherwise. A successful build is not this acceptance.

## Optional — Local screenshot and table import

This is accepted later work under [QUICK_IMPORT.md](QUICK_IMPORT.md). It follows editing and recovery. Course inputs wait only for the course rules they actually need, not a complete school platform.

- [ ] Use one editable draft, source comparison, field corrections, duplicate review and confirmed batch commit.
- [ ] Add fixed CSV/paste input, then evaluate RapidOCR packaging and models for one screenshot at a time.
- [ ] Offer image paste, drag/drop and a file picker. Users capture the screenshot; no PDF parser, image editor or capture tool.
- [ ] Test finite byte/pixel/record limits, cancellation, offline use and temporary-mode cleanup.
- [ ] Compare screenshot preparation, recognition, review and correction time against manual entry. Report missing/extra entries and final date errors.

Acceptance: supported inputs take less total work than manual entry. Useful partial drafts are allowed; unreviewed writes and silently dropped rows are not. Accuracy and time savings have not been measured.

## Optional — Cloud help with personal API keys

- [ ] Allow several saved provider profiles with one selected for a request; no provider marketplace or automatic routing.
- [ ] Start with a tested compatible API adapter and document supported model inputs. Add another adapter only for an actual need.
- [ ] Show destination and payload before each explicit send; no automatic upload or cloud fallback.
- [ ] Keep keys in memory by default. Explicit remembered keys use the OS credential store and stay out of logs/backups.
- [ ] Bound requests, time and output; no automatic billable retries. Explain user-paid usage.
- [ ] Test wrong keys, quotas, malformed/late responses and cancellation without losing the local draft.

Acceptance: cloud help reduces review effort on measured samples, produces only a draft and is never needed for local use. Cadence operates no paid relay or AI account.

## Later local improvements

Select one small improvement from real trial feedback: course-week rules, running-app reminders, simple review totals, another desktop platform or a proven UI need. Define its acceptance before adding models or packages. Advanced repeat exceptions, saved drafts, encryption, custom categories and background reminders are not first-release gates.

## School connections: only if needed

Keep the source boundary as a document contract in [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md): authorized read → normalized candidates → review → local commit. No empty interface code is required now.

Web and synchronization work starts only if a selected school connection needs it. A file export or local read adapter may be sufficient. Define the exact Web surface or update direction, permission, conflict behavior, retention and operating cost before adopting any part of [SYNC.md](SYNC.md). There is no general Web client or personal cloud-sync backlog. The local app and existing concept site do not wait for school permission.

## Maintenance and estimates

Use small learner-written features and re-estimate from working code. Old combined desktop/Web or course-heavy lesson totals are historical. Keep dependency review, private reporting, upgrade checks and release withdrawal practical for a free project. Do not promise paid support, an account service or automatic updates. Current checks are described in [SETUP.md](SETUP.md), [QUALITY.md](QUALITY.md) and [RELEASE.md](RELEASE.md).
