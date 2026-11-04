import { test, expect } from '../helpers/host-guard';
import { BooksPage, compareNamesCaseInsensitive } from '../helpers/books-page';

test(
  'TC-002 Sort by Name A to Z',
  { tag: '@REQ-002', annotation: { type: 'requirement', description: 'REQ-002' } },
  async ({ page }) => {
    const books = new BooksPage(page);

    // Step 1: open the Books category page. Expected: the list is displayed.
    await books.open();
    const namesBefore = await books.names();

    // Preconditions of the case (cannot be judged if they do not hold).
    test.skip(namesBefore.length < 3, 'Precondition not met: fewer than 3 products; TC-002 cannot be judged');
    test.skip(
      (await books.nextLink.count()) > 0,
      'Precondition not met: products do not fit on one page (pager shown); TC-002 cannot be judged'
    );
    expect(new Set(namesBefore.map((n) => n.toLowerCase())).size, 'products have different names').toBe(
      namesBefore.length
    );

    // Step 2: in "Sort by" choose "Name: A to Z".
    // Expected: the list is shown again and "Name: A to Z" is the selected sort option.
    await books.chooseSort('Name: A to Z');
    await expect(books.selectedOption('sort')).toHaveText('Name: A to Z');

    // Step 3: read the product names from first to last.
    // Expected: ascending alphabetical order (case-insensitive), same products as before.
    const namesAfter = await books.names();
    const expectedOrder = [...namesAfter].sort(compareNamesCaseInsensitive);
    expect(namesAfter, 'names are in ascending order, case-insensitive').toEqual(expectedOrder);
    expect([...namesAfter].sort(), 'same products as before sorting').toEqual([...namesBefore].sort());
  }
);
