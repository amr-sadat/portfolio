import { UNVERIFIED_CV_MARKER } from '../profile';
import { siliconExpertSchematic } from './schematics';
import { ARCHITECTURE_LENSES, type CaseStudy } from './types';

export const siliconExpertCaseStudy: CaseStudy = {
  id: 'siliconexpert',
  company: 'SiliconExpert',
  system: 'P5 Platform',
  title: 'SiliconExpert — P5 Platform',
  subtitle:
    'Modernizing high-density electronics supply-chain workflows with deterministic Signals state, Clean Architecture boundaries, and sustained render performance.',
  ndaNotice:
    'Architecture-Public / Internals-Redacted: proprietary schemas, internal endpoints, service names, and confidential metrics are intentionally omitted.',
  contextStrip: {
    role: 'Senior Front End Developer II',
    tenure: UNVERIFIED_CV_MARKER,
    scaleSignals: [
      'Global electronics supply-chain & component intelligence',
      'High-density enterprise data workflows',
      'Multi-feature production frontend',
    ],
    coreStack: ['Angular', 'Signals', 'NgRx Signal Store', 'RxJS', 'TypeScript', 'SSR'],
  },
  diagram: {
    id: 'siliconexpert',
    title: siliconExpertSchematic.title,
    caption: siliconExpertSchematic.caption,
    lenses: ARCHITECTURE_LENSES,
  },
  schematic: siliconExpertSchematic,
  sections: {
    context: {
      id: 'context',
      number: '01',
      title: 'Context & System Scope',
      paragraphs: [
        'SiliconExpert’s P5 Platform supports global electronics supply-chain teams who evaluate component lifecycle risk, parametric specifications, compliance posture, and sourcing alternatives across dense enterprise datasets. On the frontend, that translates into data-heavy workspaces where engineers filter, compare, and act on large tables and linked detail views without losing context.',
        'As a Senior Front End Developer II, I have focused on evolving the frontend architecture so feature teams can ship complex component-intelligence workflows predictably—improving reactive state clarity, render responsiveness, and shared UI and testing standards without disrupting active production delivery.',
      ],
    },
    problem: {
      id: 'problem',
      number: '02',
      title: 'Problem & Constraints',
      paragraphs: [
        'Enterprise supply-chain interfaces accumulate state quickly: multi-facet filters, table selections, asynchronous enrichment responses, and cross-panel synchronization all compete for the same rendering budget. Over time, implicit state coupling and broad change-detection sweeps turn routine feature additions into subtle performance regressions.',
        'Modernization had to happen incrementally inside a live enterprise platform. Big-bang rewrites were off the table, and every architectural shift needed to preserve backward compatibility with existing RxJS pipelines, server-side rendering constraints, and multi-team delivery velocity.',
      ],
      constraints: [
        'Dense parametric tables and multi-panel workflows that must stay responsive during rapid filtering, sorting, and selection.',
        'Incremental coexistence between legacy RxJS streams and modern Angular Signals / NgRx Signal Store boundaries.',
        'Server-side rendering (SSR) and hydration consistency without leaking browser-only assumptions into shared modules.',
        'Shared component and testing standards that multiple engineers can adopt without steep ceremony.',
      ],
    },
    architecture: {
      id: 'architecture',
      number: '03',
      title: 'Architectural Decisions & Trade-offs',
      intro:
        'Rather than treating modernization as a framework-upgrade checklist, I anchored changes around three structural seams: reactive state ownership, Clean Architecture boundaries, and render/virtualization budgets.',
      tradeoffs: [
        {
          id: 'signals-and-rxjs-boundary',
          title: 'Incremental Signals & NgRx Signal Store alongside RxJS',
          decision:
            'Adopted Angular Signals and NgRx Signal Store for synchronous UI state, derived view models, and local workspace coordination, while keeping RxJS focused on asynchronous orchestration such as cancellation, debounced queries, and race-safe request streams.',
          tradeoff:
            'Maintaining an explicit interop boundary between Signals and Observables requires clear team conventions, but it avoids the risk and delivery freeze of rewriting proven async pipelines all at once.',
        },
        {
          id: 'clean-architecture-seams',
          title: 'Clean Architecture feature boundaries',
          decision:
            'Separated domain models, application-level state/use-cases, and presentational UI components behind narrow TypeScript contracts so data-fetching and business rules stay decoupled from Angular view templates.',
          tradeoff:
            'Adds modest upfront file structure and explicit mapping layers for simple screens, yet pays back rapidly when API shapes evolve or when teams test workflow logic without mounting heavy view trees.',
        },
        {
          id: 'ssr-and-virtualization',
          title: 'SSR discipline and virtualized high-density rendering',
          decision:
            'Constrained DOM growth in high-density views through virtualization, fine-grained change detection, and hydration-safe browser guards so initial render and subsequent interactions stay predictable.',
          tradeoff:
            'Virtualization imposes stricter row-measurement and layout contracts than naive lists, so we reserved it for genuinely dense surfaces while keeping standard semantic markup for smaller views.',
        },
      ],
    },
    craft: {
      id: 'craft',
      number: '04',
      title: 'Craft & Execution',
      paragraphs: [
        'Architecture only holds if everyday execution makes the right path easy. I worked on reusable UI primitives, strict TypeScript interfaces, and focused unit/component testing patterns so common enterprise interactions—loading states, empty states, keyboard navigation, and error recovery—behave consistently across workflows.',
        'I also integrated AI-Augmented Engineering into daily delivery using Claude Code, Devin AI, and OpenCode. Human ownership stays firmly on system design, Clean Architecture boundaries, explicit specifications, code review, and automated verification, while agentic tools accelerate well-scoped refactors, test scaffolding, and repetitive migration work.',
      ],
      practices: [
        'Reusable UI building blocks with predictable accessibility, keyboard handling, and narrow prop contracts.',
        'Focused unit and integration testing around state stores and workflow seams rather than brittle DOM snapshots.',
        'Explicit SSR safety checks and render-profiling habits before merging changes to data-dense views.',
        'AI-Augmented Engineering workflows (Claude Code, Devin AI, OpenCode) governed by human-authored specs and strict review gates.',
      ],
    },
    outcomes: {
      id: 'outcomes',
      number: '05',
      title: 'NDA-Safe Outcomes & Retrospective',
      outcomes: [
        'Clearer reactive data flow and reduced state coupling across modernized P5 Platform workflows through NgRx Signal Store and Clean Architecture seams.',
        'Smoother interaction responsiveness on dense component-intelligence views via virtualization and disciplined change detection.',
        'Higher consistency across reusable UI primitives and faster, review-backed iteration through AI-Augmented Engineering practices.',
        `Verified quantitative performance and delivery metrics: ${UNVERIFIED_CV_MARKER}.`,
      ],
      retrospective:
        'If I were starting the same modernization again, I would document the Signals-to-RxJS boundary rules even earlier as lightweight executable examples in the repo. Teams adopt architectural standards fastest when the first reference slice is small, inspectable, and backed by tests they can copy directly.',
    },
  },
  sibling: {
    id: 'idemia',
    company: 'IDEMIA Egypt',
    system: 'Border Control, e-Visa & Immigration System',
    href: '/experience/idemia',
    summary:
      'Mission-critical frontend architecture for national-scale border control, e-Visa, and immigration workflows under strict security and audit constraints.',
  },
};
