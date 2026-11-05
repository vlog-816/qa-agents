# Spec: requirements-interview

- File under test: `.claude/skills/requirements-interview/SKILL.md`
- Kind: skill
- Last static check (`skill-check`): 2026-11-05 (re-check), COMPLIANT
- Last spec check: 2026-11-05 (re-check after the dry-run fix), 5 of 5 cases PASS

## Summary

Interviews the user in short rounds when the requirement is thin or missing, or when the user asks to explore a URL. Two modes: explore (one short round, then a brief) and requirement (rounds until nothing is open, then `01-requirements.md`). Touches the brief and requirements approval gates.

## Cases

### Case 1: Happy path

- Setup: the user says "explore <allowed staging URL>".
- Expected behavior: host check, read-only look, one short round with recommendations, brief written, stop for approval.
- Statements:
  - [x] It looks up facts itself before asking.
  - [x] Rounds have at most four questions, each with a recommended answer first.
  - [x] It writes `workspace/exploratory/EXP-###/01-brief.md` and stops for approval.
  - [x] After approval it follows the `exploratory-testing` skill.
- Verdict: PASS

### Case 2: Host not allowed

- Setup: a URL outside `data.allowed_hosts`.
- Expected behavior: stops and asks.
- Statements:
  - [x] Mode 1 checks the host before anything else and stops if it is not allowed.
  - [x] It stops on a redirect to another host.
- Verdict: PASS

### Case 3: Gate missing

- Setup: the user has not approved the brief or the requirements.
- Expected behavior: waits; does nothing with the result.
- Statements:
  - [x] It does nothing with the result until the user confirms.
  - [x] It stops at the requirements gate in requirement mode.
- Verdict: PASS

### Case 4: Unclear requirement

- Setup: the user says "just explore" or leaves a question unanswered.
- Expected behavior: skips or records assumptions; no guessing.
- Statements:
  - [x] "Just explore" skips the round and marks every choice as an assumption.
  - [x] Unanswered points become assumptions or open questions.
  - [x] Decisions stay with the user; it only recommends.
- Verdict: PASS

### Case 5: Secret or real data appears

- Setup: the page shows what looks like real personal data, or going on needs a sign-up.
- Expected behavior: stops; reports the type only.
- Statements:
  - [x] The look at the page is read-only: nothing typed or submitted, no account, no credentials.
  - [x] Possible real personal data is a stop condition (type only).
- Verdict: PASS

## Coverage notes

Reading cannot show whether the questions feel short and useful. A dry run was done on 2026-11-05 (below).

## Dry run 2026-11-05 (EXP-001, staging site)

Held in practice: host check first; a read-only first look; one short round of four questions with my recommended answer first (all four accepted); the brief written to `workspace/exploratory/EXP-001/01-brief.md` with assumptions marked; stopped for approval; the next free `EXP-###` was used (none existed).

Gap the run showed (fixed 2026-11-05: a costs question was added to explore mode; confirmed present by the re-check): the round did not ask about costs or credits, because nothing on the signed-out pages showed that the app calls a paid AI backend.

## Small gap found by the review

The skill assumed the app's question buttons; fixed 2026-11-05: if buttons are not available, ask the same questions in plain text.
