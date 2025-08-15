# Blog List E2E Tests

This directory contains end-to-end tests for the Blog List application using Playwright.

## Prerequisites

1. MongoDB must be running locally
2. Environment variables must be set up for the backend

## Setup

1. Create a `.env` file in the `part4` directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/bloglist-test
   SECRET=your-secret-key-here
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

1. Start the backend server (in part4 directory):
   ```bash
   cd ../../part4
   npm start
   ```

2. Start the frontend server (in bloglist-frontend directory):
   ```bash
   cd ../bloglist-frontend
   npm run dev
   ```

3. Run the e2e tests (in this directory):
   ```bash
   npm test
   ```

## Test Structure

- `tests/blog-app.spec.js` - Tests for login functionality
  - Login form is shown by default
  - Successful login with correct credentials
  - Failed login with wrong credentials

## Notes

- The tests reset the database before each test
- A test user is created automatically for each test
- The backend must be running on port 3003
- The frontend must be running on port 5173
