---
status: accepted
---

# Hybrid Information Architecture: Single-Scroll Home with Dedicated Case Study Routes

The portfolio is a **hybrid**: a single-scroll narrative home page plus a dedicated pre-rendered page for each flagship **Case Study**.

The home page `/` runs in this order:

1. **Hero**: the centered name lockup, one primary copper button **View Experience**, and one secondary **Download CV** button that appears only once `/cv.pdf` exists.
2. **About**: the systems thesis plus the **AI-Augmented Engineering** pillar.
3. **Experience**: SiliconExpert and IDEMIA as **Case Study** teasers (company, role, dates, a one-sentence problem, 3 stack tags, **Read case study →**), followed by always-visible one-line rows for earlier roles.
4. **Personal Projects**: a 3-column grid on desktop and 1 column on mobile. Each card is fully clickable and opens the GitHub repo in a new tab.
5. **Contact**: Copy email with a "Copied" confirmation, a `mailto:` fallback, LinkedIn, GitHub, `Egypt · UTC+2`, and the gated Download CV link. There is no contact form.
6. **Footer**: carries a short **Colophon**.

Each Case Study lives at `/experience/siliconexpert` or `/experience/idemia`. The page opens with a "← Experience" back link and a Context Strip data row, then the numbered 5-part anatomy (ADR-0003). A sticky table of contents with scroll-spy sits beside the text on desktop and becomes a collapsible "On this page" control on mobile. The page ends with a link to the other Case Study and a short Contact prompt.

## Considered Options

- **Single long page with Case Studies expanding inline**: Rejected because two 5-part Case Studies would bury Personal Projects and Contact. Inline content also can't have its own shareable URL or Open Graph preview.
- **Full multi-page site (every section its own route)**: Rejected because hiring managers skim. One quick scroll gives them the whole picture, while depth stays one click away.
- **Contact form**: Rejected because v1 has no backend and keeps a strict CSP (ADR-0004). Copy email plus a `mailto:` fallback is lower friction for recruiters anyway.
- **Expandable or linked earlier-role rows**: Rejected. Earlier roles stay compact so they don't dilute the two flagships.
- **Live GitHub stats on project cards**: Rejected to avoid a runtime API call and keep the CSP strict.

## Consequences

- **The v1 route set is fixed**: `/`, `/experience/siliconexpert`, `/experience/idemia`, and a pre-rendered custom 404 page that links back to home and Experience. Home section anchors are `#experience`, `#projects`, `#about`, and `#contact`. Adding a route needs a new decision.
- **Navigation**: a slim sticky top bar with no logo (ADR-0002). On desktop it holds anchor links (*Experience · Projects · About · Contact*) that highlight as you scroll, plus the Daylight/Obsidian toggle. On mobile it shows only the theme toggle and a **Menu** button that opens a full-screen sheet; focus stays inside the sheet and Esc closes it. Case Study pages add the back link.
- **Mobile parity**: same section order, single column, nothing hidden. Tap targets are at least 44px, and anchor jumps leave room for the sticky bar (`scroll-margin-top`).
- **The CV is a gated slot**: the Download CV links in the Hero and Contact render only once a privacy-safe `/cv.pdf` exists. Producing that PDF is a separate follow-up decision.
- Case Study pages are the only place schematic SVG diagrams appear. Home page teasers stay text-only.
