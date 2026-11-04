# Traceability matrix: Demo Web Shop, Books page listing controls / Ma trận truy vết

- Feature ID: DEMO-002
- Updated: 2026-11-04 (latest run: run-2, exploratory; TC rows added from `04-test-cases.md`, draft)
- Source files: `01-requirements.md`, `03-test-plan.md` (exploratory charters), `04-test-cases.md` (draft, not yet run as scripted cases), `06-report-run-2.md`

Rows are charters (CH) for the exploratory run-2, plus TC rows derived from it. In the TC table, "observed in exploratory run-2, not yet run as a scripted case" means the behavior was seen in the charter, but the test case itself has no scripted result. / TC chưa được chạy như kịch bản; kết quả là quan sát từ run-2.

## Charter to requirement to result

| CH | REQ | Result (Passed / Failed / Blocked / Not run) | Finding / BUG | Evidence or notes | Script |
|---|---|---|---|---|---|
| CH-01 | REQ-001, REQ-004 | Passed | none | evidence/run-2/CH-01-* ; session-1-notes.md | |
| CH-02 | REQ-002 | Passed (Name, Price); Position and Created on recorded, needs approver decision (Q3) | none | evidence/run-2/CH-02-* ; session-2-notes.md | |
| CH-03 | REQ-003 | Passed | none | evidence/run-2/CH-03-* ; session-3-notes.md | |
| CH-04 | REQ-005 | Passed (ranges, removal); empty display Failed (low); boundary Not run (no data) | BUG-001 (low); Q2, Q6 open | evidence/run-2/CH-04-* ; session-4-notes.md | |
| CH-05 | REQ-006 (also REQ-004, REQ-005) | Passed | none | evidence/run-2/CH-05-* ; session-5-notes.md | |

## Test case to requirement to result

Result column: observed in exploratory run-2, not yet run as a scripted case. / Kết quả: quan sát trong run-2, chưa chạy như ca kịch bản.

| TC | REQ | Charter | Result (latest) | Finding / BUG | Automation candidate | Script |
|---|---|---|---|---|---|---|
| TC-001 | REQ-001 | CH-01 | observed in exploratory run-2 (CH-01 Passed), not yet run as a scripted case | none | yes | |
| TC-002 | REQ-002 | CH-02 | Passed (automation run 1, 2026-11-04); also observed in exploratory run-2 | none | yes | tests/DEMO-002/tc-002.spec.ts |
| TC-003 | REQ-002 | CH-02 | observed in exploratory run-2 (CH-02 Passed), not yet run as a scripted case | none | yes | |
| TC-004 | REQ-002 | CH-02 | Passed (automation run 1, 2026-11-04); also observed in exploratory run-2 (selling price used) | none | yes | tests/DEMO-002/tc-004.spec.ts |
| TC-005 | REQ-002 | CH-02 | observed in exploratory run-2 (CH-02 Passed), not yet run as a scripted case | none | yes | |
| TC-006 | REQ-004, REQ-001 | CH-01 | observed in exploratory run-2 (CH-01 Passed), not yet run as a scripted case | none | yes | |
| TC-007 | REQ-003 | CH-03 | Passed (automation run 1, 2026-11-04); also observed in exploratory run-2 | none | yes | tests/DEMO-002/tc-007.spec.ts |
| TC-008 | REQ-003 | CH-03 | observed in exploratory run-2 (CH-03 Passed), not yet run as a scripted case | none | yes | |
| TC-009 | REQ-005 | CH-04 | Passed (automation run 1, 2026-11-04); also observed in exploratory run-2 (ranges and removal) | none | yes | tests/DEMO-002/tc-009.spec.ts |
| TC-010 | REQ-005 | CH-04 | observed in exploratory run-2 (CH-04 ranges and removal Passed), not yet run as a scripted case | none | yes | |
| TC-011 | REQ-005 | CH-04 | observed in exploratory run-2: range empty, empty display Failed (low), not yet run as a scripted case | BUG-001 (low); Q2, Q6 open | no (empty result, BUG-001, Q6, no expectation) | |
| TC-012 | REQ-006, REQ-004, REQ-005, REQ-002, REQ-003 | CH-05 | observed in exploratory run-2 (CH-05 Passed), not yet run as a scripted case | none | yes | |
| TC-013 | REQ-006 | CH-05 | observed in exploratory run-2 (CH-05 Passed), not yet run as a scripted case | none | yes | |

## Requirement coverage

| REQ | Charters | Test cases (draft) | Covered? (yes / partly / no) |
|---|---|---|---|
| REQ-001 | CH-01 | TC-001, TC-006 | yes |
| REQ-002 | CH-02 | TC-002, TC-003, TC-004, TC-005, TC-012 | partly (Position and Created on have no expectation, Q3, no test case) |
| REQ-003 | CH-03 | TC-007, TC-008, TC-012 | yes |
| REQ-004 | CH-01, CH-05 | TC-006, TC-012 | yes |
| REQ-005 | CH-04, CH-05 | TC-009, TC-010, TC-011, TC-012 | partly (boundary 25.00 / 50.00 not testable with current data, Q2; empty-result display undecided, Q6) |
| REQ-006 | CH-05 | TC-012, TC-013 | yes |

## Gaps

- REQ without any charter: none. REQ without any test case: none.
- Charter without a REQ (must be none): none. Test case without a REQ: none.
- Open questions that affect coverage: Q2 (boundary 50.00), Q3 (Position, Created on), Q6 (empty result message). No test cases are written for Q2 and Q3.
- Ideas not run: reload (F5), browser Back, `pagenumber` beyond the last page.
- Test cases are `approved` (user, 2026-11-04). Scripted: TC-002, TC-004, TC-007, TC-009 (automation run 1, all Passed; see `07-automation/run-1-results.md`). Not yet scripted: the other 8 automation candidates (second batch); TC-011 is not an automation candidate. Automation results gate: approved 2026-11-04 (first batch of 4). / TC đã duyệt; 4 TC đã chạy bằng script, đều Passed.
- Results gate for run-2: approved 2026-11-03 (see `06-report-run-2.md`). Data Guard post-run for run-2: PASS.
