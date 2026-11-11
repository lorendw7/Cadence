# Cadence artwork library

Updated: 2026-11-11. Version 2 supports Cadence's general-purpose local planner and its quiet-journal visual style. The library covers the desktop identity, navigation, editing, data controls, empty states and concept website; some assets prepare for optional later extensions. Browse the [catalogue](catalog.html), [visual overview](preview.png) or [file manifest](manifest.json). Prepared artwork does not mean a planned feature is implemented.

## Visual direction

Keep the original C mark and its rhythm dot. Use muted wine `#7C394B`, warm paper `#F6F5F1`, sage `#6F877C` and ink `#2F3033`. Interface icons use a 24 × 24 grid with 1.75-unit round strokes. Sparse illustrations support guidance and empty states. Keep text, forms and timelines on plain surfaces.

The same visual family serves work, home plans and study. Course and semester symbols remain available for optional course tools; they are not required navigation or setup. The core is local and offline without an account, with an explicit saving choice. Web, sync and school adapters are separate later work under [ADR-007](../docs/adr/007-general-purpose-local-planner.md). No new artwork is needed for this change of audience.

Sage is a decorative accent, not a normal body-text color. Use dark sage `#415A4E` for green text on warm paper. Exact color-pair measurements and usage are in [the design system](../docs/DESIGN.md#color-pairs).

## Contents

| Directory | Contents | Intended use |
|---|---|---|
| `brand/` | Main, paper and dark icons; single-color marks; two lockups; retained original SVGs | Brand, launcher, title bar and website |
| `icons/` | 56 SVGs and one sprite | Navigation, categories, editing, files, settings and feedback |
| `illustrations/` | Ten 320 × 240 SVG states and a 1536 × 1024 editorial PNG | Empty views, completion, search, import, save failure and recovery |
| `patterns/` | Three seamless 32 × 32 SVG tiles | Decorative dots, grid and ruled paper |
| `platform/png/` | 16–1024 px PNG exports | Desktop icons and future Web resources |
| `platform/` | Multi-size ICO and 128–1024 px ICNS | Windows and macOS packaging |
| `social/` | 1200 × 630 SVG and PNG | Link preview, marked in development |

The built-in image generator produced the editorial illustration; its original PNG is preserved. See [the prompt and provenance](ART_PROMPTS.md). All other artwork comes from project-owned SVG source under the repository's MIT license. No third-party icon pack, font pack or university identity was added.

## Find and choose artwork

The [catalogue](catalog.html) groups icons by purpose. Search by name or use, or choose a family. Each card shows its intended use, dimensions, format and file size. Icon samples appear at 20, 24 and 32 px. Platform PNGs are ordered by pixel size. Original brand files remain at their existing paths in a separate retained section. The sprite, ICO and ICNS files also have download cards.

Search and filters run locally without storage. With JavaScript disabled, all cards and downloads remain available. `catalog.css` and `catalog.js` are editable catalogue files; `tools/artwork_catalog.py` supplies the shared descriptions and generates the HTML and manifest. Do not edit the generated HTML by hand.

Choose state illustrations by meaning. `empty-week` contains no sample event. `import-preview` uses a magnifier for pending review, not a success check. `no-review` contains no measured statistics. `all-done` remains separate from an empty task list. These are prepared assets, not implemented application behavior.

The manifest records each asset's role, current or retained status, group, use, dimensions where available, and preview surface. Exports name their source. The [overview](preview.png) and [full contact sheet](preview-library.png) are generated from the library by `tools/artwork_previews.cjs`. They are not browser screenshots. Their input and output hashes in the manifest let the checker detect stale previews. A hash is a fingerprint of a file's bytes.

## Website delivery

The website uses three WebP exports of the editorial master. The composition and aspect ratio stay the same; only size and compression change. The original PNG remains the fallback.

| Export in `website/assets/` | Dimensions | Current bytes | Budget |
|---|---|---:|---:|
| `journal-editorial-480.webp` | 480 × 320 | 8,228 | 20,000 |
| `journal-editorial-960.webp` | 960 × 640 | 32,292 | 60,000 |
| `journal-editorial-1536.webp` | 1536 × 1024 | 99,470 | 160,000 |
| `journal-editorial.png` | 1536 × 1024 | 2,586,082 | Original fallback |

Even the largest WebP transfers about 96% fewer bytes than the PNG. Use `srcset` and `sizes` so the browser can select a suitable export. Keep explicit image dimensions, lazy loading and asynchronous decoding for this below-the-fold decoration. All image requests stay local to the website.

The manifest separates editable artwork from `webExports`, which record source, dimensions, file size and delivery budget. The export script also synchronizes the PNG fallback; do not maintain it by hand.

## Integration status

- The homepage and privacy page use the v2 identity and browser icons. The homepage uses local editorial artwork, feature icons and the sharing card.
- Windows `Runner.rc` references `cadence-v2.ico`; macOS `Contents.json` references v2 PNGs. Original files remain available. System icon caches and installed packages need native platform checks.
- Linux SVG and PNG assets are ready. A later installer must place them in the icon theme and reference them from its desktop entry. No installer was added.
- Flutter page theming remains a learner exercise. No SVG package or unused asset bundle is installed. Native launcher resources do not require a Flutter asset declaration.
- Android is legacy scaffolding, not a product target. The 180 px touch icon supports browser bookmarks, not a mobile application.

## Usage

1. Show interface icons at 20 or 24 px. Give controls at least 40–44 px hit areas. Graphic size and hit area are separate.
2. When visible text names a control, use `alt=""` for its decorative image. Give icon-only buttons localized names. Never use color alone for completion, conflict or errors.
3. Standalone icon SVGs default to ink. Sprite instances use their host `color`; inline copies can override the root color. An external `<img>` does not inherit surrounding text color.
4. Show state illustrations around 160–240 px wide, next to real text and an action. The artwork contains no language-specific text. `all-done` means completion, not an empty list with no tasks.
5. Faint illustration lines are decorative. Do not reuse them as required control boundaries or error indicators. `save-error` still needs a text explanation and retry action.
6. Dark and inverse brand variants do not imply a finished dark theme. Check each actual theme surface separately.
7. Keep the C mark and dot together. Minimum icon size is 16 px; show lockups at least 160 px wide. Preserve aspect ratio and clear space.

## Regeneration

```sh
python tools/build_artwork.py
node tools/export_artwork.cjs
python tools/build_artwork.py
python tools/check_artwork.py
```

The Python tools use only the standard library. Raster export requires `sharp`, available through `NODE_PATH` in a local tool environment; it is not an application dependency. SVG masters produce PNG, ICO and ICNS files and platform copies. The final Python run refreshes the manifest after raster export.

For editorial delivery changes alone, run `node tools/export_artwork.cjs --editorial-only`, then rebuild the manifest and run the checker. This produces WebP derivatives without changing the original PNG or calling an image generator.

For vector, catalogue or preview changes that do not affect launcher or website exports:

```sh
python tools/build_artwork.py
node tools/export_artwork.cjs --previews-only
python tools/build_artwork.py
python tools/check_artwork.py
```

The preview step refreshes both sheets and records the exact source files used. The Python generator preserves that record; it cannot mark an old preview as current. If an exported icon, sharing card or website image changed, use the full regeneration sequence instead.

From the repository root, `python -m http.server 8000 --bind 127.0.0.1` serves the local catalogue at `/assets/catalog.html` and the concept site at `/website/`. Publish only `website/`, as the existing Pages workflow does.

## Validation

`python tools/check_artwork.py` checks SVG parsing and unsafe SVG content, manifest metadata and sizes, catalogue coverage, icon grid and sprite agreement, preview freshness, responsive image dimensions and budgets, platform PNG sizes, macOS mappings and exact deployment copies. It uses no external packages. It does not replace visual review, browser checks or native packaging tests.

The 2026-11-11 library organization pass visually checked both generated sheets and passed the artwork, website and repository checks. Deliberately altered data also confirmed that the checker rejects a changed sprite stroke, a stale preview fingerprint and a missing catalogue card. Those checks did not change the repository files. The browser check below completed on a local server. This artwork work did not run Flutter checks or native platform builds.

### Catalogue browser check

Checked on 2026-11-11 in the in-app browser, using the current generated catalogue and a local HTTP server.

| Check | Result |
|---|---|
| Layout at 320, 390, 640, 641, 768, 900, 901, 1024 and 1440 px | No page-wide horizontal overflow. Controls stayed within the page. Icon samples measured 20, 24 and 32 px. |
| Full catalogue at 320, 390, 641, 901 and 1440 px | All 96 cards were available without horizontal overflow. |
| Search and family filters | Mixed case, extra spaces and combined filters returned matching assets. Empty results showed a clear message. Reset restored all 96 cards and focused search. |
| Numeric search | `13` returned no matches. `10` returned only `cadence-1024`. Category totals no longer enter the search index. |
| Keyboard | Tab reached search, family, reset and the visible download link in order. Hidden cards were skipped. Home/ArrowDown changed the family. Enter reset the filters. The skip link focused the artwork area. |
| Download and focus | The downloaded `empty-week` SVG had the same SHA-256 fingerprint as its source. The download link kept a visible focus outline and a 44 px target height. |
| Browser errors | No warnings or errors were recorded during these checks. |

This check fixed three issues: clipped family labels at medium widths, category totals matching numeric searches, and missing visible spacing in download labels. Search now uses the category name without its total. The filters use two rows from 641 through 900 px and a single column at smaller widths. Download labels retain normal word spacing.

This was a focused catalogue check. JavaScript-disabled browsing, 200% browser zoom, screen-reader announcements and other browser engines were not checked in this pass.

The original v2 review checked SVGs, PNG transparency, ICO frames, ICNS structure, the catalogue and both website pages in Japanese, English and Chinese at 1440 and 390 px. A Windows debug build succeeded. macOS and Linux runtime icon acceptance remains pending. Recheck changed assets and the exact website revision before publication; those earlier results do not validate later edits.
