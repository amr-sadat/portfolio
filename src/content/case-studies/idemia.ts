import { UNVERIFIED_CV_MARKER } from '../profile';
import { ARCHITECTURE_LENSES, type CaseStudy } from './types';

export const idemiaCaseStudy: CaseStudy = {
  id: 'idemia',
  company: 'IDEMIA Egypt',
  system: 'Border Control, e-Visa & Immigration System',
  title: 'IDEMIA Egypt — Border Control, e-Visa & Immigration',
  subtitle:
    'Engineering deterministic, zero-ambiguity frontend architecture for national-scale border control, e-Visa, and immigration web systems.',
  ndaNotice:
    'Architecture-Public / Internals-Redacted: specific government clients, deployments, biometric/security internals, proprietary schemas, and confidential volumes are intentionally omitted.',
  contextStrip: {
    role: UNVERIFIED_CV_MARKER,
    tenure: UNVERIFIED_CV_MARKER,
    scaleSignals: [
      'National-scale border control & immigration workflows',
      'Dual operator & citizen web interfaces',
      'Strict security, audit & reliability environment',
    ],
    coreStack: ['Angular', 'RxJS', 'TypeScript', 'Clean Architecture'],
  },
  diagram: {
    id: 'idemia',
    title: 'Border Control & e-Visa Frontend Architecture Schematic',
    caption:
      'Interactive Architecture Lens schematic covering Data flow, Structure, Resilience, and Performance across mission-critical multi-module workflows.',
    lenses: ARCHITECTURE_LENSES,
  },
  sections: {
    context: {
      id: 'context',
      number: '01',
      title: 'Context & System Scope',
      paragraphs: [
        'At IDEMIA Egypt, I worked on national-scale border control, e-Visa, and immigration web systems serving two distinct audiences with very different stakes: frontline operators processing time-sensitive workflows under strict operational rules, and citizens completing structured multi-step applications.',
        'In this environment, frontend architecture is not cosmetic polish—it is an operational safety layer. Every screen, validation rule, and state transition directly shapes whether an operator can make an unambiguous decision quickly and whether an application reaches backend services in a valid, auditable state.',
      ],
    },
    problem: {
      id: 'problem',
      number: '02',
      title: 'Problem & Constraints',
      paragraphs: [
        'Multi-module government platforms evolve across many interconnected domains—application intake, document verification workflows, status transitions, and operator review queues. Without disciplined boundaries, validation rules fragment across components and subtle edge cases surface as ambiguous UI states.',
        'At the same time, security, auditability, and operational resilience imposed hard constraints: zero tolerance for silent failures, strict control over third-party dependencies, predictable keyboard-first ergonomics for high-frequency operators, and consistent behavior across varied network and workstation conditions.',
      ],
      constraints: [
        'Zero-ambiguity operator and citizen workflows where silent failure or partial submission is unacceptable.',
        'Multi-module system boundaries shared across border control, e-Visa, and immigration domains.',
        'Complex, interdependent multi-step validation rules that must remain deterministic across back/forward navigation and retries.',
        'Strict security, auditability, accessibility, and performance constraints with minimal external runtime exposure.',
      ],
    },
    architecture: {
      id: 'architecture',
      number: '03',
      title: 'Architectural Decisions & Trade-offs',
      intro:
        'To keep mission-critical workflows predictable across multiple modules, I prioritized explicit module contracts, deterministic reactive state machines, and resilient operator ergonomics.',
      tradeoffs: [
        {
          id: 'modular-clean-architecture',
          title: 'Modular Clean Architecture across multi-module systems',
          decision:
            'Structured domain modules around clear Clean Architecture boundaries—isolating domain contracts, workflow orchestration, and shared UI primitives so border control and e-Visa modules could evolve without tight cross-module coupling.',
          tradeoff:
            'Required stricter contract discipline and explicit adapter boundaries instead of quick cross-feature imports, which slowed initial scaffolding slightly in exchange for safer long-term maintenance and auditing.',
        },
        {
          id: 'deterministic-reactive-validation',
          title: 'Deterministic reactive state & typed multi-step validation',
          decision:
            'Modeled multi-step workflows with explicit typed states and centralized RxJS validation pipelines so transitions between draft, validation, submission, and recovery states were deterministic and reproducible.',
          tradeoff:
            'Upfront state modeling takes more design effort than ad-hoc component flags, but it eliminates race conditions, duplicate submissions, and inconsistent cross-step error messages.',
        },
        {
          id: 'operational-resilience-and-a11y',
          title: 'Operational resilience, accessibility, and lean runtime posture',
          decision:
            'Designed explicit error and recovery states, keyboard-accessible operator flows, and disciplined bundle hygiene so workflows remained legible and predictable under strict security and network constraints.',
          tradeoff:
            'Deliberately avoided ornamental UI complexity and heavy runtime libraries, favoring clear hierarchy, explicit feedback, and low-overhead rendering over visual novelty.',
        },
      ],
    },
    craft: {
      id: 'craft',
      number: '04',
      title: 'Craft & Execution',
      paragraphs: [
        'Day-to-day execution centered on removing ambiguity before code ever reached production. Strict TypeScript contracts, exhaustive state handling, and clear validation messaging ensured operators and citizens always knew what the system expected and what happened after every action.',
        'Accessibility and performance were treated as operational requirements rather than afterthoughts—focus order, keyboard shortcuts/navigation, high-contrast status communication, and predictable loading/error boundaries were built directly into shared workflow components.',
      ],
      practices: [
        'Strict TypeScript domain models and discriminated state unions to make invalid UI states unrepresentable.',
        'Centralized multi-step validation rules with clear, actionable inline and summary feedback.',
        'Keyboard-first navigation, semantic landmarks, and resilient error recovery paths for frontline operators.',
        'Disciplined code reviews focused on failure modes, auditability, and security boundaries.',
      ],
    },
    outcomes: {
      id: 'outcomes',
      number: '05',
      title: 'NDA-Safe Outcomes & Retrospective',
      outcomes: [
        'Consistent, maintainable multi-module architecture across national-scale border control, e-Visa, and immigration workflows.',
        'Predictable, deterministic multi-step validation and resilient error handling that reduced ambiguity in high-stakes operator and citizen flows.',
        'Durable accessibility and runtime discipline aligned with strict security and audit requirements.',
        `Verified tenure, role title, and directional scale metrics: ${UNVERIFIED_CV_MARKER}.`,
      ],
      retrospective:
        'Working on national-scale public systems permanently shaped how I think about frontend engineering: clarity under failure matters more than clever abstractions. Treating every asynchronous workflow as an explicit state machine with visible recovery paths is a habit I have carried into every enterprise platform since.',
    },
  },
  sibling: {
    id: 'siliconexpert',
    company: 'SiliconExpert',
    system: 'P5 Platform',
    href: '/experience/siliconexpert',
    summary:
      'High-density enterprise electronics supply-chain workflows modernized with Angular Signals, NgRx Signal Store, Clean Architecture, and AI-Augmented Engineering.',
  },
};
