import { test, expect } from '../helpers/host-guard';
import {
  enterCredentialsAndLogin,
  loginButton,
  logoutControl,
  passwordField,
  randomHex,
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
  'TC-002 Unknown username is rejected with an error',
  { tag: ['@REQ-003'], annotation: [{ type: 'REQ', description: 'REQ-003' }] },
  async ({ page }) => {
    // Generated values live in memory only; never printed, attached or annotated.
    let username = randomHex();
    const existing = process.env.QA_TEST_USER;
    if (existing) {
      // In-memory collision guard: regenerate if equal (case-insensitive).
      while (username.toLowerCase() === existing.toLowerCase()) {
        username = randomHex();
      }
    }
    const password = randomHex();

    // Step 1: open the login page; the form is shown.
    await page.goto('/login');
    await expect(usernameField(page)).toBeVisible();
    await expect(usernameField(page)).toBeEmpty();
    await expect(passwordField(page)).toBeVisible();
    await expect(passwordField(page)).toBeEmpty();
    await expect(loginButton(page)).toBeEnabled();

    // Steps 2 and 3: enter the generated values and choose Login (sanitized helper).
    await enterCredentialsAndLogin(page, username, password);

    // Step 3 expected: not signed in, stays on /login.
    await expect(page).toHaveURL(/\/login$/);

    // Step 4 expected (loose, wording assumed): one visible element whose text has
    // both "username" and "invalid" (either order). The hint paragraph has no "invalid".
    await expect(page.getByText(/username[\s\S]*invalid|invalid[\s\S]*username/i)).toBeVisible();
    await expect(logoutControl(page)).toHaveCount(0);
    // The form is shown again.
    await expect(usernameField(page)).toBeVisible();
    await expect(loginButton(page)).toBeVisible();
  },
);
