import { UNVERIFIED_CV_MARKER, type CvBackedValue } from './profile';

export type FlagshipId = 'siliconexpert' | 'idemia';

export interface CaseStudyTeaser {
  readonly id: FlagshipId;
  readonly company: string;
  readonly system: string;
  readonly role: CvBackedValue<string>;
  readonly tenure: CvBackedValue<string>;
  readonly problemStatement: string;
  readonly stack: readonly [string, string, string];
  readonly href: `/experience/${FlagshipId}`;
  readonly ctaLabel: string;
}

export interface EarlierRoleEntry {
  readonly id: string;
  readonly company: CvBackedValue<string>;
  readonly role: CvBackedValue<string>;
  readonly tenure: CvBackedValue<string>;
}

export interface ExperienceContent {
  readonly heading: string;
  readonly flagships: readonly [CaseStudyTeaser, CaseStudyTeaser];
  readonly earlierRolesHeading: string;
  readonly earlierRoles: readonly EarlierRoleEntry[];
}

export const experienceContent: ExperienceContent = {
  heading: 'Experience',
  flagships: [
    {
      id: 'siliconexpert',
      company: 'SiliconExpert',
      system: 'P5 Platform',
      role: 'Senior Front End Developer II',
      tenure: UNVERIFIED_CV_MARKER,
      problemStatement:
        'Architecting high-density enterprise electronics supply-chain workflows on the P5 Platform with strict Clean Architecture boundaries, deterministic Signals-based state, and sustained render responsiveness.',
      stack: ['Angular', 'NgRx Signal Store', 'TypeScript'],
      href: '/experience/siliconexpert',
      ctaLabel: 'Read case study →',
    },
    {
      id: 'idemia',
      company: 'IDEMIA Egypt',
      system: 'Border Control, e-Visa & Immigration System',
      role: UNVERIFIED_CV_MARKER,
      tenure: UNVERIFIED_CV_MARKER,
      problemStatement:
        'Engineering resilient, operator-facing frontend architecture for national-scale border control, e-Visa, and immigration workflows where latency, deterministic validation, and zero-downtime reliability are non-negotiable.',
      stack: ['Angular', 'RxJS', 'TypeScript'],
      href: '/experience/idemia',
      ctaLabel: 'Read case study →',
    },
  ],
  earlierRolesHeading: 'Earlier Roles',
  earlierRoles: [
    {
      id: 'earlier-role-1',
      company: UNVERIFIED_CV_MARKER,
      role: UNVERIFIED_CV_MARKER,
      tenure: UNVERIFIED_CV_MARKER,
    },
    {
      id: 'earlier-role-2',
      company: UNVERIFIED_CV_MARKER,
      role: UNVERIFIED_CV_MARKER,
      tenure: UNVERIFIED_CV_MARKER,
    },
  ],
};
