import { test, expect } from '../helpers/host-guard';
import {
  emailField,
  enterCredentialsAndSignIn,
  passwordField,
  requireEnv,
  signInButton,
} from '../helpers/email-login-page';

// Per-spec host list: a SUBSET of data.allowed_hosts in qa-profile.yaml.
// Trace, screenshot and video are OFF so a typed value cannot end up in evidence.
test.use({
  baseURL: 'https://vlog-ai-powered-assistant.vercel.app',
  allowedHosts: ['vlog-ai-powered-assistant.vercel.app'],
  trace: 'off',
  screenshot: 'off',
  video: 'off',
});

test(
  'TC-001 Login form is shown and a valid account signs in',
  { tag: ['@REQ-001', '@REQ-002'], annotation: [{ type: 'REQ', description: 'REQ-001, REQ-002' }] },
  async ({ page }) => {
    // Fail fast; the message names only the variable. Values stay in memory.
    const email = requireEnv('QA_TEST_USER');
    const password = requireEnv('QA_TEST_PASSWORD');

    // Step 1: open the login page; empty fields and an enabled Sign in button.
    await page.goto('/login');
    await expect(emailField(page)).toBeVisible();
    await expect(emailField(page)).toBeEmpty();
    await expect(passwordField(page)).toBeVisible();
    await expect(passwordField(page)).toBeEmpty();
    await expect(signInButton(page)).toBeEnabled();

    // Steps 2 to 4: enter the values and choose Sign in (sanitized helper).
    await enterCredentialsAndSignIn(page, email, password);

    // Step 4 expected (loose, post-login page unknown): leaves /login, form gone.
    await expect(page).not.toHaveURL(/\/login\/?$/);
    await expect(emailField(page)).toBeHidden();
    await expect(signInButton(page)).toBeHidden();
  },
);
