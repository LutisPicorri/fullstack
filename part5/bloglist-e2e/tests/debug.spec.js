const { test, expect } = require('@playwright/test')

test('Debug page content', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173')
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle')
  
  // Take a screenshot to see what's on the page
  await page.screenshot({ path: 'debug-screenshot.png' })
  
  // Get the page content
  const content = await page.content()
  console.log('Page content:', content)
  
  // Check if the login form title is visible
  const loginTitle = await page.getByText('Log in to application')
  console.log('Login title found:', await loginTitle.isVisible())
  
  // Try to find any input elements
  const inputs = await page.locator('input').all()
  console.log('Number of input elements found:', inputs.length)
  
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    const name = await input.getAttribute('name')
    const type = await input.getAttribute('type')
    console.log(`Input ${i}: name="${name}", type="${type}"`)
  }
  
  // Try to find any buttons
  const buttons = await page.locator('button').all()
  console.log('Number of button elements found:', buttons.length)
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    const text = await button.textContent()
    console.log(`Button ${i}: text="${text}"`)
  }
})
