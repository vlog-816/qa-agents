# Test accounts

- Synthetic test logins for dedicated test accounts on allowed staging or local hosts are test data and must be recorded (user decision, 2026-11-05).
- Everything lives in the shared folder `test-data/` (user decision, 2026-11-06; see `test-data/README.md`):
  - `accounts.md` (tracked): label, host, full name, email, purpose, used by, cleanup. No password.
  - `accounts.local.md`: the passwords (git-ignored by `test-data/**/*.local.md` in `.gitignore`).
  - `inputs.md` (tracked): reusable fake values by type.
  - `typed-values.local.md`: every value typed in a run (git-ignored).
- Cases and notes point to these files instead of repeating values. Older per-feature files (`workspace/<feature-id>/02-test-data.md`, `test-data.md` in `EXP-###` folders) predate the shared folder and stay as they are.
- Reports say "the account ACC-... in test-data/accounts.md". Never put a password in reports, evidence, tracked files, tickets or chat.
- Record the account right after registration passes and before login cases use it.
- Record every value typed during a run as evidence, including wrong or invalid ones (a wrong password, a malformed email), with the run, the page and the case ID or step number: passwords and other secrets only in the git-ignored `test-data/typed-values.local.md`; non-secret values (a malformed email text, an empty field) may also be in the report. Reports say "the values in test-data/typed-values.local.md" (user decision, 2026-11-06).
