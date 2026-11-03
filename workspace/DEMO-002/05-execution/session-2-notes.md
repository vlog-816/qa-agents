# Exploration session: Sort / Phiên khám phá: sắp xếp

- Feature ID: DEMO-002
- Charter: CH-02
- Session: 2
- Date: 2026-11-03
- Time box: 20 min (finished within the box / hoàn thành trong thời gian quy định)
- Environment (`data_class`): synthetic, https://demowebshop.tricentis.com (public demo, no login, no input)
- Build / version under test: not shown by the site
- Browser / OS (web only): installed Chrome via playwright-cli, in-memory profile / Windows 11

## Mission

Try each of the six sort options in Grid; check name and selling-price order; record what Position and Created on do (Q3). / Thử sáu tùy chọn sắp xếp; ghi lại Position và Created on (Q3).

## Notes (what was done and observed) / Ghi chú

| # | Action | Observation (order, first to last) | REQ | Evidence |
|---|---|---|---|---|
| 1 | Name: A to Z (`orderby=5`) | Computing and Internet, Copy of Computing and Internet EX, Fiction, Fiction EX, Health Book, Science: correct | REQ-002 | (URL only) |
| 2 | Name: Z to A (`orderby=6`) | Science, Health Book, Fiction EX, Fiction, Copy of Computing and Internet EX, Computing and Internet: correct | REQ-002 | CH-02-1-name-za.yml |
| 3 | Price: Low to High (`orderby=10`) | Computing and Internet 10, Health Book 10, Copy ... EX 10, Fiction 24, Fiction EX 24, Science 51: ascending by selling price. Health Book (original 27.00) comes before Fiction (selling 24.00), so the original price is not used (Q1 assumption holds). | REQ-002 | CH-02-2-price-lh.yml |
| 4 | Price: High to Low (`orderby=11`) | Science 51, Fiction 24, Fiction EX 24, Copy ... EX 10, Computing and Internet 10, Health Book 10: descending by selling price | REQ-002 | CH-02-3-price-hl.yml |
| 5 | Created on (`orderby=15`) | Copy of Computing and Internet EX, Fiction EX, Fiction, Science, Health Book, Computing and Internet. No dates are shown, so oldest-first or newest-first cannot be verified. **Needs approver decision (Q3).** | REQ-002 | (URL only) |
| 6 | Position (`orderby=0`) | Computing and Internet, Copy ... EX, Fiction, Fiction EX, Health Book, Science (same as the default and as Name A to Z). **Needs approver decision (Q3).** | REQ-002 | (URL only) |
| 7 | Selected option | After each choice the control shows the chosen option | REQ-002 | snapshots |

Observation: products with equal selling price (10.00 x3, 24.00 x2) have no defined order between them, and it is not an exact reverse between Low-High (Computing, Health, Copy) and High-Low (Copy, Computing, Health). No expectation exists; not reported as a bug. / Sản phẩm cùng giá không có thứ tự xác định; không có kỳ vọng nên không báo lỗi.

Result: Passed for Name and Price sorts; Position and Created on: needs approver decision.

## Findings

None. / Không có.

## Follow-ups

- Ask the approver for the Position and Created on rules (Q3); a product with a visible date would settle it.

## Open questions

- Q3 still open (no expectation).
