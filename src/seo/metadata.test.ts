import { afterEach, describe, expect, it } from 'vitest';
import { createProfile, profile, UNVERIFIED_CV_MARKER } from '../content/profile';
import {
  buildPersonJsonLd,
  DEFAULT_SITE_URL,
  getRouteMetadata,
  normalizeSiteUrl,
  syncDocumentMetadata,
} from './metadata';

const TEST_SITE_URL = 'https://amrsadat.dev';

describe('SEO route metadata', () => {
  it('normalizes trailing slashes from configured SITE_URL and falls back to default pages.dev URL', () => {
    expect(normalizeSiteUrl('https://amrsadat.dev///')).toBe('https://amrsadat.dev');
    expect(normalizeSiteUrl('  ')).toBe(DEFAULT_SITE_URL);
    expect(normalizeSiteUrl(undefined)).toBe(DEFAULT_SITE_URL);
    expect(DEFAULT_SITE_URL).toMatch(/^https:\/\/.+\.pages\.dev$/);
  });

  it('produces complete Home metadata on /', () => {
    const meta = getRouteMetadata('/', TEST_SITE_URL);

    expect(meta.title).toBe('Amr Sadat Abou Hegab — Senior Frontend Engineer');
    expect(meta.description).toMatch(/Senior Frontend Engineer/i);
    expect(meta.canonical).toBe('https://amrsadat.dev/');
    expect(meta.ogTitle).toBe('Amr Sadat Abou Hegab · Senior Frontend Engineer');
    expect(meta.ogType).toBe('website');
    expect(meta.ogUrl).toBe('https://amrsadat.dev/');
    expect(meta.ogImage).toBe('https://amrsadat.dev/og/home.png');
    expect(meta.twitterCard).toBe('summary_large_image');
    expect(meta.robots).toBeUndefined();
    expect(meta.includePersonJsonLd).toBe(true);
  });

  it('marks /404 and unknown routes as noindex', () => {
    const explicit404 = getRouteMetadata('/404', TEST_SITE_URL);
    expect(explicit404.robots).toBe('noindex, nofollow');
    expect(explicit404.canonical).toBe('https://amrsadat.dev/404');
    expect(explicit404.includePersonJsonLd).toBe(false);

    const unknown = getRouteMetadata('/unknown-route', TEST_SITE_URL);
    expect(unknown.robots).toBe('noindex, nofollow');
    expect(unknown.canonical).toBe('https://amrsadat.dev/404');
  });
});

describe('Person JSON-LD privacy boundary', () => {
  it('emits only approved public fields including verified GitHub and LinkedIn URLs', () => {
    const jsonLd = buildPersonJsonLd(profile, TEST_SITE_URL);

    expect(jsonLd).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Amr Sadat Abou Hegab',
      jobTitle: 'Senior Frontend Engineer',
      url: 'https://amrsadat.dev/',
      sameAs: ['https://github.com/amr-sadat', 'https://www.linkedin.com/in/amrsadat/'],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG',
      },
    });

    const serialized = JSON.stringify(jsonLd);
    expect(serialized).not.toContain(UNVERIFIED_CV_MARKER);
    expect(serialized).not.toMatch(/telephone|streetAddress|birthDate|amrsadat2017/i);
  });

  it('filters unverified placeholder URLs from sameAs', () => {
    const base = createProfile();
    const withPlaceholder = {
      ...base,
      contact: {
        ...base.contact,
        linkedin: {
          label: 'LinkedIn',
          href: UNVERIFIED_CV_MARKER,
        },
      },
    };

    const jsonLd = buildPersonJsonLd(withPlaceholder, TEST_SITE_URL);
    expect(jsonLd.sameAs).toEqual(['https://github.com/amr-sadat']);
  });
});

describe('syncDocumentMetadata', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.title = '';
  });

  it('updates document title, canonical, OG/Twitter tags, robots, and Person JSON-LD across route changes without duplicating tags', () => {
    syncDocumentMetadata('/', TEST_SITE_URL);
    expect(document.title).toBe('Amr Sadat Abou Hegab — Senior Frontend Engineer');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://amrsadat.dev/',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://amrsadat.dev/og/home.png',
    );
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    );
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
    const homeJsonLd = document.querySelector('script#person-jsonld[type="application/ld+json"]');
    expect(homeJsonLd).not.toBeNull();
    expect(JSON.parse(homeJsonLd!.textContent ?? '{}')).toMatchObject({
      '@type': 'Person',
      name: 'Amr Sadat Abou Hegab',
    });

    syncDocumentMetadata('/404', TEST_SITE_URL);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex, nofollow',
    );
    expect(document.querySelector('script#person-jsonld')).toBeNull();

    syncDocumentMetadata('/', TEST_SITE_URL);
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
    expect(document.querySelector('script#person-jsonld')).not.toBeNull();
  });
});
