# Code review: DEMO-002 Books page listing controls (first batch) / Review code: các điều khiển danh sách trang Books (lô đầu)

- Feature ID: DEMO-002
- Date: 2026-11-04
- By: automation-tester
- Framework: playwright / typescript
- Gate `automation` (selection): approved (Boss-QA, the user, 2026-11-04; see `00-selection.md`)
- Gate `automation` (code review): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "Approve code"). Approval allows the first headless run of the 4 specs after a Data Guard pre-run; each `npx playwright` command still asks the user. / **đã duyệt**.

## What was run / Đã chạy gì

- Only `npx --no-install playwright test --list` (approved by the user's prompt). Result: config and 4 specs load and compile; it printed 4 tests in 4 files:
  TC-002, TC-004, TC-007, TC-009 (project `chromium`).
- No test was run, no browser or page was opened, nothing was installed, no network command was used. `package.json` and `package-lock.json` were not changed. / Không chạy test, không mở trình duyệt, không cài đặt.

## Part B. Code review / Phần B. Review code

### Files written / Tệp đã tạo

| Script | TC | REQ | Notes |
|---|---|---|---|
| `playwright.config.ts` | - | - | `testDir './tests'`, project `chromium` (Desktop Chrome, headless), `retries: 0`, `workers: 1`, `fullyParallel: false`, `baseURL https://demowebshop.tricentis.com`, reporter `list` (plus html with `open: 'never'` only if `CI`), trace `retain-on-failure`, screenshot `only-on-failure`, no webServer, default output folders. |
| `tests/helpers/host-guard.ts` | - | - | Extends `test`: auto fixture aborts every http/https request to a host not in `ALLOWED_HOSTS`, records the blocked hosts (annotation `blocked-hosts` and attachment `blocked-hosts.json`, hostnames only), never fails a test because of them. Also throws if `baseURL` is not an allowed host. Exports `test`, `expect`. |
| `tests/helpers/books-page.ts` | - | - | Minimal page object for the Books page. All CSS and uncertain locators are here (see risks). |
| `tests/DEMO-002/tc-002.spec.ts` | TC-002 | REQ-002 | Sort by Name A to Z; names compared case-insensitive with a sorted copy; same products as before; selected option checked. |
| `tests/DEMO-002/tc-004.spec.ts` | TC-004 | REQ-002 | Sort by Price Low to High; selling prices never decrease (selling price only); same products. Step 4 adds an annotation `original-price-proof` (available or not today); it does not fail. |
| `tests/DEMO-002/tc-007.spec.ts` | TC-007 | REQ-003 | 4 per page: pages = ceiling(count / 4), 4 on every page but the last, pager with page 1 current, link 2, Next; page 2 has Previous and no Next; no repeats; every product exactly once. |
| `tests/DEMO-002/tc-009.spec.ts` | TC-009 | REQ-005 | Under 25.00: only selling price below 25.00; products at 25.00 or more not shown; Remove Filter restores the full list and the ranges. |

REQ is carried by both a tag (`@REQ-00x`) and an annotation (`requirement`). Titles start with the TC ID.

### Host list / Danh sách host

`ALLOWED_HOSTS` in `host-guard.ts` = `['demowebshop.tricentis.com']`. It is a **subset** of `data.allowed_hosts` in `qa-profile.yaml` (`localhost`, `demowebshop.tricentis.com`); `localhost` is allowed in the profile but not used here. `baseURL` is the same host. No blocked host appears in the code. `playwright.config.ts` repeats the host as a literal; the fixture checks it. WebSocket and non-http traffic are not covered by the guard (note for later).

### Locator risks: UNVERIFIED until the first run / Rủi ro locator: CHƯA kiểm chứng đến lần chạy đầu

I could not check these in a browser. If one is wrong the test fails with a locator or count error (a script problem, not a product defect), and I will propose a fix before changing anything.

| ID | Locator (file `books-page.ts`) | Why uncertain |
|---|---|---|
| U1 | CSS `.product-item` | nopCommerce class name; the snapshot has only generic nodes. |
| U2 | CSS `.actual-price` in a product item (selling price) | Class name assumed; the code throws if it finds not exactly one per product (no silent guess). |
| U3 | CSS `.old-price` in a product item (original price) | Same; absent for products without an original price (0 allowed). |
| U4 | Role `combobox` filtered by a marker option ("List" = View as, "Name: A to Z" = Sort by, "12" = Display), exact option name | The comboboxes have no accessible name in the snapshot, and the options of a closed select must be found by role. Role-based, but not run. `option:checked` is used to read the selected option. |
| U5 | Pager "current page" marker: `listitem` with only the number and no link | Inferred from the snapshot (`listitem` with text "1"). |
| U6 | URL query values waited on after each change: `orderby=5` (Name A-Z), `orderby=10` (Price Low to High), `pagesize=N`, `pagenumber=N`, `price=-25` | Taken from run-2 notes and snapshots (manual/MCP run), not from a script. |

Role-based (seen in the snapshots, lower risk): heading level 2 for product names, links "Under 25.00" / "25.00 - 50.00" / "Over 50.00" / "Remove Filter" / "Next" / "Previous" / page numbers, heading level 1 "Books". Also not run.

### Checklist (the automation-tester answers; the human verifies) / Danh sách kiểm

- [x] Every script maps to one approved TC and at least one REQ; steps and expected results match the case, in order. (Written from `04-test-cases.md`; not yet run. TC-007 generalizes "page 2" to the rule from the count and asserts the case's 2-page precondition.)
- [x] Nothing was invented: no extra steps, no new expected results. Exceptions to look at: (a) TC-002 also checks the same set of products before and after (it is in the case's expected_result); (b) TC-004 reads the original price only for the `original-price-proof` annotation (informational, no assertion); (c) TC-009 additionally requires that products below 25.00 are all shown when the first list fits on one page (this follows from "the filter shows only ... under 25.00" and the preferred precondition; please confirm).
- [x] No fixed sleeps; web-first assertions; waits are on the URL and on visible lists. Locators by role, label or text where possible; the CSS ones are U1 to U3.
- [x] Each test is independent and starts from a clean state (new browser context per test, no login, no cart, nothing typed).
- [x] No secrets or real personal data in code; no credentials; no data typed into fields.
- [x] `baseURL` and the allowed-host list in the helper match `data.allowed_hosts` (subset, see above); requests to other hosts are aborted.
- [x] No blocked host anywhere in the code (`blocked_hosts` is empty; `no_production_hosts: true`).
- [x] Standard Playwright layout (`playwright.config.ts` at the root, `testDir: './tests'`, helpers in `tests/helpers/`).
- [x] Headless, project `chromium`, `retries: 0`; default output folders are git-ignored (`.gitignore` checked). Copying failure evidence to `workspace/DEMO-002/evidence/automation-run-<n>/` happens after a run.
- [x] Nothing installed or changed outside `tests/`, `playwright.config.ts` and the review file. `package.json`, `package-lock.json` untouched.
- [ ] **Not verified:** that the scripts pass, that U1 to U6 are right, that the host guard blocks third-party requests as expected, that `test.skip` behaves as intended in the report. Only loading and compiling was checked (`--list`).

### Skip rules (not a way to hide a failure) / Quy tắc bỏ qua

`test.skip` is used only for preconditions that the case itself states and that make the case impossible to judge:
- TC-002: fewer than 3 products, or products do not fit on one page (pager at the default size).
- TC-004: fewer than 2 different selling prices, or pager at the default size.
- TC-007: pager at the default size (more than 8 products) or 4 or fewer products.
- TC-009: no product below 25.00, none at 25.00 or more, or one at exactly 25.00.
A skipped test shows as "skipped" with the message and is recorded as Blocked in the results, never as Passed.

Different-names check in TC-002 is an `expect` (a failure), not a skip: the precondition says names are different; if equal names exist after case-folding, I would rather have it reported. Please say if you prefer a skip.

### Assumptions and open questions / Giả định và câu hỏi mở

1. Case-insensitive comparison uses plain lower-case code-unit order (not locale rules). If the site orders punctuation or accents differently the test may fail on a script difference. Accepted for now? / So sánh không phân biệt hoa thường theo mã ký tự, không theo locale.
2. TC-009 step 4 compares the restored list with the step 1 list as a sorted set of names (not exact order), because the case says "the full list ... is shown again". Confirm that set equality is enough. / Chỉ so tập tên, không so thứ tự.
3. TC-009 requires "all products below 25.00 are shown" only when step 1 has no pager. Confirm (see checklist item 2c).
4. TC-007 asserts exactly 2 pages (follows from the case's precondition "more than 4 and at most 8"); if the count goes beyond 8 the test skips, not fails.
5. The blocked-hosts annotation and attachment are informational; which hosts get blocked will be known after the first run.
6. A fresh browser context is assumed to give the defaults (Grid, Position, 8 per page), as seen in run-2 snapshots. Not verified by script.
7. Run plan after approval: one spec at a time, `npx playwright test tests/DEMO-002/tc-002.spec.ts --project=chromium`, and so on, each through the user's approval prompt; Data Guard pre-run again only if more than the approved selection changes.

### Approval / Phê duyệt

- Approver: Boss-QA (the user, in chat: "Approve code")
- Date: 2026-11-04
- Decisions that override earlier notes: none. The code is approved as written, which includes the agent's choices for the four open questions (plain lowercase name comparison, sorted-set comparison in TC-009 step 4, cheap products must all appear when there is no pager, equal names in TC-002 fail). Locators U1 to U6 remain UNVERIFIED until the first run; a failing locator is fixed (with a new review note), assertions are not weakened.
