# Security and data protection

Updated: 2026-11-11. These are requirements for the planned local desktop core and optional Web, sync and school extensions, not completed security checks. [ADR-007](adr/007-general-purpose-local-planner.md) sets the current direction: a general-purpose offline planner without accounts, with an explicit first-use choice between local saving and temporary use. School permission applies only to a school's interfaces and data; ordinary desktop and Web use do not depend on it.

Cadence supports work, study and personal planning. Mobile applications are out of scope. Record actual verification for each release rather than treating a design document as certification. A local-save choice, sync opt-in and external-source consent are separate decisions.

## Data and threats

Events, locations, dates, tasks, notes and backup files can reveal someone's routine. Treat them as private, even if some source details are public. Main risks include shared-device exposure, accidental export or replacement, hostile imports, script injection, storage failure or clearing, and changes in dependencies or deployment. There are no service credentials today; any future credentials must remain separate from planning records.

Local use does not imply encryption. The current application has no encrypted database, encrypted browser storage or end-to-end encryption. It cannot protect data against a fully compromised OS/browser or all software with the same user file permissions.

## Implementation responsibilities

[DATA_PROTECTION.md](DATA_PROTECTION.md) describes candidate encrypted SQLite, device key storage and authenticated backups. None is installed or implemented. Developers must also provide parameter binding, input validation, authorization and release controls. Users choose data-retention and connection options; they cannot disable required checks or secure transport.

Do not silently fall back to plaintext if keys, the encryption engine or a storage service are unavailable. Encryption cannot replace backups or protect plaintext from a compromised process while unlocked.

## Saving mode and optional Web data boundaries

The core must offer Save on this device and Temporary use on first use, before opening saved records. Temporary use starts empty and keeps planning data and drafts only in the current session. An explicitly chosen local-saving mode may be resumed later, but simply opening the app must not create that choice. Label the active mode and explain the data affected by a switch.

If a first Web client is built, it has no backend, account, sync, school API, CSV, system notifications or single-occurrence course changes. The same saving choice applies in the browser.

| Operation | Requirement |
|---|---|
| First use | Offer Save on this device and Temporary use before reading planning data; explain loss on refresh/close for temporary use |
| Local saving | Write only after an explicit choice; use the selected app database, with IndexedDB as the offline candidate; report real success or failure |
| Reopen | Resolve the saving mode first. Only an explicitly selected/resumed local-saving mode may read this app's saved records and validate them. Temporary mode must not read the old database, drafts or device key; reject damaged/unsupported saved records without replacing them. |
| JSON import | At most 1 MiB of UTF-8 content and 2,000 combined schedules/tasks; validate, preview, then replace only after confirmation |
| JSON export | User-requested download containing private records; not a filtered public timetable |
| Clear | Name the affected memory and app storage; do not clear other sites/apps or claim to remove downloaded files |
| Demonstration | Fictional data only; no real private schedules, passwords or tokens; school-extension demos also exclude student IDs, grades and real timetable samples |

Clearly distinguish memory mode from local saving. Browser storage is unencrypted and may be cleared or denied. Private windows, quota limits and restricted storage may cause failures. A successful write is not a promise of permanent retention; provide explicit backup export. See [browser storage limits](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).

Do not call browser storage a secure vault. Transactions do not solve script injection. Use localStorage only for small, non-sensitive preferences, never secret credentials. Explain that temporary use is suitable for a shared device, but still let the user choose before records are loaded. Before releasing local saving, verify multiple-tab writes, migrations and coordinated clearing. If writes cannot be coordinated safely, block them rather than relying on a warning to close extra tabs.

The current concept site has no planner data receiver. Hosting still receives page and asset requests. Describe hosting access logs separately from application records; do not promise that visiting a website creates no network records.

## Import and replacement

Check size before parsing. Then validate the root object, format/version, field types, total records, unique IDs, allowed categories, nonempty titles, string lengths, date/time ranges and bounded repeats. Reject unsupported fields, versions and references. Do not guess how to repair invalid data. Treat names, notes and locations as text, never HTML, scripts, expressions, commands, paths or requests.

The preview shows counts, date range and the fact that all current planning records will be replaced. Allow cancellation and suggest export first. Before confirmation, change neither memory nor persistent records. Validate, preview and apply the same snapshot. If local records change while the preview is open, require a fresh confirmation. A stale preview cannot overwrite newer work.

A failed replacement preserves the old data. A failed persistent write cannot report success. Define the versioned contract and tests in its implementation lesson; do not create unused directories in advance. Initial Web JSON is not automatically compatible with the future `cadence-timetable` sharing format or full desktop backup. Add explicit migration tests before accepting either format.

## Web delivery

- Use HTTPS and review the scripts, assets and dependencies actually shipped. Test a practical CSP against the real Flutter build.
- Give the planner and concept website different origins. Different URL paths do not isolate storage or script access. Minimize third-party scripts.
- Keep private records out of URLs, public bundles, source maps, repositories, error reports and analytics. Verify that hostile imported text cannot execute.
- Sessions are not needed now. Future session identifiers and long-lived tokens must not enter localStorage, sessionStorage or ordinary exports. See [OWASP browser guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html).
- If a service worker is added, cache only allowlisted program resources. Exclude private JSON, authentication callbacks and private API responses. Do not promise offline reload or closed-browser reminders without testing them.
- Use fictional data to check production paths, export, refresh, saving choices and clear. Never bundle private fixtures, keys or downloaded backups.

## Desktop and full data features

In local-saving mode, store databases and saved drafts in the app's user-data directory under normal user permissions, not the repository, installation folder or an automatically public directory. Temporary mode does not open or write that store; an explicit export is a separate user action with a clear private-file notice. Backups follow the selected private destination. [APPLICATION.md](APPLICATION.md) and [DATABASE.md](DATABASE.md) define transactions, migration backups, restore preview and rollback. Browser localStorage does not provide these guarantees by itself.

Future timetable sharing uses an explicit field allowlist that excludes private plans, tasks, notes and credentials. Full backup has a separate entry point. Bound file size, counts, fields and references. Imports must not trigger arbitrary file or network access. Follow [DATA_PROTECTION.md](DATA_PROTECTION.md) for encryption, key recovery and migration acceptance. Clearing covers drafts and temporary copies but cannot promise physical disk erasure or recall of shared files.

## Optional connections and backend

[SYNC.md](SYNC.md), [ADR-006](adr/006-optional-multi-client-sync.md) and [ADR-007](adr/007-general-purpose-local-planner.md) describe optional sync, separate from the local core and school adapters. Its identity provider is a later design choice, not a mandatory school account. Sync needs its own explanation of cloud copies, operator access, identity binding, workspace authorization, device revocation, deletion and recovery. If a school source is included, its login, data-access and cloud-retention permissions remain separate. The proposed first server can process plaintext; it is not end-to-end encrypted. If unreadable-to-server storage becomes mandatory, complete a separate E2EE design first.

Before introducing these future services:

- For a school adapter, obtain authentication and personal-timetable access permission separately. A demo or teacher's support does not replace authorization. Do not collect school passwords or substitute unapproved scraping. See [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).
- Verify identity, object ownership and field permissions on every private API call, denying access by default. A client user ID grants no authority. Test cross-account reads, exports, edits and deletes. See [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- Use expiring, revocable sessions. Set appropriate cookie attributes and scope, validate protocol callbacks and replay defenses, protect cookie-authenticated changes against CSRF, and restrict CORS. Test logout, expiry and revocation. See [OWASP sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
- Before voluntary logout or account switching, resolve unsent work: confirm sync, allow a permitted private export, or obtain an explicit discard choice. Forced expiry/revocation must stop requests immediately and isolate the old account's queue rather than silently erase it or replay it under a new account. See [SYNC.md](SYNC.md#identity-and-account-lifecycle) for temporary-session limits and recovery.
- Define TLS, minimal secret access, private backups, redacted logs, retention/deletion, rate limits, recovery, operating cost and ownership before real-data use. Keep private responses out of public caches.
- Keep independent local planning usable when a connection is disabled. Explain disconnect and deletion separately. A login page does not make browser-local data confidential.

## Acceptance and reports

For the local core, test the first-use saving choice, temporary startup with an existing database, explicit saving, mode switches, write failures and recovery. If Web is built, also test browser storage, strict JSON limits, preview/cancel/replace, export contents, hostile text, clear scope, three-language explanations and the actual deployment. Include boundary values, corrupt files and failed replacement with original data intact. Record results against actual code and deployment; do not mark design requirements as passed.

Application security acceptance is still future work. Before wider real-data use, assign a maintainer, upgrade/recovery plan, accurate privacy notice and private reporting route. Never ask for passwords, tokens, full timetables or backups in a public issue. Do not promise response times or school emergency contacts without resources. For a leak, first stop the exposure, protect credentials and assess scope, then follow the agreed response and notification process.
