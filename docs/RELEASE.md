# Release plan

Release scope follows [ADR-008](adr/008-small-free-local-product.md): a free Windows local app first. Saved drafts, encryption and extra UI frameworks are not release gates. Keep the selected shadcn_ui direction. Web and sync sections apply only if a school connection needs those capabilities.

Updated: 2026-11-11. [ADR-007](adr/007-general-purpose-local-planner.md) defines Cadence as a general-purpose local time planner. The desktop core works offline without an account. On first use, users choose Save on this device or Temporary use before saved planning data is opened. School adapters are optional; Web and sync are considered only if a selected connection needs them.

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

Consider Web only when a school connection needs it. Specify the actual surface and data route first; it may be a small authorization flow rather than a planner. Do not copy the earlier general browser-client checklist into the local release. If private data reaches a browser, test storage limits, script isolation, HTTPS, cleanup and the chosen login protocol on supported browsers. The concept site must not receive private planner data.

## Optional sync service

Consider synchronization only if the school connection needs ongoing updates. Prefer user-requested read and review. A bidirectional service needs an explicit source of truth, conflict rules, permission, retention, recovery and operating ownership before implementation. Local planning must survive service shutdown. [SYNC.md](SYNC.md) is a study to draw from, not a list of required infrastructure.

## Optional school adapters

Kyushu University or another school may be an optional source adapter. Obtain the necessary authentication, interface, retention and sharing permissions for that source. A user's consent does not replace school authorization, and university authentication does not automatically grant timetable access. See [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

Before enabling an adapter, publish its data flow, operator, read-only scope, consent, retention, disconnect/deletion behavior and failure handling. Trial it with a small voluntary group. Test limits, refresh failures, stale data, local edit preservation and any intermediary costs. Name an operational contact and provide a way to suspend the adapter without breaking independent local records. School demo guidance applies only to that extension, not to the core release.
