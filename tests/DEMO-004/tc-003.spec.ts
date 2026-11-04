import { test, expect } from '../helpers/host-guard';
import {
  enterCredentialsAndLogin,
  loginButton,
  logoutControl,
  passwordField,
  randomHex,
  requireEnv,
  usernameField,
} from '../helpers/login-page';

// Per-spec host list: a SUBSET of data.allowed_hosts in qa-profile.yaml.
// Trace, screenshot and video are OFF so a typed value cannot end up in evidence.
test.use({
  baseURL: 'https://the-internet.herokuapp.com',
  allowedHosts: ['the-internet.herokuapp.com'],
  trace: 'off',
  screenshot: 'off',
  video: 'off',
});

test(
  'TC-003 Wrong password for the valid test user is rejected with an error',
  { tag: ['@REQ-004'], annotation: [{ type: 'REQ', description: 'REQ-004' }] },
  async ({ page }) => {
    // Fail fast before opening any page. Values are never printed or attached.
    const username = requireEnv('QA_TEST_USER');
    const wrongPassword = randomHex();

    // Step 1: open the login page; the form is shown.
    await page.goto('/login');
    await expect(usernameField(page)).toBeVisible();
    await expect(usernameField(page)).toBeEmpty();
    await expect(passwordField(page)).toBeVisible();
    await expect(passwordField(page)).toBeEmpty();
    await expect(loginButton(page)).toBeEnabled();

    // Steps 2 and 3: enter the values and choose Login (sanitized helper).
    await enterCredentialsAndLogin(page, username, wrongPassword);

    // Step 3 expected: not signed in, stays on /login.
    await expect(page).toHaveURL(/\/login$/);

    // Step 4 expected (loose, wording assumed): one visible element whose text has
    // both "password" and "invalid" (either order).
    await expect(page.getByText(/password[\s\S]*invalid|invalid[\s\S]*password/i)).toBeVisible();
    await expect(logoutControl(page)).toHaveCount(0);
    // The form is shown again.
    await expect(usernameField(page)).toBeVisible();
    await expect(loginButton(page)).toBeVisible();
  },
);
