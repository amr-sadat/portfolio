# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript (`strict`) on React Router v7 framework mode (Vite), every route pre-rendered to static HTML, CSS Modules over native CSS custom-property tokens, CSS-first motion, hosted on Cloudflare Pages. No backend, no analytics. See `docs/adr/0004-react-router-prerendered-static-site-on-cloudflare-pages.md`.

## Users

- **Primary**: hiring managers screening candidates for Senior / Staff Frontend (IC architecture track) roles, in Egypt or remote. They are short on time, often arrive from a LinkedIn or CV link, skim first, and decide in under a minute whether to read deeper.
- **Secondary**: staff and principal engineers on interview loops. They open a Case Study to judge architectural depth, trade-off reasoning, and craft.

## Product Purpose

A personal engineering portfolio for **Amr Sadat Abou Hegab**, a Senior Frontend Engineer with 7+ years of enterprise Angular (2–22). It presents national-scale and enterprise frontend architecture as evidence. Success means a hiring manager quickly reaches out, or forwards the site to an engineer who reads a Case Study and comes away convinced.

## Positioning

Systems-first frontend architecture proven on high-stakes production systems: the IDEMIA Egypt Border Control, e-Visa & Immigration System, then the SiliconExpert P5 Platform. Two further points support it: **AI-Augmented Engineering** (human-owned design and verification directing agentic tools) and a candid React + TypeScript build that shows the skills aren't tied to one framework. See `docs/adr/0002-systems-first-positioning-and-react-proof.md`.

## Operating Context

- Visitors read on desktop between meetings and on mobile from LinkedIn.
- The information architecture is a single-scroll home (Hero → About → Experience → Personal Projects → Contact → Footer Colophon) plus dedicated pages for the two Case Studies (`docs/adr/0005-hybrid-narrative-home-with-case-study-routes.md`).
- Visitors make contact by email (copy or mailto), LinkedIn, or GitHub. There is no contact form.

## Capabilities and Constraints

- Two authored visual modes: **Daylight** is the first-visit default, and **Obsidian** is the user-switched, persisted dark mode. Warm Copper is the only brand accent (`docs/adr/0001-daylight-default-and-unified-copper-identity.md`).
- English only in v1. No blog, CMS, backend, user accounts, or heavy 3D/WebGL scenes.
- NDA boundary "Architecture-Public / Internals-Redacted": no real product UI screenshots, no proprietary schemas or endpoints, no internal names, no named government clients, and no confidential numbers (`docs/adr/0003-experience-case-studies-nda-boundary-and-github-projects.md`).
- The site must stay a static deployment with a strict CSP. Live third-party API calls at runtime are not allowed.
- Undecided: typography and the spacing scale, the CV PDF itself, and the signature interactive touches (issue #7).

## Brand Commitments

- No logo or monogram. The full name **Amr Sadat Abou Hegab** is the centered typographic centerpiece.
- The voice is calm, first-person, and evidence-led.
- Canonical vocabulary lives in `GLOSSARY.md`: Daylight, Obsidian, AI-Augmented Engineering, Experience, Case Study, Personal Project, Colophon.
- Public contact is limited to Email, LinkedIn, GitHub, and `Egypt · UTC+2`. Never publish phone/WhatsApp, address, DOB, or military status.

## Evidence on Hand

- Flagship Case Studies: SiliconExpert (P5 Platform, current role) and IDEMIA Egypt (Border Control, e-Visa & Immigration).
- Personal Projects: `Ufuq` (In Progress), `angular-expert`, and `frontend-interview-prep`, all public at github.com/amr-sadat.
- **Absent and must not be fabricated**: exact tenure dates, the IDEMIA job title, earlier-role rows, metrics, testimonials, and star counts. All stay `[Verify from CV at copy pass]` until grounded in Amr's CV.

## Product Principles

1. **Evidence over adjectives**: every claim is backed by a system, a trade-off, or a public repo.
2. **Scannable first, deep on demand**: the home page reads in under a minute, and depth lives in the Case Studies.
3. **Craft is shown through restraint and precision**: performance, accessibility, and polish are part of the proof.
4. **NDA-safe by construction**: architecture is public, internals are redacted.

## Accessibility & Inclusion

WCAG 2.2 AA minimum, with AAA contrast for body text in both modes. All interactive touches respect `prefers-reduced-motion` and stay fully keyboard operable. Tap targets are at least 44px.
