# File access

- Inside `D:\Source\qa-agents`, read and create files without asking (user decision, 2026-11-05).
- Still ask first before: deleting or overwriting a file; changing `qa-profile.yaml`, `.claude/settings.json` or `CLAUDE.md`; touching any path outside the project (name the path and the action, wait for a yes each time).
- If a file I want to create already exists, stop and ask with two options: (1) create a new file with the next number (for example `-2`, `-3`, or the next `EXP-###` or run number), (2) overwrite it. Recommend (1), because it keeps history. Never overwrite without a yes. Adding to a living log such as `workspace/WORKLOG.md` is an edit, not a new file, so it is fine.
- Save working rules and notes in project files (for example `.claude/rules/`), not outside the project, unless the user says yes first.
