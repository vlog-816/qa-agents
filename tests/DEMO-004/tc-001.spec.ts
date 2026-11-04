import { test, expect } from '../helpers/host-guard';
import type { Page } from '@playwright/test';

// Per-spec host list: a SUBSET of data.allowed_hosts in qa-profile.yaml.
// Trace, screenshot and video are OFF so a typed credential cannot end up in evidence.
test.use({
  baseURL: 'https://the-internet.herokuapp.com',
  allowedHosts: ['the-internet.herokuapp.com'],
  trace: 'off',
  screenshot: 'off',
  video: 'off',
});

/** Read a required env var. The message names the variable, never a value. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(`Environment variable ${name} is not set or is empty. Set it in your own terminal session before running.`);
  }
  return value;
}

/**
 * Enter the credentials and choose Login. Any error is replaced by a new
 * sanitized error, because Playwright call logs of a failed fill can contain
 * the typed value. The original message and stack are dropped on purpose.
 */
async function enterCredentialsAndLogin(page: Page, username: string, password: string): Promise<void> {
  try {
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: /login/i }).click();
  } catch {
    throw new Error('Credential entry failed (details hidden on purpose)');
  }
}

test(
  'TC-001 Valid username and password lead to the secure area',
  { tag: ['@REQ-001', '@REQ-002'], annotation: [{ type: 'REQ', description: 'REQ-001, REQ-002' }] },
  async ({ page }) => {
    // Fail fast before opening any page. Values are never printed or attached.
    const username = requireEnv('QA_TEST_USER');
    const password = requireEnv('QA_TEST_PASSWORD');

    // Step 1: open the login page; the form is shown.
    await page.goto('/login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(usernameField).toBeVisible();
    await expect(usernameField).toBeEmpty();
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toBeEmpty();
    await expect(loginButton).toBeEnabled();

    // Steps 2 and 3: enter both values and choose Login (sanitized helper).
    await enterCredentialsAndLogin(page, username, password);

    // Step 3 expected: the secure area (address /secure).
    await expect(page).toHaveURL(/\/secure$/);

    // Step 4 expected (loose check until the first human run):
    // a visible success message that contains "logged in", a Logout control, no error.
    await expect(page.getByText(/logged in/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /logout/i }).or(page.getByRole('button', { name: /logout/i })).first()).toBeVisible();
    await expect(page.getByText(/invalid|error|incorrect/i)).toHaveCount(0);
  },
);
