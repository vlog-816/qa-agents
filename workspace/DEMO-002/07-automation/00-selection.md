# Automation selection and code review: DEMO-002 Books page listing controls / Chọn ca tự động hóa và review code: các điều khiển danh sách trang Books

- Feature ID: DEMO-002
- Date: 2026-11-04
- By: automation-tester
- Framework: playwright / typescript (`automation.framework`, `automation.code_language` in `qa-profile.yaml`)
- Gate `automation` (selection): **approved** (approver: Boss-QA, the user; date: 2026-11-04; first batch TC-002, TC-004, TC-007, TC-009)
- Gate `automation` (code review): not started (waits for selection approval) / chưa bắt đầu

## Inputs / Đầu vào

- `00-data-gate.md`: PASS (2026-11-03). No waivers in effect (only the human declaration for the production host list, `no_production_hosts: true`). / PASS, không có waiver.
- Execution report: `06-report-run-2.md`; results gate **approved** (the user as Boss-QA, 2026-11-03).
- `04-test-cases.md`: 13 cases, all `review_status: approved` (the user, 2026-11-04); `automation_candidate: yes` for 12 (TC-011 is `no`).
- Traceability `07-traceability.md`: no TC has a scripted result; the state is "observed in exploratory run-2, not yet run as a scripted case".

### ASSUMPTION to confirm (precondition 4) / GIẢ ĐỊNH cần xác nhận (điều kiện 4)

My precondition 4 asks that the cases are shown as Passed in the report. Run-2 is exploratory and charter-based, so no TC is listed as Passed one by one. For this pilot I treat "observed Passed in the run-2 charters (CH-01 to CH-05)" as meeting precondition 4. **The first scripted run is the real check**: until then, no case counts as verified. Please confirm or reject this reading. / Run-2 là thăm dò theo charter nên không có TC nào được ghi Passed riêng lẻ. Trong pilot này coi "quan sát Passed trong các charter run-2" là đủ điều kiện 4. **Lần chạy kịch bản đầu tiên mới là kiểm tra thật.** Xin xác nhận.

## Part A. Selection / Phần A. Chọn ca

Common to all selected cases: host only `demowebshop.tricentis.com` (`localhost` is in `allowed_hosts` but not used); no login, no credentials; data is none (fake data only, nothing typed in). Shared risk: the demo site is public and its catalog can change (on 2026-11-03: six books, selling prices 10, 24, 51; five under 25.00; only Science above 50.00; equal prices have no defined order). Scripts check rules, not hard-coded lists, and must not judge the order inside equal prices. / Rủi ro chung: danh mục của site demo công khai có thể thay đổi; script kiểm tra quy tắc, không so danh sách cố định.

| TC | REQ | Automate? | Why (stable, repeatable) or why not | Data needed | Risks |
|---|---|---|---|---|---|
| TC-001 | REQ-001 | yes | Read-only, rule-based (each product once, name and selling price, no pager). | none | Needs 8 or fewer products. Out-of-stock check (step 3) is skipped and noted if no such product exists. |
| TC-002 | REQ-002 | yes | Name A-Z is deterministic; compare names with a sorted copy. | none | Needs 3+ products with different names. Letter-case or locale sorting differences in the comparison must follow what the page shows; ask if unclear. |
| TC-003 | REQ-002 | yes | Same as TC-002, reverse order. | none | Same as TC-002. |
| TC-004 | REQ-002 | yes | Check "never decreases" on the selling price (red), not on the original price. | none | Must read the selling price, not the struck-through one. The proof that the original price is not used depends on the catalog (preferred precondition). Ties: do not check order inside a tie. |
| TC-005 | REQ-002 | yes | Check "never increases" on the selling price. | none | Ties as in TC-004. |
| TC-006 | REQ-004, REQ-001 | yes | Compare the product list between Grid and List; sort kept after switching view. | none | Needs all products on one page; ties in price are not involved (sort by name in step 4). |
| TC-007 | REQ-003 | yes | Rule: ceiling(count / 4) pages, 4 on every page but the last, no repeats. | none | Needs more than 4 and at most 8 products. If the count changes, the script must compute the expectation from the count, not hard-code 4 + 2. |
| TC-008 | REQ-003 | yes | 8 and 12 per page show all products, no pager; size change from page 2 returns to page 1. | none | Needs 8 or fewer products. |
| TC-009 | REQ-005 | yes | Under 25.00 filter shows only selling price below 25.00; Remove Filter restores the full list. | none | Needs one product below and one at 25.00 or more; relies on no product at exactly 25.00. If no product is 25.00 or more, the case cannot be judged: mark Blocked, do not fail. |
| TC-010 | REQ-005 | yes (conditional) | Over 50.00 filter shows only selling price above 50.00; Remove Filter restores the list. | none | **Blocked rule:** if no product is above 50.00 today the empty display has no expectation (Q6); the script must report Blocked / Not run, not Failed. Today only Science (51.00) qualifies, so it depends on one product. Relies on no product at exactly 50.00 (Q2). |
| TC-011 | REQ-005 | **no** | Current catalog has no product in 25.00-50.00, so the range is empty; the empty display is BUG-001 and Q6 (no expectation); the boundary is Q2 (no expectation). Re-evaluate when a product in the range exists and Q6 is decided. | none | Automating it would assert an undecided behavior. |
| TC-012 | REQ-006, REQ-004, REQ-005, REQ-002, REQ-003 | yes | Chain of 6 steps checking each control keeps the others' values; expectations are rules. | none | Longest case, most likely to need locator care (the page reloads on each change, so use web-first assertions on the URL or the selected option, no sleeps). Needs more than 4 products under 25.00 (today five); with fewer, the case cannot be judged (Blocked). |
| TC-013 | REQ-006 | yes | Compare the clicked result with a fresh load of the same address. | none | **Needs direct address navigation** (`page.goto` of the URL read from the first page). It stays on the allowed host: the script must check that the host of the address is `demowebshop.tricentis.com` before navigating, and the host guard blocks any other host. Same data needs as TC-012. |

Summary: yes 12 (TC-001 to TC-010, TC-012, TC-013), no 1 (TC-011). TC-010 is conditional (Blocked rule). / Tổng: 12 có, 1 không (TC-011).

## Proposed approach / Cách tiếp cận đề xuất

- Standard Playwright layout so CI runs it unchanged: `playwright.config.ts` at the repository root, `testDir: './tests'`; specs in `tests/DEMO-002/<tc-id>.spec.ts` (for example `tests/DEMO-002/tc-002.spec.ts`); shared helpers and fixtures in `tests/helpers/`, including the host guard.
- Host guard: a fixture using `page.route` aborts every request to a host not in `data.allowed_hosts` (the list in the helper must match `qa-profile.yaml`). `baseURL` is `https://demowebshop.tricentis.com`. Because the shop may load third-party resources (fonts, analytics), an aborted third-party request is expected and is not a failure; I will report which hosts were blocked. / Có thể có tài nguyên bên thứ ba bị chặn; sẽ báo cáo host nào bị chặn.
- One test per TC; title starts with the TC ID; the REQ ID(s) are in an annotation or tag. Steps and expected results in the same order as the case.
- Headless, project `chromium` (Playwright default browser), `retries: 0`, traces and screenshots only on failure. Default output folders `test-results/` and `playwright-report/` (git-ignored). Failure evidence is copied to `workspace/DEMO-002/evidence/automation-run-<n>/`.
- No CI workflow file (separate decision, BL-012). Run one spec at a time, only after code review approval and through the user's approval prompt.

## Install needs (not done, needs the user's approval) / Cần cài đặt (chưa làm, cần người dùng duyệt)

1. `npm install --save-dev @playwright/test` (creates or updates the root `package.json` and `package-lock.json`).
2. `npx playwright install chromium` for the build that matches the installed version. The shared cache `%LOCALAPPDATA%\ms-playwright` already holds several Chromium builds; the needed revision must be checked before any download, because the matching build may already be there.

Nothing was installed or run in this step. / Chưa cài hay chạy gì.

## Part B. Code review / Phần B. Review code

Not started. It begins after the selection is approved. / Chưa bắt đầu; chỉ bắt đầu sau khi duyệt phần chọn.

## Open questions / Câu hỏi mở

1. Precondition 4 assumption: do you accept "observed Passed in the run-2 charters" as enough, with the first scripted run as the real check? / Chấp nhận giả định điều kiện 4 không?
2. Which cases go in the first batch? Recommendation: a small batch of 4 specs, TC-002, TC-004, TC-007, TC-009, which cover sort by name, sort by selling price, paging and filter, and test the layout, the host guard and the evidence flow before writing all 12. Then the remaining 8 in a second batch. Or all 12 now? / Lô đầu: 4 ca (TC-002, TC-004, TC-007, TC-009) hay cả 12?
3. TC-010 is included but is conditional on a product above 50.00 (today only Science). Confirm that a missing product means Blocked, not Failed. / Xác nhận thiếu sản phẩm trên 50.00 thì Blocked.
4. TC-013: confirm that reading the address from the first page and opening it with `page.goto` (host checked first) is the accepted way to do the "fresh page load". / Xác nhận cách mở địa chỉ trực tiếp.
5. TC-002 and TC-003: how should names be compared (case-insensitive, as the page seems to order them)? I will not guess; if the case wording is not enough, I will ask before writing the script. / Cách so sánh tên (hoa/thường).
6. Third-party requests blocked by the host guard: confirm that blocking them (and not failing a test because of them) is acceptable. / Xác nhận việc chặn request bên thứ ba là chấp nhận được.
7. Install approval: may I ask for the install commands after the selection is approved? / Duyệt cài đặt sau khi duyệt phần chọn?

## Answers from the user (2026-11-04, in chat) / Câu trả lời của người dùng

1. Precondition 4: accepted ("observed Passed in the run-2 charters" counts for the pilot; the first scripted run is the real check).
2. First batch: **4 specs: TC-002, TC-004, TC-007, TC-009**; the other 8 later in a second batch.
3. TC-010 (not in the first batch): a missing product above 50.00 means Blocked, not Failed (accepted).
4. TC-013 (not in the first batch): direct address with `page.goto`, host checked first (accepted).
5. Names in TC-002 and TC-003: compared **case-insensitive** (decided).
6. Third-party requests are blocked by the host guard and must not fail a test (accepted).
7. Install approval: not asked yet; it is a separate approval, requested after the selection is approved.

## Approval / Phê duyệt

- Approver: Boss-QA (the user, approved in chat: "Approve selection"). Approved: the selection of 12 cases (TC-011 excluded) and the **first batch of 4 specs: TC-002, TC-004, TC-007, TC-009**. Part B (code review) not started; the install needs a separate approval.
- Date: 2026-11-04
- Decisions that override earlier notes: ______
