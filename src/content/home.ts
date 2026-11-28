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

export interface HomeContent {
  readonly hero: HeroContent;
}

export const homeContent: HomeContent = {
  hero: {
    name: profile.fullName,
    role: profile.role,
    thesis:
      'I architect and ship resilient enterprise frontend systems—from national-scale border control and e-Visa platforms at IDEMIA Egypt to global electronics supply-chain workflows at SiliconExpert—focused on Clean Architecture, deterministic reactive state (Signals and RxJS), and render performance. I pair human-owned system design, specs, and code review with agentic tools like Claude Code, Devin AI, and OpenCode for faster, verifiable delivery.',
    capabilityStrip: '7+ years · TypeScript, Angular (2–22) · AI-Augmented Engineering',
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
};
