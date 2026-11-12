# Free edition and platform design

Updated: 2026-11-12. Status: accepted design under [ADR-010](adr/010-open-multiplatform-free-first.md). The current teaching app keeps tasks in memory. Saving, calendars, full platform support and store releases are not implemented by this document. Current evidence belongs in [LEARNING.md](LEARNING.md).

## Current delivery priority

Current priority: finish the free desktop edition. Deliver a complete Windows flow first, then validate macOS and Linux. Web, Android and iOS remain later directions and do not add requirements to the current desktop milestone. Cloud sync and optional ads remain deferred.

The platform table below preserves future design intent. Browser and phone checks are not desktop release gates. No mobile tester recruitment, store account purchase or platform setup starts as part of the current work.

## Equal access

Cadence has one free feature set for everyone. There is no paid tier, subscription, paid expansion or paid priority. Any future cloud service uses the same published quota rules for everyone. Ads are the only possible future revenue model in this plan and do not unlock features or extra capacity.

The Instagram comparison describes a possible advertising-funded model only. It does not add social feeds, profiles or engagement-driven features to the planner. No ads or ad SDKs are part of the current desktop milestone.

## What the first free edition includes

The [desktop feature baseline](PRODUCT.md#first-useful-local-product) is the main feature list. It separates current behavior from planned tasks, personal plans, Today, Week, storage, recovery and access. [Desktop design priorities](REDESIGN.md#desktop-design-priorities) define the first interface choices; [ROADMAP.md](ROADMAP.md) defines release acceptance. Keep this document focused on platform differences and equal access rather than maintaining a second feature checklist.

No account, subscription, ad view or network service is required to create or read local tasks and plans. Do not impose commercial record limits on the local edition. Finite import and file limits protect reliability; explain them as technical limits. Ordinary local files and initial JSON exports are unencrypted. Do not advertise an encrypted vault.

## Platform behavior

| Target | Planned interaction | Checks before claiming support |
|---|---|---|
| Windows, macOS and Linux | Sidebar on wide windows; task list and timeline; keyboard shortcuts | Native installation, window resizing, input methods, file access, restart, upgrade and recovery on each OS |
| Web | Same three views; responsive browser navigation; browser-local saving | Storage denial, quota/eviction, reload, concurrent tabs, file import/export, offline reload and update behavior in supported browsers |
| Android | Compact navigation; quick entry; touch-friendly lists; editor above the keyboard | Android Back behavior, process termination, rotation, text scaling, file picker and signed builds on real devices |
| iOS | Compact navigation; readable day view; full-width editor when needed | Safe areas, keyboard, background/resume, file sharing, VoiceOver and signed builds on real devices |

Keep the white background, wine `#7C394B` accent, independent journal identity and shared shadcn_ui theme. Preserve meaning across layouts. Phone screens stack Today's content and offer a labelled day view or bounded week scroll. Do not shrink the desktop calendar until its text becomes unreadable. Completion, editing and deletion must work without hover or gestures alone.

The shared data model and date rules should stay platform-neutral. Introduce platform storage, lifecycle and file behavior only when their lessons need them. Do not build a generic plugin framework or duplicate business rules for each screen size.

## Local data across devices

The first free edition has no automatic cross-device sync. Each installation or browser profile owns its local copy. Manual export and restore transfer a snapshot; they do not merge devices. Restore identifies the target and replacement scope before confirmation.

Browser-local storage is not a cloud backup and can be removed by the browser or the user. Explain this and keep export easy to find. A fresh browser visit requires network access. Claim offline reload only after caching and update behavior pass tests. Do not promise background reminders before platform acceptance.

Plan one active writer per local store. Before Web release, define and test how a second tab becomes read-only or hands over control without overwriting new records. Suspending, refreshing or closing a view must not turn an unconfirmed write into a success message.

Keep the existing GitHub Pages concept website. A future Web planner has a separate application and storage boundary; decide its deployment origin before implementation. Do not host a second marketing website or put private planner records into static site assets.

## Delivery and testing

Follow [ROADMAP.md](ROADMAP.md): dependable local tasks and plans, private recovery, a free Windows trial, desktop usability fixes and native macOS/Linux validation. Review Web and mobile work after desktop acceptance; do not run those streams in parallel now. A build is not release acceptance. Use fictional examples and keep lesson progress separate from planning changes.

For Google Play accounts subject to closed testing, the maintainer recruits testers. The official guidance suggests personal networks and target-user communities; it does not promise a supplied tester pool. At the time of review, personal accounts created after November 13, 2023 need at least 12 testers continuously opted in for 14 days before applying for production access. Meeting this minimum does not guarantee approval. Keep feedback, fixes and retest evidence. Recruiting 15-20 volunteers is a suggested buffer, not a platform requirement. Recheck the [official testing rules](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) before scheduling a release. No recruitment messages are authorized by this document.

Review current [Google Play registration requirements](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en), [Apple membership](https://developer.apple.com/programs/enroll/), [App Review requirements](https://developer.apple.com/app-store/review/) and [Flutter iOS release setup](https://docs.flutter.dev/deployment/ios) before store submission. Identity checks, signing access, fees and account agreements need the maintainer's participation. This document does not buy memberships or submit an app.

## Review only after store launch

Only free cloud service and possible advertising remain candidates. Paid expansion, subscriptions, premium features, priority service and paid ad removal are excluded.

| Candidate | Possible value | Decision needed before development |
|---|---|---|
| Free cloud sync with uniform limits | Keep a person's devices up to date | Measured cost, the same published quota rules for everyone, consent, conflict recovery, retention and an operating budget |
| Optional advertising | Help fund the free service | Measured net revenue, privacy and consent behavior, platform support, user impact and a way to stop the pilot |

These are not desktop-release gates. No login screen, quota meter, paywall, ad SDK, billing package or sync backend belongs in the current implementation. Service limits, providers and dates remain undecided. Uniform limits may protect capacity and prevent abuse; users cannot pay or watch ads to gain extra functions or storage. If capacity is insufficient, revise the common limits or admission policy transparently while preserving local use and data export.

Do not promise unlimited or permanently available cloud hosting funded by ads. If ads are later adopted, clearly label them and keep them out of create, save, restore and recovery actions. Do not use private task titles, notes or schedule contents for ad targeting. Ad availability, consent or loading failure must not block core functions. No paid ad-free tier is planned.

Evaluate demand and actual costs before any service starts. Count hosting, database operations, storage, traffic, backups, email, support and maintenance. Advertising revenue must be measured after delivery, not inferred from downloads. Preserve local planning and export if the service is unavailable or ends.

## Open source

Keep Cadence under its existing [MIT license](../LICENSE). Open source does not promise that a hosted service exists or can run without limits. Any Cadence cloud service considered under this plan must remain free and use uniform rules. Future source releases must keep third-party notices and exclude user records, credentials, service secrets and signing keys. No license change is made by this plan.
