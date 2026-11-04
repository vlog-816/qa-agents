import { test, expect } from '../helpers/host-guard';
import { BooksPage } from '../helpers/books-page';

test(
  'TC-004 Sort by Price Low to High uses the selling price',
  { tag: '@REQ-002', annotation: { type: 'requirement', description: 'REQ-002' } },
  async ({ page }) => {
    const books = new BooksPage(page);

    // Step 1: open the Books category page. Expected: the list is displayed.
    await books.open();
    const before = await books.products();

    // Preconditions of the case (cannot be judged if they do not hold).
    test.skip(
      new Set(before.map((p) => p.selling)).size < 2,
      'Precondition not met: fewer than 2 different selling prices; TC-004 cannot be judged'
    );
    test.skip(
      (await books.nextLink.count()) > 0,
      'Precondition not met: products do not fit on one page (pager shown); TC-004 cannot be judged'
    );

    // Step 2: in "Sort by" choose "Price: Low to High".
    // Expected: the list is shown again and the option is selected.
    await books.chooseSort('Price: Low to High');
    await expect(books.selectedOption('sort')).toHaveText('Price: Low to High');

    // Step 3: read the selling price (red) of every product from first to last.
    // Expected: selling prices never decrease (order inside equal prices is not checked).
    const after = await books.products();
    const selling = after.map((p) => p.selling);
    expect(selling, 'selling prices never decrease').toEqual([...selling].sort((a, b) => a - b));
    expect(after.map((p) => p.name).sort(), 'same products as before sorting').toEqual(
      before.map((p) => p.name).sort()
    );

    // Step 4: compare with the original (struck-through) prices.
    // Expected: the order follows the selling price, not the original price.
    // This is already shown by step 3 (which reads only the selling price).
    // Proof against the original price exists only when the original prices,
    // in this order, are not themselves ascending (preferred precondition).
    const originals = after.map((p) => p.original ?? p.selling);
    const originalOrderWouldDiffer = originals.some((v, i) => i > 0 && v < originals[i - 1]);
    test.info().annotations.push({
      type: 'original-price-proof',
      description: originalOrderWouldDiffer
        ? 'available: the original prices alone would give a different order'
        : 'not available today: the original prices alone would give the same order',
    });
  }
);
