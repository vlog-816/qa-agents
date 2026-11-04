import { test, expect } from '../helpers/host-guard';
import { BooksPage } from '../helpers/books-page';

const PAGE_SIZE = 4;

test(
  'TC-007 4 per page gives two pages with a pager',
  { tag: '@REQ-003', annotation: { type: 'requirement', description: 'REQ-003' } },
  async ({ page }) => {
    const books = new BooksPage(page);

    // Step 1: open the Books category page. Expected: the list is displayed.
    await books.open();
    const allNames = await books.names();
    const count = allNames.length;

    // Precondition: more than 4 and at most 8 products (all on one page by default).
    test.skip(
      (await books.nextLink.count()) > 0,
      'Precondition not met: more than 8 products (pager at the default size); TC-007 cannot be judged'
    );
    test.skip(count <= PAGE_SIZE, `Precondition not met: only ${count} product(s), 4 or fewer; TC-007 cannot be judged`);

    // Rule computed from the count: ceiling(count / 4) pages, 4 on every page but the last.
    const pages = Math.ceil(count / PAGE_SIZE);
    const lastPageCount = count - PAGE_SIZE * (pages - 1);
    expect(pages, 'precondition (at most 8 products) gives two pages').toBe(2);

    // Step 2: in "Display" choose 4 per page.
    // Expected: "4" is the selected size; exactly 4 products are shown.
    await books.chooseDisplay(4);
    await expect(books.selectedOption('display')).toHaveText('4');
    await expect(books.productItems).toHaveCount(PAGE_SIZE);

    // Step 3: look at the pager under the list.
    // Expected: page 1 is current, a link to page 2 and a "Next" link.
    await expect(books.currentPageMarker(1)).toBeVisible();
    await expect(books.pageLink(2)).toBeVisible();
    await expect(books.nextLink).toBeVisible();

    // Step 4: note the 4 names, then go to page 2 with the pager.
    // Expected: page 2 shown with a "Previous" link and no "Next" link.
    const page1Names = await books.names();
    await books.goToPage(2);
    await expect(books.previousLink).toBeVisible();
    await expect(books.nextLink).toHaveCount(0);

    // Step 5: note the names on page 2.
    // Expected: the remaining products; no product from page 1 is repeated.
    const page2Names = await books.names();
    expect(page2Names, 'remaining products are shown on the last page').toHaveLength(lastPageCount);
    for (const name of page2Names) {
      expect(page1Names, `"${name}" must not be repeated from page 1`).not.toContain(name);
    }
    expect([...page1Names, ...page2Names].sort(), 'every product exactly once over both pages').toEqual(
      [...allNames].sort()
    );
  }
);
