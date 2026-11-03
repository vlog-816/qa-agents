# Exploration session: List and view mode / Phiên khám phá: danh sách và chế độ xem

- Feature ID: DEMO-002
- Charter: CH-01
- Session: 1
- Date: 2026-11-03
- Time box: 15 min (finished within the box / hoàn thành trong thời gian quy định)
- Environment (`data_class`): synthetic, https://demowebshop.tricentis.com (public demo, no login, no input)
- Build / version under test: not shown by the site / site không hiển thị phiên bản
- Browser / OS (web only): installed Chrome via playwright-cli, in-memory profile / Windows 11

## Mission

Confirm the six products with name and selling price; switch Grid and List; same products and order in both. / Xác nhận sáu sản phẩm với tên và giá bán; chuyển Grid và List; cùng sản phẩm và thứ tự.

## Notes (what was done and observed) / Ghi chú

Selling price = second (red) number per SRC-02; original (struck) price is the first. / Giá bán = số thứ hai (đỏ); giá gốc (gạch) là số đầu.

| # | Action | Observation | REQ | Evidence (path) |
|---|---|---|---|---|
| 1 | `open /books` (Grid, Position, 8 per page) | 6 products: Computing and Internet 30.00/10.00, Copy of Computing and Internet EX 30.00/10.00, Fiction 35.00/24.00, Fiction EX 35.00/24.00, Health Book 27.00/10.00, Science 67.00/51.00. No pager. Each has name, review count, prices. | REQ-001 | evidence/run-2/CH-01-1-grid.yml |
| 2 | Select View as = List | URL `?viewmode=list`; same 6 products, same order, same prices; List shown as selected | REQ-004 | evidence/run-2/CH-01-2-list.yml, CH-01-3-list.png |
| 3 | Select View as = Grid | URL `?viewmode=grid`; Grid selected again | REQ-004 | (page URL only) |
| 4 | Out-of-stock check | Copy of Computing and Internet EX, Fiction EX, Science have no Add to cart but are still listed (Q5 assumption holds; F-02 known from DEMO-001, not re-reported) | REQ-001 | CH-01-1-grid.yml |

Result: Passed.

## Findings

None. / Không có.

## Follow-ups

- Reload (F5) and browser Back were not tried (kept command count low). / Chưa thử reload và Back.

## Open questions

- None new. / Không có câu hỏi mới.
