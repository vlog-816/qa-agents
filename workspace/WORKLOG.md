# Work log

Newest entry first. Each entry: date, done, decisions, open items. Never write secrets or real data here.

## Current state (updated 2026-11-05)

- **Phase:** Phase 1 closed (scoped). The workspace was cleared on 2026-11-05 at the user's request: all feature folders (DEMO-001 to DEMO-006, FEAT-001) and the old work log were deleted; earlier committed versions remain in git history, DEMO-006 was never committed and is gone.
- **Agents that exist:** `data-guard` (optional, only when the user asks), `manual-tester`, `automation-tester`. BA work is done by the main session. Not created yet: `ba-analyst`, `test-reviewer`.
- **Web steps:** the main session can run `playwright-cli` itself with the allowed form `npx --no-install --prefix tools/playwright-cli playwright-cli <command>` (one command per call; `--headed` on `open` when the user wants to watch). Details: `docs/test-environment.md`.
- **Profile:** `qa-profile.yaml` is the user's file; check `allowed_hosts` before any run. Gates stay `required`.
- **Test credentials:** synthetic staging credentials are recorded per feature in `workspace/<feature-id>/test-data.local.md` (git-ignored by `workspace/**/*.local.md`); the tracked `02-test-data.md` holds account labels and emails but never a password.
- **Outside `workspace/`:** the old specs `tests/DEMO-002`, `tests/DEMO-004`, `tests/DEMO-005` and `test-results/` were deleted on 2026-11-05 (committed earlier, so still in git history). Kept: `tests/helpers/` (page objects and `host-guard.ts`, the allowed-hosts barrier), which new specs can reuse.
- **Key files to read:** `CLAUDE.md`, `qa-profile.yaml`, `docs/backlog/BACKLOG.md`, `docs/test-environment.md`.

## 2026-11-05: Project files are English only

- At the user's request I scanned all project files for Vietnamese: none found (the first search wrongly flagged arrow and box-drawing symbols). With the user's yes, `qa-profile.yaml` now has `language: en` (was `bilingual`), so new reports, plans and cases are English only; chat replies stay English then Vietnamese (global rule). I also broke my own new rule once (ran a command without the plain-words explanation); I explained afterwards and did not repeat the command. Nothing committed.

## 2026-11-05: Rule: explain before asking for approval

- New rule `.claude/rules/explain-before-approval.md` (user request): before any approval prompt, plan approval, choice question or gate, explain in 2 to 3 simple "like I am 5" sentences what I did, what I want to do and what changes if accepted (English, then Vietnamese). Nothing committed.

## 2026-11-05: Working rules written as project rules

- At the user's request the working rules now live in `.claude/rules/` (`file-access.md`, `test-accounts.md`, `web-steps.md`; the name `test-credentials.md` is blocked by the `Read(./**/*credential*)` deny rule in `.claude/settings.json`, so the file is called `test-accounts.md`). `CLAUDE.md`, `qa-profile.yaml` and `.claude/settings.json` unchanged. Three earlier memory notes outside the project (`C:\Users\minhv\.claude\projects\D--Source-qa-agents\memory\`) were deleted at the user's yes; the rules live only in `.claude/rules/` now. Nothing committed.

## 2026-11-05: Repo refactor after the clearing

- At the user's request (docs, agent files, demo page objects): refreshed status text in `CLAUDE.md` and `README.md` (automation-tester listed, tree updated); `docs/test-environment.md` (test-account convention, main session may run `playwright-cli` itself with the allowed call form, removed obsolete DEMO-001 remarks and old notes); `manual-tester.md` and `automation-tester.md` (record accounts in `02-test-data.md` + `test-data.local.md`, neutral example IDs; the call form was already correct); `BACKLOG.md` (links to deleted workspace files replaced by git-history notes, BL-005 dropped); deleted `tests/helpers/books-page.ts`, `login-page.ts`, `email-login-page.ts`. Kept `host-guard.ts` and `playwright.config.ts` (default host still `demowebshop.tricentis.com`; change per feature). No rule changed. The user also ticked "Something else" with no text: still unknown. Nothing committed.

## 2026-11-05: Workspace cleared

- Deleted `workspace/DEMO-001` to `DEMO-006` and `workspace/FEAT-001`, reset this log, and removed `.playwright-cli/`. Kept: agents, templates, docs, rules, `qa-profile.yaml`, `.gitignore` (including the `*.local.md` rule), `tests/`, `tools/`. Nothing committed.
