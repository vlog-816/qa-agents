# Execution report: Demo Web Shop, Books page listing controls / Báo cáo thực thi

- Feature ID: DEMO-002
- Run: run-2 (run-1 was aborted by the user; its screenshots in `evidence/run-1-aborted/` are not part of the results)
- Tester: manual-tester (exploratory)
- Environment (`data_class`): synthetic; https://demowebshop.tricentis.com only
- Build / version under test: not shown by the site
- Browser / OS (web only): installed Chrome via playwright-cli, in-memory profile / Windows 11
- Run date: 2026-11-03
- Duration: about 7 minutes of browser time (16:27 to 16:34)
- Data Guard pre-run: PASS
- Data Guard post-run: PASS (2026-11-03, `data-guard-report.md`) / PASS
- Results gate: **approved** (approver: the user, acting as Gate 0 approver Boss-QA; date: 2026-11-03; approved in chat with "Approve results"). Q2, Q3 and Q6 and the CH-04 count were not answered separately: they stay "needs approver decision", and CH-04 stays counted as Passed with BUG-001 recorded as a low defect. / **đã duyệt**; Q2, Q3, Q6 chưa được trả lời, giữ trạng thái "cần người duyệt quyết định".

## Summary / Tóm tắt

Exploratory run, per charter (not scripted test cases). / Chạy khám phá, tính theo charter.

| Total charters | Passed | Failed | Blocked | Not run |
|---|---|---|---|---|
| 5 | 5 | 0 | 0 | 0 |

Charter count: Passed 5, Failed 0, Blocked 0, Not run 0. Inside CH-04, one sub-check is Failed (empty result display, BUG-001, low) and one is Not run (boundary 25.00 / 50.00: no such product). CH-04 is counted Passed because its main mission (three ranges and removal) passed; the approver may count it Failed. / CH-04 tính Passed vì mục tiêu chính đạt; người duyệt có thể tính Failed.


## Results per area / Kết quả theo khu vực

| Charter | REQ | Platform | Result | Evidence (path) | Notes |
|---|---|---|---|---|---|
| CH-01 List and view | REQ-001, REQ-004 | web | Passed | evidence/run-2/CH-01-1-grid.yml, CH-01-2-list.yml, CH-01-3-list.png | 6 products, same set and order in Grid and List. Out-of-stock books listed (Q5 holds). |
| CH-02 Sort: Name | REQ-002 | web | Passed | CH-02-1-name-za.yml | A-Z and Z-A correct. |
| CH-02 Sort: Price | REQ-002 | web | Passed | CH-02-2-price-lh.yml, CH-02-3-price-hl.yml | Uses the selling price (Q1 holds). Equal prices: undefined order, no expectation. |
| CH-02 Sort: Position, Created on | REQ-002 | web | Passed (recorded) / needs approver decision | session-2-notes.md | Position = Computing, Copy, Fiction, Fiction EX, Health, Science. Created on = Copy, Fiction EX, Fiction, Science, Health, Computing. No expectation (Q3). |
| CH-03 Page size | REQ-003 | web | Passed | CH-03-1-size4-p1.yml, CH-03-2-size4-p1.png, CH-03-3-size4-p2.yml | 4 per page: 4 + 2 with pager; 8 and 12: 6 products, no pager (Q4 holds). |
| CH-04 Filter ranges and removal | REQ-005 | web | Passed | CH-04-1-under25.yml, CH-04-2-under25.png, CH-04-3-25to50.yml, CH-04-5-over50.yml | Under 25: 5 products; 25-50: 0; Over 50: Science. Selling price used. Remove Filter works. |
| CH-04 Empty result display | REQ-005 | web | Failed (low, BUG-001) | CH-04-4-25to50-empty.png | Blank area, no message, controls vanish. Severity low; whether a message is expected is Q6. |
| CH-04 Boundary 25.00 / 50.00 | REQ-005 | web | Not run | none | No product has selling price 25.00 or 50.00. Q2 stays "needs approver decision". |
| CH-05 Combinations | REQ-006 | web | Passed | CH-05-1-combo-p1.yml, CH-05-2-combo-list.png, CH-05-3-combo-p2.yml, CH-05-4-sort-on-p2.yml, CH-05-5-goto-combo.yml | All four controls and the pager keep each other's values; direct address gives the same result as clicking. |

Note on the summary: the empty-display sub-check is Failed (low) inside CH-04; the charter as a whole is counted Passed because its main mission (three ranges, removal) passed. Approver may prefer to count it Failed. / Người duyệt có thể tính CH-04 là Failed.

Evidence is stored under `D:\Source\qa-agents\workspace\DEMO-002\evidence\run-2\` (snapshots are yml text, five screenshots). / Bằng chứng nằm trong thư mục trên.

## Defects found / Lỗi tìm thấy

Severity scale: critical, high, medium, low.

### BUG-001: Empty price-filter result shows a blank area / Kết quả lọc rỗng hiển thị vùng trống

- Related charter: CH-04 (REQ-005)
- Steps to reproduce: open `/books`; click "25.00 - 50.00" in "Filter by price".
- Actual result: the page lists no product, shows no "no products" message, and the View as, Sort by and Display controls are not shown. Only "Filter by price", "25.00 - 50.00" and "Remove Filter" remain.
- Expected result: no expectation is written (Q6). Assumed: a clear message (for example "No products found") and/or the controls stay visible.
- Severity: low
- Evidence: evidence/run-2/CH-04-4-25to50-empty.png, CH-04-3-25to50.yml

## Needs approver decision / Cần người duyệt quyết định

| Item | Observed behavior | Decision needed |
|---|---|---|
| Q2: where 50.00 belongs | Not observable: no product at 25.00 or 50.00 (selling prices 10, 24, 51) | Rule, and/or a boundary product for testing |
| Q3: Position | Computing, Copy, Fiction, Fiction EX, Health, Science (same as default and as Name A-Z) | Expected order |
| Q3: Created on | Copy, Fiction EX, Fiction, Science, Health, Computing; no dates visible | Oldest first or newest first |
| Q6 (new): empty result | blank area, no message (BUG-001) | Is a message expected? |

## Other observations (not defects, no expectation) / Quan sát khác

- Products with equal selling price have no defined order between them (not an exact reverse between ascending and descending).
- With a filter active, the other two range links are hidden until "Remove Filter" is used.
- Changing Display from page 2 returns to page 1; changing Sort on page 2 stays on page 2.
- A custom address `?price=10-24` is silently ignored (all 6 products, no filter panel); only the three offered ranges work.
- Known from DEMO-001, not re-reported: Fiction EX, Science, Copy of Computing and Internet EX have no Add to cart on the list (F-02).

## Retest of earlier defects / Kiểm tra lại

| BUG | First found (run) | Retest result | Evidence (path) |
|---|---|---|---|
| none | - | - | - |

## Automation candidates / Ứng viên tự động hóa

Exploratory run, no scripted cases. Candidates for a later scripted set (approver decision): Name sort A-Z and Z-A; Price sort by selling price; page size 4/8/12 with pager (4 + 2); each of the three price ranges plus Remove Filter; combined filter + sort + size + view; direct-address equals clicking. / Ứng viên cho bộ kịch bản sau này.

## Browser commands run / Lệnh trình duyệt đã chạy (33)

All commands: `npx --no-install playwright-cli <command>`, one per call. Page URL checked after each: always on `demowebshop.tricentis.com`, no off-host page. No external links clicked.

| Type | Count |
|---|---|
| `open` (asks) | 1 |
| `goto` (asks, CH-05 only) | 2 |
| `select` (View, Sort, Display) | 15 |
| `click` (page 2, Next, range links, Remove Filter) | 9 |
| `screenshot` | 5 |
| `close` | 1 |
| Total | 33 |


Denied or blocked: no browser command was denied. One cleanup command (deleting `.playwright-cli/` with `rm -rf`) was denied by the permission system, so the folder `D:\Source\qa-agents\.playwright-cli\` was NOT deleted and still holds the raw snapshots; I did not look for another way. Needed snapshots were copied into the evidence folder. / Lệnh xóa thư mục `.playwright-cli/` bị từ chối; thư mục vẫn còn.

## Open questions / Câu hỏi mở

If not empty, stop and ask a human.

- Q2: where does 50.00 belong, and can a boundary product be provided?
- Q3: expected order of Position and Created on.
- Q6 (new): should an empty filter result show a message (BUG-001)?
- (Resolved by the main session) The leftover `.playwright-cli/` folder was deleted after the needed snapshots were copied; Data Guard post-run on the evidence is PASS.
