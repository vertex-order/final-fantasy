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
- [Cross-repo sync](#cross-repo-sync)
- [Preview locally](#preview-locally)
- [Open a PR](#open-a-pr)
- [Licensing](#licensing)
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

`site/images/platforms/`, `PlatformIcon.dc.html`, and `platform-icons.js`
are **vendored from kit** (which gets them from
[`vertex-order/platforms`](https://github.com/vertex-order/platforms)) —
don't drop a file in here directly. A new platform icon is added in
`platforms`, following its own contributing guide; once it lands there and
flows through kit, `just sync-update kit` here pulls it in. Then reference
it as `images/platforms/yourfile.svg` in a series data file (see the
`iconImg` fields for examples, and `platform-icons.js` for the canonical
`iconSize`/`imgStyle` to match).

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
`_adherence.oxlintrc.json`) is vendored — don't hand-edit; start a
[discussion](https://github.com/vertex-order/final-fantasy/discussions) if
something there needs to change.

## Edit a `.dc.html` component

**Owned here:** only `page.dc.html`. **Everything else** —
`PlatformIcon.dc.html`, `EntryTitleLinks.dc.html`, `SeriesSection.dc.html`,
`MediaEntry.dc.html`, `BackToTop.dc.html`, and the rest of the render layer
— is **vendored from
[`vertex-order/kit`](https://github.com/vertex-order/kit)**; don't hand-edit
it here.

If you change an owned component, regenerate
[`site/components.js`](site/components.js) — a build artifact
that inlines every component so `page.dc.html` also works opened straight
off disk (`file://`):

```sh
just build          # or: just bundle-components
```

The pre-commit hook does this automatically if you ran `just install-hooks`,
and CI ([`check-generated.yml`](.github/workflows/check-generated.yml))
fails your PR if it's stale — so if you forget, run `just build` and commit
the result.

`page.dc.html` loads `components.js` **only over `file://`**. When you
preview over http (`just serve`, `python -m http.server`, any static
server) the runtime fetches each `*.dc.html` live, so your component edits
show up on reload whether or not you regenerated the bundle — regenerating
just keeps the committed file honest.

**Never hand-edit `components.js`.** Working without a shell (e.g. inside a
design tool)? See the header comment at the top of `components.js` for the
by-hand procedure, and [`.claude/CLAUDE.md`](.claude/CLAUDE.md).

## Cross-repo sync

Almost everything code-shaped here is **vendored from
[`vertex-order/kit`](https://github.com/vertex-order/kit)**, per
[`sync.toml`](sync.toml): the DC runtime, Nocturne (`_ds/`, `images/ui/`),
every render component including `PlatformIcon.dc.html` (only `page.dc.html`
stays local), the platform icons themselves (`images/platforms/`,
`platform-icons.js`), every script (`bundle-components.py`, `sync.py`, the
SVG tooling), the `justfile` itself, and CI/editor config with no reason to
differ per repo. This repo owns nothing another repo pulls.

Every platform-icon reference in `site/data/series-*.js` — 1,407 of them —
was migrated to the canonical `platforms` names, sizes, and rendering model
(images instead of Bootstrap-icon classes for several platforms; one image
per Xbox generation instead of a shared icon plus a suffix; the per-entry
tint `filter:` dropped since `PlatformIcon.dc.html` now applies it via CSS).
A new platform icon still gets added in `platforms` first, then flows down
through kit — see [Add a platform / content icon](#add-a-platform--content-icon).

- `just sync` — pull the vendored files at the pinned `ref`.
- `just sync-check` — what CI runs
  ([`check-vendored.yml`](.github/workflows/check-vendored.yml)); fails on drift.
- `just sync-update kit` — repin to kit's current HEAD, then pull.

Never hand-edit a vendored file. Three things stop it from landing anyway: an
`Owned by vertex-order/kit — edit here` header comment on the file itself
(where the format allows one), a pre-commit guard (`sync.py --check-staged`)
that refuses to commit a vendored file that no longer matches its source,
and the same check in CI. None of them stop you from *making* the edit
locally — only from committing or merging it — so still read the header
comment before you type.

Not vendored, even though this repo needs its own:
`.github/ISSUE_TEMPLATE/*` and `.github/PULL_REQUEST_TEMPLATE.md` — each
necessarily carries this repo's own Discussions URL, so a byte-identical
vendor is impossible by construction. Seeded from kit's copies once, then
kept locally.

## Preview locally

Simplest — open [`site/page.dc.html`](site/page.dc.html) directly in a
browser (`file://`). `components.js` plus the classic-script data layer make
that work with no server. Off disk the page depends on `components.js` being
current, so run `just build` after editing any `*.dc.html`.

To preview the way it deploys — and so component edits load live without a
rebuild — serve `site/` over http:

```sh
cd site && python -m http.server 8000
# http://localhost:8000/page.dc.html
```

Any static server works (`npx serve`, VS Code Live Server, …). With `just`:
`just serve` runs the exact copy-and-rename step CI uses
(`site/` → `build/`, `page.dc.html` → `index.html`), so you preview the real
deploy output.

## Open a PR

1. Raise it in [Discussions](https://github.com/vertex-order/final-fantasy/discussions)
   first and agree the change there. PRs without a linked Discussion (or
   issue) may be closed unreviewed.
2. Fork, branch off `main`.
3. Make your edit under `site/`.
4. Preview locally.
5. Sign off each commit — `git commit -s` (see [Licensing](#licensing)).
6. PR against `main`, linking the Discussion. **Merging deploys
   automatically** — no manual export step, ever.

Scope notes:

- Data corrections/additions (dates, platforms, links, descriptions) are
  the easy path — edit the relevant `series-<SLUG>.js` entry.
- Vendored files (everything under [Cross-repo sync](#cross-repo-sync)) and
  the generated `components.js`: don't hand-edit.

## Licensing

Split by kind:

- **Code** — `page.dc.html`, `PlatformIcon.dc.html`, and everything vendored
  from kit — is [MIT](LICENSE-CODE), in and out.
- **`data/` and the page content as displayed** — game entries, series,
  the FAQ — is published under [CC BY-NC-SA 4.0](LICENSE); you contribute it
  under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), which
  leaves Vertex Order free to run and evolve the project.

Sign off every commit with `git commit -s`. It adds a `Signed-off-by` line
certifying you wrote the change, or otherwise have the right to submit it
under the licences above — the
[Developer Certificate of Origin](https://developercertificate.org/).

Questions and proposals go in
[Discussions](https://github.com/vertex-order/final-fantasy/discussions);
issues are for collaborators.

## Appendix: repo layout

Owned here (edit these):

```
site/
├── page.dc.html         page shell + render/logic layer
└── data/
    ├── index.js          SERIES_ORDER + loader
    ├── series-*.js       one file per series: all its game entries
    └── faq.js            FAQ content
sync.toml                 cross-repo file-sync manifest
```

`.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md` — kept
locally (repo-specific URL), seeded from kit's copies.

Vendored from [`vertex-order/kit`](https://github.com/vertex-order/kit) via
`just sync` — **don't hand-edit** (see [Cross-repo sync](#cross-repo-sync)):

```
site/support.js, site/_ds/, site/images/ui/, site/images/platforms/,
site/PlatformIcon.dc.html, site/data/platform-icons.js,
site/{BackToTop,HelpWanted,DescRun,EntryByline,EntryTitleLinks,
      ExtrasToggle,FAQ,FloatingCorner,FloatingNav,InPageControls,
      LanguageTag,LengthDisplay,MediaEntry,RatingDisplay,
      SeriesSection,StatusBadge}.dc.html
scripts/bundle-components.py, scripts/sync.py,
scripts/{normalize-svg,strip-c2pa,trim-svg}.py, svgo.config.mjs,
justfile, .editorconfig, .gitattributes, .claude/settings.json,
CODE_OF_CONDUCT.md, .githooks/pre-commit,
.github/workflows/{static,check-generated,check-vendored}.yml,
.github/dependabot.yml
```

Generated (`just bundle-components`): `site/components.js`. The `justfile`'s
`build` recipe renames `page.dc.html` to `index.html`
(`mv ... 2>/dev/null || true` — a no-op where there's no entry page, i.e. kit).

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
