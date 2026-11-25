import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { verifyCsp } from './verify-csp.mjs';

function sha256(content) {
  return `'sha256-${createHash('sha256').update(content, 'utf8').digest('base64')}'`;
}

describe('verifyCsp', () => {
  const inlineScript = 'window.__init=1;';
  const sampleHtml = `<!doctype html><html><head><script>${inlineScript}</script></head><body><script type="module" src="/assets/index.js"></script></body></html>`;

  it('passes when there are no inline scripts and script-src is self with required directives', () => {
    const htmlWithoutInline =
      '<!doctype html><html><head></head><body><script type="module" src="/assets/index.js"></script></body></html>';
    const headers = [
      '/*',
      "  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
    ].join('\n');

    const result = verifyCsp({ html: htmlWithoutInline, headers });

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.hashes).toEqual([]);
  });

  it('passes when the inline script hash matches script-src and required directives are present', () => {
    const hash = sha256(inlineScript);
    const headers = [
      '/*',
      `  Content-Security-Policy: default-src 'self'; script-src 'self' ${hash}; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`,
    ].join('\n');

    const result = verifyCsp({ html: sampleHtml, headers });

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.hashes).toEqual([hash]);
  });

  it('fails when the inline script hash in _headers has drifted', () => {
    const headers = [
      '/*',
      "  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-stalehash='; frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
    ].join('\n');

    const result = verifyCsp({ html: sampleHtml, headers });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes(sha256(inlineScript)))).toBe(true);
  });

  it('fails when script-src allows unsafe-inline', () => {
    const hash = sha256(inlineScript);
    const headers = [
      '/*',
      `  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' ${hash}; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`,
    ].join('\n');

    const result = verifyCsp({ html: sampleHtml, headers });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('unsafe-inline'))).toBe(true);
  });

  it('fails when required hardening directives are missing', () => {
    const hash = sha256(inlineScript);
    const headers = ['/*', `  Content-Security-Policy: script-src 'self' ${hash}`].join('\n');

    const result = verifyCsp({ html: sampleHtml, headers });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("frame-ancestors 'none'"))).toBe(true);
    expect(result.errors.some((e) => e.includes("base-uri 'self'"))).toBe(true);
    expect(result.errors.some((e) => e.includes("object-src 'none'"))).toBe(true);
  });

  it('allows non-executable application/ld+json blocks without requiring script-src hashes', () => {
    const hash = sha256(inlineScript);
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Amr Sadat Abou Hegab',
    });
    const htmlWithJsonLd = `<!doctype html><html><head><script>${inlineScript}</script><script id="person-jsonld" type="application/ld+json">${jsonLd}</script></head><body></body></html>`;
    const headers = [
      '/*',
      `  Content-Security-Policy: default-src 'self'; script-src 'self' ${hash}; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`,
    ].join('\n');

    const result = verifyCsp({ html: htmlWithJsonLd, headers });

    expect(result.ok).toBe(true);
    expect(result.hashes).toEqual([hash]);
  });

  it('fails when an application/ld+json block contains invalid JSON', () => {
    const hash = sha256(inlineScript);
    const htmlWithBadJsonLd = `<!doctype html><html><head><script>${inlineScript}</script><script type="application/ld+json">{invalid</script></head><body></body></html>`;
    const headers = [
      '/*',
      `  Content-Security-Policy: default-src 'self'; script-src 'self' ${hash}; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`,
    ].join('\n');

    const result = verifyCsp({ html: htmlWithBadJsonLd, headers });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('application/ld+json'))).toBe(true);
  });
});
