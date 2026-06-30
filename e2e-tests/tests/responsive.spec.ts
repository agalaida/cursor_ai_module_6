import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const vp of VIEWPORTS) {
  test.describe(`Responsive — ${vp.name} (${vp.width}px)`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('home page renders', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('header')).toBeVisible();
      await expect(page.getByText('AppKit')).toBeVisible();
    });

    test('products page shows product cards', async ({ page }) => {
      await page.goto('/products');
      const cards = page.locator('article');
      await expect(cards.first()).toBeVisible();
    });

    test('dashboard layout renders', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByText('Task Management')).toBeVisible();
    });

    test('mobile hamburger visible on small screen', async ({ page }) => {
      await page.goto('/');
      if (vp.width < 768) {
        await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
      }
    });
  });
}
