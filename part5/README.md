# Part 5 - End-to-End Testing

This part focuses on end-to-end testing using Playwright for the blog list application.

## 📚 Content Overview

Part 5 covers comprehensive end-to-end testing with two main components:

- **bloglist-frontend**: React frontend application
- **bloglist-e2e**: Playwright end-to-end tests

## 🗂️ Project Structure

```
part5/
├── bloglist-frontend/   # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main application
│   ├── package.json
│   └── vite.config.js
└── bloglist-e2e/        # Playwright tests
    ├── tests/           # Test files
    │   ├── blog-app.spec.js
    │   ├── debug.spec.js
    │   └── simple.spec.js
    ├── playwright.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running
- Backend server from Part 4 running

### Frontend Setup

```bash
cd part5/bloglist-frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

Make sure the Part 4 backend is running:

```bash
cd part4
npm run dev
```

The backend should run on `http://localhost:3003`

### E2E Testing Setup

```bash
cd part5/bloglist-e2e
npm install
```

## 🎯 Learning Objectives

By completing Part 5, you will learn:

- **End-to-End Testing**
  - Playwright framework setup
  - Browser automation
  - Test scenarios and user flows
  - Cross-browser testing

- **Test Automation**
  - Page object model
  - Test data management
  - Test isolation
  - CI/CD integration

- **Quality Assurance**
  - User experience testing
  - Functional testing
  - Performance testing
  - Accessibility testing

## 📋 Key Concepts

### Playwright Test Structure

```javascript
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset database and setup test data
    await request.post('http://localhost:3003/api/testing/reset')
    
    // Create test user
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    }
    
    await request.post('http://localhost:3003/api/users', {
      data: newUser
    })
    
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })
})
```

### Page Interactions

```javascript
// Fill form inputs
await page.locator('input[name="Username"]').fill('testuser')
await page.locator('input[name="Password"]').fill('password123')

// Click buttons
await page.getByRole('button', { name: 'login' }).click()

// Wait for elements
await expect(page.getByText('Test User logged in')).toBeVisible()

// Handle dialogs
page.on('dialog', dialog => dialog.accept())
```

### Test Scenarios

```javascript
test('a new blog can be created', async ({ page }) => {
  // Login first
  await page.locator('input[name="Username"]').fill('testuser')
  await page.locator('input[name="Password"]').fill('password123')
  await page.getByRole('button', { name: 'login' }).click()
  
  // Create blog
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.locator('input[name="Title"]').fill('Test Blog')
  await page.locator('input[name="Author"]').fill('Test Author')
  await page.locator('input[name="Url"]').fill('https://test.com')
  await page.getByRole('button', { name: 'create' }).click()
  
  // Verify blog appears
  await expect(page.locator('.blog').filter({ hasText: 'Test Blog' })).toBeVisible()
})
```

## 🔧 Development Tools

- **Playwright**: End-to-end testing framework
- **Vite**: Frontend build tool
- **React**: Frontend framework
- **MongoDB**: Database
- **Express**: Backend framework

## 📖 Common Commands

### Frontend

```bash
cd part5/bloglist-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm test
```

### E2E Tests

```bash
cd part5/bloglist-e2e

# Install dependencies
npm install

# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/blog-app.spec.js

# Run tests in headed mode
npx playwright test --headed

# Generate test report
npx playwright show-report
```

## 🧪 Test Scenarios

### Authentication Tests

- Login form visibility
- Successful login
- Failed login with wrong credentials
- Logout functionality

### Blog Management Tests

- Blog creation by authenticated users
- Blog listing and display
- Blog editing and updating
- Blog deletion with confirmation
- Blog liking functionality

### User Authorization Tests

- Delete button visibility (creator only)
- User-specific content display
- Permission-based access control

### User Experience Tests

- Form validation
- Error message display
- Success notifications
- Responsive design
- Cross-browser compatibility

## 🐛 Debugging Tips

- Use `--headed` flag to see browser during test execution
- Use `page.screenshot()` to capture test failures
- Check browser console for errors
- Verify backend API responses
- Monitor network requests
- Use `page.pause()` for step-by-step debugging

## 📊 Test Configuration

### Playwright Config

```javascript
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
```

## 🔍 Test Data Management

- Database reset before each test
- Test user creation
- Isolated test data
- Clean state between tests

## 📖 Next Steps

After completing Part 5, you have mastered:

- **Frontend Development**: React with modern tooling
- **Backend Development**: Node.js, Express, MongoDB
- **Testing**: Unit, integration, and end-to-end testing
- **Authentication**: JWT and user management
- **Quality Assurance**: Comprehensive testing strategies

## 💡 Best Practices

- Write descriptive test names
- Use page object model for maintainability
- Implement proper test isolation
- Handle async operations correctly
- Use meaningful assertions
- Keep tests independent
- Document complex test scenarios

## 🚨 Common Issues

- **Timing issues**: Use proper waits and assertions
- **Selector problems**: Use reliable selectors
- **Database state**: Ensure proper cleanup
- **Browser compatibility**: Test across multiple browsers
- **Network issues**: Handle API failures gracefully

## 🎉 Achievement Unlocked

Congratulations! You have completed the Full Stack Open course and mastered:

- Modern JavaScript development
- React frontend development
- Node.js backend development
- Database design and management
- Authentication and security
- Comprehensive testing strategies
- End-to-end testing with Playwright

---

**Full Stack Development Mastered! 🚀**
