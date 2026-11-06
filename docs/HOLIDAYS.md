# Academic calendar and class changes

Status: planned behavior for the first local course planner. Public-holiday computation and external holiday subscriptions are not part of the first release.

## Teaching weeks are the source of truth

Each semester has an explicit week-one Monday and end date. Teaching week numbers advance every Monday, including vacations, unless the user changes the semester/course configuration through a previewed operation. Odd/even weeks refer to these teaching weeks.

A national holiday does not imply that the school cancels classes. A weekend can have a make-up class. Never automatically cancel courses from a public-holiday label or a device region setting.

## Supported changes

- Cancel one scheduled occurrence.
- Move one occurrence to a chosen date/time while retaining its original identity.
- Change one occurrence's room or teacher.
- Restore the original occurrence by removing its override.

A planned bulk vacation action selects a date range, previews affected course instances and creates explicit cancellation overrides only after confirmation. Repeating the action must not create duplicates or overwrite earlier custom moves. Personal plans and tasks are not affected.

Make-up classes always identify which original class is being moved. Do not infer that an entire Saturday follows a Monday timetable without explicit user input and preview.

## Sharing and checks

Timetable export can optionally include selected class changes; its preview states whether they are included. Import must preserve original occurrence IDs through remapping.

Test semester boundaries, odd/even weeks, partial first/last weeks, moving into another week, restoring a move and repeated bulk cancellation. These rules are shared by Today, the week view and conflict detection; see [REDESIGN.md](REDESIGN.md).
