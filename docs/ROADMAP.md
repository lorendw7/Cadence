# Roadmap

Current scope: **courses and personal plans, local-only, desktop-first**. [REDESIGN.md](REDESIGN.md) is the behavior specification. External calendar integrations and store releases are not on this roadmap.

## Repository baseline

The current application is a Today placeholder. Platform runners and check workflows exist; feature checkboxes below remain open until implementation and acceptance pass. The starter package version is not a completed release.

## A — Course timetable

- [ ] Three main destinations: Today / Week / Tasks; courses and review under Week, settings in a menu.
- [ ] Today counts and overdue/undated groups, with midnight/resume refresh; see [TODAY.md](TODAY.md).
- [ ] Course editor with recoverable drafts and honest save status; see [EDITING.md](EDITING.md).
- [ ] Local database, migrations, injected clock and basic locale support.
- [ ] Semester anchor, end date, timezone and configurable periods.
- [ ] Multiple course rules, odd/even/selected teaching weeks.
- [ ] Time-based weekly view with visible teaching-week number.
- [ ] Cancel/move/change room for one occurrence; restore the original.
- [ ] Validate week boundaries, moved-in occurrences and semester edits.

Acceptance: create a semester and course; move one class to another week; verify original removal, one target instance and successful restoration.

## B — Personal arrangements

- [ ] Timed and all-day arrangements independent of a semester.
- [ ] Bounded weekly repeats with selected weekdays and week interval.
- [ ] Single-occurrence changes and cancellation.
- [ ] Unified Today and week projection; filter courses/personal plans.
- [ ] Explain overlap warnings and permit intentional conflicts.
- [ ] Test overnight plans, timezone display and half-open boundaries.

Acceptance: a personal appointment conflicts with a moved class; both remain visible, and restoring the class leaves the appointment unchanged.

## C — Coursework and files

- [ ] Course-linked and independent tasks; date/time deadlines and completion.
- [ ] Exams as course-linked personal arrangements.
- [ ] Versioned timetable file with exact export preview and field allowlist.
- [ ] Validated import, new/existing semester mapping and duplicate detection.
- [ ] Full private backup and transactional restore with pre-restore backup.
- [ ] Test malformed/future-version files and rollback.

Acceptance: a classmate imports a timetable twice without duplicate courses; no personal arrangements, private notes or tasks appear in the shared file; full backup round-trips all local data.

## Local review and notifications

- [ ] Planned time and daily union of occupied intervals; no actual-time claim.
- [ ] Completed tasks, current overdue count and clearly scoped week comparison.
- [ ] Offline aggregation and boundary tests; see [STATISTICS.md](STATISTICS.md).
- [ ] Opt-in local system notifications while the application process runs.
- [ ] Cancel/reconcile reminders after changes; permissions and resume tests; see [NOTIFICATIONS.md](NOTIFICATIONS.md).

Closed-process delivery requires separate platform acceptance. All these features remain planned.

## D — Classmate trial and desktop delivery

- [ ] Windows daily-use trial, then Linux and macOS native runtime checks.
- [ ] Japanese / English / Chinese strings and usable keyboard navigation.
- [ ] Light/dark modes, small windows and large text.
- [ ] Data retained across app updates; clear data-folder instructions.
- [ ] Downloadable packages, checksums, known issues and manual upgrade notes.
- [ ] Website matches available features and actual tested platforms.

Distribute through GitHub Releases. No app-store submission, hosted backend, telemetry or automatic updater.

## Estimates

Single-developer focused engineering estimates, including meaningful tests and routine fixes:

| Stage | Estimate |
|-------|----------|
| A: course timetable | 20–35 h |
| B: personal arrangements | 14–24 h |
| C: coursework, sharing and recovery | 16–26 h |
| D: three-desktop trial and packaging | 10–20 h |
| Local weekly review | 6–10 h |
| Recoverable drafts and save failures beyond basic persistence | 6–10 h |
| Running-process local notifications | 8–14 h |
| **Total** | **80–139 h (approximately 80–140 h)** |

This estimate includes local review, recoverable editing, daily counts and running-process notifications. Learning time, waiting for testers/devices, signing setup and mobile releases are excluded. Closed-process/background delivery is a separate provisional 12–24 h, subject to platform feasibility. Fixed-template CSV/paste import is a candidate 6–10 h after the core importer, see [QUICK_IMPORT.md](QUICK_IMPORT.md). At 10 engineering hours/week, the base is roughly 8–14 weeks; beginner learning takes longer. Start with [LEARNING.md](LEARNING.md) and revise after the first three lessons.

## Later, only after trial feedback

Closed-process notifications with platform tests; actual-time tracking; CSV/paste import; Android UX; month view; advanced school-calendar tools. Each needs its own scope and acceptance criteria. External calendar sync, AI and account systems are not presumed follow-up work.
