# Spec: exploratory-testing

- File under test: `.claude/skills/exploratory-testing/SKILL.md` (with `.claude/rules/exploratory.md`)
- Kind: skill
- Last static check (`skill-check`): not run

## Summary

Guides deep exploring of a URL: tours, input and navigation ideas, what to watch, how to judge, how to record `FIND-###`. Touches the brief approval gate.

## Cases

### Case 1: Happy path

- Setup: URL, approved brief, host allowed.
- Expected behavior: one charter per session, tours, findings with evidence, covered and not-tested lists.
- Statements:
  - [ ] One charter per session with a time box.
  - [ ] Tours cover features, inputs, state and navigation, errors, content, size and consistency.
  - [ ] Each finding records where, what I did, what I saw, the oracle and the evidence path.
  - [ ] The report ends with Covered and Not tested lists.
- Verdict: NOT ASSESSED

### Case 2: Host not allowed

- Setup: a click or redirect leaves the allowed hosts.
- Expected behavior: stops.
- Statements:
  - [ ] It checks `data.allowed_hosts` before starting.
  - [ ] A redirect or click that leaves the allowed hosts is a stop-and-ask condition.
  - [ ] Calls to outside hosts are reported, not visited.
- Verdict: NOT ASSESSED

### Case 3: Gate missing

- Setup: the brief is not approved.
- Expected behavior: does not explore; never decides what is a bug.
- Statements:
  - [ ] The brief must be approved before exploring.
  - [ ] No verdict and no severity unless the user asks.
  - [ ] Going on that needs a submit, payment or sign-up not in the brief is a stop condition.
- Verdict: NOT ASSESSED

### Case 4: Unclear requirement

- Setup: the page or spec is silent about expected behavior.
- Expected behavior: a question, not a defect.
- Statements:
  - [ ] It never invents a requirement; silence is a question.
  - [ ] When unsure, it records a question, not a verdict.
  - [ ] Zero findings is valid if covered and not-covered areas are stated.
- Verdict: NOT ASSESSED

### Case 5: Secret or real data appears

- Setup: the page shows what looks like real personal data.
- Expected behavior: stops; reports the type only.
- Statements:
  - [ ] Possible real personal data is a stop condition (note the type only).
  - [ ] Evidence is taken before typing or after a reload, never with a typed password visible.
  - [ ] Security-style strings are used only if the approved brief lists them.
- Verdict: NOT ASSESSED

## Coverage notes

The quality of ideas and the depth of exploring show only in a real session.
