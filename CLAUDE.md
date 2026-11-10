# QA Agents Starter

Foundation for an AI testing team (BA, Manual Tester, Automation Tester, more roles later).

## Read first

1. `docs/data-policy.md` (before any test run)
2. `qa-profile.yaml` (language, data_class, hosts, framework, gates)
3. `templates/` (requirements, test plans, test cases, reports, traceability)
4. `docs/app/README.md` (what we know about the GMD|TMS app; the main project until release)

## Rules for every session

- **Hosts:** before any test run, check the host is in `data.allowed_hosts`; otherwise stop and ask. Never access any other host.
- **Data:** create synthetic test data freely. Never copy real personal data, passwords or tokens into any file, report, ticket or chat; use masked values.
- **Data Guard** is optional: run the `data-guard` subagent only when the user asks.
- **Unclear?** Stop and ask. List it under "Open questions"; do not guess.
- **Gates:** when a gate in `qa-profile.yaml` is `required`, wait for human approval. Only a human fills in `data.gate0_confirmations`.
- **Language:** write content in the `language` set in `qa-profile.yaml` (`vi`, `en` or `bilingual`). Keys, IDs and field names stay in English.
- **Files:** results go under `workspace/<feature-id>/`, evidence only in its `evidence/` folder, requirement sources in `inbox/`. Feature IDs are Jira keys (for example `PROJ-123`); use `FEAT-###` only without a ticket.
- **Backlog:** when asked to improve the agents or harden safety, read `docs/backlog/BACKLOG.md` and propose items. Never build or enable one without approval.
- **Worklog:** after each milestone (and when the user says to save), update the "Current state" block and add a short entry to `workspace/WORKLOG.md` (newest first; no secrets). At session start, read that block (top of the file only) and continue from its open items.

## Current status

Main project (user decision, 2026-11-10): the Gemadept TMS app (GMD|TMS, dev host `btc.tms-dev.gmd.zenlabs.gg`) until it is released. Knowledge lives in `docs/app/`.

Phase 1 closed (scoped). Agents: `data-guard`, `manual-tester`, `automation-tester` (see BL-012). Not created: `ba-analyst`, `test-reviewer`. Host hooks and other ideas are parked in `docs/backlog/BACKLOG.md`. The workspace was cleared on 2026-11-05 (earlier results are in git history only). Progress and open items: `workspace/WORKLOG.md`.

## Team profile (always in context)

@qa-profile.yaml
