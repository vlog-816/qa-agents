# QA Agents Starter

This repository is the foundation for an extensible AI testing team (BA, Manual Tester, Automation Tester, and more roles added over time). Phase 0 contains standards and the data policy only.

## Read first

1. `docs/data-policy.md` (mandatory before running any test)
2. `qa-profile.yaml` (team settings: language, data_class, hosts, framework, gates)
3. `templates/` (formats for requirements, test plans, test cases, execution reports and the traceability matrix)

## Rules for every session

- Data Guard is optional (decision 2026-11-05): run the `data-guard` subagent only when the user asks. Before any test run, just check that the host is in `data.allowed_hosts`; otherwise stop and ask. Create synthetic test data freely.
- Never access a host outside `data.allowed_hosts` in `qa-profile.yaml`. 
- Never copy real personal data, passwords or tokens into any file, report, ticket or chat. Use masked values.
- If anything is unclear or uncertain, stop and ask. List it under "Open questions" instead of guessing.
- Write generated content in the language set by `language` in `qa-profile.yaml` (`vi`, `en` or `bilingual`). Keep keys, IDs and field names in English.
- Respect the gates in `qa-profile.yaml`: when a gate is `required`, stop and wait for human approval.
- Write results under `workspace/<feature-id>/`. Put evidence (screenshots, raw responses) only in `workspace/<feature-id>/evidence/`.
- Requirement sources go in `inbox/`.
- Feature IDs are Jira keys (for example `PROJ-123`); use `FEAT-###` only when there is no ticket.
- Never fill in `data.gate0_confirmations` yourself. Only a human does.
- When the user asks to improve the agents or to harden safety, read `docs/backlog/BACKLOG.md` and propose the relevant items. Never build or enable a backlog item without approval.
- After each completed milestone (and when the user says to save), update the "Current state" block and add a short entry to `workspace/WORKLOG.md` (newest first: date, done, decisions, open items; no secrets). Do not wait for the session to end.
- At the start of each session, read the "Current state" block of `workspace/WORKLOG.md` (top of the file only) and continue from its open items.

## Current status

Phase 1 closed (scoped). Agents: `data-guard`, `manual-tester`, `automation-tester` (first used 2026-11-04 for DEMO-002; see BL-012). Not created yet: `ba-analyst`, `test-reviewer`. Host hooks and other ideas are parked in `docs/backlog/BACKLOG.md`. See `workspace/WORKLOG.md` for progress and open items.

## Team profile (always in context)

@qa-profile.yaml
