# Exploration session: Combinations / Phiên khám phá: kết hợp các điều khiển

- Feature ID: DEMO-002
- Charter: CH-05
- Session: 5
- Date: 2026-11-03
- Time box: 20 min (finished within the box / hoàn thành trong thời gian quy định)
- Environment (`data_class`): synthetic, https://demowebshop.tricentis.com (public demo, no login, no input)
- Build / version under test: not shown by the site
- Browser / OS (web only): installed Chrome via playwright-cli, in-memory profile / Windows 11

## Mission

Filter + sort + page size + view together; changing one control keeps the others; a direct address behaves like clicking. / Kết hợp các điều khiển; đổi một cái giữ các cái khác; địa chỉ trực tiếp giống như bấm.

## Notes (what was done and observed) / Ghi chú

| # | Action | Observation | REQ | Evidence |
|---|---|---|---|---|
| 1 | Remove filter, click "Under 25.00"; Sort = Price: High to Low; Display = 4 | URL `viewmode=grid&orderby=11&pagesize=4&price=-25`; page 1: Fiction 24, Fiction EX 24, Computing and Internet 10, Health Book 10; pager 1, 2, Next, links keep price and sort. Each change kept the earlier choices. | REQ-006 | CH-05-1-combo-p1.yml |
| 2 | View as = List | `viewmode=list`, same 4 products, same order; pager links keep all values | REQ-006, REQ-004 | CH-05-2-combo-list.png |
| 3 | Click Next | `pagenumber=2`; 1 product: Copy of Computing and Internet EX (5 filtered products = 4 + 1) | REQ-006 | CH-05-3-combo-p2.yml |
| 4 | On page 2, Sort = Name: A to Z | URL keeps `pagenumber=2`; shows Health Book (A-Z of the 5 is Computing, Copy, Fiction, Fiction EX, then Health): consistent. Note: changing the sort stays on page 2, while changing Display (CH-03) returned to page 1. | REQ-006 | CH-05-4-sort-on-p2.yml |
| 5 | `goto` the combined address `?viewmode=grid&orderby=11&pagesize=4&price=-25` | Same 4 products, same order, same selected options and pager as in step 1 | REQ-006 | CH-05-5-goto-combo.yml |
| 6 | `goto ?price=10-24` (custom range, not one of the three links) | Filter ignored silently: all 6 products, defaults (Position, 8), no filter panel. Only the three offered ranges work by address. No expectation; recorded only. | REQ-005 | CH-05-6-goto-10to24.yml |

Result: Passed.

## Findings

None. / Không có.

## Follow-ups

- Not tried: reload (F5), browser Back, 12 per page plus filter plus Created on.

## Open questions

- None new beyond Q6.
