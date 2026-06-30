import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('all images have alt text on products page', async ({ page }) => {
    await page.goto('/products');
    const images = page.locator('img:not([alt=""])');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    const noAlt = page.locator('img:not([alt])');
    await expect(noAlt).toHaveCount(0);
  });

  test('form inputs have associated labels on dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    const input = page.getByLabel('New task title');
    await expect(input).toBeVisible();
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const ariaLabel = await btn.getAttribute('aria-label');
      const text = await btn.innerText();
      expect(ariaLabel || text.trim()).toBeTruthy();
    }
  });

  test('dark mode toggle has aria-label', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('button[aria-label*="mode"]').first();
    await expect(toggle).toBeVisible();
  });

  test('navbar has navigation landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  });

  test('task checkboxes have labels', async ({ page }) => {
    await page.goto('/dashboard');
    const checkbox = page.getByLabel(/Mark "Design new landing page"/);
    await expect(checkbox).toBeVisible();
  });

  test('settings tabs have role=tab', async ({ page }) => {
    await page.goto('/settings');
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('kanban task cards have aria-label', async ({ page }) => {
    await page.goto('/kanban');
    const card = page.locator('[aria-label^="Task:"]').first();
    await expect(card).toBeVisible();
  });
});
