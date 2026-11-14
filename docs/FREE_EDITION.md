# Access and platform policy

Updated: 2026-11-15. [ADR-015](adr/015-android-self-use-first.md) owns the delivery order: Android self-use first, with advertising deferred. It retains the platform and revenue boundaries from [ADR-014](adr/014-desktop-focus-and-mobile-ads.md). This file keeps its original path and section anchors. A later one-time desktop purchase is a hypothesis; no price or paid release is decided. The teaching app keeps tasks in memory. Saving, focus timing, full platform support, ads, sync and store releases remain unimplemented. [LEARNING.md](LEARNING.md) owns evidence.

## Current delivery priority

Build shared local saving and recovery on the Windows development host, then use the first accepted task slice on the maintainer's Android phone. Extend that same code to direct plans, Today and a readable selected-day Week view. Complete native storage, Back, process-loss and backup checks before real personal data. The first planning trial does not wait for a timer. After that trial, add the bounded [Android focus stage](ROADMAP.md#h--android-focus-self-use) before the useful mobile release. A complete Windows release, music player and Steam preparation are not prerequisites. Self-use builds contain no ads, account requirement or backend.

After useful ad-free mobile use and release, review a mobile ad pilot and the separate later desktop focus/purchase experiment. [The bounded desktop scope](DESKTOP_V1.md) remains a later reference and continues to defer Wallpaper Engine, ambient mixing and extra scenes. Steam is a possible channel with its own eligibility gates. iOS, macOS/Linux and Web need separate acceptance. No existing media is discarded or new paid generation authorized by this reorder.

School access, imports and cloud services stay outside the delivery milestone. The former Pages site is offline; its source is retained. Public privacy and developer-site URLs need a separate hosting decision before store and ad verification. This plan adds no code, SDK, account, purchase or store submission.

## Equal access

The maintainer is willing to consider a one-time desktop purchase. The old all-platform-free rule no longer excludes that experiment. A free mobile core with optional later ads is the companion hypothesis. Set the final offer, price, supported platforms and support terms before any sale. Until then, do not advertise a fixed price, a paid release or a permanent free desktop promise.

No subscription, paid priority, paid capacity, paid ad removal or rewarded feature unlock is planned. Ads do not control task limits, saving, focus duration or future cloud quotas. The local runtime needs no Cadence account or network; a store's purchase and installation rules must be stated separately if a paid release is adopted.

## What the first free edition includes

This historical heading is retained for links. [PRODUCT.md](PRODUCT.md#first-useful-local-product) defines the shared planning baseline. The first Android self-use flow covers tasks, saving and recovery, then direct plans and Today/Week as lessons deliver them. The next self-use phase adds one task-linked countdown, pause/resume/end, a manually started break and local session records. It follows native planner acceptance and needs its own learner-owned lifecycle contract; it does not delay the first safe planning trial. Mobile focus needs no desktop purchase. Wallpaper integration remains a deferred platform capability, not a premium gate.

The first trials and mobile core contain no advertising. A later mobile pilot must not remove functions or require ad viewing. No account or school identity is needed for local planning. Ordinary local files and initial JSON exports are unencrypted. Do not advertise an encrypted vault.

## Platform behavior

| Target | Planned role | Advertising policy | Acceptance |
|---|---|---|---|
| Android | First self-use target: safe tasks and planning, then a bounded task-linked countdown | None in self-use or initial core; one later mobile pilot only | Native storage, Back, process termination, touch and recovery; focus lifecycle in its stage; separate store checks before public distribution |
| Windows, including a possible Steam build | Development host now; later bounded planning/focus offer and purchase experiment | None, including sponsor cards and ad SDKs | Clean install, offline storage, recovery, included timer lifecycle, resource measurements and channel eligibility |
| iOS | Later mobile adaptation | Separate later pilot only | Mac/Xcode, real-device lifecycle, files, accessibility, privacy and App Review |
| macOS/Linux | Later desktop adaptation | None | Native storage, packaging, lifecycle and input on each target |
| Web and concept website | Later browser planner; existing concept presentation | None | Private-data separation and browser acceptance for a future planner |

Use one Flutter codebase and platform-specific adapters only when the active lesson needs them. Share data rules, not untested lifecycle assumptions. Keep the journal identity, white background, wine accent and readable three-language controls. Do not shrink the desktop calendar into unreadable phone text.

## Local data across devices

Initial installations have independent local copies. Export/restore transfers a snapshot; it is not merging or automatic sync. Test version compatibility and replacement scope. Do not include ad identifiers, consent state, school credentials or device-specific wallpaper paths in portable planner backups.

[CLOUD_SYNC.md](CLOUD_SYNC.md) remains a later Google identity and Node.js/TypeScript/Fastify/PostgreSQL study. Desktop purchase and mobile ad viewing do not grant extra service capacity or promise permanent cloud availability. A sync pilot needs common quotas, recovery, consent and a sustainable operating budget. Steam Cloud and Steam ownership are not automatic cross-platform planner sync.

Browser-local saving is not a cloud backup. A future Web release needs explicit storage/eviction, export, concurrent-tab and offline/update checks. Preserve the existing concept site; do not create a second marketing website.

## Delivery and testing

[ROADMAP.md](ROADMAP.md) owns the stage gates. Native checks, store approval and purchase evidence are separate. A successful build proves none of the other two. Steam's [advertising guidance](https://partner.steamgames.com/doc/marketing/advertising) describes removing ad elements used on other platforms before shipping on Steam. That supports evaluating a mobile-ad/desktop-no-ad split, but the [non-game categories and onboarding rules](https://partner.steamgames.com/doc/gettingstarted/onboarding) still require review for Cadence.

Budget the [Steam Direct fee](https://partner.steamgames.com/doc/gettingstarted/appfee) before enrollment: USD 100 or local equivalent per app, recoupable only after the specified USD 1,000 adjusted gross revenue threshold. Recheck fees, timing, identity, tax and bank requirements before a real submission. The maintainer handles agreements and payment; this document authorizes neither.

For mobile delivery, recheck [Google Play registration](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en), [personal-account testing](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en), [Apple membership](https://developer.apple.com/programs/enroll/) and [App Review](https://developer.apple.com/app-store/review/guidelines/). Recruit testers only when the working build is ready. No outreach is sent by this plan. Store availability does not establish user demand.

The maintainer can install an Android self-use build on their own device before public store distribution. Use fictional data until native saving, temporary-mode isolation and backup recovery pass. No external trial cohort is required to continue that work. Record the two-week personal-use check as self-use, not independent retention or purchase evidence. A private installation does not satisfy any store-mandated testing or public release requirements.

## Review only after store launch

Mobile advertising follows a useful mobile release and an ad-free usage baseline. Cloud sync has a separate demand, budget and security gate; it is not a prerequisite for ads. Do not add an ad SDK, login screen, quota meter or backend during the current lesson.

Before a pilot, record scope, cost limit, duration, privacy choices and a way to stop it while keeping local use intact. No future advertising income is counted as money already available. [VALIDATION.md](VALIDATION.md#later-service-and-advertising-decision) owns the cost model.

## Advertising by platform

Status: mobile-only future pilot. Desktop sponsorship and Web/PWA advertising candidates are superseded by ADR-014. They are not fallback channels if mobile ads earn little.

| Client | Plan | Gate |
|---|---|---|
| Windows, macOS, Linux and Steam | No ads, ad SDK initialization, ad requests, sponsor cards or ad rewards | Inspect the distributed package and runtime behavior |
| Android | Consider AdMob through the official Flutter plugin after core release | Test IDs, provider eligibility, UMP, disclosures, age/audience rules and real-device acceptance |
| iOS | Separate mobile pilot after native acceptance | Test IDs, UMP, any required tracking permission, privacy declarations and App Review |
| Web, browser-installed PWA and concept website | No advertising | No AdSense integration or sponsor scripts |

The [official Flutter plugin](https://developers.google.com/admob/flutter/quick-start) supports Android and iOS only. Follow [test-ad guidance](https://developers.google.com/admob/flutter/test-ads) and [UMP](https://developers.google.com/admob/flutter/privacy). UMP manages privacy choices and ad-request eligibility; it does not replace store disclosures. Review the actual SDK data collection. A non-personalized ad is not automatically free of consent requirements.

### Placement and data boundaries

Begin with one clearly labelled candidate banner on an optional review screen, separated from controls. The placement is a hypothesis to test for eligibility, usefulness and distraction. Do not show ads during focus, in task rows, Today/Week controls, editors, launch, save/restore, recovery, notifications or widgets. No forced interstitials or rewarded unlocks. Do not solicit ad clicks or reward them.

Denied consent, no-fill, timeout, offline use and loading errors must leave the core usable. Do not make an ad request where the required permission is absent. Reserve layout space to avoid accidental taps; follow the provider's rules for rendering and dismissal. Review [Google Play ads policy](https://support.google.com/googleplay/android-developer/answer/9857753) and [Apple guideline 2.5.18](https://developer.apple.com/app-store/review/guidelines/) for applicable presentation, targeting and reporting requirements.

Do not send private task titles, notes, plans, school identity or focus history to ad providers. Native SDK telemetry still needs review and disclosure; a local database alone does not establish isolation. Ad behavior and consent must stay outside shared planning rules. Mobile background behavior must be tested with and without the SDK. Keep release evidence for supported audiences and regions.

### Review-screen ad proposal

Revised on 2026-11-15 after the maintainer requested better placement, frequency and cost recovery. This remains a later Android pilot design, not implemented behavior or approval for live serving. The first self-use and public core remain ad-free. Keep the existing mobile-only policy and one optional review placement. Compare position first, then a two-request daily ceiling; a ceiling is not an expected impression count.

| Format | Decision for the first pilot | Reason |
|---|---|---|
| One banner within the optional recent-session review | Preferred candidate | A separate bounded slot is easy to identify and can be skipped with the page |
| Native ad styled as a content card | Defer | More layout and accessibility work, and more risk of confusing it with a task or Cadence advice |
| Persistent banner in Today, Tasks or Week | Exclude | It occupies space during the main job and increases accidental-tap risk |
| App-open, interstitial or timer-end ad | Exclude | It interrupts opening, working, saving or resting |
| Rewarded ads or ads that unlock capacity | Exclude | Core functions and access do not depend on ad viewing |

Google supports [inline adaptive banners](https://developers.google.com/admob/flutter/banner/inline-adaptive) in scrolling content and lets developers bound their height. [Native templates](https://developers.google.com/admob/flutter/native/templates) allow custom styling, but that does not establish better revenue or a better experience. The choices above are Cadence design judgments, not comparative performance findings.

Proposed presentation:

- Compare the original end-of-review slot with one slot after a brief, non-interactive record summary and before the detailed history section. Keep the page title, useful context and return controls available first. Use only one position in a given visit, never both. The ad must not separate individual history rows, pin over navigation or cause automatic scrolling. On a small screen, use the end position or omit the ad if useful content and safe spacing cannot fit.
- Show a clear localized Ad label, retain the provider's attribution and AdChoices controls, and keep the creative visually separate from Cadence controls. Do not recolor or crop a banner to imitate the journal design.
- Target a creative height no greater than 100 logical pixels or 20% of the available page height, whichever is smaller. This is a design ceiling, not a provider rule. If no supported size fits, omit the ad. Never scale or clip the creative to force a fit.
- Reserve the bounded region before loading. Do not move controls under a finger when a result arrives. Keep an initial 24 logical pixels between the creative and app controls, then test real sizes, rotation and large text. This spacing is a starting hypothesis, not a guarantee against mistaken taps.
- Put Hide ads today in the review page's own controls, outside and away from the creative. It hides every remaining opportunity that day without loss of functions or a payment. Keep geometry stable for the current visit and remove the unused region on the next visit. Never overlay a custom close control on the provider's clickable content.
- Do not request full-screen expansion, forced sound or video autoplay as a product interaction. Review actual creatives and provider controls; omit the placement if the accepted distraction and accessibility limits cannot be met. A mockup cannot guarantee the contents of an ad network's future response.

Proposed request limits:

1. Use only the accepted Android local-saving build in the pilot. Temporary sessions, first-use setup, self-use builds and other platforms remain ad-free.
2. Request only on an explicit visit to review, after its records are ready and when no editor, recovery flow, timer or break is active. Navigation and planner loading never wait for an ad.
3. Calibrate with at most one request per installation per device-local day. After the position test, compare a ceiling of two requests per day with at least four elapsed hours between them and at most one request per explicit review visit. A second request requires a later voluntary visit, not a timer, refresh or return from an ad click. Count failed requests against the ceiling; do not retry within the visit. Disable dashboard auto-refresh. Rotation, resume and Back do not create a new opportunity. Keep the time gap across midnight and suppress extra requests when clock changes make it uncertain. Three or more daily requests remain outside this candidate.
4. Keep the daily limit and dismissal as local device settings, separate from planner records and portable backups. New storage and lifecycle rules remain learner-owned exercises when the pilot is selected.
5. Refresh UMP consent information on each app launch in an ad-enabled build. Present required forms only at a safe idle point before requesting ads, and provide the required privacy-options entry. Check the SDK's current canRequestAds result; do not substitute a home-made consent flag. If requirements are unresolved, omit ads. See [Google's UMP flow](https://developers.google.com/admob/flutter/privacy).
6. Denied eligibility, offline state, no-fill, timeout or load failure produces no blocking dialog, repeated prompt or retry loop. Keep review content available and discard late callbacks after leaving. Non-personalized advertising still requires the relevant privacy checks.

Do not use task titles, deadlines, notes, location fields or focus history as targeting inputs. Audit SDK traffic and merged permissions separately. No custom demographic or interest profile is needed. Preserve the provider's reporting controls and offer a support route for inappropriate ads. Match audience declarations to the actual intended users; do not claim an adult-only audience merely to avoid child-related rules. Google treats ads as part of the app under its [ads policy](https://support.google.com/googleplay/android-developer/answer/9857753?hl=en).

These limits deliberately reduce advertising opportunities. Use [the bounded pilot model](VALIDATION.md#review-screen-ad-pilot) before estimating income. Do not compensate for weak income by adding interruptions or moving ads into protected screens.

### Improve revenue without adding protected placements

1. Make the optional review useful enough to revisit: readable records, honest interrupted states and a clear path back to the task. Keep its entry discoverable from the existing focus surface. Do not force visits, add a daily ritual or build a new dashboard for ad inventory. A higher review-visit rate is a product hypothesis; moving the ad higher cannot establish it.
2. Fix preventable delivery waste within the accepted screen: correct responsive sizes, verified account/site setup, safe loading, timely disposal and permitted requests. Compare requests, matches and actual impressions. A loaded ad below the visible area is not guaranteed income. Do not keep ads alive in the background to manufacture impressions.
3. Test placement with frequency held constant, then frequency with position held constant. Measure revenue per all active Android users, voluntary return, dismissal, accidental taps and support cost. Click-through rate alone is not success. Preserve an ad-free comparison where feasible; small samples remain inconclusive.
4. When sufficient traffic exists, evaluate a separate, clearly labelled native layout in the same slot, or one additional eligible bidding source. Do not combine these changes with a frequency experiment or assume either increases revenue. [AdMob bidding](https://support.google.com/admob/answer/9234488?hl=en) lets sources compete for a request; extra SDKs, consent disclosures, latency and support can offset any gain. No new integration is selected now.

Google recommends [separation and reserved banner space](https://support.google.com/admob/answer/6275335?hl=en-GB) to reduce accidental taps. It also [discourages placements next to interactive controls](https://support.google.com/admob/answer/6275345). The 24-pixel starting gap above does not establish compliance or usability by itself. Inspect actual native layouts and creatives. Do not place the ad beside the close, return, pause or start action to raise clicks.

Use the same aggregate reporting period, format and audience when comparing publisher eCPM. More revenue per thousand impressions can still produce less total contribution if fill, repeat use or support cost worsens. Keep [full-cost recovery](VALIDATION.md#android-ad-cost-recovery) separate from cash-only break-even.

### Revenue evidence

Count only recorded, eligible mobile impressions and actual publisher income. Desktop, Web and site ad income is zero in this plan. Downloads, desktop DAU and screen-open time are not mobile ad impressions. Count SDK, support, consent work and user loss alongside any receipts. Separate recorded revenue from cash payouts and initial costs from recurring costs.

Desktop purchases are a separate income hypothesis. Count net retained receipts after refunds and applicable channel deductions. Do not count a sale again as ad income or assume it funds unlimited hosting. See [purchase validation](VALIDATION.md#desktop-demand-and-purchase-test).

## Open source

The repository was verified private on 2026-11-15 after the maintainer allowed the Pages site to go offline. Website source remains available for later server deployment. The current [MIT license](../LICENSE) remains unchanged. Existing distributed MIT copies are not retracted by changing repository visibility. Check ownership and third-party notices before any later license decision.

Keep user records, private funding material, correspondence, keys and signing credentials outside public artifacts. Do not publish source, change visibility or migrate the website as a side effect of editing this plan.
