# Release plan

Scope reviewed on 2026-11-18. [ADR-015](adr/015-android-self-use-first.md) sets the current route. Start with shared local saving and recovery, Android planning self-use and bounded Android focus. Release a useful ad-free Android version first. Windows remains the development host and shares design work. The later optional cloud sync phase pairs with the Android review-banner pilot. Steam consideration is paused. Desktop, Web and the concept site stay ad-free. School access and imports remain deferred. The repository became public again on 2026-11-27 under ADR-016, and the concept site returned on GitHub Pages. The license remains MIT. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates.

The safe planning trial comes before focus. Personal plans, dated tasks, Today and Week remain core. Keep the selected shadcn_ui direction and native acceptance for each target. [ADR-011](adr/011-optional-sync-service.md) owns the future sync design. The cloud and ad phase has separate evidence for each system.

Updated: 2026-11-15. Local runtime needs no Cadence account, subscription or ad view. A possible desktop purchase has separate acquisition terms; its price and paid release are undecided. First use offers Save on this device or Temporary use. Each platform requires runtime, recovery, accessibility and actual package checks; an uploaded build does not prove readiness. FREE_EDITION.md defines common and platform behavior.

School permission is not a gate for the independent local release. Academic access is a separate conditional track: feasibility, confirmed permission and interface terms, implementation, then limited real-data acceptance. Application preparation is not approval. Use fictional or properly permitted samples and preserve retention/sharing limits.

The learning app currently supports validated task addition, completion toggling, empty-list feedback, deletion and one-level undo in memory. See the [project README](../README.md) and [learning log](LEARNING.md) for acceptance. Persistence and the full planner are not implemented. shadcn_ui remains the selected UI direction. The website presents concepts; there is no released planning MVP or institutional endorsement.

## Google Play preparation from the current checkout

Official requirements checked on 2026-11-18. The maintainer reported having no Play developer account on 2026-11-15. Private source and public app distribution are separate. The Android release plan preserves the existing MIT license and third-party notices.

Current gaps are concrete: the app is an in-memory exercise; phone recovery is not accepted; android/app/build.gradle.kts still signs release builds with the debug configuration; the application ID is dev.cadence.cadence and needs a final publisher decision; and the concept site's privacy page on GitHub Pages does not yet describe the app. The existing website privacy page describes the concept site, not a future app with an ad SDK. No production-ready signed bundle or approved listing is established.

Follow this order when each gate is ready:

1. Complete A-D and H in [ROADMAP.md](ROADMAP.md), including real-device recovery and the ad-free planning/focus trial. Keep fictional data until safe saving exists. Finish unresolved learning checks in their own lessons.
2. Check tester availability and the publisher's public account details before enrolling. An individual publisher can use a personal account. Google requires an owner aged at least 18, a one-time USD 25 registration fee, identity verification and Android-device verification for personal accounts. Review which legal and contact details Google will display for the chosen account, regions and monetization. Keep identity, payment and agreements outside Git. See [registration](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en) and [account information](https://support.google.com/googleplay/android-developer/answer/13628312?hl=en).
3. Confirm a permanent application ID before the first upload. Prepare an upload key and Play App Signing. Replace debug release signing and keep keys and passwords out of Git. Once signing is configured, use `flutter build appbundle --release` to build the Android App Bundle. Use Play's internal track to test install and upgrade from the package Play delivers. See [Flutter release preparation](https://docs.flutter.dev/deployment/android).
4. Verify target API 36 or higher in the package for a new phone app or update, and recheck the rule before submission. Check 16 KB memory page support in the final package and on a 16 KB device or emulator. On 2026-11-18, `zipalign -c -P 16 4` passed on the existing debug APK, and all five 64-bit shared libraries in that file had load-segment alignment of at least 16 KB. Signed-package checks and native execution remain open. See [target API rules](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en-en) and [16 KB compatibility](https://developer.android.com/guide/practices/page-sizes).
5. Before closed testing, prepare accurate descriptions, support contact, content rating, target audience, ads declaration and Data safety answers for that build. Verify Android system backup and device transfer behavior against the [data protection plan](DATA_PROTECTION.md) before making claims about where records can go. Publish an app-specific privacy policy at a public URL that works without login. Link it from the listing and the app. Hosting remains a separate decision. Reuse the [prepared 512 px listing icon](../assets/platform/google-play-512.png). Prepare the feature graphic and capture real screenshots of Today, Week and task-linked focus with fictional records in the accepted build. See [review preparation](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en), [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en), [Android Auto Backup](https://developer.android.com/identity/data/autobackup) and [listing assets](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en).
6. Personal accounts created after 2023-11-13 need a closed test with at least 12 testers continuously opted in for at least 14 days before applying for production access. Ask testers with the working build to try capture, planning, focus and recovery. Record feedback, fixes and retests for the production application. Recruitment is still open. Private self-use can proceed independently. See [personal-account testing](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en).
7. Apply for production access, complete review and release the accepted ad-free build. Check the delivered package, crash reports, support and upgrade recovery. Keep a route to halt rollout and ship a safe update; never restore an older database blindly after a schema change.

The first public edition is planned as a free download. Google Play does not let a listing that has been offered for free switch to a paid download. A later paid download would need a new app with a new package name and a separate review of delivery and data transfer. The Windows purchase remains the paid offer to study. See [Google Play pricing](https://support.google.com/googleplay/android-developer/answer/6334373?hl=en).

### AdMob after the useful public release

The 2026-11-18 plan schedules first live serving with the optional personal sync phase. Follow the [joint release gate](ROADMAP.md#after-store-launch--review-services-and-income) and validate each system separately before launch.

Use the bounded ad design and pilot evidence. Use official test ads for development and verify consent with Google's User Messaging Platform. Request ads only when its consent check allows them. Audit the actual SDK's collection, permissions and audience requirements. Update privacy, Data safety and the store ads declaration for the ad-enabled version. See [Flutter test ads](https://developers.google.com/admob/flutter/test-ads) and [consent setup](https://developers.google.com/admob/flutter/privacy).

AdMob can be prepared for an unpublished app, but full serving requires the relevant published store listing, linked app and readiness approval. An unpublished local APK is not revenue-ready. A private GitHub repository is different from a private Google Play app; the latter cannot be linked as a public AdMob store app. See [app setup](https://support.google.com/admob/answer/9989980) and [readiness](https://support.google.com/admob/answer/10564477?hl=en).

New AdMob apps require app-ads.txt ownership verification before full serving. Use the real account's authorized-seller snippet at the public developer site's root, link that site in the store listing, and verify the exact crawler URL shown in AdMob. Do not publish a made-up publisher ID. The project Pages site lives under `/Cadence/`, not at a domain root, so it cannot serve this file. See [verification](https://support.google.com/admob/answer/14538460?hl=en-CN) and [site setup](https://support.google.com/admob/answer/9363762?hl=en). Resolve account, payment, verification and regional requirements in the actual console; no income is assumed before approval and measured use.

## Steam preparation for the later Windows package

Paused on 2026-11-18. Keep this section for reference if the maintainer later reopens Steam distribution.

Official requirements checked on 2026-11-18. Valve lists specific non-game categories, including educational software and player tools. General productivity software is absent from the list. Cadence's fit is unconfirmed. Use an accurate description of the planning-to-focus routine for any category check. Existing focus titles demonstrate a possible audience. Valve still decides whether it will accept this package. See [Steam onboarding](https://partner.steamgames.com/doc/gettingstarted/onboarding).

1. Resolve category fit before paying the fee or building store-specific material. Confirm that people return to the silent Windows routine and test one-time purchase interest with a working build. If category fit stays unresolved, keep the Windows package usable on its own. An alternative desktop channel would need its own payment, delivery, refund and support review. See purchase validation.
2. If the maintainer later selects Steam, prepare legal identity, bank and tax details. Steam Direct charges USD 100 or local equivalent per app. Valve credits the fee back after USD 1,000 in adjusted gross revenue. For the first few titles Valve lists a 21-day wait after paying the fee and at least two weeks with a public Coming Soon page. Schedule both conditions and store page and build review. See [Steam Direct schedule](https://partner.steamgames.com/steamdirect) and [Direct fee](https://partner.steamgames.com/doc/gettingstarted/appfee).
3. Package the complete ad-free Windows build and test clean installation, updates, offline use after setup and backup recovery through the actual distribution route. Prepare real screenshots, a short workflow clip and the required store graphics. Use the Content Survey to disclose any shipped AI-assisted art or sound as required. Check distribution rights and retain third-party notices for the selected assets. See [Steam upload](https://partner.steamgames.com/doc/sdk/uploading), [Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey) and [advertising](https://partner.steamgames.com/doc/marketing/advertising).
4. Review the store page, offer and package before release. Set the price only after the trial and a cost review. Plan for Steam's standard software refund offer within two weeks of purchase and under two hours of use. Track retained sales, receipts after store deductions, refunds and support hours. See [refunds](https://store.steampowered.com/steam_refunds/) and [reporting and payments](https://partner.steamgames.com/doc/finance/payments_salesreporting/faq).

## Artwork readiness

The [v2 artwork library](../assets/README.md) provides Windows ICO, macOS PNG/ICNS, Linux PNG/SVG and website assets. Windows and macOS launcher references use v2; an earlier Windows debug build passed. Check the installed icon, taskbar/Dock and OS icon cache on each desktop release target. Android/iOS launcher and store assets need their own preparation and validation; desktop artwork does not prove mobile readiness. Linux desktop-entry/icon installation and macOS/Linux runtime acceptance remain pending. Source publication and concept-site deployment are separate from an application release.

## Before the first trial

- Finish the included slice in [ROADMAP.md](ROADMAP.md), with its actual acceptance checks. Android is the first self-use target; no complete Windows release, desktop focus or Steam gate is required. The core needs no school account, sync or advertising.
- Before using real tasks, verify local/temporary choice, confirmed saves, failed writes, offline restart and backup recovery on the Android device. Earlier launch checks use fictional data.
- As planning slices arrive, test the complete routine: directly enter commitments, inspect Today/Week, add a task deadline, reserve an independent work plan and adjust it without changing the deadline. Do not describe a task-only build as the complete planner.
- In the following Android focus stage, test the task-linked countdown, pause/resume/end, manual break and local session recovery under the accepted mobile lifecycle contract. Timer completion must not complete a task. Do not promise background timing or closed-app alarms without explicit native acceptance.
- Screenshot import is optional only if needed and does not block release. CSV/table parsing remains deferred until real user exports justify it. Do not advertise an absent import route.
- For any later included import route, test source-to-preview accuracy, uncertainty, duplicates, atomic confirmation and the actual target platform. A school source also needs its separate access and data-use gates.
- Before broader timetable use, test one-occurrence room/time changes, cancellation and restoration, including a move across days. Confirm that the original slot is suppressed and the rest of the series stays intact.
- List the native systems that passed runtime acceptance and those not tested.
- Use a pre-1.0 version for the first feature release. The starter package version does not establish readiness.
- Explain saving choices, known limits, supported import/backup versions and the data-folder location. Verify temporary use does not read or modify an existing saved workspace.
- For included reminders, test the actual package identity/format, denied permission, cancellation and click-through. Do not promise delivery after app exit without native tests.
- Provide fictional work, study and personal examples with a short setup guide. No login or school connection is needed for core planning.
- Begin with the maintainer's two-week Android self-use check because no external testers are available. Record defects and tested and untested cases. Include people with different routines, languages and accessibility needs when available. Self-use is not independent demand evidence and does not replace store requirements.

## Build and package

The first release uses ordinary SQLite and unencrypted JSON backups, clearly labelled. If encrypted storage is later offered, verify its engine and key recovery in the actual package. [DATA_PROTECTION.md](DATA_PROTECTION.md) covers data limits and recovery. Review dependencies and secrets, keep CI permissions small and verify trusted distribution. These remain release requirements; source publication does not prove they passed. Checksums alone cannot prove publisher identity if the archive and checksum can be replaced together.

Use the pinned Flutter SDK and a supported build host for each target. Desktop binaries need their native hosts; Android can be built on the Windows development host, while iOS needs macOS and Xcode. Keep debug CI separate from release packaging. Follow the official [Android](https://docs.flutter.dev/deployment/android) and [iOS](https://docs.flutter.dev/deployment/ios) release guides when those packaging stages start.

| Platform | Initial package | Required checks |
|---|---|---|
| Windows | Complete release bundle in ZIP; installer may follow | Include DLL/data files, run on a clean machine, verify selected saving mode and restart recovery |
| Steam on Windows | Same complete desktop package through Steam depots, if accepted | Non-game category approval, truthful offer, clean install/update, offline behavior, recovery, focus lifecycle and no advertising |
| Android | Debug APK for initial owner-device checks; signed distribution package and store bundle when ready | Native file access, Back, text scaling, offline restart, process termination and export/restore; corrections/import only when included; separately validate the distributed build |
| iOS | Signed device/TestFlight build when host and devices are available | Files/share destinations, safe areas, VoiceOver, background/resume, restart, recovery and the actual distributed build |
| Linux | Complete bundle for the tested distribution/architecture | Document runtime libraries; verify file dialogs, desktop session behavior and storage |
| macOS | App bundle in an appropriate archive/DMG | Test declared architectures; plan Developer ID signing and notarization for convenient distribution |

These are package plans, not existing automated release artifacts. Recheck current signing/distribution requirements when packaging starts. Never ask users to disable OS security globally. Publish only validated targets and state support gaps. Android scaffolding does not prove readiness, and a Windows test does not validate phone file handling or OCR. Schedule iOS around available hosts and devices. A public desktop release is not an Android self-use prerequisite.

## Publish a version

1. Run relevant local checks and inspect hosted build results for the exact commit.
2. Exercise every included saving, sharing, backup and restore path in the release binary. Test first-use choice and offline operation; do not imply optional future features are included.
3. Produce full runtime packages and SHA-256 checksums, then inspect the archives.
4. Tag the release and describe implemented features, supported systems, limitations and upgrade steps.
5. Add website download links only after the files exist.
6. Before wider rollout, confirm onboarding, support ownership, privacy information and a way to withdraw a faulty release. State the approval status and tested interface version of any included external connector.

Before a commercial release, decide the exact offer and price, review licensing/notices and update any obsolete permanent-free claims on the existing website in all three languages. Preserve MIT unless separately changed. No paid launch is approved by this plan.

Publishing binaries and tags is separate from source commits. The retained Pages workflow is disabled. Review the [website publication gate and hosting options](../website/README.md#hosting-when-the-app-is-usable) before publishing a new site.

## Upgrade and support

Use manual downloads for early desktop packages and the reviewed platform distribution route for mobile trials and releases. Preserve the app's saved data across upgrades. Only open or migrate a saved database in the selected local-saving mode, with a recoverable backup. Temporary use must not open a private old database just to upgrade it. Do not downgrade an unsupported schema in place. A rollback needs a compatible recovery/export path, including occurrence corrections; an older application may not read newer data.

Explain export and deletion on the tested platform. Uninstall may remove app-private mobile data or leave desktop/exported copies behind; neither outcome is a backup policy. Issue reports should include version, OS and reproduction steps with private content removed. Never request passwords, tokens or full backups in a public issue. The local core needs no remote telemetry; local weekly review is not usage tracking.

Name the people responsible for releases, support, private security reports and any external-service liaison. One person may hold several roles, but contacts and duties must be clear. Keep credentials and service ownership secure, with a handover or shutdown plan. Do not promise a service-level agreement without the resources to meet it.

Provide user-facing onboarding and help in Japanese, English and Chinese as those interfaces are released. Repository documentation stays in plain English. Check that someone unfamiliar with GitHub can find the correct download, install it, choose a saving mode and restore their data. State accessibility and platform gaps in release notes.

Keep a public route for ordinary bugs and a private route for sensitive reports. Explain any voluntary diagnostics and how to redact them. Review dependency/security issues before wider release and document how to pause downloads or disable an affected optional connection while preserving local records.

## Optional Web release

The Web planner is a planned free browser-local client. Before publishing it, validate supported browsers, storage limits and clearing, export/restore, tab ownership, offline reload and update behavior. Use HTTPS and define isolation from the concept site. Do not describe browser-local storage as cloud sync. Follow FREE_EDITION.md.

## Optional sync service

The selected future stack is Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in, under [ADR-011](adr/011-optional-sync-service.md). Plan for JPY 2,500 per month as an operating budget, not a provider-enforced cap or a promise of capacity. No service has been deployed. Review implementation and advertising after store launch; keep local use independent of both.

Before a sync pilot, satisfy the service delivery gates: verify account isolation, repeat-safe writes, conflicts, deletions, account switching, restore and continued local use during outages. Test off-host backup recovery and the actual workload on the selected host. Record measured limits and costs; the 1,000 daily-user workload is a load-test target, not verified capacity.

Publish consent, retention, deletion, service limits and support ownership. Have an export and shutdown plan before accepting records. All users receive the same free functions and published quota rules. Ads do not unlock features or extra capacity. No subscription, paid capacity or paid priority is planned. Advertising approval and revenue estimates do not replace these service checks. SYNC.md remains historical; CLOUD_SYNC.md is the current design.

## Optional school adapters

UNIVERSITY_INTEGRATION.md retains a deferred extension, including feasibility research and application preparation. No adapter, school login or official interface is approved. A connection release would require confirmed scope and permission, an offered read-only interface, reviewed data handling, failure/revocation behavior and a limited pilot. It must not delay the independent local release. Do not use school-password collection or authenticated scraping as a substitute.

## Mobile release evidence

For Android and iOS, follow the current [roadmap](ROADMAP.md) and platform testing rules. Android self-use may begin on the owner's device after native data-safety acceptance, before a store account or external trial cohort. This does not authorize public distribution or establish store approval. For a public release, meet the applicable store testing rules, retain feedback and fixes, prepare truthful metadata and validate the distributed build. The maintainer handles identity, agreements, fees and signing credentials. No recruitment, store purchase or submission occurs as part of this documentation change.
