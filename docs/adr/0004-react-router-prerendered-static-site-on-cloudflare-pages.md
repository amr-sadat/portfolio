---
status: accepted
---

# React Router SPA, CSS-Module Tokens, and Cloudflare Pages Hosting

The portfolio is built with **React 19 + TypeScript (`strict`)** on **Vite** with **React Router v8 (library mode)** as a **client-side Single Page Application (SPA)** deployed as static assets (`dist/`) to **Cloudflare Pages**. There is no server runtime or SSR. Styling uses **CSS Modules over native CSS custom-property tokens**, with theming switched via `[data-theme="daylight|obsidian"]` on `<html>`. Motion is **CSS-first** (transitions, keyframes, View Transitions API, Web Animations API), always honoring `prefers-reduced-motion`. The static SPA build deploys to **Cloudflare Pages** (which automatically serves `index.html` for SPA client routes) with per-PR preview URLs. A GitHub Actions workflow gates every PR on typecheck, lint, tests, CSP verification, and E2E accessibility checks, and `main` auto-deploys to production. The site launches on `*.pages.dev` and moves to a custom domain (e.g. `amrsadat.dev`, availability checked at purchase) registered via Cloudflare Registrar before public launch.

## Considered Options

- **React Router v7 framework mode with build-time static pre-rendering**: Reconsidered and deferred in favor of a plain Vite + React Router library-mode SPA to keep the build pipeline, local preview, and route setup minimal and transparent without framework-mode build plugins.
- **Next.js static export**: Rejected as heavier and more framework-specific. It also leans toward Vercel hosting, while Vite + React Router library mode keeps the toolchain lean and standard.
- **Tailwind CSS v4**: Rejected in favor of CSS Modules + native custom properties. The bespoke visuals (pearl stages, layered shadows, hairline glass) and the ADR-0001 token contract for SVG diagrams are cleaner with a single framework-agnostic token file, which reinforces the framework-agnostic mastery signal of ADR-0002.
- **Motion (Framer Motion) as the default animation layer**: Rejected to protect bundle size and performance. It may be lazy-loaded only for a specific signature touch that truly needs layout/shared-element animation (decided in issue #7).
- **Vercel or GitHub Pages hosting**: Vercel was rejected for tighter free-tier limits and its Next.js lean. GitHub Pages was rejected for missing preview deploys and limited header/redirect control.
- **Cloudflare Web Analytics or GA4**: Rejected. v1 ships with **no analytics** of any kind.

## Consequences

- **No theme flash**: A tiny inline `<head>` script reads the persisted `localStorage` theme and sets `data-theme` before first paint. It defaults to `daylight` and never consults `prefers-color-scheme` (ADR-0001). The React theme toggle reads and writes the same attribute and storage key.
- **React Compiler is enabled**: Components rely on automatic memoization. Manual `useMemo`/`useCallback` is reserved for proven, measured cases.
- **Strict security headers from day one** via a Cloudflare `_headers` file: a strict CSP (the inline theme script is allowed by hash, not `unsafe-inline`), HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`. Any new third-party origin requires an explicit CSP change.
- **Tooling baseline**: **npm** (committed `package-lock.json`), Node LTS pinned in `.nvmrc`, ESLint (flat config) + Prettier, Vitest + React Testing Library for unit/component tests, and Playwright for a small smoke + axe accessibility suite.
- Everything must remain deployable as static files. Introducing a server runtime, backend, or SSR-on-request would reverse this ADR and the "no backend" scope boundary.
