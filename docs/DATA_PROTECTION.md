# Local data protection

Scope update (2026-11-12): [ADR-010](adr/010-open-multiplatform-free-first.md) targets desktop, Web, Android and iOS under the existing MIT license. Complete the free local edition first. Cloud sync, paid capacity and supplementary ads are for review after store launch. External academic systems remain excluded. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) take precedence over older platform exclusions and school-gated proposals below.

Updated: 2026-11-11. Planned behavior under [ADR-008](adr/008-small-free-local-product.md), not implemented. The first release protects against accidental loss and unintended upload. It is not an encrypted vault.

## First release

Use ordinary SQLite through the selected local adapter. Keep one store in the OS user's app-data directory with normal user permissions. Do not store data in the repository, installation folder or a public location. A person or program with access to that account or copied files may read them. Explain this limit. Users may use OS disk protection independently; Cadence does not manage it.

Offer Save on this device and Temporary use before reading saved planning data. Temporary mode does not open the old database or write business data, draft files or automatic backups. Unsaved forms stay in memory in both modes. A crash may lose them; confirmed writes have separate recovery checks.

Use transactions, database constraints, parameter binding and tested migrations. Preserve input on failed writes. Validate and preview a backup before replacement, keep a verified recovery copy in local mode and preserve the old dataset on failure. Do not hide a damaged database by creating an empty one.

## Private backups

The first backup is a versioned, unencrypted JSON file containing supported records and settings. Label it Private backup, not Secure backup. Show its contents and destination. Export is user-initiated and does not upload. Exclude source screenshots, API keys, unsaved forms and operational settings.

Test round trips, unsupported versions, corrupt files, missing references, resource limits, failed replacement and migration recovery. App-managed recovery copies belong to the clear-data scope. User-exported copies and OS backups cannot be recalled by the app. Do not promise physical disk erasure.

## Optional AI provider keys and import files

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

The free Web client needs tested browser storage, cleanup, export and recovery limits under [FREE_EDITION.md](FREE_EDITION.md). Cloud synchronization is deferred to review after store launch, with separate consent, retention, deletion and operating-cost decisions. External academic systems remain excluded. See [SECURITY.md](SECURITY.md).