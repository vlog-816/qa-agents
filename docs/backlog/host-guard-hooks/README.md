# Host-guard hooks (BL-001)

**Status: written, NOT enabled.** Nothing in `.claude/` uses these files. Parked on 2026-11-03 at the user's request, to be proposed when the user wants to improve the agents or enforce `allowed_hosts` technically.

## What is here

| File | Purpose |
|---|---|
| `check-host.js` | PreToolUse hook. Denies hosts outside `data.allowed_hosts` (or inside `blocked_hosts`) for Bash, PowerShell and browser/MCP tools; asks for WebFetch/WebSearch; denies shell reads of `.env`, `secrets/` and credential files; fails closed if `qa-profile.yaml` cannot be read. |
| `limit-data-guard-writes.js` | PreToolUse hook. The `data-guard` subagent may only write `workspace/<id>/00-data-gate.md` and `data-guard-report.md`. |
| `tests/run.js` | 36 offline test cases. No network traffic. Run: `node docs/backlog/host-guard-hooks/tests/run.js` |
| `settings.proposed.json` | The `hooks` block and permission tweaks that would enable them (not active). |

## How far to trust it

- Written and tested by the same author (the AI). 36/36 passing shows the code matches the author's intent, not that it is safe.
- Never run live: it was not checked that the Claude desktop app (Code tab) runs project hooks, or what the workspace trust dialog does.
- Pattern-based, not a security boundary. It will not catch hosts hidden inside scripts or files, obfuscated commands, shell variables or redirects.
- Native Windows has no sandbox (WSL2 would be needed).
- Needs an independent review before it is relied on.

## How to enable (needs the user's approval)

1. Copy `check-host.js` (and optionally `limit-data-guard-writes.js`) to `.claude/hooks/`.
2. Merge the `hooks` block of `settings.proposed.json` into `.claude/settings.json` (a safety check refused the AI editing that file, so the user does it or allows it).
3. Accept the workspace trust dialog; check `/hooks` lists the hooks.
4. Live test: a command to a host not in `allowed_hosts` (for example `curl https://example.com`) must be denied; `demowebshop.tricentis.com` and `localhost` must still work.
5. If hooks do not fire in the desktop app, stop and record it in `workspace/WORKLOG.md`.

## Simpler alternative (about 20 lines)

A hook that only inspects `WebFetch` and browser MCP tools: take `tool_input.url`, and deny unless it contains a host from `allowed_hosts`. Leave shell commands to the approval prompt. Less coverage, much less code to trust.

## Facts checked in the official docs (2026-11-03)

PreToolUse input has `tool_name` and `tool_input`; exit code 2 or a JSON `permissionDecision` blocks; a matcher with `.` or `*` is a regex; shell-form hook commands use Git Bash on Windows; `${CLAUDE_PROJECT_DIR}` is available; settings-level hooks also run in subagents; hooks cannot override deny/ask rules; project hooks do not run until the trust dialog is accepted.
