# Local editing and saving

Updated: 2026-11-13. Planned behavior under [ADR-008](adr/008-small-free-local-product.md), with direct editing and minimal occurrence corrections accepted in [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). The first release uses explicit Save and unsaved input in memory. Persistent draft recovery is deferred. Current application progress is in [LEARNING.md](LEARNING.md).

## Save behavior

- A form has Save and Cancel. Required fields and errors are visible. Extra fields stay optional.
- Keep one active editor per record. Opening an existing record does not change it.
- Save validates the current input and waits for a confirmed local write. Prevent duplicate submission while pending.
- On failure, keep the form and input. Explain the error and offer retry. Do not show Saved before acknowledgement.
- Closing a changed form offers Save, Discard or Cancel. A cancelled close preserves the input.
- Temporary mode changes only memory and says Kept for this session. It does not create a draft file or automatic backup.
- Task completion is a direct action with pending/error feedback. Keep the existing one-level delete undo where supported; do not build an unlimited history system.
- Make repeat-edit scope explicit. The useful flow supports changing the time or room of one occurrence, cancelling it and restoring it. Preserve its stable identity and avoid displaying both its old and new position. A whole-series action must say so and explain the effect on existing corrections.
- Keep task deadlines distinct from reserved work time. Editing a deadline does not silently move a work session; changing a plan does not mark the task complete.
- If an optional import is included, it produces a draft for review. Mark uncertain or unsupported fields, show additions and conflicts, and wait for explicit confirmation. Reject input the parser cannot support; never invent plausible times or classes. A failed import leaves the current plan usable.

No autosave timers, draft promotion protocol or restart recovery for incomplete forms is required. Warn about unsaved input on normal exit where possible. A crash can lose it; say so without suggesting that confirmed saved records are also temporary.

## Acceptance

Check validation, explicit save/cancel, closing with changed input, double submission and failed writes. Cover one-occurrence time/room changes, cancellation, restoration, whole-series scope and backup round trips. For an included optional import, confirm that its review matches the committed records and that failed or cancelled imports write nothing. A failed save keeps the old record and input. Confirmed records survive restart in local mode; incomplete forms do not. Temporary editing leaves no private disk copy. Older callbacks must not recreate discarded data. See [APPLICATION.md](APPLICATION.md) for session and restore rules.

The first complete flow is on Windows. Design compact review and correction views early, then validate Android without waiting for every macOS/Linux release. Shared Flutter rules do not prove native file, storage, keyboard/touch or lifecycle behavior. See [ROADMAP.md](ROADMAP.md).
