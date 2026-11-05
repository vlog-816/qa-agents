# Work log

Newest entry first: date, done, decisions, open items. No secrets or real data. Older detail is in git history.

## Current state (updated 2026-11-05)

- **Phase:** Phase 1 closed (scoped). Workspace is empty and ready for a new feature (send a URL and a feature ID).
- **Agents:** `data-guard` (only when asked), `manual-tester`, `automation-tester`. BA work is done by the main session. Not created: `ba-analyst`, `test-reviewer`.
- **Language:** `qa-profile.yaml` has `language: en`; project files are English only. Chat replies are English, then Vietnamese.
- **Rules** (`.claude/rules/`): `commits.md` (the user commits; I write one short message), `explain-before-approval.md` (plain-words explanation before any prompt), `file-access.md`, `test-accounts.md`, `web-steps.md`.
- **Web steps:** the main session runs `npx --no-install --prefix tools/playwright-cli playwright-cli <command>` (one command per call; `--headed` to watch). Details: `docs/test-environment.md`.
- **Test accounts:** `workspace/<feature-id>/02-test-data.md` (no password) plus the git-ignored `test-data.local.md` (password).
- **Profile checks:** the host must be in `allowed_hosts` before any run; gates stay `required`.
- **Key files:** `CLAUDE.md`, `qa-profile.yaml`, `README.md`, `docs/test-environment.md`, `docs/backlog/BACKLOG.md`.

## Open items

- `qa-profile.yaml` still says `no_production_hosts: true`; revisit when a production host exists.
- `playwright.config.ts` and `tests/helpers/host-guard.ts` default to `demowebshop.tricentis.com`; change per feature.
- The install steps in `README.md` (Getting started, step 4) were written from the docs and not run.
- Not committed yet (the user commits): `README.md`, `workspace/WORKLOG.md`, `.claude/rules/commits.md`.

## 2026-11-05: First spec check: manual-tester

- `skill-check spec manual-tester` (by reading): cases 1, 2, 4, 5 PASS; case 3 PARTIAL (clarifications gate not named). It also found two conflicts with newer rules; fixed in `manual-tester.md`: load testing now points to `performance-and-security-testing.md`; exploratory runs now follow `exploratory.md` (EXP folder, `FIND-###`); clarifications gate named. Verdicts and findings recorded in `docs/agent-tests/manual-tester.md` and `results.md`. Open: re-check after fixes; scratch-folder deletion (step 2.2) undecided; no dry run yet. Not committed.

## 2026-11-05: Agent tests (light)

- Read the `skill-test` folder of a public repo: it holds only `SKILL.md`; the nested folders are in `studio-tests/` (catalog, rubric, templates, 123 specs; MIT). Took the idea at our scale, own words: `docs/agent-tests/` with `README.md`, `template.md`, 4 specs (manual-tester, automation-tester, data-guard, exploratory-testing; 5 cases each, all NOT ASSESSED) and `results.md`; `skill-check` got a `spec <name>` mode (reads only; asks before writing). Nothing run yet. Not committed.

## 2026-11-05: Skill-check skill and two tester rules

- Read two public skills (team-qa, skill-test); no license, ideas only. New skill `.claude/skills/skill-check/SKILL.md` (8-check static checklist, verdicts COMPLIANT / WARNINGS / NON-COMPLIANT / NOT ASSESSED; a pass proves structure, not behavior). `manual-tester.md` and the report template now say: smoke first (stop and mark the rest Blocked if the basic flow fails) and a case that was not run is never counted as Passed. First review of our 5 files done in chat (read-only). Not committed.

## 2026-11-05: Performance and security testing allowed

- New rule `.claude/rules/performance-and-security-testing.md`: allowed on the user's own hosts (`localhost`, `assistant-qa-staging.vercel.app`) under an approved plan, one run per approval, stop conditions, no destructive actions; never on the public practice sites. `docs/test-environment.md` section 3 and BL-011 updated. No tool chosen or installed yet. Not committed.

## 2026-11-05: Ideas from three public testing pages

- Read three public agent prompts (Evidence Collector, Reality Checker, Workflow Optimizer); no license, no tools, nothing installed or copied. Took ideas in our own words: screenshot proves looks not behavior, zero findings is valid with stated scope, three window sizes (`exploratory-testing` skill); "Covered and not tested" section in `templates/execution-report.md`; evidence cross-check idea noted in BL-002. Not taken: default NEEDS WORK and grades, their scripts, fixed targets. Not committed.

## 2026-11-05: Exploratory skill

- New skill `.claude/skills/exploratory-testing/SKILL.md` (tours, input and navigation ideas, what to watch, how to judge, `FIND-###` format, stop rules; no `allowed-tools` line). `.claude/rules/exploratory.md` points to it. Not committed.

## 2026-11-05: Exploratory rule

- New rule `.claude/rules/exploratory.md`: exploring a URL stores everything in `workspace/exploratory/EXP-###/` (brief, session notes, report, evidence); the report lists `FIND-###` findings and the user decides what becomes a `BUG-###`. `CLAUDE.md` unchanged. Not committed.

## 2026-11-05: Cleanup and rules

- Cleared the workspace (DEMO-001 to DEMO-006, FEAT-001) and the old specs; kept `tests/helpers/host-guard.ts`. Everything earlier is in git history.
- Refreshed the docs (`README.md`, `CLAUDE.md` status, `docs/test-environment.md`, `BACKLOG.md`, both tester agents).
- Wrote the working rules above as project rule files and removed the old notes stored outside the project.
- The test credentials rule file is named `test-accounts.md` because `settings.json` blocks file names containing "credential".
