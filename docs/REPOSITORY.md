# Repository map and maintenance

Updated: 2026-11-11. Keep paths stable so lesson links and platform projects continue to work. [LEARNING.md](LEARNING.md) owns current progress; [CURRICULUM.md](CURRICULUM.md) owns teaching estimates. Older lesson counts are historical.

## Ownership

| Directory | Contents and rules |
|---|---|
| lib/ | Learner-written Flutter entry and task model; no empty future layers |
| test/ | Active coverage run by flutter test |
| [lessons/](../lessons/README.md) | Historical templates; do not overwrite current tests |
| docs/lessons/ | Lesson explanations and acceptance records |
| docs/ and docs/adr/ | Requirements, plans, and decisions; plans are not implemented features |
| [assets/](../assets/README.md) | Artwork sources, exports, searchable catalogue, generated preview sheets, and manifest |
| [website/](../website/README.md) | Three-language static concept site |
| [tools/](../tools/README.md) | Generators and read-only checks |
| windows/, linux/, macos/ | Desktop projects; compilation alone does not prove runtime support |
| android/ | Legacy scaffolding, with no mobile release commitment |
| .github/workflows/ | Repository checks, Flutter checks/builds, and Pages deployment |

## Documentation rules

Use plain English in all documentation, including future updates. Keep product translations separate. The durable rule is in [AGENTS.md](../AGENTS.md).

Use [the documentation index](README.md) to find the main owner of each topic. Write current requirements there and link from other guides. Keep historical ADRs and lesson records clearly labeled. Do not repeat old progress summaries as current facts.

The general-purpose local direction is in [ADR-007](adr/007-general-purpose-local-planner.md). School material remains an optional extension; it does not control the core release.

## Routine checks

```sh
node tools/check_repository.cjs
node tools/check_website.cjs
python tools/check_artwork.py
dart format --output=none --set-exit-if-changed lib test
flutter analyze --no-pub --fatal-infos --fatal-warnings
flutter test --no-pub
```

Run flutter pub get after a fresh checkout or dependency change. Use [SETUP.md](SETUP.md) for native builds. Website source checks do not replace browser layout and interaction checks. Artifact checks do not prove a release package is safe or ready.

Repository checks run in CI. Pages runs them before publishing. CI uses standard Node/Python tools for these checks; image generation is not part of deployment.

## Keep source and generated files distinct

Ignore build caches, local IDE settings, logs, and credentials. Do not delete user files to make a workspace look clean.

Flutter plugin registrants and SVG assets have LF rules in .gitattributes. SVG line endings affect manifest byte counts and copy checks. Preserve those rules across hosts.

Artwork sources, website copies, and launcher exports serve different uses. They are not duplicates to delete. Follow [regeneration](../assets/README.md#regeneration) when changing art. Do not run a generator as unrelated cleanup.

The artwork scripts have separate jobs. `tools/build_artwork.py` defines the vector shapes. `tools/artwork_catalog.py` defines groups and use descriptions and generates the catalogue and manifest. `tools/artwork_previews.cjs` defines the preview sheets; `tools/export_artwork.cjs` runs their export. Edit catalogue styling and interactions in `assets/catalog.css` and `assets/catalog.js`.

Keep the preview source fingerprints in `assets/manifest.json`. Only a new preview export updates them; rebuilding the catalogue preserves them so an old image cannot pass as current. See the [catalogue browser check](../assets/README.md#catalogue-browser-check) for the latest recorded interaction and layout results. Local browser screenshots and Python caches are ignored build outputs.

## Current limits

The application has an in-memory task flow. Restarting loses tasks and the undo record. Persistence, the full planner, backups and reminders remain future work. The selected product UI is shadcn_ui; Web/sync is considered only for school connections that need it. The asset library and concept website do not change those limits.

Record only checks actually run in the change summary. Do not keep a growing list of old validation totals in this document.
