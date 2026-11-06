---
name: test-case-design
description: Design scripted test cases from approved requirements. Use when writing or reviewing `04-test-cases.md`. Gives a checklist of test types (functional, integration and data), what each case must state, and a coverage check. Cases follow `templates/test-case.md` and stay draft until the user approves.
---

# Test case design

Use with the `manual-tester` agent and `templates/test-case.md`. This skill is about what to cover and how to word each case. It grants no permission; the rules in `CLAUDE.md` and `.claude/rules/` still apply.

## Step 1: read

- Read the approved `workspace/<feature-id>/01-requirements.md`. If it is missing or not approved, stop and ask.
- List the REQs. Anything unclear goes to "Open questions". Never invent a requirement, a screen, a message or a number.
- If a requirement or example contains what looks like real personal data or a real password, stop, report the type only and copy nothing.

## Step 2: pick the test types that fit each REQ

Every case states: the page (name and address), the preconditions, the numbered steps, and the expected result after each step.

**Functional**

| Type | What to cover | The case must also state |
|---|---|---|
| Positive | The normal path with valid data | The result the user sees and where they land |
| Negative | Invalid, missing or wrong input; wrong order of steps | That the action is refused, and the message text if known |
| Boundary | The limit, one below and one above (length, number, date, count) | Which side is accepted and which is refused |
| Data validation | Valid and invalid values for each field (format, type, required) | The expected message for each invalid value |
| Error handling | What the user sees when something fails, and the way out | The message and the next possible action |

**Integration and data**

| Type | What to cover | The case must also state |
|---|---|---|
| Cross-page flow | Data or state passed from one page to the next | The page names and what carries over |
| API integration | Status codes, response shape, required fields, auth, error cases (needs a spec in `inbox/`; no spec, stop and ask) | The method, endpoint, expected status and fields |
| End-to-end workflow | A whole user goal from start to finish | The start state and the final state |
| Data integrity | The same data shown the same after save, reload and on other pages | Which data and which pages are compared |

**Not designed here:** performance and security follow `.claude/rules/performance-and-security-testing.md` (own hosts, approved plan). Accessibility and window-size ideas are in the `exploratory-testing` skill. Compatibility, localization, installation and data migration are later.

## Step 3: write the cases

- Write the cases to `workspace/<feature-id>/04-test-cases.md`. The `environment` and any host in a case come only from `data.allowed_hosts`; if a case needs another host, stop and ask.
- Use the `templates/test-case.md` block: `id`, `req`, `title`, `platform`, `priority`, `type`, `preconditions`, `test_data`, `steps`, `expected_result`, `automation_candidate`, `review_status: draft`.
- Framework-neutral: no selectors, code or tool names. Describe actions at the business level, naming the page ("On the Login page, `/login`, click Sign in").
- Fake test data only. Credentials by variable name (`password_env`), never the value; test accounts follow `.claude/rules/test-accounts.md`.
- If the expected message or value is not known, write "unknown, record from the run" and add an open question. Do not guess it.
- Values made at run time (a new email, a wrong password, a malformed value): write "generated at run time" in `test_data`, not the value. The run records every value it actually typed, including wrong ones, as evidence in the git-ignored `test-data.local.md` (see `.claude/rules/test-accounts.md`). Never put a password in a case, a report or any tracked file.
- A case that creates data on a shared or staging host (for example a new account): set `automation_candidate: no` unless the user agrees.
- Use a `type` from the list in `templates/test-case.md`.
- One idea per case, short title, a unique ID.

## Step 4: coverage check (before asking for approval)

- Every REQ has at least one case.
- Every input has at least one negative and one boundary case, or a reason why not.
- List the test types you skipped and why.
- List open questions.
- Write this coverage check at the end of `04-test-cases.md`.

## Step 5: stop

Stop and wait for the user's approval of the cases. Never approve them myself. The test plan (`03-test-plan.md`) comes from the `manual-tester` (Step 1.1) and is approved together with the cases (gate `test_plan`); the cases are not ready to run without it. After the user approves, the `manual-tester` runs the cases and writes the report; cases marked `automation_candidate: yes` can later go to the `automation-tester`. If `04-test-cases.md` already exists, ask with two options: a new file with the next number (recommended) or overwrite it.
