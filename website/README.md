# Cadence website

A static Japanese, English and Chinese introduction to Cadence, a general-purpose local time planner for work, learning and everyday life. The design uses pure white (#FFFFFF), graphite and a burgundy accent, with Cadence's independent C mark. A product preview leads the page; serif accents, fine rules and the original color artwork retain the journal identity. No school identity, university affiliation or particular occupation defines the audience.

The product is in development. The current desktop learning app has basic in-memory tasks. The website uses fictional Today, Week and Tasks views to show the intended direction; it is not a working planner. Calls to action open the preview, product design or roadmap. Do not add download or released-feature claims without a verified release.

## Product direction

Cadence remains a free local time planner for work, study and daily life. Tasks, deadlines, personal plans, Today and Week are central. Useful direct editing comes first, and phone access makes the plan easier to use. Screenshot recognition is optional work only if demonstrated need justifies it. Build the complete local Windows flow first, then validate Android without waiting for every macOS/Linux release. Design compact views from the start; iOS follows host/device readiness and Web is later. Other desktop releases still require native checks. The planned first-use flow explicitly offers Save on this device or Temporary use. Both choices require no account. Scheduling, tasks and chosen local saving must work offline. Before a saving choice, do not persist personal planner data. Temporary content is lost when the app closes; local saving is separate from a backup. These features are requirements, not delivered website behavior.

[ADR-013](../docs/adr/013-local-planner-and-conditional-academic-access.md) prioritizes direct task, plan and repeat editing, with Windows first and Android next. Minimal time/room corrections, cancellation and restoration of one occurrence belong to the useful flow. Screenshot and CSV/table import do not block that delivery. Academic-system access is a deferred extension, with no current research, application or integration work scheduled. Cloud sync and optional ads remain for review after store launch. General product publication does not require school permission. The existing GitHub Pages site remains the concept presentation, separate from any future Web planner. See [the product design](../docs/REDESIGN.md).

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

Week shows all seven days, Monday through Sunday. Today and Week share the same fictional Thursday: focus time at 09:00, a project catch-up at 13:00 and reading at 17:00. Saturday has time with a friend; Sunday has a slow morning. The grid keeps readable columns at a minimum width of 680 px and scrolls inside its panel when needed, without widening the page. The local illustration uses responsive WebP sources and a PNG fallback, with explicit dimensions and lazy loading below the product preview.

## Data and claims

The current website stores only a language preference. It has no personal planner input, upload, authentication or synchronization. GitHub Pages still processes page requests. The privacy page must distinguish those actual behaviors from the future application's first-use choice, local saving, temporary mode, private JSON backups and the absence of any implemented or approved academic connection.

The first local release uses explicit Save and Cancel. Unsaved forms stay in memory and can be lost on a crash. Local files and private JSON backups are not encrypted. If an optional import is later included, show an editable review, uncertainty and possible duplicates, then save the confirmed records together. Screenshot recognition has no scheduled release gate. Any later cloud AI help needs separate consent and cost review; it is not required for local use. Show the destination and selected content before sending. Keys must never enter planner backups. Local saving does not automatically provide a backup. Temporary use must not leave persistent drafts or automatic backups. JSON exports contain private information, and deleting app data cannot remove exported files or copies shared elsewhere. Keep these claims aligned with implemented behavior.

## Checks and publication

```sh
node tools/check_website.cjs
```

Run this from the repository root. It checks translation keys and placeholders, HTML bindings and metadata, IDs and ARIA references, links, responsive assets and JavaScript syntax. It does not replace browser checks of layout, focus, language changes and task interaction.

[pages.yml](../.github/workflows/pages.yml) publishes `website/` from the main branch or manual dispatch. Keep the three translations and privacy text aligned before publication. The full artwork catalogue remains in the repository.

## Historical revisions

The dated entries below describe earlier revisions and checks. They do not override the current product direction above.

### 2026-11-11 design update

The site now leads with local, free and simple use. The progress section separates working memory-only tasks, the planned first local release and optional import help. Screenshot and table import remain plans. AI help is optional and uses the user's own API key. Web and sync are considered only when a school connection needs them. The existing journal style, artwork, three languages and preview controls are unchanged.

Browser checks on this copy covered all three languages on the home and privacy pages, language links between pages, task completion and reset, state kept during a language change, and arrow-key tab switching. Desktop home views and a 390 px narrow view were inspected. The narrow Chinese home and Japanese privacy page had no page-wide horizontal overflow. This is a focused check, not a full browser or accessibility audit. JavaScript-disabled behavior and Home/End keyboard handling were not rechecked in this pass.

### 2026-11-12 visual simplification

The home and privacy pages share a quieter palette and more space between sections. The home page uses a 1120 px content limit; privacy text uses a 720 px reading width. The header scrolls with the page. Colored section bands, colored sample events, the stacked preview shadow and large decorative marks were removed. The illustration and small feature icons appear in grayscale through CSS; their original files are unchanged. Translations, product claims and preview behavior are unchanged.

Browser checks covered all three languages on the home page at 320, 390, 600, 601, 850, 851, 1100, 1101 and 1440 px. No page or header overflow was found. Privacy pages were checked in all three languages at 390 and 1280 px. Task completion, reset, state kept during a language change, arrow-key and Home/End tab navigation, FAQ expansion and language links were checked. The narrow Week view scrolls inside its panel. These checks do not replace a full accessibility audit. JavaScript-disabled behavior was not rechecked in a browser.

The repository, website and artwork checks passed. This update changes the concept website only; it does not release planner features.

### 2026-11-12 white page redesign

This revision replaces the earlier grayscale layout. Pure white page surfaces frame the original color illustration in the hero. The image keeps its original paper texture; it has no grayscale filter. Original artwork and exports are unchanged. The hero image loads eagerly with high priority and responsive WebP sources.

A dedicated wide preview follows the hero. Three short captions explain the views. The repeated principle strip, life section and closing pitch are merged into the remaining content. Japanese, English and Chinese hero and feature text are shorter. The data choices, current progress, FAQ and privacy page still distinguish working behavior from plans.

The structure draws on the concise product introduction on [Things](https://culturedcode.com/things/) and the image-led presentation on [Craft](https://www.craft.do/). Cadence retains its own artwork, serif headings and identity. No third-party assets or services were added.

Checks passed: repository links and scripts, website translations and markup, artwork consistency, and Git whitespace checks. Browser checks confirmed pure white backgrounds and color images. Home layouts in all three languages had no page overflow at 320, 390, 600, 850 and 1028 CSS pixels. Wide desktop layouts were also inspected. Privacy layouts passed in all three languages at 390 and 1440 pixels. Tasks, reset, state across language changes, arrow keys, Home/End, FAQ expansion and the privacy return link worked. The 390 px Week view scrolls inside its panel. A stalled browser tab was replaced to finish the checks. JavaScript-disabled behavior and other browser engines were not rechecked.

### 2026-11-12 product preview and local focus

This revision leads with a centered introduction and an interactive desktop concept. The preview uses a vertical tab list above 600 px and a horizontal tab list at smaller widths. Its orientation is exposed to assistive technology; Up/Down works in the vertical layout, with Left/Right and Home/End retained. The original color editorial image now sits below the feature explanation and loads lazily. Original artwork and exports are unchanged.

Wine remains the primary accent on a pure white page. Pale wine, sage and ochre distinguish fictional schedule blocks. Short entrance, tab and hover transitions add feedback; reduced-motion styles remove the motion. The design draws on the direct product presentation of [Todoist](https://www.todoist.com/) and [Things](https://culturedcode.com/things/) while keeping Cadence's identity. No external library, font, tracking script or animation service was added.

The three translations and privacy page reflect [ADR-009](../docs/adr/009-local-focus-without-school-connections.md). External academic systems, school login, automatic timetable retrieval, Web delivery and sync are outside the current plan. The roadmap prioritizes local tasks, personal plans, saving and recovery, followed by usability. The preview remains fictional and does not save edits. This update changes the website and documentation only, not Flutter code.

Browser checks covered the three languages at 320, 390, 600, 601, 850, 1100 and 1440 CSS pixels without page-wide horizontal overflow. Privacy pages passed at 390 and 1440 pixels in all three languages. Checks covered vertical and horizontal tab navigation, Home/End, task completion, state kept during language changes, reset, FAQ expansion and the privacy return link. Week scrolls within a 333 px panel at a 390 px viewport. The original illustration loaded in color. One closed preview tab was replaced to complete inspection.

Repository, website and artwork checks passed. JavaScript-disabled rendering and reduced-motion behavior were inspected in source, not rechecked with browser settings. Screen-reader announcements and other browser engines remain unverified. These are website checks, not product release acceptance.
