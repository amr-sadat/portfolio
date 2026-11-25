export interface PersonalProject {
  readonly id: 'ufuq' | 'angular-expert' | 'frontend-interview-prep';
  readonly name: string;
  readonly statusBadge?: 'In Progress';
  readonly summary: string;
  readonly stack: readonly string[];
  readonly href: string;
  readonly repoLabel: string;
}

export interface ProjectsContent {
  readonly heading: string;
  readonly items: readonly [PersonalProject, PersonalProject, PersonalProject];
}

export const projectsContent: ProjectsContent = {
  heading: 'Personal Projects',
  items: [
    {
      id: 'ufuq',
      name: 'Ufuq',
      statusBadge: 'In Progress',
      summary:
        'Turns PDFs into interactive, source-grounded bilingual (EN/AR) learning experiences, built as an Nx monorepo with shared Zod schemas and AI evaluation suites.',
      stack: ['Angular 22', 'NestJS 11', 'Nx', 'TypeScript', 'Zod', 'Vitest', 'Playwright'],
      href: 'https://github.com/amr-sadat/ufuq',
      repoLabel: 'github.com/amr-sadat/ufuq',
    },
    {
      id: 'angular-expert',
      name: 'angular-expert',
      summary:
        'Open-source AI agent skill and 11-part production Angular 20 reference covering Signals, Zoneless change detection, SSR/incremental hydration, Reactive Forms, testing, and i18n.',
      stack: ['Angular 20', 'AI Agent Skill', 'TypeScript'],
      href: 'https://github.com/amr-sadat/angular-expert',
      repoLabel: 'github.com/amr-sadat/angular-expert',
    },
    {
      id: 'frontend-interview-prep',
      name: 'frontend-interview-prep',
      summary:
        'Structured open-source frontend interview handbook with 134+ difficulty-tagged questions and coding problems spanning junior to tech lead.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Frontend Architecture'],
      href: 'https://github.com/amr-sadat/frontend-interview-prep',
      repoLabel: 'github.com/amr-sadat/frontend-interview-prep',
    },
  ],
};
