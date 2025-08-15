const { test, expect } = require('@playwright/test')

test('Playwright is working', async ({ page }) => {
  await page.goto('https://example.com')
  await expect(page).toHaveTitle(/Example Domain/)
})
