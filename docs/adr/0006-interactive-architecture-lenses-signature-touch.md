---
status: accepted
---

# Interactive Architecture Diagram with Switchable Lenses (Data Flow Default)

The portfolio's signature interactive touch is an **interactive NDA-safe architecture diagram** embedded in each flagship **Case Study** using the **Lenses** pattern (Variant C from the issue #7 prototype), with **Data flow** selected by default on load.

Each diagram renders a token-driven **Daylight**/**Obsidian** schematic SVG paired with a compact segmented **Architecture Lens** bar standardized across both Case Studies (**Data flow** [default], **Structure**, **Resilience**, **Performance**). Switching a lens highlights the relevant system surfaces and edges, drops numbered copper callout badges onto those surfaces, displays the matching numbered architectural notes directly below the stage, and—on **Data flow**—animates subtle sequential copper packets along the active edges.

All motion stays **CSS-first plus lightweight native SVG/WAAPI** with no third-party motion library, and respects `prefers-reduced-motion` (disabling packet animation and callout pop-in while keeping highlights and notes instant).

## Considered Options

- **Variant A — Guided Walkthrough (stepper)**: Rejected because forcing linear Next/Previous clicks slows down Staff/Principal reviewers who want to scan the whole system at once before drilling into a single architectural concern.
- **Variant B — Explorable Map (hover/focus node inspector)**: Rejected because hiding architectural notes behind hover/click discovery risks reviewers missing key trade-offs, and the side-panel layout cramps the schematic on narrower viewports.
- **Live craft micro-demo, View Transitions teaser morph, or `⌘K` command palette**: Rejected for v1 to keep focus on one high-signal, domain-relevant signature touch rather than scattering interactive gadgets across the site.
- **Structure as the default lens**: Rejected in favor of **Data flow** as the initial lens so visitors immediately see the signature animated flow, numbered callouts, and architectural notes without having to click first.

## Consequences

- **No Framer Motion / Motion dependency needed**: ADR-0004's CSS-first motion commitment holds; the Lenses pattern runs purely on CSS transitions, native SVG geometry, and WAAPI/rAF gated on `prefers-reduced-motion`.
- **Consistent Case Study data contract**: Each flagship **Case Study** (SiliconExpert P5 Platform and IDEMIA Egypt) defines its schematic nodes, edges, and lens annotations as typed data, all strictly obeying the NDA boundary in ADR-0003.
- **Accessible by construction**: Lens controls are keyboard-operable segmented buttons (`aria-pressed`), numbered notes remain readable static text below the SVG, and reduced-motion users get the complete static highlight + callout view with zero lost information.
- **Primary source archived**: The throwaway 3-variant prototype is preserved on branch `prototype/issue-7-signature-touches` (commit `46fa2dd`) and excluded from `main`. The production React component will be written cleanly from scratch when building the Case Study routes.
