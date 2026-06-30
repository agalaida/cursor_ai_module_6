import { test, expect } from '@playwright/test';

test.describe('Registration Form (Exercise 6 — Settings as multi-step form)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
  });

  test('shows Profile tab by default', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Profile' })).toBeVisible();
    await expect(page.getByLabel('name')).toBeVisible();
  });

  test('tab navigation works', async ({ page }) => {
    await page.getByRole('tab', { name: 'Notifications' }).click();
    await expect(page.getByText('Email notifications')).toBeVisible();

    await page.getByRole('tab', { name: 'Privacy' }).click();
    await expect(page.getByText('Public profile')).toBeVisible();

    await page.getByRole('tab', { name: 'Appearance' }).click();
    await expect(page.getByText('Compact mode')).toBeVisible();
  });

  test('Profile form fields have labels', async ({ page }) => {
    await expect(page.getByLabel('name')).toBeVisible();
    await expect(page.getByLabel('email')).toBeVisible();
    await expect(page.getByLabel('bio')).toBeVisible();
  });

  test('email field validates format', async ({ page }) => {
    const emailInput = page.getByLabel('email');
    await emailInput.fill('invalid-email');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('Save Changes button exists', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  test('Cancel button exists', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('toggle switches are keyboard accessible', async ({ page }) => {
    await page.getByRole('tab', { name: 'Notifications' }).click();
    const toggle = page.locator('input[type="checkbox"]').first();
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Space');
  });

  test('Appearance tab toggles work', async ({ page }) => {
    await page.getByRole('tab', { name: 'Appearance' }).click();
    const compactToggle = page.getByLabel('Compact mode');
    const initialChecked = await compactToggle.isChecked();
    await compactToggle.check({ force: true });
    expect(await compactToggle.isChecked()).toBe(true);
    if (initialChecked) {
      await compactToggle.uncheck({ force: true });
    }
  });
});
