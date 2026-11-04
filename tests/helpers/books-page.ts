import { expect, type Locator, type Page } from '@playwright/test';

export type Product = {
  name: string;
  /** Selling price (the red, second price). This is the price that counts. */
  selling: number;
  /** Original (struck-through) price, or null if the product has none. */
  original: number | null;
};

export type ControlKind = 'view' | 'sort' | 'display';

// One option label that exists only in that control, used to find the control
// by role (the comboboxes have no accessible name in the page snapshot).
const MARKER_OPTION: Record<ControlKind, string> = {
  view: 'List',
  sort: 'Name: A to Z',
  display: '12',
};

export function parsePrice(text: string): number {
  const value = Number.parseFloat(text.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(value)) {
    throw new Error(`Cannot read a price from the text "${text}"`);
  }
  return value;
}

/** Case-insensitive ascending comparison (decided by the user, 2026-11-04). */
export function compareNamesCaseInsensitive(a: string, b: string): number {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
}

/**
 * Minimal page object for the Books category page.
 *
 * LOCATORS THAT ARE UNVERIFIED UNTIL THE FIRST RUN (no browser check was
 * possible when this file was written). They are all in this file:
 *   U1  productItems          CSS '.product-item'
 *   U2  selling price         CSS '.actual-price' inside a product item
 *   U3  original price        CSS '.old-price' inside a product item
 *   U4  control(kind)         role 'combobox' filtered by a marker option (role-based, not CSS, but not run)
 *   U5  currentPageMarker(n)  role 'listitem' with only the number and no link
 *   U6  URL query values      orderby=5 / orderby=10 / pagesize=N / pagenumber=N / price=-25
 *                             (taken from the run-2 notes and snapshots, not run from a script)
 */
export class BooksPage {
  constructor(readonly page: Page) {}

  // --- U1 ---
  get productItems(): Locator {
    return this.page.locator('.product-item');
  }

  async open(): Promise<void> {
    await this.page.goto('/books');
    await expect(this.page.getByRole('heading', { name: 'Books', level: 1 })).toBeVisible();
    await this.waitForList();
  }

  async waitForList(): Promise<void> {
    await expect(this.productItems.first()).toBeVisible();
  }

  // --- Reading the list ---

  async names(): Promise<string[]> {
    await this.waitForList();
    const texts = await this.productItems.getByRole('heading', { level: 2 }).allInnerTexts();
    return texts.map((t) => t.trim());
  }

  async products(): Promise<Product[]> {
    await this.waitForList();
    const result: Product[] = [];
    for (const item of await this.productItems.all()) {
      const name = (await item.getByRole('heading', { level: 2 }).innerText()).trim();
      // --- U2 ---
      const selling = item.locator('.actual-price');
      if ((await selling.count()) !== 1) {
        throw new Error(`Product "${name}": expected exactly one selling price, found ${await selling.count()}`);
      }
      // --- U3 ---
      const original = item.locator('.old-price');
      const originalCount = await original.count();
      if (originalCount > 1) {
        throw new Error(`Product "${name}": more than one original price found`);
      }
      result.push({
        name,
        selling: parsePrice(await selling.innerText()),
        original: originalCount === 1 ? parsePrice(await original.innerText()) : null,
      });
    }
    return result;
  }

  // --- Controls (U4) ---

  control(kind: ControlKind): Locator {
    return this.page.getByRole('combobox').filter({
      has: this.page.getByRole('option', { name: MARKER_OPTION[kind], exact: true }),
    });
  }

  selectedOption(kind: ControlKind): Locator {
    return this.control(kind).locator('option:checked');
  }

  /**
   * Choose an option; the page reloads. Waits for the URL to match
   * `urlAfter`, then for the list to be shown again. `urlAfter` must NOT
   * match the URL before the change.
   */
  async choose(kind: ControlKind, label: string, urlAfter: RegExp): Promise<void> {
    await this.control(kind).selectOption({ label });
    await this.page.waitForURL(urlAfter);
    await this.waitForList();
  }

  chooseSort(label: 'Name: A to Z' | 'Price: Low to High'): Promise<void> {
    const orderby = label === 'Name: A to Z' ? 5 : 10;
    return this.choose('sort', label, new RegExp(`[?&]orderby=${orderby}(&|$)`));
  }

  chooseDisplay(size: 4 | 8 | 12): Promise<void> {
    return this.choose('display', String(size), new RegExp(`[?&]pagesize=${size}(&|$)`));
  }

  // --- Pager (role based) ---

  get nextLink(): Locator {
    return this.page.getByRole('link', { name: 'Next', exact: true });
  }

  get previousLink(): Locator {
    return this.page.getByRole('link', { name: 'Previous', exact: true });
  }

  pageLink(n: number): Locator {
    return this.page.getByRole('link', { name: String(n), exact: true });
  }

  // --- U5 ---
  currentPageMarker(n: number): Locator {
    return this.page
      .getByRole('listitem')
      .filter({ hasText: new RegExp(`^\\s*${n}\\s*$`) })
      .filter({ hasNot: this.page.getByRole('link') });
  }

  async goToPage(n: number): Promise<void> {
    await this.pageLink(n).click();
    await this.page.waitForURL(new RegExp(`[?&]pagenumber=${n}(&|$)`));
    await this.waitForList();
  }

  // --- Price filter (role and text based) ---

  rangeLink(label: string): Locator {
    return this.page.getByRole('link', { name: label, exact: true });
  }

  activeFilterText(label: string): Locator {
    return this.page.getByText(label, { exact: true });
  }

  get removeFilterLink(): Locator {
    return this.page.getByRole('link', { name: 'Remove Filter', exact: true });
  }

  async applyUnder25(): Promise<void> {
    await this.rangeLink('Under 25.00').click();
    await this.page.waitForURL(/[?&]price=-25(&|$)/);
    await this.waitForList();
  }

  async removeFilter(): Promise<void> {
    await this.removeFilterLink.click();
    await this.page.waitForURL((url) => !url.searchParams.has('price'));
    await this.waitForList();
  }
}
