# Today: the home page and daily tasks

Updated: 2026-11-13. Planned behavior for the general time planner under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). Today is the default start page, without an account or a full-screen statistics dashboard. Build it in the Windows flow after storage and shared date rules; design the phone layout now and validate Android next. The current teaching app remains an in-memory task exercise. Work, study, home and personal commitments use the same views.

On a phone, show the local date and a compact current/next commitment with its start/end time and optional room/location. Follow it with the day's agenda and accessible task groups; keep the due-today count visible without opening another page. Imported classes, work sessions and appointments have equal status. If no timetable is used, Today remains a complete personal planner. Wide windows retain tasks beside the daily timeline.

The planning loop is to inspect commitments and available intervals, choose work, reserve an explicit personal plan, then adjust it as the day changes. A task's deadline remains separate from its work plan. Do not turn a deadline into a timed block or claim that reserved time measures actual work.

## Commitments and available time

- Show timed entries in actual time order and all-day items in a separate area. Keep visible gaps between timed commitments, without claiming that an unrecorded interval is certainly free.
- An entry is current during `[start, end)`. Show overlapping current entries as separate choices. The next entry starts after now; a completed time interval does not remain next.
- Apply individual corrections before choosing current/next items. A moved occurrence appears once at its replacement time; a cancelled occurrence does not occupy the agenda. Keep its original date and current correction accessible for restore; a full edit-history system is not required.
- Keep title, time and room/location readable with large text. Missing location uses clear empty text rather than a guessed room. Do not require color, hover or a wide calendar to understand an entry.
- Keep New task, New plan and access to Week reachable. Empty guidance offers New task and New plan. Show an Import action only when a supported route is actually included. Ordinary planning requires no school identity or semester.
- Opening an imported occurrence offers its details and the supported one-occurrence time/room correction, cancellation and restore. Use [HOLIDAYS.md](HOLIDAYS.md) for identity and scope rules.

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

Cover an empty list, completion and reversal, undated and future tasks, date-only deadlines, midnight, foreground recovery and save failure. With a fake clock, leave Today idle across an exact deadline and verify that the task moves groups and both counts change once. Check rescheduling after a deadline edit, removal after completion/deletion, late timers after sleep and clock changes. Confirm that every count matches its list.

Check current/next commitments at exact start and end times, overlaps, a moved class and a cancellation. A time or room correction must agree with Week and survive a confirmed save/restart. Check time/room readability and reachable task actions on Android with long translated text, 200% scaling, screen-reader navigation and the on-screen keyboard. Verify that moving a personal work plan leaves the related task deadline unchanged. These are future acceptance requirements, not passed checks or additions to the current lesson.
