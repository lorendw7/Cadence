# Release plan

Scope update (2026-11-12): [ADR-010](adr/010-open-multiplatform-free-first.md) targets desktop, Web, Android and iOS under the existing MIT license. Finish the free desktop edition first; Web and mobile remain later directions. All users receive the same free functions, with no paid tier or paid capacity. Cloud sync and optional ads are for review after store launch. External academic systems remain excluded. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) take precedence over older platform exclusions and school-gated proposals below.

Release scope follows [ADR-010](adr/010-open-multiplatform-free-first.md): free local planning on desktop, Web, Android and iOS, delivered in stages. Keep the selected shadcn_ui direction. Cloud sync and optional ads are not release gates; review them after store launch.

Updated: 2026-11-12. The free core needs no account, payment or ad view. First use offers Save on this device or Temporary use. Each platform requires runtime, recovery, accessibility and actual package checks; an uploaded build does not prove readiness. [FREE_EDITION.md](FREE_EDITION.md) defines common and platform behavior.

School permission applies only to school interfaces and data, including any limits on retaining or sharing that data. It does not block a general desktop or Web release. The older blanket Web gate is superseded.

The learning app currently supports validated task addition, completion toggling, empty-list feedback, deletion and one-level undo in memory. See the [project README](../README.md) and [learning log](LEARNING.md) for acceptance. Persistence and the full planner are not implemented. shadcn_ui remains the selected UI direction. The website presents concepts; there is no released planning MVP or institutional endorsement.

## Artwork readiness

The [v2 artwork library](../assets/README.md) provides Windows ICO, macOS PNG/ICNS, Linux PNG/SVG and website assets. Windows and macOS launcher references use v2; an earlier Windows debug build passed. Check the installed icon, taskbar/Dock and OS icon cache on each release target. Linux desktop-entry/icon installation and macOS/Linux runtime acceptance remain pending. Source publication and concept-site deployment are separate from an application release.

## Before the first trial

- Finish the included milestone in [ROADMAP.md](ROADMAP.md), with its actual acceptance checks. Do not require optional course, school or sync features for the local core.
- List the native systems that passed runtime acceptance and those not tested.
- Use a pre-1.0 version for the first feature release. The starter package version does not establish readiness.
- Explain saving choices, known limits, supported import/backup versions and the data-folder location. Verify temporary use does not read or modify an existing saved workspace.
- For included reminders, test the actual package identity/format, denied permission, cancellation and click-through. Do not promise delivery after app exit without native tests.
- Provide fictional work, study and personal examples with a short setup guide. No login or school connection is needed for core planning.
- Include people with different planning routines, languages and accessibility needs in the pilot. Record tested and untested cases.

## Build and package

The first release uses ordinary SQLite and unencrypted JSON backups, clearly labelled. If encrypted storage is later offered, verify its engine and key recovery in the actual package. [DATA_PROTECTION.md](DATA_PROTECTION.md) covers data limits and recovery. Review dependencies and secrets, keep CI permissions small and verify trusted distribution. These remain release requirements; source publication does not prove they passed. Checksums alone cannot prove publisher identity if the archive and checksum can be replaced together.

Build each target on its own host using the pinned Flutter SDK. Keep debug CI separate from release packaging.

| Platform | Initial package | Required checks |
|---|---|---|
| Windows | Complete release bundle in ZIP; installer may follow | Include DLL/data files, run on a clean machine, verify selected saving mode and restart recovery |
| Linux | Complete bundle for the tested distribution/architecture | Document runtime libraries; verify file dialogs, desktop session behavior and storage |
| macOS | App bundle in an appropriate archive/DMG | Test declared architectures; plan Developer ID signing and notarization for convenient distribution |

These are package plans, not existing automated release artifacts. Recheck current signing/distribution requirements when packaging starts. Never ask users to disable OS security globally. Publish only validated targets and state support gaps. Android is retained scaffolding with no release plan; mobile apps are out of scope.

## Publish a version

1. Run relevant local checks and inspect hosted build results for the exact commit.
2. Exercise every included saving, sharing, backup and restore path in the release binary. Test first-use choice and offline operation; do not imply optional future features are included.
3. Produce full runtime packages and SHA-256 checksums, then inspect the archives.
4. Tag the release and describe implemented features, supported systems, limitations and upgrade steps.
5. Add website download links only after the files exist.
6. Before wider rollout, confirm onboarding, support ownership, privacy information and a way to withdraw a faulty release. State the approval status and tested interface version of any included external connector.

Publishing binaries/tags is separate from source commits. The existing Pages workflow may publish concept-site changes on main.

## Upgrade and support

Use manual desktop downloads initially. Preserve the user-data directory across upgrades. Only open or migrate a saved database in the selected local-saving mode, with a recoverable backup. Temporary use must not open a private old database just to upgrade it. Do not downgrade an unsupported schema in place. A rollback needs a compatible recovery/export path; an older application may not read newer data.

Explain export and deletion, including that uninstalling may leave user data behind. Issue reports should include version, OS and reproduction steps with private content removed. Never request passwords, tokens or full backups in a public issue. The local core needs no remote telemetry; local weekly review is not usage tracking.

Name the people responsible for releases, support, private security reports and any external-service liaison. One person may hold several roles, but contacts and duties must be clear. Keep credentials and service ownership secure, with a handover or shutdown plan. Do not promise a service-level agreement without the resources to meet it.

Provide user-facing onboarding and help in Japanese, English and Chinese as those interfaces are released. Repository documentation stays in plain English. Check that someone unfamiliar with GitHub can find the correct download, install it, choose a saving mode and restore their data. State accessibility and platform gaps in release notes.

Keep a public route for ordinary bugs and a private route for sensitive reports. Explain any voluntary diagnostics and how to redact them. Review dependency/security issues before wider release and document how to pause downloads or disable an affected optional connection while preserving local records.

## Optional Web release

The Web planner is a planned free browser-local client. Before publishing it, validate supported browsers, storage limits and clearing, export/restore, tab ownership, offline reload and update behavior. Use HTTPS and define isolation from the concept site. Do not describe browser-local storage as cloud sync. Follow [FREE_EDITION.md](FREE_EDITION.md).

## Optional sync service

Review possible free sync and advertising only after launch. All users receive the same free functions; any cloud limits follow the same published rules. No subscription, paid capacity or paid priority is planned. A later service needs a budget, consent, conflict recovery, retention, deletion and an operator. [SYNC.md](SYNC.md) remains historical.

## Optional school adapters

External academic-system adapters are excluded. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) remains historical reference; it is not a release workstream.

For Android and iOS, use the [store release stage](ROADMAP.md#f--free-android-and-ios-store-releases). Recruit testers, retain feedback and fixes, prepare truthful metadata and validate the store-distributed build. The maintainer handles identity, agreements, fees and signing credentials. No store submission occurs as part of this documentation change.