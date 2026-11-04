import { test, expect } from '../helpers/host-guard';
import {
  emailField,
  enterCredentialsAndSignIn,
  expectRejectedSignIn,
  passwordField,
  randomHex,
  requireEnv,
  signInButton,
  snapshotVisibleText,
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
  'TC-003 Valid email with a wrong password is rejected',
  { tag: ['@REQ-003'], annotation: [{ type: 'REQ', description: 'REQ-003' }] },
  async ({ page }) => {
    // Only QA_TEST_USER is read here (the password variable is not referenced).
    const email = requireEnv('QA_TEST_USER');
    // Generated wrong password, in memory only.
    const wrongPassword = randomHex();

    // Step 1: open the login page; the form is shown.
    await page.goto('/login');
    await expect(emailField(page)).toBeVisible();
    await expect(passwordField(page)).toBeVisible();
    await expect(signInButton(page)).toBeEnabled();
    const before = await snapshotVisibleText(page);

    // Steps 2 to 4: enter the values and choose Sign in (sanitized helper).
    await enterCredentialsAndSignIn(page, email, wrongPassword);

    // Step 4 expected (loose): stays on /login, form shown again, some error text visible.
    await expectRejectedSignIn(page, before);
  },
);
