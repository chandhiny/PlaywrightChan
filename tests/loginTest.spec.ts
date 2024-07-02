import { test, expect } from '@playwright/test';

test('GitHub login test', async ({ page }) => {
  const username = process.env.GITHUB_USERNAME;
  const password = process.env.GITHUB_PASSWORD;

  // Navigate to GitHub login page
  await page.goto('https://github.com/login');

  // Enter username
  await page.fill('input[name="login"]', username || '');

  // Enter password
  await page.fill('input[name="password"]', password || '');

  // Click the login button
  await page.click('input[name="commit"]');

  // Wait for navigation to the user's profile page
  await page.waitForURL('https://github.com/');

  // Check if login was successful by looking for the profile avatar or some element present after login
  const avatar = await page.$('//a[@aria-label="Homepage "]');
  expect(avatar).not.toBeNull();

  await page.fill('//input[@id="dashboard-repos-filter-left"]', 'uiautomationchan');
  await page.press('//input[@id="dashboard-repos-filter-left"]', 'Enter');

  await page.waitForURL('https://github.com/?q=uiautomationchan');
});
