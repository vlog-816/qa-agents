# Traceability matrix: Demo Web Shop, Books page listing controls / Ma trận truy vết

- Feature ID: DEMO-002
- Updated: 2026-11-03 (latest run: run-2)
- Source files: `01-requirements.md`, `03-test-plan.md` (exploratory charters, no `04-test-cases.md`), `06-report-run-2.md`

Exploratory approach: rows are charters (CH) instead of test cases. / Cách tiếp cận khám phá: mỗi dòng là một charter.

## Charter to requirement to result

| CH | REQ | Result (Passed / Failed / Blocked / Not run) | Finding / BUG | Evidence or notes | Script |
|---|---|---|---|---|---|
| CH-01 | REQ-001, REQ-004 | Passed | none | evidence/run-2/CH-01-* ; session-1-notes.md | |
| CH-02 | REQ-002 | Passed (Name, Price); Position and Created on recorded, needs approver decision (Q3) | none | evidence/run-2/CH-02-* ; session-2-notes.md | |
| CH-03 | REQ-003 | Passed | none | evidence/run-2/CH-03-* ; session-3-notes.md | |
| CH-04 | REQ-005 | Passed (ranges, removal); empty display Failed (low); boundary Not run (no data) | BUG-001 (low); Q2, Q6 open | evidence/run-2/CH-04-* ; session-4-notes.md | |
| CH-05 | REQ-006 (also REQ-004, REQ-005) | Passed | none | evidence/run-2/CH-05-* ; session-5-notes.md | |

## Requirement coverage

| REQ | Charters | Covered? (yes / partly / no) |
|---|---|---|
| REQ-001 | CH-01 | yes |
| REQ-002 | CH-02 | partly (Position and Created on have no expectation, Q3) |
| REQ-003 | CH-03 | yes |
| REQ-004 | CH-01, CH-05 | yes |
| REQ-005 | CH-04, CH-05 | partly (boundary 25.00 / 50.00 not testable with current data, Q2) |
| REQ-006 | CH-05 | yes |

## Gaps

- REQ without any charter: none.
- Charter without a REQ (must be none): none.
- Open questions that affect coverage: Q2 (boundary 50.00), Q3 (Position, Created on), Q6 (empty result message).
- Ideas not run: reload (F5), browser Back, `pagenumber` beyond the last page.
- Results gate: waiting for human approval. Data Guard post-run not yet run. / Cổng kết quả chờ người duyệt; Data Guard post-run chưa chạy.
