# Quality and acceptance

Current automated coverage is the Today startup widget test. The requirements below are acceptance gates for planned features, not claims that the features exist.

## Local and hosted checks

Run `dart format lib test`, `flutter analyze --fatal-infos --fatal-warnings` and `flutter test`. The [Flutter workflow](../.github/workflows/flutter.yml) checks format, analysis and tests, then compiles Windows, Linux and macOS debug apps. The [Pages workflow](../.github/workflows/pages.yml) deploys the static site.

A native build is not a UI test or a signed release. Platform functionality is accepted only after testing on the corresponding host.

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
| Notifications | Timing, cancellation, completion, deduplication, permission denial, dispatch failure and native click-through |
| Migration | Previous supported schema to new schema preserves schedule identities and private data |

Avoid tests that only mirror UI implementation details. Add widget tests for meaningful flows such as scope selection, conflict confirmation and import preview.

## Manual desktop matrix

For Windows, Linux and macOS check startup, persistence after restart, file pick/save dialogs, Unicode paths, keyboard navigation, focus, 200% text scaling, narrow windows and light/dark contrast. Check update behavior with an existing user database.

Test running-process system notifications with denied permissions, rescheduling and resume on each host. Delivery after exit is a separate feature; an in-app message does not prove OS delivery. See [NOTIFICATIONS.md](NOTIFICATIONS.md).

## Privacy and release bar

Timetable exports must be allowlisted; private backup is visibly separate. No automatic uploads, telemetry, external calendar connections or account login. Local user-facing weekly statistics remain entirely on-device. Never ask a classmate to post a full backup in a public issue.

Lesson test templates in `lessons/` are not executed by CI and do not count as coverage. Activate a template in `test/` when its lesson begins implementation; require it to pass before considering that lesson complete. Do not skip or weaken an activated test to hide unfinished implementation.

Check all three website languages for accurate feature status, platform claims and working links. Retain the Japanese-default language behavior.

A milestone is complete only when its user acceptance example in [ROADMAP.md](ROADMAP.md) passes. A release additionally follows [RELEASE.md](RELEASE.md).
