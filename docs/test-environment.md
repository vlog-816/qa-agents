# Test environment notes

For testers (human or agent). Read with `docs/data-policy.md`. No real values belong in this file.

## 1. Test credentials

- Test cases refer to credentials only by the **name** of an environment variable (for example `QA_TEST_PASSWORD`, `QA_TEST_TOKEN`).
- A human sets the variable in their own shell before the run, for example in PowerShell: `$env:QA_TEST_PASSWORD = Read-Host -AsSecureString ...` or through the system user environment variables. Never put the value in a prompt, a file in this repo or chat.
- `.env`, `secrets/` and files with `credential` in the name are denied for reading by `.claude/settings.json`. Keep it that way.
- Use a dedicated, minimum-privilege test account (Gate 0 confirmation `test_account_confirmed`).

## 2. API specification

- Put the spec (OpenAPI file or a docs link in a short `.md` file) in `inbox/`.
- Cite it in `workspace/<feature-id>/01-requirements.md` and in each API test case (`api.spec_ref`).
- No spec, no API test plan: the tester stops and asks.

## 3. Request limits and risky actions

- A few requests per test case. No loops, no load or stress testing.
- Do not submit orders, payments, emails or other irreversible actions on a shared or public site unless the approved test plan lists them.
- Every network command goes through the approval prompt (`curl`, `Invoke-WebRequest`, `Invoke-RestMethod`).

## 4. Runs and evidence

- Reports: `workspace/<feature-id>/06-report-run-<n>.md`. The first run of DEMO-001 predates this rule and is `06-report.md` (treat it as run-1).
- Evidence: `workspace/<feature-id>/evidence/run-<n>/<TC-or-CH>-<seq>.<ext>`. Mandatory for Failed and Blocked results.
- Mask personal-looking values before saving. If masking is not possible, do not save the file.

## 5. Updating skills

Skills live in `.claude/skills/` (installed with `npx skills add ... --agent claude-code --copy`). `skills-lock.json` records each skill's source and hash; keep it. `npx skills update` is not verified to refresh `.claude/skills/` (the lock file restores into `.agents/skills/` only), so update with `add`:

1. Re-run the install command for the skill:
   ```powershell
   npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli --agent claude-code --copy
   npx skills add https://github.com/currents-dev/playwright-best-practices-skill --skill playwright-best-practices --agent claude-code --copy
   ```
2. Check `.claude/skills/playwright-cli/SKILL.md`: the `allowed-tools` line must not be there (it pre-approves commands and skips our approval prompts). Remove it if it came back.
3. Review `git diff .claude/skills` before using the new version.
4. If `.agents/` was recreated, delete it: `Remove-Item -Recurse -Force .agents`.
5. Rules: never use `npx skills use` (it runs unreviewed remote text as instructions). Never wire a skill into an agent, or install its tool program, without the user's approval.

### Local install of `playwright-cli`

- It is installed in this project, not globally: `npm install --save-dev @playwright/cli@latest` (`package.json`, `package-lock.json`; `node_modules/` is git-ignored). Restore on a new machine with `npm install`.
- Call form: `npx --no-install playwright-cli <command>` (not the bare `playwright-cli`, which is not on the PATH).
- Update: `npm update @playwright/cli`, then review the `package-lock.json` diff and check the skill header (step 2 above).
- Permission mode (tested 2026-11-03): a single `npx --no-install playwright-cli --version` prompted in both Manual and Auto mode. An earlier run with no prompt was a compound command (`a && b && c`) run right after the rules were added mid-session; the exact cause is not proven. So: run one command per call, prefer Manual mode for test runs, and never use Accept edits or Bypass permissions (not tested; Bypass skips ask rules).
- Browser: use the installed Chrome (`open <url> --browser=chrome`). The default profile is in-memory, so no personal sign-ins are used; never use `--persistent`, `--profile` or `attach`. Close it after use (`close`).
- `playwright-cli` writes page snapshots to `.playwright-cli/` in the project root (git-ignored). Copy what is needed into `workspace/<feature-id>/evidence/run-<n>/`, then delete the folder.
- The tool prints a warning that the skill does not match the tool version and suggests `playwright-cli install --skills`. Do not run that without the user's approval: it rewrites the skill and can bring back the `allowed-tools` line. Follow section 5 to update.
- (Older note) The browser program is a separate large download and is not installed yet; ask the user first.

## 6. Not covered yet

Cross-browser, accessibility, responsive layout, mobile and performance checks. See `docs/backlog/BACKLOG.md`.
