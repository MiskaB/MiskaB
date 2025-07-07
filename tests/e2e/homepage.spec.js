const { test, expect } = require('@playwright/test');

test('homepage loads and shows navigation', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('text=Home')).toBeVisible();
});
