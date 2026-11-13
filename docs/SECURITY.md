# Security and data protection

Scope update (2026-11-13): [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps tasks, deadlines, personal plans, Today and Week central. Build useful direct editors and reliable local saving on Windows, then validate Android without waiting for all macOS/Linux releases. Other platforms need separate acceptance. Screenshot import is optional work only if demonstrated demand justifies it; it has no scheduled release gate. CSV/table import remains deferred. Academic-system access is a deferred, unscheduled extension. Research, application preparation and integration are outside the current delivery milestone. Local release does not wait for school approval. Everyone receives the same free functions. Cloud sync and optional ads remain for review after store launch. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates.

ADR-008 keeps unsaved forms in memory and defers application-level encryption. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) prioritizes direct planning and phone use. Screenshot import is optional only if needed. Each included feature needs native data checks before release. Academic-access research does not establish permission or an implementation contract.

Updated: 2026-11-13. These are requirements for the planned local Windows-to-phone flow and later Web and personal sync work, not completed security checks. [ADR-007](adr/007-general-purpose-local-planner.md) establishes the account-free offline core, with an explicit first-use choice between local saving and temporary use. [ADR-011](adr/011-optional-sync-service.md) accepts a future sync design; implementation remains subject to review after store launch. Academic access remains a deferred extension, with no approved integration.

Cadence supports work, study and personal planning. Build the first working flow on Windows, then validate Android; other platforms follow their available hosts and devices. Record actual verification for each release rather than treating a design document as certification. A local-save choice, Google sign-in and sync opt-in are separate decisions.

## Data and threats

Events, locations, dates, tasks, notes and backup files can reveal someone's routine. Treat them as private, even if some source details are public. Main risks include shared-device exposure, accidental export or replacement, hostile imports, script injection, storage failure or clearing, and changes in dependencies or deployment. There are no service credentials today; any future credentials must remain separate from planning records.

Local use does not imply encryption. The current application has no encrypted database, encrypted browser storage or end-to-end encryption. It cannot protect data against a fully compromised OS/browser or all software with the same user file permissions.

## Implementation responsibilities

[DATA_PROTECTION.md](DATA_PROTECTION.md) defines ordinary local SQLite and private unencrypted JSON backups for the first release. Encryption is deferred; optional AI keys still require memory or an explicitly selected OS credential store. Developers must also provide parameter binding, input validation, authorization and release controls. Users choose data-retention and connection options; they cannot disable required checks or secure transport.

If an encrypted format is added later, do not silently fall back to plaintext when its key or engine is unavailable. Encryption cannot replace backups or protect plaintext from a compromised process while unlocked.

## Saving mode and optional Web data boundaries

Offer Save on this device and Temporary use before opening saved planning records. Remember an explicit choice and show the active mode. Temporary sessions start empty and do not read an old database, save drafts or create automatic backups. A user-requested export is a separate action. Keep unsaved editor input in memory even in local-saving mode.

Mode changes resolve pending work and explain which saved copy remains. Clear names the app-owned files affected and reports incomplete steps. It cannot remove exported copies or promise physical erasure. [APPLICATION.md](APPLICATION.md) defines the single-writer and session rules.

Define the free Web client's storage and lifecycle independently of native files and processes. Browser storage is not an OS secret store. The concept site has no private planner-data receiver; hosting still receives ordinary page requests. Follow [FREE_EDITION.md](FREE_EDITION.md) for browser-local limits.

## Import and replacement

Check size before parsing or image decoding. For a structured backup, validate the root object, format/version, field types, total records, unique IDs and references. For screenshot drafts, validate every selected entry's title, fields, date/time ranges and bounded repeats before confirmation. Reject unsupported values and rules rather than guessing repairs. Treat names, notes and locations as text, never HTML, scripts, expressions, commands, paths or requests.

For full-backup restore or another explicitly chosen replacement, the preview shows counts, date range and all records that will be replaced. Ordinary timetable import instead previews a selected batch of new candidates, their corrections and possible duplicates. It must not become a hidden replacement. Allow cancellation and suggest export before destructive actions. Before confirmation, change neither memory nor persistent records. Validate, preview and apply the same snapshot. If local records change while the preview is open, require a fresh confirmation. A stale preview cannot overwrite newer work.

A failed replacement preserves the old data. A failed persistent write cannot report success. Validate occurrence identities and references when restoring corrections; moved or cancelled records must not return as duplicate active entries. Define the versioned contract and tests in its implementation lesson; do not create unused directories in advance. A supported timetable input is not automatically compatible with full backup or a future sharing format. Add explicit version and migration tests before accepting either format.

## Optional screenshot and AI import

This section applies only if screenshot or AI import is selected later. It is not a local-release checklist item while that feature is absent. [QUICK_IMPORT.md](QUICK_IMPORT.md) defines conditional draft protection. Build direct editing first. Internal fictional drafts need no CSV parser; CSV/table import remains deferred until real user exports justify it.

Keep screenshot recognition local. RapidOCR remains subject to sample quality and native packaging checks, and image support is advertised only on passing targets. Set limits for file bytes, decoded pixels, text boxes and candidate entries. Reject unsupported files and layouts. Treat recognized text and model output as data; do not execute scripts, follow source links or grant model tools. Compare the draft with the source and require review before one additive commit. Manual in-app entry stays available after recognition failure. No hosting, school login, automatic source update or cloud upload is required for this route.

Cloud help requires the user's own key and a reviewed send action showing destination and content. Saving locally or adding a key does not permit uploads. No automatic cloud fallback or provider switch is allowed. Provider retention applies even during temporary use. Use secure transport and never forward credentials across hosts or redirects.

Keep keys in memory unless the user explicitly chooses the operating system's credential store. Temporary mode must neither save new keys nor load remembered keys automatically. Keep secrets out of planning records, exports, logs and ordinary settings. Handle unavailable secure storage without plaintext fallback. Validate every candidate before an atomic commit; stale responses cannot recreate cleared data. Test private buffer/cache cleanup, billable retry limits and continued local use after cloud errors.

## Web delivery

- Use HTTPS and review the scripts, assets and dependencies actually shipped. Test a practical CSP against the real Flutter build.
- Give the planner and concept website different origins. Different URL paths do not isolate storage or script access. Minimize third-party scripts.
- Keep private records out of URLs, public bundles, source maps, repositories, error reports and analytics. Verify that hostile imported text cannot execute.
- Sessions are not needed now. Future session identifiers and long-lived tokens must not enter localStorage, sessionStorage or ordinary exports. See [OWASP browser guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html).
- If a service worker is added, cache only allowlisted program resources. Exclude private JSON, authentication callbacks and private API responses. Do not promise offline reload or closed-browser reminders without testing them.
- Use fictional data to check production paths, export, refresh, saving choices and clear. Never bundle private fixtures, keys or downloaded backups.

## Desktop and full data features

This stable heading also covers the shared native phone flow. In local-saving mode, store databases and app-managed recovery copies in the app's private data directory under the platform's normal permissions, not the repository, installation folder or an automatically public directory. Temporary mode does not open or write that store; an explicit export is a separate user action with a clear private-file notice. Backups follow the selected private destination. [APPLICATION.md](APPLICATION.md) and [DATABASE.md](DATABASE.md) define transactions, migration backups, restore preview and rollback. Browser localStorage does not provide these guarantees by itself.

Future timetable sharing uses an explicit field allowlist that excludes private plans, tasks, notes and credentials. Full backup has a separate entry point. Bound file size, counts, fields and references. Imports must not trigger arbitrary file or network access. Follow [DATA_PROTECTION.md](DATA_PROTECTION.md) for the current file-privacy and recovery limits and any later encryption work. Clearing covers drafts and temporary copies but cannot promise physical disk erasure or recall of shared files.

## Optional connections and backend

No account service, sync queue, billing or ad SDK belongs in the first local planning flow. The accepted future service uses Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in. [CLOUD_SYNC.md](CLOUD_SYNC.md) defines its boundaries; implementation and launch remain subject to review after store launch. This is personal workspace sync, not automatic course updates or school login. The [academic-access study](UNIVERSITY_INTEGRATION.md) now permits feasibility and application preparation, not source access. An actual connection needs confirmed institutional terms, a documented read-only interface and a separately reviewed design. Never collect school passwords or scrape authenticated pages as a shortcut.

Before enabling it, verify Google ID tokens with a maintained official library and map the stable subject identifier to an internal user. Check ownership on every record read and write. Do not trust email addresses or user IDs supplied by a client as authorization. Keep service sessions and credentials out of planning exports and logs; use appropriate secure storage for each client. Define revocation and session expiry behavior.

Sign-in must not upload records. Enabling sync requires a separate account and workspace preview. Account switching, logout and revocation must stop the old account's requests and callbacks from changing another workspace. Local clear and local restore must not silently delete cloud data. Use the separate deletion and recovery rules in [CLOUD_SYNC.md](CLOUD_SYNC.md#logout-switching-clear-and-restore). Keep local editing and export usable during an outage and after service shutdown. [SYNC.md](SYNC.md) is historical research, superseded by ADR-011 for personal sync.

## Acceptance and reports

For the local core, test the first-use saving choice, temporary startup with an existing database, explicit saving, mode switches, write failures and recovery. If Web is built, also test browser storage, strict JSON limits, preview/cancel/replace, export contents, hostile text, clear scope, three-language explanations and the actual deployment. Include boundary values, corrupt files and failed replacement with original data intact. Record results against actual code and deployment; do not mark design requirements as passed.

For the Windows-to-phone flow, test local saving, failed writes, private export/restore, one-occurrence corrections and whole-series scope. On Android, also test Back, process termination and resume. Add source selection, bounded parsing, temporary-file cleanup, stale preview and duplicate confirmation checks only for an import route actually included. Unconfirmed previews must never replay as confirmed writes. These checks apply to native builds, not only a resized desktop window.

Before a sync pilot, test invalid and expired credentials, revoked sessions, cross-account record requests, interrupted retries, conflicting edits, deletions and stale callbacks after switching or restoring. Verify request limits and off-host backup recovery. These are later service gates, not requirements to start the local app and not passing test results.

Application security acceptance is still future work. Before wider real-data use, assign a maintainer, upgrade/recovery plan, accurate privacy notice and private reporting route. Never ask for passwords, tokens, full timetables or backups in a public issue. Do not promise response times or school emergency contacts without resources. For a leak, first stop the exposure, protect credentials and assess scope, then follow the agreed response and notification process.
