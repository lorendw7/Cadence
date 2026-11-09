# Desktop releases for classmates

Distribution target: GitHub Releases, not app stores. The repository is currently a skeleton; no feature-complete release is declared.

## Before the first trial

- Finish and verify the promised milestone in [ROADMAP.md](ROADMAP.md).
- Decide which native platforms actually passed runtime acceptance and list untested ones explicitly.
- Use a pre-1.0 product version for the first feature release; the existing generated package version is not evidence of readiness.
- Explain known limitations, supported import/backup versions and data-folder location.
- Verify notification capabilities with the actual package identity/format, including denied permission, cancellation and click-through; do not promise closed-process delivery without native tests.
- Provide an example timetable with fictional data and a short setup guide.

## Build and package

Build each target on its own host using the pinned Flutter SDK. Keep debug CI checks separate from release packaging.

| Platform | Initial package direction | Required validation |
|----------|---------------------------|---------------------|
| Windows | Complete release bundle in ZIP; installer can follow | Include DLL/data files, run on a clean machine, check data persistence |
| Linux | Complete release bundle for the tested distribution/architecture | Document runtime libraries; verify file dialogs and desktop session behavior |
| macOS | App bundle in an appropriate archive/DMG | Test on the declared architecture; plan Developer ID signing and notarization for convenient distribution |

These are delivery plans, not currently automated release artifacts. Do not tell users to disable OS security globally. No store listing is planned. Signing/toolchain prerequisites must be checked when packaging is implemented.

## Publish a version

1. Run local checks and inspect hosted build results for the exact commit.
2. Exercise timetable sharing and backup/restore with the release binary.
3. Produce packages and SHA-256 checksums; verify each archive contains the full runtime.
4. Tag the release and describe implemented features, supported systems, limitations and upgrade steps.
5. Link the downloads from the website only when those assets exist.

Publishing binaries/tags is a separate action from ordinary source commits. The existing Pages workflow may publish website changes on main.

## Upgrade and support

Use manual downloads initially. Preserve the user data directory across upgrades; take a database backup before a migration. Do not downgrade an unsupported schema in place.

Provide explicit data export and deletion instructions; uninstalling a desktop application may leave its data behind. Issue reports should include version, OS and steps, with private course/plan content removed. No remote telemetry is needed.

Android remains in the repository for future development; Google Play and other app-store submissions are outside this plan.
