# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript (`strict`) on Vite with React Router v8 (library mode) as a static-hosted SPA, CSS Modules over native CSS custom-property tokens, CSS-first motion, hosted on Cloudflare Pages. No backend, no analytics. See `docs/adr/0004-react-router-prerendered-static-site-on-cloudflare-pages.md`.

## Users

- **Primary**: hiring managers screening candidates for Senior / Staff Frontend (IC architecture track) roles, in Egypt or remote. They are short on time, often arrive from a LinkedIn or CV link, skim first, and decide in under a minute whether to read deeper.
- **Secondary**: staff and principal engineers on interview loops. They review the Experience highlights, Personal Projects, and interactive `/terminal` surface to judge architectural depth, trade-off reasoning, and craft.

## Product Purpose

A personal engineering portfolio for **Amr Sadat Abou Hegab**, a Senior Frontend Engineer with 7+ years of enterprise Angular (2–22). It presents national-scale and enterprise frontend architecture as evidence. Success means a hiring manager quickly reaches out, or forwards the site to an engineer who reviews the work and comes away convinced.

## Positioning

Systems-first frontend architecture proven on high-stakes production systems: the IDEMIA Egypt Border Control, e-Visa & Immigration System, then the SiliconExpert P5 Platform. Two further points support it: **AI-Augmented Engineering** (human-owned design and verification directing agentic tools) and a candid React + TypeScript build that shows the skills aren't tied to one framework. See `docs/adr/0002-systems-first-positioning-and-react-proof.md`.

## Operating Context

- Visitors read on desktop between meetings and on mobile from LinkedIn.
- The information architecture is a single-scroll home (`/`: Hero → About → Experience → Personal Projects → Contact → Footer Colophon) plus a standalone interactive terminal page (`/terminal`).
- Visitors make contact by email (copy or mailto), LinkedIn, or GitHub. There is no contact form.

## Capabilities and Constraints

- Two authored visual modes: **Daylight** is the first-visit default, and **Obsidian** is the user-switched, persisted dark mode. Warm Copper is the only brand accent (`docs/adr/0001-daylight-default-and-unified-copper-identity.md`).
- English only in v1. No blog, CMS, backend, user accounts, or heavy 3D/WebGL scenes.
- NDA boundary "Architecture-Public / Internals-Redacted": no real product UI screenshots, no proprietary schemas or endpoints, no internal names, no named government clients, and no confidential numbers (`docs/adr/0003-experience-case-studies-nda-boundary-and-github-projects.md`).
- The site must stay a static deployment with a strict CSP. Live third-party API calls or font fetches at runtime are not allowed.
- Self-hosted variable `WOFF2` typography (`Instrument Sans` + `JetBrains Mono`) on a `4px` spacing scale, `1120px` max container, and `768px` mobile nav breakpoint (`docs/adr/0007-self-hosted-typography-and-spatial-scale.md`).
- Dedicated `/terminal` route providing an interactive macOS-style terminal surface outside the main `AppShell`.
- Deferred out of the v1 app build: producing `/cv.pdf` (Hero and Contact reserve a gated Download CV slot that activates once `public/cv.pdf` is present).

## Brand Commitments

- No logo or monogram. The full name **Amr Sadat Abou Hegab** is the centered typographic centerpiece.
- The voice is calm, first-person, and evidence-led.
- Canonical vocabulary lives in `GLOSSARY.md`: Daylight, Obsidian, AI-Augmented Engineering, Experience, Personal Project, Colophon.
- Public contact is limited to Email, LinkedIn, GitHub, and `Egypt · UTC+2`. Never publish phone/WhatsApp, address, DOB, or military status.

## Evidence on Hand

- Verified Experience (`src/content/experience.ts`):
  - **SiliconExpert — P5 Platform**: Senior Front End Developer II (`Apr 2025 – Present`, current) and Senior Front End Developer I (`Jun 2022 – Mar 2025`).
  - **IDEMIA Egypt — Border Control, e-Visa & Immigration**: Senior Software Engineer (`May 2021 – May 2022`) and Junior Front End Developer (`Jul 2018 – Apr 2021`).
- Personal Projects (`src/content/projects.ts`): `Ufuq` (In Progress), `angular-expert`, and `frontend-interview-prep`, all public at `github.com/amr-sadat`.
- **Absent and must not be fabricated**: confidential metrics, testimonials, star counts, and `/cv.pdf` (deferred until `public/cv.pdf` is present). Do not invent unverified metrics or claims.

## Product Principles

1. **Evidence over adjectives**: every claim is backed by a system, a trade-off, or a public repo.
2. **Scannable first, deep on demand**: the home page reads in under a minute, with deeper architectural detail in the Experience highlights and public repositories.
3. **Craft is shown through restraint and precision**: performance, accessibility, and polish are part of the proof.
4. **NDA-safe by construction**: architecture is public, internals are redacted.

## Accessibility & Inclusion

WCAG 2.2 AA minimum, with AAA contrast for body text in both modes. All interactive touches respect `prefers-reduced-motion` and stay fully keyboard operable. Tap targets are at least 44px.
