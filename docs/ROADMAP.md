# Roadmap

Updated: 2026-11-12. [ADR-010](adr/010-open-multiplatform-free-first.md) sets an open-source, free-first product for desktop, Web, Android and iOS. Tasks, personal plans, Today, Week and recovery come first. The learner writes core features one lesson at a time. This is a plan, not shipped behavior.

Current scope: complete and release the free local edition. Cloud sync, paid capacity and supplementary ads are deferred to review after store launch. External academic systems, school login and automatic timetable retrieval remain excluded.

## Repository baseline

The app has in-memory task addition, validation, completion, deletion and one-level undo. Current tests and pending manual checks belong in [LEARNING.md](LEARNING.md). The existing artwork and GitHub Pages website present the concept. They are not a released planner. Preserve current code and historical lesson results during design work.

## Working order

Keep the accepted theme, layout and shadcn_ui lessons. Then build saving and explicit editing, personal plans, Today/Week and recovery. A free Windows trial gives the first complete reference flow. Validate macOS/Linux, browser storage and mobile interaction in later stages, with small feasibility checks when needed. Release each platform after its own acceptance; simultaneous launch is not required. Do not add service, billing or advertising work to these stages.

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
- [ ] Keep the journal layout, keyboard access, readable narrow windows and three-language behavior with the selected shadcn_ui controls and shared theme.

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

## D — Free edition across target platforms

- [ ] Validate macOS and Linux storage, file operations, input and installed packages on native hosts.
- [ ] Keep task, plan, date and validation rules shared; add only needed platform boundaries.
- [ ] Adapt Today, Week, Tasks and editors to keyboard, touch, safe areas and on-screen keyboards.
- [ ] Define browser-local storage and one active writer across tabs; test quota, eviction, reload and failed writes.
- [ ] Test browser export/restore and app cache updates. Claim offline reload only after actual checks.
- [ ] Test Android and iOS process termination, resume, text scaling, accessibility and file import/export on real devices.
- [ ] Retain explicit local/temporary choice, honest save status and private recovery on every offered target.

Acceptance: the free core in [FREE_EDITION.md](FREE_EDITION.md) works on each claimed platform. No account, subscription or ad view is required. Missing platform evidence blocks that platform's release, not continued learning on others.

## E — Free Web and desktop publication

- [ ] Publish tested desktop packages with version, checksums, upgrade notes and known limits.
- [ ] Choose a deployment origin and storage boundary for the Web app; keep the existing concept website.
- [ ] Verify HTTPS, asset paths, reload/update behavior, storage explanations and private-data isolation in production.
- [ ] Run a representative free trial and resolve data-loss, access and basic usability defects.
- [ ] Publish only real capabilities; mark unsupported browsers and platforms clearly.

Acceptance: users can install or open the free edition, plan, save, export and recover without developer help. Web-local saving is clearly distinguished from cloud sync.

## F — Free Android and iOS store releases

- [ ] Prepare signed packages, store screenshots, age ratings, support details and accurate privacy declarations for each target market.
- [ ] Have the maintainer handle developer identity, agreements, fees and signing access. Keep secrets outside Git.
- [ ] Check the current Google Play account rules and recruit real testers before planning a release date.
- [ ] Where required, keep at least 12 testers opted in continuously for 14 days; collect feedback, fix defects, retest and apply for production access. Recruitment is the maintainer's task; Google does not promise testers. A suggested 15-20-person pool is a buffer, not a rule.
- [ ] Use TestFlight and real iOS devices for beta feedback; complete Apple's review with working features and truthful metadata.
- [ ] Validate install, update, offline use, restart and data recovery from store-distributed builds.

Acceptance: each store has approved its own free release and the distributed build passes the applicable user flows. A completed testing period, uploaded build or repository check is not store approval. See [current official release references](FREE_EDITION.md#delivery-and-testing).

## After store launch — Review services and income

This is a decision checkpoint, not a current implementation stage. Review actual use and operating capacity before approving work on limited free cloud sync, paid expansion or supplementary ads. Define costs, numeric quotas, privacy, conflict recovery, deletion, cancellation and service shutdown before a service pilot. Prices, providers and dates are undecided. Ads must not be the assumed funding guarantee for everyone's cloud data. Keep local planning and export independent of later services.

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