import { test, expect } from '@playwright/test';

test.describe('Auth / User Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows user avatar in navbar', async ({ page }) => {
    const userMenu = page.getByLabel('User menu');
    await expect(userMenu).toBeVisible();
  });

  test('opens user dropdown on click', async ({ page }) => {
    await page.getByLabel('User menu').click();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  });

  test('closes dropdown when clicking outside', async ({ page }) => {
    await page.getByLabel('User menu').click();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.getByRole('button', { name: 'Sign out' })).not.toBeVisible();
  });

  test('dropdown has Profile, Settings, Help items', async ({ page }) => {
    await page.getByLabel('User menu').click();
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Help' })).toBeVisible();
  });
});
