# QA Agents Starter

This repository is the foundation for an extensible AI testing team (BA, Manual Tester, Automation Tester, and more roles added over time). Phase 0 contains standards and the data policy only.

## Read first

1. `docs/data-policy.md` (mandatory before running any test)
2. `qa-profile.yaml` (team settings: language, data_class, hosts, framework, gates)
3. `templates/` (formats for requirements, test cases and execution reports)

## Rules for every session

- Before any test run, run the `data-guard` subagent in `pre-run` mode. Do not proceed on HOLD or BLOCK.
- Never access a host outside `data.allowed_hosts` in `qa-profile.yaml`. Never touch production.
- Never copy real personal data, passwords or tokens into any file, report, ticket or chat. Use masked values.
- If anything is unclear or uncertain, stop and ask. List it under "Open questions" instead of guessing.
- Write generated content in the language set by `language` in `qa-profile.yaml` (`vi`, `en` or `bilingual`). Keep keys, IDs and field names in English.
- Respect the gates in `qa-profile.yaml`: when a gate is `required`, stop and wait for human approval.
- Write results under `workspace/<feature-id>/`. Put evidence (screenshots, raw responses) only in `workspace/<feature-id>/evidence/`.
- Requirement sources go in `inbox/`.
- Feature IDs are Jira keys (for example `PROJ-123`); use `FEAT-###` only when there is no ticket.
- Never fill in `data.gate0_confirmations` yourself. Only a human does.
- When the user asks to improve the agents or to harden safety, read `docs/backlog/BACKLOG.md` and propose the relevant items. Never build or enable a backlog item without approval.
- At the end of each session, append an entry to `workspace/WORKLOG.md` (newest first: date, done, decisions, open items; no secrets).

## Current status

Phase 0.1 draft; host hooks are parked in the backlog. See `workspace/WORKLOG.md` for progress and open items. Roles not yet created: `ba-analyst`, `manual-tester`, `automation-tester`, `test-reviewer`.

## Team profile (always in context)

@qa-profile.yaml
