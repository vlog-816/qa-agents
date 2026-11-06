# QA Agents Starter

A starter kit for an extensible AI testing team. Three agents exist today: **Data Guard** (optional data check), **Manual Tester** (test plan, test cases, execution, report) and **Automation Tester** (Playwright scripts in TypeScript). BA work is done by the main Claude session; a Test Reviewer agent and a BA agent are parked in `docs/backlog/BACKLOG.md`.

> **Status:** Phase 1 closed (scoped). The workflow was run end to end on demo and staging sites; those results were cleared on 2026-11-05 and remain in git history only. Not reviewed by security or legal. Do not use with real data.

## Structure

```
qa-agents/
├── README.md
├── CLAUDE.md                     context that Claude Code reads automatically (shared rules)
├── HANDOFF.md                    handoff notes for a new session
├── qa-profile.yaml               team profile (language, data_class, hosts, framework, gates)
├── .gitignore                    keeps evidence, inbox, secrets and *.local.md out of git
├── package.json, package-lock.json, playwright.config.ts   Playwright test runner setup
├── skills-lock.json              record of installed skills
├── .claude/
│   ├── settings.json             permissions (allow / ask / deny)
│   ├── agents/                   data-guard.md, manual-tester.md, automation-tester.md
│   ├── rules/                    working rules loaded every session
│   │   ├── commits.md            the user commits; the assistant only writes the message
│   │   ├── explain-before-approval.md   plain-words explanation before any approval prompt
│   │   ├── file-access.md        read/create files in the project freely; ask for the rest
│   │   ├── test-accounts.md      where test accounts and passwords are recorded
│   │   └── web-steps.md          how the main session runs playwright-cli
│   └── skills/                   playwright-cli and playwright-best-practices
├── docs/
│   ├── data-policy.md            data policy and Gate 0
│   ├── test-environment.md       credentials, runs, evidence, tooling
│   ├── agent-tests/              spec checks for our agents and skills
│   └── backlog/                  parked ideas (BACKLOG.md) and parked host-guard hooks
├── templates/                    requirement, test-plan, test-case, exploration-session,
│                                 execution-report, traceability, automation-review
├── tests/helpers/                shared Playwright helpers (host-guard.ts)
├── test-data/                    shared test data: accounts, reusable fake inputs, typed values
├── tools/playwright-cli/         local install of playwright-cli
├── inbox/                        drop documents and exported tickets here (git-ignored)
└── workspace/                    results per feature, plus WORKLOG.md
```

## How a feature runs

1. **Input:** give the main session a URL or put a requirements file in `inbox/`, plus a feature ID (a Jira key such as `PROJ-123`; `FEAT-###` only when there is no ticket).
2. **Host check:** the host must be in `data.allowed_hosts` in `qa-profile.yaml`. If it is not, work stops and you add it yourself.
3. **Requirements** (`workspace/<feature-id>/01-requirements.md`): drafted from the page or files. **Gate: you approve.**
4. **Test plan and test cases** (`03-test-plan.md`, `04-test-cases.md`): written by the Manual Tester. **Gate: you approve.**
5. **Run:** the cases are executed against allowed hosts (the main session or the Manual Tester runs `playwright-cli`). Evidence goes only to `workspace/<feature-id>/evidence/` (git-ignored).
6. **Report** (`06-report-run-<n>.md`) and the traceability matrix. **Gate: you approve the results.**
7. **Automation (optional):** the Automation Tester picks approved, Passed cases, writes Playwright scripts, and stops at the selection and code-review gates. Nothing is installed or run without your approval.
8. **Data Guard** runs only when you ask.

Test accounts: the sheet `workspace/<feature-id>/02-test-data.md` holds the label, name and email (no password); the password is only in the git-ignored `workspace/<feature-id>/test-data.local.md`.

## Getting started

1. Open this folder with "Choose a folder to work in" in the Code tab.
2. Open `qa-profile.yaml`: check `team`, `language` (now `en`), `allowed_hosts` and `blocked_hosts`. It currently declares `no_production_hosts: true`; set it to `false` and list the real production host in `blocked_hosts` as soon as one exists. Keep `data_class: synthetic` until security allows otherwise.
3. Read `docs/data-policy.md` and complete the Gate 0 checklist by filling in `data.gate0_confirmations` yourself. Send section 10 to security or legal.
4. Install the tools on a new machine: `npm ci` in the project root, `npm install --prefix tools/playwright-cli`, then `npx playwright install chromium` if the browser is missing.
5. Start a feature, for example: "Test the login page of https://staging.example.com as PROJ-123." Optionally try Data Guard first: "Use the data-guard subagent in pre-run mode for feature PROJ-123."

## Working rules

Shared rules are in `CLAUDE.md`; personal working rules are in `.claude/rules/` (see the tree above). In short: files are English only; you commit by yourself (the assistant asks and writes the commit message); every approval prompt is preceded by a plain-words explanation; files inside the project can be read and created freely, anything outside the project needs your yes.

## Checks to repeat after changes

The permission rules in `.claude/settings.json` (for example `eval` denied, `tab-new` asks) were exercised during pilot runs on the Windows desktop app. Re-test them after any edit to the file, and cross-check the syntax with `code.claude.com/docs`:

- The `permissions` syntax in `.claude/settings.json`.
- The `tools` field (comma-separated list) in the agent file header.
- How the desktop app (Code tab) loads `.claude/agents/`, `.claude/rules/` and `.claude/settings.json`.

## Known limits

- A `deny` rule on `Read` **does not block** `cat .env` in Bash (per the permissions documentation). A sandbox or hook is needed for real enforcement.
- `curl` is set to `ask`, so every API call will ask for approval. This suits the pilot phase and can be relaxed later.
- No hook enforces `allowed_hosts` yet. A parked, unreviewed version is in `docs/backlog/host-guard-hooks/` (see `docs/backlog/BACKLOG.md`).

## Still to be determined

- Company policy on AI tools and the account plan to use for sensitive data (pending security/legal).
- Evidence retention period, success metrics, cost limits, CI system, company MCP policy.
- Which test-management tool receives exports later (Google Sheets, TestRail, Xray).

Decided: Jira Cloud (read-only), GitHub, Playwright with TypeScript, pilot app restful-booker-platform on localhost, platform order API, then web, then mobile.
