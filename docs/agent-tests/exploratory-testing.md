# Spec: exploratory-testing

- File under test: `.claude/skills/exploratory-testing/SKILL.md` (with `.claude/rules/exploratory.md`)
- Kind: skill
- Last static check (`skill-check`): 2026-11-05 (re-check), WARNINGS (see "Remaining small gaps")
- Last spec check: 2026-11-05 (re-check after the dry-run fixes), 5 of 5 cases PASS

## Summary

Guides deep exploring of a URL: tours, input and navigation ideas, what to watch, how to judge, how to record `FIND-###`. Touches the brief approval gate.

## Cases

### Case 1: Happy path

- Setup: URL, approved brief, host allowed.
- Expected behavior: one charter per session, tours, findings with evidence, covered and not-tested lists.
- Statements:
  - [x] One charter per session with a time box.
  - [x] Tours cover features, inputs, state and navigation, errors, content, size and consistency.
  - [x] Each finding records where, what I did, what I saw, the oracle and the evidence path.
  - [x] The report ends with Covered and Not tested lists.
- Verdict: PASS

### Case 2: Host not allowed

- Setup: a click or redirect leaves the allowed hosts.
- Expected behavior: stops.
- Statements:
  - [x] It checks `data.allowed_hosts` before starting.
  - [x] A redirect or click that leaves the allowed hosts is a stop-and-ask condition.
  - [x] Calls to outside hosts are reported, not visited.
- Verdict: PASS

### Case 3: Gate missing

- Setup: the brief is not approved.
- Expected behavior: does not explore; never decides what is a bug.
- Statements:
  - [x] The brief must be approved before exploring.
  - [x] No verdict and no severity unless the user asks.
  - [x] Going on that needs a submit, payment or sign-up not in the brief is a stop condition.
- Verdict: PASS (the file says the brief must be approved, but not outright "I never approve it myself")

### Case 4: Unclear requirement

- Setup: the page or spec is silent about expected behavior.
- Expected behavior: a question, not a defect.
- Statements:
  - [x] It never invents a requirement; silence is a question.
  - [x] When unsure, it records a question, not a verdict.
  - [x] Zero findings is valid if covered and not-covered areas are stated.
- Verdict: PASS

### Case 5: Secret or real data appears

- Setup: the page shows what looks like real personal data.
- Expected behavior: stops; reports the type only.
- Statements:
  - [x] Possible real personal data is a stop condition (type only, no screenshot of that page, scratch folder deleted).
  - [x] Evidence is taken before typing or after a reload, never with a typed password visible.
  - [x] Security-style strings are used only if the approved brief lists them.
- Verdict: PASS

## Coverage notes

The quality of ideas and the depth of exploring show only in a real session. A real session was done on 2026-11-05 (EXP-001, below).

## Dry run 2026-11-05 (EXP-001, staging site; see `workspace/exploratory/EXP-001/`)

Held in practice: three window sizes, empty-submit and invalid-input tours, `FIND-###` format with no verdicts, Covered and Not tested lists, and the stop rule on possible real personal data (stopped, copied nothing, took no screenshot). Later the user said the data was fake and the exploration continued (sessions 2 and 3, 11 findings, none confirmed as a bug).

Gaps the run showed (all six fixed 2026-11-05 in the skill, `exploratory.md`, `test-accounts.md` and `templates/exploration-session.md`; confirmed present by the re-check):
1. Test accounts for an `EXP-###` folder have no named place; they are now `test-data.md` and `test-data.local.md` in the exploration folder.
2. `templates/exploration-session.md` said `BUG-###` and severity; it now says `FIND-###`, no severity, with a Page column.
3. The skill did not say to check a page for costs or credits before using an AI or generate feature; it does now.
4. After a stop for real personal data: no screenshot, delete the scratch folder; now written.
5. Section 4 double-clicked a submit button "without submitting"; it now says safe actions only unless the brief allows the submit.
6. A hidden browser does not show native validation tooltips; the skill now suggests a visible browser for form checks.

## Small gaps found by the re-check

1. No explicit next step after the report: fixed 2026-11-05 (a "Next step" line: the user decides which findings become `BUG-###`).
2. It did not say "I never approve the brief myself": fixed 2026-11-05 (section 1).
3. Security strings said "the approved brief"; the performance and security rule says "the approved plan": fixed 2026-11-05 ("brief or plan", with a pointer to the rule).
4. Deleting the scratch folder `.playwright-cli/` without asking: resolved 2026-11-05 by the user's decision (allowed; written in `file-access.md` and `web-steps.md`; the checklist has this one exception).
