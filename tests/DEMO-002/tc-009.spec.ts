import { test, expect } from '../helpers/host-guard';
import { BooksPage } from '../helpers/books-page';

const LIMIT = 25.0;
const RANGE_LABELS = ['Under 25.00', '25.00 - 50.00', 'Over 50.00'];

test(
  'TC-009 Price filter "Under 25.00" shows only cheaper products and Remove Filter restores the list',
  { tag: '@REQ-005', annotation: { type: 'requirement', description: 'REQ-005' } },
  async ({ page }) => {
    const books = new BooksPage(page);

    // Step 1: open the Books category page and note the full list of product names.
    // Expected: all products shown and the "Filter by price" ranges are offered.
    await books.open();
    for (const label of RANGE_LABELS) {
      await expect(books.rangeLink(label)).toBeVisible();
    }
    const full = await books.products();
    const fullNames = full.map((p) => p.name);
    const listIsComplete = (await books.nextLink.count()) === 0;

    // Preconditions (cannot be judged if they do not hold; not a failure).
    test.skip(
      !full.some((p) => p.selling < LIMIT),
      'Precondition not met: no product below 25.00; TC-009 cannot be judged'
    );
    test.skip(
      !full.some((p) => p.selling >= LIMIT),
      'Precondition not met: no product at 25.00 or more; TC-009 cannot be judged'
    );
    test.skip(
      full.some((p) => p.selling === LIMIT),
      'Precondition not met: a product has exactly 25.00 (boundary not tested); TC-009 cannot be judged'
    );

    // Step 2: click the "Under 25.00" range.
    // Expected: the filter panel shows "Under 25.00" and a "Remove Filter" link.
    await books.applyUnder25();
    await expect(books.activeFilterText('Under 25.00')).toBeVisible();
    await expect(books.removeFilterLink).toBeVisible();

    // Step 3: read the selling price of every listed product.
    // Expected: every selling price below 25.00; at least one product; none at 25.00 or more.
    const filtered = await books.products();
    expect(filtered.length, 'at least one product is shown').toBeGreaterThan(0);
    for (const p of filtered) {
      expect(p.selling, `selling price of "${p.name}" is below 25.00`).toBeLessThan(LIMIT);
    }
    const filteredNames = filtered.map((p) => p.name);
    for (const p of full.filter((x) => x.selling >= LIMIT)) {
      expect(filteredNames, `"${p.name}" (selling ${p.selling}) must not be shown`).not.toContain(p.name);
    }
    if (listIsComplete) {
      // Every product below 25.00 (by selling price, original price ignored) must be shown.
      for (const p of full.filter((x) => x.selling < LIMIT)) {
        expect(filteredNames, `"${p.name}" (selling ${p.selling}) must be shown`).toContain(p.name);
      }
    }

    // Step 4: click "Remove Filter".
    // Expected: the full list from step 1 is shown again and the price ranges are offered again.
    await books.removeFilter();
    for (const label of RANGE_LABELS) {
      await expect(books.rangeLink(label)).toBeVisible();
    }
    expect([...(await books.names())].sort(), 'full list from step 1 is restored').toEqual([...fullNames].sort());
  }
);
