# Release — Google Play checklist (v1.0)

Cadence ships **free, no ads, no IAP, offline-only** — which makes the Play process unusually simple. This is the ordered checklist.

## 0. One-time accounts & costs

- [ ] Google Play developer account — **one-time $25**, at <https://play.google.com/console>. Identity verification can take a few days; start early.
- [ ] Note: new personal accounts must run a **closed test with ≥12 testers for 14 days** before production access (Google's 2024+ rule). Plan this into the timeline — recruit friends/classmates as testers.

## 1. App identity

- [ ] `applicationId`: `dev.cadence.app` (set at `flutter create`, verify in `android/app/build.gradle`).
- [ ] App name, adaptive icon (foreground + background layers), splash screen.
- [ ] `versionCode`/`versionName` discipline: bump `versionCode` on every upload.

## 2. Signing

- [ ] Generate an upload keystore (`keytool -genkey …`), keep it **out of git** and backed up — losing it is losing the app.
- [ ] `android/key.properties` (git-ignored) + signing config in Gradle.
- [ ] Enroll in **Play App Signing** (Google holds the release key; you hold the upload key).

## 3. Build

```powershell
flutter build appbundle --release     # .aab is what Play accepts
```

- [ ] R8/minify on, test the release build on a real device (release mode surfaces bugs debug hides).
- [ ] Verify: no INTERNET permission in the merged manifest (`flutter_local_notifications` etc. don't need it — check the merged manifest report). Offline is our promise; prove it at the manifest level.

## 4. Store listing

- [ ] **Default listing language: 日本語** (primary market); add **en-US** and **zh-CN** listings.
- [ ] Title/descriptions written natively in Japanese first (not translated-sounding); mention 時間割・シフト管理・完全オフライン up front — these are the search terms.
- [ ] Screenshots: phone (min 2): 時間割 grid, calendar with red 祝日, shift earnings, focus stats, dark mode; per-locale screenshot text.
- [ ] Feature graphic 1024×500.
- [ ] Category: Productivity. Content rating questionnaire (trivial — no UGC, no ads).

## 5. Privacy & data safety

- [ ] **Privacy policy URL** — required even for zero-collection apps. Served from the project website (`website/privacy.html` → GitHub Pages URL).
- [ ] Data-safety form: **no data collected, no data shared, data stored on device only; export is user-initiated**. This honest form is a marketing asset — it renders as the "No data shared" badge users see.

## 6. Rollout

- [ ] Internal testing → fix crashes → **closed testing (the 12-tester/14-day gate)** → production.
- [ ] Staged rollout (start 20%), watch Play Console vitals (ANR/crash rate).
- [ ] Tag the release in git (`v1.0.0`), GitHub Release with the changelog + the `.apk` for sideloaders (the `.aab` goes to Play).

## Windows distribution (parallel, zero-gatekeeper)

- [ ] `flutter build windows` → zip or MSIX; attach to the GitHub Release. (Microsoft Store is optional later; MSIX + winget manifest is a nice free channel.)
