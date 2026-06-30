import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('shows initial tasks', async ({ page }) => {
    await expect(page.getByText('Design new landing page')).toBeVisible();
    await expect(page.getByText('Fix auth bug in login flow')).toBeVisible();
  });

  test('creates a new task', async ({ page }) => {
    const input = page.getByLabel('New task title');
    await input.fill('My new test task');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('My new test task')).toBeVisible();
  });

  test('marks a task as complete', async ({ page }) => {
    const checkbox = page.getByLabel(/Mark "Fix auth bug in login flow" as/);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('deletes a task', async ({ page }) => {
    await page.getByLabel('Delete task "Update README documentation"').click();
    await expect(page.getByText('Update README documentation')).not.toBeVisible();
  });

  test('shows priority badges on tasks', async ({ page }) => {
    await expect(page.getByText('high').first()).toBeVisible();
    await expect(page.getByText('medium').first()).toBeVisible();
  });
});
