# Today: the home page and daily tasks

Updated: 2026-11-11. Planned behavior for the general local planner. Today is the default start page, without an account requirement or a full-screen statistics dashboard. Implement it after the task model and persistence lessons; the current teaching app remains a basic in-memory task list. Work, learning, household and personal tasks use the same rules; see [ADR-007](adr/007-general-purpose-local-planner.md).

Show the local date and the number of tasks due today above a checkable list. The count must not require opening a statistics page. Below the tasks, show plans in time order and identify the next item. Course occurrences join this list only when the optional course feature is in use.

## Counting and grouping

- **Due today:** incomplete tasks due on today's date in the display time zone that are not already overdue. A date-only deadline uses the calendar date chosen by the user.
- **Overdue:** incomplete tasks at or past an exact deadline (`now >= deadline`). A task due today at 09:00 moves here at 09:00 and must not also appear in Due today. A date-only deadline becomes overdue at the next local midnight.
- **No date:** all incomplete tasks without a deadline. Keep them in a separate expandable group and out of the daily count; do not hide them entirely.
- **Completed:** completed tasks due today may be viewed in a collapsed group. Exclude them from incomplete counts. This group differs from the weekly review's completion count, which uses `completedAt`.
- Future tasks remain visible on the Tasks page. Course and schedule counts are not task counts.

For example, show 3 due today, 1 overdue and 2 without dates separately. Do not call the total "6 tasks due today." Derive groups and counts from the same projection. If today's tasks are complete, say so while keeping any overdue and undated groups visible.

After a completion change, update the count promptly and follow the save-status behavior in [EDITING.md](EDITING.md). Use the same rules in local-saving and temporary modes.

## Refresh while the page stays open

Schedule a refresh for the next exact deadline among incomplete tasks, as well as the next local midnight. Refresh at the next visible schedule boundary when it changes the current or next plan. A task due at 09:00 must move to Overdue at that boundary even if the user does nothing; a midnight-only or interaction-only refresh is insufficient.

After each refresh or task creation, deadline edit, completion, reversal or deletion, cancel the previous timer and calculate the next future boundary from the latest projection. Recalculate on a time-zone or system-clock change, on return to the foreground and after sleep. If a timer fires late, use the current injected clock rather than applying one stale transition. A completed or deleted task must not keep an obsolete deadline timer alive. Do not repeatedly schedule an already-passed boundary.

An application left open overnight must change its day, and one left open during the day must update overdue counts. Use an injected clock and scheduler rather than reading the date only at startup.

## Acceptance

Cover an empty list, completion and reversal, undated and future tasks, date-only deadlines, midnight, foreground recovery and save failure. With a fake clock, leave Today idle across an exact deadline and verify that the task moves groups and both counts change once. Check rescheduling after a deadline edit, removal after completion/deletion, late timers after sleep and clock changes. Confirm that every visible count matches its list. These requirements do not expand the first lesson's three-field task exercise.
