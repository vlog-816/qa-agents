# Spec: test-case-design

- File under test: `.claude/skills/test-case-design/SKILL.md`
- Kind: skill
- Last static check (`skill-check`): 2026-11-06 re-check, COMPLIANT (an earlier check the same day gave WARNINGS for 2 small gaps, both fixed)
- Last spec check: 2026-11-06 re-check, 5 of 5 cases PASS (2 small wording gaps found and fixed the same day)

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

Reading cannot show if the cases are good; the dry run below was done on 2026-11-06.

## Dry run 2026-11-06 (FEAT-001: sign-up, login and logout of the staging app; see `workspace/FEAT-001/`)

Input: 11 approved requirements (observed in EXP-001). Output: 13 draft cases in `04-test-cases.md` plus a coverage check. Nothing was run against the site.

What helped:
- The type tables prompted cases I would likely have missed from the requirements alone: a cross-page case (TC-002), the Back-after-logout case (TC-012) and an end-to-end data-integrity case (TC-013).
- The "case must also state" column made expected results concrete (exact messages, where the user lands).
- "Unknown, record from the run" handled the malformed-email case (TC-010) cleanly, with no guessing.
- The coverage check found two gaps in the requirements themselves: no unknown-email case (new Q6) and no field-length limits for boundary cases (new Q5).

Gaps the dry run showed (all five fixed 2026-11-06 in the skill and in `templates/test-case.md`; re-check pending):
1. The skill does not say where the coverage check goes (I put it at the end of `04-test-cases.md`).
2. It does not mention the test plan: `manual-tester` Step 1.1 writes `03-test-plan.md` first and the plan and cases are approved together; this dry run skipped the plan.
3. The template's `type` list (`functional | negative | boundary | security | ...`) does not match the skill's types (positive, data validation, cross-page flow, end-to-end workflow, data integrity, ...).
4. Cases that create a permanent account on a shared host: the skill should say to mark them `automation_candidate: no` unless the user agrees (I did, by judgment).
5. Values generated at run time (new email, wrong password) have no named convention in the skill ("generated at run time, never written in any file").

## Re-check 2026-11-06 (after the five fixes)

- All five fixes are present: coverage check at the end of `04-test-cases.md` (skill Step 4), the test plan comes from `manual-tester` and is approved with the cases (Step 5), the template `type` list matches the skill (`templates/test-case.md` line 20, skill Step 3), account-creating cases are `automation_candidate: no` unless the user agrees (Step 3), run-time values are named "generated at run time" (Step 3).
- Static checklist: COMPLIANT. Spec: 5 of 5 cases PASS.
- **One wording issue found, open:** the run-time values sentence says the value is "never written in any file". That is right for a wrong password, but too strict for a new account's values, which the test-accounts rule says to record (sheet without the password, password in the git-ignored local file). The 13 approved cases already do it correctly (TC-004 "never written", TC-007 and TC-013 "recorded only in the git-ignored local file"); only the skill's sentence is too strict. Fixed 2026-11-06 at the user's direction: every value typed in a run, including wrong ones, is recorded as evidence in the git-ignored `test-data.local.md` (skill Step 3 and `.claude/rules/test-accounts.md`); the wording in TC-004 and TC-009 was updated to match (wording only, nothing else in the approved cases changed).
