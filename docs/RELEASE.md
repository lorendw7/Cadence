# Releases for Kyushu University students

Updated: 2026-11-10. The target audience is all Kyushu University students, reached through a limited pilot and a gradual wider desktop release. Windows, Linux and macOS are the product targets, distributed initially through GitHub Releases. Android/iOS products are excluded. A Web system is a candidate with a separate feasibility/security decision; the current public website is only a static project site. The repository is currently a skeleton; no feature-complete release or university endorsement is declared.

## Before the first trial

- Finish and verify the promised milestone in [ROADMAP.md](ROADMAP.md).
- Decide which native platforms actually passed runtime acceptance and list untested ones explicitly.
- Use a pre-1.0 product version for the first feature release; the existing generated package version is not evidence of readiness.
- Explain known limitations, supported import/backup versions and data-folder location.
- Verify notification capabilities with the actual package identity/format, including denied permission, cancellation and click-through; do not promise closed-process delivery without native tests.
- Provide an example timetable with fictional data and a short setup guide.
- Recruit pilot students beyond the developer's class and record which campuses, study levels, academic patterns, languages and accessibility needs have been covered.
- Keep manual entry and local import usable without a school login. Clearly mark official integration unavailable unless its approval and acceptance gates have passed; see [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

## Build and package

Build each target on its own host using the pinned Flutter SDK. Keep debug CI checks separate from release packaging.

| Platform | Initial package direction | Required validation |
|----------|---------------------------|---------------------|
| Windows | Complete release bundle in ZIP; installer can follow | Include DLL/data files, run on a clean machine, check data persistence |
| Linux | Complete release bundle for the tested distribution/architecture | Document runtime libraries; verify file dialogs and desktop session behavior |
| macOS | App bundle in an appropriate archive/DMG | Test on the declared architecture; plan Developer ID signing and notarization for convenient distribution |

These are delivery plans, not currently automated release artifacts. Do not tell users to disable OS security globally. Verify current signing and distribution prerequisites when packaging begins. A Windows pilot is useful progress; wider availability also requires representative student acceptance and support readiness. Publish only platforms actually validated and describe unsupported targets plainly. The retained Android runner is legacy scaffolding and has no release plan.

## Publish a version

1. Run local checks and inspect hosted build results for the exact commit.
2. Exercise timetable sharing and backup/restore with the release binary.
3. Produce packages and SHA-256 checksums; verify each archive contains the full runtime.
4. Tag the release and describe implemented features, supported systems, limitations and upgrade steps.
5. Link the downloads from the website only when those assets exist.
6. For wider rollout, confirm onboarding, support ownership, privacy information and a way to withdraw a faulty release. School-related features must identify their actual approval status and last validated interface version.

Publishing binaries/tags is a separate action from ordinary source commits. The existing Pages workflow may publish website changes on main.

## Upgrade and support

Use manual desktop downloads initially. Preserve the user data directory across upgrades; take a database backup before a migration. Do not downgrade an unsupported schema in place. A release rollback must use a compatible recovery/export path rather than assume an older app can open newer data. If a Web system is later accepted, validate browser-data migrations, cache/version behavior and export/recovery before its own rollout.

Provide explicit data export and deletion instructions; uninstalling a desktop application may leave its data behind. Issue reports should include version, OS and steps, with private course/plan content removed. Never request school passwords, session tokens or a full backup in a public issue. No remote telemetry is needed for a pilot or wider release; local weekly review is not usage tracking.

## Responsibilities before wider release

Name the people responsible for releases, user support, privacy/security reports and any school liaison. One person may initially hold several roles, but the responsibilities and contact paths must be explicit. Record release credentials and service ownership securely, with a handover or shutdown plan for graduation, departure or loss of maintainer availability. Do not promise an unsupported service-level agreement.

Provide Japanese and English onboarding and help, alongside the planned Chinese interface/help coverage. Verify that a student unfamiliar with GitHub can find the correct supported download, install it and restore their own data. Accessibility and platform gaps belong in release notes rather than being hidden behind the all-student audience goal.

Keep a public route for ordinary bugs and a private route for sensitive reports. Explain what voluntary diagnostics may contain and how to redact them. Review dependency/security issues before a wider release and document how to pause downloads or disable an affected optional connection while preserving local data.

## Candidate Web system release gate

A Web prototype or a changed project website is not a released planner. A separate decision must select a client-local architecture or justify a backend, identify an operator and establish browser support, persistence/recovery behavior, privacy disclosures and operational costs. See the candidate track in [ROADMAP.md](ROADMAP.md) and security acceptance in [QUALITY.md](QUALITY.md).

Before a student-data pilot, verify HTTPS and hosting configuration, script/import handling, third-party dependencies, content security policy and deployment rollback. Public assets, URLs, logs and service-worker caches must not contain student schedules, backups, credentials or session tokens. Document when browser data can be cleared or unavailable and provide a tested export/recovery path; client-local storage does not itself provide backup or synchronization.

If the selected design has accounts or a backend, additionally test cross-user access isolation, session creation/revocation, CSRF protection where applicable, minimum data retention, deletion, backup access and incident handling. Define request limits, costs and ownership. Use a limited voluntary pilot before general availability; collecting real data requires these gates, not merely a successful deploy.

## Optional school services

Publish a data-flow and privacy explanation before enabling an approved school connection or backend. Include the operator, read-only scope, consent, retention, disconnect/deletion behavior and failure handling. Never imply that a student's consent replaces school authorization or that university authentication automatically grants timetable access.

Roll out an approved connector to a small voluntary cohort first. Check request limits, refresh failures, stale data presentation, local edit preservation, and any backend concurrency/cost limits. Assign an operational contact and a way to suspend the connector without breaking local schedules. Follow the integration design for the exact permission and release gates; account and timetable access remain optional for basic planning.
