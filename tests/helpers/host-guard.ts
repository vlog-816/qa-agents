import { test as base, expect } from '@playwright/test';

/**
 * Host guard.
 *
 * Every allowed-host list (this default and any per-spec `allowedHosts`
 * option) must be a SUBSET of data.allowed_hosts in qa-profile.yaml.
 * That list holds "localhost", "demowebshop.tricentis.com" and
 * "the-internet.herokuapp.com". "localhost" is allowed in the profile but is
 * NOT used here, so it is not listed.
 *
 * Default list (used when a spec does not set its own): the demo shop only.
 * A spec can narrow or switch the list with:
 *   test.use({ baseURL: 'https://...', allowedHosts: ['...'] });
 *
 * Every http/https request to a host outside the list is aborted. Aborted
 * requests (for example third-party fonts or analytics) are recorded and
 * attached to the test; they never fail a test (approved by the user,
 * 2026-11-04). Requests without a network host (data:, blob:, about:) are
 * not network requests and are not routed by the browser context.
 */
export const DEFAULT_ALLOWED_HOSTS: string[] = ['demowebshop.tricentis.com'];

/** Kept for backward compatibility: the default list. */
export const ALLOWED_HOSTS: readonly string[] = DEFAULT_ALLOWED_HOSTS;

export function isAllowedHost(
  hostname: string,
  hosts: readonly string[] = ALLOWED_HOSTS,
): boolean {
  return hosts.map((h) => h.toLowerCase()).includes(hostname.toLowerCase());
}

type Fixtures = {
  /** Hosts of the requests that were aborted in this test (read only). */
  blockedRequests: string[];
  hostGuard: void;
};

type Options = {
  /** Hosts this spec may reach. Must be a subset of data.allowed_hosts. */
  allowedHosts: string[];
};

export const test = base.extend<Fixtures & Options>({
  allowedHosts: [DEFAULT_ALLOWED_HOSTS, { option: true }],

  blockedRequests: async ({}, use) => {
    await use([]);
  },

  hostGuard: [
    async ({ context, blockedRequests, allowedHosts, baseURL }, use, testInfo) => {
      // Second barrier: the effective baseURL must itself be an allowed host.
      if (!baseURL || !isAllowedHost(new URL(baseURL).hostname, allowedHosts)) {
        throw new Error('baseURL is missing or its host is not in the allowed hosts list');
      }

      await context.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        const isNetwork = url.protocol === 'http:' || url.protocol === 'https:';
        if (isNetwork && !isAllowedHost(url.hostname, allowedHosts)) {
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
