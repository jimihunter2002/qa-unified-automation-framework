import { expect, test } from '@playwright/test';

test('UI should be accessible', async ({ page }) => {
  // Navigate to the base URL
  const response = await page.goto('/');

  // Verify we can reach the page
  expect(response?.status()).toBeLessThan(400);
});
