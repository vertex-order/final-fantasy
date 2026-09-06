## Regenerating components.js

Tool-neutral version of this note (won't get lost if this project moves to
another AI design tool): `COMPONENTS_BUILD.md` at the project root.

The repo's own tool-agnostic instructions live in `docs/EDITING.md` (see the
"Files" and "If you use Claude Design" sections) — read that from GitHub if
unsure. `site/components.js` is a derived build artifact produced by
`scripts/bundle-components.py` (`just build` / pre-commit). If you can
invoke that script (a human, or an agent with shell/CLI access), just run
it — `python3 scripts/bundle-components.py` — and skip the rest of this
note. This environment cannot run that script, so when a `.dc.html`
component other than `page.dc.html` is added/changed, reproduce its exact
output by hand with `run_script` — read every sibling `*.dc.html`,
JSON-stringify each, and write:

```
window.__resourceBlobs = window.__resourceBlobs || {};
window.__resourceBlobs["./ComponentName.dc.html"] = new Blob([source], { type: "text/html" });
```

One entry per sibling `*.dc.html` file (excluding `page.dc.html`), keyed by
`"./" + filename`. Do NOT invent a different global name or shape (e.g.
`window.__dcComponents`) — that silently no-ops since nothing reads it.
