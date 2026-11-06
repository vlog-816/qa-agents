# Test accounts

- Synthetic test logins for dedicated test accounts on allowed staging or local hosts are test data and must be recorded (user decision, 2026-11-05).
- Record each account per feature in two places:
  - `workspace/<feature-id>/02-test-data.md`: label, full name, email, purpose, used by, cleanup. No password.
  - `workspace/<feature-id>/test-data.local.md`: the password (git-ignored by the rule `workspace/**/*.local.md` in `.gitignore`).
- For an exploration the same two files live in `workspace/exploratory/EXP-###/` as `test-data.md` and `test-data.local.md`.
- Reports say "the account in test-data.local.md". Never put a password in reports, evidence, tracked files, tickets or chat.
- Record the account right after registration passes and before login cases use it.
- Record every value typed during a run as evidence, including wrong or invalid ones (a wrong password, a malformed email), with the case ID: passwords and other secrets only in the git-ignored `test-data.local.md`; non-secret values (a malformed email text, an empty field) may also be in the report. Reports say "the values in test-data.local.md" (user decision, 2026-11-06).
