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
| Sharing | No private fields, preview equals payload, reference remapping, repeat import, incompatible periods |
| Backup | Round trip, active database consistency, invalid/future versions, failed restore leaves original usable |
| Migration | Previous supported schema to new schema preserves schedule identities and private data |

Avoid tests that only mirror UI implementation details. Add widget tests for meaningful flows such as scope selection, conflict confirmation and import preview.

## Manual desktop matrix

For Windows, Linux and macOS check startup, persistence after restart, file pick/save dialogs, Unicode paths, keyboard navigation, focus, 200% text scaling, narrow windows and light/dark contrast. Check update behavior with an existing user database.

Desktop reminder delivery after exit is not a first-release feature. Do not imply it works because an in-app message appeared.

## Privacy and release bar

Timetable exports must be allowlisted; private backup is visibly separate. No automatic uploads, analytics, external calendar connections or account login. Never ask a classmate to post a full backup in a public issue.

Check all three website languages for accurate feature status, platform claims and working links. Retain the Japanese-default language behavior.

A milestone is complete only when its user acceptance example in [ROADMAP.md](ROADMAP.md) passes. A release additionally follows [RELEASE.md](RELEASE.md).
