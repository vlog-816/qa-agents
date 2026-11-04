# Test Cases: DEMO-002 Books page listing controls / Ca kiểm thử: các điều khiển danh sách trang Books

- Feature ID: DEMO-002
- Date: 2026-11-04
- Platform: web (host `demowebshop.tricentis.com` only)
- Purpose: stable, repeatable behaviors found in exploratory run-2, written so the `automation-tester` can automate them later (BL-012 step 1). Approach of the approved plan is exploratory; these cases are a scripted set derived from it and are NOT yet run as scripted cases. / Mục đích: các hành vi ổn định từ run-2, viết để `automation-tester` tự động hóa sau.
- All test data is fake or none. No login, no credentials, no personal data. Run results are not stored here (see `06-report-run-<n>.md`). / Dữ liệu giả hoặc không có; kết quả không lưu ở đây.
- Price rule (Q1 accepted): the selling price (the red number, the second price) is the price that counts; the original price is struck through and must NOT be used. / Giá bán (đỏ) là giá được tính.
- Expected results are written as rules ("ordered by name ascending"), not as hard-coded lists, so they stay true if the shared demo data changes a little. Each case lists what it relies on under `preconditions`. Names and prices seen on 2026-11-03 appear only as examples in `test_data`. / Kết quả mong đợi viết dạng quy tắc.
- Products with equal selling price have no defined order between them: cases check only that prices never go the wrong way, never the order inside a tie. / Sản phẩm cùng giá không có thứ tự xác định.
- Status of all cases: `approved` by the approver (the user, acting as Boss-QA) in chat on 2026-11-04 ("Approve all"). Approval covers the case wording; only cases with `automation_candidate: yes` (12 of 13, not TC-011) go to the automation selection. / Tất cả đã được duyệt ngày 2026-11-04.

## Not covered (no expectation) / Không bao phủ (chưa có kỳ vọng)

```yaml
note: not covered, no expectation
open_questions:
  - Q2: where exactly 50.00 belongs ("25.00 - 50.00" or "Over 50.00"). Not covered, no expectation. Also no product has a selling price of exactly 25.00 or 50.00 now, so it cannot be observed.
  - Q3: expected order of the sort options "Position" and "Created on". Not covered, no expectation (no dates are shown on the page).
  - Q6: what an empty price-filter result should show (BUG-001: blank area, no message, View as / Sort by / Display controls vanish). Only the empty range case TC-011 touches it, and it is not an automation candidate.
other_not_covered:
  - Add to cart and cart (DEMO-001).
  - Custom price address such as a range that is not one of the three links (ignored silently; recorded only, no expectation).
  - Reload, browser Back, page number beyond the last page (ideas not run).
```

## Test cases / Ca kiểm thử

```yaml
id: TC-001
req: [REQ-001]
title: Default list shows every book once, including out-of-stock ones / Danh sách mặc định hiển thị mọi cuốn sách một lần, kể cả hết hàng
platform: web
priority: P1
type: functional
tags: [list, smoke, CH-01, explored-2026-11-03]
preconditions:
  - The Books category has at least two products (on 2026-11-03: six).
  - Relies on the default choices (Grid view, sort by Position, 8 per page) and on the number of products being 8 or fewer, so all fit on one page.
  - Preferably at least one product has no Add to cart button (out of stock). If none exists, step 3 is skipped and noted.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page as a new visitor, without choosing any filter
    expected: The product list is displayed with the default choices
  - n: 2
    action: Read the name, the review count and both prices of every listed product
    expected: Every product shows a name and a selling price; no product name appears twice
  - n: 3
    action: Look for products that have no Add to cart button
    expected: Such out-of-stock products are still listed with name and price (Q5 accepted)
  - n: 4
    action: Check that no pager is shown
    expected: No pager is displayed because all products fit on one page
expected_result: Every product of the category is listed exactly once with name and selling price, including products without an Add to cart button
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-002
req: [REQ-002]
title: Sort by Name A to Z / Sắp xếp theo tên A đến Z
platform: web
priority: P1
type: functional
tags: [sort, name, CH-02, explored-2026-11-03]
preconditions:
  - The Books category has at least three products with different names.
  - Display is set to a size that shows all products on one page (the default of 8 is enough for six products).
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page
    expected: The list is displayed
  - n: 2
    action: In "Sort by", choose "Name: A to Z"
    expected: The list is shown again and "Name: A to Z" is the selected sort option
  - n: 3
    action: Read the product names from first to last
    expected: The names are in ascending alphabetical order
expected_result: The products are ordered by name ascending, the same products as before sorting are shown, and the chosen option stays selected
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-003
req: [REQ-002]
title: Sort by Name Z to A / Sắp xếp theo tên Z đến A
platform: web
priority: P1
type: functional
tags: [sort, name, CH-02, explored-2026-11-03]
preconditions:
  - The Books category has at least three products with different names.
  - Display shows all products on one page.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page
    expected: The list is displayed
  - n: 2
    action: In "Sort by", choose "Name: Z to A"
    expected: The list is shown again and "Name: Z to A" is the selected sort option
  - n: 3
    action: Read the product names from first to last
    expected: The names are in descending alphabetical order, the exact reverse of the A to Z order
expected_result: The products are ordered by name descending, the same products are shown, and the chosen option stays selected
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-004
req: [REQ-002]
title: Sort by Price Low to High uses the selling price / Sắp xếp giá thấp đến cao theo giá bán
platform: web
priority: P1
type: functional
tags: [sort, price, CH-02, explored-2026-11-03]
preconditions:
  - At least two products have different selling prices (on 2026-11-03: 10.00, 24.00, 51.00).
  - Preferably at least one product whose original price is higher than another product's selling price while its own selling price is lower (example: original 27.00, selling 10.00 against another product with selling 24.00), to prove the original price is not used.
  - Display shows all products on one page.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page
    expected: The list is displayed
  - n: 2
    action: In "Sort by", choose "Price: Low to High"
    expected: The list is shown again and "Price: Low to High" is the selected sort option
  - n: 3
    action: Read the selling price (red) of every product from first to last
    expected: The selling prices never decrease from one product to the next (equal prices may appear in any order between themselves)
  - n: 4
    action: Compare with the original (struck-through) prices
    expected: The order follows the selling price, not the original price
expected_result: Products are ordered by selling price ascending; the first product has the lowest selling price and the last has the highest
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-005
req: [REQ-002]
title: Sort by Price High to Low uses the selling price / Sắp xếp giá cao đến thấp theo giá bán
platform: web
priority: P1
type: functional
tags: [sort, price, CH-02, explored-2026-11-03]
preconditions:
  - At least two products have different selling prices (on 2026-11-03: 10.00, 24.00, 51.00).
  - Display shows all products on one page.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page
    expected: The list is displayed
  - n: 2
    action: In "Sort by", choose "Price: High to Low"
    expected: The list is shown again and "Price: High to Low" is the selected sort option
  - n: 3
    action: Read the selling price (red) of every product from first to last
    expected: The selling prices never increase from one product to the next (equal prices may appear in any order between themselves)
expected_result: Products are ordered by selling price descending; the first product has the highest selling price and the last has the lowest. The order inside a group of equal prices is not checked
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-006
req: [REQ-004, REQ-001]
title: Grid and List views show the same products in the same order / Chế độ lưới và danh sách hiển thị cùng sản phẩm, cùng thứ tự
platform: web
priority: P1
type: functional
tags: [view, grid, list, CH-01, explored-2026-11-03]
preconditions:
  - The Books category has at least two products.
  - Display shows all products on one page.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page in Grid view and note the product names and selling prices from first to last
    expected: "Grid" is the selected view and the list is displayed
  - n: 2
    action: In "View as", choose "List"
    expected: "List" is the selected view
  - n: 3
    action: Note the product names and selling prices from first to last
    expected: The same products with the same prices appear in the same order as in Grid view
  - n: 4
    action: In "Sort by", choose "Name: Z to A", then switch "View as" back to "Grid"
    expected: The sort option is still "Name: Z to A", the products are in the same order in Grid as they were in List
expected_result: Both views show the same set of products in the same order, and switching the view keeps the sort choice
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-007
req: [REQ-003]
title: 4 per page gives two pages with a pager / 4 sản phẩm mỗi trang cho hai trang có phân trang
platform: web
priority: P1
type: functional
tags: [paging, pagesize, CH-03, explored-2026-11-03]
preconditions:
  - The Books category has more than 4 and at most 8 products (on 2026-11-03: exactly six, so pages of 4 and 2). If the count changes, expect ceiling(count / 4) pages with 4 on every page but the last.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page
    expected: The list is displayed
  - n: 2
    action: In "Display", choose 4 per page
    expected: "4" is the selected size; exactly 4 products are shown
  - n: 3
    action: Look at the pager under the list
    expected: A pager is shown with page 1 as the current page, a link to page 2 and a "Next" link
  - n: 4
    action: Note the names of the 4 products, then go to page 2 with the pager
    expected: Page 2 is shown with a "Previous" link and no "Next" link
  - n: 5
    action: Note the names on page 2
    expected: The remaining products are shown (on 2026-11-03: 2); no product from page 1 is repeated
expected_result: With 4 per page the list is split into pages of 4 and the rest; together the pages contain every product exactly once; a pager is shown
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-008
req: [REQ-003]
title: 8 and 12 per page show all products with no pager / 8 và 12 mỗi trang hiển thị tất cả, không có phân trang
platform: web
priority: P2
type: functional
tags: [paging, pagesize, CH-03, explored-2026-11-03]
preconditions:
  - The Books category has at most 8 products (on 2026-11-03: six), so all fit on one page for both 8 and 12.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page and, in "Display", choose 4 per page, then go to page 2 with the pager
    expected: Page 2 is shown
  - n: 2
    action: In "Display", choose 8 per page
    expected: "8" is the selected size, the list is on page 1, all products are shown and no pager is displayed
  - n: 3
    action: In "Display", choose 12 per page
    expected: "12" is the selected size, the same products are shown and no pager is displayed
expected_result: With 8 or 12 per page every product is shown on one page and there is no pager; changing the size from page 2 returns to page 1
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-009
req: [REQ-005]
title: Price filter "Under 25.00" shows only cheaper products and Remove Filter restores the list / Lọc "Under 25.00" và bỏ bộ lọc
platform: web
priority: P1
type: functional
tags: [filter, price, CH-04, explored-2026-11-03]
preconditions:
  - At least one product has a selling price below 25.00 and at least one has a selling price of 25.00 or more (on 2026-11-03: five below 25.00 and Science at 51.00).
  - Preferably a product whose original price is 25.00 or more but whose selling price is below 25.00 (example: original 27.00, selling 10.00); it must appear in the filtered list.
  - Relies on no product having a selling price of exactly 25.00 (the 25.00 boundary is not tested here).
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page and note the full list of product names
    expected: All products are shown and the "Filter by price" ranges are offered
  - n: 2
    action: Click the "Under 25.00" range
    expected: The filter panel shows "Under 25.00" and a "Remove Filter" link
  - n: 3
    action: Read the selling price of every listed product
    expected: Every selling price is below 25.00; at least one product is shown; products with a selling price of 25.00 or more are not shown
  - n: 4
    action: Click "Remove Filter"
    expected: The full list from step 1 is shown again and the price ranges are offered again
expected_result: The filter shows only products whose selling price is under 25.00 (the original price is ignored) and Remove Filter restores the complete list
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-010
req: [REQ-005]
title: Price filter "Over 50.00" shows only more expensive products and Remove Filter restores the list / Lọc "Over 50.00" và bỏ bộ lọc
platform: web
priority: P1
type: functional
tags: [filter, price, CH-04, explored-2026-11-03]
preconditions:
  - At least one product has a selling price above 50.00 (on 2026-11-03: only Science at 51.00) and at least one has a selling price below 50.00.
  - Relies on no product having a selling price of exactly 50.00 (Q2, no expectation).
  - If no product is above 50.00 the case cannot be run (the empty display has no expectation, Q6): mark it Blocked or Not run, do not judge it.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page and note the full list of product names
    expected: All products are shown and the "Filter by price" ranges are offered
  - n: 2
    action: Click the "Over 50.00" range
    expected: The filter panel shows "Over 50.00" and a "Remove Filter" link
  - n: 3
    action: Read the selling price of every listed product
    expected: Every selling price is above 50.00; at least one product is shown; cheaper products are not shown
  - n: 4
    action: Click "Remove Filter"
    expected: The full list from step 1 is shown again
expected_result: The filter shows only products whose selling price is over 50.00 and Remove Filter restores the complete list
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-011
req: [REQ-005]
title: Price filter "25.00 - 50.00" shows only products in the range / Lọc "25.00 - 50.00"
platform: web
priority: P2
type: functional
tags: [filter, price, CH-04, explored-2026-11-03, empty-result]
preconditions:
  - At least one product has a selling price between 25.00 and 50.00 would be needed for a meaningful run. On 2026-11-03 NO product is in this range (selling prices 10.00, 24.00, 51.00), so the range returns an empty result.
  - Exact 25.00 / 50.00 boundary has no expectation (Q2).
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page
    expected: All products are shown and the "Filter by price" ranges are offered
  - n: 2
    action: Click the "25.00 - 50.00" range
    expected: If products exist in the range, every shown product has a selling price from 25.00 to 50.00 and "Remove Filter" is available. If the range is empty, the result display is not judged here (no expectation, Q6)
  - n: 3
    action: Click "Remove Filter"
    expected: The full list is shown again
expected_result: Only products with a selling price in 25.00 - 50.00 are shown when such products exist; the empty-result display is not checked
automation_candidate: no   # reason: with the current catalog the range is empty; the empty display is BUG-001 / Q6 (undecided, no expectation), and the boundary is Q2 (no expectation). Re-evaluate when a product in the range exists and Q6 is decided.
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions:
  - Q6: should an empty filter result show a message and keep the View as / Sort by / Display controls (BUG-001)? No expectation until the approver decides.
  - Q2: where does exactly 50.00 belong? No expectation.
```

```yaml
id: TC-012
req: [REQ-006, REQ-004, REQ-005, REQ-002, REQ-003]
title: Filter, sort, page size and view keep each other's values / Bộ lọc, sắp xếp, số mỗi trang và chế độ xem giữ giá trị của nhau
platform: web
priority: P1
type: functional
tags: [combination, filter, sort, pagesize, view, CH-05, explored-2026-11-03]
preconditions:
  - After applying "Under 25.00", more than 4 products remain, so 4 per page gives a second page (on 2026-11-03: five products, pages of 4 and 1).
  - At least two of those products have different selling prices.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page and click the "Under 25.00" range
    expected: Only products under 25.00 are shown
  - n: 2
    action: In "Sort by", choose "Price: High to Low"
    expected: The filter is still active and the sort option is selected
  - n: 3
    action: In "Display", choose 4 per page
    expected: The filter and the sort are still active; 4 products are shown ordered by selling price descending; a pager is shown
  - n: 4
    action: In "View as", choose "List"
    expected: The same 4 products in the same order are shown as a list; filter, sort and size are unchanged
  - n: 5
    action: Go to page 2 with the "Next" link
    expected: The remaining filtered products are shown (on 2026-11-03: 1); View as, Sort by, Display and the filter are all unchanged; together pages 1 and 2 contain each filtered product once
  - n: 6
    action: On page 2, change "Sort by" to "Name: A to Z"
    expected: The filter, size and view are unchanged and the products on the page follow the new order
expected_result: Every control keeps the values of the others, and the product list is consistent with all chosen values at once
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```

```yaml
id: TC-013
req: [REQ-006]
title: Opening the page directly with the same choices gives the same result as clicking / Mở trực tiếp bằng địa chỉ cho cùng kết quả như bấm
platform: web
priority: P2
type: functional
tags: [combination, direct-address, CH-05, explored-2026-11-03]
preconditions:
  - Same data conditions as TC-012 (a filter leaving more than 4 products).
  - This case uses a page address, which is a browser navigation: the automation-tester decides how to do it within the host limits.
test_data:
  data: none
steps:
  - n: 1
    action: Open the Books category page, click "Under 25.00", choose "Price: High to Low", choose 4 per page and "Grid" view
    expected: A filtered, sorted list of 4 products is shown with a pager
  - n: 2
    action: Note the full page address shown in the browser, the selected values of the three dropdowns, and the names of the 4 products in order
    expected: The address contains the chosen filter, sort, size and view
  - n: 3
    action: Open that same address as a fresh page load (not by clicking)
    expected: The page loads on the allowed host
  - n: 4
    action: Compare the selected values, the products and their order, and the pager with step 2
    expected: Everything is identical to step 2
expected_result: A direct address with the same choices gives the same selected options, products, order and pager as reaching it by clicking
automation_candidate: yes
environment: demowebshop.tricentis.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve all)"
review_date: "2026-11-04"
open_questions: []
```
