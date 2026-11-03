# Traceability matrix: DEMO-001 Add to cart

- Feature ID: DEMO-001
- Updated: 2026-11-03
- Source files: `01-requirements.md`, `04-test-cases.md`, `06-report.md`

Results are taken from `06-report.md` (exploratory sessions, so some cases were only partly covered; "Not run" means no clear result was recorded for that case).

## Test case to requirement to result

| TC | REQ | Result | Finding / BUG | Evidence or notes | Script |
|---|---|---|---|---|---|
| TC-001 | REQ-006 | Passed | | Add from the list: message shown, header counter up | |
| TC-002 | REQ-006 | Passed | | Add from the product page | |
| TC-003 | REQ-007, REQ-008 | Passed | | Qty 3: line total 30.00 | |
| TC-004 | REQ-007 | Not run | | Remove with several items was not done one by one | |
| TC-005 | REQ-007 | Passed | | Last item removed: empty cart message | |
| TC-006 | REQ-007 | Failed | F-01 | Unusual quantities not rejected with a message | |
| TC-007 | REQ-006, REQ-008 | Passed | | Unit price is the selling price | |
| TC-008 | REQ-008 | Passed | | Sub-Total correct; Total shows "Calculated during checkout" for shippable items (accepted) | |
| TC-009 | REQ-008, REQ-007 | Not run | | Not done as a single chain | |
| TC-010 | REQ-007 | Failed | F-01 | `abc` silently reset | |
| TC-011 | REQ-007 | Failed | F-01 | `-1` removes the item, no message | |
| TC-012 | REQ-007, REQ-008 | Passed | | 10000 accepted, line total correct (record only) | |
| TC-013 | REQ-006, REQ-007 | Passed | | Header counter is total quantity (expected) | |
| TC-014 | REQ-006 | Failed | F-02 | Two "In stock" products have no Add to cart button | |
| TC-015 | REQ-006, REQ-008 | Passed | | Same product twice merges (qty 2); two products give two lines | |
| TC-016 | REQ-007 | Failed | F-01 | `0` removes, `2.5` reset to 1, empty keeps old value, no message | |
| TC-017 | REQ-006, REQ-007 | Not run | | Reload kept the cart; new session check inconclusive (HttpOnly cookie) | |

## Requirement coverage

| REQ | Test cases | Covered? |
|---|---|---|
| REQ-006 | TC-001, TC-002, TC-007, TC-013, TC-014, TC-015, TC-017 | yes |
| REQ-007 | TC-003, TC-004, TC-005, TC-006, TC-009, TC-010, TC-011, TC-012, TC-013, TC-016, TC-017 | yes |
| REQ-008 | TC-003, TC-007, TC-008, TC-009, TC-012, TC-015 | partly (total with shipping not checked; needs checkout) |
| REQ-001 to REQ-005 | none | no (out of scope this round) |

## Gaps

- REQ without a test case: REQ-001 to REQ-005 (Books page, out of scope).
- Test case without a REQ: none.
- Open: new-session cart check (BL-005 in `docs/backlog/BACKLOG.md`), total with shipping (needs checkout).
