# Contributing

Everything you need is on this page. No Claude Design account, no Node, no
build tooling — the site is plain HTML/CSS/JS under [`site/`](site/). Clone,
edit, preview in a browser, open a PR.

- [Quick start](#quick-start)
- [Fix or add a game entry](#fix-or-add-a-game-entry) ← the common case
- [Add, remove, or reorder a series](#add-remove-or-reorder-a-series)
- [Add a platform / content icon](#add-a-platform--content-icon)
- [Edit page copy or the FAQ](#edit-page-copy-or-the-faq)
- [Restyle](#restyle)
- [Edit a `.dc.html` component](#edit-a-dchtml-component)
- [Preview locally](#preview-locally)
- [Open a PR](#open-a-pr)
- [Appendix: repo layout](#appendix-repo-layout)
- [Appendix: deploy internals](#appendix-deploy-internals)

## Quick start

```sh
git clone https://github.com/vertex-order/final-fantasy
cd final-fantasy
# open site/page.dc.html in a browser — done, no build step
```

Optional: install [`just`](https://github.com/casey/just) for the
`just serve` / `just build` shortcuts, and run `just install-hooks` once to
wire up the pre-commit hook (strips image metadata, regenerates
`site/components.js`). Neither is required to contribute.

## Fix or add a game entry

Game data lives in [`site/data/`](site/data/), **one file per series**:
`series-<SLUG>.js` (e.g. `series-VII.js`, `series-X.js`). Each file assigns

```js
window.__ffSeriesReg['VII'] = { num: 'VII', title: '...', /* ... */, games: [ /* entries */ ] };
```

The `games` array holds the entries — title, release date, tags, languages,
length, store links, platform groups, rating. Entries are large and
field-heavy, so **copy a neighbouring entry in the same file as a template**
and edit the fields rather than writing one from scratch. The render layer
picks it up automatically on reload — no rebuild.

## Add, remove, or reorder a series

Edit the `SERIES_ORDER` list in [`site/data/index.js`](site/data/index.js)
(display order, top to bottom). To add one, also create the matching
`site/data/series-<SLUG>.js` — copy an existing file's structure.

## Add a platform / content icon

Drop the file in [`site/images/platforms/`](site/images/platforms/), then
reference it as `images/platforms/yourfile.svg` in a series data file (see
the `iconImg` fields for examples). Name it after what it represents
(`ps5.svg`, `snes.png`), not where it came from.

## Edit page copy or the FAQ

- Page shell, headings, intro text: [`site/page.dc.html`](site/page.dc.html).
- FAQ questions and answers: [`site/data/faq.js`](site/data/faq.js).

`page.dc.html` and the sibling `*.dc.html` files are readable HTML with
`{{ expression }}` template bindings, evaluated at runtime by `support.js`.
The `.dc.html` naming is just the format Claude Design imports/exports — you
don't need the tool to edit them.

## Restyle

Colours, fonts, spacing and radii are CSS custom properties at the top of
[`site/_ds/nocturne-dd511f00-0314-498c-83ef-49f001a371b0/styles.css`](site/_ds/nocturne-dd511f00-0314-498c-83ef-49f001a371b0/styles.css).
Change the token values there rather than hardcoding inline. Read that
folder's [`readme.md`](site/_ds/nocturne-dd511f00-0314-498c-83ef-49f001a371b0/readme.md)
first — it documents the system's conventions and a do/don't list.

The rest of `_ds/` (`_ds_bundle.js`, `_ds_manifest.json`,
`_adherence.oxlintrc.json`) is vendored — don't hand-edit; open an issue if
something there needs to change.

## Edit a `.dc.html` component

The sibling components (`EntryTitleLinks.dc.html`, `PlatformIcon.dc.html`,
`SeriesSection.dc.html`, …) are the render layer. If you change one, you
must regenerate [`site/components.js`](site/components.js) — a build
artifact that inlines every component so `page.dc.html` also works opened
straight off disk (`file://`).

```sh
just build          # or: just bundle-components
```

The pre-commit hook does this automatically if you ran `just install-hooks`.
**Never hand-edit `components.js`.** Working without a shell (e.g. inside a
design tool)? See the header comment at the top of `components.js` for the
by-hand procedure, and [`.claude/CLAUDE.md`](.claude/CLAUDE.md).

## Preview locally

Simplest — open [`site/page.dc.html`](site/page.dc.html) directly in a
browser (`file://`). `components.js` plus the classic-script data layer make
that work with no server.

To preview the way it deploys, serve `site/` over http:

```sh
cd site && python -m http.server 8000
# http://localhost:8000/page.dc.html
```

Any static server works (`npx serve`, VS Code Live Server, …). With `just`:
`just serve` runs the exact copy-and-rename step CI uses
(`site/` → `build/`, `page.dc.html` → `index.html`), so you preview the real
deploy output.

## Open a PR

1. Fork, branch off `main`.
2. Make your edit under `site/`.
3. Preview locally.
4. PR against `main`. **Merging deploys automatically** — no manual export
   step, ever.

Scope notes:

- Data corrections/additions (dates, platforms, links, descriptions) are
  the easy path — edit the relevant `series-<SLUG>.js` entry.
- Vendored files (`_ds/_ds_bundle.js`, `_ds_manifest.json`, `support.js`)
  and the generated `components.js`: don't hand-edit.

## Appendix: repo layout

```
site/
├── page.dc.html        page shell + render/logic layer
├── *.dc.html           sibling render components (EntryTitleLinks, PlatformIcon, …)
├── components.js        AUTO-GENERATED from the *.dc.html above — don't hand-edit
├── support.js           vendored DC runtime — don't hand-edit
├── data/
│   ├── index.js         SERIES_ORDER + loader
│   ├── series-*.js       one file per series: all its game entries (edit these)
│   └── faq.js            FAQ content
├── images/platforms/    platform / content icons referenced by the data files
└── _ds/nocturne-.../
    ├── styles.css        design tokens + component classes (safe to edit)
    ├── readme.md         design-system guide — read before restyling
    └── _ds_*            vendored runtime/manifest — don't hand-edit

scripts/bundle-components.py   regenerates site/components.js
justfile                       build / bundle-components / serve / clean / install-hooks
.githooks/pre-commit           strips image metadata, regenerates components.js
```

## Appendix: deploy internals

Every push to `main` runs
[`.github/workflows/static.yml`](.github/workflows/static.yml):

1. Checks out the repo.
2. Installs `just`, runs `just build` — regenerates `components.js`, copies
   `site/` into a gitignored `build/`, renames `build/page.dc.html` to
   `build/index.html` (GitHub Pages needs a root `index.html`; every other
   path in the file is already relative). Same recipe you can run locally.
3. Uploads `build/` as the Pages artifact and deploys it.

No bundler, no dependencies, no manual "export". Merging a PR to `main` is
the deploy.

**Verify a deploy:** the **Actions** tab, or the environment URL under
**Settings → Pages**.

**First-time setup** (if not already done): **Settings → Pages → Build and
deployment → Source** must be **GitHub Actions**, not "Deploy from a
branch".
