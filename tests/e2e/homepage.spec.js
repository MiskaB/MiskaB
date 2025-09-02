const { test, expect } = require('@playwright/test');

test('welcome page loads and shows enter button', async ({ page }) => {
  await page.goto('http://localhost:8000');
  
  // Check that welcome page elements are visible
  await expect(page.locator('h1')).toContainText('Welcome');
  await expect(page.locator('.enter-button')).toBeVisible();
  await expect(page.locator('.profile-preview')).toBeVisible();
});

test('clicking enter button navigates to main site', async ({ page }) => {
  await page.goto('http://localhost:8000');
  
  // Click the enter button
  await page.locator('.enter-button').click();
  
  // Should now be on home.html with navigation
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('nav a[href="home.html"]')).toBeVisible();
  await expect(page.locator('nav a[href="cv.html"]')).toBeVisible();
});
