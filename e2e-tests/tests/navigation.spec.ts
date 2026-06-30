import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows navbar with app name', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByText('AppKit')).toBeVisible();
  });

  test('navigates to Products page', async ({ page }) => {
    await page.getByRole('link', { name: 'Products' }).first().click();
    await expect(page).toHaveURL('/products');
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  });

  test('navigates to Dashboard page', async ({ page }) => {
    await page.getByRole('link', { name: 'Dashboard' }).first().click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Task Management')).toBeVisible();
  });

  test('navigates to Settings page', async ({ page }) => {
    await page.getByRole('link', { name: 'Settings' }).first().click();
    await expect(page).toHaveURL('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  });

  test('navigates to Analytics page', async ({ page }) => {
    await page.getByRole('link', { name: 'Analytics' }).first().click();
    await expect(page).toHaveURL('/analytics');
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();
  });

  test('navigates to Team page', async ({ page }) => {
    await page.getByRole('link', { name: 'Team' }).first().click();
    await expect(page).toHaveURL('/team');
    await expect(page.getByRole('heading', { name: 'Team Dashboard' })).toBeVisible();
  });

  test('navigates to Kanban page', async ({ page }) => {
    await page.getByRole('link', { name: 'Kanban' }).first().click();
    await expect(page).toHaveURL('/kanban');
    await expect(page.getByRole('heading', { name: 'Kanban Board' })).toBeVisible();
  });

  test('navigates to Feed page', async ({ page }) => {
    await page.getByRole('link', { name: 'Feed' }).first().click();
    await expect(page).toHaveURL('/feed');
  });
});
