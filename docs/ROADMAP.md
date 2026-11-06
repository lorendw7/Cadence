# Roadmap

Current scope: **courses and personal plans, local-only, desktop-first**. [REDESIGN.md](REDESIGN.md) is the behavior specification. External calendar integrations and store releases are not on this roadmap.

## Repository baseline

The current application is a Today placeholder. Platform runners and check workflows exist; feature checkboxes below remain open until implementation and acceptance pass. The starter package version is not a completed release.

## A — Course timetable

- [ ] Responsive shell with Today / Week / Courses / Tasks / Settings.
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
| **Total** | **60–105 h** |

This scoped estimate replaces the previous external-calendar estimate and expands the earlier course-only estimate to include independent personal arrangements. It excludes waiting for testers/devices, signing setup, advanced reminders and mobile releases. At 10 focused hours/week, plan roughly 6–11 weeks, then revise from actual stage A progress.

## Later, only after trial feedback

System notifications with explicitly tested closed-app behavior; Android UX; month view; advanced school-calendar tools. Each needs its own scope and acceptance criteria. External calendar sync, AI and account systems are not presumed follow-up work.
