# Data protection implementation plan

Updated: 2026-11-11. Status: proposed technologies and future acceptance checks. None of the storage or encryption features below is implemented. This document follows [ADR-007](adr/007-general-purpose-local-planner.md) and [the security design](SECURITY.md). ADR-007 replaces the earlier broad school gate while keeping the data-protection requirements that still apply.

The core is a local offline planner without an account. First use offers Save on this device or Temporary use before reading saved planning data. A later Web client, cloud sync and school adapters are separate choices. School permission applies only to a school's interfaces and data, not to ordinary desktop or Web use. Encryption does not expand source-retention rights. Input checks, key isolation and access control remain implementation duties, not optional security switches. Introduce these tools only in their lessons.

## Candidate tools

| Boundary | Candidate | Stage and limits |
|---|---|---|
| Desktop records | drift + sqlite3 with a verified encrypted SQLite build; evaluate SQLite3MultipleCiphers against the pinned drift version | Persistence lessons. drift alone does not encrypt data. Do not describe a plain classroom database as protected storage. |
| Small device secrets | flutter_secure_storage for a random database key | Check each desktop platform. Do not put schedules in the key store or promise protection from all software under the same OS account. |
| Private backup | Authenticated encryption from cryptography, such as AES-GCM; evaluate Argon2id for password-derived keys | Backup lessons. A library still needs a reviewed file format, resource limits and restore tests. |
| Queries and imports | Parameter binding, foreign keys, unique constraints, transactions, strict Dart validation and bounded recurrence | Start with the first persistence path. Parsing JSON or generating a model does not make input safe. |
| Optional Web client | Separate origin, HTTPS, a tested CSP for the actual Flutter build and text-only rendering | If the Web extension is built. IndexedDB is not a secret vault. Encryption does not replace script-injection prevention. |
| Optional service access | Per-object server authorization, size limits, timeouts, rate limits and applicable CSRF protection; fixed upstreams for school intermediaries | Optional sync follows ADR-006/007. A school intermediary also needs permission for its interface and data. Neither is required by the local core. |
| Build and release | Lockfiles, dependency review, minimal CI permissions, reviewed full Action SHAs, secret scanning and trusted distribution | Required at the relevant release stage; existing workflows do not establish that these checks have passed. |

These are candidates, not an installation list. Record exact versions, Flutter/Dart support, licenses, native requirements, maintenance status and failure behavior when selecting them.

## Desktop database and keys

Evaluate the native database path in [drift's encryption documentation](https://drift.simonbinder.eu/platforms/encryption/) against the version selected for the lesson. The earlier research identified SQLite3MultipleCiphers as a candidate. Do not copy an old instruction to install `sqlcipher_flutter_libs` without checking compatibility. SQLCipher and SQLite3MultipleCiphers are different products.

Give each local database a strong random key and protect it with [platform secure storage](https://pub.dev/packages/flutter_secure_storage). Test packaging, access control, locked or missing keys and account migration on macOS, Windows and Linux. Linux acceptance includes the required secret service/keyring. Never put keys in source, `.env`, ordinary settings, logs or a plaintext file beside the database.

Startup first resolves the user's saving mode. On first use, wait for Save on this device or Temporary use. Temporary use starts an empty in-memory session without reading a saved database, fetching its key or opening persisted drafts. If an earlier explicit local-saving choice is resumed, disclose that mode before loading records; launch alone is not consent to enable saving.

Only after local saving is selected or explicitly resumed: read the device key, verify the encryption engine, set the key, open and validate the database, run migrations, then enable business operations. The engine check must run in release builds, not only in an assertion. Missing keys, an unavailable key service or a damaged file must produce a clear recovery state. Do not create an empty replacement or silently save plaintext. Switching from temporary use must follow the reviewed migration/replacement flow, not merge silently into an old database.

Secure storage reduces the risk from a database file being copied alone. It is not a separate password vault. If another person using the same logged-in OS account is in scope, design a separate password or system-authentication unlock. Do not promise that other software under that account can never obtain a key.

Check the main database, WAL/journal, drafts, indexes, temporary files and recovery copies. Use the engine's tested encryption and integrity features; do not invent field encryption. Migrate recoverably, validate the new file before switching, and keep the original on failure. Encryption cannot recall old plaintext exports or guarantee physical disk erasure.

A device key cannot be the only recovery path. Losing it may make the database unreadable. A private backup needs an independent recovery method that works on another device. Never include the device key as plaintext or assume OS account migration transfers a working key.

## Optional AI provider keys and import files

The [assisted import design](QUICK_IMPORT.md) uses local RapidOCR screenshot processing and optional direct cloud requests. Provider keys are separate from the database encryption key. Keep them in memory by default. Remember key is a separate, explicit choice using tested platform credential storage. Temporary mode may use a remembered key only after a session-specific choice and must not save a new one.

Store a separate secret per provider profile. Ordinary settings may reference the secret but must not contain it. Profile removal clears the stored secret and memory copy; remote revocation remains a provider action. Missing or locked storage needs an error or memory-only use, never a plaintext fallback. Verify that exports, logs, crash reports and source files exclude keys and request bodies.

Screenshots and recognition drafts are private. Avoid retaining them after review; they are not automatic backup attachments. Test dependency caches and crash cleanup. If a path writes private files that cannot meet temporary-mode rules, disable that path in temporary mode. Model downloads are separate public resources. Local clear cannot remove data already sent to a chosen provider.

## Authenticated backups

The [cryptography API](https://pub.dev/documentation/cryptography/latest/index.html) is a candidate source of authenticated encryption and password derivation. Measure the actual platform implementation and cost. Add `cryptography_flutter` only after proving its benefit and compatibility; do not assume identical acceleration on every desktop.

Review a versioned container before implementation. A random data key encrypts the content; a suitable password-derived key can protect that data key. Use established implementations, secure randomness, separate salts and correct nonce handling. Never reuse a nonce with the same key. Authenticate important header fields, including algorithm, derivation parameters and format version. This document is not a finished cryptographic protocol.

Default backup filenames must not contain names, student IDs or course titles. Do not upload automatically. Restore in this order:

1. Bound the input size and password-derivation resource budget.
2. Authenticate and decrypt.
3. Strictly validate the business format.
4. Show a preview and obtain replacement confirmation.
5. Restore transactionally.

A wrong password, changed ciphertext or excessive derivation parameters must leave existing records intact and avoid private error output. The initial 1 MiB / 2,000-record JSON limit still applies after decryption. Set a separate finite ciphertext-container limit; encryption is not a way around import limits.

Do not persist the backup password. If it and all usable copies are lost, recovery may be impossible. UI retry limits do not stop offline guessing of a copied file. A short PIN, one SHA-256 hash or a hard-coded key is not a substitute for suitable password derivation. A new password does not revoke old backups or old passwords. After key exposure, rotate the data key; old copies remain outside control. Authenticated encryption alone also cannot detect replacement with an older, valid backup.

Design database encryption and portable backup encryption separately. Clearly label any user-requested plaintext export. Sharing needs a field allowlist; school or other restricted-source content also needs the applicable retention/export permission. A private backup is not a public schedule.

## Untrusted input

Use typed queries and parameter binding instead of constructing SQL from user text. Enable and verify foreign keys for every database connection. Enforce important rules in both domain validation and transactions.

Treat files, API responses and saved browser data as untrusted. Bound strings, record counts, nesting, dates, references and recurrence expansion. Reject unknown formats and invalid references. A parseable date may still violate business rules. Errors must not echo an entire private import.

The first version does not execute rich text, plugins, imported scripts or dynamic code. Render titles and notes as text. If links are added later, allow only reviewed protocols and require a user action to open them. A title must not become a network request, command or arbitrary file access. Async work checks revisions and generations so stale results cannot overwrite newer edits or recreate cleared data.

## Web scripts, sessions and delivery

IndexedDB can hold local records, but a malicious same-origin script may read them. Put the real planner and concept website on separate origins. Minimize third-party scripts and connection destinations. Test CSP with the selected Flutter/Wasm build; do not allow every source just to make a build run. Use HTTPS with normal certificate checks.

The Web implementation of a secure-storage package is not equivalent to a desktop key store. It does not establish that long-lived bearer tokens can be safely kept in browser storage. Sessions are needed only for an optional service; use its reviewed protocol, plus school approval if it uses a school identity service. If server sessions are used, apply suitable Secure/HttpOnly/SameSite cookies, CSRF defenses, expiry and revocation. CORS does not replace authorization.

Evaluate browser encryption separately. A compromised page can steal a password or plaintext while unlocked, even if stored bytes are encrypted. Do not keep long-term decryption secrets in ordinary browser storage or compile them into the frontend. Service workers may cache only approved program resources, never private API or authentication responses. Test cache upgrades and failed data migrations.

## Optional service and release controls

A school intermediary is needed only if an approved school interface requires server identity. This restriction does not exclude a separately chosen sync service: [SYNC.md](SYNC.md), [ADR-006](adr/006-optional-multi-client-sync.md) and [ADR-007](adr/007-general-purpose-local-planner.md) govern that optional extension. Neither service is part of the local core.

For any private service, derive the user from a verified session and check ownership for each object. A client-supplied user/student ID, `owner_id` or random record ID is not authorization. For intermediaries, fix upstream hosts and paths on the server, restrict redirects and reject arbitrary proxy URLs. Bound requests, responses, time and rate. Keep credentials in deployment secret storage, not client files.

Log only the metadata needed to diagnose faults. Exclude tokens, full requests/responses, timetables and notes. Apply the approved access-log scope and retention. Do not place private responses in public caches. A service without a business database can still process private data through sessions and logs.

Use reviewed dependencies and lockfiles. Resolve relevant dependency and secret-scan findings; a clean scan is not proof of safety. Pin Actions to reviewed full SHAs and maintain an update process. Do not expose release secrets to pull-request checks; grant deployment permissions only to deployment jobs. Validate signing or trusted distribution on each release platform. Checksums detect change but do not prove publisher identity if the archive and checksum are replaced together. Never ask users to disable OS security globally.

Dart obfuscation only makes code harder to read. It cannot protect embedded client secrets. Do not add unnecessary microservices, mandatory cloud accounts or custom cryptography in the name of safety.

## Implementation order and acceptance

1. Continue the task lessons with input checks and clear failures.
2. In persistence lessons, verify transactions and constraints, then prototype the cipher engine and device key store. Separate classroom data from real-data release requirements.
3. In backup lessons, verify authenticated backup, cross-device restore, migration and clearing. Keep notification content minimal.
4. Evaluate optional Web and sync work separately after the local core. Complete their storage, access, session, script-policy and release checks. Add school adapters only with the required interface and data permissions.

| Scenario | Required result |
|---|---|
| First launch or temporary mode with an existing saved database | Ask for a saving mode before reading records; temporary use does not fetch the saved key, read drafts or open the database |
| Release lacks the cipher engine or device key service | Refuse to open protected data; no plaintext fallback or empty replacement |
| Database is copied alone | Private content cannot be read directly; inspect WAL, drafts, temporary files, logs and recovery copies |
| Wrong password, truncated ciphertext, changed header or excessive KDF parameters | Reject with bounded resource use; preserve current records and avoid private error output |
| Migration interrupted, disk full or device key lost | Explain the failure and use a tested recovery path without damaging the only copy |
| Hostile JSON, SQL text, script title or huge recurrence | Treat input as data; reject invalid structures without execution or resource exhaustion |
| User A requests B's record or an arbitrary upstream URL | Reject without revealing B's data or making an unauthorized request |
| Old tab/request returns after clear | Do not recreate records, credentials or the previous account's view |
| Backup restored on a new device | Independent backup recovery works without the old device key; credentials are not restored |

These are future checks, not current results. Before real-data use, record tested versions, platforms and scope. Have someone other than the implementer review the cryptographic format and key flow. A compromised OS, unlocked process or malicious publisher remains outside these protections. Encryption limits exposure; backups limit data loss. Both are needed.

## References

The original technology review was recorded on 2026-11-10. Recheck library support when implementing. The combinations and stages above are Cadence proposals.

- [drift encryption](https://drift.simonbinder.eu/platforms/encryption/)
- [flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage)
- [cryptography API](https://pub.dev/documentation/cryptography/latest/index.html) and [cryptography_flutter](https://pub.dev/packages/cryptography_flutter)
- [OWASP cryptographic storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html) and [password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP browser security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [GitHub Actions security](https://docs.github.com/en/actions/reference/security/secure-use)
