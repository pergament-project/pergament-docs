# Pergament wiki website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended) or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A new Pergament website at `pergament-project.github.io/pergament/`, built as a static React/Tailwind/shadcn docs site in the `pergament-docs/` repo, with a complete wiki covering getting started, install, releases, contributing, translating, the `.jwpub` format, features, command line, sync, and "before you use it".

**Architecture:** Vite + React + Tailwind CSS v4 + shadcn/ui components, statically built to `dist/` and deployed to GitHub Pages via a workflow. Mirrors the `pergament/` app stack (same UI component conventions, light/dark tokens, `lucide-react` icons). Content lives as React page components with markdown body text; a shared sidebar nav drives all pages. Nix dev shell provides `nodejs_22` + `bun` for local dev.

**Tech Stack:** Vite, React 19, Tailwind CSS v4, shadcn/ui primitives, lucide-react, TypeScript, bun, Nix dev shell, GitHub Pages.

**Spec:** This plan is the spec; content is sourced from `pergament-docs/index.md`, `README.md`, `_config.yml`, and `pergament/docs/` (README.md, CONTRIBUTING.md, TRANSLATING.md, FORMAT.md, screenshots).

## Global Constraints

- Stack: Vite + React + Tailwind v4 + shadcn/ui + TypeScript, matching `pergament/ui/` conventions.
- Dev/build via Nix: `nix develop` provides `nodejs_22` and `bun` (mirror `pergament/flake.nix`).
- Static build output for GitHub Pages; served from the `pergament-docs` repo's `main` branch.
- Light/dark theme mirroring the app's surface/line/muted/accent tokens.
- All screenshots and body text must be invented (no real publication text/artwork), per `pergament/CONTRIBUTING.md` screenshot rule.
- `pergament-docs/` is its own repo (`pergament-project/pergament-docs`), branch `main`, origin `git@github.com:pergament-project/pergament-docs.git`.
- Nothing is pushed until the human views the site locally on `localhost` and approves.

## Review Focus

- Broken internal links between wiki pages — every `href` must resolve to an existing page.
- Missing screenshots referenced on pages — every image must exist under `public/` or be omitted.
- Dark/light theme toggle actually swaps `class="dark"` on `<html>` and the tokens follow.
- Mobile nav (sidebar hidden below a breakpoint) opens/closes and doesn't trap focus.
- The build (`bun run build`) produces a static `dist/` with no dev-server-only dependencies.

---

### Task 1: Scaffold the Vite + React site and Nix dev shell

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `flake.nix`
- Create: `.envrc`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing (new repo root scaffolding).
- Produces: a working dev shell (`nix develop`) and `bun run dev` serving on `localhost:5173`.

- [ ] **Step 1: Write `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `flake.nix`, `.envrc`, `.gitignore`**

```json
{
  "name": "pergament-docs",
  "private": true,
  "license": "GPL-3.0-only",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "lint": "tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.508.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "tailwind-merge": "^3.7.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3",
    "vite": "^8.3.2"
  }
}
```

- [ ] **Step 2: Run `nix develop` then `bun install`**

Run: `nix develop` then `bun install`
Expected: installs without error; `node_modules` present.

- [ ] **Step 3: Verify dev server starts**

Run: `bun run dev` (in background), then curl `http://localhost:5173`
Expected: HTTP 200 with the Vite/React shell.

- [ ] **Step 5: Commit**

```bash
git add package.json vite.config.ts tsconfig.json index.html flake.nix .envrc .gitignore
git commit -m "feat(docs): scaffold Vite + React site with Nix dev shell"
```

---

### Task 2: Add shadcn/ui primitives and shared UI lib

**Files:**
- Create: `src/lib/utils.ts` (`cn()` helper)
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/scroll-area.tsx`
- Create: `src/components/ui/dropdown-menu.tsx`

**Interfaces:**
- Consumes: `tailwind-merge`, `clsx`, `class-variance-authority`, `lucide-react`, Radix primitives (install as needed).
- Produces: reusable `Button`, `Card`, `Separator`, `ScrollArea`, `DropdownMenu` components following `pergament/ui/src/components/ui/` conventions.

- [ ] **Step 1: Write `src/lib/utils.ts` with `cn(...)`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

- [ ] **Step 2: Write each shadcn primitive** (`button`, `card`, `separator`, `scroll-area`, `dropdown-menu`) using Tailwind v4 classes and `cn()`, copied in style from `pergament/ui/src/components/ui/button.tsx` etc.

- [ ] **Step 3: Run `bun run lint`**

Run: `bun run lint`
Expected: no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/utils.ts src/components/ui/
git commit -m "feat(docs): add shadcn/ui primitives"
```

---

### Task 3: Theme provider and app layout shell

**Files:**
- Create: `src/lib/theme.ts`
- Create: `src/app.tsx`
- Create: `src/main.tsx`
- Create: `src/index.css` (Tailwind v4 + CSS tokens)
- Modify: `index.html` (point to `/src/main.tsx`)

**Interfaces:**
- Consumes: shadcn primitives from Task 2.
- Produces: `AppProvider` (theme dark/light, `class="dark"` on `<html>`), `AppBar`, `Rail`/`Sidebar`, `PageLayout`, and the root router rendering pages.

- [ ] **Step 1: Write `src/index.css` with Tailwind v4 directives and CSS variables** (`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--radius`), mirroring the app's light/dark surface tokens.

- [ ] **Step 2: Write `src/lib/theme.ts`** — `useTheme()` hook toggling `document.documentElement.classList.toggle("dark")` and `colorScheme`, persisted to `localStorage` key `pergament-theme`.

- [ ] **Step 3: Write `src/main.tsx` and `src/app.tsx`** — `AppProvider` wrapping a `PageLayout` with a top `AppBar` (Pergament logo/link, theme toggle, nav links) and a `Sidebar` (collapsed on mobile), rendering the current page by route.

- [ ] **Step 4: Verify the shell renders** — `bun run dev`, open `localhost:5173`, confirm light/dark toggle swaps theme and the shell shows.

- [ ] **Step 5: Commit**

```bash
git add src/lib/theme.ts src/app.tsx src/main.tsx src/index.css index.html
git commit -m "feat(docs): add theme provider and app layout shell"
```

---

### Task 4: Navigation data model and sidebar

**Files:**
- Create: `src/data/nav.ts`
- Create: `src/components/layout/sidebar.tsx`
- Create: `src/components/layout/app-bar.tsx`

**Interfaces:**
- Consumes: `Button`, `ScrollArea` from Task 2; theme from Task 3.
- Produces: `NAV` — array of `{ label, href, items?: [{ label, href }] }` defining the wiki structure, rendered by `Sidebar` and `AppBar`.

**Nav structure:**
- Home (`/`)
- Get started
  - Install (`/get-started/install`)
  - Releases (`/get-started/releases`)
  - Report a bug / suggest a feature (`/get-started/issues`)
- Contribute (`/contribute`)
- Translating (`/translating`)
- `.jwpub` format (`/format`)
- Features (`/features`)
- Command line (`/command-line`)
- Sync between computers (`/sync`)
- Before you use it (`/before-you-use-it`)

- [ ] **Step 1: Write `src/data/nav.ts`** with the full nav tree above, each entry with `label` and `href`.

- [ ] **Step 2: Write `Sidebar`** — renders `NAV` as a link list, highlights the active route (matches `window.location.pathname`), collapses to icons-only below a breakpoint, uses `ScrollArea`.

- [ ] **Step 3: Write `AppBar`** — "Pergament" link to `/`, theme toggle, nav links, and a mobile menu button that opens the sidebar.

- [ ] **Step 4: Wire into `App`** and verify navigation highlights the active page and the sidebar collapses on narrow widths.

- [ ] **Step 5: Commit**

```bash
git add src/data/nav.ts src/components/layout/
git commit -m "feat(docs): add wiki navigation and sidebar"
```

---

### Task 5: Page components (content)

**Files:**
- Create: `src/pages/home.tsx`
- Create: `src/pages/get-started.tsx`
- Create: `src/pages/get-started/install.tsx`
- Create: `src/pages/get-started/releases.tsx`
- Create: `src/pages/get-started/issues.tsx`
- Create: `src/pages/contribute.tsx`
- Create: `src/pages/translating.tsx`
- Create: `src/pages/format.tsx`
- Create: `src/pages/features.tsx`
- Create: `src/pages/command-line.tsx`
- Create: `src/pages/sync.tsx`
- Create: `src/pages/before-you-use-it.tsx`
- Create: `src/pages/not-found.tsx`
- Create: `src/components/layout/page.tsx` (page wrapper with `PageHeader` + content area)

**Interfaces:**
- Consumes: `NAV` from Task 4, `Card`, `Separator` from Task 2, theme from Task 3.
- Produces: one React component per wiki page with the markdown body converted to JSX (headings, lists, links, code blocks, tables, screenshots as ``), plus a 404 page.

- [ ] **Step 1: Write `PageHeader` + `Page` wrapper** — section title, optional description, bordered content area with max-width and reading measure.

- [ ] **Step 2: Write each page component** — body text from the source docs (`index.md`, `README.md`, `CONTRIBUTING.md`, `TRANSLATING.md`, `FORMAT.md`, `pergament/README.md`), converted to JSX:
  - `home.tsx`: what Pergament is, feature teases, links to install/releases/contribute.
  - `get-started.tsx`: index of install / releases / issues.
  - `get-started/install.tsx`: Windows, Linux (deb/rpm/AppImage/flatpak/zip), Mac, Nix, from source — exactly as in `pergament/README.md` "Install".
  - `get-started/releases.tsx`: link to releases page, SHA-256 verification note.
  - `get-started/issues.tsx`: link to GitHub issues new/choose.
  - `contribute.tsx`: PR workflow, conventional commits, running from source, checks, screenshots rule.
  - `translating.tsx`: interface languages, how to add a language, `bun run i18n` checks.
  - `format.tsx`: `.jwpub` format summary — container, manifest, contents, SQLite schema, content encoding (AES-128-CBC + zlib), download services, user data/backups, markdown export. Condensed from `docs/FORMAT.md` but complete.
  - `features.tsx`: Home, Bible, Library, Search, Meetings, Personal Study, Bookmarks, Backups, Settings — from `pergament/README.md` "Features".
  - `command-line.tsx`: `pergament import`, `list`, `show`, `grep`, `search`, `download` with examples.
  - `sync.tsx`: automatic backups and sync via Nextcloud/Syncthing/Dropbox, deletions, conflicts, stop syncing.
  - `before-you-use-it.tsx`: unofficial disclaimer, own publications only, clean-room, encryption note, free/non-commercial/no telemetry, no warranty.
  - `not-found.tsx`: 404 with a link back to Home.

- [ ] **Step 3: Add screenshots** — copy `pergament/docs/screenshots/*.png` into `public/screenshots/` and reference them on the relevant pages (Home, Features). All invented content, per project rule.

- [ ] **Step 4: Add internal links** — every cross-reference between pages uses the `href`s from `NAV`; verify none are broken.

- [ ] **Step 5: Verify all pages render** — `bun run dev`, click through every nav link, confirm each page loads and the 404 page works for a bogus URL.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ src/components/layout/page.tsx public/screenshots/
git commit -m "feat(docs): add wiki page components"
```

---

### Task 6: Static build, GitHub Pages deploy, and local preview

**Files:**
- Create: `vite.config.ts` (build `outDir`, base path `/pergament/`)
- Create: `.github/workflows/deploy.yml`
- Create: `public/404.html` (optional SPA fallback)
- Modify: `package.json` (add `preview` script)

**Interfaces:**
- Consumes: all pages from Task 5.
- Produces: `dist/` static build and a GitHub Pages workflow that deploys `dist/` to `main` (or `gh-pages`).

- [ ] **Step 1: Configure Vite build** — `build.outDir = "dist"`, `build.emptyOutDir = true`, `base = "/pergament/"` (GitHub Pages project site), SSR off.

- [ ] **Step 2: Add `preview` script** and verify `bun run build && bun run preview` serves `dist/` correctly.

- [ ] **Step 3: Write `.github/workflows/deploy.yml`** — on push to `main`, run `nix develop` + `bun install` + `bun run build`, deploy `dist/` to GitHub Pages (`actions/deploy-pages` or `peaceiris/actions-gh-pages`).

- [ ] **Step 4: Verify build has no errors** — `bun run build` exits 0 and `dist/` contains `index.html` and assets.

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts .github/workflows/deploy.yml package.json
git commit -m "feat(docs): static build and GitHub Pages deploy"
```

---

### Task 7: Local review and push

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Full local review** — `nix develop`, `bun install`, `bun run dev`, browse every page on `localhost:5173`, check light/dark toggle, mobile nav, all internal links, all images, and the 404 page. Report any issues to the human partner.

- [ ] **Step 2: On approval, push** — `git push origin main` (GitHub Pages deploys automatically).

```bash
git push origin main
```

Expected: site live at `https://pergament-project.github.io/pergament/`.

---

## Self-review against the design

1. **Spec coverage:** All wiki sections from the source docs map to a page task (Task 5). Nav structure (Task 4) covers every page. Build/deploy (Task 6) covers the "new site" goal. Review/local view (Task 7) covers "let me view before pushing."
2. **Step scan:** Each step writes exactly one reasonable thing (a file, a command with a checkable result). No TBD lines.
3. **Type consistency:** `cn()`, `Button`, `Card`, `NAV`, page components all use the same signatures across tasks.
4. **Review Focus:** broken links, missing screenshots, theme toggle, mobile nav, static build — each has a verification step in its owning task.
5. **Proportion:** The plan is proportional to the spec (a static wiki); bodies are signatures + assertions, not full code.

Plan complete and saved to `docs/superpowers/plans/2026-11-23-pergament-wiki.md`. Please review the plan. Does it capture what you want?

**Execution approach:** Since you've said "yes pls" and want to view the site before pushing, I'll implement every task myself (Native execution) in this session, then hand you the locally-running site for review before anything is pushed. That keeps the review gate exactly where you want it.

Shall I start implementing Task 1?