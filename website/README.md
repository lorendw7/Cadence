# Cadence website

A static Japanese/English/Chinese project website for the local course and personal planner. It presents planned features separately from the current Today skeleton and does not advertise nonexistent downloads.

| File | Purpose |
|------|---------|
| `index.html` | Product story, interactive concept preview, development status and FAQ |
| `privacy.html` | Current data handling, planned local files and website hosting distinction |
| `assets/site.css` | Responsive landing page and shared privacy-page styles; light/dark themes |
| `assets/lang.js` | Shared language switching; Japanese is the default |
| `assets/preview.js` | Week/Today keyboard tabs and a shared fictional single-class move/cancel/restore demo |
| `assets/icon.svg` | Deployable brand icon |

Open `index.html` or run from the repository root:

```sh
python -m http.server 8000 --directory website --bind 127.0.0.1
```

Visit `http://127.0.0.1:8000`. Check both pages in all three languages, metadata, links and narrow-screen layout. Test Week/Today tabs by mouse and keyboard, and open the FAQ disclosures. The sample timetable scrolls within its panel on small screens. Language choice uses localStorage; preview interactions are not saved and no analytics scripts are included.

The class-change demo moves fictional linear algebra from Monday 09:00 to Tuesday 15:00. Week and Today must agree: moved shows once in each applicable view; cancelled appears in neither; Original restores Monday and removes it from Tuesday. Language changes retain the demo choice. Controls have pressed states and a live description; with JavaScript disabled, only the static concept is shown. Test keyboard operation, 320px and desktop widths, and dark mode.

The homepage also explains the planned draft → confirmation → shared-view flow and the actual learning order. The current focus is task foundations; persistent tasks, courses and reminders are not presented as completed. Architecture and learning links belong with development progress, separate from the product preview.

The layout takes inspiration from the clear student scenarios on [MyStudyLife](https://mystudylife.com/) and the visual planning demonstrations on [Structured](https://structured.app/). All illustrations are original HTML/CSS using fictional data. They show planned interactions, not screenshots of the current app. Do not add download badges, testimonials or adoption figures until they are supported by actual releases or evidence.

[pages.yml](../.github/workflows/pages.yml) publishes website changes on main or manual dispatch. Source artwork lives in [assets/brand/](../assets/brand/); keep the website copy self-contained.

When a feature becomes usable, update all three translations and link only actual release assets. Do not claim a build check is a full platform release.
