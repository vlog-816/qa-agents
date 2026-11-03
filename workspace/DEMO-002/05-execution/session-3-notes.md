# Exploration session: Page size / Phiên khám phá: số sản phẩm mỗi trang

- Feature ID: DEMO-002
- Charter: CH-03
- Session: 3
- Date: 2026-11-03
- Time box: 15 min (finished within the box / hoàn thành trong thời gian quy định)
- Environment (`data_class`): synthetic, https://demowebshop.tricentis.com (public demo, no login, no input)
- Build / version under test: not shown by the site
- Browser / OS (web only): installed Chrome via playwright-cli, in-memory profile / Windows 11

## Mission

Choose 4, 8, 12; check count per page, the pager with 4 (two pages of 4 and 2), no pager with 8 and 12, and page 2 content. / Chọn 4, 8, 12; kiểm tra số lượng, pager và nội dung trang 2.

## Notes (what was done and observed) / Ghi chú

| # | Action | Observation | REQ | Evidence |
|---|---|---|---|---|
| 1 | Display = 4 (`pagesize=4`) | 4 products (Computing and Internet, Copy ... EX, Fiction, Fiction EX); pager shows "1", link "2" and "Next"; pager links keep viewmode and orderby | REQ-003 | CH-03-1-size4-p1.yml, CH-03-2-size4-p1.png |
| 2 | Click page "2" | `pagenumber=2`; 2 products: Health Book, Science; "Previous" present, no "Next". 4 + 2 = 6, none skipped or repeated. | REQ-003 | CH-03-3-size4-p2.yml |
| 3 | Display = 8 (from page 2) | Returns to page 1 (no `pagenumber`); 6 products, no pager | REQ-003 | (snapshot, not saved) |
| 4 | Display = 12 | 6 products, no pager; 12 shown as selected | REQ-003 | (snapshot, not saved) |

Result: Passed (Q4 assumption holds).

## Findings

None. / Không có.

## Follow-ups

- Not tried: a `pagenumber` beyond the last page by direct address.

## Open questions

- None new.
