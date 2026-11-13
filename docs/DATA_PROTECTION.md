# Local data protection

Scope update (2026-11-13): [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps tasks, deadlines, personal plans, Today and Week central. Build useful direct editors and reliable local saving on Windows, then validate Android without waiting for all macOS/Linux releases. Other platforms need separate acceptance. Screenshot import is optional work only if demonstrated demand justifies it; it has no scheduled release gate. CSV/table import remains deferred. Academic-system access is a deferred, unscheduled extension. Research, application preparation and integration are outside the current delivery milestone. Local release does not wait for school approval. Everyone receives the same free functions. Cloud sync and optional ads remain for review after store launch. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates.

Updated: 2026-11-13. Planned behavior under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md), not implemented. The first local planning flow aims to protect against accidental loss and unintended upload. It is not an encrypted vault. The accepted future sync design in [ADR-011](adr/011-optional-sync-service.md) does not change account-free startup or make import depend on a server.

## First release

Use ordinary SQLite through the selected local adapter. Keep one store in the app's private data directory on the current OS, with normal platform permissions. Do not store data in the repository, installation folder or a public location. Files exposed through device access, copying or user export may be read by others. Explain this limit. Users may use OS disk protection independently; Cadence does not manage it. Verify Android file and backup behavior separately from the Windows teaching host.

Offer Save on this device and Temporary use before reading saved planning data. Temporary mode does not open the old database or write business data, draft files or automatic backups. Unsaved forms stay in memory in both modes. A crash may lose them; confirmed writes have separate recovery checks.

Use transactions, database constraints, parameter binding and tested migrations. Preserve input on failed writes. Validate and preview a backup before replacement, keep a verified recovery copy in local mode and preserve the old dataset on failure. Do not hide a damaged database by creating an empty one.

## Private backups

The first backup is a versioned, unencrypted JSON file containing supported records, occurrence corrections and settings. Label it Private backup, not Secure backup. Show its contents and destination. Export is user-initiated and does not upload. Exclude raw import files, source screenshots, API keys, unsaved forms and operational settings. A mobile file or share destination may be outside Cadence's control; explain the chosen destination before export.

Test round trips, unsupported versions, corrupt files, missing references, resource limits, failed replacement and migration recovery. App-managed recovery copies belong to the clear-data scope. User-exported copies and OS backups cannot be recalled by the app. Do not promise physical disk erasure.

Reviewed import adds confirmed candidates; it is not a full-backup restore. A parser or OCR engine must not replace the workspace directly. Keep source content and draft rows private, bound their size, and discard stale results after clear, restore or session changes. Test file-picker cancellation, interrupted review and temporary-file cleanup on each supported platform. An occurrence correction or cancellation must preserve the rest of the series and survive local recovery.

## Optional AI provider keys and import files

Screenshot recognition and AI help are unscheduled optional work. Apply the following rules only if those features are later selected; neither blocks the local release.

[QUICK_IMPORT.md](QUICK_IMPORT.md) keeps cloud help optional. Keys stay in memory by default. Only an explicit Remember key choice may store one in the OS credential store. If that store is unavailable, offer session-only use; never write a plaintext key to settings or the planning database.

Temporary mode neither saves new keys nor loads old keys automatically. Using a remembered key needs an explicit session choice. Profile deletion removes its stored key and memory copy; remote revocation is a separate provider action. Exclude keys and request bodies from exports, logs and crash reports.

Show the destination and text/image payload before each send. No cloud fallback, provider switch or billable automatic retry is allowed. Use HTTPS and normal certificate checks. Imported text cannot choose a host or request tools. Cancelled or obsolete responses cannot update current drafts.

Keep screenshots and recognition drafts in memory where possible. Test dependency caches and cleanup. A path that cannot meet temporary-mode rules is unavailable in that mode. Model files contain no user data and may remain installed. Local clear cannot remove content already uploaded to a provider.

## Untrusted input

Treat imports, screenshots, recognized text and AI responses as data. Bound bytes, pixels, strings, records and repeat expansion. Validate format and domain rules before preview and again before commit. Render text without running scripts, formulas or links. Do not log a private file to explain an error.

## Deferred encryption

Application-level database encryption, encrypted backups and password recovery are outside the first release. Revisit them only for a clear threat or user need, with a tested library, key-loss recovery, migration and native packaging plan. If an encrypted format is later introduced, missing keys must never trigger a silent plaintext fallback. Do not invent cryptography or present ordinary saving as encryption.

## Delivery and later connections

Review dependencies and licenses, preserve lockfiles and keep secrets out of the repository. Verify the actual release package, use trusted distribution and provide upgrade/recovery guidance. A build or checksum alone is not proof of security. Never ask users to disable OS security globally.

The free Web client needs tested browser storage, cleanup, export and recovery limits under [FREE_EDITION.md](FREE_EDITION.md). The accepted future personal sync service uses Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in. Its implementation remains subject to review after store launch. PostgreSQL holds remote copies; it does not replace the local SQLite store. Academic access is a deferred extension with no approved interface or automatic institutional updates. Its data retention and onward-transfer terms must be resolved before implementation; personal-sync consent alone cannot grant school access.

[CLOUD_SYNC.md](CLOUD_SYNC.md) defines the later data boundary. Signing in does not authorize upload. Enabling sync requires a separate preview and confirmation; temporary mode remains local and does not queue uploads. Service tokens, account bindings and sync checkpoints do not belong in private planning backups. Restoring a local backup pauses sync and requires a reviewed recovery path before remote work resumes.

Local clear and cloud deletion are separate actions. A cloud deletion flow must state what is removed from live storage and when retained backup copies expire. Set retention periods and verify deletion before launch; do not claim immediate physical erasure. Account switching and revoked access must preserve local work without sending it to another account.

Sync is not a backup: a mistaken edit or deletion may reach another device. Keep user export available, test protected off-host server backups and restore, and give users an export path before service shutdown. Transport protection does not make this design end-to-end encrypted; the service operator can access server-held records. See [SECURITY.md](SECURITY.md) for the later security gates.
