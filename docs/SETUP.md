# Setup

Scope update (2026-11-13): [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps tasks, deadlines, personal plans, Today and Week central. Build useful direct editors and reliable local saving on Windows, then validate Android without waiting for all macOS/Linux releases. Other platforms need separate acceptance. Screenshot import is optional work only if demonstrated demand justifies it; it has no scheduled release gate. CSV/table import remains deferred. Academic-system access is a deferred, unscheduled extension. Research, application preparation and integration are outside the current delivery milestone. Local release does not wait for school approval. Everyone receives the same free functions. Cloud sync and optional ads remain for review after store launch. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates.

The current learning app runs on desktop. Use Windows for the first working direct-editing, local-data and time-management flow, then validate Android from the shared Flutter codebase. Do not wait for complete macOS/Linux releases before the phone work. iOS depends on a suitable host and test devices; other desktop platforms and Web retain later release checks. These commands do not establish support for every target. Existing Android scaffolding does not prove release readiness. Follow [ROADMAP.md](ROADMAP.md).

## Toolchain

Use **Flutter 3.44.4 stable** with **Dart 3.12.2**, matching the project metadata and CI. The package requires Dart `^3.12.2`.

| Target | Host and required tools |
|--------|-------------------------|
| Windows | Windows; Visual Studio with Desktop development with C++ |
| Android, after the first Windows flow | Windows, macOS or Linux; Android SDK/tooling and a device or emulator, validated by Flutter doctor |
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

Resolve doctor findings for the Windows teaching host first. Android tooling is needed when the next compact-client validation lesson starts; it is not required to run the existing Windows task exercise. Introduce platform setup with that working lesson, not by installing tools during documentation maintenance. Browser and other native release checks remain separate.

## Run this checkout

For the later phone stage, see [iOS development and validation](#ios-development-and-validation). These current run commands do not establish phone support.

Run one command appropriate to your host:

```sh
flutter run -d windows
flutter run -d linux
flutter run -d macos
```

The current learning app starts with two sample tasks. You can add validated titles, toggle completion, delete tasks and undo the latest deletion once. Empty lists show a prompt. Lesson 16 removes the practice counter and its increment/reset controls. Tasks, input and the undo record are in memory; restarting restores the initial samples. Press **r** for hot reload, **R** for hot restart and **q** to quit in the terminal running Flutter. See [learning progress](LEARNING.md) for automated and manual acceptance details.

Do not run `flutter create` for normal setup: the desktop runners and Android scaffolding already exist. Keep platform identities stable once releases have user data. The learner introduces shadcn_ui gradually while preserving working controls. Add phone layout, native file handling and lifecycle checks through focused lessons; share task, plan, date and import-review code. No new feature or alternate core implementation is provided by this documentation change.

When Android validation is scheduled, select its actual device identifier from `flutter devices` and run `flutter run -d <device-id>` with that identifier. A successful launch of the current task exercise does not prove import, storage or phone usability. Test those behaviors only after their learner-written implementations exist.

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

These debug builds are compilation checks, not signed release artifacts or interaction tests. At the Android validation stage, `flutter build apk --debug` adds a compilation check; real-device file handling, Back, process termination, editing and recovery still need separate tests. Test an optional import only when that route is included. Do not claim iOS or other target checks from a Windows build.

## Dependencies and data

Current dependencies are in [pubspec.yaml](../pubspec.yaml). shadcn_ui 0.59.0 is the selected and locked UI library. Lesson 12 introduces its root theme bridge while existing Material controls remain. Introduce drift with local saving; add Riverpod only for a demonstrated state-sharing need. The current skeleton does not yet store courses or personal plans.

No account, cloud credentials or API registration is required for this checkout or the planned offline core. Lesson 12 supplies the shadcn_ui root bridge, and lesson 13 uses Shad input, buttons, checkboxes and a labelled delete action in the task surface. File sharing and full backup/restore are specified in [REDESIGN.md](REDESIGN.md); neither is implemented yet. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) retains reference guidance for a deferred extension; no school interface is approved or needed for setup. Do not add school credentials to source files, fixtures or setup instructions.

[ADR-011](adr/011-optional-sync-service.md) selects Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in for a later personal sync service. This is an accepted design, not a current setup step. Implementation remains subject to review after store launch. Do not install server dependencies, create Google credentials or rent a server to run these lessons. Node used by repository checks is separate from the future API. [CLOUD_SYNC.md](CLOUD_SYNC.md) records the design and JPY 2,500 monthly planning budget; it does not replace the local Flutter toolchain or SQLite plan.

## iOS development and validation

iOS build and release tooling requires **macOS and Xcode**. A MacBook is one option; a compatible Mac mini, iMac or other Mac can provide the host. The project's Flutter SDK, native dependencies and selected Xcode/macOS versions must work together. Windows can remain the main host for shared Dart work and Android development, but it cannot run Apple's Xcode or iOS Simulator locally. No hardware purchase is required by this document. Sources: [Flutter iOS release prerequisites](https://docs.flutter.dev/deployment/ios), [iOS development setup](https://docs.flutter.dev/platform-integration/ios/setup).

Use the Mac's iOS Simulator for early layout and interaction checks. Validate the release candidate on a real iPhone as well: file selection, permissions, safe areas, keyboard, VoiceOver, background/resume, process termination, saved-record recovery and backup transfer. Test image selection, OCR resources and memory only if screenshot import is separately included. A simulator pass or a macOS desktop build does not establish iPhone support.

Local device testing needs the applicable signing setup; App Store distribution needs the Apple Developer Program and store review. Check the current rules when that stage starts. Hardware access, signing work and review waiting time can affect the schedule independently of shared-code completion. Keep credentials outside the repository and preserve the Windows-first, Android-next sequence in [ROADMAP.md](ROADMAP.md).

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Flutter is not recognized | Put the SDK's bin directory on PATH and reopen the terminal |
| Dart version mismatch | Compare `flutter --version` with the pinned version above |
| Desktop compilation fails | Run `flutter doctor -v` and install that host's native build tools |
| Windows says plugin builds require symbolic-link support | Enable Windows Developer Mode, then rerun the build |
| A desktop file dialog fails in a future feature build | Record the OS, desktop session and plugin version; verify on the native host |

The [website](../website/README.md) has a separate static preview workflow. It is a public project site, not the planned Web planner; do not put private course data, backups or credentials in its assets.
