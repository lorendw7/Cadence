# Local data protection

Scope update (2026-11-15): [ADR-015](adr/015-android-self-use-first.md) sets the current route: shared local saving and recovery, Android planning self-use, bounded Android focus, then a useful ad-free mobile release. Windows remains the development host. Desktop focus presentation, media, Steam and a mobile ad pilot are separate later decisions; none blocks the first phone planning build. Desktop, Web and the concept site stay ad-free. School authorization, requests, connections, imports and cloud sync remain deferred. The repository became public again on 2026-11-27 under ADR-016, and the concept site returned on GitHub Pages. MIT remains unchanged. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates. These are planned contracts, not implemented behavior.

Updated: 2026-11-13. Planned behavior under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md), not implemented. The first local planning flow aims to protect against accidental loss and unintended upload. It is not an encrypted vault. The accepted future sync design in [ADR-011](adr/011-optional-sync-service.md) does not change account-free startup or make import depend on a server.

## First release

Use ordinary SQLite through the selected local adapter. Keep one store in the app's private data directory on the current OS, with normal platform permissions. Do not store data in the repository, installation folder or a public location. Files exposed through device access, copying or user export may be read by others. Explain this limit. Users may use OS disk protection independently; Cadence does not manage it. Verify Android file and backup behavior separately from the Windows teaching host.

Offer Save on this device and Temporary use before reading saved planning data. Temporary mode does not open the old database or write business data, draft files or automatic backups. Unsaved forms stay in memory in both modes. A crash may lose them; confirmed writes have separate recovery checks.

The first Android checks use fictional data. Personal self-use starts only after this storage choice, confirmed saving, failed-write handling and native backup recovery pass. Start with the accepted task slice, then extend the same checks to plans and corrections when they are included. A complete desktop package and external testers are not prerequisites for these owner-device checks.

Use transactions, database constraints, parameter binding and tested migrations. Preserve input on failed writes. Validate and preview a backup before replacement, keep a verified recovery copy in local mode and preserve the old dataset on failure. Do not hide a damaged database by creating an empty one.

## Private backups

The first backup is a versioned, unencrypted JSON file containing supported records, occurrence corrections and settings. Label it Private backup, not Secure backup. Show its contents and destination. Export is user-initiated and does not upload. Exclude raw import files, source screenshots, API keys, unsaved forms and operational settings. A mobile file or share destination may be outside Cadence's control; explain the chosen destination before export.

Test round trips, unsupported versions, corrupt files, missing references, resource limits, failed replacement and migration recovery. App-managed recovery copies belong to the clear-data scope. User-exported copies and OS backups cannot be recalled by the app. Do not promise physical disk erasure.

When [Android focus](ROADMAP.md#h--android-focus-self-use) introduces session records, extend accepted local saving, export, restore and clear checks to those records in the same lesson. Temporary sessions must not create automatic recoverable copies. Keep incomplete or uncertain timing explicit; recovery cannot invent elapsed time while the process was absent. This work follows the safe planning trial and adds no background-service guarantee.

Reviewed import adds confirmed candidates; it is not a full-backup restore. A parser or OCR engine must not replace the workspace directly. Keep source content and draft rows private, bound their size, and discard stale results after clear, restore or session changes. Test file-picker cancellation, interrupted review and temporary-file cleanup on each supported platform. An occurrence correction or cancellation must preserve the rest of the series and survive local recovery.

## Optional AI provider keys and import files

Screenshot recognition and AI help are unscheduled optional work. Apply the following rules only if those features are later selected; neither blocks the local release.

QUICK_IMPORT.md keeps cloud help optional. Keys stay in memory by default. Only an explicit Remember key choice may store one in the OS credential store. If that store is unavailable, offer session-only use; never write a plaintext key to settings or the planning database.

Temporary mode neither saves new keys nor loads old keys automatically. Using a remembered key needs an explicit session choice. Profile deletion removes its stored key and memory copy; remote revocation is a separate provider action. Exclude keys and request bodies from exports, logs and crash reports.

Show the destination and text/image payload before each send. No cloud fallback, provider switch or billable automatic retry is allowed. Use HTTPS and normal certificate checks. Imported text cannot choose a host or request tools. Cancelled or obsolete responses cannot update current drafts.

Keep screenshots and recognition drafts in memory where possible. Test dependency caches and cleanup. A path that cannot meet temporary-mode rules is unavailable in that mode. Model files contain no user data and may remain installed. Local clear cannot remove content already uploaded to a provider.

## Untrusted input

Treat imports, screenshots, recognized text and AI responses as data. Bound bytes, pixels, strings, records and repeat expansion. Validate format and domain rules before preview and again before commit. Render text without running scripts, formulas or links. Do not log a private file to explain an error.

## Deferred encryption

Application-level database encryption, encrypted backups and password recovery are outside the first release. Revisit them only for a clear threat or user need, with a tested library, key-loss recovery, migration and native packaging plan. If an encrypted format is later introduced, missing keys must never trigger a silent plaintext fallback. Do not invent cryptography or present ordinary saving as encryption.

## Delivery and later connections

Review dependencies and licenses, preserve lockfiles and keep secrets out of the repository. Verify the actual release package, use trusted distribution and provide upgrade/recovery guidance. A build or checksum alone is not proof of security. Never ask users to disable OS security globally.

The free Web client needs tested browser storage, cleanup, export and recovery limits under FREE_EDITION.md. The accepted future personal sync service uses Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in. Its implementation remains subject to review after store launch. PostgreSQL holds remote copies; it does not replace the local SQLite store. Academic access is a deferred extension with no approved interface or automatic institutional updates. Its data retention and onward-transfer terms must be resolved before implementation; personal-sync consent alone cannot grant school access.

CLOUD_SYNC.md defines the later data boundary. Signing in does not authorize upload. Enabling sync requires a separate preview and confirmation; temporary mode remains local and does not queue uploads. Service tokens, account bindings and sync checkpoints do not belong in private planning backups. Restoring a local backup pauses sync and requires a reviewed recovery path before remote work resumes.

Local clear and cloud deletion are separate actions. A cloud deletion flow must state what is removed from live storage and when retained backup copies expire. Set retention periods and verify deletion before launch; do not claim immediate physical erasure. Account switching and revoked access must preserve local work without sending it to another account.

Sync is not a backup: a mistaken edit or deletion may reach another device. Keep user export available, test protected off-host server backups and restore, and give users an export path before service shutdown. Transport protection does not make this design end-to-end encrypted; the service operator can access server-held records. See [SECURITY.md](SECURITY.md) for the later security gates.
