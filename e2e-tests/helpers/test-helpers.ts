import { Page, expect } from '@playwright/test';

export const SELECTORS = {
  navbar: 'header[role="banner"], header',
  navLinks: 'nav[aria-label="Main navigation"] a',
  darkToggle: 'button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]',
  userMenu: 'button[aria-label="User menu"]',
};

export async function navigateTo(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

export async function expectHeading(page: Page, text: string) {
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
}

export async function toggleDarkMode(page: Page) {
  const btn = page.locator(SELECTORS.darkToggle).first();
  await btn.click();
}

export async function clickNavLink(page: Page, label: string) {
  await page.getByRole('link', { name: label }).first().click();
  await page.waitForLoadState('networkidle');
}
