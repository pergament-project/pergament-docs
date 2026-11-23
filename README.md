# Pergament documentation site

The official documentation site for [Pergament](https://github.com/pergament-project/pergament),
a quiet reader for `.jwpub` publications. Published at
<https://pergament-project.github.io/pergament-docs/>.

## Development

```sh
nix develop     # node 22 + bun, from flake.nix
bun run dev     # dev server on http://localhost:5173/pergament-docs/
bun run build   # static build to dist/ (for GitHub Pages)
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds `dist/`
with the Nix dev shell and publishes it to GitHub Pages
(source must be set to "GitHub Actions" in the repo settings).

## Structure

- `src/pages/` — one component per wiki page (Install, Contribute, Translating,
  `.jwpub` format, Features, Command line, Sync, Before you use it, …)
- `src/data/nav.ts` — the wiki navigation tree
- `src/components/ui/` — shadcn-style primitives on the Tailwind v4 "Ink & amber"
  palette shared with the app
- `public/screenshots/` — invented-content screenshots from `pergament/docs/screenshots/`

The site is unofficial and not affiliated with or endorsed by Jehovah's Witnesses
or the Watch Tower Bible and Tract Society.
