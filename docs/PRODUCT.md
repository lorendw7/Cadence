# Product scope

Cadence is a local desktop planner for **courses and personal arrangements**, built for the author and classmates. The authoritative interaction and behavior specification is [REDESIGN.md](REDESIGN.md).

## Audience and promise

Students need to know their teaching week, next class, room, personal commitments and approaching deadlines. They should be able to record a one-off room change or cancelled class without breaking the semester timetable.

The planned app works without registration or a server. Course files can be shared through an application the user chooses. Personal arrangements and coursework are not included in timetable sharing.

## First-release scope

| Area | Required behavior |
|------|-------------------|
| Semester | Explicit week-one Monday, end date, timezone and configurable periods |
| Courses | Multiple rules per course; weekly, odd/even and selected teaching weeks |
| Exceptions | Cancel, move or change one occurrence and restore it |
| Personal arrangements | Independent timed/all-day plans and bounded weekly repetition |
| Unified schedule | Today and time-based week views, with non-blocking conflict warnings |
| Coursework | Course-linked tasks and deadlines; exams as linked timed arrangements |
| Files | Previewed timetable sharing, duplicate-aware import, full backup/restore |
| Desktop | Windows, Linux and macOS, each validated on its native host |

A task deadline is not a reserved time slot. A public holiday is not proof a class is cancelled. An imported course is not automatically subscribed to future changes.

## Deliberate exclusions

External calendar APIs and subscriptions, account systems, hosted data, collaborative editing, school scraping, screenshot/AI extraction, wages, habit tracking, Pomodoro statistics, automatic updates and app-store publishing are outside the first release. Android remains a future target, not a parallel first-release commitment.

## Distribution and success

Distribute verified desktop packages through GitHub Releases. Start with the author and a small group of classmates; use feedback on actual course rules and daily planning before expanding scope. No telemetry is needed: users can voluntarily report an issue without attaching their private timetable or backup.

Success means a classmate can set up a semester, plan a week, handle a changed class and exchange a timetable without help from the developer.

## Current status

The repository contains a Today placeholder, platform scaffolding and check workflows. Product features above remain planned. The website must preserve that distinction.
