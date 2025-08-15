const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the database by deleting all users and blogs
    await request.post('http://localhost:3003/api/testing/reset')
    
    // Create a test user
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    }
    
    await request.post('http://localhost:3003/api/users', {
      data: newUser
    })
    
         await page.goto('http://localhost:5173')
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
    
    // Wait for the login form to be visible
    await page.waitForSelector('h2:has-text("Log in to application")')
  })

  test('Login form is shown', async ({ page }) => {
    // Check that the login form is visible
    await expect(page.getByText('Log in to application')).toBeVisible()
    
    // Check that username and password inputs are present
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    
    // Check that the login button is present
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Fill in the login form with correct credentials
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('password123')
      
      // Click the login button
      await page.getByRole('button', { name: 'login' }).click()
      
      // Check that we're logged in by looking for the blog creation form
      await expect(page.getByRole('button', { name: 'create new blog' })).toBeVisible()
      
      // Check that the user name is displayed
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Fill in the login form with wrong credentials
      await page.locator('input[name="Username"]').fill('wronguser')
      await page.locator('input[name="Password"]').fill('wrongpassword')
      
      // Click the login button
      await page.getByRole('button', { name: 'login' }).click()
      
      // Check that we're still on the login page
      await expect(page.getByText('Log in to application')).toBeVisible()
      
      // Check that the blog creation form is not visible
      await expect(page.getByRole('button', { name: 'create new blog' })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
         beforeEach(async ({ page }) => {
       // Login before each test
       await page.locator('input[name="Username"]').fill('testuser')
       await page.locator('input[name="Password"]').fill('password123')
       await page.getByRole('button', { name: 'login' }).click()
       
       // Wait for login to complete and page to load
       await page.waitForLoadState('networkidle')
       await page.waitForTimeout(1000) // Give extra time for login to complete
       await expect(page.getByText('Test User logged in')).toBeVisible()
     })

    test('a new blog can be created', async ({ page }) => {
      // Click the create new blog button to show the form
      await page.getByRole('button', { name: 'create new blog' }).click()
      
      // Fill in the blog form
      await page.locator('input[name="Title"]').fill('Test Blog Title')
      await page.locator('input[name="Author"]').fill('Test Author')
      await page.locator('input[name="Url"]').fill('https://testblog.com')
      
             // Submit the form
       await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for the success notification to appear first
       await expect(page.getByText('a new blog Test Blog Title by Test Author added')).toBeVisible()
       
       // Then check that the blog appears in the list
       await expect(page.locator('.blog').filter({ hasText: 'Test Blog Title by Test Author' })).toBeVisible()
      
             // Success notification is already checked above
    })

    test('a blog can be liked', async ({ page }) => {
      // First create a blog
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('Blog to Like')
      await page.locator('input[name="Author"]').fill('Test Author')
      await page.locator('input[name="Url"]').fill('https://testblog.com')
             await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for the success notification first
       await expect(page.getByText('a new blog Blog to Like by Test Author added')).toBeVisible()
       
       // Wait for the blog to appear
       await expect(page.locator('.blog').filter({ hasText: 'Blog to Like by Test Author' })).toBeVisible()
      
      // Click view to expand the blog
      await page.getByRole('button', { name: 'view' }).first().click()
      
             // Check initial likes count
       await expect(page.locator('.blog').first().locator('.blog-likes').filter({ hasText: 'likes 0' })).toBeVisible()
      
             // Click the like button
       await page.getByRole('button', { name: 'like' }).click()
       
       // Wait for the like to be processed
       await page.waitForTimeout(1000)
       
       // Check that likes increased to 1
       await expect(page.locator('.blog').first().locator('.blog-likes').filter({ hasText: 'likes 1' })).toBeVisible()
    })

         test('a blog can be deleted by the user who created it', async ({ page }) => {
       // First create a blog
       await page.getByRole('button', { name: 'create new blog' }).click()
       await page.locator('input[name="Title"]').fill('Blog to Delete')
       await page.locator('input[name="Author"]').fill('Test Author')
       await page.locator('input[name="Url"]').fill('https://testblog.com')
       await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for the success notification first
       await expect(page.getByText('a new blog Blog to Delete by Test Author added')).toBeVisible()
       
       // Wait for the blog to appear
       await expect(page.locator('.blog').filter({ hasText: 'Blog to Delete by Test Author' })).toBeVisible()
       
       // Click view to expand the blog
       await page.getByRole('button', { name: 'view' }).first().click()
       
       // Handle the confirmation dialog before clicking remove
       page.on('dialog', dialog => dialog.accept())
       
       // Click the remove button
       await page.getByRole('button', { name: 'remove' }).click()
       
       // Wait for the blog to be removed
       await page.waitForTimeout(1000)
       
       // Check that the blog is removed from the list
       await expect(page.locator('.blog').filter({ hasText: 'Blog to Delete by Test Author' })).not.toBeVisible()
       
       // Check that the success notification appears
       await expect(page.getByText('Blog removed successfully')).toBeVisible()
     })

    test('only the creator can see the delete button', async ({ page, request }) => {
      // Create a second user
      const secondUser = {
        username: 'seconduser',
        name: 'Second User',
        password: 'password123'
      }
      
      await request.post('http://localhost:3003/api/users', {
        data: secondUser
      })
      
      // Create a blog with the first user
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('Blog by First User')
      await page.locator('input[name="Author"]').fill('Test Author')
      await page.locator('input[name="Url"]').fill('https://testblog.com')
             await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for the success notification first
       await expect(page.getByText('a new blog Blog by First User by Test Author added')).toBeVisible()
       
       // Wait for the blog to appear
       await expect(page.locator('.blog').filter({ hasText: 'Blog by First User by Test Author' })).toBeVisible()
      
      // Click view to expand the blog
      await page.getByRole('button', { name: 'view' }).first().click()
      
      // Check that the remove button is visible for the creator
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      
      // Logout
      await page.getByRole('button', { name: 'logout' }).click()
      
      // Login as the second user
      await page.locator('input[name="Username"]').fill('seconduser')
      await page.locator('input[name="Password"]').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()
      
             // Wait for login to complete and page to load
       await page.waitForLoadState('networkidle')
       await page.waitForTimeout(1000)
       await expect(page.getByText('Second User logged in')).toBeVisible()
      
      // Click view to expand the blog
      await page.getByRole('button', { name: 'view' }).first().click()
      
      // Check that the remove button is NOT visible for the second user
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered by likes with most likes first', async ({ page }) => {
      // Create first blog
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('First Blog')
      await page.locator('input[name="Author"]').fill('Author 1')
      await page.locator('input[name="Url"]').fill('https://blog1.com')
             await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for first blog to appear
       await expect(page.locator('.blog').filter({ hasText: 'First Blog by Author 1' })).toBeVisible()
       
       // Create second blog (form is hidden, so we need to click create new blog again)
       await page.getByRole('button', { name: 'create new blog' }).click()
       await page.locator('input[name="Title"]').fill('Second Blog')
       await page.locator('input[name="Author"]').fill('Author 2')
       await page.locator('input[name="Url"]').fill('https://blog2.com')
       await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for second blog to appear
       await expect(page.locator('.blog').filter({ hasText: 'Second Blog by Author 2' })).toBeVisible()
       
       // Create third blog (form is hidden, so we need to click create new blog again)
       await page.getByRole('button', { name: 'create new blog' }).click()
       await page.locator('input[name="Title"]').fill('Third Blog')
       await page.locator('input[name="Author"]').fill('Author 3')
       await page.locator('input[name="Url"]').fill('https://blog3.com')
       await page.getByRole('button', { name: 'create' }).click()
       
       // Wait for the blog to be created and appear
       await page.waitForTimeout(2000)
       
       // Wait for third blog to appear
       await expect(page.locator('.blog').filter({ hasText: 'Third Blog by Author 3' })).toBeVisible()
      
             // Like the second blog twice (it should become first)
       await page.getByRole('button', { name: 'view' }).nth(1).click() // Second blog
       await page.getByRole('button', { name: 'like' }).click()
       await page.getByRole('button', { name: 'like' }).click()
       await page.getByRole('button', { name: 'hide' }).click()
       
       // Like the third blog once (it should become second)
       await page.getByRole('button', { name: 'view' }).nth(2).click() // Third blog
       await page.getByRole('button', { name: 'like' }).click()
       await page.getByRole('button', { name: 'hide' }).click()
       
       // Wait a moment for the reordering to complete
       await page.waitForTimeout(2000)
       
       // Get all blog titles in order (only from the blog list, not notifications)
       const blogElements = await page.locator('.blog').all()
       const blogTitles = []
       
       for (const blogElement of blogElements) {
         const titleElement = await blogElement.locator('.blog-title').first()
         const titleText = await titleElement.textContent()
         blogTitles.push(titleText)
       }
       
       // Debug: log the actual order
       console.log('Blog titles in order:', blogTitles)
       
       // Check that blogs are ordered by likes (most likes first)
       // Second Blog should be first (2 likes), Third Blog second (1 like), First Blog third (0 likes)
       expect(blogTitles[0]).toContain('Second Blog by Author 2')
       expect(blogTitles[1]).toContain('Third Blog by Author 3')
       expect(blogTitles[2]).toContain('First Blog by Author 1')
    })
  })
})
