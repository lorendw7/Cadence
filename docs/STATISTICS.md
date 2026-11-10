# Local weekly review

Updated: 2026-11-11. Planned desktop review, not implemented. This is a later addition to the general local planner, not a requirement for first use. See [ADR-007](adr/007-general-purpose-local-planner.md).

## Entry and scope

Open the review from Week → Review this week. Show planned duration, the daily distribution of plans, completed tasks and tasks currently overdue. Keep it out of the home page and main navigation. Do not assign a productivity score. Data and calculations stay on the device and require no account, server, analytics SDK or paid API.

The first version is not a timer. A two-hour plan means two planned hours, not two hours of completed work or study. Actual timing, pause/resume and time-use analysis need a later, explicit requirement. Work, learning and personal plans follow the same calculation rules, without requiring courses or semesters.

## Calculation rules

- A week is the half-open interval from Monday 00:00 to the next Monday 00:00 in the display time zone. Compare two adjacent complete calendar-week ranges. Make clear that a range may include future plans; do not compare partial actual progress with a whole week of planned time.
- Use the same expanded occurrences as the week view. Exclude cancelled occurrences and count a moved occurrence once at its new time. Expand only the requested range. Apply the same rule to course occurrences if that optional extension is active.
- Clip cross-week events to the query range and split cross-day events by local calendar date. Calculate minutes from actual instants; a daylight-saving transition day need not have 24 hours.
- Each plan category sums its valid events. Overlaps may count more than once in category totals. Label them as summed event duration. A course category appears only if the course extension is in use; the basic review must work without it.
- Occupied schedule duration merges overlapping intervals before counting and shows the daily distribution. Do not treat the sum of category totals as unique occupied time. All-day entries and task deadline points do not contribute hours; show their counts separately.
- Accumulate minutes and format once at the end, without rounding each event first. Empty data shows zero and an entry action, never invented example statistics.
- Prefer differences in minutes or task counts over percentage growth. If the previous week is zero, show that there were no records instead of calculating a percentage.

Example: a work plan from 09:00–10:00 and a personal plan from 09:30–10:30 each contribute 60 minutes to their category total. Together they occupy 90 unique minutes.

## Task counts

- A later task-model lesson adds nullable `completedAt`. Record the current instant on completion and clear it when completion is reversed. Completion state and timestamp must agree.
- Completed this week counts tasks that are currently complete and whose `completedAt` lies in the selected week. It does not count checkbox clicks. Tasks without deadlines may contribute.
- Currently overdue uses the injected current time to count incomplete tasks at or past an exact deadline (`now >= deadline`), matching [TODAY.md](TODAY.md). Date-only deadlines become overdue at the next local midnight. This is a present-state count, not a historical snapshot of a past week's end.
- The first version stores no operation log or immutable historical reports. Reversing completion, editing or deleting records recalculates past results. Explain that the review is calculated from current records. Private backups retain task states and completion timestamps; timetable sharing excludes tasks and statistics.

## Acceptance and estimate

The review must work and recalculate offline in both local-saving and temporary modes, without creating persistent review records in temporary mode. Plan edits and reversed task completion must update it. Cover empty data, adjacent and overlapping intervals, day/week boundaries, moved and cancelled occurrences, all-day entries, zero-baseline comparisons and task completion reversal. Include optional course cases only when that extension is implemented. Use a fixed clock so tests do not change with the run date.

The earlier estimate is 6–10 development hours for the basic review, using pure Dart aggregation and simple Flutter bars. Do not add a chart service for the first version. See [ROADMAP.md](ROADMAP.md) and [LEARNING.md](LEARNING.md) for staged estimates and lessons.
