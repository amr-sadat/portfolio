import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const CASE_STUDIES = [
  {
    path: '/experience/siliconexpert',
    heading: /siliconexpert — p5 platform/i,
    siblingName: /idemia egypt/i,
    siblingPath: '/experience/idemia',
  },
  {
    path: '/experience/idemia',
    heading: /idemia egypt — border control/i,
    siblingName: /siliconexpert/i,
    siblingPath: '/experience/siliconexpert',
  },
] as const;

const SECTION_STEPS = [
  { id: 'context', label: /01.*context & system scope/i },
  { id: 'problem', label: /02.*problem & constraints/i },
  { id: 'architecture', label: /03.*architectural decisions & trade-offs/i },
  { id: 'craft', label: /04.*craft & execution/i },
  { id: 'outcomes', label: /05.*nda-safe outcomes & retrospective/i },
] as const;

for (const study of CASE_STUDIES) {
  test(`desktop (1280px) sticky ToC scroll-spy and dual-theme axe on ${study.path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(study.path);
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'daylight');
    await expect(page.getByRole('heading', { level: 1, name: study.heading })).toBeVisible();

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasOverflow).toBe(false);

    const toc = page.getByRole('navigation', { name: /on this page/i });
    await expect(toc).toBeVisible();
    await expect(toc.getByRole('button', { name: /on this page/i })).toBeHidden();

    for (const step of SECTION_STEPS) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - window.innerHeight * 0.25;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' });
        }
      }, step.id);

      const activeLink = toc.getByRole('link', { name: step.label });
      await expect(activeLink).toHaveAttribute('aria-current', 'location');
    }

    // Confirm ToC remained sticky within the viewport after scrolling deep into the article
    const tocBox = await toc.boundingBox();
    expect(tocBox).not.toBeNull();
    expect(tocBox!.y).toBeGreaterThanOrEqual(60);
    expect(tocBox!.y).toBeLessThan(200);

    // Sibling Case Study cross-link points to the other flagship
    const siblingLink = page.getByRole('link', { name: study.siblingName });
    await expect(siblingLink).toHaveAttribute('href', study.siblingPath);

    // Dual-theme axe clean
    const daylightAxe = await new AxeBuilder({ page }).analyze();
    expect(daylightAxe.violations).toEqual([]);

    await page.getByRole('button', { name: /switch to obsidian/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');
    const obsidianAxe = await new AxeBuilder({ page }).analyze();
    expect(obsidianAxe.violations).toEqual([]);
  });

  test(`mobile (375px) "On this page" disclosure navigation and dual-theme axe on ${study.path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(study.path);
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'daylight');

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasOverflow).toBe(false);

    const toc = page.getByRole('navigation', { name: /on this page/i });
    const toggleButton = toc.getByRole('button', { name: /on this page/i });
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    const toggleBox = await toggleButton.boundingBox();
    expect(toggleBox).not.toBeNull();
    expect(toggleBox!.height).toBeGreaterThanOrEqual(44);

    const archLink = toc.getByRole('link', { name: /03.*architectural decisions/i });
    await expect(archLink).toBeHidden();

    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    await expect(archLink).toBeVisible();

    await archLink.click();
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    await expect(archLink).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`${study.path}#architecture$`));

    // Confirm scroll-margin-top keeps the jumped section clear of the sticky 64px top bar
    const archSectionBox = await page.locator('#architecture').boundingBox();
    expect(archSectionBox).not.toBeNull();
    expect(archSectionBox!.y).toBeGreaterThanOrEqual(64);

    const daylightAxe = await new AxeBuilder({ page }).analyze();
    expect(daylightAxe.violations).toEqual([]);

    await page.getByRole('button', { name: /switch to obsidian/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'obsidian');
    const obsidianAxe = await new AxeBuilder({ page }).analyze();
    expect(obsidianAxe.violations).toEqual([]);
  });
}
