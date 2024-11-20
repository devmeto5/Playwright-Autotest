const { test, expect } = require('@playwright/test');

test('Login test example', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www1.jobdiva.com/portal/?a=kvjdnwvnzj27zciczdtsaw5iprfbr608124hxb809uivgd7lqwznjax8b2fewgqk&compid=0#/login', { waitUntil: 'networkidle' });

  // Debugging helpers
  page.on('console', msg => console.log(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', exception => console.log(`Unhandled exception: "${exception}"`));
  page.on('requestfailed', request => {
    console.log(`Request failed: ${request.url()} - ${request.failure().errorText}`);
  });

  // Capture screenshot before waiting for the element
  await page.screenshot({ path: 'before-wait-screenshot.png', fullPage: true });

  // Wait for the login form to be visible
  const loginForm = page.locator('form'); // Replace with the actual selector for the login form
  await loginForm.waitFor({ state: 'visible', timeout: 30000 });

  // Fill in the email field with test data
  const emailField = page.locator('input[name="email"]');
  await emailField.fill('testuser@example.com'); // Test email

  // Fill in the password field with test data
  const passwordField = page.locator('input[name="password"]');
  await passwordField.fill('testPassword123!'); // Test password

  // Click the login button
  await page.click('button[type="submit"]');

  // Verify successful login by checking the redirected URL
  await expect(page).toHaveURL('https://www1.jobdiva.com/portal/?a=kvjdnwvnzj27zciczdtsaw5iprfbr608124hxb809uivgd7lqwznjax8b2fewgqk&compid=0#/profilehome');
});
