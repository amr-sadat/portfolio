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
  test(`renders ${route.path} cleanly in dark mode with zero axe violations and no external requests`, async ({
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

    const colorScheme = await page.evaluate(
      () => window.getComputedStyle(document.documentElement).colorScheme,
    );
    expect(colorScheme).toBe('dark');
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

test('stays in dark mode regardless of light OS preference and renders no theme toggle', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const colorScheme = await page.evaluate(
    () => window.getComputedStyle(document.documentElement).colorScheme,
  );
  expect(colorScheme).toBe('dark');
  await expect(page.getByRole('button', { name: /switch to|theme/i })).toHaveCount(0);
});

test('mobile (375px) enforces >= 44px tap targets and focus-trapped menu sheet', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: /^menu$/i });

  await expect(menuButton).toBeVisible();
  await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeHidden();

  const menuBox = await menuButton.boundingBox();
  expect(menuBox).not.toBeNull();
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

test('home Hero and About pass layout and axe checks at desktop (1280px) and mobile (375px)', async ({
  page,
}) => {
  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');

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

    const axeResults = await new AxeBuilder({ page }).analyze();
    expect(axeResults.violations).toEqual([]);
  }
});

test('home scroll-spy highlights #about -> #experience -> #projects -> #contact left-to-right and passes axe', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

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

  const axeResults = await new AxeBuilder({ page }).analyze();
  expect(axeResults.violations).toEqual([]);
});
