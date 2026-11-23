---
status: accepted
---

# Reverse-Chronological Experience Case Studies, NDA Redaction Boundary, and GitHub-Only Personal Projects

The portfolio splits proof of work into two sections: **Experience** (reverse-chronological career history with **SiliconExpert (P5 Platform)** first as the current role, **IDEMIA Egypt (Border Control, e-Visa & Immigration System)** second, and compact 1-line rows for earlier pre-IDEMIA roles) and **Personal Projects** (backed strictly by real public GitHub repositories with a concise summary, tech stack, and repo link). Both flagship roles inside **Experience** are structured as standardized 5-part NDA-safe **Case Studies** governed by an **Architecture-Public / Internals-Redacted** policy—naming the employer and public domain, sharing generalized architecture patterns, constraints, trade-offs, and directional outcomes, and replacing all proprietary UI screenshots with original **Daylight**/**Obsidian** schematic SVG diagrams. **Personal Projects** ships with three curated repositories—**`Ufuq`** (explicitly badged *In Progress*), **`angular-expert`**, and **`frontend-interview-prep`**—rather than newly fabricated portfolio mini-demos.

## Considered Options

- **Single unified "Projects" grid mixing enterprise systems and personal repos**: Rejected because enterprise architecture reads as opaque next to clickable apps, while focused open-source repos look thin beside multi-year platforms.
- **IDEMIA above SiliconExpert in Experience (matching Hero narrative order)**: Rejected because listing a previous employer above the current role (**SiliconExpert**) violates hiring-manager expectations for reverse-chronological career timelines; IDEMIA-first stays scoped to Hero/About positioning copy (ADR-0002 amended).
- **Blurred/recreated UI screenshots or stricter anonymization (hiding "P5 Platform" / "e-Visa")**: Rejected because recreated or blurred UI risks NDA friction in government and B2B domains and breaks Daylight/Obsidian visual purity, whereas hiding public domain names needlessly weakens Staff-level signal.
- **Hybrid or all-new custom live mini-demos in Personal Projects**: Rejected in favor of authentic, sustained GitHub repositories (`Ufuq`, `angular-expert`, `frontend-interview-prep`) with no throwaway portfolio toys; `shared-ui-angular`, `raunaq`, and `ng-libs` remain excluded for v1, and the `portfolio` repo stays in About/Colophon per ADR-0002.
- **Concise resume-bullet Experience without Case Studies, or omitting earlier roles**: Rejected because Staff/Principal reviewers need architectural trade-off depth on flagship systems, while compact earlier-role rows preserve the full 7+ year career arc without diluting the two flagships.

## Consequences

- Every flagship **Case Study** follows the 5-part Staff engineering anatomy: Context Strip, Problem & Constraints, Architectural Decisions & Trade-offs (with an original token-driven SVG diagram), Craft & Execution, and NDA-Safe Outcomes & Retrospective.
- **Strict NDA redaction contract**: Never publish real product UI screenshots, proprietary schemas/APIs/endpoints, internal repo or service names, specific government agency clients or deployments, biometric/security internals, or confidential revenue/traffic numbers.
- Exact tenure dates, IDEMIA job title, earlier pre-IDEMIA rows, and verified directional metrics remain explicit `[Verify from CV at copy pass]` placeholders until grounded directly from Amr's CV—no career facts or numbers may be fabricated.
- **`Ufuq`** must carry an honest **`In Progress`** status badge (reflecting active pre-launch development and pending trademark/domain clearance).
