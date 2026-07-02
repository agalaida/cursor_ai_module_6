import { test, expect } from '@playwright/test';

test.describe('Security — XSS defense in depth', () => {
  test('TC-301: script tag in task title renders as inert text, never executes', async ({ page }) => {
    let dialogFired = false;
    page.on('dialog', () => { dialogFired = true; });

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const payload = "<script>alert('xss')</script>";
    await page.getByLabel('New task title').fill(payload);
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText(payload)).toBeVisible();
    expect(await page.locator('script:has-text("alert(\'xss\')")').count()).toBe(0);
    expect(dialogFired).toBe(false);
  });

  test('TC-302: HTML injection in profile bio renders as inert text, never executes', async ({ page }) => {
    let dialogFired = false;
    page.on('dialog', () => { dialogFired = true; });

    await page.goto('/settings');
    await page.waitForLoadState('networkidle');

    const payload = "<img src=x onerror=alert('XSS')>";
    const bio = page.getByLabel('bio');
    await bio.fill(payload);
    await expect(bio).toHaveValue(payload);
    expect(await page.locator('img[src="x"]').count()).toBe(0);
    expect(dialogFired).toBe(false);
  });
});
