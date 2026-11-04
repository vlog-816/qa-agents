import { test, expect } from '../helpers/host-guard';
import {
  emailField,
  enterCredentialsAndSignIn,
  expectRejectedSignIn,
  passwordField,
  randomHex,
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
  'TC-002 Unknown email with a random password is rejected',
  { tag: ['@REQ-003'], annotation: [{ type: 'REQ', description: 'REQ-003' }] },
  async ({ page }) => {
    // Generated values live in memory only; never printed, attached or annotated.
    const existing = process.env.QA_TEST_USER;
    let email = `${randomHex()}@example.com`;
    if (existing) {
      // In-memory collision guard (case-insensitive).
      while (email.toLowerCase() === existing.toLowerCase()) {
        email = `${randomHex()}@example.com`;
      }
    }
    const password = randomHex();

    // Step 1: open the login page; the form is shown.
    await page.goto('/login');
    await expect(emailField(page)).toBeVisible();
    await expect(passwordField(page)).toBeVisible();
    await expect(signInButton(page)).toBeEnabled();
    const before = await snapshotVisibleText(page);

    // Steps 2 to 4: enter the generated values and choose Sign in (sanitized helper).
    await enterCredentialsAndSignIn(page, email, password);

    // Step 4 expected (loose): stays on /login, form shown again, some error text visible.
    await expectRejectedSignIn(page, before);
  },
);
