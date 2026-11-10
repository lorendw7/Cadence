# Local editing and saving

Updated: 2026-11-11. Planned behavior; persistent drafts and schedule editing are not implemented. Build direct editing before template import. On first use, explicitly offer Save on this device or Temporary use, with no account required. Saving follows that choice; before a choice or during temporary use, do not create persistent planner records, drafts or automatic backups. See [ADR-007](adr/007-general-purpose-local-planner.md).

Create a plan from an empty time slot in the week view. Select an existing item to open its editor. Show the title, date and time first, followed by optional location, category and repeat settings. Room, teacher and teaching-week fields belong to the optional course extension; ordinary work, learning and daily-life plans do not require a semester. Make the choice between editing one occurrence and its whole repeat rule explicit when that later capability is implemented.

## Save behavior

- Form input is a draft. In a mode that allows local saving, save it to a separate draft record after a short pause in typing, on blur and when closing the editor. Do not rely only on application shutdown. In session-only mode, keep the draft in memory and explain that closing loses it.
- Show distinct states: Not saved, Saving, Draft saved and Save failed. Only a successful storage write can mark a draft as saved. Saving a draft does not update the schedule. Temporary mode must say that data is kept only for this session rather than claiming it was saved to disk.
- Drafts may omit required fields. Exclude them from the week view, statistics and reminders. On confirmation, validate the full input, commit the plan and repeat rules in one transaction, and remove the matching draft. Keep the input if validation fails. The same atomic behavior applies to optional course records.
- After restart, offer to restore saved drafts without submitting them. A draft that edits a record keeps the record's original revision. If that revision has changed, require another review instead of overwriting newer data.
- Task completion and reversal use direct commands. In a saving mode, commit them in a transaction. The list may show a pending state, but must not claim success before storage confirms it. Keep failed operations available to retry.
- Order concurrent writes by revision or a queue. A slower, older request must not overwrite newer input. If the editor is closing with unsaved changes, offer continued saving, retry or explicit discard.
- Give each draft an increasing edit sequence. An old success response must not mark newer text as saved. Freeze the submitted draft version and check the record and dependency revisions in the transaction. Closing, discarding and submitting must stop later session writes, cancel debounce timers and settle queued writes so a late autosave cannot recreate a deleted draft. See [APPLICATION.md](APPLICATION.md).
- Support undo for deletion. Before migrations, bulk changes or full restore, use a verified local snapshot where retention is allowed. Autosave is not a backup; provide a separate export action.

A power loss may discard input that has not been written. Autosave cannot prevent disk failure. Promise recovery of confirmed saved data within the tested storage contract, not that data can never be lost.

## Acceptance

Check the first-use choice before any persistent planner write. Saved content must survive restart and partial drafts must be recoverable. Failed writes must leave input available to retry. Rapid edits must retain the latest value. Discarding a draft must leave the plan unchanged. A failed submit must not leave a partial plan or course. Undo must restore the deleted item. Temporary editing must leave no persistent draft, database write or automatic backup. All core editing must work offline. Test with a temporary database and a storage adapter that can simulate failures.
