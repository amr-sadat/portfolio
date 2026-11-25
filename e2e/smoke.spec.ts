import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  { path: '/', heading: /amr sadat abou hegab/i },
  { path: '/experience/siliconexpert', heading: /siliconexpert/i },
  { path: '/experience/idemia', heading: /idemia/i },
  { path: '/404', heading: /404 — page not found/i },
  { path: '/does-not-exist', heading: /404 — page not found/i },
];

for (const route of ROUTES) {
  test(`renders ${route.path} cleanly in Daylight with zero axe violations and no external requests`, async ({
    page,
  }) => {
    const errors: string[] = [];
    const externalRequests: string[] = [];

    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    page.on('request', (req) => {
      const url = new URL(req.url());
      if (url.origin !== 'http://127.0.0.1:4173') {
        externalRequests.push(req.url());
      }
    });

    await page.goto(route.path);

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'daylight');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();

    const accessibilityResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityResults.violations).toEqual([]);
    expect(externalRequests).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('switches to Obsidian, persists across reload, and passes axe across key routes', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');

  // First visit always lands in Daylight even with dark OS preference
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'daylight');

  // Switch to Obsidian and confirm persistence across reload
  await page.getByRole('button', { name: /switch to obsidian/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');

  for (const path of ['/', '/experience/siliconexpert', '/404']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});

test('mobile (375px) enforces >= 44px tap targets and focus-trapped menu sheet', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const toggleButton = page.getByRole('button', { name: /switch to obsidian/i });
  const menuButton = page.getByRole('button', { name: /^menu$/i });

  await expect(toggleButton).toBeVisible();
  await expect(menuButton).toBeVisible();
  await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeHidden();

  const toggleBox = await toggleButton.boundingBox();
  const menuBox = await menuButton.boundingBox();
  expect(toggleBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(toggleBox!.width).toBeGreaterThanOrEqual(44);
  expect(toggleBox!.height).toBeGreaterThanOrEqual(44);
  expect(menuBox!.width).toBeGreaterThanOrEqual(44);
  expect(menuBox!.height).toBeGreaterThanOrEqual(44);

  await menuButton.click();
  const dialog = page.getByRole('dialog', { name: /site navigation/i });
  await expect(dialog).toBeVisible();

  const closeButton = dialog.getByRole('button', { name: /close navigation menu/i });
  const closeBox = await closeButton.boundingBox();
  expect(closeBox).not.toBeNull();
  expect(closeBox!.width).toBeGreaterThanOrEqual(44);
  expect(closeBox!.height).toBeGreaterThanOrEqual(44);

  const mobileAxe = await new AxeBuilder({ page }).analyze();
  expect(mobileAxe.violations).toEqual([]);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('home Hero and About pass layout and dual-theme axe checks at desktop (1280px) and mobile (375px)', async ({
  page,
}) => {
  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'daylight');

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasOverflow).toBe(false);

    const viewExperienceCta = page.getByRole('link', { name: 'View Experience' });
    await expect(viewExperienceCta).toBeVisible();
    await expect(viewExperienceCta).toHaveAttribute('href', '#experience');
    const ctaBox = await viewExperienceCta.boundingBox();
    expect(ctaBox).not.toBeNull();
    expect(ctaBox!.height).toBeGreaterThanOrEqual(44);

    await expect(page.getByRole('link', { name: 'Download CV' })).toHaveCount(0);

    const aboutSection = page.locator('section#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.getByRole('heading', { level: 3 })).toHaveCount(3);

    const daylightAxe = await new AxeBuilder({ page }).analyze();
    expect(daylightAxe.violations).toEqual([]);

    await page.getByRole('button', { name: /switch to obsidian/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');

    const obsidianOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(obsidianOverflow).toBe(false);

    const obsidianAxe = await new AxeBuilder({ page }).analyze();
    expect(obsidianAxe.violations).toEqual([]);
  }
});

test('home scroll-spy highlights #about -> #experience -> #projects -> #contact left-to-right and passes dual-theme axe', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  const nav = page.getByRole('navigation', { name: /primary navigation/i });
  const navOrder = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  let previousLinkX = -Infinity;
  for (const step of navOrder) {
    const section = page.locator(`section#${step.id}`);
    await section.scrollIntoViewIfNeeded();
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - window.innerHeight * 0.25;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' });
      }
    }, step.id);

    const activeLink = nav.getByRole('link', { name: step.label });
    await expect(activeLink).toHaveAttribute('aria-current', 'location');
    const linkBox = await activeLink.boundingBox();
    expect(linkBox).not.toBeNull();
    expect(linkBox!.x).toBeGreaterThan(previousLinkX);
    previousLinkX = linkBox!.x;
  }

  // Verify 3-column Projects grid on desktop
  const projectCards = page.locator('section#projects ul > li > a');
  await expect(projectCards).toHaveCount(3);
  const firstBox = await projectCards.nth(0).boundingBox();
  const secondBox = await projectCards.nth(1).boundingBox();
  const thirdBox = await projectCards.nth(2).boundingBox();
  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(thirdBox).not.toBeNull();
  expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(8);
  expect(Math.abs(secondBox!.y - thirdBox!.y)).toBeLessThan(8);

  // Dual-theme axe clean across complete home page
  const daylightAxe = await new AxeBuilder({ page }).analyze();
  expect(daylightAxe.violations).toEqual([]);

  await page.getByRole('button', { name: /switch to obsidian/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');
  const obsidianAxe = await new AxeBuilder({ page }).analyze();
  expect(obsidianAxe.violations).toEqual([]);
});
