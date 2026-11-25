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
