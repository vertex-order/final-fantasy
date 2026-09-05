# Editing the site

No Claude Design account, no build tooling, no Node install required. The
whole site is plain HTML/CSS/JS under [`site/`](../site/). Anyone can clone,
edit, preview, and open a PR.

## Files

```
site/
├── page.dc.html   ← content + logic (edit this for copy and game data)
├── support.js     ← vendored runtime, don't hand-edit
├── images/platforms/  ← platform/content icons referenced by page.dc.html
└── _ds/nocturne-.../
    ├── styles.css           ← design tokens + component classes (safe to edit)
    ├── _ds_bundle.js        ← vendored design-system runtime, don't hand-edit
    ├── _ds_manifest.json    ← vendored, don't hand-edit
    └── readme.md            ← design system usage guide, read before restyling
```

`page.dc.html` is the exact format Claude Design uploads/exports — that's
just a naming convention, not a requirement to own the tool. It's readable
HTML with `{{ expression }}` template bindings, evaluated at runtime by
`support.js`.

## Adding or editing a game entry

All game data lives in one JS array, `const raw = [...]`, around
[`site/page.dc.html:1563`](../site/page.dc.html#L1563). Each series is an
object with a `games: [...]` array of entries — title, release date, tags,
languages, length, store links, platform icons, rating. Copy a neighboring
entry as a template and edit the fields; the render layer picks it up
automatically, no other file needs touching.

## Adding an image/icon

Drop the file in `site/images/platforms/`, then reference it as
`images/platforms/yourfile.svg` in a `raw` entry (see `iconImg` fields above
for examples). Name it after the platform it represents (`ps5.svg`,
`snes.png`), not its origin.

## Restyling

Colors, fonts, spacing and radii are all CSS custom properties defined at the
top of `site/_ds/nocturne-.../styles.css`. Change values there rather than
hardcoding new ones inline — read that folder's `readme.md` first, it
documents the system's conventions (do/don't list included).

## Preview locally

No build step needed — just serve `site/` and open it:

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

`site/page.dc.html` plus its sibling `support.js`, `_ds/`, and the
`images/` tree are what the tool exports/imports — drag the whole `site/`
folder in to keep editing visually, then copy the changed files back over
`site/` and open a PR. Asset paths are plain relative URLs, so the folder
layout is not fixed by the tool. This is optional; hand-editing works the
same either way.

## Deploy

Pushing to `main` auto-builds and publishes via GitHub Actions — see
[DEPLOY.md](DEPLOY.md). No manual export step is ever needed.
