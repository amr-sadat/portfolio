---
status: accepted
---

# Daylight-Default Visual Identity and Unified Warm Copper System

The portfolio ships with two authored themes — **Daylight** (sunlit white surfaces with sculpted pearl stages and soft multi-layered shadows) and **Obsidian** (neutral-warm carbon surfaces with subtle warm-copper radial lighting, a masked dot-grid, and specular 1px glass elevation) — unified by **Warm Copper** as the sole chromatic brand accent and consistent `10px` rounded-rectangle CTA geometry. First-time visitors always land in **Daylight** regardless of OS `prefers-color-scheme`, while manual theme switches persist in `localStorage`, ensuring every hiring manager experiences the flagship identity first without sacrificing dark-mode comfort.

## Considered Options

- **Follow OS `prefers-color-scheme` on first visit**: Rejected so dark-OS visitors still experience the intended Daylight editorial impression first; switching to Obsidian remains one click away and persists.
- **Unified Precision Cobalt or Dual Day/Night accents (Copper in Daylight, Cobalt in Obsidian)**: Rejected because Unified Warm Copper avoids framework-coded hues (Angular crimson, React cyan) and generic AI-purple/blue developer clichés while keeping brand identity unmistakable across theme switches.
- **Pill CTAs (`rounded-full`)**: Rejected in favor of `10px` rounded-rectangle CTAs across both modes for a sharper developer-tool feel and zero shape jumping on theme toggle.

## Consequences

- Custom architectural SVG diagrams, interactive micro-demos, and any future downloadable CV must consume the semantic Daylight/Obsidian token contract rather than hardcoded colors.
- Elevation is mode-adaptive by design: future edits must not add heavy borders or background grids to Daylight, nor replace Obsidian's hairline glass with flat drop shadows.
- Semantic colors (Emerald, Amber, Muted Red) are reserved strictly for real system states (availability, notes, validation errors) and never used decoratively.
