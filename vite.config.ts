import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

const rootDir = dirname(fileURLToPath(import.meta.url));
const hasCvPdf = existsSync(resolve(rootDir, 'public/cv.pdf'));
const DEFAULT_SITE_URL = 'https://amr-sadat-portfolio.pages.dev';
const configuredSiteUrl = (process.env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(
  /\/+$/,
  '',
);

function siteUrlTransformPlugin(): Plugin {
  return {
    name: 'site-url-transform',
    transformIndexHtml(html) {
      return configuredSiteUrl === DEFAULT_SITE_URL
        ? html
        : html.replaceAll(DEFAULT_SITE_URL, configuredSiteUrl);
    },
    closeBundle() {
      if (configuredSiteUrl === DEFAULT_SITE_URL) {
        return;
      }
      for (const file of ['robots.txt', 'sitemap.xml']) {
        const target = resolve(rootDir, 'dist', file);
        if (existsSync(target)) {
          const updated = readFileSync(target, 'utf8').replaceAll(
            DEFAULT_SITE_URL,
            configuredSiteUrl,
          );
          writeFileSync(target, updated, 'utf8');
        }
      }
    },
  };
}

export default defineConfig({
  define: {
    __HAS_CV_PDF__: JSON.stringify(hasCvPdf),
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), siteUrlTransformPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.{js,mjs,ts}'],
  },
});
