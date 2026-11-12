# Security and data protection

Scope update (2026-11-12): [ADR-010](adr/010-open-multiplatform-free-first.md) targets desktop, Web, Android and iOS under the existing MIT license. Complete the free local edition first. Cloud sync, paid capacity and supplementary ads are for review after store launch. External academic systems remain excluded. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) take precedence over older platform exclusions and school-gated proposals below.

ADR-008 keeps unsaved forms in memory and defers application-level encryption. [ADR-010](adr/010-open-multiplatform-free-first.md) adds free Web and mobile targets. Their local-data checks apply before release. Cloud-service checks remain later work; no school integration is planned.

Updated: 2026-11-11. These are requirements for the planned local desktop core and optional Web, sync and school extensions, not completed security checks. [ADR-007](adr/007-general-purpose-local-planner.md) sets the current direction: a general-purpose offline planner without accounts, with an explicit first-use choice between local saving and temporary use. School permission applies only to a school's interfaces and data; ordinary desktop and Web use do not depend on it.

Cadence supports work, study and personal planning. Mobile applications are out of scope. Record actual verification for each release rather than treating a design document as certification. A local-save choice, sync opt-in and external-source consent are separate decisions.

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

Check size before parsing. Then validate the root object, format/version, field types, total records, unique IDs, allowed categories, nonempty titles, string lengths, date/time ranges and bounded repeats. Reject unsupported fields, versions and references. Do not guess how to repair invalid data. Treat names, notes and locations as text, never HTML, scripts, expressions, commands, paths or requests.

The preview shows counts, date range and the fact that all current planning records will be replaced. Allow cancellation and suggest export first. Before confirmation, change neither memory nor persistent records. Validate, preview and apply the same snapshot. If local records change while the preview is open, require a fresh confirmation. A stale preview cannot overwrite newer work.

A failed replacement preserves the old data. A failed persistent write cannot report success. Define the versioned contract and tests in its implementation lesson; do not create unused directories in advance. Initial Web JSON is not automatically compatible with the future `cadence-timetable` sharing format or full desktop backup. Add explicit migration tests before accepting either format.

## Optional screenshot and AI import

[QUICK_IMPORT.md](QUICK_IMPORT.md) defines the accepted desktop design, not implemented protection. Local extraction uses RapidOCR without upload. Set image limits for bytes and decoded pixels. Reject unsupported file types. Treat recognized text and model output as data; do not execute scripts, follow source links or grant model tools. The full-replacement preview above applies to backup restore; assisted import instead previews a selected batch of new entries and duplicates.

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

In local-saving mode, store databases and app-managed recovery copies in the app's user-data directory under normal user permissions, not the repository, installation folder or an automatically public directory. Temporary mode does not open or write that store; an explicit export is a separate user action with a clear private-file notice. Backups follow the selected private destination. [APPLICATION.md](APPLICATION.md) and [DATABASE.md](DATABASE.md) define transactions, migration backups, restore preview and rollback. Browser localStorage does not provide these guarantees by itself.

Future timetable sharing uses an explicit field allowlist that excludes private plans, tasks, notes and credentials. Full backup has a separate entry point. Bound file size, counts, fields and references. Imports must not trigger arbitrary file or network access. Follow [DATA_PROTECTION.md](DATA_PROTECTION.md) for the current file-privacy and recovery limits and any later encryption work. Clearing covers drafts and temporary copies but cannot promise physical disk erasure or recall of shared files.

## Optional connections and backend

No account service, sync queue, billing or ad SDK belongs in the first free edition. Review a personal cloud service only after store launch. External academic systems remain excluded. The historical [school study](UNIVERSITY_INTEGRATION.md) does not authorize source access.

If a service becomes necessary, define permission, ownership checks, session security, retention, deletion and operating cost before enabling it. [SYNC.md](SYNC.md) is conditional research, not an approved backend plan. Keep local editing and recovery usable after disconnect or shutdown. Authentication permission is separate from permission to read or retain timetable data.

## Acceptance and reports

For the local core, test the first-use saving choice, temporary startup with an existing database, explicit saving, mode switches, write failures and recovery. If Web is built, also test browser storage, strict JSON limits, preview/cancel/replace, export contents, hostile text, clear scope, three-language explanations and the actual deployment. Include boundary values, corrupt files and failed replacement with original data intact. Record results against actual code and deployment; do not mark design requirements as passed.

Application security acceptance is still future work. Before wider real-data use, assign a maintainer, upgrade/recovery plan, accurate privacy notice and private reporting route. Never ask for passwords, tokens, full timetables or backups in a public issue. Do not promise response times or school emergency contacts without resources. For a leak, first stop the exposure, protect credentials and assess scope, then follow the agreed response and notification process.
