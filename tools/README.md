# Repository tools

Run these commands from the repository root. They are development helpers, not Flutter runtime dependencies.

| Command | Purpose | Requirements and effects |
|---|---|---|
| node tools/check_repository.cjs | Check documentation language scripts, local file links and anchors, and project JavaScript syntax | Node and Git; read-only |
| node tools/check_website.cjs | Check translations, placeholders, metadata, markup bindings, IDs, ARIA, local assets, preview contracts, and JavaScript syntax | Node built-ins; read-only |
| python tools/check_artwork.py | Check SVG structure, icon/sprite agreement, catalogue coverage, preview freshness, manifest sizes, image budgets, and platform/site copies | Python standard library; read-only |
| python tools/build_focus_pack.py | Render 16 synthetic music studies and three cues from editable note sources; export MIDI, FLAC, OGG, MP3, covers and a local listening catalogue | Python with NumPy/SciPy and FFmpeg; writes only the focus pack; no network calls or application dependencies |
| python tools/check_focus_pack.py --report assets/focus-pack/validation.json | Check focus-pack source hashes, local links, audio decoding, durations, channels and measured levels | Python standard library, FFmpeg and FFprobe; writes only the requested measurement report; omit --report for read-only use |
| python tools/build_artwork.py | Build SVG sources, the static Android board, catalogue, and initial manifest using artwork_catalog.py | Python standard library; writes artwork outputs |
| node tools/export_artwork.cjs | Export PNG/ICO/ICNS/WebP, build preview sheets, and sync platform/site assets | Node with sharp; writes outputs; run the Python generator again to refresh the manifest |
| node tools/export_artwork.cjs --previews-only | Rebuild the overview, full library and Android contact sheets, and export the Android daily-use PNG | Node with sharp; writes four previews and their source fingerprints in the manifest |
| node tools/export_artwork.cjs --store-only | Export the prepared Google Play listing icon and refresh the contact sheets and Android daily-use PNG | Node with sharp; run the Python generator before and after export; does not alter native launcher resources |

Follow the [artwork regeneration order](../assets/README.md#regeneration). The website uses 480/960/1536 px WebP exports with a PNG fallback. Keep the original image and generation inputs.

`artwork_catalog.py` owns asset groups, use descriptions, application palette metadata and the Tasks starter subset. `artwork_previews.cjs` owns the preview layouts. `android_design_art.py` authors the [static Android board](../assets/ui/android-daily-flow.svg); the export step renders its PNG. The editable catalogue styles and local filtering script are in `assets/catalog.css` and `assets/catalog.js`. The HTML catalogue, three contact sheets and daily-use PNG are generated outputs. The [Tasks study](../assets/ui/README.md) has separate editable HTML, CSS and JavaScript files. The repository check includes JavaScript syntax under `assets/`.

After changing catalogue controls or layout, serve the repository locally and check search, combined filters, empty results, reset focus, keyboard navigation, and a download. Check both sides of the 640 px and 900 px layout breaks. Keep the results and any limits in the [artwork guide](../assets/README.md#catalogue-browser-check).

Also check that Tasks starter shortcuts clear filters, reveal the matching card and focus its download link. After changing the Tasks study, compare its sample states and languages at narrow and wide widths and at 200% sample text size. Keep those design-only results in its handoff; do not record them as Flutter acceptance.

Do not run generators as generic cleanup. The outputs are versioned design files. Flutter checks and native builds are in [SETUP.md](../docs/SETUP.md).

The [planner study](../assets/ui/PLANNER_STUDY.md) has separate editable HTML, CSS and JavaScript. Open Preview settings to select a language, frame, scenario and sample text size. After changing it, review Today, Week and Tasks in all three sample languages, compact and wide layouts, and at 200% sample text. Check settings dismissal, day selection, task-tray scroll retention, editor dismissal and return focus, overlap visibility and the save-failure sample. Its drawn checkboxes and read-only editors are design examples, not application behavior. Record results in its handoff, separately from the earlier Tasks study.

Source checks cannot prove browser behavior, accessibility, remote-link availability, or release readiness. The documentation script check catches leftover Chinese/Japanese text in Markdown; a human review still needs to check that the English is clear and correct.

The [repository workflow](../.github/workflows/repository.yml) runs the three read-only tools. The retained [Pages workflow](../.github/workflows/pages.yml) requires them before deployment, but it is disabled in GitHub while the site is offline.
