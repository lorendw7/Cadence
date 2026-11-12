# Free edition and platform design

Updated: 2026-11-12. Status: accepted design under [ADR-010](adr/010-open-multiplatform-free-first.md). The current teaching app keeps tasks in memory. Saving, calendars, full platform support and store releases are not implemented by this document. Current evidence belongs in [LEARNING.md](LEARNING.md).

## What the first free edition includes

| Area | Planned baseline | Acceptance example |
|---|---|---|
| Tasks | Add, edit, complete, reopen and delete; optional deadlines; undo where offered | A failed save retains input and never reports success |
| Personal plans | Timed and all-day plans; optional location and notes; bounded weekly repeats | Today and Week show the same confirmed meeting |
| Navigation | Today, Week and Tasks; secondary Settings | A person can reach every main view with touch or keyboard |
| Data choice | Save on this device or Temporary use; explicit Save and Cancel | Saved records survive restart; temporary use does not open an old database |
| Recovery | Private versioned JSON export, validated restore preview and clear | A rejected import leaves the previous records intact |
| Access | Japanese, English and Chinese; readable text scaling and accessible controls | Long translated titles remain readable and editable |

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

Follow [ROADMAP.md](ROADMAP.md): dependable local tasks and plans, private recovery, free desktop trial, browser/mobile validation, then free store releases. Platform experiments can expose risks early, but a build is not release acceptance. Use fictional data in public examples. Do not reset lesson progress or implement future work as documentation maintenance.

For Google Play accounts subject to closed testing, the maintainer recruits testers. The official guidance suggests personal networks and target-user communities; it does not promise a supplied tester pool. At the time of review, personal accounts created after November 13, 2023 need at least 12 testers continuously opted in for 14 days before applying for production access. Meeting this minimum does not guarantee approval. Keep feedback, fixes and retest evidence. Recruiting 15-20 volunteers is a suggested buffer, not a platform requirement. Recheck the [official testing rules](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) before scheduling a release. No recruitment messages are authorized by this document.

Review current [Google Play registration requirements](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en), [Apple membership](https://developer.apple.com/programs/enroll/), [App Review requirements](https://developer.apple.com/app-store/review/) and [Flutter iOS release setup](https://docs.flutter.dev/deployment/ios) before store submission. Identity checks, signing access, fees and account agreements need the maintainer's participation. This document does not buy memberships or submit an app.

## Review only after store launch

The requested business direction is retained for later assessment:

| Candidate | Possible value | Decision needed before development |
|---|---|---|
| Limited free cloud sync | Keep a person's devices up to date | Measured per-user cost, numeric quotas, consent, conflict recovery, retention and an operating budget |
| Paid expansion | More hosted capacity or longer hosted history | Actual demand, pricing, billing rules, cancellation, downgrade and continued data export |
| Supplementary ads | Help cover a portion of service costs | Real net revenue, privacy and consent behavior, platform support, user impact and an easy way to stop the pilot |

These are not free-edition gates. No login screen, quota meter, paywall, ad SDK, billing package or sync backend belongs in the current implementation. Numeric quotas, prices, providers and launch dates remain undecided. Do not promise unlimited or permanently free cloud hosting funded by ads. Do not interrupt planning with ads or make access to existing data depend on watching them.

When this review begins, use observed retention and service demand. Count hosting, database operations, storage, traffic, backups, email, support, store costs and maintenance. Advertising revenue must be measured after delivery, not inferred from downloads. Keep local planning independent if a later service is unavailable or ends.

## Open source

Keep Cadence under its existing [MIT license](../LICENSE). Open source does not promise free operated infrastructure. Future source releases must keep third-party notices and exclude user records, credentials, billing secrets and signing keys. No license change is made by this plan.
