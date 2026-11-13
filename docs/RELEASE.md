# Release plan

Scope update (2026-11-13): [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps tasks, deadlines, personal plans, Today and Week central. Build useful direct editors and reliable local saving on Windows, then validate Android without waiting for all macOS/Linux releases. Other platforms need separate acceptance. Screenshot import is optional work only if demonstrated demand justifies it; it has no scheduled release gate. CSV/table import remains deferred. Academic-system access is a deferred, unscheduled extension. Research, application preparation and integration are outside the current delivery milestone. Local release does not wait for school approval. Everyone receives the same free functions. Cloud sync and optional ads remain for review after store launch. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates.

Release scope follows [ADR-013](adr/013-local-planner-and-conditional-academic-access.md): first build the useful local time-management flow on Windows, with direct editing and recovery, then validate compact Android use. Personal plans, dated tasks, Today/Week and available time are core, without course setup. Other platform targets remain under ADR-010. Complete macOS/Linux releases are not a prerequisite for Android validation. Keep the selected shadcn_ui direction. [ADR-011](adr/011-optional-sync-service.md) accepts the future sync design. Cloud sync and optional ads are not gates for the local release; review their implementation after store launch.

Updated: 2026-11-13. The free core needs no account, payment or ad view. First use offers Save on this device or Temporary use. Each platform requires runtime, recovery, accessibility and actual package checks; an uploaded build does not prove readiness. [FREE_EDITION.md](FREE_EDITION.md) defines common and platform behavior.

School permission is not a gate for the independent local release. Academic access is a separate conditional track: feasibility, confirmed permission and interface terms, implementation, then limited real-data acceptance. Application preparation is not approval. Use fictional or properly permitted samples and preserve retention/sharing limits.

The learning app currently supports validated task addition, completion toggling, empty-list feedback, deletion and one-level undo in memory. See the [project README](../README.md) and [learning log](LEARNING.md) for acceptance. Persistence and the full planner are not implemented. shadcn_ui remains the selected UI direction. The website presents concepts; there is no released planning MVP or institutional endorsement.

## Artwork readiness

The [v2 artwork library](../assets/README.md) provides Windows ICO, macOS PNG/ICNS, Linux PNG/SVG and website assets. Windows and macOS launcher references use v2; an earlier Windows debug build passed. Check the installed icon, taskbar/Dock and OS icon cache on each desktop release target. Android/iOS launcher and store assets need their own preparation and validation; desktop artwork does not prove mobile readiness. Linux desktop-entry/icon installation and macOS/Linux runtime acceptance remain pending. Source publication and concept-site deployment are separate from an application release.

## Before the first trial

- Finish the included milestone in [ROADMAP.md](ROADMAP.md), with its actual acceptance checks. Windows is the first working flow; Android validation follows. Do not require a school account or sync for either.
- Test the complete routine: directly enter fixed commitments, inspect Today/Week and available time, add a task deadline, reserve an independent work plan and adjust it without changing the deadline.
- Screenshot import is optional only if needed and does not block release. CSV/table parsing remains deferred until real user exports justify it. Do not advertise an absent import route.
- For any later included import route, test source-to-preview accuracy, uncertainty, duplicates, atomic confirmation and the actual target platform. A school source also needs its separate access and data-use gates.
- Before broader timetable use, test one-occurrence room/time changes, cancellation and restoration, including a move across days. Confirm that the original slot is suppressed and the rest of the series stays intact.
- List the native systems that passed runtime acceptance and those not tested.
- Use a pre-1.0 version for the first feature release. The starter package version does not establish readiness.
- Explain saving choices, known limits, supported import/backup versions and the data-folder location. Verify temporary use does not read or modify an existing saved workspace.
- For included reminders, test the actual package identity/format, denied permission, cancellation and click-through. Do not promise delivery after app exit without native tests.
- Provide fictional work, study and personal examples with a short setup guide. No login or school connection is needed for core planning.
- Include people with different planning routines, languages and accessibility needs in the pilot. Record tested and untested cases.

## Build and package

The first release uses ordinary SQLite and unencrypted JSON backups, clearly labelled. If encrypted storage is later offered, verify its engine and key recovery in the actual package. [DATA_PROTECTION.md](DATA_PROTECTION.md) covers data limits and recovery. Review dependencies and secrets, keep CI permissions small and verify trusted distribution. These remain release requirements; source publication does not prove they passed. Checksums alone cannot prove publisher identity if the archive and checksum can be replaced together.

Use the pinned Flutter SDK and a supported build host for each target. Desktop binaries need their native hosts; Android can be built on the Windows development host, while iOS needs macOS and Xcode. Keep debug CI separate from release packaging. Follow the official [Android](https://docs.flutter.dev/deployment/android) and [iOS](https://docs.flutter.dev/deployment/ios) release guides when those packaging stages start.

| Platform | Initial package | Required checks |
|---|---|---|
| Windows | Complete release bundle in ZIP; installer may follow | Include DLL/data files, run on a clean machine, verify selected saving mode and restart recovery |
| Android | Signed application package for device testing; store bundle when ready | Real-device import/file access, Back, text scaling, offline restart, process termination, corrections, export/restore and store-distributed build |
| iOS | Signed device/TestFlight build when host and devices are available | Files/share destinations, safe areas, VoiceOver, background/resume, restart, recovery and the actual distributed build |
| Linux | Complete bundle for the tested distribution/architecture | Document runtime libraries; verify file dialogs, desktop session behavior and storage |
| macOS | App bundle in an appropriate archive/DMG | Test declared architectures; plan Developer ID signing and notarization for convenient distribution |

These are package plans, not existing automated release artifacts. Recheck current signing/distribution requirements when packaging starts. Never ask users to disable OS security globally. Publish only validated targets and state support gaps. Android scaffolding does not prove readiness, and a Windows test does not validate phone file handling or OCR. Schedule iOS around available hosts and devices; macOS/Linux and Web releases do not block the Windows-to-Android sequence.

## Publish a version

1. Run relevant local checks and inspect hosted build results for the exact commit.
2. Exercise every included saving, sharing, backup and restore path in the release binary. Test first-use choice and offline operation; do not imply optional future features are included.
3. Produce full runtime packages and SHA-256 checksums, then inspect the archives.
4. Tag the release and describe implemented features, supported systems, limitations and upgrade steps.
5. Add website download links only after the files exist.
6. Before wider rollout, confirm onboarding, support ownership, privacy information and a way to withdraw a faulty release. State the approval status and tested interface version of any included external connector.

Publishing binaries/tags is separate from source commits. The existing Pages workflow may publish concept-site changes on main.

## Upgrade and support

Use manual downloads for early desktop packages and the reviewed platform distribution route for mobile trials and releases. Preserve the app's saved data across upgrades. Only open or migrate a saved database in the selected local-saving mode, with a recoverable backup. Temporary use must not open a private old database just to upgrade it. Do not downgrade an unsupported schema in place. A rollback needs a compatible recovery/export path, including occurrence corrections; an older application may not read newer data.

Explain export and deletion on the tested platform. Uninstall may remove app-private mobile data or leave desktop/exported copies behind; neither outcome is a backup policy. Issue reports should include version, OS and reproduction steps with private content removed. Never request passwords, tokens or full backups in a public issue. The local core needs no remote telemetry; local weekly review is not usage tracking.

Name the people responsible for releases, support, private security reports and any external-service liaison. One person may hold several roles, but contacts and duties must be clear. Keep credentials and service ownership secure, with a handover or shutdown plan. Do not promise a service-level agreement without the resources to meet it.

Provide user-facing onboarding and help in Japanese, English and Chinese as those interfaces are released. Repository documentation stays in plain English. Check that someone unfamiliar with GitHub can find the correct download, install it, choose a saving mode and restore their data. State accessibility and platform gaps in release notes.

Keep a public route for ordinary bugs and a private route for sensitive reports. Explain any voluntary diagnostics and how to redact them. Review dependency/security issues before wider release and document how to pause downloads or disable an affected optional connection while preserving local records.

## Optional Web release

The Web planner is a planned free browser-local client. Before publishing it, validate supported browsers, storage limits and clearing, export/restore, tab ownership, offline reload and update behavior. Use HTTPS and define isolation from the concept site. Do not describe browser-local storage as cloud sync. Follow [FREE_EDITION.md](FREE_EDITION.md).

## Optional sync service

The selected future stack is Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in, under [ADR-011](adr/011-optional-sync-service.md). Plan for JPY 2,500 per month as an operating budget, not a provider-enforced cap or a promise of capacity. No service has been deployed. Review implementation and advertising after store launch; keep local use independent of both.

Before a sync pilot, satisfy the [service delivery gates](CLOUD_SYNC.md#capacity-and-delivery-gates): verify account isolation, repeat-safe writes, conflicts, deletions, account switching, restore and continued local use during outages. Test off-host backup recovery and the actual workload on the selected host. Record measured limits and costs; the 1,000 daily-user workload is a load-test target, not verified capacity.

Publish consent, retention, deletion, service limits and support ownership. Have an export and shutdown plan before accepting records. All users receive the same free functions and published quota rules. Ads do not unlock features or extra capacity. No subscription, paid capacity or paid priority is planned. Advertising approval and revenue estimates do not replace these service checks. [SYNC.md](SYNC.md) remains historical; [CLOUD_SYNC.md](CLOUD_SYNC.md) is the current design.

## Optional school adapters

[UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) defines conditional feasibility and application preparation. No adapter, school login or official interface is approved. A connection release would require confirmed scope and permission, an offered read-only interface, reviewed data handling, failure/revocation behavior and a limited pilot. It must not delay the independent local release. Do not use school-password collection or authenticated scraping as a substitute.

## Mobile release evidence

For Android and iOS, follow the current [roadmap](ROADMAP.md) and [platform testing rules](FREE_EDITION.md#delivery-and-testing). Recruit testers when the working build is ready, retain feedback and fixes, prepare truthful metadata and validate the store-distributed build. Do not wait for all desktop platforms to complete before Android validation. The maintainer handles identity, agreements, fees and signing credentials. No recruitment, store purchase or submission occurs as part of this documentation change.
