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

| Editable (owned here) | Vendored from kit — don't hand-edit |
| --- | --- |
| `site/data/*.js` (game data, FAQ, series order) | `site/components.js` (generated) |
| `site/page.dc.html` | every other `site/*.dc.html`, `site/support.js`, `site/_ds/` |
| | `site/images/ui/`, `site/images/platforms/`, `site/data/platform-icons.js` |
| | every `scripts/*.py`, `svgo.config.mjs`, `justfile` |
| | `.editorconfig`, `.gitattributes`, `.claude/settings.json`, `CODE_OF_CONDUCT.md` |
| | `.githooks/pre-commit`, most of `.github/` (see `sync.toml`) |

## Cross-repo sync

This repo owns nothing another repo pulls; it vendors almost everything
code-shaped from [`vertex-order/kit`](https://github.com/vertex-order/kit)
per [`sync.toml`](sync.toml) — see AGENTS.md/CONTRIBUTING.md in `platforms`
or `kit` for the full mechanics (`just sync` / `sync-check` / `sync-update`,
the three anti-hand-edit guards). `PlatformIcon.dc.html`, `platform-icons.js`,
and `images/platforms/` are vendored too, as of the platform-icon migration:
every inline platform-icon object in `site/data/series-*.js` (1,407 of them)
was rewritten to the canonical filenames/sizes/model in that same pass.

Not vendored, even though this repo needs its own:
`.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md` (repo-specific
Discussions URL) — seeded from kit's copies, kept locally.

## Build / preview / deploy

- No bundler, no Node for the site (the one-time `just trim-svg` needs it).
  `just serve` builds + serves the way CI does.
- Push to `main` = deploy (GitHub Actions runs `just build`, publishes to
  Pages). No manual export step.
- Recipes: see [`justfile`](justfile) — vendored from kit, same file byte-for-byte in every repo.
