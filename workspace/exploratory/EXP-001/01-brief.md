# Exploration brief: EXP-001, staging web app (dry run of our skills)

- Exploration ID: EXP-001
- Date: 2026-11-05
- By: Claude (main session; skills `requirements-interview` explore mode, then `exploratory-testing`)
- Gate "brief": approved (approver: Boss-QA, the user; date: 2026-11-05; "Approve, start exploring")

## URL and host

- https://assistant-qa-staging.vercel.app (the user's own staging host; in `data.allowed_hosts`)
- No other host will be opened. A redirect or click that leaves this host stops the run.

## Goal

Dry run of our two skills on a real site, and to find problems on the way. The user decides what is a bug.

## Charter (one session, about 15 minutes, hidden browser)

Explore sign-up, login and the signed-in area with the tours that fit (feature, input, error, content, size, state and navigation) to find problems in messages, validation, states and layout.

## Seen in the first look (read-only, nothing typed)

- Opening `/` while signed out goes to `/login`.
- `/login`: heading "Welcome back!", Email Address and Password fields, "Sign in" button, "Sign up" link to `/register`.
- Evidence: `evidence/home-1.png`, `evidence/home-1-snapshot.yml` (no credentials shown).

## Answers from the user (interview round)

- Areas: sign-up, login and the signed-in area.
- Test account: yes. Fake name and email on `example.com`, long random password; recorded in `02-test-data.md` (no password) and the git-ignored `test-data.local.md`; the account stays on staging.
- Off-limits: no payments, no deleting data, no heavy traffic; no loops, no load, no security strings, no other sites.
- Time and mode: about 15 minutes, hidden browser.

## Assumptions (not confirmed by the user)

- The signed-in area has "Generate" and "Dashboard" pages and a "Logout" button (seen once in an earlier run that is now only in git history).
- The Generate feature may be used lightly (one or two times, fake text) because the user did not forbid it; if it looks like it costs credits or money, I stop and ask.
- No email verification is needed after sign-up (not confirmed).

## Open questions

- Does the Generate feature cost credits or money? (I will not know until I see the page.)
- What are the password rules at sign-up? (to be recorded from the run)

## Rules that apply

`.claude/rules/exploratory.md`, `web-steps.md`, `test-accounts.md`, `file-access.md`; skill `exploratory-testing`. Findings are `FIND-###` with no verdicts; Covered and Not tested lists end the report.
