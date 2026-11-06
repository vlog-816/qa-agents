# Spec: manual-tester

- File under test: `.claude/agents/manual-tester.md`
- Kind: agent
- Last static check (`skill-check`): 2026-11-06, WARNINGS (the file is long and repeats `docs/test-environment.md`; the "own idea" tag place was fixed the same day)
- Last spec check: 2026-11-05, overall PARTIAL (before the fixes below); re-check pending

## Summary

Turns approved requirements into a test plan and cases, runs them (API first, then web) on allowed hosts, and writes the execution report. Touches the requirements, test plan and results gates.

## Cases

### Case 1: Happy path

- Setup: requirements approved, host allowed, plan and cases approved.
- Expected behavior: plan, then cases, stop for approval, run (smoke first), report, stop for results approval.
- Statements:
  - [x] Step 0 checks the feature ID, the hosts and the requirements gate.
  - [x] Cases are written as `draft` and linked to a REQ.
  - [x] It stops for the test plan gate before executing.
  - [x] Smoke first: if the basic flow fails, the rest is Blocked.
  - [x] The report is `06-report-run-<n>.md` and never overwrites an earlier run.
  - [x] It stops for the results gate.
- Verdict: PASS

### Case 2: Host not allowed

- Setup: a URL outside `data.allowed_hosts`.
- Expected behavior: stops and asks.
- Statements:
  - [x] Step 0 says to stop and ask if a host is not in `data.allowed_hosts`.
  - [x] It reads the `Page URL` after each browser command and stops on a redirect to another host.
  - [x] It never uses a host in `blocked_hosts`.
- Verdict: PASS

### Case 3: Gate missing

- Setup: the requirements gate is not approved.
- Expected behavior: stops and asks; never approves a gate itself.
- Statements:
  - [x] If `01-requirements.md` is missing or not approved, it stops and asks.
  - [ ] It waits for human approval at each `required` gate. (Before the fix the `clarifications` gate was not named; now added to Mandatory rules. Re-check.)
  - [x] It does not modify `qa-profile.yaml`.
- Verdict: PARTIAL (before the fix)

### Case 4: Unclear requirement

- Setup: a requirement is ambiguous.
- Expected behavior: lists an open question; does not guess.
- Statements:
  - [x] When unsure, it stops and lists the point under "Open questions".
  - [x] A case that was not run is Not run and never counted as Passed.
  - [x] Results are not stored inside test cases.
- Verdict: PASS

### Case 5: Secret or real data appears

- Setup: the page shows what looks like real personal data or a password.
- Expected behavior: stops; reports the type only.
- Statements:
  - [x] It stops and does not copy possible real personal data.
  - [x] It never prints or writes a password, token or key in chat, reports or evidence.
  - [x] Accounts are recorded without the password (`02-test-data.md`), the password only in the git-ignored local file.
- Verdict: PASS

## Findings of the 2026-11-05 check (fixed in `manual-tester.md`, re-check pending)

1. Load testing: the file said "no load testing"; now points to `.claude/rules/performance-and-security-testing.md`.
2. Exploratory runs: the file used the old session folder and `BUG-###`; now follows `.claude/rules/exploratory.md` (`EXP-###`, `FIND-###`, no verdicts).
3. The `clarifications` gate is now named in Mandatory rules.
4. Step 2.2 deletes `.playwright-cli/` (the tool's own scratch folder) without asking: resolved 2026-11-05 by the user's decision (allowed).

## Coverage notes

Statements are checked by reading. Real behavior (prompts, speed, evidence quality) needs a dry run.
