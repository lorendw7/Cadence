# Local notifications

Updated: 2026-11-13. Planned optional local extension, not implemented. First complete the Windows task, deadline, personal-plan, Today/Week and recovery flow under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md), then validate Android. Reminders do not delay that phone stage or require all macOS/Linux releases to finish. Academic access remains a deferred extension, with no approved integration.

## Reminder content

Plan local system notifications before personal plans, imported class occurrences and task deadlines when the person chooses reminders. These rules apply equally to work, learning and daily-life arrangements. Users explicitly enable reminders and choose a lead time. Support disabling all reminders or one item's reminder. Keep notifications off by default and do not request permission at first launch. A date-only task needs a chosen reminder time; do not assume midnight. Undated tasks have no deadline reminder.

Let users hide titles and locations in notification content. Selecting a notification opens the related detail. If the item has been deleted, explain that it is unavailable without crashing. This feature uses local delivery, without a server or remote push.

## Platform stages

1. **Running application:** local reminders while the process runs, including when minimized. Keep the notification adapter separate from schedule calculation. If permission is denied, Do Not Disturb is active or the desktop notification service is unavailable, Today still shows tasks and the next event. Show the actual reminder status.
2. **Background or exited application:** separately verify a closed window with a running background process and delivery scheduled by the operating system after the process exits. Expose each capability only on platforms where the actual release package passes testing. Background operation and startup at login require user choice. A closed window, process exit, shutdown and sleep are different states.

[flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) is a candidate, not an installed dependency. The maintainer documentation reviewed on 2026-11-09 described desktop implementations with differing capabilities: Linux did not provide the same system scheduling as the other platforms, and Windows had limits around repeating notifications and cancellation/querying without package identity. This is a historical research note, not a compatibility guarantee. Recheck the selected version and packaging requirements during implementation. Do not claim reliable post-exit delivery from plugin selection or a successful ZIP build alone.

Android notification permission, lifecycle and background behavior need native checks when reminders reach that platform. Shared Flutter schedule calculations do not establish delivery. Retain separate checks for Windows, macOS, Linux and later iOS; Web reminders would need their own browser design.

## Consistency and recovery

- Use occurrence identity plus reminder offset as a stable reminder identifier, tied to the current committed record revision. When time, a single-occurrence correction or restoration, cancellation, deletion, task completion or reminder settings change, cancel obsolete notifications and rebuild the desired set. Drafts never create reminders.
- Persist reminder settings and delivery records only in a mode where saving is allowed. Reconcile them with current data at startup or resume to avoid duplicates. Record submission only after the system API accepts it. Accepted does not mean seen by the user. Session-only use must not leave persistent reminder records or post-session deliveries.
- Use an injected clock to test deadlines and time zones. After sleep, summarize missed items in one inspectable notice instead of flooding the user with old notifications. System Do Not Disturb and shutdown remain outside the application's delivery guarantee.
- Saving a plan and rebuilding system notifications cannot be assumed to share a database transaction. If a saved plan's reminder update fails, keep the plan and show that its reminders need a retry.

## Acceptance and estimates

Automated checks cover trigger times, cancellation, repeated startup, time changes, completed-task exclusion, permission denial and delivery failure. On each supported platform, test the actual release package while minimized, after restart and sleep, on notification click, and with denied permission and Do Not Disturb. A successful build is not notification acceptance.

The earlier estimate for reminders while running is 8–14 development hours. Reliable background or post-exit delivery needs separate platform feasibility work; the provisional extra estimate is 12–24 hours, outside the base estimate. These are planning estimates, not completed support or delivery promises.
