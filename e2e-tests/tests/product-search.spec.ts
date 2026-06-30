import { test, expect } from '@playwright/test';

test.describe('Product Search (Exercise 5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test('shows all products initially', async ({ page }) => {
    const cards = page.locator('article');
    await expect(cards).toHaveCount(6);
  });

  test('search returns matching results', async ({ page }) => {
    await page.getByLabel('Search products').fill('headphones');
    const cards = page.locator('article');
    await expect(cards).toHaveCount(1);
    await expect(page.getByText('Wireless Noise-Cancelling Headphones')).toBeVisible();
  });

  test('search with no results shows empty message', async ({ page }) => {
    await page.getByLabel('Search products').fill('xyzzxnonexistent');
    await expect(page.getByText('No products found.')).toBeVisible();
  });

  test('clearing search restores all products', async ({ page }) => {
    await page.getByLabel('Search products').fill('keyboard');
    await expect(page.locator('article')).toHaveCount(1);
    await page.getByLabel('Search products').clear();
    await expect(page.locator('article')).toHaveCount(6);
  });

  test('out-of-stock products show badge', async ({ page }) => {
    await expect(page.getByText('Out of Stock')).toBeVisible();
  });

  test('in-stock products have Add to Cart button enabled', async ({ page }) => {
    const addBtn = page.getByLabel('Add Wireless Noise-Cancelling Headphones to cart');
    await expect(addBtn).toBeEnabled();
  });

  test('Add to Cart changes button text', async ({ page }) => {
    await page.getByLabel('Add Wireless Noise-Cancelling Headphones to cart').click();
    await expect(page.getByText('Added!')).toBeVisible();
  });
});
