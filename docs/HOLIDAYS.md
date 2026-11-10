# Optional academic calendar and class changes

Updated: 2026-11-11. Optional course-extension design, not implemented. The general planner needs no semester or teaching-week setup; see [ADR-007](adr/007-general-purpose-local-planner.md). Introduce academic calendars and single-class changes only in later lessons. Public-holiday calculation and external holiday subscriptions are outside the core release.

If the course extension is developed, validate academic periods and irregular teaching with its intended users. Do not assume that one department's calendar applies to a whole university. Any future school-derived configuration records its scope, source and checked date and remains previewable; access and freshness rules are in [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

## Teaching weeks are the source of truth

Each semester has an explicit week-one Monday and end date. Teaching week numbers advance every Monday, including vacations, unless the user changes the semester or course settings after reviewing a preview. Odd/even weeks refer to these teaching weeks.

A national holiday does not imply that the school cancels classes. A weekend can have a make-up class. Never automatically cancel courses from a public-holiday label or a device region setting.

## Supported changes

- Cancel one scheduled occurrence.
- Move one occurrence to a chosen date/time while retaining its original identity.
- Change one occurrence's room or teacher.
- Restore the original occurrence by removing its override.

A planned bulk vacation action selects a date range, previews affected course occurrences and creates explicit cancellation overrides only after confirmation. Repeating the action must not create duplicates or overwrite earlier custom moves. Personal plans and tasks are not affected. The operation follows the selected storage mode: a session-only schedule stays in memory.

Make-up classes always identify which original class is being moved. Do not infer that an entire Saturday follows a Monday timetable without explicit user input and preview.

## Sharing and checks

Timetable export can optionally include selected class changes; its preview states whether they are included. Import must preserve original occurrence IDs through remapping.

Test semester boundaries, odd/even weeks, partial first/last weeks, moving into another week, restoring a move and repeated bulk cancellation. These rules are shared by Today, the week view and conflict detection; see [REDESIGN.md](REDESIGN.md).
