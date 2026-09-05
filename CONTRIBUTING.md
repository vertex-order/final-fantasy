# Contributing

PRs welcome — no Claude Design account or any special tooling needed. The
site is plain HTML/CSS/JS; see [docs/EDITING.md](docs/EDITING.md) for where
things live and how to preview changes locally.

## Workflow

1. Fork, branch off `main`.
2. Edit under `site/` (game data in `data/series-*.js`, page copy in
   `page.dc.html`, styling in `_ds/nocturne-.../styles.css`).
3. Preview locally (`python -m http.server` from `site/`, see EDITING.md).
4. Open a PR against `main`. Merging deploys automatically — see
   [docs/DEPLOY.md](docs/DEPLOY.md).

## Scope

- Game data corrections/additions (release dates, platforms, links,
  descriptions): straightforward, edit the relevant entry in
  `site/data/series-<slug>.js`.
- New images/icons: add to `site/images/platforms/`, reference by relative path.
- Design-system files under `_ds/` (`_ds_bundle.js`, `_ds_manifest.json`,
  `_adherence.oxlintrc.json`) are vendored — please don't hand-edit them;
  open an issue instead if something there needs to change.
