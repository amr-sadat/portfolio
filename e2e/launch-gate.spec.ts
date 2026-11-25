import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ALL_FOUR_ROUTES = ['/', '/experience/siliconexpert', '/experience/idemia', '/404'] as const;

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 375, height: 812 },
] as const;

for (const viewport of VIEWPORTS) {
  test(`all 4 routes pass axe-core in dark mode at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const path of ALL_FOUR_ROUTES) {
      await page.goto(path);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const axeResults = await new AxeBuilder({ page }).analyze();
      expect(axeResults.violations, `Axe violations on ${path} (${viewport.name})`).toEqual([]);
    }
  });
}

test('built dist/index.html contains base SEO head tags, OG card, canonical, icons, and privacy-safe Person JSON-LD', async ({
  request,
}) => {
  const html = readFileSync(resolve(process.cwd(), 'dist', 'index.html'), 'utf8');

  expect(html).toContain('<title>Amr Sadat Abou Hegab — Senior Frontend Engineer</title>');
  expect(html).toMatch(/<link\s+rel="canonical"\s+href="https:\/\/[^"]+\/"\s*\/>/);
  expect(html).toMatch(/<meta\s+property="og:image"\s+content="https:\/\/[^"]+\/og\/home\.png"/);
  expect(html).toMatch(/<meta\s+name="twitter:card"\s+content="summary_large_image"/);
  expect(html).toContain('href="/favicon.svg"');
  expect(html).toContain('href="/apple-touch-icon.png"');

  const jsonLdMatch = html.match(
    /<script[^>]*id="person-jsonld"[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i,
  );
  expect(jsonLdMatch).not.toBeNull();
  const parsed = JSON.parse(jsonLdMatch![1]!);
  expect(parsed).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amr Sadat Abou Hegab',
    jobTitle: 'Senior Frontend Engineer',
    address: { '@type': 'PostalAddress', addressCountry: 'EG' },
  });
  expect(JSON.stringify(parsed)).not.toMatch(/telephone|streetAddress|birthDate|amrsadat2017/i);

  for (const assetPath of [
    '/robots.txt',
    '/sitemap.xml',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/og/home.png',
    '/og/siliconexpert.png',
    '/og/idemia.png',
  ]) {
    const response = await request.get(assetPath);
    expect(response.status(), `Expected 200 for ${assetPath}`).toBe(200);
  }
});

test('updates document.title, canonical, OG/Twitter meta, robots noindex, and Person JSON-LD across route navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  await expect(page).toHaveTitle('Amr Sadat Abou Hegab — Senior Frontend Engineer');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/og\/home\.png$/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('script#person-jsonld[type="application/ld+json"]')).toHaveCount(1);

  // Navigate to SiliconExpert Case Study
  await page
    .getByRole('link', { name: /read case study/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/experience\/siliconexpert$/);
  await expect(page).toHaveTitle(/SiliconExpert \(P5 Platform\)/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/experience\/siliconexpert$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/og\/siliconexpert\.png$/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('script#person-jsonld')).toHaveCount(0);

  // Navigate to IDEMIA Egypt Case Study via sibling link
  await page.getByRole('link', { name: /idemia egypt/i }).click();
  await expect(page).toHaveURL(/\/experience\/idemia$/);
  await expect(page).toHaveTitle(/IDEMIA Egypt/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/experience\/idemia$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/og\/idemia\.png$/,
  );
  await expect(page.locator('script#person-jsonld')).toHaveCount(0);

  // Navigate to /404 -> noindex
  await page.goto('/404');
  await expect(page).toHaveTitle(/404 — Page Not Found/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('script#person-jsonld')).toHaveCount(0);

  // Return Home -> noindex removed and Person JSON-LD restored
  await page.getByRole('link', { name: /return home/i }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).toHaveTitle('Amr Sadat Abou Hegab — Senior Frontend Engineer');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('script#person-jsonld[type="application/ld+json"]')).toHaveCount(1);
});

test('desktop keyboard tab flow covers skip-to-content, sticky nav, copy email, Case Study ToC, and Architecture Lenses', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  // 1. Skip-to-content link is first tab stop
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: /skip to main content/i });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);

  // 2. Sticky nav links are reachable in order via Tab
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  for (const label of ['About', 'Experience', 'Projects', 'Contact']) {
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('navigation', { name: /primary navigation/i }).getByRole('link', {
        name: label,
      }),
    ).toBeFocused();
  }

  // 3. Copy email button operable via keyboard Enter
  const copyButton = page.getByRole('button', { name: /copy email/i });
  await copyButton.focus();
  await expect(copyButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: /copied/i })).toBeVisible();

  // 4. Case Study ToC & Architecture Lenses operable via keyboard
  await page.goto('/experience/siliconexpert');
  const toc = page.getByRole('navigation', { name: /on this page/i });
  const archTocLink = toc.getByRole('link', { name: /03.*architectural decisions/i });
  await archTocLink.focus();
  await expect(archTocLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/experience\/siliconexpert#architecture$/);

  const lensGroup = page.getByRole('group', { name: /architecture lenses/i });
  const dataFlowBtn = lensGroup.getByRole('button', { name: 'Data flow' });
  const structureBtn = lensGroup.getByRole('button', { name: 'Structure' });
  await dataFlowBtn.focus();
  await expect(dataFlowBtn).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(structureBtn).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(structureBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(dataFlowBtn).toHaveAttribute('aria-pressed', 'false');
});

test('mobile keyboard flow traps focus inside navigation sheet and restores focus on Escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: /^menu$/i });
  await menuButton.focus();
  await expect(menuButton).toBeFocused();
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: /site navigation/i });
  await expect(dialog).toBeVisible();

  // Tab repeatedly and verify focus stays trapped inside the dialog
  for (let i = 0; i < 8; i += 1) {
    await page.keyboard.press('Tab');
    const insideDialog = await dialog.evaluate((el) => el.contains(document.activeElement));
    expect(insideDialog).toBe(true);
  }

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
});
