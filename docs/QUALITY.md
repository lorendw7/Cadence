# Quality and acceptance

[ADR-007](adr/007-general-purpose-local-planner.md) defines the current scope: a general-purpose local offline planner without accounts. First use offers Save on this device and Temporary use before reading saved planning data. Web, sync and school adapters are optional later extensions. School permission applies only to the relevant school interfaces and data, not general desktop or Web delivery.

Current lesson coverage and test counts are in [LEARNING.md](LEARNING.md), with behavior summarized in the [project README](../README.md). The requirements below describe future acceptance, not completed features. Windows, Linux and macOS are desktop targets; mobile apps are excluded. shadcn_ui is selected but not introduced. A concept website is separate from a functional planner.

## Local and hosted checks

Run `dart format lib test`, `flutter analyze --fatal-infos --fatal-warnings` and `flutter test`. The [Flutter workflow](../.github/workflows/flutter.yml) checks formatting, analysis and tests, then compiles Windows, Linux and macOS debug apps. The [Pages workflow](../.github/workflows/pages.yml) deploys the static concept site.

A native build is not a UI test or signed release. Accept platform functionality only after testing it on the corresponding host. Do not add optional-extension requirements to an unrelated core lesson.

## Artwork and website checks

Run `node tools/check_repository.cjs` for local document/site links and project JavaScript checks. Its current scope and limits are in [tools](../tools/README.md). Browser behavior and external services need separate checks.

Run `python tools/check_artwork.py` for SVG parsing, manifest coverage and sizes, responsive WebP dimensions and byte budgets, platform PNG sizes, native mappings and exact deployment copies. It uses the Python standard library. After changing platform exports, also inspect PNG transparency, ICO frames and ICNS structure.

Review icon readability and illustrations visually; decorative strokes do not prove that controls are accessible. Check both website pages in Japanese, English and Chinese at wide and narrow widths. Cover asset loading, translation keys, preview interaction, keyboard focus and overflow. Confirm that a supporting browser selects a suitable editorial WebP instead of the full PNG. See the [artwork validation record](../assets/README.md#validation) for earlier results and limits. Recheck the exact revision before publication; a Windows build does not establish macOS/Linux runtime acceptance.

## Core scenarios

| Area | Critical cases |
|---|---|
| Saving choice | First use offers both modes before reading records; an existing database stays unopened in temporary mode; remembered choices are explicit and visible |
| Mode changes | Temporary-to-local preview uses the current snapshot, handles an existing saved workspace explicitly, and reports failure honestly; switching away resolves pending writes and makes keep/clear scope clear |
| Tasks | Separate identity from title, valid/blank input, completion/undo, deletion and restoration; date-only versus timed deadlines; overdue transitions using an injected clock |
| Events and repeats | Start/end validation, overnight and all-day intervals, bounded weekly repeats, timezone/DST cases and independent personal categories |
| Conflicts | End equals start, overlapping events, deadlines excluded, and the checked date range honestly disclosed |
| Today | Counts match lists, overdue items are not duplicated, undated tasks remain available, midnight/resume refresh uses the right date |
| Week | All seven days are reachable, long events and text remain readable, narrow layout preserves selection and focus |
| Local review, when included | Empty data, clipped day/week boundaries, overlap removal, completion/undo and zero comparison base; see [STATISTICS.md](STATISTICS.md) |
| Backup | Round trip, consistent active database, invalid/future versions and failed restore preserving the original usable copy |
| Drafts and failed writes | Persist drafts only in selected local mode; temporary drafts remain in memory; failures retain input and never claim a successful save |
| Application contracts | Consistent snapshots, stale-query/preview rejection, conflicting revisions and discarded drafts not reappearing; see [APPLICATION.md](APPLICATION.md) |
| Process and restore lifecycle | One writer, migration failure preserving data, restore draining writes and rejecting old callbacks |
| Migration | Supported schema upgrade preserves identities and private data; temporary launch does not migrate an unrelated saved database |
| Notifications, when included | Timing, cancellation, completion, deduplication, denied permission, dispatch failure and native click-through |

Avoid tests that only mirror UI implementation details. Add widget tests for real flows such as saving choice, failed save, scope selection and import preview. A planned test is not passed coverage.

## Optional course and import scenarios

The local core does not need a school connection. Course-specific rules can be added as an extension and should not gate a generic task/event release.

| Area | Critical cases |
|---|---|
| Teaching weeks | First-week Monday, midweek first class, partial final week, odd/even rules and vacations without silent renumbering |
| Course occurrences | Multiple rules, cancellation, moved-in/out occurrences, single-instance restore and edits with existing overrides |
| Course-linked tasks | Valid references, course deletion without loss of private tasks, exams and deadline behavior |
| Filtered sharing | Allowed fields only, preview equals payload, reference remapping, repeat import and incompatible periods; private backup remains separate |
| CSV/paste, when included | Visible errors, preview matching the import, repeated imports and manual entry remaining available |
| Course coverage | Different academic periods, configurable times, irregular classes and missing locations; do not assume one university template |
| School adapter, only after permission | Consent, disconnect, expired/revoked access, partial refresh, source labels, refresh time, local edit preservation and source-retention limits |

## Manual desktop checks

On each supported platform, check startup, selected saving mode, offline use, restart recovery, file pick/save dialogs, Unicode paths, keyboard navigation, focus, 200% text scaling and narrow windows. Check every shipped theme; dark artwork alone does not establish a dark theme. Check upgrades against existing saved data when persistence is implemented.

Test included OS reminders while running, with denied permissions, rescheduling and resume. Delivery after app exit is a separate feature. An in-app message does not prove OS delivery. See [NOTIFICATIONS.md](NOTIFICATIONS.md).

## Representative user acceptance

Use voluntary pilots with different work, study and personal routines, languages and accessibility needs. Check Japanese/English/Chinese rendering with long names and mixed scripts. Record untested groups and scenarios. First setup, choosing a saving mode, finding the next commitment, making a change and restoring data should work without developer help. Use fictional or properly redacted examples in repositories and automated tests.

If a course or school extension is included, test representative academic patterns separately. Its coverage does not stand in for general planning acceptance, and a general pilot does not establish permission to access school systems.

## Optional Web checks

If built, the initial browser client has no account or backend. It offers the same first-use saving choice, manual schedules/tasks, bounded weekly repeats and three languages. The proposed IndexedDB adapter needs its own storage-failure and data-flow checks. Declare actual desktop browser/OS coverage; no phone product is implied.

| Boundary | Required acceptance before private data use |
|---|---|
| Startup mode | No saved business data, drafts or decryption key is read before a local-saving choice; temporary reopening stays empty even when an old database exists |
| Strict JSON | 1 MiB UTF-8 and 2,000 records; reject unsupported versions/types, duplicate IDs, invalid dates/repeats and bad structure; preview/cancel/replace preserves the original on failure |
| Browser storage | Denied/quota-limited storage, private mode, clearing, unexpected exit, migration and failed restore; export/recovery works and loss limits are visible |
| Local concurrency | Tabs cannot silently overwrite revisions or apply a stale import/restore; clearing invalidates old callbacks and pending writes |
| Untrusted content | Titles, notes, imported files and errors remain inert text; check stored/reflected/DOM injection and link handling |
| Scripts and hosting | HTTPS, practical restrictive CSP, reviewed dependencies and minimal third-party scripts; no private fixtures or credentials in bundles/source maps |
| URLs, logs and caches | No private schedules, backup bodies, credentials or tokens in URLs, analytics, ordinary logs or service-worker caches; cache update/rollback is defined |

Use fictional data during implementation and initial demos. Test hostile titles, unavailable storage, stale previews and interrupted replacement. Before release, define browser support, a limited pilot, privacy notice, support owner and rollback process. General Web deployment does not require school permission; included school adapters still need their own authorization. See [RELEASE.md](RELEASE.md).

## Optional service and sync checks

Add these gates only if an account/backend extension is chosen:

| Boundary | Required acceptance |
|---|---|
| Authorization | Ownership on every read/write/export/delete; another user's ID grants no access; cross-workspace references fail |
| Sessions | Safe transport/storage, expiry/revocation, reconnect and device control; no long-lived tokens in ordinary browser storage; appropriate CSRF and CORS controls |
| Voluntary logout/switch | Resolve unsent and unknown-outcome work through confirmed sync, permitted private export or explicit discard; cancellation preserves the current session's work |
| Forced session loss | Stop requests immediately, freeze and isolate the old account's queue, prevent reading/replay by a new account, and show temporary-memory loss limits |
| Operation | Input/request limits, minimal secret access, encrypted transport/storage, redacted logs, retention/deletion, restricted backups and tested recovery |

[SYNC.md](SYNC.md) adds duplicate and unknown-outcome submissions, safe committed-order cursors, offline conflicts, deletion, expired devices, snapshot failure and server restore. Exercise two clients and inject failures before real-data use. These are future scenarios, not passed coverage.

## Optional assisted import acceptance

The primary measure is user effort saved, not perfect automatic recognition. Compare manual entry, local import plus review, and optional cloud help on the same permitted samples under [QUICK_IMPORT.md](QUICK_IMPORT.md). Include selection, waiting, correction and final review in completion time. Balance task order so remembering a sample does not make one method appear faster.

Record corrected fields, missed/extra entries, final date/week errors, resource use and any cloud usage by language and layout. Keep unreadable and rejected inputs in the coverage report. Useful partial drafts are allowed when gaps are clear and easy to fix. Set the pilot's time-saving target before evaluation; report slower cases and narrow supported scope when needed. No measured accuracy or effort-saving result exists yet.

Check no writes before confirmation, atomic batch failure, duplicates, late responses, cancellation, bounded PDF/image input, offline use, temporary-file cleanup and key isolation. Test each claimed provider/model separately, including quota and malformed-output failures. Cloud failure must preserve the local draft. These are future feature checks, not current passing tests.

## Privacy and release acceptance

[DATA_PROTECTION.md](DATA_PROTECTION.md) defines staged checks for cipher availability in release builds, missing device keys, plaintext in side files, corrupt/oversized encrypted backups, bounded password-derivation parameters, interrupted migration and cross-device restore. Add these with the features. Review cryptographic formats and key handling separately from routine UI tests.

The local core has no mandatory account, upload or telemetry. Weekly review stays on the device. Filtered sharing uses allowed fields, while private backup is clearly separate. Never ask anyone to post a full backup, credentials or tokens in a public issue.

A school adapter follows [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md): permission for its interface and data, informed consent, safe credentials, retention/export limits and failure handling. Do not collect school passwords or treat consent as permission to scrape. Declining or losing a connection must leave independent planning usable; imported school data follows its source-retention rules.

Lesson templates in `lessons/` are not executed by CI or counted as active coverage. Activate a relevant test with the lesson and require it to pass. Never skip or weaken a test to hide unfinished implementation.

Check all website languages for truthful feature status, platforms and links. Keep the Japanese-default switch behavior. A milestone is complete only when its [roadmap acceptance](ROADMAP.md) passes. A release also follows [RELEASE.md](RELEASE.md), with actual upgrade/recovery checks and support responsibilities. Passing CI, finishing a small pilot or receiving a teacher's support does not establish wider readiness or official approval.
