# Release plan

Updated: 2026-11-11. [ADR-007](adr/007-general-purpose-local-planner.md) defines Cadence as a general-purpose local time planner. The desktop core works offline without an account. On first use, users choose Save on this device or Temporary use before saved planning data is opened. Web, sync and school adapters are optional later extensions.

School permission applies only to school interfaces and data, including any limits on retaining or sharing that data. It does not block a general desktop or Web release. The older blanket Web gate is superseded.

The learning app currently supports validated task addition, completion toggling, empty-list feedback, deletion and one-level undo in memory. See the [project README](../README.md) and [learning log](LEARNING.md) for acceptance. shadcn_ui, persistence and the full planner are not implemented. The website presents concepts; there is no released planning MVP or institutional endorsement.

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

Before releasing protected storage, check the cipher-enabled runtime and key store in the actual package on each supported platform. [DATA_PROTECTION.md](DATA_PROTECTION.md) covers dependency review, secret scanning, minimal CI permissions, reviewed Action SHAs and signing or trusted distribution. These remain release requirements; source publication does not prove they passed. Checksums alone cannot prove publisher identity if the archive and checksum can be replaced together.

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

A concept website is not a planner. If built, the first browser client is local to the browser, without accounts, backend or sync. It offers the same first-use choice between local saving and temporary use. Its initial data scope includes manual schedules/tasks, bounded weekly repeats, strict 1 MiB / 2,000-record JSON preview/replacement/export and clearing. CSV, notifications and single-occurrence course changes remain outside that scope.

Before release, establish supported browsers, saving/clearing behavior, storage failures, JSON recovery, privacy information, operator and deployment costs. Verify HTTPS, script/import handling, reviewed dependencies, a practical CSP and deployment rollback. Check browser-data migrations, asset/cache updates and failed restore. Public assets, URLs, logs and service-worker caches must not contain private schedules, backups, credentials or tokens.

Document when browser storage can be unavailable or cleared. A successful local write does not provide backup or sync. Test temporary startup without opening an old saved workspace, multiple-tab coordination and an explicit recovery path. Use fictional data first, then a limited voluntary pilot after the relevant [quality checks](QUALITY.md). No school permission is needed for a general browser client.

## Optional sync service

Sync is a separate product and operating decision under [SYNC.md](SYNC.md), [ADR-006](adr/006-optional-multi-client-sync.md) and [ADR-007](adr/007-general-purpose-local-planner.md). It does not become a dependency of local planning. Before real-data use, define the identity route, operator, data region, costs, quotas, retention/deletion, backups and incident handling. Explain cloud copies and whether the operator can read records.

Test cross-user isolation, session expiry/revocation, applicable CSRF defenses, device revocation, conflicts, deletion and recovery with two clients. Voluntary logout must resolve pending work through confirmed sync, a permitted private export or explicit discard. Forced session loss must freeze and isolate the old account's queue without replaying it under a new account. Test temporary-session loss notices. Use a limited pilot before wider availability.

## Optional school adapters

Kyushu University or another school may be an optional source adapter. Obtain the necessary authentication, interface, retention and sharing permissions for that source. A user's consent does not replace school authorization, and university authentication does not automatically grant timetable access. See [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

Before enabling an adapter, publish its data flow, operator, read-only scope, consent, retention, disconnect/deletion behavior and failure handling. Trial it with a small voluntary group. Test limits, refresh failures, stale data, local edit preservation and any intermediary costs. Name an operational contact and provide a way to suspend the adapter without breaking independent local records. School demo guidance applies only to that extension, not to the core release.
