import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  extractInitialJsPaths,
  MAX_INITIAL_JS_GZIP_BYTES,
  MAX_WOFF2_TOTAL_BYTES,
  verifyBudgets,
} from './verify-budgets.mjs';

const tempDirs = [];

function createTempDist({ html, assets = {}, fonts = {} }) {
  const dir = mkdtempSync(join(tmpdir(), 'portfolio-budgets-'));
  tempDirs.push(dir);
  mkdirSync(join(dir, 'assets'), { recursive: true });
  mkdirSync(join(dir, 'fonts'), { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');

  for (const [name, content] of Object.entries(assets)) {
    writeFileSync(join(dir, 'assets', name), content);
  }
  for (const [name, content] of Object.entries(fonts)) {
    writeFileSync(join(dir, 'fonts', name), content);
  }
  return dir;
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    rmSync(dir, { recursive: true, force: true });
  }
});

describe('verifyBudgets', () => {
  it('enforces the 90 KB gzipped initial JS and 75 KB WOFF2 font constants', () => {
    expect(MAX_INITIAL_JS_GZIP_BYTES).toBe(90 * 1024);
    expect(MAX_WOFF2_TOTAL_BYTES).toBe(75 * 1024);
  });

  it('extracts module script and modulepreload JS paths from built index.html while ignoring lazy chunks', () => {
    const html = `<!doctype html><html><head>
      <link rel="modulepreload" href="/assets/vendor.js" />
      <link rel="stylesheet" href="/assets/index.css" />
    </head><body>
      <script type="module" src="/assets/index.js"></script>
    </body></html>`;

    expect(extractInitialJsPaths(html)).toEqual(['/assets/index.js', '/assets/vendor.js']);
  });

  it('passes when initial JS gzipped payload and total WOFF2 fonts are within budget', () => {
    const distDir = createTempDist({
      html: '<!doctype html><html><body><script type="module" src="/assets/index.js"></script></body></html>',
      assets: {
        'index.js': 'console.log("hello portfolio");',
        'lazy-case-study.js': Buffer.alloc(200 * 1024, 0x41),
      },
      fonts: {
        'instrument-sans-latin.woff2': Buffer.alloc(30 * 1024, 0x01),
        'jetbrains-mono-latin.woff2': Buffer.alloc(40 * 1024, 0x02),
      },
    });

    const result = verifyBudgets({ distDir });

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.initialJsFiles).toEqual(['/assets/index.js']);
    expect(result.woff2TotalBytes).toBe(70 * 1024);
  });

  it('fails when initial JS gzipped payload exceeds the budget', () => {
    const distDir = createTempDist({
      html: '<!doctype html><html><body><script type="module" src="/assets/index.js"></script></body></html>',
      assets: {
        'index.js': 'a'.repeat(5000),
      },
      fonts: {
        'font.woff2': Buffer.alloc(1024, 0x01),
      },
    });

    const result = verifyBudgets({
      distDir,
      maxInitialJsGzipBytes: 10,
      maxWoff2TotalBytes: 75 * 1024,
    });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('Initial JS'))).toBe(true);
  });

  it('fails when total self-hosted WOFF2 font payload exceeds the budget', () => {
    const distDir = createTempDist({
      html: '<!doctype html><html><body><script type="module" src="/assets/index.js"></script></body></html>',
      assets: {
        'index.js': 'console.log(1);',
      },
      fonts: {
        'font-a.woff2': Buffer.alloc(40 * 1024, 0x01),
        'font-b.woff2': Buffer.alloc(40 * 1024, 0x02),
      },
    });

    const result = verifyBudgets({ distDir });

    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('WOFF2'))).toBe(true);
  });
});
