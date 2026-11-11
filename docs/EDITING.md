# Local editing and saving

Updated: 2026-11-11. Planned behavior under [ADR-008](adr/008-small-free-local-product.md). The first release uses explicit Save and unsaved input in memory. Persistent draft recovery is deferred. Current application progress is in [LEARNING.md](LEARNING.md).

## Save behavior

- A form has Save and Cancel. Required fields and errors are visible. Extra fields stay optional.
- Keep one active editor per record. Opening an existing record does not change it.
- Save validates the current input and waits for a confirmed local write. Prevent duplicate submission while pending.
- On failure, keep the form and input. Explain the error and offer retry. Do not show Saved before acknowledgement.
- Closing a changed form offers Save, Discard or Cancel. A cancelled close preserves the input.
- Temporary mode changes only memory and says Kept for this session. It does not create a draft file or automatic backup.
- Task completion is a direct action with pending/error feedback. Keep the existing one-level delete undo where supported; do not build an unlimited history system.
- The first repeat editor changes the whole series and says so. Single-occurrence changes are later work.

No autosave timers, draft promotion protocol or restart recovery for incomplete forms is required. Warn about unsaved input on normal exit where possible. A crash can lose it; say so without suggesting that confirmed saved records are also temporary.

## Acceptance

Check validation, explicit save/cancel, closing with changed input, double submission and failed writes. A failed save keeps the old record and input. Confirmed records survive restart in local mode; incomplete forms do not. Temporary editing leaves no private disk copy. Older callbacks must not recreate discarded data. See [APPLICATION.md](APPLICATION.md) for session and restore rules.
