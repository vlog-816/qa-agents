import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Reuse only; login-page.ts is not changed.
export { randomHex, requireEnv } from './login-page';

// Locators for the email login form (labels from the recorded snapshot of /login).
export const emailField = (page: Page) => page.getByLabel('Email Address');
export const passwordField = (page: Page) => page.getByLabel('Password');
export const signInButton = (page: Page) => page.getByRole('button', { name: /sign in/i });

/**
 * Enter the values and choose "Sign in". Any error is replaced by a NEW error
 * with a fixed message, because Playwright call logs of a failed fill can
 * contain the typed value. The original message and stack are dropped on purpose.
 * This covers all typed values, including the generated fake ones.
 */
export async function enterCredentialsAndSignIn(page: Page, email: string, password: string): Promise<void> {
  try {
    await emailField(page).fill(email);
    await passwordField(page).fill(password);
    await signInButton(page).click();
  } catch {
    throw new Error('Credential entry failed (details hidden on purpose)');
  }
}

/** Visible text of the page as a set of trimmed non-empty lines (used only for a before/after comparison). */
async function visibleLines(page: Page): Promise<Set<string>> {
  const text = await page.locator('body').innerText();
  return new Set(
    text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0),
  );
}

/** Snapshot of the visible text lines BEFORE submit. Call right after the form is shown. */
export async function snapshotVisibleText(page: Page): Promise<Set<string>> {
  return visibleLines(page);
}

/**
 * Negative-result checks (accepted answer Q10: no guess of signed-in UI).
 * - URL stays on /login
 * - the form is shown again (email field and Sign in button visible, button enabled)
 * - some visible error text: a role=alert element, OR a visible line of text that
 *   was not on the page before submit. Wording is NOT asserted (loose).
 * Messages of failed expectations contain no typed value (only locators and URL).
 */
export async function expectRejectedSignIn(page: Page, textBefore: Set<string>): Promise<void> {
  await expect(page).toHaveURL(/\/login\/?$/);
  await expect(emailField(page)).toBeVisible();
  await expect(signInButton(page)).toBeVisible();
  await expect(signInButton(page)).toBeEnabled();

  await expect
    .poll(
      async () => {
        const alerts = await page.getByRole('alert').filter({ hasText: /\S/ }).count();
        if (alerts > 0) return true;
        const now = await visibleLines(page);
        for (const line of now) {
          if (!textBefore.has(line)) return true;
        }
        return false;
      },
      { message: 'Expected some new visible error text after the rejected sign-in' },
    )
    .toBe(true);

  // Still on /login after the error appeared.
  await expect(page).toHaveURL(/\/login\/?$/);
}
