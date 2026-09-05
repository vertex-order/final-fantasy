# Deploying

Every push to `main` runs [`.github/workflows/static.yml`](../.github/workflows/static.yml),
which:

1. Checks out the repo.
2. Installs [`just`](https://github.com/casey/just) and runs `just build`,
   which copies `site/` into a gitignored `build/` folder and renames
   `build/page.dc.html` to `build/index.html` (GitHub Pages needs an
   `index.html` at the root — every other path in the file is already
   relative, so nothing else changes). Same recipe you can run locally.
3. Uploads `build/` as the Pages artifact and deploys it.

That's the entire build: no bundler, no dependencies, no manual "export"
step. Merging a PR to `main` is the deploy. See the `justfile` at the repo
root for the `build`/`serve`/`clean` recipes.

## Verifying a deploy

Check the **Actions** tab for the workflow run, or the environment URL shown
under **Settings → Pages**.

## First-time setup (if not already done)

**Settings → Pages → Build and deployment → Source** must be set to
**GitHub Actions** (not "Deploy from a branch").
