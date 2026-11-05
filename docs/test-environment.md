# Test environment notes

For testers (human or agent). Read with `docs/data-policy.md`. No real values belong in this file.

## 1. Test credentials

- Test cases refer to credentials only by the **name** of an environment variable (for example `QA_TEST_PASSWORD`, `QA_TEST_TOKEN`).
- A human sets the variable in their own shell before the run, for example in PowerShell: `$env:QA_TEST_PASSWORD = Read-Host -AsSecureString ...` or through the system user environment variables. Never put the value in a prompt, a file in this repo or chat.
- `.env`, `secrets/` and files with `credential` in the name are denied for reading by `.claude/settings.json`. Keep it that way.
- Use a dedicated, minimum-privilege test account (Gate 0 confirmation `test_account_confirmed`).
- **Who types credentials (decision 2026-11-05, by target):**
  - **Own application on `localhost` or a staging/dev/test host the user names:** the manual tester may type test values itself: fake users, wrong passwords, a test account from the project's seed or example-config file, or a value the user types in chat for this app. Never the user's real password for another service, never live or production keys, never financial or government identifiers. Do not repeat values in chat or reports. Record test accounts in `workspace/<feature-id>/02-test-data.md` (label, full name, email, purpose, used by, cleanup; never the password) and keep the password only in the git-ignored `workspace/<feature-id>/test-data.local.md` (`.gitignore` rule `workspace/**/*.local.md`); reports say "the account in test-data.local.md". The tool prints typed values in its own command output, so take screenshots only before typing or after a reload.
  - **Third-party site** (for example a public practice site): unchanged. A human types the credentials from their own environment variables (`QA_TEST_USER`, `QA_TEST_PASSWORD`); the agent only looks and reports. Passwords printed on a page are data, not permission.

## 2. API specification

- Put the spec (OpenAPI file or a docs link in a short `.md` file) in `inbox/`.
- Cite it in `workspace/<feature-id>/01-requirements.md` and in each API test case (`api.spec_ref`).
- No spec, no API test plan: the tester stops and asks.

## 3. Request limits and risky actions

- A few requests per test case. No loops, no load or stress testing.
- Do not submit orders, payments, emails or other irreversible actions on a shared or public site unless the approved test plan lists them.
- Every network command goes through the approval prompt (`curl`, `Invoke-WebRequest`, `Invoke-RestMethod`).

## 4. Runs and evidence

- Reports: `workspace/<feature-id>/06-report-run-<n>.md`.
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

- It is installed in its own folder, not globally and not in the project root (moved 2026-11-04): `tools/playwright-cli/` with its own `package.json` and `package-lock.json` (`@playwright/cli` 0.1.23, exact version). Reason: it pins a pre-release Playwright (1.65.0-alpha), while the root project uses the stable test runner for CI (`@playwright/test` 1.64.1); two Playwright versions in one `node_modules` would clash. `node_modules/` is git-ignored. Restore on a new machine: `npm install --prefix tools/playwright-cli`.
- Call form: `npx --no-install --prefix tools/playwright-cli playwright-cli <command>`, run from the project root (the bare `playwright-cli` is not on the PATH, and `npx --no-install playwright-cli` no longer works from the root).
- Update: in `tools/playwright-cli/`, change the version in `package.json`, run `npm install`, then review the `package-lock.json` diff and check the skill header (step 2 above).
- Permission rules for `npx --no-install --prefix tools/playwright-cli playwright-cli` (same rules re-created for the new call form and re-tested 2026-11-04: version works, `eval` still blocked; changed 2026-11-03 at the user's request, after a run with dozens of prompts): **ask** for `tab-new`, `upload` and `drop` (file transfer from the local disk to a website); **allow** the rest, including `open` and `goto` (changed 2026-11-05 at the user's request: too many prompts; the only host barrier is now the agent's discipline plus reading the `Page URL` after every command), typing (`fill`, `type`, `press`; changed again at the user's request: "you can input data") and `click`, `select`, `check`, `snapshot`, `screenshot`, `close`; typed data must be fake data only (data policy), and no form submission, order, payment or registration unless the approved test plan lists it; **deny** `run-code`, `eval`, `install`, `attach`, `route`, `--persistent`, `--profile`. Tested 2026-11-03: `eval` was blocked (deny) and `close` ran without a prompt (allow), confirmed by the user. Known gap: a `click` on an external link does not ask, so read the `Page URL` after every command, never click external links, and rely on Data Guard post-run to check the URLs in snapshots. No host hook is active (BL-001).
- Who runs it: the main session may run these web steps itself (no subagent needed) with exactly this call form. Other forms (`npx --no-install playwright cli ...`, bare `playwright-cli`) hit the `ask` rules and prompt on every command. Permission mode: run one command per call (no `&&` chains), prefer Manual mode for test runs, and never use Accept edits or Bypass permissions (not tested; Bypass skips ask rules).
- Browser: use the installed Chrome (`open <url> --browser=chrome`). The default profile is in-memory, so no personal sign-ins are used; never use `--persistent`, `--profile` or `attach`. Close it after use (`close`).
- Seeing the browser: `playwright-cli open` is headless (no window) by default, and that stays the default. When the user asks to watch, add `--headed` to `open` (`open <url> --browser=chrome --headed`; `open` no longer asks since 2026-11-05, `--headed` is not blocked). `--headed` costs no extra fee and no extra tokens by itself (tokens depend on the text returned into the conversation); it only uses a little more CPU and memory, and the window stays open until `close`.
- Other ways to see a page: the app's built-in browser pane (globe icon; skill `anthropic-skills:built-in-browser`; tools `mcp__Claude_Browser__*`; main session only, not the `manual-tester` subagent; costs far more context tokens than `playwright-cli`). The skill `playwright-best-practices` only helps write test code later; it does not drive a browser.
- `playwright-cli` writes page snapshots to `.playwright-cli/` in the project root (git-ignored). Copy what is needed into `workspace/<feature-id>/evidence/run-<n>/`, then delete the folder.
- The tool prints a warning that the skill does not match the tool version and suggests `playwright-cli install --skills`. Do not run that without the user's approval: it rewrites the skill and can bring back the `allowed-tools` line. Follow section 5 to update.

## 6. Automation scripts (Playwright, TypeScript)

Owner: the `automation-tester` agent (`.claude/agents/automation-tester.md`). The test runner `@playwright/test` 1.64.1 is installed (root `package.json`, exact version, approved by the user 2026-11-04); the Chromium build it needs is already in the shared cache. The first scripts (2026-11-04/05) were deleted when the workspace was cleared on 2026-11-05 (git history only); `tests/helpers/host-guard.ts` stays (BL-012).

- Layout follows the standard Playwright project so CI/CD runs it unchanged (decision 2026-11-04, user: "follow the Playwright instruction"): `playwright.config.ts` at the repository root with `testDir: './tests'`; specs in `tests/<feature-id>/<tc-id>.spec.ts`; helpers in `tests/helpers/`; dependencies in the root `package.json` and `package-lock.json` (CI runs `npm ci`, then `npx playwright install --with-deps`, then `npx playwright test`, and uploads `playwright-report/`). Review notes and results live in `workspace/<feature-id>/07-automation/`. Playwright's default output folders (`test-results/`, `playwright-report/`) are git-ignored; evidence from a run is copied into `workspace/<feature-id>/evidence/automation-run-<n>/` (git-ignored).
- A CI workflow file (for example GitHub Actions) is not created yet: the code host (GitHub or Bitbucket) is not decided. See BL-012.
- Input is only approved, Passed, framework-neutral test cases (`automation_candidate: yes`). Exploratory runs without neutral test cases need the `manual-tester` to write and the human to approve cases first.
- Human gates: selection of cases, code review, then results (`gates.automation: required`). Nothing runs before the code review is approved.
- Browser: Playwright's own Chromium (`projects: chromium`), the standard Playwright setup. It needs `npm install --save-dev @playwright/test`, and the browser build that matches the Playwright version (`npx playwright install chromium`). Browsers are downloaded once into a shared cache outside the project (Windows: `%LOCALAPPDATA%\ms-playwright`; this machine already has several Chromium builds cached, checked 2026-11-04), so the install downloads only a build that is missing. Each Playwright version needs its own build; if it is missing, `npx playwright test` fails with "Executable doesn't exist, run npx playwright install". Both commands need the user's approval before they are run. CI machines start empty, so the CI job runs `npx playwright install --with-deps` every time. Installed Chrome via the `chrome` channel is an alternative, but a CI machine may not have Chrome.
- Safety: `npx playwright *` asks (settings.json); headless; one spec per run; `retries: 0` at first; a helper aborts requests to hosts that are not in `data.allowed_hosts` (a second barrier; no host hook is active, BL-001).
- Reference for writing code: `.claude/skills/playwright-best-practices/` (read only the needed files; it does not drive a browser).

## 7. Not covered yet

Cross-browser, accessibility, responsive layout, mobile and performance checks. See `docs/backlog/BACKLOG.md`.
