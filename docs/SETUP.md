# Setup

Scope update (2026-11-12): [ADR-010](adr/010-open-multiplatform-free-first.md) targets desktop, Web, Android and iOS under the existing MIT license. Finish the free desktop edition first; Web and mobile remain later directions. All users receive the same free functions, with no paid tier or paid capacity. Cloud sync and optional ads are for review after store launch. External academic systems remain excluded. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) take precedence over older platform exclusions and school-gated proposals below.

The current learning app runs on desktop. The planned free edition targets Windows, Linux, macOS, Web, Android and iOS. These commands describe the current checkout, not verified support for every future target. Existing Android scaffolding does not prove release readiness. Follow [ROADMAP.md](ROADMAP.md) for browser and mobile stages.

## Toolchain

Use **Flutter 3.44.4 stable** with **Dart 3.12.2**, matching the project metadata and CI. The package requires Dart `^3.12.2`.

| Target | Host and required tools |
|--------|-------------------------|
| Windows | Windows; Visual Studio with Desktop development with C++ |
| Linux | Linux; clang, CMake, Ninja, pkg-config, GTK development libraries and C++ toolchain |
| macOS | macOS; Xcode and its command-line tools; plugin-specific dependencies when introduced |

See the official [Flutter desktop guide](https://docs.flutter.dev/platform-integration/desktop) and platform setup documentation linked there.

```sh
flutter --version
flutter doctor -v
flutter pub get
flutter devices
```

Resolve doctor findings for your chosen desktop target. Android tools are not needed for the current desktop lessons. Add browser and mobile toolchains only in their platform stages.

## Run this checkout

Run one command appropriate to your host:

```sh
flutter run -d windows
flutter run -d linux
flutter run -d macos
```

The current learning app starts with two sample tasks. You can add validated titles, toggle completion, delete tasks and undo the latest deletion once. Empty lists show a prompt. Lesson 16 removes the practice counter and its increment/reset controls. Tasks, input and the undo record are in memory; restarting restores the initial samples. Press **r** for hot reload, **R** for hot restart and **q** to quit in the terminal running Flutter. See [learning progress](LEARNING.md) for automated and manual acceptance details.

Do not run `flutter create` for normal setup: the desktop runners are already checked in. Keep platform identities stable once releases have user data. The learner introduces shadcn_ui gradually while preserving working controls. Add Web and mobile work through their free-edition lessons, not during documentation maintenance. No alternate core implementation is provided by the assistant.

## Validate

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

These debug builds are compilation checks, not signed release artifacts or desktop interaction tests.

## Dependencies and data

Current dependencies are in [pubspec.yaml](../pubspec.yaml). shadcn_ui 0.59.0 is the selected and locked UI library. Lesson 12 introduces its root theme bridge while existing Material controls remain. Introduce drift with local saving; add Riverpod only for a demonstrated state-sharing need. The current skeleton does not yet store courses or personal plans.

No account, cloud credentials or API registration is required for this checkout or the planned offline core. Lesson 12 supplies the shadcn_ui root bridge, and lesson 13 uses Shad input, buttons, checkboxes and a labelled delete action in the task surface. File sharing and full backup/restore are specified in [REDESIGN.md](REDESIGN.md); neither is implemented yet. School integration remains excluded; [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) is historical. Do not add school credentials to source files, fixtures or setup instructions.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Flutter is not recognized | Put the SDK's bin directory on PATH and reopen the terminal |
| Dart version mismatch | Compare `flutter --version` with the pinned version above |
| Desktop compilation fails | Run `flutter doctor -v` and install that host's native build tools |
| Windows says plugin builds require symbolic-link support | Enable Windows Developer Mode, then rerun the build |
| A desktop file dialog fails in a future feature build | Record the OS, desktop session and plugin version; verify on the native host |

The [website](../website/README.md) has a separate static preview workflow. It is a public project site, not the planned Web planner; do not put private course data, backups or credentials in its assets.
