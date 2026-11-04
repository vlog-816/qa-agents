import { defineConfig, devices } from '@playwright/test';

// Config for the QA pilot. Only the host demowebshop.tricentis.com is used
// (a subset of data.allowed_hosts in qa-profile.yaml). The same value is
// checked again in tests/helpers/host-guard.ts.
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0, // retries hide flaky tests; add only with approval
  // Locally: list only. In CI: also an HTML report that is never opened.
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Default output folders: test-results/ and playwright-report/ (git-ignored).
  // No webServer: the target is a public demo host.
});
