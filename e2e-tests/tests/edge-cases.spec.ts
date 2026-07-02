import { test, expect } from '@playwright/test';

test.describe('Edge Cases — Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('TC-201: whitespace-only task title is ignored, not added', async ({ page }) => {
    const before = await page.locator('[aria-label^="Task:"]').count();
    await page.getByLabel('New task title').fill('   ');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('[aria-label^="Task:"]')).toHaveCount(before);
  });

  test('TC-202: very long task title (255 chars) is accepted and rendered', async ({ page }) => {
    const longTitle = 'A'.repeat(255);
    await page.getByLabel('New task title').fill(longTitle);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText(longTitle)).toBeVisible();
  });

  test('TC-203: unicode and emoji in task title are preserved', async ({ page }) => {
    const title = 'Отчёт по проекту 🚀 — срочно';
    await page.getByLabel('New task title').fill(title);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText(title)).toBeVisible();
  });

  test('TC-204: rapid successive task additions are all processed', async ({ page }) => {
    const input = page.getByLabel('New task title');
    const addBtn = page.getByRole('button', { name: 'Add' });
    for (let i = 0; i < 5; i++) {
      await input.fill(`Rapid task ${i}`);
      await addBtn.click();
    }
    for (let i = 0; i < 5; i++) {
      await expect(page.getByText(`Rapid task ${i}`)).toBeVisible();
    }
  });
});
