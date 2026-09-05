# Editing the site

No Claude Design account, no build tooling, no Node install required. The
whole site is plain HTML/CSS/JS under [`site/`](../site/). Anyone can clone,
edit, preview, and open a PR.

## Files

```
site/
├── page.dc.html   ← page shell + render/logic layer (rarely touched for content)
├── data/
│   ├── index.js         ← SERIES_ORDER (which series show, in what order) + loader
│   └── series-*.js      ← one file per series: all its game entries (edit these)
├── *.dc.html      ← sibling render components: EntryTitleLinks, PlatformIcon,
│                     LanguageTag, LengthDisplay, RatingDisplay
├── components.js  ← AUTO-GENERATED (inlines the *.dc.html above); don't hand-edit
├── support.js     ← vendored runtime, don't hand-edit
├── images/platforms/  ← platform/content icons referenced by the data files
└── _ds/nocturne-.../
    ├── styles.css           ← design tokens + component classes (safe to edit)
    ├── _ds_bundle.js        ← vendored design-system runtime, don't hand-edit
    ├── _ds_manifest.json    ← vendored, don't hand-edit
    └── readme.md            ← design system usage guide, read before restyling
```

`page.dc.html` and the sibling `*.dc.html` components are the exact format
Claude Design uploads/exports — that's just a naming convention, not a
requirement to own the tool. They're readable HTML with `{{ expression }}`
template bindings, evaluated at runtime by `support.js`.

`components.js` is a build artifact: it inlines each `*.dc.html` component
so `page.dc.html` also works opened straight off disk (`file://`), where
browsers block the `fetch()` the runtime would otherwise use. Regenerated
by `scripts/bundle-components.py` — run automatically by the pre-commit
hook and `just build` — so never edit it by hand; edit the `.dc.html`
source and rebuild.

## Adding or editing a game entry

Game data lives in [`site/data/`](../site/data/), one file per series. Each
`series-<slug>.js` assigns
`window.__ffSeriesReg['<slug>'] = { ..., games: [...] }` — the `games`
array holds the entries (title, release date, tags, languages, length,
store links, platform icons, rating). To edit or add an entry, open the
relevant `series-*.js`, copy a neighboring entry as a template, and edit
the fields; the render layer picks it up automatically.

To add, remove, or reorder a whole series, edit the `SERIES_ORDER` list in
[`site/data/index.js`](../site/data/index.js) (and add the matching
`series-<slug>.js` file).

## Adding an image/icon

Drop the file in `site/images/platforms/`, then reference it as
`images/platforms/yourfile.svg` in a series data file (see `iconImg` fields
for examples). Name it after the platform it represents (`ps5.svg`,
`snes.png`), not its origin.

## Restyling

Colors, fonts, spacing and radii are all CSS custom properties defined at the
top of `site/_ds/nocturne-.../styles.css`. Change values there rather than
hardcoding new ones inline — read that folder's `readme.md` first, it
documents the system's conventions (do/don't list included).

## Preview locally

No build step needed. Simplest: open `site/page.dc.html` directly in a
browser (`file://`) — `components.js` and the classic-script data layer
make that work with no server.

To preview the way it actually deploys, serve `site/` over http:

```sh
cd site
python -m http.server 8000
# open http://localhost:8000/page.dc.html
```

(Any static file server works — `npx serve`, VS Code Live Server, etc.)

If you have [`just`](https://github.com/casey/just) installed, `just serve`
does the same thing but through the exact copy-and-rename step CI runs
(`site/` → `build/`, `page.dc.html` → `index.html`), so you're previewing
what actually gets deployed. `just build` alone just produces `build/`
(gitignored) without serving it.

## If you use Claude Design

`site/page.dc.html`, the sibling `*.dc.html` components, `support.js`,
`_ds/`, `data/`, and the `images/` tree are what the tool exports/imports —
drag the whole `site/` folder in to keep editing visually, then copy the
changed files back over `site/` and open a PR. Asset paths are plain
relative URLs, so the folder layout is not fixed by the tool. Don't bother
copying `components.js` — it's regenerated from the `*.dc.html` files. This
is optional; hand-editing works the same either way.

## Deploy

Pushing to `main` auto-builds and publishes via GitHub Actions — see
[DEPLOY.md](DEPLOY.md). No manual export step is ever needed.
