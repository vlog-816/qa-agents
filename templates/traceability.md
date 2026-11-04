# Traceability matrix: <feature name>

- Feature ID: PROJ-123   <!-- Jira key; FEAT-### only when there is no ticket -->
- Updated:
- Source files: `01-requirements.md`, `04-test-cases.md`, `06-report.md`

How to use: one row per test case. Every REQ must appear in at least one row. Results come from the execution report, not from the test case file. Fill the `Script` column only after the automation phase (path of the script, or "not automated" with the reason); the `automation-tester` does this.

## Test case to requirement to result

| TC | REQ | Result (Passed / Failed / Blocked / Not run) | Finding / BUG | Evidence or notes | Script |
|---|---|---|---|---|---|
| TC-001 | REQ-001 | | | | |

## Requirement coverage

| REQ | Test cases | Covered? (yes / partly / no) |
|---|---|---|
| REQ-001 | | |

## Gaps

- REQ without any test case:
- Test case without a REQ (must be none):
- Open questions that affect coverage:
