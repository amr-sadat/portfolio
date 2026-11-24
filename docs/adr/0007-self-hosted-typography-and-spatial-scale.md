---
status: accepted
---

# Self-Hosted Variable Typography and 4px Spatial Scale

The portfolio pairs two self-hosted, Latin-subset variable `WOFF2` typefaces — **`Instrument Sans`** for the centered **`Amr Sadat Abou Hegab`** hero lockup, headings, UI controls, and Case Study prose, and **`JetBrains Mono`** strictly for technical identifiers, stack tags, `UTC+2`, and **Architecture Lens** schematic metadata — preloaded from `/fonts/` with metric-matched system fallbacks (`size-adjust` / `ascent-override`) and zero third-party font requests. Layout and rhythm run on a `4px` spacing ramp (`4`–`128px`), `clamp(72px, 10vw, 128px)` section cadence, a `1120px` max page container (`65ch` Case Study prose beside a `220px` sticky desktop table of contents), and a `768px` mobile navigation breakpoint.

## Considered Options

- **Runtime Google Fonts CDN**: Rejected because ADR-0004 enforces a strict zero-third-party CSP and static pre-rendering without external render-blocking requests or privacy-leaking font fetches.
- **Editorial serif display (`Newsreader`) + sans body + mono**: Rejected because adding a third font family increases font payload (~50% more bytes) and creates tonal friction with `10px` developer-tool CTA geometry and dense SVG **Architecture Lenses**.
- **Default geometric developer stacks (`Inter` or `Geist`)**: Rejected in favor of `Instrument Sans` so the typographic centerpiece **`Amr Sadat Abou Hegab`** carries warmer architectural character in **Daylight** without sacrificing crisp UI legibility.

## Consequences

- **Font budget**: Total self-hosted `WOFF2` payload stays under `75 KB` across both variable files, enforced in CI alongside a `< 90 KB` gzipped initial JS budget.
- **Role scale & optical dark-mode compensation**: Display hero uses `clamp(2.5rem, 5.5vw, 4.25rem)` (`-0.03em` tracking), H1 `clamp(2rem, 4vw, 3rem)`, H2 `clamp(1.5rem, 2.6vw, 2rem)`, H3 `1.25rem`, UI body `1rem` (`16px`), Case Study prose `1.0625rem` (`17px`), and mono/metadata `0.8125rem–0.875rem` (`tabular-nums`). `[data-theme="obsidian"]` applies subtle positive line-height and tracking compensation so light ink on `#0A0A0C` never halates.
- **Monospace restraint**: `JetBrains Mono` is reserved for code, technical stack tags, timestamps, and schematic labels — never used as decorative body or heading copy.
