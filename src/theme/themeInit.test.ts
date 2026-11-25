import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function loadInlineHeadScript(): string {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch?.[1]) {
    throw new Error('Could not find <head> in index.html');
  }
  const scriptMatch = headMatch[1].match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!scriptMatch?.[1]) {
    throw new Error('Could not find inline <script> in <head> of index.html');
  }
  return scriptMatch[1];
}

function runThemeInitScript(): void {
  const script = loadInlineHeadScript();
  const fn = new Function(script);
  fn();
}

describe('inline head theme-init script', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to daylight on first visit and ignores prefers-color-scheme: dark', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
      }),
    );

    runThemeInitScript();

    expect(document.documentElement.dataset.theme).toBe('daylight');
  });

  it('restores obsidian when persisted in localStorage', () => {
    localStorage.setItem('theme', 'obsidian');

    runThemeInitScript();

    expect(document.documentElement.dataset.theme).toBe('obsidian');
  });

  it('falls back to daylight for unknown stored theme values', () => {
    localStorage.setItem('theme', 'dark');

    runThemeInitScript();

    expect(document.documentElement.dataset.theme).toBe('daylight');
  });

  it('falls back to daylight without throwing when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });

    expect(() => runThemeInitScript()).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe('daylight');
  });
});
