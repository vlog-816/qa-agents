# Test accounts

- Synthetic test logins for dedicated test accounts on allowed staging or local hosts are test data and must be recorded (user decision, 2026-11-05).
- Record each account per feature in two places:
  - `workspace/<feature-id>/02-test-data.md`: label, full name, email, purpose, used by, cleanup. No password.
  - `workspace/<feature-id>/test-data.local.md`: the password (git-ignored by the rule `workspace/**/*.local.md` in `.gitignore`).
- Reports say "the account in test-data.local.md". Never put a password in reports, evidence, tracked files, tickets or chat.
- The browser tool echoes typed values in its own output: take screenshots only before typing or after a reload, and no snapshot while values are typed in.
- Record the account right after registration passes and before login cases use it.
