# Test data

Shared test data for every feature and exploration. Point to it from cases, notes and reports instead of writing values again. Fake data only (user decision, 2026-11-06).

| File | In git? | What it holds |
|---|---|---|
| `accounts.md` | yes | Test accounts: label, host, full name, email, purpose, used by, cleanup. No password. |
| `accounts.local.md` | no (git-ignored) | The passwords of those accounts. |
| `inputs.md` | yes | Reusable fake input values and patterns, by type. |
| `typed-values.local.md` | no (git-ignored) | Every value typed in a run, even a wrong one, with run, page and case or step. This is the evidence. |

How to use it:
- A case or note says "see `test-data/inputs.md`, malformed email" instead of repeating a value. A run says "the account `ACC-...` in `test-data/accounts.md`".
- Before a run that creates an account, add it to `accounts.md` and `accounts.local.md`. After each run, add what was typed to `typed-values.local.md`.
- Never put a password in a tracked file, a report or chat. `.gitignore` keeps `test-data/**/*.local.md` out of git.

Rules: `.claude/rules/test-accounts.md`. Older folders (for example `workspace/exploratory/EXP-001/`) have their own copies from before this folder existed.
