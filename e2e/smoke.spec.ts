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
  test(`renders ${route.path} cleanly in Daylight with zero axe violations`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(route.path);

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'daylight');
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();

    const accessibilityResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityResults.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
