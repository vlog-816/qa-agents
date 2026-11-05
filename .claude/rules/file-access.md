# File access

- Inside `D:\Source\qa-agents`, read and create files without asking (user decision, 2026-11-05).
- Still ask first before: deleting or overwriting a file; changing `qa-profile.yaml`, `.claude/settings.json` or `CLAUDE.md`; touching any path outside the project (name the path and the action, wait for a yes each time).
- Save working rules and notes in project files (for example `.claude/rules/`), not outside the project, unless the user says yes first.
