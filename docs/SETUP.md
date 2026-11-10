# Setup

The product targets Windows, Linux, macOS and Web; only the existing learning desktop checkout is described by current run commands. Their runners do not establish runtime support; test each target on its native host. Android remains legacy scaffolding and has no product/release commitment; Android/iOS development is excluded. Web is a confirmed future development stage, and there is no functional Web planner in this checkout; see [ROADMAP.md](ROADMAP.md).

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

Resolve doctor findings for your chosen desktop target. Android tools are not required for this product's development path.

## Run this checkout

Run one command appropriate to your host:

```sh
flutter run -d windows
flutter run -d linux
flutter run -d macos
```

The current learning app starts with two sample tasks. You can add validated titles, toggle completion, delete tasks and undo the latest deletion once. Empty lists show a prompt; the practice counter has `加1`/`归零` buttons. Tasks, input and the undo record are in memory; restarting restores the initial samples. Press **r** for hot reload, **R** for hot restart and **q** to quit in the terminal running Flutter. See [learning progress](LEARNING.md) for automated and manual acceptance details.

Do not run `flutter create` for normal setup: the desktop runners are already checked in. Keep platform identities stable once releases have user data. The learner will add the Web target and selected shadcn_ui dependency during their implementation stages. No alternate core implementation is provided by the assistant.

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

With Node and Git installed, check repository-local document/website paths and JavaScript syntax using `node tools/check_repository.cjs`. This read-only check does not replace browser or external-link validation.

Native build checks, on the corresponding hosts:

```sh
flutter build windows --debug
flutter build linux --debug
flutter build macos --debug
```

These debug builds are compilation checks, not signed release artifacts or desktop interaction tests.

## Dependencies and data

Current dependencies are in [pubspec.yaml](../pubspec.yaml). shadcn_ui is selected but not added; introduce and lock it in the UI stage after SDK/license checks. Add Riverpod and drift only as their stages begin. The current skeleton does not yet store courses or personal plans.

No account, cloud credentials or API registration is required for this checkout or the planned offline core. File sharing and full backup/restore are specified in [REDESIGN.md](REDESIGN.md); neither is implemented yet. Optional official school integration has a separate permission and interface track in [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). Do not add school credentials to source files, fixtures or setup instructions.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Flutter is not recognized | Put the SDK's bin directory on PATH and reopen the terminal |
| Dart version mismatch | Compare `flutter --version` with the pinned version above |
| Desktop compilation fails | Run `flutter doctor -v` and install that host's native build tools |
| A desktop file dialog fails in a future feature build | Record the OS, desktop session and plugin version; verify on the native host |

The [website](../website/README.md) has a separate static preview workflow. It is a public project site, not the planned Web planner; do not put private course data, backups or credentials in its assets.
