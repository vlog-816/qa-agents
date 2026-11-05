# Commits

User decision, 2026-11-05: the user commits by themselves.

- Never run `git commit`, `git push`, `git add`, `git stash`, `git reset` or `git checkout --` on my own. Read-only git commands (`git status`, `git diff`, `git log`, `git check-ignore`) are fine.
- When a milestone is finished, or many changes have piled up, ask the user if they want to commit. Explain in plain words first (see `explain-before-approval.md`): what changed and why a commit now is useful.
- If the user says yes, write the commit message in the chat as a fenced block, so the user can copy it, and list the files to stage. Format: short text only, one subject line of at most 50 characters in the imperative mood, no body and no bullet points unless the user asks for more (user decision, 2026-11-05). Mention files that must not be committed (for example `*.local.md`, evidence).
- Never put a password, token or real personal data in a commit message.
