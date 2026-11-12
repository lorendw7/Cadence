# Roadmap

Updated: 2026-11-12. [ADR-010](adr/010-open-multiplatform-free-first.md) sets an open-source, free-first product for desktop, Web, Android and iOS. Tasks, personal plans, Today, Week and recovery come first. The learner writes core features one lesson at a time. This is a plan, not shipped behavior.

Current scope: finish the free desktop edition. Windows is the first complete delivery target; macOS and Linux follow native acceptance. Web, Android and iOS are later directions, not current work. Cloud sync and optional ads remain deferred. External academic systems, school login and automatic timetable retrieval stay excluded.

## Repository baseline

The app has in-memory task addition, validation, completion, deletion and one-level undo. Current tests and pending manual checks belong in [LEARNING.md](LEARNING.md). The existing artwork and GitHub Pages website present the concept. They are not a released planner. Preserve current code and historical lesson results during design work.

## Working order

Use the [desktop feature baseline](PRODUCT.md#first-useful-local-product) to decide what belongs in this milestone. Keep feature scope there and acceptance gates here. The sequence is task editing and saving, plan/date rules, Today/Week, backup/recovery, Windows trial, then native desktop validation. Optional features must not delay that sequence.

Keep the accepted desktop theme, layout and shadcn_ui lessons. Then build saving and explicit editing, personal plans, Today/Week and recovery. Complete the Windows flow, resolve trial problems and validate macOS/Linux. Stages A-D define the desktop delivery. Stages E-F are deferred reference; review them after the desktop edition is dependable. Do not add browser/mobile experiments, tester recruitment, billing, ads or services to the current milestone.

## A — Reliable local tasks

- [ ] Offer Save on this device or Temporary use before reading saved data.
- [ ] Add one small drift/SQLite store and a memory mode; allow only one writer process.
- [ ] Add explicit task editing and confirmed saves. Keep input on failure and prevent duplicate submissions.
- [ ] Add optional task notes and date-only or exact-time deadlines. Keep undated tasks valid and define deadline boundaries before Today uses them.
- [ ] Keep unsaved forms in memory; closing changed input offers Save, Discard or Cancel.
- [ ] Verify offline restart recovery, failed writes, damaged data and mode preference errors.
- [ ] Make switching mode a clear session change. Use export/restore for transfer; no live merge wizard.
- [ ] Implement clear with truthful partial-failure reporting and interruption recovery.

Acceptance: saved tasks survive restart; temporary startup does not open an old database. Failure preserves input and the last confirmed data. There is no promise to recover an unsaved form after a crash.

## B — Personal plans, Today and Week

- [ ] Keep Today / Week / Tasks with Settings; expose only working destinations.
- [ ] Add language and storage controls in Settings; keep backup, restore and clear in the same data area as stage C arrives.
- [ ] Add one-off timed and all-day plans with optional location and notes.
- [ ] Use one workspace timezone, initially the system timezone; test date boundaries, overnight plans and daylight-saving gaps.
- [ ] Derive lists, counts, overlaps and views from the same confirmed data and date rules.
- [ ] Add basic weekly repeats with an end date. Clearly edit/delete the whole series; defer single-occurrence changes.
- [ ] Refresh at deadlines, midnight and resume; discard obsolete query results.
- [ ] Keep the journal layout, keyboard access, readable narrow windows and three-language behavior with the selected shadcn_ui controls and shared theme.

Acceptance: record a meeting, an all-day plan and a task without a school or account. Today and Week agree. Repeats end on the chosen date. Real overlaps remain visible and allowed.

## C — Private backup and first Windows trial

- [ ] Define one versioned unencrypted JSON backup for supported records and settings. Explain its private contents.
- [ ] Validate bounds, references and dates before replacement preview; confirm before writing.
- [ ] Preserve a verified recovery copy before local restore/migration; use a transaction and keep original data on failure.
- [ ] Exclude credentials, screenshots and unsaved forms from backup. Clear app-managed recovery copies with local data.
- [ ] Test real release packages, offline use, upgrade/recovery, keyboard use, input methods, large text and each offered language.
- [x] Remove the teaching counter in lesson 16, under the learner's explicit delegation. Task and undo regressions pass; see [learning progress](LEARNING.md).
- [ ] Provide the app version and a working help/support route without placeholder destinations.
- [ ] Run a small trial covering work, home and study. Record observed problems and unsupported cases.
- [ ] Publish a complete Windows bundle with checksums, known limits, manual update instructions and a support route.

Acceptance: a person unfamiliar with the project can install, choose storage, plan a week, restart, export, restore and clear data without developer help. Ordinary SQLite and JSON are not encrypted; the UI must not say otherwise. A successful build is not this acceptance.

## D — Complete the desktop edition

- [ ] Resolve Windows trial problems in saving, editing, navigation and recovery before adding another platform.
- [ ] Validate macOS and Linux installation, storage, file operations, input and packages on native hosts.
- [ ] Check window resizing, long text, keyboard-only use, input methods and 200% text scaling.
- [ ] Test the installed packages: offline use, restart, upgrade, failed writes, export, restore and clear.
- [ ] Publish accepted desktop packages with versions, checksums, upgrade notes, known limits and a support route.
- [ ] Mark unverified desktop platforms honestly; do not block a ready Windows release on unavailable native test hardware.

Acceptance: a person unfamiliar with Cadence can install the claimed desktop version, plan a week, save and restart offline, recover a backup and clear their data without developer help. No account, payment or ad view is required. Only after this flow is dependable should the maintainer schedule Web or mobile implementation.

## E — Later Web and mobile review

Deferred until desktop acceptance. These are retained design checks, not current tasks:

- Review demand and available maintenance time before scheduling another client.
- Keep shared task, plan and date rules; adapt navigation, editors, touch targets, safe areas and keyboards.
- For Web, define browser-local storage, tab ownership, quota/eviction handling, export/restore, reload and cache updates.
- Decide a deployment origin and private-data boundary before a Web app goes live; keep the existing concept website.
- For Android and iOS, test lifecycle, process termination, accessibility, file operations and installed builds on real devices.
- State actual supported platforms and limits. Browser-local saving does not imply cloud sync.

Acceptance for starting this work: the desktop edition has passed its own gates, the next client has a bounded scope, and its maintenance cost is understood. Full target-platform coverage is not a desktop-release prerequisite.

## F — Free Android and iOS store releases

Deferred until desktop acceptance and a separately scheduled mobile implementation. Keep this reference for later; do not recruit testers or register store accounts now.

- [ ] Prepare signed packages, store screenshots, age ratings, support details and accurate privacy declarations for each target market.
- [ ] Have the maintainer handle developer identity, agreements, fees and signing access. Keep secrets outside Git.
- [ ] Check the current Google Play account rules and recruit real testers before planning a release date.
- [ ] Where required, keep at least 12 testers opted in continuously for 14 days; collect feedback, fix defects, retest and apply for production access. Recruitment is the maintainer's task; Google does not promise testers. A suggested 15-20-person pool is a buffer, not a rule.
- [ ] Use TestFlight and real iOS devices for beta feedback; complete Apple's review with working features and truthful metadata.
- [ ] Validate install, update, offline use, restart and data recovery from store-distributed builds.

Acceptance: each store has approved its own free release and the distributed build passes the applicable user flows. A completed testing period, uploaded build or repository check is not store approval. See [current official release references](FREE_EDITION.md#delivery-and-testing).

## After store launch — Review services and income

This is a deferred decision checkpoint, not an implementation stage. Paid expansion, memberships, subscriptions and premium features are excluded. Everyone receives the same free functions. If cloud sync is later offered, use the same published quota rules for all users. Evaluate advertising only after launch, with measured costs, privacy, recovery, retention and a shutdown plan. It must not block planning or grant extra capacity. No ad SDK, billing or backend work belongs in the current desktop milestone.

The [free-edition design](FREE_EDITION.md#review-only-after-store-launch) retains the candidate model. Do not add accounts, payment screens, ad SDKs or a backend to satisfy a planning document.

## Optional — Local screenshot and table import

This is accepted later work under [QUICK_IMPORT.md](QUICK_IMPORT.md). It follows the free release and does not delay platform or store work. Course inputs wait only for the course rules they actually need, not a complete school platform.

- [ ] Use one editable draft, source comparison, field corrections, duplicate review and confirmed batch commit.
- [ ] Add fixed CSV/paste input, then evaluate RapidOCR packaging and models for one screenshot at a time.
- [ ] Offer image paste, drag/drop and a file picker. Users capture the screenshot; no PDF parser, image editor or capture tool.
- [ ] Test finite byte/pixel/record limits, cancellation, offline use and temporary-mode cleanup.
- [ ] Compare screenshot preparation, recognition, review and correction time against manual entry. Report missing/extra entries and final date errors.

Acceptance: supported inputs take less total work than manual entry. Useful partial drafts are allowed; unreviewed writes and silently dropped rows are not. Accuracy and time savings have not been measured.

## Optional — Cloud help with personal API keys

Reassess this study after the free release. It is not part of the current implementation or the later hosted-sync offer.

- [ ] Allow several saved provider profiles with one selected for a request; no provider marketplace or automatic routing.
- [ ] Start with a tested compatible API adapter and document supported model inputs. Add another adapter only for an actual need.
- [ ] Show destination and payload before each explicit send; no automatic upload or cloud fallback.
- [ ] Keep keys in memory by default. Explicit remembered keys use the OS credential store and stay out of logs/backups.
- [ ] Bound requests, time and output; no automatic billable retries. Explain user-paid usage.
- [ ] Test wrong keys, quotas, malformed/late responses and cancellation without losing the local draft.

Acceptance: cloud help reduces review effort on measured samples, produces only a draft and is never needed for local use. Cadence operates no paid relay or AI account.

## Later local improvements

Select one small improvement from real trial feedback: course-week rules, running-app reminders, simple review totals or a proven UI need. Planned desktop platforms already have their own stage above. Define its acceptance before adding models or packages. Advanced repeat exceptions, saved drafts, encryption, custom categories and background reminders are not first-release gates.

## External academic systems: removed from scope

Do not schedule school login, timetable retrieval or academic source adapters. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) remains historical. [SYNC.md](SYNC.md) is an older technical study; a later personal cloud service must be scoped independently after store launch.

## Maintenance and estimates

Use small learner-written features and re-estimate from working code. Old desktop-only and course-heavy lesson totals do not cover all target platforms. Track implementation, user trials and store preparation separately. Current checks are in [SETUP.md](SETUP.md), [QUALITY.md](QUALITY.md) and [RELEASE.md](RELEASE.md). Do not promise a release date or paid support from a passing build.
