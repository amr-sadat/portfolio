import { profile, type Profile } from '../content/profile';

export const DEFAULT_SITE_URL = 'https://amr-sadat-portfolio.pages.dev';

export function normalizeSiteUrl(rawUrl: string | undefined): string {
  const trimmed = rawUrl?.trim();
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }
  return trimmed.replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

export interface RouteMetadata {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
  readonly ogType: 'website' | 'article';
  readonly ogUrl: string;
  readonly ogImage: string;
  readonly ogImageAlt: string;
  readonly twitterCard: 'summary_large_image';
  readonly robots?: 'noindex, nofollow';
  readonly includePersonJsonLd: boolean;
}

export interface PersonJsonLd {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Person';
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly sameAs: readonly string[];
  readonly address: {
    readonly '@type': 'PostalAddress';
    readonly addressCountry: 'EG';
  };
}

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }
  return pathname.replace(/\/+$/, '');
}

interface RouteMetadataSpec {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly ogTitle: string;
  readonly ogType: 'website' | 'article';
  readonly ogImagePath: string;
  readonly ogImageAlt: string;
  readonly robots?: 'noindex, nofollow';
  readonly includePersonJsonLd: boolean;
}

const HOME_OG_IMAGE_ALT = 'Amr Sadat Abou Hegab — Senior Frontend Engineer portfolio preview';

const ROUTE_SPECS: Record<string, RouteMetadataSpec> = {
  '/': {
    path: '/',
    title: 'Amr Sadat Abou Hegab — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 7+ years architecting national-scale and enterprise frontend systems at IDEMIA Egypt and SiliconExpert. Angular (2–22), React, TypeScript, and AI-Augmented Engineering.',
    ogTitle: 'Amr Sadat Abou Hegab · Senior Frontend Engineer',
    ogType: 'website',
    ogImagePath: '/og/home.png',
    ogImageAlt: HOME_OG_IMAGE_ALT,
    includePersonJsonLd: true,
  },
  '/experience/siliconexpert': {
    path: '/experience/siliconexpert',
    title: 'SiliconExpert (P5 Platform) · Architectural Case Study — Amr Sadat Abou Hegab',
    description:
      'NDA-safe architectural Case Study of SiliconExpert’s P5 electronics supply-chain platform: deterministic Signals state, Clean Architecture boundaries, and sustained render performance.',
    ogTitle: 'SiliconExpert (P5 Platform) · Architectural Case Study',
    ogType: 'article',
    ogImagePath: '/og/siliconexpert.png',
    ogImageAlt: 'SiliconExpert (P5 Platform) Architectural Case Study preview',
    includePersonJsonLd: false,
  },
  '/experience/idemia': {
    path: '/experience/idemia',
    title: 'IDEMIA Egypt · Architectural Case Study — Amr Sadat Abou Hegab',
    description:
      'NDA-safe architectural Case Study of IDEMIA Egypt’s national border control, e-Visa, and immigration web systems: deterministic workflows, strict boundaries, and zero-ambiguity UX.',
    ogTitle: 'IDEMIA Egypt · Architectural Case Study',
    ogType: 'article',
    ogImagePath: '/og/idemia.png',
    ogImageAlt: 'IDEMIA Egypt Architectural Case Study preview',
    includePersonJsonLd: false,
  },
};

const NOT_FOUND_SPEC: RouteMetadataSpec = {
  path: '/404',
  title: '404 — Page Not Found — Amr Sadat Abou Hegab',
  description: 'The requested route does not exist on this portfolio.',
  ogTitle: '404 — Page Not Found',
  ogType: 'website',
  ogImagePath: '/og/home.png',
  ogImageAlt: HOME_OG_IMAGE_ALT,
  robots: 'noindex, nofollow',
  includePersonJsonLd: false,
};

export function getRouteMetadata(pathname: string, siteUrl: string = SITE_URL): RouteMetadata {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const normalized = normalizePathname(pathname);
  const spec = ROUTE_SPECS[normalized] ?? NOT_FOUND_SPEC;
  const canonical = `${baseUrl}${spec.path}`;

  return {
    title: spec.title,
    description: spec.description,
    canonical,
    ogTitle: spec.ogTitle,
    ogDescription: spec.description,
    ogType: spec.ogType,
    ogUrl: canonical,
    ogImage: `${baseUrl}${spec.ogImagePath}`,
    ogImageAlt: spec.ogImageAlt,
    twitterCard: 'summary_large_image',
    robots: spec.robots,
    includePersonJsonLd: spec.includePersonJsonLd,
  };
}

function isApprovedHttpsUrl(value: string): boolean {
  return value.startsWith('https://');
}

export function buildPersonJsonLd(
  sourceProfile: Profile = profile,
  siteUrl: string = SITE_URL,
): PersonJsonLd {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const sameAs = [sourceProfile.contact.github.href, sourceProfile.contact.linkedin.href].filter(
    isApprovedHttpsUrl,
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: sourceProfile.fullName,
    jobTitle: sourceProfile.role,
    url: `${baseUrl}/`,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
    },
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMeta(attr: 'name' | 'property', key: string): void {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

const PERSON_JSONLD_ID = 'person-jsonld';

function syncPersonJsonLd(include: boolean, siteUrl: string): void {
  const existing = document.head.querySelector<HTMLScriptElement>(
    `script#${PERSON_JSONLD_ID}[type="application/ld+json"]`,
  );

  if (!include) {
    existing?.remove();
    return;
  }

  const serialized = JSON.stringify(buildPersonJsonLd(profile, siteUrl));
  if (existing) {
    existing.textContent = serialized;
    return;
  }

  const script = document.createElement('script');
  script.id = PERSON_JSONLD_ID;
  script.type = 'application/ld+json';
  script.textContent = serialized;
  document.head.appendChild(script);
}

export function syncDocumentMetadata(pathname: string, siteUrl: string = SITE_URL): RouteMetadata {
  const meta = getRouteMetadata(pathname, siteUrl);

  document.title = meta.title;
  upsertCanonical(meta.canonical);

  upsertMeta('name', 'description', meta.description);
  upsertMeta('property', 'og:title', meta.ogTitle);
  upsertMeta('property', 'og:description', meta.ogDescription);
  upsertMeta('property', 'og:type', meta.ogType);
  upsertMeta('property', 'og:url', meta.ogUrl);
  upsertMeta('property', 'og:image', meta.ogImage);
  upsertMeta('property', 'og:image:width', '1200');
  upsertMeta('property', 'og:image:height', '630');
  upsertMeta('property', 'og:image:alt', meta.ogImageAlt);

  upsertMeta('name', 'twitter:card', meta.twitterCard);
  upsertMeta('name', 'twitter:title', meta.ogTitle);
  upsertMeta('name', 'twitter:description', meta.ogDescription);
  upsertMeta('name', 'twitter:image', meta.ogImage);

  if (meta.robots) {
    upsertMeta('name', 'robots', meta.robots);
  } else {
    removeMeta('name', 'robots');
  }

  syncPersonJsonLd(meta.includePersonJsonLd, siteUrl);

  return meta;
}
