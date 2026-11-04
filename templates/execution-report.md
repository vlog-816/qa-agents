# Execution report: <feature name>

- Feature ID: PROJ-123   <!-- Jira key; FEAT-### only when there is no ticket -->
- Run: run-1   <!-- file name: 06-report-run-<n>.md; never overwrite an earlier run -->
- Tester: manual-tester
- Environment (`data_class`):
- Build / version under test:
- Browser / OS (web only):
- Run date:
- Duration:
- Data Guard pre-run (optional): PASS | HOLD | BLOCK | not run
- Data Guard post-run (optional): PASS | HOLD | BLOCK | not run

## Summary

| Total | Passed | Failed | Blocked | Not run |
|---|---|---|---|---|
| | | | | |

## Results per test case

| TC | REQ | Platform | Result | Evidence (path) | Notes / reason if Not run |
|---|---|---|---|---|---|
| TC-001 | REQ-001 | web | Passed / Failed / Blocked / Not run | evidence/run-1/TC-001-1.png | |

Evidence is mandatory for every Failed and Blocked result.

## Defects found

Defect IDs are `BUG-###`, numbered per feature, never reused.

Severity scale: **critical** (blocks the main flow or loses data), **high** (main flow wrong, workaround exists), **medium** (secondary flow wrong), **low** (cosmetic or minor message).

### BUG-001: <title>

- Related TC:
- Steps to reproduce:
- Actual result:
- Expected result:
- Severity:
- Evidence:

(Use masked values only. Never copy real data.)

## Retest of earlier defects

| BUG | First found (run) | Retest result | Evidence (path) |
|---|---|---|---|
| BUG-001 | run-1 | Retest-Passed / Retest-Failed / Not retested | |

## Automation candidates

Test cases that Passed and have `automation_candidate: yes`:

- 

## Open questions

If not empty, stop and ask a human.

- 
