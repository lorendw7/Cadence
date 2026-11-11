# Quality and acceptance

Scope update: [ADR-008](adr/008-small-free-local-product.md) defines the first-release gates. Web/service checks below apply only if a school connection needs those parts. They are not tasks for a general Web or personal sync product.

[ADR-007](adr/007-general-purpose-local-planner.md) defines the current scope: a general-purpose local offline planner without accounts. First use offers Save on this device and Temporary use before reading saved planning data. School adapters are optional; Web and sync are considered only if a selected connection needs them. School permission applies only to the relevant school interfaces and data, not general desktop or Web delivery.

Current lesson coverage and test counts are in [LEARNING.md](LEARNING.md), with behavior summarized in the [project README](../README.md). The requirements below describe future acceptance, not completed features. Windows, Linux and macOS are desktop targets; mobile apps are excluded. The first release uses themed Material controls. A concept website is separate from a functional planner.

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
| Events and repeats | Start/end validation, overnight/all-day intervals, bounded weekly repeats, whole-series edit scope and one workspace timezone with DST checks |
| Conflicts | End equals start, overlapping events, deadlines excluded, and the checked date range honestly disclosed |
| Today | Counts match lists, overdue items are not duplicated, undated tasks remain available, midnight/resume refresh uses the right date |
| Week | All seven days are reachable, long events and text remain readable, narrow layout preserves selection and focus |
| Local review, when included | Empty data, clipped day/week boundaries, overlap removal, completion/undo and zero comparison base; see [STATISTICS.md](STATISTICS.md) |
| Backup | Round trip, consistent active database, invalid/future versions and failed restore preserving the original usable copy |
| Drafts and failed writes | Keep incomplete forms in memory in both modes; test Save/Discard/Cancel, failed-write input retention and truthful status |
| Application contracts | Consistent snapshots, stale-query/preview rejection, duplicate submission and discarded input not reappearing; see [APPLICATION.md](APPLICATION.md) |
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

Only a school connection that needs Web can activate this work. Define the actual browser surface and supported platforms first. Test hostile text, script isolation, HTTPS, chosen authentication flow, storage failures and clearing for the data it handles. If it saves planner records, prove preview, failed replacement and stale-tab handling. Do not require a full browser planner merely to complete authorization.

## Optional service and sync checks

Only add these checks if a school connection actually uses a service. Verify permission, ownership checks, session expiry, retention, deletion and bounded requests. For updates, test duplicate/partial snapshots, stale responses and local-edit preservation. A failed read must not look like deletion. Bidirectional sync needs separate conflict and recovery tests. Reuse relevant cases from [SYNC.md](SYNC.md), not its entire proposed system. No school or cloud failure may block independent local work.

## Optional assisted import acceptance

The primary measure is user effort saved, not perfect automatic recognition. Compare manual entry, local import plus review, and optional cloud help on the same permitted samples under [QUICK_IMPORT.md](QUICK_IMPORT.md). Include taking the screenshot, selection, waiting, correction and final review in completion time. Balance task order so remembering a sample does not make one method appear faster.

Record corrected fields, missed/extra entries, final date/week errors, resource use and any cloud usage by language and layout. Keep unreadable and rejected inputs in the coverage report. Useful partial drafts are allowed when gaps are clear and easy to fix. Set the pilot's time-saving target before evaluation; report slower cases and narrow supported scope when needed. No measured accuracy or effort-saving result exists yet.

Check no writes before confirmation, atomic batch failure, duplicates, late responses, cancellation, bounded screenshot input, offline use, temporary-file cleanup and key isolation. Test each claimed provider/model separately, including quota and malformed-output failures. Cloud failure must preserve the local draft. These are future feature checks, not current passing tests.

## Privacy and release acceptance

[DATA_PROTECTION.md](DATA_PROTECTION.md) covers local file privacy, confirmed writes, migration, backup recovery and optional API keys. The first release uses ordinary SQLite and unencrypted JSON with clear labels. Persistent drafts and encrypted storage are not offered. Any later encrypted format needs its own key-loss, migration and recovery acceptance.

The local core has no mandatory account, upload or telemetry. Weekly review stays on the device. Filtered sharing uses allowed fields, while private backup is clearly separate. Never ask anyone to post a full backup, credentials or tokens in a public issue.

A school adapter follows [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md): permission for its interface and data, informed consent, safe credentials, retention/export limits and failure handling. Do not collect school passwords or treat consent as permission to scrape. Declining or losing a connection must leave independent planning usable; imported school data follows its source-retention rules.

Lesson templates in `lessons/` are not executed by CI or counted as active coverage. Activate a relevant test with the lesson and require it to pass. Never skip or weaken a test to hide unfinished implementation.

Check all website languages for truthful feature status, platforms and links. Keep the Japanese-default switch behavior. A milestone is complete only when its [roadmap acceptance](ROADMAP.md) passes. A release also follows [RELEASE.md](RELEASE.md), with actual upgrade/recovery checks and support responsibilities. Passing CI, finishing a small pilot or receiving a teacher's support does not establish wider readiness or official approval.
