# Execution report: DEMO-001 Add to cart (exploratory, 2 sessions)

- Feature ID: DEMO-001
- Environment (`data_class`): synthetic (public demo shop https://demowebshop.tricentis.com, fake data only)
- Run date: 2026-11-03
- Data Guard pre-run: PASS (2 waived items)
- Data Guard post-run: PASS (2026-11-03, rerun after report update)
- Approach: exploratory, built-in browser. Approvals: requirements and test plan approved by Boss-QA on 2026-11-03.

## Summary

Exploratory sessions, not scripted runs: results are per area, not per case.

| Area | Result |
|---|---|
| Add to cart (list and product page) | Passed |
| Same product twice merges into one line | Passed |
| Two different products | Passed |
| Change quantity (valid, up to 10000) | Passed (line total correct: 24.00 x 10000 = 240000.00) |
| Remove item (Remove + Update) | Passed |
| Header counter = total quantity | Passed (expected by approver) |
| Cart kept after reload | Passed |
| Invalid quantity handling (`abc`, `2.5`, empty, `-1`, `0`) | **Failed** (finding F-01) |
| Out-of-stock vs missing Add to cart button | **Failed** (finding F-02) |
| Cart total (REQ-008) | Accepted: "Calculated during checkout" is expected in the cart; total with shipping to be checked at checkout in a later round |
| Cart per session (new session) | **Inconclusive**: the cart cookie is HttpOnly, so scripts could not clear it and the cart stayed. Needs a real new browser profile or the browser site-data clear by the user |
| Shipping estimate, checkout | Not run (out of scope) |

## Findings

### F-01: Invalid quantities are not rejected with a message
- Related: REQ-007, TC-006, TC-010, TC-011, TC-016
- Rule (approver): quantity must be a whole number >= 1, not empty; invalid input must be rejected with an error and the old quantity kept.
- Steps: put a product in the cart, set the quantity to the value below, click "Update shopping cart".
- Actual: `abc` resets to the old value; `2.5` resets to 1; empty keeps 1; `-1` and `0` remove the item. No error message in any case.
- Expected: error message and old quantity kept.
- Severity: **low** (set by approver 2026-11-03; confirmed as a defect).

### F-02: "In stock" products without an Add to cart button (confirmed defect, approver 2026-11-03)
- Related: REQ-006, TC-014
- Approver explanation: products without a button are out of stock.
- Actual: only "Copy of Computing and Internet EX" says "Out of stock". "Fiction EX" and "Science" say "Availability: In stock" but have no Add to cart button ("Science" also has no quantity box).
- Expected: either a button, or an out-of-stock label. Needs the approver's decision (could be a deliberate setting of the demo).
- Severity: low to medium.

### F-03: Cart total missing when the cart contains Health Book (CLOSED: accepted as expected by approver 2026-11-03)
- Related: REQ-008
- Actual: Shipping and Total show "Calculated during checkout" (Sub-Total 30.00, Tax 0.00). With Computing and Internet or Fiction only, Shipping 0.00 and a Total are shown.
- Expected (approver): tax and shipping are included in the cart total. Cannot be verified in the cart for shippable items; needs a shipping estimate or checkout (out of scope this round).
- Severity: low (open question).

## Evidence
No screenshots were taken (browser pane hidden). Observations are in `05-execution/exploration-notes.md` and `05-execution/session-2-notes.md`.

## Automation candidates
Listed only (no code). Test cases that are stable and repeatable: add to cart, same product twice, remove item, valid quantity update and line total, header counter. Not candidates until the approver decides: invalid quantity handling, out-of-stock buttons, cart total with shipping.

## Cost
See `05-execution/token-record.md`.

## Open questions
- Q12 (answered: check now): result inconclusive, see summary. Open: should I retry with a clean browser profile (you clear site data for demowebshop.tricentis.com in the Browser pane)?
- The 2 waived Gate 0 items are still unconfirmed; remove the waiver after the demo.

## Approver decisions on findings (2026-11-03)

- F-01: defect, severity low.
- F-02: defect ("In stock" but cannot be bought).
- F-03: accepted as expected; closed.
- Cart per session: attempted, inconclusive (HttpOnly cookie could not be cleared by script).
