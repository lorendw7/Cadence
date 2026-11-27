# Cadence website

Hosting status (2026-11-15): the repository is now private and the former Pages URL returns HTTP 404. The maintainer approved this downtime. The Pages workflow is disabled in GitHub so a main-branch push does not attempt deployment. Keep website source and workflow files for later review. No replacement hosting is configured. The Pages instructions below describe the retained workflow, not a currently available public site.

Publication update (2026-11-27). The maintainer asked to make the source open again and put the concept site back online. Under [ADR-016](../docs/adr/016-open-source-and-kyushu-student-preset.md), the site will be served by GitHub Pages from this repository once it is public. This replaces the 2026-11-18 wait for Android acceptance. The site stays a concept presentation: it has no download link and claims no released feature. Until the maintainer makes the repository public and enables Pages, the site is still offline.

Earlier publication decision (2026-11-18), now replaced. Keep the main site offline until Cadence is usable on Android under the [planning acceptance gate](../docs/ROADMAP.md#d--android-phone-validation). Revisit publication after the maintainer can plan ordinary work on the phone, keep confirmed records after a restart and restore a backup. The website stays a separate release. A download link needs an accepted package that readers can actually install.

Planning update (2026-11-15): [ADR-015](../docs/adr/015-android-self-use-first.md) selects Android self-use first with ads deferred. ADR-014 retains the later desktop purchase hypothesis and excludes desktop/Web/site ads. Current public copy is still a concept presentation. Review any permanent all-platform-free or public-source promises in all three languages before a commercial offer is approved. This planning update does not publish site changes or change the existing Pages deployment.

A static Japanese, English and Chinese introduction to Cadence, a general-purpose local time planner for work, learning and everyday life. The design uses pure white (#FFFFFF), graphite and a burgundy accent, with Cadence's independent C mark. A product preview leads the page; serif accents, fine rules and the original color artwork retain the journal identity. No school identity, university affiliation or particular occupation defines the audience.

The product is in development. The current desktop learning app has basic in-memory tasks. The website uses fictional Today, Week and Tasks views to show the intended direction; it is not a working planner. Calls to action open the preview, product design or roadmap. Do not add download or released-feature claims without a verified release.

## Product direction

Cadence remains a local time planner for work, study and daily life. Tasks, deadlines, personal plans, Today and Week are central. Useful direct editing comes first, and phone access makes the plan easier to use. Screenshot recognition is optional work only if demonstrated need justifies it. Use Windows as the development host, then validate shared saving/recovery and the direct planning flow on Android as the first self-use target. A complete Windows release, desktop focus package and Steam preparation are not prerequisites. Keep the phone trial free and ad-free. After reliable planning and initial self-use, the next Android phase adds a task-linked countdown and modest local session history; it does not require desktop compact mode, pins, scenes or music. Public-release review and any ad pilot follow that phase. iOS follows host/device readiness and Web is later. Other desktop releases still require native checks. The planned first-use flow explicitly offers Save on this device or Temporary use. Both choices require no account. Scheduling, tasks and chosen local saving must work offline. Before a saving choice, do not persist personal planner data. Temporary content is lost when the app closes; local saving is separate from a backup. These features are requirements, not delivered website behavior.

[ADR-015](../docs/adr/015-android-self-use-first.md) prioritizes Android self-use after shared data safety. ADR-013 retains direct task, plan and repeat editing and the deferred-school boundary. Minimal time and room corrections, cancellation and restoration of one occurrence belong to the useful flow. Screenshot and CSV import remain deferred. The later optional cloud sync phase pairs with the Android review-banner pilot. The retained static site and the future Web planner have separate purposes. See [the product design](../docs/REDESIGN.md).

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

Editable masters, generation scripts and the catalogue are in [the artwork library](../assets/README.md). The website needs no build step, remote font, third-party script, analytics or runtime service. The current source is ready for local preview.

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

The website code stores only a language preference. It accepts fictional preview interactions. Review the chosen host's request logging and privacy terms before publication. Explain the website's behavior separately from the application's storage and account behavior. The retained privacy text describes the earlier GitHub Pages host.

The first local release uses explicit Save and Cancel. Unsaved forms stay in memory and can be lost on a crash. Local files and private JSON backups are not encrypted. If an optional import is later included, show an editable review, uncertainty and possible duplicates, then save the confirmed records together. Screenshot recognition has no scheduled release gate. Any later cloud AI help needs separate consent and cost review; it is not required for local use. Show the destination and selected content before sending. Keys must never enter planner backups. Local saving does not automatically provide a backup. Temporary use must not leave persistent drafts or automatic backups. JSON exports contain private information, and deleting app data cannot remove exported files or copies shared elsewhere. Keep these claims aligned with implemented behavior.

## Checks and publication

```sh
node tools/check_website.cjs
```

Run this from the repository root. It checks translation keys and placeholders, HTML bindings and metadata, IDs and ARIA references, links, responsive assets and JavaScript syntax. It does not replace browser checks of layout, focus, language changes and task interaction.

The retained [Pages workflow](../.github/workflows/pages.yml) defines publication of `website/` through GitHub Pages. It remains disabled. Keep the three translations and privacy text aligned before a new deployment.

## Hosting when the app is usable

### Publish the static site first

1. Confirm the usable Android build and the scope of the public site. Before publishing, replace the old Pages canonical and share URLs with the selected public hostname. Links to the private GitHub repository or its documents need an approved public destination or a short public summary in the site. Keep Japanese, English and Chinese copy aligned. Update website privacy text for the chosen host. The [app privacy policy](../docs/RELEASE.md#google-play-preparation-from-the-current-checkout) is a separate document. If Play preparation needs its public URL sooner, review that narrow publication separately from the homepage.
2. For a site-only launch, consider managed static hosting. Cloudflare Pages Direct Upload is one option. Prepare a local folder with the approved public HTML and assets from `website/`, with `index.html` at the root. Keep the README, private documents and Git files outside the upload. Select the intended public hostname before starting. For a custom subdomain, add the domain in Pages first, then add the DNS record with the current DNS provider if needed. See [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) and [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
3. Run the [repository checks](../tools/README.md) and review the website locally. After the approved deployment, verify HTTPS, homepage, privacy and support links, the three language variants, narrow and wide layouts, and the social preview. Verify download links with the actual public package. Save the deployed commit and last working site folder for rollback.

### Rent a server for a service when required

A virtual private server (VPS) is a rented Linux machine. For the later sync pilot, the maintainer can select a region, a monthly plan and a supported Linux image. Review the total charge, contract term, domain renewal and separate backup cost before ordering. Sakura's official 2 GB Linux monthly plans checked on 2026-11-18 list JPY 1,738 for Ishikari and JPY 1,958 for Tokyo. The cloud budget uses JPY 2,500 per month as a planning allowance. See [Sakura prices](https://vps.sakura.ad.jp/specification/).

If the later deployment uses one VPS, serve the public site and API from separate hostnames, such as `www.example.com` and `api.example.com`. A maintained HTTPS proxy such as Caddy can serve static files and pass API requests to a local process. Use a separate deploy account with key-based access, restrict administrative access, keep PostgreSQL private and keep secrets out of the public site and Git. Test the service with fictional records, monitor it and restore an off-server backup before a real sync pilot. See [Caddy HTTPS](https://caddyserver.com/docs/automatic-https) and the sync acceptance checks.

The current plan is local preparation only. When a deployment is selected, use one practice release to learn how files move from the repository to the public hostname. Keep a short deployment check and a tested rollback path for repeat releases.

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
