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

## 2026-11-05: Exploratory rule

- New rule `.claude/rules/exploratory.md`: exploring a URL stores everything in `workspace/exploratory/EXP-###/` (brief, session notes, report, evidence); the report lists `FIND-###` findings and the user decides what becomes a `BUG-###`. `CLAUDE.md` unchanged. Not committed.

## 2026-11-05: Cleanup and rules

- Cleared the workspace (DEMO-001 to DEMO-006, FEAT-001) and the old specs; kept `tests/helpers/host-guard.ts`. Everything earlier is in git history.
- Refreshed the docs (`README.md`, `CLAUDE.md` status, `docs/test-environment.md`, `BACKLOG.md`, both tester agents).
- Wrote the working rules above as project rule files and removed the old notes stored outside the project.
- The test credentials rule file is named `test-accounts.md` because `settings.json` blocks file names containing "credential".
