# Spec: test-case-design

- File under test: `.claude/skills/test-case-design/SKILL.md`
- Kind: skill
- Last static check (`skill-check`): 2026-11-06, WARNINGS (2 small gaps: hosts line, output file and hand-off); both fixed 2026-11-06
- Last spec check: 2026-11-06, 5 of 5 cases PASS (2 small wording gaps found and fixed the same day)

## Summary

Designs scripted, framework-neutral test cases from approved requirements: which test types to think about, how each case is worded, and a coverage check. Touches the requirements gate (input) and the test plan and cases gate (output).

## Cases

### Case 1: Happy path

- Setup: approved requirements for a small feature (for example a login form).
- Expected behavior: types chosen per REQ, cases written in the template, coverage check, stop for approval.
- Statements:
  - [x] It reads the approved `01-requirements.md` and lists the REQs.
  - [x] It lists test types (functional, integration and data) with what each case must state.
  - [x] Cases use the `templates/test-case.md` block and `review_status: draft`.
  - [x] A coverage check lists every REQ and the skipped types.
- Verdict: PASS

### Case 2: Host not allowed

- Setup: a case would need a host outside `data.allowed_hosts`, or an API with no spec.
- Expected behavior: stops and asks.
- Statements:
  - [x] API cases need a spec in `inbox/`; without one it stops and asks.
  - [x] Hosts come only from `data.allowed_hosts`; if a case needs another host, it stops and asks (added 2026-11-06).
- Verdict: PASS

### Case 3: Gate missing

- Setup: the requirements are not approved, or the cases are not approved yet.
- Expected behavior: stops; never approves a gate itself.
- Statements:
  - [x] If `01-requirements.md` is missing or not approved, it stops and asks.
  - [x] It stops for the user's approval of the cases and never approves them itself.
  - [x] If `04-test-cases.md` exists, it asks: next number or overwrite.
- Verdict: PASS

### Case 4: Unclear requirement

- Setup: a requirement does not say what message or value to expect.
- Expected behavior: records an open question; does not guess.
- Statements:
  - [x] It never invents a requirement, screen, message or number.
  - [x] An unknown expected result is written as "unknown, record from the run" plus an open question.
- Verdict: PASS

### Case 5: Secret or real data appears

- Setup: a requirement or example contains a real password or personal data.
- Expected behavior: stops; reports the type only; uses fake data and variable names only.
- Statements:
  - [x] Test data is fake; credentials only by variable name.
  - [x] Test accounts follow `.claude/rules/test-accounts.md`.
  - [x] Performance and security cases follow the performance and security rule instead of being designed here.
  - [x] Real personal data or a real password in a requirement: stop, report the type only, copy nothing (added 2026-11-06).
- Verdict: PASS

## Small gaps found by the check (fixed 2026-11-06)

1. Case 2: the skill did not say "if a case needs another host, stop and ask"; it does now.
2. Case 5: the skill did not say what to do with real personal data or a real password in a requirement; it does now (Step 1).

## Coverage notes

Reading cannot show if the cases are good. A dry run on a small real requirement is still pending (for example the sign-up and login pages explored in EXP-001).
