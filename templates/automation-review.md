# Automation selection and code review: <feature name>

- Feature ID: PROJ-123   <!-- Jira key; FEAT-### only when there is no ticket -->
- Date:
- By: automation-tester
- Framework: `automation.framework` / `automation.code_language` from `qa-profile.yaml`
- Gate `automation` (selection): waiting for human approval (approver, date: ______)
- Gate `automation` (code review): waiting for human approval (approver, date: ______)

<!-- Write content in the language set in qa-profile.yaml. Keep keys, IDs and code in English. -->

## Inputs

- `00-data-gate.md`: verdict
- Execution report and results gate: file, approved on (date)
- `04-test-cases.md`: cases are `review_status: approved`, `automation_candidate: yes`, Passed in the report

## Part A. Selection

| TC | REQ | Automate? (yes / no) | Why (stable, repeatable) or why not | Data needed | Risks |
|---|---|---|---|---|---|
| TC-001 | REQ-001 | | | fake data only | shared site data may change |

## Part B. Code review

### Files written

| Script | TC | REQ | Notes |
|---|---|---|---|
| tests/<feature-id>/tc-001.spec.ts | TC-001 | REQ-001 | |

### Checklist (the automation-tester answers; the human verifies)

- [ ] Every script maps to one approved TC and at least one REQ; steps and expected results match the case, in order.
- [ ] Nothing was invented: no extra steps, no new expected results.
- [ ] No fixed sleeps; web-first assertions; locators by role, label or text where possible.
- [ ] Each test is independent and starts from a clean state.
- [ ] No secrets or real personal data in code; credentials only by environment variable name.
- [ ] `baseURL` and the allowed-host list in the helper match `data.allowed_hosts`; requests to other hosts are aborted.
- [ ] No blocked host anywhere in the code.
- [ ] Standard Playwright layout (`playwright.config.ts` at the root, `testDir: './tests'`, helpers in `tests/helpers/`), so CI can run it unchanged.
- [ ] Headless, project `chromium`, `retries: 0`; default output folders (`test-results/`, `playwright-report/`) are git-ignored; failure evidence is copied into `workspace/<feature-id>/evidence/automation-run-<n>/`.
- [ ] Nothing installed or changed outside `tests/`, `playwright.config.ts`, `package.json`/`package-lock.json` (only with approval) and the review files.

### Assumptions and open questions

If not empty, stop and ask a human (uncertainty_policy: stop_and_ask).

- 

### Approval

- Approver:
- Date:
- Decisions that override earlier notes:
