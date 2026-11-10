# Quality and acceptance

[ADR-005](adr/005-local-offline-and-school-gated-web.md) adds acceptance for temporary versus persisted data, offline restart, concurrent-tab writes and clearing, source-retention consent, and preventing stale callbacks from recreating deleted data. School permission is required before Web deployment. These are future checks, not passed tests.

Accepted lesson coverage and test counts are tracked in [LEARNING.md](LEARNING.md), with the current behavior summarized in the [project README](../README.md). The requirements below are acceptance gates for planned features, not claims that the features exist. The student/teacher audience adds representative academic coverage and support requirements. Windows/Linux/macOS and Web are targets; mobile work is excluded. shadcn_ui is selected but not introduced. Web behavior and security checks below apply to future learner implementation, not an existing MVP.

## Local and hosted checks

Run `dart format lib test`, `flutter analyze --fatal-infos --fatal-warnings` and `flutter test`. The [Flutter workflow](../.github/workflows/flutter.yml) checks format, analysis and tests, then compiles Windows, Linux and macOS debug apps. The [Pages workflow](../.github/workflows/pages.yml) deploys the static site.

A native build is not a UI test or a signed release. Platform functionality is accepted only after testing on the corresponding host.

## Artwork and website checks

Run `node tools/check_repository.cjs` for local Markdown/HTML file targets and JavaScript syntax. Its scope and limitations are documented in [tools](../tools/README.md); it does not check external URLs, anchors or browser behavior.

For the v2 library, validate SVG parsing, PNG dimensions/alpha, ICO frames, ICNS structure, native resource mappings and equality of deployment copies. Inspect icon readability and state illustrations visually; decorative strokes are not accessibility evidence for interactive controls. Website checks cover both pages in Japanese, English and Chinese at wide/narrow widths, local asset loading, translation-key coverage, preview interaction and page overflow. The recorded 2026-11-11 results and platform limitations are in the [artwork library](../assets/README.md#本次验证). Recheck the exact source revision before publishing changes; a local Windows build is not macOS/Linux runtime acceptance.

## Tests worth maintaining

| Area | Critical cases |
|------|----------------|
| Teaching weeks | First-week Monday, midweek first class, partial last week, odd/even weeks, vacation does not silently renumber |
| Occurrences | Multiple rules, cancellations, moved-in/out instances, restoring one instance, rule edits with existing overrides |
| Personal arrangements | Independent of semester selection, overnight/all-day intervals, bounded weekly repeat, timezone and DST cases |
| Conflicts | End equals start, course versus personal plan, cancelled class, deadlines excluded, visible range honestly disclosed |
| Coursework | Date-only versus timed deadlines, overdue transition using injected clock, completed tasks excluded |
| Local weekly review | Empty data, clipped week/day boundaries, overlaps, cancellations/moves, completion/undo, zero comparison base; see [STATISTICS.md](STATISTICS.md) |
| Sharing | No private fields, preview equals payload, reference remapping, repeat import, incompatible periods |
| Backup | Round trip, active database consistency, invalid/future versions, failed restore leaves original usable |
| Today | Counts match lists, no duplicate overdue items, undated tasks retained, midnight and resume refresh |
| Autosave | Saved drafts survive restart; failure retains input; latest revision wins; formal records update atomically |
| Application contracts | Consistent snapshots; stale query/preview rejection; conflicting revisions; discarded drafts cannot reappear; see [APPLICATION.md](APPLICATION.md) |
| Process and restore lifecycle | One writer; migration failure preserves data; restore drains writes and rejects pre-restore callbacks |
| Notifications | Timing, cancellation, completion, deduplication, permission denial, dispatch failure and native click-through |
| Migration | Previous supported schema to new schema preserves schedule identities and private data |
| Academic coverage | Representative faculty/graduate timetables, multiple academic periods, configurable periods, irregular classes and missing room information; verify samples instead of assuming one university-wide template |
| Assisted entry | CSV/paste errors are visible, preview matches imported content, repeated import is handled, manual entry remains available |
| Optional school connection | Only after approval: consent, logout/disconnect, expired/revoked access, partial or failed refresh, source attribution, last refresh time and local edit preservation |

Avoid tests that only mirror UI implementation details. Add widget tests for meaningful flows such as scope selection, conflict confirmation and import preview.

## Manual desktop matrix

For Windows, Linux and macOS check startup, persistence after restart, file pick/save dialogs, Unicode paths, keyboard navigation, focus, 200% text scaling, narrow windows and light/dark contrast. Check update behavior with an existing user database.

Test running-process system notifications with denied permissions, rescheduling and resume on each host. Delivery after exit is a separate feature; an in-app message does not prove OS delivery. See [NOTIFICATIONS.md](NOTIFICATIONS.md).

## Representative student acceptance

Use voluntary pilots that include students and teachers across academic backgrounds, languages and accessibility needs. Verify Japanese/English/Chinese rendering with real course names and mixed scripts. Record untested groups and academic patterns. First setup, finding the next class, handling a change, importing and restoring data should be achievable without developer help. Use fictional or appropriately redacted examples in repositories and automated tests.

## Planned Web implementation and security

These gates apply to the confirmed Web target, which is not developed. The initial scope is memory by default, explicit optional browser-local saving, manual schedules/tasks, bounded weekly repeats and three languages. It does not include a backend or account. The recommended IndexedDB adapter needs its own data flow and storage-failure checks. A static project website is a different deliverable. Browser testing must declare its actual desktop browser/OS coverage; no phone product is implied.

| Boundary | Required acceptance before real student data |
|----------|----------------------------------------------|
| Strict JSON | 1 MiB UTF-8 and 2,000 total records; reject unsupported versions/types, duplicate IDs, invalid dates/repeats and untrusted structure; preview/cancel/replace must preserve original data on failure |
| Browser storage | Denied/quota-limited storage, private mode, clearing site data, unexpected tab/process exit, migration and restore failures; export/recovery works and data-loss limits are visible |
| Local concurrency | Concurrent tabs cannot silently overwrite revisions or apply a stale import/restore; behavior is defined for the selected storage implementation |
| Untrusted content | Course titles, notes, imported files and errors are rendered as inert text; verify stored/reflected/DOM script injection paths and safe handling of links |
| Scripts and hosting | HTTPS, restrictive feasible CSP, reviewed dependencies and minimized third-party scripts; no credentials or private fixtures in bundled assets/source maps |
| URLs, logs and caches | No personal schedules, backup content, credentials or tokens in query strings/fragments, analytics, routine logs or service-worker caches; caching scope and update/rollback behavior are explicit |
| Backend authorization, if chosen | Server-side ownership checks on every read/write/export/delete route; one user's object ID never grants another user access; errors do not expose private records |
| Sessions, if chosen | Secure session transport and storage, expiry/rotation/revocation, logout and reconnect; no long-lived bearer tokens in script-readable persistent storage; CSRF defenses for cookie-authenticated changes and a restrictive CORS policy |
| Service operations, if chosen | Input/file-size limits, abuse/request limits, least-privilege secrets, encryption in transit/at rest, redacted logging, retention/deletion, restricted backups and tested recovery |

Use fictional data throughout implementation and initial demonstrations. Verify the design with meaningful negative cases such as a script-bearing imported title, a second user's record identifier, a cross-site state-changing request and unavailable browser storage when those paths exist. School authentication and data-access approval remain separate requirements. A Web release additionally needs a limited pilot, privacy notice, support owner and rollback/incident procedure; see [RELEASE.md](RELEASE.md).

## Privacy and release bar

The optional sync extension has separate gates in [SYNC.md](SYNC.md): duplicate/unknown-outcome submissions, commit-order-safe cursors, offline conflicts, cross-workspace authorization, deletion and expired-device recovery, account switching and server snapshot restoration. Exercise two clients and failure injection before any real-data pilot; these are future scenarios, not passed coverage.

[DATA_PROTECTION.md](DATA_PROTECTION.md) defines staged security acceptance: cipher availability in release builds, missing device keys, plaintext leakage through side files, corrupted/enormous encrypted backups, bounded KDF parameters, interrupted migration and cross-device recovery. Add these tests with their features; they are not existing coverage. Review cryptographic formats and key handling separately from routine UI tests.

Timetable exports must be allowlisted; private backup is visibly separate. The offline core has no mandatory account, uploads or telemetry. Local user-facing weekly statistics remain entirely on-device. Never ask a student to post a full backup, school credentials or session tokens in a public issue.

An optional official connection has a separate acceptance gate in [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md): school approval, data-access scope, informed student consent and verified handling of credentials, tokens and personal data. Do not collect school passwords or assume consent permits scraping. If network services are introduced, validate documented retention/deletion and failure behavior before release. Declining or losing the connection must leave manual planning and stored local data usable.

Lesson test templates in `lessons/` are not executed by CI and do not count as coverage. Activate a template in `test/` when its lesson begins implementation; require it to pass before considering that lesson complete. Do not skip or weaken an activated test to hide unfinished implementation.

Check all three website languages for accurate feature status, platform claims and working links. Retain the Japanese-default language behavior.

A milestone is complete only when its user acceptance example in [ROADMAP.md](ROADMAP.md) passes. A release additionally follows [RELEASE.md](RELEASE.md).

A wider desktop release needs tested upgrade/recovery paths on the declared systems, visible coverage gaps and assigned support/security responsibilities. The planned Web system needs its own security and persistence acceptance. A small pilot, passing CI or a supervisor's expression of support does not establish wider-use readiness or official approval.
