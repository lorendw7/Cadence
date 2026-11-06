# Setup

The repository contains Windows, Linux, macOS and Android platform runners. Their existence does not establish runtime support; test each target on its native host.

## Toolchain

Use **Flutter 3.44.4 stable** with **Dart 3.12.2**, matching the project metadata and CI. The package requires Dart `^3.12.2`.

| Target | Host and required tools |
|--------|-------------------------|
| Windows | Windows; Visual Studio with Desktop development with C++ |
| Linux | Linux; clang, CMake, Ninja, pkg-config, GTK development libraries and C++ toolchain |
| macOS | macOS; Xcode and its command-line tools; plugin-specific dependencies when introduced |
| Android | Android SDK and emulator/device; Android Studio is the recommended SDK manager |

See the official [Flutter desktop guide](https://docs.flutter.dev/platform-integration/desktop) and platform setup documentation linked there.

```sh
flutter --version
flutter doctor -v
flutter pub get
flutter devices
```

Resolve doctor findings for your chosen target. For Android, review required SDK licenses with `flutter doctor --android-licenses`.

## Run this checkout

Run one command appropriate to your host:

```sh
flutter run -d windows
flutter run -d linux
flutter run -d macos
flutter run -d <android-device-id>
```

The current app shows a `Cadence` title and a `今天` (Today) placeholder. Press **r** for hot reload, **R** for hot restart and **q** to quit.

Do not run `flutter create` for normal setup: the platform runners are already checked in. The existing Android application ID is `dev.cadence.cadence`; keep platform identities stable once releases have user data.

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

Native build checks, on the corresponding hosts:

```sh
flutter build windows --debug
flutter build linux --debug
flutter build macos --debug
```

These debug builds are compilation checks, not signed release artifacts or desktop interaction tests.

## Dependencies and data

Current dependencies are in [pubspec.yaml](../pubspec.yaml). Add Riverpod and drift only as their implementation begins; commit `pubspec.lock` changes. The current skeleton does not yet store courses or personal plans.

No account, cloud credentials or API registration is part of the planned app. File sharing and full backup/restore are specified in [REDESIGN.md](REDESIGN.md); neither is implemented yet.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Flutter is not recognized | Put the SDK's bin directory on PATH and reopen the terminal |
| Dart version mismatch | Compare `flutter --version` with the pinned version above |
| Desktop compilation fails | Run `flutter doctor -v` and install that host's native build tools |
| No Android device | Start an emulator or connect a phone with debugging enabled |
| A desktop file dialog fails in a future feature build | Record the OS, desktop session and plugin version; verify on the native host |

The [website](../website/README.md) has a separate static preview workflow.
