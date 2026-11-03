# Requirements: Demo Web Shop, Books page listing controls

- Feature ID: DEMO-002
- Analysis date: 2026-11-03
- By: Claude (main session, no ba-analyst agent yet)
- Gate "requirements" status: approved (approver: the user, acting as Gate 0 approver Boss-QA; date: 2026-11-03; approved in chat with "use assumptions, approve")

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

> Note / Lưu ý: these requirements are **observed from the public page**, not taken from an official spec. Every acceptance criterion is an assumption until the approver (acting as BA) confirms it.
> Các yêu cầu này được **quan sát từ trang công khai**, không phải tài liệu đặc tả chính thức. Mọi tiêu chí chấp nhận chỉ là giả định cho đến khi người duyệt (đóng vai BA) xác nhận.

DEMO-002 covers the part of the Books page that DEMO-001 left out of scope (DEMO-001 REQ-001 to REQ-005: listing, sort, paging, view, price filter). Add to cart and the cart stay in DEMO-001.

## Sources

| Source ID | Type | Reference | Notes |
|---|---|---|---|
| SRC-01 | web | https://demowebshop.tricentis.com/books | Public practice site, viewed 2026-11-03 with playwright-cli (read-only: open, snapshot, screenshot, close). Evidence: `evidence/run-1/books-1.png`, `books-1-snapshot.yml` |
| SRC-02 | file | `workspace/DEMO-001/01-requirements.md` | Approver clarifications from DEMO-001 (default 8 per page, 25.00 belongs to "25.00 - 50.00", red price is the selling price) |

## Requirements

### REQ-001: Show the product list of the Books category / Hiển thị danh sách sách

- Description: The page lists the products of the Books category with picture, name, review count and prices. Six products were visible: Computing and Internet, Copy of Computing and Internet EX, Fiction, Fiction EX, Health Book, Science.
- Source: SRC-01 (product list)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): every product of the category appears once, with a name and a selling price; the same set appears in Grid and List view when no filter is applied.
- Related platform: `web`
- Notes: each product shows an original price (struck through) and a selling price, per SRC-02. Add to cart buttons are out of scope (DEMO-001; findings F-02 there).

### REQ-002: Sort the product list / Sắp xếp danh sách

- Description: The user can sort by Position, Name: A to Z, Name: Z to A, Price: Low to High, Price: High to Low, Created on.
- Source: SRC-01 (Sort by)
- Status: `ambiguous`
- Confidence: `medium`
- Acceptance criteria (assumed): after choosing an option the products are ordered accordingly; the chosen option stays selected.
- Related platform: `web`
- Notes: which price is used for the price sorts, and what "Position" and "Created on" mean, are not stated. See Open questions Q1 and Q3.

### REQ-003: Choose the number of products per page / Số sản phẩm mỗi trang

- Description: The user can choose 4, 8 or 12 products per page. The default is 8 (SRC-02).
- Source: SRC-01 (Display)
- Status: `clear` (default confirmed in SRC-02)
- Confidence: `medium`
- Acceptance criteria (assumed): at most the chosen number of products is shown; with 6 products, 4 per page gives two pages (4 and 2), 8 or 12 gives one page and no pager.
- Related platform: `web`
- Notes: see Open question Q4.

### REQ-004: Switch between grid and list view / Chế độ xem lưới hoặc danh sách

- Description: The user can view products as Grid or List.
- Source: SRC-01 (View as)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): the same products, in the same order, are shown in both views; the chosen sort, page size and filter are kept when switching.
- Related platform: `web`
- Notes: none

### REQ-005: Filter products by price range / Lọc theo khoảng giá

- Description: The user can filter by "Under 25.00", "25.00 - 50.00" and "Over 50.00". The filter is a link that adds a `price` value to the address (`?price=-25`, `?price=25-50`, `?price=50-`).
- Source: SRC-01 (Filter by price)
- Status: `ambiguous`
- Confidence: `medium`
- Acceptance criteria (assumed): only products whose price is in the chosen range are shown; 25.00 belongs to "25.00 - 50.00" (SRC-02); a way to remove the filter exists.
- Related platform: `web`
- Notes: which price is used, and where 50.00 belongs, are not stated. See Open questions Q1 and Q2.

### REQ-006: Controls work together / Các điều khiển phối hợp

- Description: Sort, page size, view mode and price filter can be combined.
- Source: SRC-01 (all controls on one page)
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): a combination applies all choices at once (for example price filter plus sort by name plus 4 per page), and the result is consistent with each choice alone.
- Related platform: `web`
- Notes: behavior of the combination is not described anywhere; exploration will record what the site does.

### Scope of this round / Phạm vi lần này

- In scope: REQ-001 to REQ-006 (listing controls of the Books page), exploratory testing, read-only, no typing, no cart changes.
- Out of scope: add to cart and cart (DEMO-001), product detail pages, search, compare and wishlist, checkout, register, login, other categories.

## Conflicts between sources

| REQ | Source A says | Source B says | Who decides |
|---|---|---|---|
| none | | | |

## Assumptions (need confirmation)

- All acceptance criteria above are assumed from the visible page behavior.
- This is a public shared demo site; its data can change at any time.
- The page shows 6 books, so paging only appears with 4 per page.

## Sensitive data encountered

None. The page shows only product names, prices and public links. Use only fake data in any later test.

## Open questions

Decision 2026-11-03 (approver, in chat): "Use assumptions, approve". Q1, Q4 and Q5 are answered by the stated assumptions. Q2 and Q3 had no assumption written, so there is no expected result for them: tests record the actual behavior and mark it "needs approver decision" (same rule as DEMO-001). New questions found during exploration go here.

- Q1 (answered: assumption accepted): Which price do "Price: Low to High / High to Low" and the price filter use: the selling price (red) or the original price (struck through)? Assumed: the selling price.
- Q2 (no expectation, record actual behavior): Where does exactly 50.00 belong: "25.00 - 50.00" or "Over 50.00"? (25.00 is in "25.00 - 50.00", per DEMO-001.)
- Q3 (no expectation, record actual behavior): What is the expected order for "Position" and for "Created on" (oldest first or newest first)?
- Q4 (answered: assumption accepted, two pages of 4 and 2): With 6 products and 4 per page, do you expect two pages (4 and 2)? Is a pager expected, and where?
- Q5 (answered: assumption accepted, they still appear): Should products without an Add to cart button (out of stock, DEMO-001 F-02) still appear in the list, sort and filters? Assumed: yes.
