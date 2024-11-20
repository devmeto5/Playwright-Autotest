# Automated Login Test with Playwright

This guide explains how to set up and run an automated login test using Playwright.

## Prerequisites
1. Install Node.js.
2. Install Playwright:

   ```bash
   npm install playwright
   ```

3. Create a directory for your tests (e.g., `playwright-tests`).

## Steps to Run the Test

### Create the Test File
Create a file called `login.test.js` in your test directory, and paste the following code:

```javascript
const { test, expect } = require('@playwright/test');

test('Login test example', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://example.com/login', { waitUntil: 'networkidle' });

  // Debugging helpers
  page.on('console', msg => console.log(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', exception => console.log(`Unhandled exception: "${exception}"`));
  page.on('requestfailed', request => {
    console.log(`Request failed: ${request.url()} - ${request.failure().errorText}`);
  });

  // Capture screenshot before waiting for the element
  await page.screenshot({ path: 'before-wait-screenshot.png', fullPage: true });

  // Wait for the login form to be visible
  const loginForm = page.locator('form');
  await loginForm.waitFor({ state: 'visible', timeout: 30000 });

  // Fill in the email field with test data
  const emailField = page.locator('input[name="email"]');
  await emailField.fill('testuser@example.com'); // Test email

  // Fill in the password field with test data
  const passwordField = page.locator('input[name="password"]');
  await passwordField.fill('TestPassword123!'); // Test password

  // Click the login button
  await page.click('button[type="submit"]');

  // Verify successful login
  await expect(page).toHaveURL('https://example.com/dashboard');
});
```

### Run the Test
Open a terminal, navigate to the test file's directory, and run:

```bash
npx playwright test login.test.js
```

### View Results
- Check the terminal for test execution results.
- Open `before-wait-screenshot.png` in the directory for debugging.

## Customization
- Replace `https://example.com/login` with your app's login URL.
- Adjust the selectors (e.g., `input[name="email"]`, `input[name="password"]`) to match your login form.
- Update the expected URL (`https://example.com/dashboard`) for a successful login.

 