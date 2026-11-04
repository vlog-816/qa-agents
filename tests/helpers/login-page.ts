import { randomBytes } from 'node:crypto';
import type { Page } from '@playwright/test';

/** Read a required env var. The message names the variable, never a value. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(`Environment variable ${name} is not set or is empty. Set it in your own terminal session before running.`);
  }
  return value;
}

/** Random lowercase hex string (node:crypto, never Math.random). */
export function randomHex(length = 16): string {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export const usernameField = (page: Page) => page.getByLabel('Username');
export const passwordField = (page: Page) => page.getByLabel('Password');
export const loginButton = (page: Page) => page.getByRole('button', { name: /login/i });
export const logoutControl = (page: Page) =>
  page.getByRole('link', { name: /logout/i }).or(page.getByRole('button', { name: /logout/i }));

/**
 * Enter the values and choose Login. Any error is replaced by a NEW error
 * with a fixed message, because Playwright call logs of a failed fill can
 * contain the typed value. The original message and stack are dropped on purpose.
 * This covers all typed values, including the fake ones.
 */
export async function enterCredentialsAndLogin(page: Page, username: string, password: string): Promise<void> {
  try {
    await usernameField(page).fill(username);
    await passwordField(page).fill(password);
    await loginButton(page).click();
  } catch {
    throw new Error('Credential entry failed (details hidden on purpose)');
  }
}
