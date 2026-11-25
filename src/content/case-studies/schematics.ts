import type { ArchitectureSchematic } from './types';

export const siliconExpertSchematic: ArchitectureSchematic = {
  id: 'siliconexpert',
  title: 'P5 Platform Frontend Architecture Schematic',
  caption:
    'Generalized, NDA-safe schematic of high-density component-intelligence workflows across Signals state, Clean Architecture adapters, virtualized grids, and SSR delivery.',
  viewBox: {
    width: 800,
    height: 380,
  },
  zones: [
    {
      id: 'workspace-ui',
      label: 'Workspace UI Layer',
      x: 24,
      y: 18,
      width: 752,
      height: 116,
    },
    {
      id: 'state-domain-core',
      label: 'Reactive State & Domain Core',
      x: 24,
      y: 152,
      width: 752,
      height: 116,
    },
  ],
  nodes: [
    {
      id: 'search-intent',
      label: 'Search & Filter Intent',
      sublabel: 'Facets · Sorting · Selection',
      x: 48,
      y: 50,
      width: 204,
      height: 64,
    },
    {
      id: 'data-grid',
      label: 'Virtualized Data Grid',
      sublabel: 'Windowed Rows · OnPush',
      x: 298,
      y: 50,
      width: 204,
      height: 64,
    },
    {
      id: 'detail-views',
      label: 'Linked Detail Views',
      sublabel: 'Derived View Models',
      x: 548,
      y: 50,
      width: 204,
      height: 64,
    },
    {
      id: 'signal-store',
      label: 'Signal Store & Query Stream',
      sublabel: 'NgRx Signal Store · RxJS',
      x: 118,
      y: 184,
      width: 244,
      height: 64,
    },
    {
      id: 'domain-adapter',
      label: 'Typed Domain Adapter & Cache',
      sublabel: 'Clean Architecture Seam',
      x: 438,
      y: 184,
      width: 244,
      height: 64,
    },
    {
      id: 'ssr-shell',
      label: 'SSR & Edge Delivery Shell',
      sublabel: 'Hydration-Safe Foundation · Platform Guards',
      x: 24,
      y: 294,
      width: 752,
      height: 62,
      kind: 'foundation',
    },
  ],
  edges: [
    {
      id: 'e1',
      from: 'search-intent',
      to: 'signal-store',
      path: 'M 150 114 L 150 148 L 190 148 L 190 184',
      label: 'Query Intent',
      labelX: 98,
      labelY: 144,
    },
    {
      id: 'e2',
      from: 'signal-store',
      to: 'domain-adapter',
      path: 'M 362 204 L 438 204',
      label: 'Fetch',
      labelX: 400,
      labelY: 196,
    },
    {
      id: 'e3',
      from: 'domain-adapter',
      to: 'signal-store',
      path: 'M 438 228 L 362 228',
      label: 'Payload',
      labelX: 400,
      labelY: 244,
    },
    {
      id: 'e4',
      from: 'signal-store',
      to: 'data-grid',
      path: 'M 296 184 L 296 148 L 370 148 L 370 114',
      label: 'Row Slice',
      labelX: 333,
      labelY: 142,
    },
    {
      id: 'e5',
      from: 'data-grid',
      to: 'detail-views',
      path: 'M 502 82 L 548 82',
      label: 'Select',
      labelX: 525,
      labelY: 74,
    },
    {
      id: 'e6',
      from: 'signal-store',
      to: 'detail-views',
      path: 'M 336 184 L 336 164 L 650 164 L 650 114',
      label: 'View Model',
      labelX: 560,
      labelY: 158,
    },
    {
      id: 'e7',
      from: 'ssr-shell',
      to: 'signal-store',
      path: 'M 240 294 L 240 248',
      label: 'Hydration',
      labelX: 282,
      labelY: 276,
    },
  ],
  lenses: {
    'data-flow': {
      id: 'data-flow',
      label: 'Data flow',
      summary:
        'Unidirectional query pipeline from multi-facet filter intent through debounced RxJS orchestration into fine-grained Signal view models.',
      activeNodes: ['search-intent', 'signal-store', 'domain-adapter', 'data-grid', 'detail-views'],
      activeEdges: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
      packetEdges: ['e1', 'e2', 'e3', 'e4', 'e5'],
      callouts: [
        {
          number: 1,
          nodeId: 'search-intent',
          title: 'Normalized filter intent',
          detail:
            'Facet selections, sorting, and search inputs emit typed query intents rather than mutating view state directly.',
        },
        {
          number: 2,
          nodeId: 'signal-store',
          title: 'Signals for sync, RxJS for async',
          detail:
            'NgRx Signal Store owns synchronous workspace state while RxJS handles debouncing and switchMap cancellation.',
        },
        {
          number: 3,
          nodeId: 'domain-adapter',
          title: 'Contract-mapped payloads',
          detail:
            'Raw responses are normalized into stable domain models before entering the store, insulating UI components from schema drift.',
        },
        {
          number: 4,
          nodeId: 'data-grid',
          title: 'Synchronized grid and detail slices',
          detail:
            'Derived signals feed both the virtualized table and linked detail panels without redundant recalculation.',
        },
      ],
    },
    structure: {
      id: 'structure',
      label: 'Structure',
      summary:
        'Clean Architecture seams isolate presentational workspaces from application state and data-mapping adapters so teams evolve features independently.',
      activeNodes: ['signal-store', 'domain-adapter', 'data-grid', 'ssr-shell'],
      activeEdges: ['e2', 'e4', 'e7'],
      callouts: [
        {
          number: 1,
          nodeId: 'data-grid',
          title: 'Presentational UI boundary',
          detail:
            'Tables and detail views depend strictly on narrow TypeScript view-model contracts instead of transport payloads.',
        },
        {
          number: 2,
          nodeId: 'signal-store',
          title: 'Feature-scoped state ownership',
          detail:
            'Each workspace owns its store slice and interop rules, preventing global store sprawl across unrelated modules.',
        },
        {
          number: 3,
          nodeId: 'domain-adapter',
          title: 'Adapter & cache isolation',
          detail:
            'Mapping and caching live behind explicit interfaces, enabling fast unit tests without mounting Angular view trees.',
        },
        {
          number: 4,
          nodeId: 'ssr-shell',
          title: 'Shared SSR-safe foundation',
          detail:
            'Browser-only APIs stay fenced behind platform guards so shared modules render cleanly during server-side execution.',
        },
      ],
    },
    resilience: {
      id: 'resilience',
      label: 'Resilience',
      summary:
        'Race-safe request cancellation, stale-response guards, and hydration-safe fallbacks keep dense workspaces stable under rapid user input.',
      activeNodes: ['search-intent', 'signal-store', 'domain-adapter', 'ssr-shell'],
      activeEdges: ['e1', 'e2', 'e3', 'e7'],
      callouts: [
        {
          number: 1,
          nodeId: 'search-intent',
          title: 'Predictable rapid-input handling',
          detail:
            'Rapid facet toggles never leave conflicting intermediate states visible while earlier queries are still in flight.',
        },
        {
          number: 2,
          nodeId: 'signal-store',
          title: 'Race-safe async orchestration',
          detail:
            'RxJS cancellation operators discard superseded requests and isolate transient errors into explicit recovery states.',
        },
        {
          number: 3,
          nodeId: 'domain-adapter',
          title: 'Defensive boundary parsing',
          detail:
            'Adapters guard optional fields and partial responses at the boundary so downstream templates stay clean and null-safe.',
        },
      ],
    },
    performance: {
      id: 'performance',
      label: 'Performance',
      summary:
        'Virtualization, fine-grained Signal reactivity, and short-circuit cache hits protect interaction latency on high-density parametric tables.',
      activeNodes: ['signal-store', 'domain-adapter', 'data-grid', 'detail-views', 'ssr-shell'],
      activeEdges: ['e3', 'e4', 'e6', 'e7'],
      callouts: [
        {
          number: 1,
          nodeId: 'data-grid',
          title: 'Windowed DOM footprint',
          detail:
            'Virtualization bounds active row nodes on dense component tables, avoiding layout thrash during fast scrolling.',
        },
        {
          number: 2,
          nodeId: 'signal-store',
          title: 'Fine-grained change detection',
          detail:
            'Signal-backed selectors narrow template updates to affected cells and panels instead of triggering full-tree checks.',
        },
        {
          number: 3,
          nodeId: 'detail-views',
          title: 'Memoized derived view models',
          detail:
            'Computed signals cache expensive parametric derivations until the selected component or filter set actually changes.',
        },
        {
          number: 4,
          nodeId: 'ssr-shell',
          title: 'Hydration without double-fetch',
          detail:
            'Server-rendered state transfers cleanly into the client store so initial paint does not block on duplicate bootstrap calls.',
        },
      ],
    },
  },
};

export const idemiaSchematic: ArchitectureSchematic = {
  id: 'idemia',
  title: 'Border Control & e-Visa Frontend Architecture Schematic',
  caption:
    'Generalized, NDA-safe schematic of multi-module operator and citizen workflows built around deterministic state machines, strict domain boundaries, and resilient submission guards.',
  viewBox: {
    width: 800,
    height: 380,
  },
  zones: [
    {
      id: 'interaction-layer',
      label: 'Operator & Applicant Surfaces',
      x: 24,
      y: 18,
      width: 752,
      height: 116,
    },
    {
      id: 'delivery-resilience-core',
      label: 'Resilient Submission & Audit Core',
      x: 24,
      y: 152,
      width: 752,
      height: 116,
    },
  ],
  nodes: [
    {
      id: 'intake-shell',
      label: 'Operator & Applicant Shell',
      sublabel: 'Keyboard-First · Multi-Step',
      x: 48,
      y: 50,
      width: 214,
      height: 64,
    },
    {
      id: 'state-machine',
      label: 'Validation & State Machine',
      sublabel: 'Typed Transitions · RxJS',
      x: 298,
      y: 50,
      width: 214,
      height: 64,
    },
    {
      id: 'domain-boundary',
      label: 'Modular Domain Boundary',
      sublabel: 'Shared Contracts · Clean Arch',
      x: 548,
      y: 50,
      width: 204,
      height: 64,
    },
    {
      id: 'retry-guard',
      label: 'Submission & Retry Guard',
      sublabel: 'Idempotent · Recovery Paths',
      x: 118,
      y: 184,
      width: 244,
      height: 64,
    },
    {
      id: 'audit-gateway',
      label: 'Audit-Safe Gateway Contract',
      sublabel: 'Strict Schema · Zero Leakage',
      x: 438,
      y: 184,
      width: 244,
      height: 64,
    },
    {
      id: 'shared-foundation',
      label: 'Security & Accessibility Core',
      sublabel: 'Strict CSP · Focus Management · Lean Runtime',
      x: 24,
      y: 294,
      width: 752,
      height: 62,
      kind: 'foundation',
    },
  ],
  edges: [
    {
      id: 'e1',
      from: 'intake-shell',
      to: 'state-machine',
      path: 'M 262 82 L 298 82',
      label: 'Input',
      labelX: 280,
      labelY: 74,
    },
    {
      id: 'e2',
      from: 'state-machine',
      to: 'domain-boundary',
      path: 'M 512 82 L 548 82',
      label: 'Draft',
      labelX: 530,
      labelY: 74,
    },
    {
      id: 'e3',
      from: 'domain-boundary',
      to: 'retry-guard',
      path: 'M 650 114 L 650 148 L 310 148 L 310 184',
      label: 'Submit Cmd',
      labelX: 515,
      labelY: 142,
    },
    {
      id: 'e4',
      from: 'retry-guard',
      to: 'audit-gateway',
      path: 'M 362 216 L 438 216',
      label: 'Idempotent',
      labelX: 400,
      labelY: 208,
    },
    {
      id: 'e5',
      from: 'retry-guard',
      to: 'state-machine',
      path: 'M 210 184 L 210 162 L 375 162 L 375 114',
      label: 'Recovery',
      labelX: 266,
      labelY: 156,
    },
    {
      id: 'e6',
      from: 'shared-foundation',
      to: 'intake-shell',
      path: 'M 82 294 L 82 114',
      label: 'Guardrails',
      labelX: 120,
      labelY: 282,
    },
  ],
  lenses: {
    'data-flow': {
      id: 'data-flow',
      label: 'Data flow',
      summary:
        'Deterministic progression from operator or citizen input through centralized multi-step validation into an idempotent, audit-safe submission contract.',
      activeNodes: [
        'intake-shell',
        'state-machine',
        'domain-boundary',
        'retry-guard',
        'audit-gateway',
      ],
      activeEdges: ['e1', 'e2', 'e3', 'e4'],
      packetEdges: ['e1', 'e2', 'e3', 'e4'],
      callouts: [
        {
          number: 1,
          nodeId: 'intake-shell',
          title: 'Structured multi-step intake',
          detail:
            'Operator queues and citizen forms emit explicit step actions with clear keyboard focus transitions at every stage.',
        },
        {
          number: 2,
          nodeId: 'state-machine',
          title: 'Centralized validation pipeline',
          detail:
            'Cross-step rules run deterministically in one typed state machine rather than fragmenting across individual form fields.',
        },
        {
          number: 3,
          nodeId: 'retry-guard',
          title: 'Guarded submission handoff',
          detail:
            'Validated payloads pass through an idempotent submission lock that prevents duplicate commits on double-click or retry.',
        },
        {
          number: 4,
          nodeId: 'audit-gateway',
          title: 'Explicit gateway contract',
          detail:
            'Outbound requests conform to strict typed schemas so every state transition reaches backend services in an auditable shape.',
        },
      ],
    },
    structure: {
      id: 'structure',
      label: 'Structure',
      summary:
        'Modular Clean Architecture separates shared security and accessibility primitives from domain-specific workflows across border control and e-Visa modules.',
      activeNodes: ['intake-shell', 'domain-boundary', 'audit-gateway', 'shared-foundation'],
      activeEdges: ['e2', 'e3', 'e6'],
      callouts: [
        {
          number: 1,
          nodeId: 'domain-boundary',
          title: 'Isolated feature domains',
          detail:
            'Border control, e-Visa, and immigration modules communicate only through explicit domain contracts instead of cross-feature imports.',
        },
        {
          number: 2,
          nodeId: 'audit-gateway',
          title: 'Adapter-level schema boundary',
          detail:
            'Transport serialization stays encapsulated in gateway adapters, keeping domain rules clean and straightforward to audit.',
        },
        {
          number: 3,
          nodeId: 'shared-foundation',
          title: 'Shared a11y & security core',
          detail:
            'Reusable focus management, high-contrast status patterns, and strict CSP posture are enforced once in the shared foundation.',
        },
      ],
    },
    resilience: {
      id: 'resilience',
      label: 'Resilience',
      summary:
        'Discriminated workflow states and explicit recovery loops ensure zero silent failures, safe retries, and preserved operator context under unstable networks.',
      activeNodes: ['state-machine', 'retry-guard', 'audit-gateway', 'shared-foundation'],
      activeEdges: ['e4', 'e5', 'e6'],
      callouts: [
        {
          number: 1,
          nodeId: 'state-machine',
          title: 'Unrepresentable invalid states',
          detail:
            'Discriminated TypeScript unions model draft, validating, submitting, and recovery phases explicitly so UI states never collide.',
        },
        {
          number: 2,
          nodeId: 'retry-guard',
          title: 'Safe recovery without data loss',
          detail:
            'Failed or timed-out submissions loop cleanly back to actionable recovery states while preserving validated operator input.',
        },
        {
          number: 3,
          nodeId: 'audit-gateway',
          title: 'Zero silent partial commits',
          detail:
            'Structured error contracts surface clear, auditable status codes instead of swallowing network or validation failures.',
        },
      ],
    },
    performance: {
      id: 'performance',
      label: 'Performance',
      summary:
        'Lazy-loaded domain modules, lean runtime dependencies, and deterministic reactive updates keep frontline workstations responsive.',
      activeNodes: ['intake-shell', 'state-machine', 'domain-boundary', 'shared-foundation'],
      activeEdges: ['e1', 'e2', 'e6'],
      callouts: [
        {
          number: 1,
          nodeId: 'domain-boundary',
          title: 'Route-scoped module loading',
          detail:
            'Strict module boundaries allow each operational domain to load on demand rather than shipping every workflow up front.',
        },
        {
          number: 2,
          nodeId: 'state-machine',
          title: 'Targeted reactive recalculation',
          detail:
            'Validation pipelines recompute only affected step dependencies, avoiding full-form stalls during rapid keyboard entry.',
        },
        {
          number: 3,
          nodeId: 'shared-foundation',
          title: 'Minimal third-party runtime',
          detail:
            'Avoiding heavy UI and animation libraries keeps parse cost low and behavior predictable across varied workstation hardware.',
        },
      ],
    },
  },
};
