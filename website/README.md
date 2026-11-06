# Cadence website

A static Japanese/English/Chinese project website for the local course and personal planner. It presents planned features separately from the current Today skeleton and does not advertise nonexistent downloads.

| File | Purpose |
|------|---------|
| `index.html` | Product scope, development status and desktop targets |
| `privacy.html` | Current data handling, planned local files and website hosting distinction |
| `assets/site.css` | Existing visual design |
| `assets/lang.js` | Shared language switching; Japanese is the default |
| `assets/icon.svg` | Deployable brand icon |

Open `index.html` or run from the repository root:

```sh
python -m http.server 8000 --directory website --bind 127.0.0.1
```

Visit `http://127.0.0.1:8000`. Check both pages in all three languages, metadata, links and narrow-screen layout. Language choice uses localStorage; no analytics scripts are included.

[pages.yml](../.github/workflows/pages.yml) publishes website changes on main or manual dispatch. Source artwork lives in [assets/brand/](../assets/brand/); keep the website copy self-contained.

When a feature becomes usable, update all three translations and link only actual release assets. Do not claim a build check is a full platform release.
