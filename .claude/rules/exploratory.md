# Exploratory runs

Applies when the user gives a URL and asks to explore.

## Where results go

- Folder per exploration: `workspace/exploratory/EXP-###/` (EXP-001, EXP-002, ...). This is the agreed exception to the `workspace/<feature-id>/` layout in `CLAUDE.md`; scripted work still uses `workspace/<feature-id>/`.
- Files in the folder:
  - `01-brief.md`: URL, goal, areas to look at, assumptions, open questions. The user approves it.
  - `02-session-<n>.md`: notes per session (format: `templates/exploration-session.md`).
  - `03-report.md`: the findings.
  - `evidence/`: screenshots and snapshots (git-ignored by the `workspace/**/evidence/` rule).

## Steps

1. Check the host is in `data.allowed_hosts`; otherwise stop and ask.
2. Write `01-brief.md`; stop and wait for the user's approval (the gates in `qa-profile.yaml` stay `required`).
3. Explore read-only with the allowed `playwright-cli` call form (see `web-steps.md`). Type only fake data. Submit no order, payment or sign-up unless the approved brief lists it. Test accounts follow `test-accounts.md`.
4. Write `03-report.md`.

## Thinking

- When exploring, use the `exploratory-testing` skill (`.claude/skills/exploratory-testing/SKILL.md`): tours, input ideas, what to watch, how to judge, how to record.

## Report rules

- Items are `FIND-###`: what I did, what I saw, the evidence path. No verdict and no severity unless the user asks.
- Only findings the user confirms become `BUG-###`.
- Doubts go under "Open questions"; never guess.
