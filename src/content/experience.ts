export interface ExperienceRoleCard {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly system: string;
  readonly tenure: string;
  readonly isCurrent?: boolean;
  readonly summary: string;
  readonly highlights: readonly [string, string, string];
  readonly stack: readonly string[];
}

export interface ExperienceContent {
  readonly heading: string;
  readonly subtitle: string;
  readonly roles: readonly ExperienceRoleCard[];
}

export const experienceContent: ExperienceContent = {
  heading: 'Experience',
  subtitle: '7+ years architecting enterprise and national-scale frontend systems.',
  roles: [
    {
      id: 'siliconexpert-senior-ii',
      role: 'Senior Front End Developer II',
      company: 'SiliconExpert',
      system: 'P5 Platform',
      tenure: 'Apr 2025 – Present',
      isCurrent: true,
      summary:
        'Leading frontend architecture and incremental modernization for high-density electronics supply-chain workflows on the P5 Platform.',
      highlights: [
        'Adopted Angular Signals alongside RxJS for deterministic UI state and race-safe async orchestration.',
        'Enforced Clean Architecture seams, SSR hydration discipline, and virtualized rendering across dense parametric views.',
        'Integrated AI-Augmented Engineering workflows (Claude Code, Devin AI, OpenCode) under human-owned specs and review gates.',
      ],
      stack: ['Angular', 'Signals', 'RxJS', 'TypeScript', 'SSR'],
    },
    {
      id: 'siliconexpert-senior-i',
      role: 'Senior Front End Developer I',
      company: 'SiliconExpert',
      system: 'P5 Platform',
      tenure: 'Jun 2022 – Mar 2025',
      summary:
        'Owned core P5 Platform component-intelligence features from requirements through production delivery across multi-team Agile releases.',
      highlights: [
        'Engineered data-heavy search, comparison, and compliance workspaces across Angular 14 through Angular 20.',
        'Partnered with backend teams on Spring Boot REST API contracts and reusable, keyboard-accessible Angular UI primitives.',
        'Mentored junior developers through code reviews and maintained focused Jasmine unit and component test coverage.',
      ],
      stack: ['Angular', 'RxJS', 'TypeScript', 'Spring Boot APIs', 'Jasmine'],
    },
    {
      id: 'idemia-senior',
      role: 'Senior Software Engineer',
      company: 'IDEMIA Egypt',
      system: 'Border Control, e-Visa & Immigration',
      tenure: 'May 2021 – May 2022',
      summary:
        'Architected zero-ambiguity operator and citizen web workflows for national-scale border control, e-Visa, and immigration platforms.',
      highlights: [
        'Structured multi-module Clean Architecture boundaries isolating domain contracts, workflow orchestration, and shared UI primitives.',
        'Modeled multi-step validation and submission flows as deterministic RxJS state machines with explicit recovery paths.',
        'Led code reviews focused on operational resilience, auditability, accessibility, and lean runtime posture.',
      ],
      stack: ['Angular', 'RxJS', 'TypeScript', 'Clean Architecture'],
    },
    {
      id: 'idemia-junior',
      role: 'Junior Front End Developer',
      company: 'IDEMIA Egypt',
      system: 'Border Control, e-Visa & Immigration',
      tenure: 'Jul 2018 – Apr 2021',
      summary:
        'Built production Angular modules and Java EE REST API integrations for frontline immigration operators and public e-Visa portals.',
      highlights: [
        'Implemented strict TypeScript domain models and centralized multi-step validation rules for intake and review queues.',
        'Delivered keyboard-accessible forms, semantic landmarks, and resilient loading and error states under strict security constraints.',
        'Maintained reliable Jasmine unit test suites across evolving national-scale government delivery tracks.',
      ],
      stack: ['Angular', 'TypeScript', 'RxJS', 'Java EE APIs', 'Jasmine'],
    },
  ],
};
