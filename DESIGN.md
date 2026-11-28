---
name: Amr Sadat Abou Hegab Portfolio
description: Dark obsidian engineering portfolio with warm copper signal lines, hairline glass surfaces, and calibrated typography.
colors:
  kiln-copper: '#cc471b'
  kiln-copper-hover: '#dc5325'
  copper-glow: '#f2784b'
  copper-tint-ink: '#f69a76'
  copper-tint-bg: 'rgba(242, 120, 75, 0.14)'
  obsidian-canvas: '#0a0a0c'
  smoked-charcoal-top: '#161414'
  smoked-charcoal-bottom: '#100f10'
  surface-elevated: '#141213'
  surface-sheet: '#0e0d0f'
  surface-header: 'rgba(10, 10, 12, 0.82)'
  warm-alabaster: '#f8f6f4'
  stone-muted: '#a19c98'
  secondary-ink: '#efece9'
  secondary-bg: 'rgba(255, 255, 255, 0.048)'
  secondary-bg-hover: 'rgba(255, 255, 255, 0.09)'
  border-subtle: 'rgba(255, 255, 255, 0.085)'
  border-strong: 'rgba(255, 255, 255, 0.16)'
  success-dot: '#34d399'
  success-ink: '#6ee7b7'
  success-bg: 'rgba(52, 211, 153, 0.12)'
  warning-ink: '#fbbf24'
  warning-bg: 'rgba(251, 191, 36, 0.12)'
  error-ink: '#f87171'
  error-bg: 'rgba(248, 113, 113, 0.12)'
typography:
  display:
    fontFamily: "'Instrument Sans', 'Instrument Sans Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)'
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: '-0.022em'
  headline:
    fontFamily: "'Instrument Sans', 'Instrument Sans Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 'clamp(1.5rem, 2.6vw, 2rem)'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.012em'
  title:
    fontFamily: "'Instrument Sans', 'Instrument Sans Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '-0.002em'
  body:
    fontFamily: "'Instrument Sans', 'Instrument Sans Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.59
    letterSpacing: '0.008em'
  prose:
    fontFamily: "'Instrument Sans', 'Instrument Sans Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: '0.008em'
  label:
    fontFamily: "'JetBrains Mono', 'JetBrains Mono Fallback', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: '0.8125rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '0em'
rounded:
  badge: '6px'
  node: '8px'
  cta: '10px'
  card: '16px'
spacing:
  space-1: '4px'
  space-2: '8px'
  space-3: '12px'
  space-4: '16px'
  space-5: '20px'
  space-6: '24px'
  space-8: '32px'
  space-12: '48px'
  section: 'clamp(72px, 10vw, 128px)'
components:
  button-primary:
    backgroundColor: '{colors.kiln-copper}'
    textColor: '#ffffff'
    typography: '{typography.body}'
    rounded: '{rounded.cta}'
    padding: '0 24px'
    height: '44px'
  button-primary-hover:
    backgroundColor: '{colors.kiln-copper-hover}'
    textColor: '#ffffff'
  button-secondary:
    backgroundColor: '{colors.secondary-bg}'
    textColor: '{colors.secondary-ink}'
    typography: '{typography.body}'
    rounded: '{rounded.cta}'
    padding: '0 24px'
    height: '44px'
  button-secondary-hover:
    backgroundColor: '{colors.secondary-bg-hover}'
    textColor: '{colors.secondary-ink}'
  card-surface:
    backgroundColor: '{colors.smoked-charcoal-top}'
    textColor: '{colors.warm-alabaster}'
    rounded: '{rounded.card}'
    padding: '24px'
  badge-neutral:
    backgroundColor: '{colors.secondary-bg}'
    textColor: '{colors.stone-muted}'
    typography: '{typography.label}'
    rounded: '{rounded.badge}'
    padding: '4px 8px'
  badge-current:
    backgroundColor: '{colors.copper-tint-bg}'
    textColor: '{colors.copper-tint-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.badge}'
    padding: '4px 8px'
  nav-bar:
    backgroundColor: '{colors.surface-header}'
    textColor: '{colors.stone-muted}'
    height: '64px'
---

# Design System: Amr Sadat Abou Hegab Portfolio

## Overview

**Creative North Star: "The Copper-Etched Blueprint"**

This portfolio is built as a dark-obsidian engineering folio where structural clarity replaces ornament. Surfaces stay quiet and low-contrast on an Obsidian Canvas illuminated only by a restrained overhead copper glow and a faint, masked 24px drafting dot-grid. Every visual decision reinforces evidence-led engineering craft: generous vertical rhythm, warm neutral ink calibrated against halation, and hairline glass plates that hold experience and repository proof without competing with it.

Warm Copper is the single brand voice. It behaves like an etched signal line—anchoring primary calls to action, active navigation indicators, focus rings, and current-role tenure pills—while semantic green, amber, and red remain strictly reserved for real system states (availability, copy confirmation, in-progress badges, and errors). There is no logo or monogram; the full name set in `Instrument Sans` is the centered typographic centerpiece.

**Key Characteristics:**

- Dark obsidian ground with a warm overhead copper radial wash and subtle masked 24px dot-grid
- Warm-tinted neutral hierarchy (Obsidian Canvas, Smoked Charcoal plates, Warm Alabaster and Stone Muted ink)
- Single brand accent in Kiln Copper and Copper Glow, paired with strict semantic-only status tones
- Layered 1px specular hairline glass cards with flat-by-default tonal separation
- Self-hosted `Instrument Sans` + `JetBrains Mono` with optical tracking and leading lift for dark-mode legibility

## Colors

A warm-neutral dark palette anchored by Obsidian Canvas and Smoked Charcoal surfaces, punctuated by a single Kiln Copper / Copper Glow accent family and reserved system-state colors.

### Primary

- **Kiln Copper** (`--color-accent-fill`): Primary solid CTA fill and active navigation underline; paired with pure white text (`#ffffff`) and a vertical gradient top-lit by **Kiln Copper Hover** (`--color-accent-fill-hover`).
- **Copper Glow** (`--color-accent-text` / `--color-focus-ring`): High-contrast copper for inline links, role eyebrow, highlight bullet dots, repository URLs, and 2px keyboard focus outlines.
- **Copper Tint Ink & Surface** (`--color-accent-tint-ink` on `--color-accent-tint-bg`): Text selection highlight and current-role tenure pill, framed with a faint copper hairline border.

### Neutral

- **Obsidian Canvas** (`--color-bg`): Page background and scrollbar track.
- **Smoked Charcoal** (`--color-stage-start` to `--color-stage-end`): Subtle top-to-bottom vertical gradient used for Experience and Personal Project cards.
- **Elevated Surface & Mobile Sheet** (`--color-surface-elevated`, `--color-surface-sheet`): Secondary dark containers and the mobile navigation drawer.
- **Translucent Header** (`--color-surface-header`): Sticky top navigation backdrop with `12px` blur.
- **Warm Alabaster** (`--color-ink-primary`): Headings, primary labels, company names, and high-emphasis body copy.
- **Stone Muted** (`--color-ink-muted`): Prose paragraphs, summaries, capability lists, inactive nav links, and neutral badges.
- **Secondary Neutral Action** (`--color-secondary-bg`, `--color-secondary-bg-hover`, `--color-secondary-ink`): Ghost/neutral buttons, email mailto action, mobile menu button, and neutral stack tags.
- **Hairline Borders** (`--color-border-subtle`, `--color-border-strong`): Rest-state section dividers and card edges (`subtle`) stepping up on hover (`strong`).

### Semantic States

- **Success** (`--color-success-dot`, `--color-success-ink`, `--color-success-bg`): Live availability badge in the Hero and "Copied" confirmation state on the email copy button.
- **Warning** (`--color-warning-ink`, `--color-warning-bg`): "In Progress" project status badge and clipboard fallback notice.
- **Error** (`--color-error-ink`, `--color-error-bg`): Reserved strictly for real error states.

### Named Rules

**The Single-Accent Signal Rule.** Warm Copper is the only brand color; it is reserved for primary actions, active route/section state, focus rings, and current-role emphasis—never decorative fills or competing secondary brand hues.

**The Real-State Semantic Rule.** Green, amber, and red tokens appear only for real system states (availability, clipboard status, in-progress work, errors), never as decorative tags or category color-coding.

## Typography

**Display Font:** Instrument Sans (with metric-matched Instrument Sans Fallback and system sans)
**Body Font:** Instrument Sans (with metric-matched Instrument Sans Fallback and system sans)
**Label/Mono Font:** JetBrains Mono (with metric-matched JetBrains Mono Fallback and system monospace)

**Character:** Clean geometric-humanist sans-serif headlines paired with crisp, tabular monospace metadata. Both faces are self-hosted variable `WOFF2` fonts with optical tracking (`+0.008em`) and optical leading (`+0.04`) lifts applied globally to prevent light-on-dark halation.

### Hierarchy

- **Display** (`600`, `clamp(2.5rem, 5.5vw, 4.25rem)`, `1.06` line-height): Centered Hero name centerpiece only; balanced wrapping (`text-wrap: balance`).
- **Headline** (`600`, `clamp(1.5rem, 2.6vw, 2rem)`, `1.2` line-height): Section headings (`About`, `Experience`, `Personal Projects`, `Contact`); `h1` on inner pages scales via `--text-h1` (`clamp(2rem, 4vw, 3rem)`).
- **Title** (`600`, `1.25rem`, `1.3` line-height): Role titles, project names, and the Hero role subtitle (`500` weight in Copper Glow).
- **Body / Prose** (`400`, `1rem` UI at `1.59` line-height; `1.0625rem` prose at `1.72` line-height): Card summaries and narrative copy constrained to a `60ch–65ch` measure (`text-wrap: pretty`).
- **Label / Mono** (`400–600`, `0.875rem` / `0.8125rem` in `JetBrains Mono`, `tabular-nums`): Tenure ranges, stack tags, capability strip, status badges, email address action, and UTC location metadata.

### Named Rules

**The Anti-Halation Lift Rule.** Light ink on dark obsidian always carries the subtle optical tracking (`+0.008em`) and leading (`+0.04`) offset so dense prose never blooms or cramps.

**The Tabular Telemetry Rule.** Dates, tenure ranges, capability metrics, and technical metadata use `JetBrains Mono` with `font-variant-numeric: tabular-nums` so columns and badges align cleanly.

## Layout

Content lives inside a centered `1120px` max-width container (`--container-max`) with `20px` horizontal padding (`--space-5`) and generous vertical section cadence (`clamp(72px, 10vw, 128px)`), separated by `1px` subtle hairline top borders.

- **Spacing Scale:** Strict `4px` base grid (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`, `128px`).
- **Hero:** Centered single column capped at `780px` width; thesis copy capped at `60ch`.
- **Two-Column Asymmetric Sections (About & Contact):** `220px` left heading/TOC rail (`--toc-width`) paired with a `65ch` content column (`--prose-measure`) separated by `48px` horizontal gap; collapses to a single stack at `768px`.
- **Card Grids:** Experience uses a 2-column grid (`repeat(2, minmax(0, 1fr))` with `24px` gap); Personal Projects uses a 3-column grid (`repeat(3, minmax(0, 1fr))` with `24px` gap). Both collapse to a single column at `900px`.
- **Sticky Header:** Fixed `64px` height (`--nav-height`) with a 3-column desktop grid (`1fr auto 1fr`) keeping navigation links optically centered; switches to a right-aligned `Menu` drawer button at `768px`.

## Elevation & Depth

Depth is achieved through **layered specular glass**: surfaces sit flat-by-default on tonal contrast and `1px` subtle borders, catching a crisp `1px` inset top specular highlight (`rgba(255, 255, 255, 0.07–0.09)`) with `backdrop-filter: blur(12px)`. Ambient drop shadows are reserved for elevated cards rather than heavy floating panels.

### Shadow Vocabulary

- **Card Specular & Ambient** (`--shadow-card`): `inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 1px 2px rgba(0, 0, 0, 0.45), 0 12px 32px -8px rgba(0, 0, 0, 0.5)` — full elevated glass cards (`.surface-card`).
- **Top Specular Highlight** (`--surface-specular-highlight` / `--shadow-stage`): `inset 0 1px 0 rgba(255, 255, 255, 0.08)` — flat-by-default Experience and Project cards that brighten their border on hover.
- **Header Hairline** (`--shadow-header`): `0 1px 0 rgba(255, 255, 255, 0.07)` — subtle separation beneath the sticky translucent nav bar.

### Named Rules

**The Specular Hairline Rule.** Cards convey depth through a `1px` top-edge specular inset and subtle tonal gradient rather than bright drop shadows or neon glows.

## Shapes

Controlled, calm rounding scaled to element size:

- **Cards & Stages (`16px` / `--radius-card`):** Generously rounded glass plates for Experience roles and Personal Projects.
- **Primary & Secondary CTAs (`10px` / `--radius-cta`):** Crisp, approachable interactive buttons and mobile menu triggers.
- **Nodes (`8px` / `--radius-node`):** Medium structural blocks.
- **Badges, Stack Tags & Nav Links (`6px` / `--radius-badge`):** Compact rectangular chips for metadata, tenure pills, and hoverable nav targets.
- **Full Pill (`999px`):** Reserved strictly for tiny geometric accents—the `8px` availability status dot, `5px` highlight bullet dots, active nav underline bar, and scrollbar thumb.

## Components

Components prioritize restrained precision: every interactive control guarantees a `44px` minimum tap target, `150ms` transitions on `cubic-bezier(0.2, 0, 0, 1)`, and a `2px` Copper Glow `:focus-visible` outline offset by `3px`.

### Buttons

- **Shape:** Rounded CTA rectangle (`10px` radius), minimum `44px` height, `20px–24px` horizontal padding, `600` weight.
- **Primary:** Kiln Copper vertical gradient fill (`#dc5325` to `#bf3e14`, fallback `#cc471b`) with `#ffffff` text. Used for the Hero primary CTA and Contact "Copy email" button.
- **Hover / Focus:** Shifts cleanly to solid Kiln Copper Hover (`#dc5325`); focus shows `2px solid #f2784b` with `3px` offset.
- **Secondary:** Subtle translucent fill (`rgba(255, 255, 255, 0.048)`), `1px` subtle border, `#efece9` text; hover steps up background (`0.09`) and border (`0.16`). Used for secondary Hero CTAs, `mailto:` link (`JetBrains Mono`), and mobile Menu trigger.
- **Copied State:** Email copy button transitions to Success surface (`rgba(52, 211, 153, 0.12)`), Success ink (`#6ee7b7`), and `1px` `#34d399` border.

### Chips & Badges

- **Neutral Stack & Tenure Tag:** `JetBrains Mono` at `0.8125rem`, `4px 8px` padding, `6px` radius, `rgba(255, 255, 255, 0.048)` fill, `1px` subtle border, Stone Muted ink.
- **Current Role Pill:** Copper Tint background (`rgba(242, 120, 75, 0.14)`), Copper Tint ink (`#f69a76`), `1px` copper border (`rgba(242, 120, 75, 0.28)`), `600` weight.
- **Status Badges:** Availability pill uses Success tint + `8px` `#34d399` dot; "In Progress" project badge uses Warning tint + `#fbbf24` ink.

### Cards / Containers

- **Corner Style:** `16px` radius (`--radius-card`).
- **Background:** Smoked Charcoal vertical gradient (`#161414` → `#100f10`) with `backdrop-filter: blur(12px)`.
- **Shadow Strategy:** Top `1px` specular inset highlight at rest; hover strengthens border from `0.085` to `0.16` white. Interactive project link cards add a restrained `-2px` vertical lift and shift the external arrow glyph (`↗`) to Copper Glow (`translate(2px, -2px)`).
- **Internal Padding:** `24px` on desktop (`20px` below `768px`), with `16px` vertical gap and a `1px` subtle divider above the bottom stack-tag row on Experience cards.

### Navigation

- **Desktop:** `64px` sticky translucent header (`rgba(10, 10, 12, 0.82)` + `12px` blur), centered horizontal link list (`0.9375rem`, `500` weight, `44px` min-height). Active scroll-spy link turns Copper Glow (`#f2784b`) with a `2px` Kiln Copper bottom bar.
- **Mobile (`≤768px`):** Desktop links collapse into a right-aligned secondary `Menu` button opening the `#0e0d0f` mobile sheet (`--z-sheet: 60`).

## Do's and Don'ts

### Do:

- **Do** keep Warm Copper (`#cc471b` / `#f2784b`) as the sole brand accent, reserving green/amber/red strictly for real system states.
- **Do** maintain `44px` minimum hit targets and the `2px` `#f2784b` `:focus-visible` outline (`3px` offset) across all links and buttons.
- **Do** honor `prefers-reduced-motion: reduce` by eliminating hover transforms and collapsing transition durations to `0.01ms`.
- **Do** use `JetBrains Mono` with `tabular-nums` for dates, tenures, stack tags, and technical metadata.
- **Do** keep typography self-hosted (`Instrument Sans` + `JetBrains Mono` `WOFF2`) with zero runtime third-party font or API fetches.

### Don't:

- **Don't** introduce a logo, monogram, or decorative icon chrome in the header; the full name is the centerpiece.
- **Don't** add heavy neon glows, saturated gradients on cards, or competing secondary accent colors.
- **Don't** use pure `#000000` or pure `#ffffff` for body copy/surfaces (except text on solid copper CTAs); keep the warm-tinted Obsidian and Alabaster ink pair.
- **Don't** ship real product screenshots, proprietary internals, or unverified metrics that violate the NDA boundary.
