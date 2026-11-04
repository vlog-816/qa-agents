import { test as base, expect } from '@playwright/test';

/**
 * Host guard.
 *
 * ALLOWED_HOSTS must be a SUBSET of data.allowed_hosts in qa-profile.yaml.
 * That list holds "localhost" and "demowebshop.tricentis.com". This pilot
 * uses only "demowebshop.tricentis.com"; "localhost" is allowed in the
 * profile but is NOT used here, so it is not listed.
 *
 * Every http/https request to another host is aborted. Aborted requests
 * (for example third-party fonts or analytics) are recorded and attached to
 * the test; they never fail a test (approved by the user, 2026-11-04).
 * Requests without a network host (data:, blob:, about:) are not network
 * requests and are not routed by the browser context.
 */
export const ALLOWED_HOSTS: readonly string[] = ['demowebshop.tricentis.com'];

export function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOSTS.includes(hostname.toLowerCase());
}

type Fixtures = {
  /** Hosts of the requests that were aborted in this test (read only). */
  blockedRequests: string[];
  hostGuard: void;
};

export const test = base.extend<Fixtures>({
  blockedRequests: async ({}, use) => {
    await use([]);
  },

  hostGuard: [
    async ({ context, blockedRequests }, use, testInfo) => {
      // Second barrier: the configured baseURL must itself be an allowed host.
      const baseURL = testInfo.project.use.baseURL;
      if (!baseURL || !isAllowedHost(new URL(baseURL).hostname)) {
        throw new Error('baseURL is missing or its host is not in ALLOWED_HOSTS');
      }

      await context.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        const isNetwork = url.protocol === 'http:' || url.protocol === 'https:';
        if (isNetwork && !isAllowedHost(url.hostname)) {
          blockedRequests.push(url.hostname);
          await route.abort('blockedbyclient');
          return;
        }
        await route.continue();
      });

      await use();

      // Report which hosts were blocked (hostnames only, no paths or queries).
      const unique = [...new Set(blockedRequests)].sort();
      if (unique.length > 0) {
        testInfo.annotations.push({
          type: 'blocked-hosts',
          description: `${blockedRequests.length} request(s) blocked: ${unique.join(', ')}`,
        });
        await testInfo.attach('blocked-hosts.json', {
          body: JSON.stringify({ count: blockedRequests.length, hosts: unique }, null, 2),
          contentType: 'application/json',
        });
      }
    },
    { auto: true },
  ],
});

export { expect };
