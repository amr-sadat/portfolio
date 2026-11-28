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
  readonly beats: readonly AboutBeat[];
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
        title: 'Enterprise Frontend Systems',
        body: '7+ years architecting high-stakes web platforms at IDEMIA Egypt and SiliconExpert—focused on Clean Architecture, deterministic reactive state (Signals and RxJS), and render performance.',
      },
      {
        id: 'ai-augmented-engineering',
        title: 'AI-Augmented Engineering',
        body: 'Human-owned system design, specs, and code review directing agentic tools like Claude Code, Devin AI, and OpenCode for faster, verifiable delivery.',
      },
    ],
  },
};
