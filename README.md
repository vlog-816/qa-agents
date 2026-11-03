# QA Agents Starter (Phase 0, draft 0.1)

A starter kit for an extensible AI testing team: BA, Manual Tester, Automation Tester and additional roles will be added gradually. This version contains **only the standardized foundation and the data policy**. Only the Data Guard and Manual Tester agents exist. BA work is done by the main session; Test Reviewer and Automation agents do not exist yet (see `docs/backlog/BACKLOG.md`).

> **Status:** Phase 1 closed (scoped). Run once end to end on a public demo site (DEMO-001). Not reviewed by security or legal. Do not use with real data.

## Structure

```
qa-agents/
├── README.md
├── CLAUDE.md                  context that Claude Code reads automatically
├── qa-profile.yaml            team profile (language, data_class, hosts, framework, gates)
├── .gitignore                 keeps evidence, inbox and secrets out of git
├── docs/
│   └── data-policy.md         data policy and Gate 0
├── .claude/
│   ├── settings.json          sample permissions (deny/ask)
│   └── agents/
│       ├── data-guard.md      data gatekeeper agent
│       └── manual-tester.md   manual tester agent (test plan, test cases, report)
├── templates/
│   ├── requirement.md         standard requirement template (multiple sources)
│   ├── test-case.md           framework-neutral test case template
│   ├── test-plan.md           test plan template
│   ├── traceability.md        traceability matrix (REQ to TC to result)
│   └── execution-report.md    execution report template
├── docs/backlog/              parked ideas (BACKLOG.md) and parked host-guard hooks
├── inbox/                     drop documents and exported tickets here (gitignored)
└── workspace/                 results per feature
```

## Getting started

1. Open this folder with "Choose a folder to work in" in the Code tab.
2. Open `qa-profile.yaml`: fill in `team`, `language`, `allowed_hosts` and `blocked_hosts` (replace the placeholder with the real production host). Keep `data_class: synthetic` until security allows otherwise.
3. Read `docs/data-policy.md` and complete the Gate 0 checklist by filling in `data.gate0_confirmations` yourself. Send section 10 to security or legal.
4. Try Data Guard in pre-run mode, for example: "Use the data-guard subagent in pre-run mode for feature PILOT-001." Expect HOLD until step 2 and 3 are done.

## Cross-check with the official documentation before use

This kit was written from documentation and community guides and has not been tested on a real machine. Cross-check these points with `code.claude.com/docs`:

- The `permissions` syntax in `.claude/settings.json`.
- The `tools` field (comma-separated list) in the agent file header.
- How the desktop app (Code tab) loads `.claude/agents/` and `.claude/settings.json`.

## Known limits

- A `deny` rule on `Read` **does not block** `cat .env` in Bash (per the permissions documentation). A sandbox or hook is needed for real enforcement.
- `curl` is set to `ask`, so every API call will ask for approval. This suits the pilot phase and can be relaxed later.
- No hook enforces `allowed_hosts` yet. A parked, unreviewed version is in `docs/backlog/host-guard-hooks/` (see `docs/backlog/BACKLOG.md`).

## Still to be determined

- Company policy on AI tools and the account plan to use for sensitive data (pending security/legal).
- Evidence retention period, success metrics, cost limits, CI system, company MCP policy.
- Which test-management tool receives exports later (Google Sheets, TestRail, Xray).

Decided: Jira Cloud (read-only), GitHub, Playwright with TypeScript, pilot app restful-booker-platform on localhost, platform order API, then web, then mobile.
