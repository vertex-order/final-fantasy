# AGENTS.md

Guidance for AI coding tools working in a **full checkout** of this repo
(Cursor, Windsurf, Claude Code, Aider, …). Human contributors: read
[CONTRIBUTING.md](CONTRIBUTING.md) — it has the task-by-task guide.

> This file is **not** seen by browser-based design tools (Claude Design
> etc.), which pull in only the flat `site/` directory plus
> `.claude/CLAUDE.md`. Instructions for that environment live in
> [`.claude/CLAUDE.md`](.claude/CLAUDE.md) and the header comment of
> [`site/components.js`](site/components.js).

## The one rule that bites

`site/components.js` is a **generated build artifact** — it inlines every
sibling `site/*.dc.html` component. If you add, change, or remove any
`*.dc.html` (except `page.dc.html`), regenerate it:

```sh
just build          # or: just bundle-components  /  python3 scripts/bundle-components.py
```

The pre-commit hook in `.githooks/` also does this (run `just install-hooks`
once per clone), and CI
([`check-generated.yml`](.github/workflows/check-generated.yml)) fails any PR
where it's out of date. Never hand-edit `components.js`.

`page.dc.html` loads `components.js` **only over `file://`** — it's just the
fallback for opening the page straight off disk, where `fetch()` of sibling
`*.dc.html` is blocked. Over http(s) (`just serve`, Pages, any preview) the
runtime fetches each `*.dc.html` live, so a stale bundle never changes what
renders — it only needs regenerating to keep the committed file diff-clean.

## What's editable vs vendored

| Editable | Vendored / generated — don't hand-edit |
| --- | --- |
| `site/data/*.js` (game data, FAQ, series order) | `site/components.js` (generated) |
| `site/*.dc.html` (render components) | `site/support.js` |
| `site/page.dc.html` | `site/_ds/*/_ds_bundle.js`, `_ds_manifest.json` |
| `site/_ds/*/styles.css` (design tokens) | `_ds/*/_adherence.oxlintrc.json` |
| `site/images/` | |

## Build / preview / deploy

- No bundler, no Node. `just serve` builds + serves the way CI does.
- Push to `main` = deploy (GitHub Actions runs `just build`, publishes to
  Pages). No manual export step.
- Recipes: see [`justfile`](justfile).
