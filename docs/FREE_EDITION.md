# Free edition and platform design

Updated: 2026-11-13. Status: accepted time-management planner with direct editing and phone viewing under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). All platform targets remain under ADR-010. The later service remains selected under [ADR-011](adr/011-optional-sync-service.md). The current teaching app keeps tasks in memory. Saving, import, calendars, full platform support, sync and store releases are not implemented by this document. Current evidence belongs in [LEARNING.md](LEARNING.md).

## Current delivery priority

Build the first useful time-management flow on Windows, using the existing Flutter learning app: directly enter fixed commitments, inspect Today/Week and available time, capture tasks and deadlines, reserve work time, and adjust plans without changing task deadlines. Include reliable local saving, manual corrections and recovery. Any later timetable import is an optional entry path; personal plans and tasks are core and require no course or semester. Then adapt and validate the compact Android flow without waiting for complete macOS/Linux releases. Phone viewing is part of the adopted direction, not a separate research candidate.

Schedule iOS validation when a suitable macOS host and test devices are available. macOS/Linux release validation and Web delivery remain later work. Reuse the shared model and operations, but test each platform's files, storage, lifecycle and input separately. Cloud sync and optional ads remain deferred until review after store launch. This documentation change installs no toolchains, recruits no testers and purchases no service or store account.

## Equal access

Cadence has one free feature set for everyone. There is no paid tier, subscription, paid expansion or paid priority. Any future cloud service uses the same published quota rules for everyone. Ads are the only possible future revenue model in this plan and do not unlock features or extra capacity.

The Instagram comparison describes a possible advertising-funded model only. It does not add social feeds, profiles or engagement-driven features to the planner. No ads or ad SDKs are part of the first local flow.

## What the first free edition includes

The [local feature baseline](PRODUCT.md#first-useful-local-product) is the main feature list. It separates current behavior from planned import, tasks, personal plans, Today, Week, storage and recovery. The [interaction design](REDESIGN.md) defines the first interface choices; [ROADMAP.md](ROADMAP.md) defines release acceptance. Keep this document focused on platform differences and equal access rather than maintaining a second feature checklist.

Direct editors, reliable saving, Today/Week and recovery define the first local release. Screenshot import is unscheduled optional work only if actual demand justifies it. CSV/table import remains deferred until real user-exported files justify it. Neither route is a prerequisite for Windows or Android.

A later academic extension could establish whether an official read-only API or calendar feed is available. It is not current research or application work, and no connection or live updates are promised. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) defines its gates. If an import is later included, publish support only after source, review, correction and saved-result tests pass on that target. Minimum one-occurrence time/room correction, cancellation and restoration remain part of the direct planning flow.

No account, subscription, ad view or network service is required to create or read local tasks and plans. Do not impose commercial record limits on the local edition. Finite import and file limits protect reliability; explain them as technical limits. Ordinary local files and initial JSON exports are unencrypted. Do not advertise an encrypted vault.

## Platform behavior

| Target | Planned interaction | Checks before claiming support |
|---|---|---|
| Windows | First working flow; readable direct editors, Today/Week, task list and keyboard access | Native installation, file access, restart, occurrence correction, upgrade and recovery |
| macOS and Linux | Later native validation of the same desktop flow | Native installation, window resizing, input methods, file access, restart, upgrade and recovery on each OS |
| Web | Same three views; responsive browser navigation; browser-local saving | Storage denial, quota/eviction, reload, concurrent tabs, file import/export, offline reload and update behavior in supported browsers |
| Android | Next validation target; readable next time/room, Today/Week, direct editing and manual corrections | Android Back behavior, process termination, rotation, text scaling, file picker and signed builds on real devices |
| iOS | Compact navigation; readable day view; full-width editor when needed | Safe areas, keyboard, background/resume, file sharing, VoiceOver and signed builds on real devices |

Keep the white background, wine `#7C394B` accent, independent journal identity and shared shadcn_ui theme. Preserve meaning across layouts. Phone screens stack Today's content and offer a labelled day view or bounded week scroll. Do not shrink the desktop calendar until its text becomes unreadable. Completion, editing and deletion must work without hover or gestures alone.

The shared data model and date rules should stay platform-neutral. Introduce platform storage, lifecycle and file behavior only when their lessons need them. Do not build a generic plugin framework or duplicate business rules for each screen size.

## Local data across devices

The first free edition has no automatic cross-device sync. Each installation or browser profile owns its local copy. Manual export and restore transfer a snapshot; they do not merge devices. Restore identifies the target and replacement scope before confirmation.

For the later optional service, [CLOUD_SYNC.md](CLOUD_SYNC.md) selects Google login and a Node.js, TypeScript, Fastify and PostgreSQL backend. Signing in will not upload or merge a workspace automatically. Local saving, temporary use and export remain independent of an account. A backend can serve native clients without requiring a Web planner; this does not remove Web from the longer-term targets.

Browser-local storage is not a cloud backup and can be removed by the browser or the user. Explain this and keep export easy to find. A fresh browser visit requires network access. Claim offline reload only after caching and update behavior pass tests. Do not promise background reminders before platform acceptance.

Plan one active writer per local store. Before Web release, define and test how a second tab becomes read-only or hands over control without overwriting new records. Suspending, refreshing or closing a view must not turn an unconfirmed write into a success message.

Keep the existing GitHub Pages concept website. A future Web planner has a separate application and storage boundary; decide its deployment origin before implementation. Do not host a second marketing website or put private planner records into static site assets.

## Delivery and testing

Follow [ROADMAP.md](ROADMAP.md): implement the first working local flow on Windows, then validate the compact Android experience. Do not wait for all desktop packages before testing the phone flow. Test direct editing, occurrence corrections, local restart and recovery on each supported target. Test an optional import only when that route is included. iOS follows host and device readiness; macOS/Linux and Web have their own later checks. A build is not release acceptance. Use fictional examples and keep lesson progress separate from planning changes.

For Google Play accounts subject to closed testing, the maintainer recruits testers. The official guidance suggests personal networks and target-user communities; it does not promise a supplied tester pool. At the time of review, personal accounts created after November 13, 2023 need at least 12 testers continuously opted in for 14 days before applying for production access. Meeting this minimum does not guarantee approval. Keep feedback, fixes and retest evidence. Recruiting 15-20 volunteers is a suggested buffer, not a platform requirement. Recheck the [official testing rules](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) before scheduling a release. No recruitment messages are authorized by this document.

Review current [Google Play registration requirements](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en), [Apple membership](https://developer.apple.com/programs/enroll/), [App Review requirements](https://developer.apple.com/app-store/review/) and [Flutter iOS release setup](https://docs.flutter.dev/deployment/ios) before store submission. Identity checks, signing access, fees and account agreements need the maintainer's participation. This document does not buy memberships or submit an app.

## Review only after store launch

The later free cloud service now has an accepted technical direction under [ADR-011](adr/011-optional-sync-service.md). Implementation and launch still wait for this review. Advertising remains a separate candidate. Paid expansion, subscriptions, premium features, priority service and paid ad removal are excluded.

| Candidate | Possible value | Decision needed before development |
|---|---|---|
| Free cloud sync with uniform limits | Keep a person's devices up to date | Verify the selected Google/Node.js/PostgreSQL design, JPY 2,500 monthly budget, common quotas, consent, conflicts, retention and recovery before launch |
| Optional advertising | Help fund the free service | Measured net revenue, privacy and consent behavior, platform support, user impact and a way to stop the pilot |

These are not local-release gates. No login screen, quota meter, paywall, ad SDK, billing package or sync backend belongs in the current implementation. Google is the selected identity provider; the hosting purchase, exact service limits and launch date remain undecided. The JPY 2,500 figure is a planning budget, not a provider-enforced cap or a capacity promise. Uniform limits may protect capacity and prevent abuse; users cannot pay or watch ads to gain extra functions or storage. If capacity is insufficient, revise the common limits or admission policy transparently while preserving local use and data export.

Do not promise unlimited or permanently available cloud hosting funded by ads. If ads are later adopted, clearly label them and keep them out of create, save, restore and recovery actions. Do not use private task titles, notes or schedule contents for ad targeting. Ad availability, consent or loading failure must not block core functions. No paid ad-free tier is planned.

Evaluate demand and actual costs before any service starts. Count hosting, database operations, storage, traffic, backups, email, support and maintenance. Advertising revenue must be measured after delivery, not inferred from downloads. Preserve local planning and export if the service is unavailable or ends.

## Advertising by platform

Status: future integration study, reviewed 2026-11-12. Compare Web/PWA advertising with native mobile ads and direct desktop sponsorship before choosing a channel. A progressive web app (PWA) is a website that can offer an installed app experience. A native-only product with optional sync is another operating scenario; removing the Web client does not remove sync costs or create ad revenue. Advertising does not determine the Windows-to-phone development sequence in ADR-013. No advertising integration, provider account, purchased service or revenue is established by this document.

| Client | Candidate integration | Conditions before a pilot |
|---|---|---|
| Web and browser-installed PWA | A manually placed AdSense HTML unit beside the planner, if the site and placement qualify | Review publisher content, site approval, consent, rendering and the private-data boundary. A Flutter canvas is not itself an HTML ad unit. A PWA label does not establish eligibility. |
| Android | AdMob through Google's official Flutter plugin | Use Android test ad IDs during development. Test consent with the User Messaging Platform (UMP), ad-request eligibility, lifecycle, privacy disclosures and store review. |
| iOS | AdMob through Google's official Flutter plugin | Use iOS test ad IDs during development. Review UMP, any applicable tracking permission, privacy declarations, lifecycle and App Review requirements. |
| Native Windows, macOS and Linux | A proposed direct-sponsorship card built with native UI | Secure a sponsor agreement, review the creative and destination, define expiry and reporting, and pass relevant store checks. Budget uncontracted sponsorship revenue as zero. |

The [Google Mobile Ads Flutter plugin](https://developers.google.com/admob/flutter/quick-start) supports Android and iOS, not Web or native desktop. Follow Google's [test-ad guidance](https://developers.google.com/admob/flutter/test-ads) and [UMP guide](https://developers.google.com/admob/flutter/privacy) for a later mobile pilot. UMP manages privacy choices; it does not replace platform disclosures or guarantee approval.

AdSense requires suitable publisher content and an approved site. Empty, low-value or unfinished screens cannot be assumed to earn revenue. A private planner may not qualify. Check [eligibility](https://support.google.com/adsense/answer/9724?hl=en), [content requirements](https://support.google.com/publisherpolicies/answer/11112688?hl=en) and [placement rules](https://support.google.com/adsense/answer/1346295?hl=en). Do not wrap an AdSense page in a native desktop WebView as a workaround; the placement policy restricts software use to supported cases. Do not expose private schedules to an ad crawler to obtain approval.

### Placement and data boundaries

Use one quiet, clearly labelled candidate slot, separated from task controls and the calendar. Do not insert an ad into a task row, editor, save action, restore flow or recovery message. Exclude forced interstitials and rewarded unlocks. Loading failure, no fill, offline use or a declined privacy choice must leave local planning usable. Reserve enough space to avoid accidental clicks and layout jumps, and review the provider's rules before hiding or changing a served ad.

Browser-local storage does not isolate private records from third-party JavaScript loaded into the planner's page. Such a script may run with that page's access even when its file comes from another host. Separate URL paths also do not create a security boundary. Before a Web pilot, review which origin holds the planner and its storage, what each script can read, and whether a provider-approved placement can preserve that boundary. Do not claim isolation from an untested iframe or a different path. If the approved integration cannot protect private records, keep ads out of that surface. See [security](SECURITY.md) and [data protection](DATA_PROTECTION.md).

A direct sponsor card is a separate proposal, not a desktop AdMob substitute. Use reviewed text, images and allowed destination links; do not execute arbitrary sponsor scripts. Explain that the placement is not selected from private task or plan content. Set an expiry date, a removal route and a way to report inappropriate ads. Apple requires ad reporting and targeting information under [App Review guideline 2.5.18](https://developer.apple.com/app-store/review/guidelines/); Microsoft requires clear advertising and compliant content under [Store policy 10.10](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies). Review the actual distribution channel before launch.

### Revenue evidence

Use the [cost and revenue model](VALIDATION.md#later-service-and-advertising-decision) to compare operating costs with recorded impressions and net publisher revenue. Account for eligibility, fill and display losses when estimating impressions from ad opportunities. Count unsupported or unapproved placements as zero. Keep fixed sponsorship contracts separate from impression-based income, and do not count both for the same inventory. Record store fees, annual renewals, devices, testing and maintenance separately from server costs. Personal funding calculations stay outside this public design.

## Open source

Keep Cadence under its existing [MIT license](../LICENSE). Open source does not promise that a hosted service exists or can run without limits. Any Cadence cloud service considered under this plan must remain free and use uniform rules. Future source releases must keep third-party notices and exclude user records, credentials, service secrets and signing keys. No license change is made by this plan.
