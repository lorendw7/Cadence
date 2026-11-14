# Setup

Scope update (2026-11-15): [ADR-015](adr/015-android-self-use-first.md) makes Android the first self-use target, with Windows as the development host. Safe shared saving and recovery precede real personal data. Tasks, Today and selected-day Week come before the later desktop focus package and Steam work. The first Android build is ad-free; mobile ads wait for a useful release and an ad-free usage baseline. Desktop, Web and the concept site stay ad-free. School access, imports and cloud sync remain later work. The repository was verified private on 2026-11-15. The Pages site is offline; website source is retained for later server deployment. MIT remains unchanged. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates. This update implements no feature or platform acceptance.

The current learning app has desktop acceptance records. Keep Windows as the teaching host and validate Android incrementally from the same Flutter codebase. A phone launch with fictional tasks can check setup before saving is ready; it does not permit real-data use or establish a mobile release. iOS depends on a suitable host and test devices; desktop and Web releases retain separate checks. Existing Android scaffolding does not prove release readiness. Follow [ROADMAP.md](ROADMAP.md).

## Toolchain

Use **Flutter 3.44.4 stable** with **Dart 3.12.2**, matching the project metadata and CI. The package requires Dart `^3.12.2`.

| Target | Host and required tools |
|--------|-------------------------|
| Windows | Windows; Visual Studio with Desktop development with C++ |
| Android, first self-use target | Windows, macOS or Linux; Android SDK/tooling and a device or emulator, validated by Flutter doctor; the maintainer's real phone for acceptance |
| iOS, when scheduled | macOS and Xcode; available test devices and signing setup for the selected distribution route |
| Linux | Linux; clang, CMake, Ninja, pkg-config, GTK development libraries and C++ toolchain |
| macOS | macOS; Xcode and its command-line tools; plugin-specific dependencies when introduced |

See the official [Flutter desktop guide](https://docs.flutter.dev/platform-integration/desktop), [Android setup](https://docs.flutter.dev/platform-integration/android/setup) and [iOS release setup](https://docs.flutter.dev/deployment/ios). Keep the pinned project SDK below separate from a documentation site's current SDK examples.

```sh
flutter --version
flutter doctor -v
flutter pub get
flutter devices
```

Resolve doctor findings for the active lesson on the Windows teaching host. Schedule Android tooling and the real-phone launch check early; do not wait for desktop focus or release packaging. Introduce setup with that working lesson, not by installing tools during documentation maintenance. Browser and other native release checks remain separate.

### Android environment observed on 2026-11-15

The maintainer requested computer setup and a debug APK. The command-line Android SDK is installed, Flutter doctor reports no issues, and the Android debug build passed. No Android Studio or emulator was installed. Phone connection and real-device checks are outside this setup session.

| Check | Observed result |
|---|---|
| Flutter and Dart | Flutter 3.44.4 stable and Dart 3.12.2 at `D:\Software\Flutter\flutter`; matches this checkout |
| Windows tools | Flutter doctor accepted the Windows host and Visual Studio desktop tools |
| Android SDK | Installed at `C:\Users\lorendw7\AppData\Local\Android\Sdk`; Flutter uses this SDK |
| SDK tools | Command-line Tools 22.0, Platform-Tools 37.0.1 and Build-Tools 36.0.0 installed |
| SDK platforms | Android API 35 and 36 installed, both revision 2 |
| Native build tools | NDK 28.2.13676358 and CMake 3.22.1 installed |
| Environment | User `ANDROID_HOME` and `ANDROID_SDK_ROOT` point to the SDK. User PATH includes its `platform-tools` and `cmdline-tools\latest\bin` directories. |
| Java | User `JAVA_HOME` and Flutter's `jdk-dir` point to `C:\Program Files\Java\jdk-21.0.10`. Its `bin\java.exe -version` returned successfully. |
| SDK licenses | `sdkmanager --licenses` reported that all SDK package licenses were accepted |
| Flutter doctor | `flutter doctor -v` reported no issues, including the Android toolchain |
| Android debug APK | `flutter build apk --debug` passed; output is `build/app/outputs/flutter-apk/app-debug.apk` |
| APK inspection | Signature verification passed. The package contains ARM64, ARMv7 and x86-64 native libraries. Minimum API is 24; target API is 36. |
| Real-device use | Not attempted; USB authorization, phone layout and native behavior remain unverified |

Earlier diagnostics used the installed Dart executable and Flutter tools snapshot after the PATH wrapper stalled. In this setup session, the existing `flutter.bat --version` completed successfully with SDK cache write access and `JAVA_HOME` set. The snapshot workaround is no longer required for that command. The JDK's own `bin\java.exe -version` also passed. Neither version check alone proves an Android build.

The first APK build took about four minutes in Gradle. It passed with an SDK XML schema warning from a build dependency. Strict Flutter analysis and all 39 tests also passed. These checks do not replace phone testing. The debug APK contains development tools and multiple CPU targets; its size is not a release-size target. Build output is ignored by Git. Gradle's downloaded tools and dependencies use the default user cache on C:. Flutter's SDK cache and this project's build output remain beside their existing locations on D:.

The Android runner already exists. Its Gradle plugin is 9.0.1, its Gradle wrapper is 9.1.0, and its Java/Kotlin source target is 17. The wrapper now uses the `bin` distribution to omit Gradle source code and documentation while keeping the same runtime version. The installed Flutter configuration supplies compile/target API 36, minimum API 24 and NDK 28.2.13676358. API 24 corresponds to Android 7.0, but this minimum is a build setting, not proof of accepted device support. Do not change these versions or upgrade Flutter just to follow a newer documentation example.

The current Dart entry uses shared Flutter widgets and Clipboard services. The resolved dependencies also include Android native code through JNI and path provider. The JNI plugins compile against API 35, so both API 35 and the application's API 36 are installed. JNI also needs NDK and CMake. Reusing Dart code avoids rewriting task rules, but still requires a successful native build. Phone layout, Back, keyboard and lifecycle behavior need separate checks. This setup work adds no application feature or learning result. Saving remains unimplemented.

### Complete the Windows-to-Android tool setup

These steps describe the selected command-line setup. The installed packages and completed configuration are recorded above.

1. Keep the project's pinned Flutter SDK and existing editor. Download the Windows Command-line Tools from the official [Android tools page](https://developer.android.com/studio#command-tools). Extract the package so that `sdkmanager.bat` is under `<sdk>\cmdline-tools\latest\bin`. Android Studio and an emulator are optional for this workflow.
2. Use `sdkmanager --sdk_root=<sdk> --channel=0` to install `platform-tools`, `platforms;android-35`, `platforms;android-36`, `build-tools;36.0.0`, `ndk;28.2.13676358` and `cmake;3.22.1`. Quote each package name in PowerShell because the names contain semicolons. The stable channel avoids preview packages.
3. Set `flutter config --android-sdk <sdk>` and `flutter config --jdk-dir <jdk>`. Keep `JAVA_HOME` aligned with that JDK. Set `ANDROID_HOME` to the SDK. If `ANDROID_SDK_ROOT` is present, keep it equal to `ANDROID_HOME`. Add the SDK's `platform-tools` and `cmdline-tools\latest\bin` directories to user PATH, then open a new terminal.
4. Run `sdkmanager --licenses` to review any outstanding licenses. The current machine has accepted all SDK package licenses. Later package changes may add new terms.
5. Run `flutter doctor -v`, then `flutter build apk --debug` from the repository root. A debug APK checks compilation. It does not prove safe persistence, phone usability or release readiness. Use the later phone steps in [Run this checkout](#run-this-checkout) when real-device validation is scheduled.

The official [sdkmanager guide](https://developer.android.com/tools/sdkmanager) covers package installation and licenses. The [Flutter Android setup guide](https://docs.flutter.dev/platform-integration/android/setup) also covers physical-device authorization. Its current examples can target a newer Flutter version than this checkout. The [Android Gradle plugin 9.0 compatibility table](https://developer.android.com/build/releases/agp-9-0-0-release-notes) specifies Gradle 9.1.0, Build-Tools 36.0.0 and JDK 17 as its minimum Java version. These sources were checked on 2026-11-15. Installed settings above come from this checkout and SDK; Android launch and native acceptance remain pending.

## Run this checkout

Android is the first self-use target. The run commands below are development tools, not claims of phone support. iOS remains later; see [iOS development and validation](#ios-development-and-validation).

Run one command appropriate to your host:

```sh
flutter run -d windows
flutter run -d linux
flutter run -d macos
```

The current learning app starts with two sample tasks. You can add validated titles, toggle completion, delete tasks and undo the latest deletion once. Empty lists show a prompt. Lesson 16 removes the practice counter and its increment/reset controls. Tasks, input and the undo record are in memory; restarting restores the initial samples. Press **r** for hot reload, **R** for hot restart and **q** to quit in the terminal running Flutter. See [learning progress](LEARNING.md) for automated and manual acceptance details.

Do not run `flutter create` for normal setup: the desktop runners and Android scaffolding already exist. Keep platform identities stable once releases have user data. The learner introduces shadcn_ui gradually while preserving working controls. Add phone layout, native file handling and lifecycle checks through focused lessons; share task, plan, date and import-review code. No new feature or alternate core implementation is provided by this documentation change.

For the scheduled Android launch check, enable USB debugging on the maintainer's phone, connect it to the development host, and accept the device's debugging prompt. Select its actual identifier from `flutter devices` and run `flutter run -d <device-id>` with that identifier. Use fictional tasks until local/temporary mode, confirmed writes, restart and backup recovery pass on that phone. A successful launch alone proves none of those behaviors. Test each after its learner-written implementation exists.

Local device development does not require a Play store listing or external testers. It does not establish public-distribution acceptance. Record device model, Android version, build and native checks when the phone lesson runs; store requirements remain in [RELEASE.md](RELEASE.md).

After planning self-use, the [Android focus stage](ROADMAP.md#h--android-focus-self-use) adds native timer checks for lock/background/resume, process termination, clock changes and failed session writes. Test the actual implemented contract; a successful debug build does not establish background timing or closed-app alarms. One countdown and manual break can work without a music player or desktop package. School authorization research, application preparation and login integration are deferred and are not setup requirements.

## Validate

Use the current checkout commands below. Planned iOS acceptance is described separately; it has not run in this Windows session.

```sh
dart format lib test
flutter analyze --fatal-infos --fatal-warnings
flutter test
```

CI checks formatting without changing files:

```sh
dart format --output=none --set-exit-if-changed lib test
```

Run the read-only checks in [tools/README.md](../tools/README.md) for documentation, website translations/markup, and artwork. They require Node, Git, and Python and do not replace browser or remote-link validation.

Native build checks, on the corresponding hosts:

```sh
flutter build windows --debug
flutter build linux --debug
flutter build macos --debug
```

These debug builds are compilation checks, not signed release artifacts or interaction tests. For the Android self-use slice, `flutter build apk --debug` adds a compilation check; real-device file handling, Back, keyboard, process termination, editing and recovery still need separate tests. Check them as their features are introduced. Test an optional import only when that route is included. Do not claim Android, iOS or other target acceptance from a Windows build.

## Dependencies and data

Current dependencies are in [pubspec.yaml](../pubspec.yaml). shadcn_ui 0.59.0 is the selected and locked UI library. Lesson 12 introduces its root theme bridge while existing Material controls remain. Introduce drift with local saving; add Riverpod only for a demonstrated state-sharing need. The current skeleton does not yet store courses or personal plans.

No account, cloud credentials or API registration is required for this checkout or the planned offline core. Lesson 12 supplies the shadcn_ui root bridge, and lesson 13 uses Shad input, buttons, checkboxes and a labelled delete action in the task surface. File sharing and full backup/restore are specified in [REDESIGN.md](REDESIGN.md); neither is implemented yet. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) retains reference guidance for a deferred extension; no school interface is approved or needed for setup. Do not add school credentials to source files, fixtures or setup instructions.

[ADR-011](adr/011-optional-sync-service.md) selects Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in for a later personal sync service. This is an accepted design, not a current setup step. Implementation remains subject to review after store launch. Do not install server dependencies, create Google credentials or rent a server to run these lessons. Node used by repository checks is separate from the future API. [CLOUD_SYNC.md](CLOUD_SYNC.md) records the design and JPY 2,500 monthly planning budget; it does not replace the local Flutter toolchain or SQLite plan.

## iOS development and validation

iOS build and release tooling requires **macOS and Xcode**. A MacBook is one option; a compatible Mac mini, iMac or other Mac can provide the host. The project's Flutter SDK, native dependencies and selected Xcode/macOS versions must work together. Windows can remain the main host for shared Dart work and Android development, but it cannot run Apple's Xcode or iOS Simulator locally. No hardware purchase is required by this document. Sources: [Flutter iOS release prerequisites](https://docs.flutter.dev/deployment/ios), [iOS development setup](https://docs.flutter.dev/platform-integration/ios/setup).

Use the Mac's iOS Simulator for early layout and interaction checks. Validate the release candidate on a real iPhone as well: file selection, permissions, safe areas, keyboard, VoiceOver, background/resume, process termination, saved-record recovery and backup transfer. Test image selection, OCR resources and memory only if screenshot import is separately included. A simulator pass or a macOS desktop build does not establish iPhone support.

Local device testing needs the applicable signing setup; App Store distribution needs the Apple Developer Program and store review. Check the current rules when that stage starts. Hardware access, signing work and review waiting time can affect the schedule independently of shared-code completion. Keep credentials outside the repository. Follow the Android self-use priority and later platform gates in [ROADMAP.md](ROADMAP.md).

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Flutter is not recognized | Put the SDK's bin directory on PATH and reopen the terminal |
| Dart version mismatch | Compare `flutter --version` with the pinned version above |
| Desktop compilation fails | Run `flutter doctor -v` and install that host's native build tools |
| Windows says plugin builds require symbolic-link support | Enable Windows Developer Mode, then rerun the build |
| A desktop file dialog fails in a future feature build | Record the OS, desktop session and plugin version; verify on the native host |

The [website](../website/README.md) has a separate static preview workflow. It is a public project site, not the planned Web planner; do not put private course data, backups or credentials in its assets.
