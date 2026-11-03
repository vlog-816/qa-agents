# Test Cases: DEMO-001 Add to cart, revision 2 / Ca kiểm thử: Thêm vào giỏ hàng, bản sửa 2

- Feature ID: DEMO-001
- Date: 2026-11-03
- Platform: web
- Approach: exploratory. These cases are high-level coverage guides, not strict scripts. Charters are in `03-test-plan.md`. / Các ca này là hướng dẫn phạm vi, không phải kịch bản cứng.
- All test data is fake. No personal data is used. Run results are not stored here (see `06-report.md`).
- Price rule: the selling price (red) is the price that counts; the original price is struck through. / Giá bán (đỏ) là giá được tính.
- Expected results: "(observed)" = fact seen on 2026-11-03 in `05-execution/exploration-notes.md`. "(assumed)" = not yet observed. "record actual; approver decides" = business decision, tester records the real behavior (see open_questions).

```yaml
id: TC-001
req: [REQ-006]
title: Add a book to the cart from the product list / Thêm sách vào giỏ từ danh sách
platform: web
priority: P1
type: functional
tags: [cart, add, smoke, exploratory, CH-01, explored-2026-11-03]
preconditions:
  - The cart is empty (new visitor session)
  - The Books category page is available
test_data:
  product: <a book that has an Add to cart button on the list, for example Computing and Internet>
  quantity: 1
steps:
  - n: 1
    action: Open the Books category page and note the name and the selling price (red) of one book
    expected: The book is shown with its selling price
  - n: 2
    action: Add that book to the cart from the list
    expected: The message "The product has been added to your shopping cart" is shown and the header counter becomes (1) (observed)
  - n: 3
    action: Open the shopping cart
    expected: One line for that book with quantity 1 and unit price equal to the selling price (observed)
expected_result: The book is in the cart with quantity 1 and the header counter matches
automation_candidate: yes
review_status: draft
open_questions: []
```

```yaml
id: TC-002
req: [REQ-006]
title: Add a book to the cart from its detail page / Thêm sách vào giỏ từ trang chi tiết
platform: web
priority: P1
type: functional
tags: [cart, add, exploratory, CH-01, not-explored]
preconditions:
  - The cart is empty (new visitor session)
test_data:
  product: <any book, demo name>
  quantity: 1
steps:
  - n: 1
    action: Open the detail page of a book and note its selling price and any quantity or option fields
    expected: The detail page shows the book and its selling price
  - n: 2
    action: Add the book to the cart from the detail page
    expected: A confirmation is shown and the header counter increases (assumed, same as the list)
  - n: 3
    action: Open the cart and compare it with the result of adding from the list (TC-001)
    expected: The cart content is equivalent to adding from the list
expected_result: Adding from the detail page behaves like adding from the list
automation_candidate: yes
review_status: draft
open_questions: []
```

```yaml
id: TC-003
req: [REQ-007, REQ-008]
title: Change the quantity of a cart item and check totals / Đổi số lượng và kiểm tra tổng tiền
platform: web
priority: P1
type: functional
tags: [cart, quantity, totals, exploratory, CH-02, explored-2026-11-03]
preconditions:
  - The cart contains at least one book (see TC-001)
test_data:
  quantities_to_try: [1, 2, 3, 5]
steps:
  - n: 1
    action: In the cart, change the quantity of a line and click "Update shopping cart"
    expected: The page reloads; line total = selling price x quantity (observed for 3: 30.00 for unit 10.00)
  - n: 2
    action: Check Sub-Total, Total and the header counter
    expected: Total equals the sum of line totals (observed); the header counter equals the total quantity (observed)
  - n: 3
    action: Calculate the expected totals by hand and compare
    expected: Displayed totals equal the hand calculation
expected_result: Line totals and the order total follow the quantity and use the selling price; update needs the explicit Update action (observed)
automation_candidate: yes
review_status: draft
open_questions: []
```

```yaml
id: TC-004
req: [REQ-007]
title: Remove one item from a cart with several items / Xóa một sản phẩm khỏi giỏ nhiều sản phẩm
platform: web
priority: P1
type: functional
tags: [cart, remove, exploratory, CH-03, partly-explored]
preconditions:
  - The cart contains at least two different books
test_data:
  products: <two different demo books>
steps:
  - n: 1
    action: Note the Total and header counter, tick Remove on one line and click "Update shopping cart"
    expected: That book disappears (observed for a single-item cart)
  - n: 2
    action: Check the remaining line, the Total and the header counter
    expected: The remaining book is unchanged; Total equals its line total; the counter equals the remaining quantity (assumed)
  - n: 3
    action: Reload the page and go back/forward
    expected: The removed book does not come back (assumed)
expected_result: The removed item is gone and totals and counter are consistent
automation_candidate: yes
review_status: draft
open_questions: []
```

```yaml
id: TC-005
req: [REQ-007]
title: Remove the last item and reach the empty cart / Xóa sản phẩm cuối, giỏ trống
platform: web
priority: P2
type: functional
tags: [cart, remove, empty, exploratory, CH-03, partly-explored]
preconditions:
  - The cart contains exactly one book
test_data:
  product: <any demo book>
steps:
  - n: 1
    action: Tick Remove on the only item and click "Update shopping cart"
    expected: The cart shows "Your Shopping Cart is empty!" (observed)
  - n: 2
    action: Check the header counter
    expected: The counter shows (0) (observed)
  - n: 3
    action: Add the same book again
    expected: The book is added normally with quantity 1 (assumed, not yet explored)
expected_result: The empty cart is shown correctly and the cart can be used again
automation_candidate: yes
review_status: draft
open_questions: []
```

```yaml
id: TC-006
req: [REQ-007]
title: Unusual quantity values in the cart, overview / Giá trị số lượng bất thường, tổng quan
platform: web
priority: P2
type: negative
tags: [cart, quantity, boundary, exploratory, CH-02, partly-explored]
preconditions:
  - The cart contains at least one book
test_data:
  values_not_yet_tried: [0, 2.5, empty, 10001, leading zeros, very long number, spaces, +5]
  values_already_tried: [abc, -1, 10000]
steps:
  - n: 1
    action: Enter each not-yet-tried value as quantity and click "Update shopping cart"
    expected: Record actual; approver decides. Always expected: no error page and no wrong total
  - n: 2
    action: After each value, check quantity shown, line total, Total and header counter
    expected: Total and counter are consistent with the quantity shown
  - n: 3
    action: Compare quantity 0 with the Remove checkbox and with -1 (TC-011)
    expected: Record actual; approver decides
expected_result: Invalid quantities do not break the cart or produce a wrong total; the handling itself is recorded for the approver
automation_candidate: no
review_status: draft
open_questions:
  - Q7/Q8 and the expected handling of 0, decimal and empty values are not specified. Record actual; approver decides.
```

```yaml
id: TC-007
req: [REQ-006, REQ-008]
title: Cart unit price equals the selling price / Đơn giá trong giỏ bằng giá bán
platform: web
priority: P1
type: functional
tags: [cart, price, selling-price, exploratory, CH-01, CH-04, partly-explored]
preconditions:
  - The cart is empty
  - Books exist that show both an original (struck-through) price and a selling (red) price
test_data:
  products: <a discounted demo book, and a book with a single price if one exists>
steps:
  - n: 1
    action: Note the original price and the selling price of a discounted book, then add it to the cart
    expected: The book is added
  - n: 2
    action: Look at the unit price and line total in the cart
    expected: Unit price equals the selling price, not the original (observed for 10.00 and 24.00)
  - n: 3
    action: Repeat with a book that shows only one price, if available, and with a book added from the detail page
    expected: The single price is used as the unit price (assumed, to be confirmed)
expected_result: The cart uses the selling price everywhere a price is shown
automation_candidate: yes
review_status: draft
open_questions:
  - Do books with a single price exist, and is that price the selling price?
```

```yaml
id: TC-008
req: [REQ-008]
title: Total of a mixed cart equals the sum of selling price x quantity / Tổng giỏ nhiều sản phẩm
platform: web
priority: P1
type: functional
tags: [cart, totals, calculation, exploratory, CH-04, not-explored]
preconditions:
  - The cart is empty
test_data:
  products: <three different demo books, each addable from the list or detail page>
  quantities: [1, 2, 3]
steps:
  - n: 1
    action: Add three different books and set their quantities to 1, 2 and 3
    expected: The cart shows three lines with these quantities
  - n: 2
    action: Calculate by hand the sum of (selling price x quantity) for all lines
    expected: A hand-calculated expected total is ready
  - n: 3
    action: Compare with the displayed Sub-Total and Total; note Shipping and Tax lines
    expected: Sub-Total equals the hand calculation; Shipping and Tax are recorded as shown (0.00 and 0.00 were seen for an empty address)
expected_result: The displayed total matches the sum of selling price x quantity
automation_candidate: yes
review_status: draft
open_questions:
  - Should tax and shipping be part of the "total"? Record what the site shows.
```

```yaml
id: TC-009
req: [REQ-008, REQ-007]
title: Totals stay consistent after add, change and remove in one session / Tổng nhất quán qua nhiều thao tác
platform: web
priority: P2
type: functional
tags: [cart, totals, consistency, exploratory, CH-04, not-explored]
preconditions:
  - The cart is empty
test_data:
  products: <two demo books>
steps:
  - n: 1
    action: Add two books, change one quantity, add another unit of the other book, then remove one line
    expected: After each action the cart, totals and header counter are updated
  - n: 2
    action: After every action, compare totals with a hand calculation using selling prices
    expected: The totals always match the hand calculation
  - n: 3
    action: Reload the cart page
    expected: The same content and totals are shown
expected_result: Totals and counter remain correct after a sequence of cart changes
automation_candidate: no
review_status: draft
open_questions: []
```

```yaml
id: TC-010
req: [REQ-007]
title: Non-numeric quantity is silently reset / Số lượng không phải số bị đặt lại im lặng
platform: web
priority: P2
type: negative
tags: [cart, quantity, validation, exploratory, CH-02, risk, explored-2026-11-03]
preconditions:
  - The cart contains one book with quantity 3
test_data:
  values_to_try: [abc, "12abc", "%", spaces only, empty]
steps:
  - n: 1
    action: Enter a non-numeric value as quantity and click "Update shopping cart"
    expected: Seen for `abc`: quantity returned to the previous value (3), no message found (observed). Record actual for the other values; approver decides if this is correct
  - n: 2
    action: Check line total, Total, header counter, and look carefully for any message (also after scrolling)
    expected: Totals and counter unchanged and consistent
expected_result: Record actual; approver decides whether a silent reset is acceptable. No error page, no wrong total.
automation_candidate: no
review_status: draft
open_questions:
  - Q7: Is a silent reset of `abc` expected?
```

```yaml
id: TC-011
req: [REQ-007]
title: Negative quantity removes the item / Số lượng âm xóa sản phẩm
platform: web
priority: P2
type: negative
tags: [cart, quantity, negative, exploratory, CH-02, risk, explored-2026-11-03]
preconditions:
  - The cart contains one book
test_data:
  values_to_try: [-1, -5, 0]
steps:
  - n: 1
    action: Enter -1 as quantity and click "Update shopping cart"
    expected: Seen: item removed, "Your Shopping Cart is empty!", header (0), no error message (observed). Whether this is correct: record actual; approver decides
  - n: 2
    action: Re-add the book and repeat with -5 and with 0 (0 not yet explored)
    expected: Record actual; approver decides. Compare with the Remove checkbox
expected_result: Record actual; approver decides. Cart and counter stay consistent.
automation_candidate: no
review_status: draft
open_questions:
  - Q7: Is it expected that -1 removes the item without a message?
```

```yaml
id: TC-012
req: [REQ-007, REQ-008]
title: No maximum quantity, large values / Không có số lượng tối đa, giá trị lớn
platform: web
priority: P2
type: boundary
tags: [cart, quantity, maximum, exploratory, CH-02, risk, partly-explored]
preconditions:
  - The cart contains one book (use Fiction, selling price 24.00, or any book)
test_data:
  values_to_try: [10000, 10001, 99999, 1000000, 2147483648, 99999999999999999999]
steps:
  - n: 1
    action: Enter 10000 and update
    expected: Accepted; unit 24.00, line total 240000.00, header (10000) (observed)
  - n: 2
    action: Enter the larger values one at a time and update
    expected: Record actual; approver decides. If accepted, line total must still equal selling price x quantity; no error page, no overflow or negative total
  - n: 3
    action: Check how the header counter and the cart page display very large numbers
    expected: Record actual (layout, rounding, overflow)
expected_result: Record actual; approver decides if a maximum is required. Totals are correct whenever a value is accepted.
automation_candidate: no
review_status: draft
open_questions:
  - Q8: Is there a maximum quantity?
```

```yaml
id: TC-013
req: [REQ-006, REQ-007]
title: Header counter shows total quantity / Bộ đếm trên header là tổng số lượng
platform: web
priority: P2
type: functional
tags: [cart, counter, consistency, exploratory, CH-02, risk, partly-explored]
preconditions:
  - The cart is empty
test_data:
  products: <two different demo books>
steps:
  - n: 1
    action: Add one book; set its quantity to 3 and update
    expected: Header counter (3) (observed)
  - n: 2
    action: Add a second, different book (quantity 1)
    expected: Header counter (4) if it counts quantity (assumed from observation)
  - n: 3
    action: Remove one line and check the counter; reload the page
    expected: Counter equals the total quantity in the cart before and after reload
expected_result: The counter equals total quantity in all states. Whether it should count distinct products instead: record actual; approver decides.
automation_candidate: yes
review_status: draft
open_questions:
  - Is the counter meant to show total quantity (observed) or the number of distinct products?
```

```yaml
id: TC-014
req: [REQ-006]
title: Products without an Add to cart button on the list / Sản phẩm không có nút Add to cart ở danh sách
platform: web
priority: P2
type: exploratory
tags: [cart, add, list, exploratory, CH-01, risk, not-explored]
preconditions:
  - The cart is empty
test_data:
  products: [Copy of Computing and Internet EX, Fiction EX, Science]
steps:
  - n: 1
    action: On the Books list, check each of the 3 products for an Add to cart button and note what is shown instead (if anything)
    expected: Record actual (3 of 6 had no button, observed; reason unknown)
  - n: 2
    action: Open the detail page of each of the 3 products and look for a way to add to the cart (options, quantity, button)
    expected: Record actual; if an add path exists, add one unit and verify the cart (name, selling price, quantity 1, counter)
  - n: 3
    action: Compare the product kind or options of these 3 with the 3 that have a button
    expected: A visible reason is noted, or "no reason visible" is recorded
expected_result: The way (or lack of a way) to add each of the 3 products is documented. Record actual; approver decides if the missing list button is a defect.
automation_candidate: no
review_status: draft
open_questions:
  - Q9: Why do 3 of 6 products have no Add to cart button on the list?
```

```yaml
id: TC-015
req: [REQ-006, REQ-008]
title: Add the same product twice and two different products / Thêm cùng sản phẩm hai lần và hai sản phẩm khác nhau
platform: web
priority: P1
type: functional
tags: [cart, add, merge, exploratory, CH-01, not-explored]
preconditions:
  - The cart is empty
test_data:
  products: [Computing and Internet, Fiction]
steps:
  - n: 1
    action: Add Computing and Internet twice (two clicks)
    expected: Cart shows one line with quantity 2 and line total 20.00 for unit 10.00, header (2) (assumed; merge vs. two lines to be recorded)
  - n: 2
    action: Add Fiction once
    expected: A second line (Fiction, unit 24.00, quantity 1); header (3); Total 44.00 (assumed from selling prices seen)
  - n: 3
    action: Reload the cart page
    expected: The same lines, totals and counter
expected_result: Repeated and different adds produce correct lines, totals and counter. Use the prices at test time if they changed.
automation_candidate: yes
review_status: draft
open_questions: []
```

```yaml
id: TC-016
req: [REQ-007]
title: Quantity 0, decimal and empty value / Số lượng 0, số thập phân, để trống
platform: web
priority: P2
type: negative
tags: [cart, quantity, boundary, exploratory, CH-02, not-explored]
preconditions:
  - The cart contains one book with quantity 2
test_data:
  values_to_try: [0, 2.5, "1,5", empty, 007]
steps:
  - n: 1
    action: Enter 0 and update
    expected: Record actual; approver decides (compare with TC-011 and the Remove checkbox)
  - n: 2
    action: Re-add the book if needed; enter 2.5, "1,5", empty and 007 one at a time and update
    expected: Record actual; approver decides. No error page and no wrong total
  - n: 3
    action: For every accepted value check line total, Total and header counter
    expected: Consistent with the quantity shown; note any rounding
expected_result: Handling of each value is recorded; totals are correct whenever a value is accepted.
automation_candidate: no
review_status: draft
open_questions:
  - Expected handling of 0, decimal and empty values is not specified. Record actual; approver decides.
```

```yaml
id: TC-017
req: [REQ-006, REQ-007]
title: Cart after reload, second tab and new session / Giỏ sau khi tải lại, tab thứ hai, phiên mới
platform: web
priority: P2
type: functional
tags: [cart, persistence, session, exploratory, CH-03, not-explored]
preconditions:
  - The cart contains one book with quantity 2
test_data:
  product: <any demo book>
steps:
  - n: 1
    action: Reload the cart page, then use back and forward
    expected: The same line, quantity, totals and counter (assumed)
  - n: 2
    action: Open the cart in a second tab of the same browser and change the quantity there; return to the first tab and reload
    expected: Both tabs show the same cart after reload (assumed)
  - n: 3
    action: Close the browser, open a new session and open the cart (record only)
    expected: Record actual (kept or empty). Persistence is not required this round; approver decides
expected_result: The cart is consistent across reload and tabs; persistence across sessions is recorded for the approver.
automation_candidate: no
review_status: draft
open_questions:
  - Should the cart persist after closing the browser? Record actual; approver decides.
```

## Approver decisions (2026-11-03): see the same section in 03-test-plan.md; it overrides "approver decides" notes in the cases below

## Coverage / Độ phủ

| REQ | Cases | Charters |
|---|---|---|
| REQ-006 | TC-001, TC-002, TC-007, TC-013, TC-014, TC-015, TC-017 | CH-01, CH-03, CH-04 |
| REQ-007 | TC-003, TC-004, TC-005, TC-006, TC-009, TC-010, TC-011, TC-012, TC-013, TC-016, TC-017 | CH-02, CH-03 |
| REQ-008 | TC-003, TC-007, TC-008, TC-009, TC-012, TC-015 | CH-01, CH-02, CH-04 |

Tags: `explored-2026-11-03` = main behavior already observed (re-check only); `partly-explored` = some values/paths seen; `not-explored` = nothing observed yet.

## Open questions / Câu hỏi mở

- Q7: Is it expected that quantity -1 removes the item without a message and that `abc` is silently ignored? (TC-010, TC-011)
- Q8: Is there a maximum quantity? 10000 was accepted. (TC-012)
- Q9: Why do 3 of 6 products have no Add to cart button on the list? (TC-014)
- Expected handling of 0, decimal and empty quantity (TC-006, TC-016).
- Header counter meaning: total quantity or distinct products (TC-013).
- Tax and shipping in the total (TC-008); single-price books (TC-007); cart persistence (TC-017).

See also `03-test-plan.md`, section 10.
