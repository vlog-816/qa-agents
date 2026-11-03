# Test Plan: DEMO-001 Add to cart (exploratory), revision 2 / Kế hoạch kiểm thử: Thêm vào giỏ hàng (khám phá), bản sửa 2

- Feature ID: DEMO-001
- Date: 2026-11-03
- By: Manual Tester (AI)
- Approach: `exploratory` (session-based), chosen by the approver / Cách tiếp cận do người duyệt chọn
- Gate `test_plan`: required. Status: **approved** (approver: Boss-QA, date: 2026-11-03, approved in chat) / đã duyệt.

## Approver decisions (2026-11-03, override earlier "approver decides" notes)

- Quantity rule: whole number, >= 1, not empty. Invalid input (-1, 0, 2.5, empty, text) **must be rejected with an error message and the old quantity kept**. Today the site silently resets `abc` and removes the item on `-1`: these are **findings (defects)**, not accepted behavior. (TC-006, TC-010, TC-011, TC-016)
- No maximum quantity is expected (TC-012: record only; large values are not a defect by themselves).
- The 3 products without a list Add to cart button are **out of stock**: no button is expected (TC-014).
- Header counter shows the **total quantity** (TC-013 expected = observed).
- Tax and shipping **are included** in the cart total (REQ-008); the cart shows 0.00 for both without a shipping estimate. Estimating shipping needs a country/zip and is out of scope this round.
- Cart is kept **per session** (TC-017: same session keeps the cart; a new session starts empty is the assumption to verify).
- Automation candidates: the report only lists suitable test cases (no code). The approver asked for an explanation; default stays list only.
- Where a test case text in `04-test-cases.md` says "record actual; approver decides" for these items, this section wins.
- Inputs: `00-data-gate.md` (PASS with 2 waivers, pilot only), `01-requirements.md` (approved, incl. "Observed behavior" and Q7-Q9), `05-execution/exploration-notes.md`
- Revision note: revised after the first exploration (2026-11-03). Charters now cite observed behavior and skip what is already explored. / Bản sửa sau lần khám phá đầu: charter dựa trên hành vi đã quan sát, bỏ phần đã khám phá.

## 1. Scope / Phạm vi

| In scope / Trong phạm vi | Out of scope / Ngoài phạm vi |
|---|---|
| REQ-006 Add a product to the cart / Thêm vào giỏ | REQ-001 to REQ-005 (Books listing, sort, paging, view, filter) |
| REQ-007 Change quantity or remove an item / Đổi số lượng, xóa | Search, checkout, register, login, coupon, gift card |
| REQ-008 Cart totals use the selling price / Tổng tiền dùng giá bán | Mobile, API tests (no API contract given) |

Price rule (from approver): the red price is the selling price and is the price that counts. / Giá đỏ là giá bán và là giá được tính.

## 2. Platforms / Nền tảng

- `web` only (desktop browser). `api` has no requirement in this round. `mobile` is out of scope.
- Host: only `demowebshop.tricentis.com` (in `data.allowed_hosts`).

## 3. Approach / Cách tiếp cận

- Short charter-driven sessions; cases in `04-test-cases.md` are a coverage guide, not a script.
- Behavior that differs from assumed criteria is a finding or an open question, not an automatic defect (requirements were observed, not from a spec).
- Where the right behavior is a business decision (negative, non-numeric, maximum quantity), the tester records the actual behavior and the approver decides.

## 4. Test data approach / Dữ liệu kiểm thử

- Fake data only. Anonymous guest; no login, registration or checkout, so no personal data is entered.
- Demo book names are valid test data (Q4). Prices are read at test time and noted, because the shared site can change. Reference prices seen on 2026-11-03 (original / selling): Computing and Internet 30.00 / 10.00; Fiction 35.00 / 24.00.
- No credentials, no `password_env`. Never enter real names, emails, addresses or cards; if a field asks, stop and ask.

## 5. Exploration status / Trạng thái khám phá

### 5.1 Already explored on 2026-11-03 (do not repeat; re-check only if the site changed) / Đã khám phá

| Area | Observed fact |
|---|---|
| Books list | 6 products, 8 per page by default; each shows original and selling price |
| Add from list (Computing and Internet) | Message "The product has been added to your shopping cart"; header counter (1) |
| Cart page layout | Columns Remove, Product, Price, Qty, Total; Sub-Total, Shipping 0.00, Tax 0.00, Total; discount code, gift card, estimate shipping, terms, Checkout |
| Unit price | Cart unit price is the selling price (10.00) |
| Qty 3 + Update shopping cart | Line total 30.00, Total 30.00; header counter (3) = quantity, not distinct products |
| Qty `abc` | Silently reset to previous value (3); no message found |
| Qty `-1` | Item removed, "Your Shopping Cart is empty!", header (0); no message |
| Qty `10000` (Fiction) | Accepted; unit 24.00, line total 240000.00 (correct); header (10000); no limit or warning |
| Remove checkbox + Update | Item removed, cart empty, header (0) |

### 5.2 NOT explored yet / Chưa khám phá

- Qty 0, decimal (for example 2.5), empty field, values above 10000, leading zeros, very long numbers.
- Same product added twice; two different products in one cart (mixed totals).
- The 3 products without a list Add to cart button (Copy of Computing and Internet EX, Fiction EX, Science).
- Product detail page (add from detail, quantity field there, price shown).
- Cart after page reload, back/forward, second tab, and new session.
- Remove one of several items; re-add after emptying.
- Out of this round: coupon, shipping estimate, terms, checkout.

## 6. Charters / Hiến chương (revised)

Total: 4 sessions, about 120 minutes (reduced from 150 because the main flow is already explored).

### CH-01: Add to cart variants / Các cách thêm vào giỏ (not yet explored parts)

- Mission: Explore adding from the product detail page, adding the same product twice, adding two different products, and the 3 products with no list button, to discover differences in cart lines, counter and messages.
- Covers: REQ-006, REQ-008. Cases: TC-002, TC-014, TC-015 (TC-001 already explored: quick re-check only).
- Builds on: observations 3 and 4 (message text, counter, unit price) in the exploration notes.
- Ideas: compare list vs. detail result; does the same product merge into one line or make two lines; counter after each add; how a product without a list button can be added; whether it needs options.
- Time box: 35 minutes.
- Record: product, prices, quantity, counter before/after, cart lines, message text, anything surprising.

### CH-02: Quantity edge values / Giá trị số lượng biên

- Mission: Explore quantity values not yet tried, to discover inconsistent handling, wrong totals or errors.
- Covers: REQ-007, REQ-008. Cases: TC-003, TC-006, TC-010, TC-011, TC-012, TC-013, TC-016.
- Builds on: `abc` silently reset, `-1` removes, `10000` accepted, counter counts quantity.
- Ideas: 0, 2.5, empty, 10001, 99999, 1000000, very long digits, leading zeros (007), spaces, `+5`; compare 0 with `-1` and with the Remove checkbox; check line total by hand; does the counter keep up at large values (display width, overflow).
- Time box: 35 minutes.
- Record: each input, resulting quantity, line total, Total, counter, any message. No assumption about right or wrong for negative, non-numeric or maximum.

### CH-03: Remove, reload and sessions / Xóa, tải lại, phiên mới

- Mission: Explore cart state across removal, reload, back/forward, second tab and new session, to discover stale or lost data.
- Covers: REQ-007, REQ-006. Cases: TC-004, TC-005, TC-017.
- Builds on: Remove checkbox + Update works for a single item.
- Ideas: remove one of several items; remove the last then re-add; reload after update; back after removing; open /cart in a second tab; close and reopen the browser (record only; persistence expectation is open).
- Time box: 25 minutes.
- Record: cart and counter after each action, differences between tabs/sessions.

### CH-04: Mixed cart totals / Tổng tiền giỏ nhiều sản phẩm

- Mission: Explore totals with several products and quantities, to discover calculation or rounding problems and any place the original price leaks in.
- Covers: REQ-008, REQ-006, REQ-007. Cases: TC-007, TC-008, TC-009.
- Builds on: single-line totals are correct (30.00, 240000.00).
- Ideas: three products with quantities 1, 2, 3 and a by-hand sum of selling price x quantity; changes after update and remove; tax and shipping lines (record only); a product with a single price if any.
- Time box: 25 minutes.
- Record: table product, original, selling, qty, displayed vs. expected line total, displayed vs. expected Total.

## 7. What to record in every session / Ghi lại trong mỗi phiên

- Session sheet: charter ID, date/time, tester, browser, start/end, actual duration.
- Notes, findings (bug / issue / new question) with steps and fake values only.
- Evidence under `workspace/DEMO-001/evidence/` only. Results (Passed / Failed / Blocked / Not run) go to `06-report.md`, not into test cases.

## 8. Entry and exit criteria / Điều kiện bắt đầu và kết thúc

- Entry: this plan approved; `00-data-gate.md` PASS (waivers); an approval prompt for each network action.
- Exit: 4 charters done or time boxes used; every case has a result; findings and open questions in `06-report.md`.

## 9. Risks / Rủi ro

| Risk | Impact | Mitigation |
|---|---|---|
| Silent reset for non-numeric quantity (`abc` goes back to the old value, no message) | User gets no feedback; may think the change was saved | TC-010: record behavior; approver decides (Q7) |
| Quantity `-1` removes the item without any message | Accidental removal, confusing UX | TC-011: record; approver decides (Q7) |
| No maximum quantity (10000 accepted, line total 240000.00) | Absurd orders, display/overflow issues at larger values | TC-012: probe above 10000; approver decides (Q8) |
| Header counter counts total quantity, not distinct products | May differ from the user expectation or a spec | TC-013: record; confirm the intended meaning |
| 3 of 6 products have no Add to cart button on the list | Inconsistent entry points | TC-014; reason unknown (Q9) |
| Shared public site: data and behavior may change | Non-repeatable results | Record date/time and prices; re-check before reporting |
| Requirements observed, not from a spec | Unclear what is a defect | Report as findings/questions |
| Gate 0 items waived (unconfirmed) | Compliance gap | Fake data and allowed host only; waiver is for DEMO-001 only |
| Cart is per session (cookie) | Tests influence each other | Start charters with an empty cart; empty it at the end |
| Site slow or down | Blocked cases | Mark Blocked; no bulk retries |

## 10. Assumptions and open questions / Giả định và câu hỏi mở

Assumptions / Giả định:
- A1: Tooling is the built-in browser of Claude Desktop (as in the first exploration), text-first (screenshots only when needed), using small page-script reads of the cart table instead of reading the whole /cart page (long country list is expensive).
- A2: Element references reset after every page reload (for example after Update shopping cart), so they must be looked up again.
- A3: One current desktop browser is enough for this round.
- A4: Every network action still passes the user approval prompt.

Open questions for the approver / Câu hỏi cho người duyệt:
1. Q7: Is it expected that quantity `-1` removes the item without any message, and that `abc` is silently ignored?
2. Q8: Is there a maximum quantity? 10000 was accepted.
3. Q9: Why do 3 of 6 products have no Add to cart button on the list page?
4. Expected behavior for 0, decimal and empty quantity (not specified). Proposal: record actual; approver decides.
5. Is the header counter meant to show total quantity (observed) or distinct products?
6. Tax and shipping: part of the "total" in REQ-008? Proposal: record only, exclude from pass/fail.
7. Should the cart persist after closing the browser or login? Proposal: record only this round.
8. Do books with a single price exist, and is that price the selling price?
9. Should the report list automation candidates (list only, no code)? Proposal: yes.
10. Reminder: the two waived Gate 0 items must be confirmed and the waiver removed after the pilot.

## 11. Token budget note / Ghi chú ngân sách token

- The first exploration used about 24k tokens (see `05-execution/token-record.md`). This revised plan skips what is already explored (section 5.1) and relies on small page-script reads, so each session should cost less. Record actual usage per session in the same file to compare.

## 12. Approval / Duyệt

- Test plan approved by: ____________ Date: ____________
- Until approved, no test is executed and no network command is run.
