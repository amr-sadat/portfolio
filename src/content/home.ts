import { profile } from './profile';

export interface CtaLink {
  readonly label: string;
  readonly href: string;
}

export interface HeroContent {
  readonly name: string;
  readonly role: string;
  readonly thesis: string;
  readonly capabilityStrip: string;
  readonly availability: string;
  readonly primaryCta: CtaLink;
  readonly cvCta: CtaLink;
}

export interface AboutBeat {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface AboutContent {
  readonly heading: string;
  readonly beats: readonly [AboutBeat, AboutBeat, AboutBeat];
}

export interface HomeContent {
  readonly hero: HeroContent;
  readonly about: AboutContent;
}

export const homeContent: HomeContent = {
  hero: {
    name: profile.fullName,
    role: profile.role,
    thesis:
      'I architect and ship resilient enterprise frontend systems—from national-scale border control and e-Visa platforms at IDEMIA to global electronics supply-chain workflows at SiliconExpert.',
    capabilityStrip: '7+ years · TypeScript, Angular (2–22), React · AI-Augmented Engineering',
    availability: 'Open to select Senior & Staff Frontend roles · Egypt or Remote (UTC+2)',
    primaryCta: {
      label: 'View Experience',
      href: '#experience',
    },
    cvCta: {
      label: 'Download CV',
      href: profile.cvPath,
    },
  },
  about: {
    heading: 'About',
    beats: [
      {
        id: 'enterprise-systems',
        title: 'National-scale & enterprise frontend systems',
        body: 'Over the past 7+ years, I have focused on high-stakes frontend architecture where correctness, latency, and long-term maintainability matter—spanning national border control, e-Visa, and immigration platforms at IDEMIA Egypt and the global electronics supply-chain P5 platform at SiliconExpert. My day-to-day work centers on Clean Architecture boundaries, deterministic reactive state with Signals, NgRx Signal Store, and RxJS, server-side rendering, and high-density render performance.',
      },
      {
        id: 'ai-augmented-engineering',
        title: 'Staff-level leverage & AI-Augmented Engineering',
        body: 'I practice AI-Augmented Engineering: human-owned system design, domain modeling, explicit specifications, code review rigor, and automated verification directing agentic execution tools including Claude Code, Devin AI, and OpenCode. Keeping architecture and acceptance criteria firmly human-owned lets teams move faster without trading away clarity or reliability.',
      },
      {
        id: 'framework-agnostic-craft',
        title: 'Framework-agnostic frontend craft',
        body: 'My deepest production track record is 7+ years of enterprise Angular (versions 2 through 22), and the underlying systems discipline—state modeling, rendering pipelines, accessibility, and strict TypeScript contracts—transfers directly across ecosystems. I built this portfolio from scratch in React and TypeScript as transparent, inspectable proof of that framework-agnostic craft.',
      },
    ],
  },
};
