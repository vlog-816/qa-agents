# Automation results: DEMO-002, run 1 / Kết quả automation: DEMO-002, lần chạy 1

- Feature ID: DEMO-002
- Run date: 2026-11-04
- By: Claude (main session, acting as the automation-tester; the `automation-tester` wrote the code, the main session ran it)
- Environment (`data_class`): synthetic; https://demowebshop.tricentis.com only (host guard active)
- Tool: `@playwright/test` 1.64.1, project `chromium` (Playwright default browser, headless), 1 worker, `retries: 0`
- Data Guard pre-run (automation run 1): PASS (no waivers), `00-data-gate.md`
- Data Guard post-run: PASS (2026-11-04, `data-guard-report.md`, "automation run 1 post-run"; no findings) / PASS
- Gate `automation` (results): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "Approve results"). The 4 scripts are accepted as the first automation batch for DEMO-002. Not covered by this approval: flakiness (one run only), blocked third-party request counts, the Gate 0 date question, the second batch. / **đã duyệt**.

## Commands run (one per call, each asked the user) / Lệnh đã chạy

| # | Command | Result | Time |
|---|---|---|---|
| 1 | `npx --no-install playwright test tests/DEMO-002/tc-002.spec.ts --project=chromium` | 1 passed | 19.8 s |
| 2 | `npx --no-install playwright test tests/DEMO-002/tc-004.spec.ts --project=chromium` | 1 passed | 11.8 s |
| 3 | `npx --no-install playwright test tests/DEMO-002/tc-007.spec.ts --project=chromium` | 1 passed | 15.0 s |
| 4 | `npx --no-install playwright test tests/DEMO-002/tc-009.spec.ts --project=chromium` | 1 passed | 15.6 s |

Whether each command asked for approval is to be confirmed by the user (the main session cannot see the prompts).

## Results per script / Kết quả theo script

| TC | REQ | Script | Result | Evidence | Notes |
|---|---|---|---|---|---|
| TC-002 | REQ-002 | tests/DEMO-002/tc-002.spec.ts | Passed | none needed (no failure) | Name A to Z, case-insensitive |
| TC-004 | REQ-002 | tests/DEMO-002/tc-004.spec.ts | Passed | none needed | Price low to high uses the selling price |
| TC-007 | REQ-003 | tests/DEMO-002/tc-007.spec.ts | Passed | none needed | 4 per page, two pages, pager |
| TC-009 | REQ-005 | tests/DEMO-002/tc-009.spec.ts | Passed | none needed | Under 25.00 filter and Remove Filter |

Summary: 4 run, 4 Passed, 0 Failed, 0 Blocked, 0 Not run, 0 skipped (every line was "ok", none "-"). / Tổng: 4 chạy, 4 Passed.

## Locator risks U1 to U6 / Rủi ro locator

All four scripts passed on the first run, so the guessed locators worked for these four cases: the CSS `.product-item`, `.actual-price` and `.old-price` (U1 to U3, used by TC-004 and TC-009), the comboboxes found by a marker option (U4), the pager marker (U5, TC-007) and the URL values `orderby=5`, `orderby=10`, `pagesize=N`, `pagenumber=N`, `price=-25` (U6). They are now verified for this catalog and this day only; the site data can change.

## Observations and limits / Quan sát và giới hạn

- The first scripted run is the real check of the "observed Passed in exploratory run-2" assumption: it holds for these four cases.
- One run only, no repetition: flakiness is not measured. Suggested next step: run the same four specs two or three more times on another day before trusting them, and add the second batch (TC-001, TC-003, TC-005, TC-006, TC-008, TC-010, TC-012, TC-013).
- Blocked third-party requests are recorded by the host guard as an annotation; the `list` reporter does not print them, so how many were blocked is not known from this run. To see them, run once with a JSON or HTML reporter.
- No failure evidence exists, so `workspace/DEMO-002/evidence/automation-run-1/` was not needed. Playwright's default `test-results/` folder (git-ignored) holds only empty run folders.

## Open questions / Câu hỏi mở

- Gate 0 confirmations are dated 2026-11-03 and this run was on 2026-11-04 (Data Guard noted it as non-blocking): does the approver want a same-day confirmation? 
- Which next step: second batch, repeat runs for flakiness, or a CI workflow file (code host not decided)?
