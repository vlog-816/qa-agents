# Exploration session: Price filter / Phiên khám phá: lọc theo giá

- Feature ID: DEMO-002
- Charter: CH-04
- Session: 4
- Date: 2026-11-03
- Time box: 20 min (finished within the box / hoàn thành trong thời gian quy định)
- Environment (`data_class`): synthetic, https://demowebshop.tricentis.com (public demo, no login, no input)
- Build / version under test: not shown by the site
- Browser / OS (web only): installed Chrome via playwright-cli, in-memory profile / Windows 11

## Mission

Try "Under 25.00", "25.00 - 50.00", "Over 50.00"; boundary products; removing the filter; empty result display. / Thử ba khoảng giá; sản phẩm biên; bỏ bộ lọc; hiển thị khi kết quả rỗng.

## Notes (what was done and observed) / Ghi chú

Selling prices in the data: 10.00 (x3), 24.00 (x2), 51.00 (x1). No product has exactly 25.00 or 50.00.

| # | Action | Observation | REQ | Evidence |
|---|---|---|---|---|
| 1 | Click "Under 25.00" (12 per page kept) | `price=-25`; 5 products (all except Science). Health Book (original 27.00, selling 10.00) is included, so the selling price is used (Q1). The panel shows "Under 25.00" and a "Remove Filter" link; viewmode, orderby, pagesize kept. | REQ-005 | CH-04-1-under25.yml, CH-04-2-under25.png |
| 2 | Click "Remove Filter" | Back to the 6 products; the three range links return; other choices kept | REQ-005 | (snapshot, not saved) |
| 3 | Click "25.00 - 50.00" | `price=25-50`; **no products, no message, and the View as / Sort by / Display controls disappear**; only the filter name and "Remove Filter" remain. Products with original price 27 to 35 are not shown (selling price rule again). | REQ-005 | CH-04-3-25to50.yml, CH-04-4-25to50-empty.png |
| 4 | Remove Filter, click "Over 50.00" | `price=50-`; 1 product: Science (51.00) | REQ-005 | CH-04-5-over50.yml |
| 5 | Boundary 25.00 / 50.00 | Cannot be tested: no product at exactly 25.00 or 50.00. Q2 has no observable behavior. **Needs approver decision / a boundary product.** | REQ-005 | none |

Observation: while a filter is active the other two range links are not shown; the user must use "Remove Filter" first. / Khi bộ lọc đang bật, hai khoảng giá còn lại không hiển thị.

Result: Passed for the three ranges and removal; boundary check Not run (no data); empty display: BUG-001.

## Findings

| ID | Title | Severity (critical / high / medium / low) | Evidence |
|---|---|---|---|
| BUG-001 | Empty filter result shows a blank area: no "no products" message and the sort/view/display controls vanish | low | evidence/run-2/CH-04-4-25to50-empty.png |

## Follow-ups

- Test a boundary product if the approver provides one (Q2).

## Open questions

- Q2 cannot be observed with the current data.
- Q6 (new): is a "no products found" message expected for an empty filter result?
