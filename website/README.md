# Cadence website

A static Japanese, English and Chinese introduction to Cadence, a general-purpose local time planner for work, learning and everyday life. The design uses warm paper, muted burgundy, sage and graphite, with Cadence's independent C mark. No school identity, university affiliation or particular occupation defines the audience.

The product is in development. The current desktop learning app has basic in-memory tasks. The website uses fictional Today, Week and Tasks views to show the intended direction; it is not a working planner. Calls to action open the preview, product design or roadmap. Do not add download or released-feature claims without a verified release.

## Product direction

Desktop local use comes first, on Windows, macOS and Linux. The planned first-use flow explicitly offers Save on this device or Temporary use. Both choices require no account. Scheduling, tasks and chosen local saving must work offline. Before a saving choice, do not persist personal planner data. Temporary content is lost when the app closes; local saving is separate from a backup. These features are requirements, not delivered website behavior.

A Web client and cross-device sync are optional later extensions. General product publication does not require school permission. Authorization applies only to an optional connection to a school, workplace or other external provider. See [ADR-007](../docs/adr/007-general-purpose-local-planner.md) and [the product design](../docs/REDESIGN.md).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page, fictional preview, local-use design, development stages and FAQ |
| `privacy.html` | Current website behavior, separate from planned application storage and connections |
| `assets/site.css` | Responsive layout, focus styles and reduced-motion handling |
| `assets/content.js` | All three translations, including metadata and accessible labels |
| `assets/lang.js` | Language choice, text-only rendering, metadata and local links |
| `assets/preview.js` | Keyboard-accessible tabs, temporary task completion and reset |
| `assets/icon-v2.svg` | Cadence C mark, matching the artwork master |
| `assets/icons/` | Local SVG feature icons |
| `assets/journal-editorial-*.webp` | Responsive 480, 960 and 1536 px illustration exports |
| `assets/journal-editorial.png` | Original illustration and PNG fallback |
| `assets/social-card.png` | 1200 × 630 sharing card marked in development |
| Browser icon files | Favicon and bookmark icons |

Editable masters, generation scripts and the catalogue are in [the artwork library](../assets/README.md). The website needs no build step, remote font, third-party script, analytics or runtime service. GitHub Pages remains its host; do not register a second Site.

## Local preview

From the repository root:

```sh
python -m http.server 8000 --directory website --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`. Check both pages in all three languages at wide and narrow widths. Japanese remains readable with JavaScript disabled. In that case, the page hides inactive language and preview controls, keeps the static Today example and explains that it is static.

Language selection uses `?lang=` first, then a saved explicit choice, then Japanese. It does not infer a language from the browser. The preference uses the `cadence-lang` localStorage key. Translations use `textContent`, never HTML insertion.

Test preview tabs with clicks, arrow keys and Home/End, including visible focus. Task completion changes the count in Today and Tasks. The counter handles zero, one and multiple unfinished tasks. A language change keeps the temporary checkbox state. Reset restores the sample tasks without changing the selected view. Reloading also restores the sample. The preview never saves tasks.

Week shows all seven days, Monday through Sunday. Today and Week share the same fictional Thursday: focus time at 09:00, a project catch-up at 13:00 and reading at 17:00. Saturday has time with a friend; Sunday has a slow morning. The grid keeps readable columns at a minimum width of 680 px and scrolls inside its panel when needed, without widening the page. The local illustration uses responsive WebP sources and a PNG fallback, with explicit dimensions and lazy loading.

## Data and claims

The current website stores only a language preference. It has no personal planner input, upload, authentication or synchronization. GitHub Pages still processes page requests. The privacy page must distinguish those actual behaviors from the future application's first-use choice, local saving, temporary mode, private JSON backups and optional connections.

Local saving does not automatically provide encryption or backup. Temporary use must not leave persistent drafts or automatic backups. JSON exports contain private information, and deleting app data cannot remove exported files or copies shared elsewhere. Keep these claims aligned with the implementation as each feature is added.

## Checks and publication

```sh
node tools/check_website.cjs
```

Run this from the repository root. It checks translation keys and placeholders, HTML bindings and metadata, IDs and ARIA references, links, responsive assets and JavaScript syntax. It does not replace browser checks of layout, focus, language changes and task interaction.

[pages.yml](../.github/workflows/pages.yml) publishes `website/` from the main branch or manual dispatch. Keep the three translations and privacy text aligned before publication. The full artwork catalogue remains in the repository.

## 2026-11-11 design update

The current pass clarifies the general local-planner audience, replaces school-led examples with work, learning and daily-life plans, and separates current learning-app behavior from desktop requirements and optional later Web/sync work. It also adds a development timeline, clearer sample labels, larger language and tab targets, task reset, complete Thursday examples and responsive WebP artwork. Browser checks from an earlier artwork pass do not validate later copy or layout changes; review the current version before publishing.
