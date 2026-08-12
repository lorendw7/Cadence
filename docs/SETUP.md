# Setup

Development machine: **Windows 11**. Targets: **Android** + **Windows desktop**.

## 1. Toolchain

| Tool | Status / install |
|------|------------------|
| Flutter SDK (stable) | `winget install --id=Google.Flutter` or unzip from flutter.dev; ensure `flutter` is on PATH |
| Android Studio | Needed for the Android SDK + emulator: <https://developer.android.com/studio> |
| Visual Studio C++ workload | Needed for the **Windows** target (already present if VS 2026 with C++ tools is installed) |

Then verify — the single most important command in Flutter development:

```powershell
flutter doctor -v
```

Fix everything it flags. Typical first-run tasks:

```powershell
flutter doctor --android-licenses   # accept SDK licenses once
```

In Android Studio: **SDK Manager** → install latest SDK + build-tools; **Device Manager** → create one Pixel emulator.

## 2. Create the project

From the repo root (project name `cadence`, org `dev.cadence` → applicationId `dev.cadence.app`):

```powershell
flutter create --org dev.cadence --project-name cadence --platforms android,windows .
```

`--platforms android,windows` deliberately skips iOS/macOS/Linux/web folders — less noise; they can be added later with another `flutter create`.

Read every generated file top-level once — nothing should be a black box: `pubspec.yaml` (dependencies — Flutter's `package.json`), `lib/main.dart` (entry point), `android/` (Gradle project), `windows/` (CMake runner).

## 3. Run it

```powershell
flutter devices                # list: Windows desktop + your emulator
flutter run -d windows         # desktop
flutter run -d emulator-5554   # Android (or the id shown)
```

While running: press **r** = hot reload (sub-second UI update), **R** = hot restart, **q** = quit. Hot reload is the core dev loop — you will live in it.

## 4. Dependencies (add per milestone, not up front)

Added with `flutter pub add <name>` when the roadmap reaches them:

| Milestone | Packages |
|-----------|----------|
| v0.1 | `flutter_riverpod` · `drift` `drift_flutter` (+ dev: `drift_dev` `build_runner`) · `table_calendar` · `rrule` · `uuid` · `intl` + `flutter_localizations` (SDK) · `flutter_local_notifications` |
| v0.3 | `path_provider` · `file_picker` · `share_plus` |

drift uses code generation — after editing table definitions run:

```powershell
dart run build_runner build --delete-conflicting-outputs
```

## 5. Editor

VS Code + **Flutter** extension (includes Dart). Format on save. The extension gives you: F5 debugging, widget inspector, hot reload on save, ARB/i18n support.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `flutter doctor` complains about Android toolchain | Open Android Studio once, install SDK, re-run `flutter doctor --android-licenses` |
| Windows build fails, missing C++ | VS Installer → add "Desktop development with C++" |
| Emulator slow to boot | Cold-boot once, then keep it snapshotted; or test on a real phone via USB debugging |
| build_runner conflicts | Always run with `--delete-conflicting-outputs` |
