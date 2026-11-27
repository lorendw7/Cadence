# Quality and acceptance

Scope update (2026-11-15): [ADR-015](adr/015-android-self-use-first.md) sets the current route: shared local saving and recovery, Android planning self-use, bounded Android focus, then a useful ad-free mobile release. Windows remains the development host. Desktop focus presentation, media, Steam and a mobile ad pilot are separate later decisions; none blocks the first phone planning build. Desktop, Web and the concept site stay ad-free. School authorization, requests, connections, imports and cloud sync remain deferred. The repository became public again on 2026-11-27 under ADR-016, and the concept site returned on GitHub Pages. MIT remains unchanged. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates. These are planned contracts, not implemented behavior.

The current gates are in [ADR-015](adr/015-android-self-use-first.md), FREE_EDITION.md and [ROADMAP.md](ROADMAP.md). Safe tasks are the first Android self-use slice; direct plans, Today/Week and minimum occurrence corrections follow their shared rule lessons. Native checks apply to each included slice. A complete Windows release, desktop focus package, Steam work and screenshot import are not phone prerequisites. Cloud services and academic access remain deferred, with no approved integration.

The free core supports local planning without an account. First use offers Save on this device and Temporary use before reading saved planning data. Academic access is a deferred extension; the local core uses no school connection. Store approval, user acceptance and automated checks are separate evidence.

Current lesson coverage and test counts are in [LEARNING.md](LEARNING.md), with behavior summarized in the [project README](../README.md). The requirements below describe future acceptance, not completed features. Windows, Linux, macOS, Web, Android and iOS are targets; each needs its own runtime evidence. The product uses shadcn_ui; existing Material controls may remain during the learning stages. A concept website is separate from a functional planner.

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
| Events and repeats | Start/end validation, overnight/all-day intervals, bounded weekly repeats, explicit whole-series versus single-occurrence scope and one workspace timezone with DST checks |
| Occurrence corrections | One time/room change, cancellation and restoration; stable identity, no double display, moved-in/out range handling and backup round trip |
| Import, only if separately included | Supported source, editable uncertain fields and duplicates, preview equals committed records, no write before confirmation and atomic failure; school access needs its separate gates |
| Conflicts | End equals start, overlapping events, deadlines excluded, and the checked date range honestly disclosed |
| Today | Counts match lists, overdue items are not duplicated, undated tasks remain available, midnight/resume refresh uses the right date |
| Week | All seven days are reachable, long events and text remain readable, narrow layout preserves selection and focus |
| Local review, when included | Empty data, clipped day/week boundaries, overlap removal, completion/undo and zero comparison base; see STATISTICS.md |
| Backup | Round trip, consistent active database, invalid/future versions and failed restore preserving the original usable copy |
| Drafts and failed writes | Keep incomplete forms in memory in both modes; test Save/Discard/Cancel, failed-write input retention and truthful status |
| Application contracts | Consistent snapshots, stale-query/preview rejection, duplicate submission and discarded input not reappearing; see [APPLICATION.md](APPLICATION.md) |
| Process and restore lifecycle | One writer, migration failure preserving data, restore draining writes and rejecting old callbacks |
| Migration | Supported schema upgrade preserves identities and private data; temporary launch does not migrate an unrelated saved database |
| Notifications, when included | Timing, cancellation, completion, deduplication, denied permission, dispatch failure and native click-through |

Avoid tests that only mirror UI implementation details. Add widget tests for real flows such as saving choice, failed save, scope selection and import preview. A planned test is not passed coverage.

## Advanced local course scenarios

The local correction checks above need no school connection. Optional input checks apply only to a route actually included. Add advanced rules only when the supported input requires them; reject unsupported rules before saving. Broader education tools remain separate extensions.

| Area | Critical cases |
|---|---|
| Teaching weeks, when supported | First-week Monday, midweek first class, partial final week, odd/even rules and vacations without silent renumbering |
| Advanced recurrence, when supported | Multiple rules, bounded expansion and whole-series edits with existing occurrence corrections |
| Course-linked tasks, when included | Valid references, course deletion without loss of private tasks, exams and deadline behavior |
| Filtered sharing, when included | Allowed fields only, preview equals payload, reference remapping, repeat import and incompatible periods; private backup remains separate |
| Supported input coverage, when included | Declare supported source rules and test permitted examples; reject unsupported fields or layouts and do not imply universal import coverage |

Academic-access research may establish whether an official read-only API or calendar feed can be offered. It grants no access and adds no current adapter, school login, scraping or live feed. Institutional permission is not a release gate for the independent local planner.

## Manual desktop checks

On each supported platform, check startup, selected saving mode, offline use, restart recovery, file pick/save dialogs, Unicode paths, keyboard navigation, focus, 200% text scaling and narrow windows. Check every shipped theme; dark artwork alone does not establish a dark theme. Check upgrades against existing saved data when persistence is implemented.

Test included OS reminders while running, with denied permissions, rescheduling and resume. Delivery after app exit is a separate feature. An in-app message does not prove OS delivery. See NOTIFICATIONS.md.

## Android and other native checks

Validate Android alongside the shared local lessons; a complete Windows product and other desktop releases are not prerequisites. Reuse the same models and planning rules while testing compact navigation, touch, file selection, storage, suspend/resume, process loss and backup transfer on the native target. Start with fictional data. Personal self-use requires confirmed saving, local/temporary isolation and tested native backup recovery. Add direct planning and occurrence-correction cases as those features arrive, with large text and long labels. Apply import checks only when that optional route is included. A desktop widget test does not prove Android behavior or OCR support.

Retain native macOS/Linux checks. Schedule iOS around the required host and device. Each advertised platform needs its own evidence; Web is a later separate gate.

For the following [Android focus stage](ROADMAP.md#h--android-focus-self-use), verify one task-linked countdown, pause/resume/end, manual break and local record recovery. The learner defines the phone lifecycle contract before code. Test screen lock, background/resume, clock changes, process loss, restart, duplicate callbacks and failed record writes against it. Do not count unknown time, complete a task from a timer event or describe timer time as verified attention. Background operation and closed-app alarms are not promised by a passing foreground test. These checks do not delay the earlier safe planning trial.

## Representative user acceptance

The maintainer has no external testers available and will start with Android self-use. Record personal use, defects and untested groups without presenting them as independent demand evidence. Recruit voluntary pilots with different routines, languages and accessibility needs when available; their absence does not block lessons or safe personal installation. Check Japanese/English/Chinese rendering with long names and mixed scripts. First setup, choosing a saving mode, finding the next commitment, making a change and restoring data need observed checks. Use fictional or properly redacted examples in repositories and automated tests. Public store testing rules remain separate from private self-use.

The initial timetable research does not validate broader planning. Include a work or study deadline and a personal appointment alongside manually entered classes. Test finding available time, reserving a work block and correcting one occurrence. Test any later supported import separately; neither group replaces the other.

## Optional Web checks

The planned free Web client needs these browser checks, without a school connection. Define the actual browser surface and supported platforms first. Test hostile text, script isolation, HTTPS, chosen authentication flow, storage failures and clearing for the data it handles. If it saves planner records, prove preview, failed replacement and stale-tab handling. Do not require a full browser planner merely to complete authorization.

## Optional service and sync checks

Activate service checks only after a separate post-store-launch decision. Verify account isolation, session expiry, consent, retention, deletion, quotas and bounded requests. For sync, test duplicate/partial snapshots, stale responses, conflicts, deletion and preservation of offline local edits. Service failure must not block local planning or export. Reuse reviewed ideas from SYNC.md, not its entire historical design.

<a id="core-reviewed-import-acceptance"></a>

## Optional reviewed-import acceptance

Direct tasks, plans, repeats and recovery can satisfy the local release without any import. Screenshot recognition is unscheduled work only if demonstrated need justifies it. CSV/table parsing is deferred until real export files justify it. The checks below apply to a route selected for implementation; they must not block the direct-editing product while import is absent.

For every included input route, test editable uncertain fields, unsupported rules, possible duplicates and explicit confirmation that commits the accepted records together or leaves existing data unchanged. Compare total user effort against direct entry, including obtaining the source, correction and review. Internal fictional drafts can test this contract but cannot prove real import support.

For a future screenshot route, test permitted samples and native targets before claiming a layout is supported. Record corrected fields, missed or extra entries, final date/week errors, resource use and total time. Keep rejected images in the coverage report. OCR text alone is not a confirmed schedule. No measured accuracy, effort saving or OCR-engine compatibility result exists.

For a future approved academic route, verify the offered read-only interface, access terms, permitted fields and refresh behavior. Test stale data, revoked access, source changes and preservation of private edits. A reviewed snapshot does not establish continuous automatic updates. UNIVERSITY_INTEGRATION.md owns the access gates.

Check no writes before confirmation, atomic failure, duplicates, late results, cancellation, bounded input and temporary-file cleanup. One-occurrence corrections must survive backup/restore. Optional cloud help needs separate consent, key isolation and cost checks. These are future requirements, not passing results.

## Privacy and release acceptance

[DATA_PROTECTION.md](DATA_PROTECTION.md) covers local file privacy, confirmed writes, migration, backup recovery and optional API keys. The first release uses ordinary SQLite and unencrypted JSON with clear labels. Persistent drafts and encrypted storage are not offered. Any later encrypted format needs its own key-loss, migration and recovery acceptance.

The local core has no mandatory account, upload or telemetry. Weekly review stays on the device. Filtered sharing uses allowed fields, while private backup is clearly separate. Never ask anyone to post a full backup, credentials or tokens in a public issue.

UNIVERSITY_INTEGRATION.md retains a deferred extension; feasibility research and application preparation are also outside the current milestone. Do not add academic adapters, school-password collection or scraping to current lessons. A user-provided file, Google login or personal cloud sync does not grant school data access.

Lesson templates in `lessons/` are not executed by CI or counted as active coverage. Activate a relevant test with the lesson and require it to pass. Never skip or weaken a test to hide unfinished implementation.

Check all website languages for truthful feature status, platforms and links. Keep the Japanese-default switch behavior. A milestone is complete only when its [roadmap acceptance](ROADMAP.md) passes. A release also follows [RELEASE.md](RELEASE.md), with actual upgrade/recovery checks and support responsibilities. Passing CI, finishing a small pilot or receiving a teacher's support does not establish wider readiness or official approval.
