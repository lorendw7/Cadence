# Cadence artwork library

Updated: 2026-11-16. Version 2 supports Cadence's general-purpose local planner and its quiet-journal visual style. The library covers identity, navigation, editing, data controls, compact states, a prepared Google Play listing icon and the concept website. Some assets prepare for later work. Browse the [catalogue](catalog.html), [visual overview](preview.png), [Android artwork handoff](ANDROID_ARTWORK.md), [Tasks design handoff](ui/README.md) or [file manifest](manifest.json). Prepared artwork does not mean a planned feature is implemented.

The [planner study](ui/planner-study.html) extends the local design work to Today, Week and Tasks. Its [review guide](ui/PLANNER_STUDY.md) separates preview interactions from planned application behavior. Each empty page now uses its matching compact illustration.

The [Android daily-use board](ui/android-daily-flow.png) is a separate static design with Today, Tasks and Week using the same fictional records. The [specification](../docs/ANDROID_EXPERIENCE.md) and [editable SVG](ui/android-daily-flow.svg) explain its purpose and limits. It adds three small state illustrations while preserving existing UI studies and translations.

The [focus media pack](focus-pack/README.md) contains 16 synthetic instrumental studies, three cues, editable scores, 16 vector covers and one room illustration. Four Slow Pages additions use sparse phrases and a quieter target level. Use its [local listening catalogue](focus-pack/index.html) and separate [manifest](focus-pack/manifest.json). It is prepared content, not an implemented player or a complete scene library. Human listening and distribution checks remain pending.

The [focus design study](ui/FOCUS_STUDY.md) compares Android, expanded Windows and compact Windows with the same sample. Its separate [study art manifest](ui/focus-art/manifest.json) holds the refined rendering of Quiet Room and two compact timer-record illustrations. The study keeps the existing runtime candidates in their original locations.

## Visual direction

Keep the original C mark and its rhythm dot. Use muted wine `#7C394B`, warm paper `#F6F5F1`, sage `#6F877C` and ink `#2F3033`. Interface icons use a 24 × 24 grid with 1.75-unit round strokes. Sparse illustrations support guidance and empty states. Keep text, forms and timelines on plain surfaces.

For the application, use the approved white canvas `#FFFFFF`, wine accent and neutral rules. Paper and sage remain editorial artwork colors. The catalogue shows these palettes separately and marks seven sources for the current Tasks design study. The [study](ui/task-study.html) compares wide and compact layouts, four sample states and three sample languages. It is local design documentation, not a second hosted website or implemented Flutter UI.

The same visual family serves work, home plans and study. Course and semester symbols remain available for optional course tools; they are not required navigation or setup. The planned core is local and offline without an account, with an explicit saving choice. The current learning app keeps tasks in memory. [ADR-015](../docs/adr/015-android-self-use-first.md) makes Android self-use the first target, with Windows as the development host. Other platforms need separate acceptance. Sync and optional mobile ads remain later work. School access remains a deferred extension.

Sage is a decorative accent, not a normal body-text color. Use dark sage `#415A4E` for green text on warm paper. White-canvas color-pair measurements and usage are in [the design system](../docs/DESIGN.md#color-pairs).

## Contents

| Directory | Contents | Intended use |
|---|---|---|
| `brand/` | Main, paper and dark icons; single-color marks; two lockups; retained original SVGs | Brand, launcher, title bar and website |
| `icons/` | 67 SVGs and one sprite | Navigation, planning, editing, files, feedback and later countdown controls |
| `illustrations/` | Ten 320 × 240 SVG states, thirteen 96 × 72 compact states and a 1536 × 1024 editorial PNG | Empty views, completion, storage choices, review, drafts, failures and recovery |
| `ui/` | Editable local HTML/CSS/JavaScript studies, a 1360 × 1440 Android SVG/PNG board and English handoffs | Historical Tasks exercise and future three-page planner; no app implementation |
| `patterns/` | Three seamless 32 × 32 SVG tiles | Decorative dots, grid and ruled paper |
| `platform/png/` | 16–1024 px PNG exports | Desktop icons and future Web resources |
| `platform/` | Multi-size ICO, 128–1024 px ICNS and a separate 512 px store PNG | Windows/macOS packaging and prepared Google Play listing artwork |
| `social/` | 1200 × 630 SVG and PNG | Link preview, marked in development |
| `focus-pack/` | Music sources, local audio exports, covers, one room illustration and a separate manifest | Prepared desktop focus media; not integrated into Flutter |

The built-in image generator produced the editorial illustration; its original PNG is preserved. See [the prompt and provenance](ART_PROMPTS.md). The separate focus room has its own [provenance record](focus-pack/art-provenance.json). Other visual artwork comes from project-owned SVG source under the repository's MIT license. No third-party icon pack, font pack or university identity was added. Audio sources and review limits are documented within the focus pack.

## Find and choose artwork

The [catalogue](catalog.html) groups icons by purpose. Search by name or use, or choose a family. Each card shows its intended use, dimensions, format and file size. Icon samples appear at 20, 24 and 32 px. Platform PNGs are ordered by pixel size. Original brand files remain at their existing paths in a separate retained section. The sprite, ICO and ICNS files also have download cards.

The Tasks starter links clear active filters and reveal the chosen source. The matching card carries an application-use note. These links reuse original paths rather than copying artwork into another bundle. Icons preview on white; inverse marks keep their dark preview. The small empty-list note uses the white-canvas palette and remains separate from the larger paper illustration.

Search and filters run locally without storage. With JavaScript disabled, all cards and downloads remain available. `catalog.css` and `catalog.js` are editable catalogue files; `tools/artwork_catalog.py` supplies the shared descriptions and generates the HTML and manifest. Do not edit the generated HTML by hand.

Choose state illustrations by meaning. `empty-week` contains no sample event. `import-preview` uses a magnifier for pending review, not a success check. `no-review` contains no measured statistics. `all-done` remains separate from an empty task list. These are prepared assets, not implemented application behavior.

The manifest records each asset's role, current or retained status, group, use, dimensions where available, and preview surface. `palette` describes editorial colors; `appPalette` records application colors. Selected sources include `appUse` guidance. Exports name their source. The [overview](preview.png), [full contact sheet](preview-library.png) and [Android contact sheet](preview-android.png) are generated from the library by `tools/artwork_previews.cjs`. They are not browser screenshots. Their input and output hashes in the manifest let the checker detect stale previews. A hash is a fingerprint of a file's bytes.

The Android daily-use SVG and PNG are also catalogued. The export step renders the SVG and records the PNG fingerprint alongside the three contact sheets. The checker covers both study files, so a changed drawing cannot silently retain an old PNG preview.

## Website delivery

The website uses three WebP exports of the editorial master. The composition and aspect ratio stay the same; only size and compression change. The original PNG remains the fallback.

| Export in `website/assets/` | Dimensions | Current bytes | Budget |
|---|---|---:|---:|
| `journal-editorial-480.webp` | 480 × 320 | 8,228 | 20,000 |
| `journal-editorial-960.webp` | 960 × 640 | 32,292 | 60,000 |
| `journal-editorial-1536.webp` | 1536 × 1024 | 99,470 | 160,000 |
| `journal-editorial.png` | 1536 × 1024 | 2,586,082 | Original fallback |

Even the largest WebP transfers about 96% fewer bytes than the PNG. Use `srcset` and `sizes` so the browser can select a suitable export. Keep explicit image dimensions and asynchronous decoding. The website places this color image below the interactive product preview and loads it lazily. All image requests stay local to the website.

The manifest separates editable artwork from `webExports`, which record source, dimensions, file size and delivery budget. The export script also synchronizes the PNG fallback; do not maintain it by hand.

## Integration status

- The homepage and privacy page use the v2 identity and browser icons. The homepage uses local editorial artwork, feature icons and the sharing card.
- Windows `Runner.rc` references `cadence-v2.ico`; macOS `Contents.json` references v2 PNGs. Original files remain available. System icon caches and installed packages need native platform checks.
- Linux SVG and PNG assets are ready. A later installer must place them in the icon theme and reference them from its desktop entry. No installer was added.
- The learner owns Flutter page theming and asset integration. The current UI uses Material and shadcn_ui controls; this artwork pass adds no Flutter SVG package or asset bundle. Native launcher resources do not require a Flutter asset declaration.
- Android scaffolding is not a verified mobile release. Native phone checks accompany the shared learning slices under ADR-015. The prepared store icon does not change Android launcher resources. The 180 px touch icon supports browser bookmarks, not a mobile application.

## Compact states and store artwork

The [Today](illustrations/empty-today-compact.svg), [Week](illustrations/empty-week-compact.svg), [Tasks](illustrations/empty-tasks-compact.svg) and [save failure](illustrations/save-error-compact.svg) states share a 96 × 72 grid, 1.75-unit strokes and white-canvas colors. Show them at their intended size next to real text. The empty week has seven blank columns. The clock is a symbol, not a live time. The failure state needs a message and retry action; it does not imply lost data or working persistence. The [copy icon](icons/copy.svg) uses the existing 24-unit grid and is included in the sprite. Flutter still uses its learner-written Material copy button.

The [store SVG](brand/cadence-icon-store.svg) preserves the C mark and rhythm dot on a full wine square. Its [512 px PNG](platform/google-play-512.png) has 8-bit RGBA channels and an sRGB profile. It has no baked-in corner mask or outer shadow. This follows the [Google Play icon specification](https://developer.android.com/distribute/google-play/resources/icon-design-specifications), checked on 2026-11-13. This is prepared listing artwork, not an adaptive launcher icon, app screenshot or proof of store acceptance. Existing desktop and website icon files keep their stable paths and geometry.

## Usage

1. Show interface icons at 20 or 24 px. Use at least 48 x 48 logical-pixel control targets on Android. Graphic size and hit area are separate.
2. When visible text names a control, use `alt=""` for its decorative image. Give icon-only buttons localized names. Never use color alone for completion, conflict or errors.
3. Standalone icon SVGs default to ink. Sprite instances use their host `color`; inline copies can override the root color. An external `<img>` does not inherit surrounding text color.
4. Show large state illustrations around 160–240 px wide, next to real text and an action. Use `empty-tasks-compact` at 96 × 72 px for the white task surface. The artwork contains no language-specific text. `all-done` means completion, not an empty list with no tasks.
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

When the store icon changes, use `node tools/export_artwork.cjs --store-only` in place of the previews-only command. This exports the store PNG, all three preview sheets and the Android daily-use PNG. Run the Python generator before and after it. Full regeneration also includes the store icon.

The preview step refreshes all three sheets and the daily-use PNG, then records the exact source files used. The Python generator preserves that record; it cannot mark an old preview as current. The daily-use drawing is authored in `tools/android_design_art.py` and called by the main builder. If an exported icon, sharing card or website image changed, use the full regeneration sequence instead.

From the repository root, `python -m http.server 8000 --bind 127.0.0.1` serves the local catalogue at `/assets/catalog.html` and the concept site at `/website/`. The retained Pages workflow targets only `website/` and remains disabled while the site is offline.

## Validation

`python tools/check_artwork.py` checks SVG parsing and unsafe SVG content, manifest metadata and sizes, catalogue coverage, icon grid and sprite agreement, preview freshness, responsive image dimensions and budgets, platform PNG sizes, macOS mappings and exact deployment copies. It uses no external packages. It does not replace visual review, browser checks or native packaging tests.

The 2026-11-11 library organization pass visually checked both generated sheets and passed the artwork, website and repository checks. Deliberately altered data also confirmed that the checker rejects a changed sprite stroke, a stale preview fingerprint and a missing catalogue card. Those checks did not change the repository files. The browser check below completed on a local server. This artwork work did not run Flutter checks or native platform builds.

### Catalogue browser check

The 2026-11-12 design handoff pass checked all 97 cards at 320, 390, 640, 641, 900, 901 and 1440 px with no page-wide horizontal overflow. Combined search and family filtering found the compact empty state; an unmatched query showed zero results. Starter shortcuts reset both filters, revealed the source and focused its download link. A focus loss caused by the default anchor jump was fixed and checked again. Reset restored all cards and focused search; Tab then reached Family and Reset in order. The downloaded compact SVG matched its source SHA-256 fingerprint. No browser warnings or errors were recorded. The regenerated overview was visually reviewed. See the separate [Tasks study results](ui/README.md#browser-review-on-2026-11-12). These checks do not replace the untested cases listed below.

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

### Compact artwork review on 2026-11-13

Added the copy icon, three compact state sources and a separate store icon source/export. The catalogue contains 103 cards. Sources, sprite, manifest and both contact sheets were regenerated together. The overview and 512 px store PNG were visually inspected. The store export is 512 x 512, 32-bit RGBA and below 1 MB; it uses an sRGB profile. The artwork checker now enforces its size, channel format and byte budget.

In the in-app browser, searching compact found four cards without page-wide overflow at 390, 640, 900 and 1440 px. Searching google-play found its one PNG card. The planner study passed 36 empty-layout checks: Today, Week and Tasks in Chinese, Japanese and English, at 100%/200% sample text and 390/1440 px. Each page referenced its matching illustration. Some immediate image probes ran before loading completed; a later settled probe confirmed the Japanese compact Week image loaded at 96 px. Browser warning/error logs were empty. Browser screenshot capture timed out, so this pass does not claim new screenshot-based page inspection. Native Android appearance and store acceptance remain untested. No Flutter code or dependencies changed, and no Flutter suite or native build ran for this artwork-only pass.

### Android and music expansion on 2026-11-15

Added ten icons and six compact state illustrations, bringing the library to 67 interface icons, 20 state illustrations and 119 catalogue cards. The [Android handoff](ANDROID_ARTWORK.md) names each file's meaning, size and limits. Regenerated the sprite, catalogue, manifest and all three contact sheets. The overview and Android sheet were visually reviewed; the backup-review magnifier was simplified to avoid looking like a zoom-out action.

In the in-app browser, the ten compact cards had no page-wide horizontal overflow at 390, 640, 641, 900, 901 and 1440 px. The Focus controls filter returned six cards; combining it with pause returned one; an unmatched query returned zero. Reset restored all 119 cards and focused Search. The Tasks starter shortcut revealed its card and focused the download link. Native phone rendering, screen-reader output, 200% browser zoom and new download-file checks remain untested in this pass.

The music pack gained four Slow Pages pieces with editable scores, MIDI, FLAC, OGG, MP3 and matching SVG covers. Its [guide](focus-pack/README.md#expansion-checks-on-2026-11-15) records the separate audio and short browser playback checks. The original room and editorial PNGs were retained. No paid generation, Flutter dependency or application integration was added. Artwork, website and repository checks passed; Flutter tests and native builds were not run for this asset-only work.

### Android daily-use design review on 2026-11-16

Added three 96 x 72 state illustrations: no deadlines on the named date, no plan recorded in an interval, and an unsaved draft. Added a 1360 x 1440 static Today, Tasks and Week board with an editable SVG and PNG export. The library now contains 67 icons, 23 state illustrations and 124 catalogue cards. The artwork checker covers 130 SVGs and 129 manifest entries, including website copies. The three contact sheets and design-board PNG have current source and output fingerprints.

The daily-use board, overview and Android contact sheet were visually inspected. The board uses one fictional date and record set; its deadline and reserved interval remain distinct. This is an ordinary-size English reference, not a responsive native implementation or store screenshot. Existing interactive studies, translations, music and original raster masters were retained.

The in-app browser showed both Android design-study cards without page-wide horizontal overflow at 320, 390, 640, 641, 900, 901 and 1440 px. Combined family and mixed-case search returned both cards. An unmatched query showed zero results and the empty message. Reset restored 124 cards and focused Search; Tab reached Family and Reset in order. Searching compact returned 13 cards. The Tasks shortcut cleared filters, revealed its source and focused its download link. Captured browser warning and error logs were empty.

The headless browser could not start in the local sandbox; the checks above used the in-app browser instead. The browser download-event check timed out, so this pass does not claim a downloaded-file fingerprint check. Native phone behavior, TalkBack, 200% text, other browser engines and JavaScript-disabled browsing remain untested. Source, manifest, website and documentation checks passed. No Flutter tests, native builds or audio checks were run because this pass changes only design documentation, artwork and authoring tools.
