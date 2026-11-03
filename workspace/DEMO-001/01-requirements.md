# Requirements: Demo Web Shop, Books category page

- Feature ID: DEMO-001
- Analysis date: 2026-11-03
- By: Claude (main session, no ba-analyst agent yet)
- Gate "requirements" status: approved (approver: Boss-QA, date: 2026-11-03, approved in chat)

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

> Note / Lưu ý: these requirements are **observed from the public page**, not taken from an official spec. Every acceptance criterion is an assumption until the approver (acting as BA) confirms it.
> Các yêu cầu này được **quan sát từ trang công khai**, không phải tài liệu đặc tả chính thức. Mọi tiêu chí chấp nhận chỉ là giả định cho đến khi người duyệt (đóng vai BA) xác nhận.

## Sources

| Source ID | Type | Reference | Notes |
|---|---|---|---|
| SRC-01 | web | https://demowebshop.tricentis.com/books | Public practice site, fetched 2026-11-03 (read-only, page text only) |

## Requirements

### REQ-001: Show the product list of the Books category / Hiển thị danh sách sách

- Description: The page lists the products of the Books category, each with a name and a price. Six products were visible: Computing and Internet, Copy of Computing and Internet EX, Fiction, Fiction EX, Health Book, Science.
- Source: SRC-01 (product list)
- Status: `clear` (clarified by approver 2026-11-03)
- Confidence: `medium`
- Acceptance criteria (assumed): every product in the category appears with its name and at least one price.
- Related platform: `web`
- Notes: each product shows two numbers (for example 30.00 and 10.00). Meaning not stated on the page. See Open questions.

### REQ-002: Sort the product list / Sắp xếp danh sách

- Description: The user can sort by Position, Name A to Z, Name Z to A, Price Low to High, Price High to Low, Created on.
- Source: SRC-01 (Sort by)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): after choosing an option, products are ordered accordingly.
- Related platform: `web`
- Notes: none

### REQ-003: Choose the number of products per page / Số sản phẩm mỗi trang

- Description: The user can choose 4, 8 or 12 products per page.
- Source: SRC-01 (Display)
- Status: `clear` (clarified by approver 2026-11-03)
- Confidence: `medium`
- Acceptance criteria (assumed): the page shows at most the chosen number of products; pagination appears when there are more.
- Related platform: `web`
- Notes: the default value is not visible. Six products exist, so 4 per page should split into two pages.

### REQ-004: Switch between grid and list view / Chế độ xem lưới hoặc danh sách

- Description: The user can view products as Grid or List.
- Source: SRC-01 (View as)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): the same products are shown in both views.
- Related platform: `web`
- Notes: none

### REQ-005: Filter products by price range / Lọc theo khoảng giá

- Description: The user can filter by Under 25.00, 25.00 to 50.00, Over 50.00.
- Source: SRC-01 (Filter by price)
- Status: `clear` (clarified by approver 2026-11-03)
- Confidence: `medium`
- Acceptance criteria (assumed): only products in the chosen range are shown.
- Related platform: `web`
- Notes: which price (of the two shown) is used for filtering, and whether range ends are inclusive, are not stated.

### REQ-006: Add a product to the cart / Thêm sản phẩm vào giỏ hàng

- Description: A visitor can add a product from the Books category to the shopping cart, and the cart counter in the header updates.
- Source: approver scope decision (chat, 2026-11-03); behavior to be confirmed by exploration of SRC-01
- Status: `clear` (scope approved; exact behavior is an assumption)
- Confidence: `low`
- Acceptance criteria (assumed): after adding, the product is in the cart with quantity 1 and the header counter increases.
- Related platform: `web`
- Notes: exploratory testing will record the real behavior; differences become findings or new questions.

### REQ-007: Change quantity or remove a cart item / Đổi số lượng hoặc xóa khỏi giỏ

- Description: In the cart, the visitor can change a quantity or remove an item.
- Source: approver scope decision (chat, 2026-11-03)
- Status: `clear` (scope approved; exact behavior is an assumption)
- Confidence: `low`
- Acceptance criteria (assumed): line totals and the order total follow the change; a removed item disappears.
- Related platform: `web`
- Notes: totals should use the selling price (the red price), per the approver.

### REQ-008: Cart totals use the selling price / Tổng tiền dùng giá bán

- Description: Prices and totals in the cart reflect the discounted selling price.
- Source: approver clarification Q1 (chat, 2026-11-03)
- Status: `clear`
- Confidence: `medium`
- Acceptance criteria (assumed): unit price equals the selling price shown on the product page; total equals the sum of unit price times quantity.
- Related platform: `web`
- Notes: tax and shipping are not stated; record what the site shows.

### Scope of this round / Phạm vi lần này

- In scope: REQ-006, REQ-007, REQ-008 (exploratory testing of the add-to-cart main flow).
- Out of scope for now: REQ-001 to REQ-005 (Books page listing, sort, paging, view, filter), search, checkout, register, login.

## Conflicts between sources

| REQ | Source A says | Source B says | Who decides |
|---|---|---|---|
| none | | | |

## Assumptions (need confirmation)

- All acceptance criteria above are assumed from the visible page behavior.
- This is a public shared demo site; its data can change at any time.

## Sensitive data encountered

None. The page shows only product names and prices. Use only fake data in any later test.

## Clarifications from the approver (2026-11-03, in chat)

- Q1 answered: the struck-through (black) price is the original price; the red price is the discounted selling price. Example: original 30.00, selling 10.00. The selling price is the one a customer pays.
- Q2 answered: the default is 8 products per page.
- Q3 answered: 25.00 belongs to the "25.00 - 50.00" range. Which price the filter uses is not stated yet (assumed: the selling price, to be checked during exploration).
- Q4 answered: the product names are demo names. They are valid test data.
- Q5 answered: exploratory testing of the main flow, scope = add to cart (see "Scope of this round"). Approved in chat 2026-11-03.

## Open questions

If this section is not empty, the workflow must stop and ask a human (uncertainty_policy: stop_and_ask).

- (none at the moment; new questions found during exploration go here)

## Observed behavior (exploration, 2026-11-03)

Full details in `05-execution/exploration-notes.md`. Summary for REQ-006 to REQ-008:

- REQ-006: Add to cart shows "The product has been added to your shopping cart" and the header counter goes up. Only 3 of 6 Books list items had an Add to cart button on the list page.
- REQ-007: Changing quantity works via "Update shopping cart". Quantity `abc` is silently reset, quantity `-1` removes the item, quantity `10000` is accepted without any limit. The Remove checkbox plus Update removes the item.
- REQ-008: Unit price in the cart is the selling price. Line total and Total equal unit price times quantity. Shipping 0.00 and tax 0.00 for an empty address.
- The header counter shows total quantity, not the number of distinct products.

New questions for the approver:
- Q7: Is it expected that quantity `-1` removes the item without any message, and that `abc` is silently ignored?
- Q8: Is there a maximum quantity? 10000 was accepted.
- Q9: Why do 3 of 6 products have no Add to cart button on the list page?

## Clarifications from the approver, round 2 (2026-11-03, in chat)

- Q7 (is it expected that `-1` removes the item silently and `abc` is silently ignored?): answered "OK". See conflict note below.
- Q8 (maximum quantity): answered "no" (no maximum quantity is expected).
- Q9 (3 products without a list Add to cart button): they are **out of stock**, so no button is expected.
- Quantity rule: the quantity must be **>= 1, a whole number, and not empty**.
- Header counter: shows the **total quantity** (current behavior is expected).
- Tax and shipping: **are included** in the cart total.
- Single-price books: none; books have more than one price (original and selling).
- Cart persistence: the cart is kept **per session**.
- Gate 0 waivers: acknowledged, to be removed after the demo.

**Conflict to resolve (do not guess):** "`-1` removes the item and `abc` is ignored is OK" and "quantity must be >= 1, a whole number, not empty" can both be read in two ways. Open question: for an invalid quantity (-1, 0, 2.5, empty, text), is the site's current handling (reset to the old value, or remove the item) the expected behavior, or should the site reject it with a message and keep the old quantity? Until answered, tests record the actual behavior and mark it "needs approver decision".

Updates still needed after the answers: Q9 in `04-test-cases.md` (TC-014 expected = out of stock, no button), header counter (TC-013 expected), tax and shipping inside the REQ-008 total, cart per session (TC-017).
