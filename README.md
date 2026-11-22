# UIForge Documentation & Live Component Playground

Official bilingual (VI / EN) documentation and interactive component playground for **UIForge Enterprise Low-Code Framework** (`@kietvpt/uiforge-core` + `UIForge.Core` .NET 8).

## Tech Stack
- **Vite 5 + React 18 + TypeScript**
- **Tailwind CSS v4** (Light / Dark Developer Studio theme)
- **MDX** (`@mdx-js/rollup` + `remark-gfm`)
- **Live Core Package**: `@kietvpt/uiforge-core` installed directly from GitHub Packages

## Local Development

1. Configure GitHub Packages auth in `~/.npmrc` (see `.npmrc.example`):
   ```ini
   @kietvpt:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
   ```
2. Install & run:
   ```bash
   npm install
   npm run dev
   ```
3. Production build:
   ```bash
   npm run build
   ```

## Deploying to Vercel
Add Environment Variable `GITHUB_TOKEN` (PAT with `read:packages`) in Vercel Project Settings, and copy `.npmrc.example` to `.npmrc` (using `${GITHUB_TOKEN}` — never hardcode the raw token).

## Adding / Updating Documentation
- **New Component**: Add an entry in `src/registry/components/<category>.ts`. It automatically appears in Sidebar, `Ctrl+K` Search, Props Table, and Live Interactive Playground!
- **New Guide / Engine / Backend Page**: Add a page entry in `src/content/` and register it in `src/registry/navigation.ts`.
