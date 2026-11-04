# Work log

Newest entry first. Each entry: date, done, decisions, open items. Never write secrets or real data here. Older steps are condensed under "History"; full text is in git history.

## Current state (updated 2026-11-03)

- **Phase:** Phase 1 closed (scoped). DEMO-002 (Books page listing controls) run-2 done, all gates approved. Next options: test a new URL (web), test an API (BL-009), build `test-reviewer` (BL-002).
- **Agents that exist:** `data-guard`, `manual-tester`, `automation-tester` (first used 2026-11-04: 4 Playwright specs for DEMO-002 written, reviewed, run and approved; BL-012 in progress). BA work is done by the main session. Web steps: `manual-tester` runs them through the `playwright-cli` skill (Bash, installed Chrome, in-memory profile); see `docs/test-environment.md`.
- **Active safety:** Gate 0 (Data Guard pre-run and post-run) and the user's approval prompts. **No host-enforcing hook is active**; a written, unreviewed version is parked in `docs/backlog/host-guard-hooks/` (BL-001).
- **Profile:** `data_class: synthetic`; allowed hosts `localhost` and `demowebshop.tricentis.com`; `no_production_hosts: true`; all Gate 0 confirmations true, no waiver (BL-006 done 2026-11-03).
- **Still open:**
  - Revisit `no_production_hosts: true` as soon as a production host exists.
  - DEMO-001: new-session cart check inconclusive (BL-005); shipping estimate and checkout not run; F-01 and F-02 are reported defects, not fixed.
  - `qa-profile.yaml` has not been syntax-checked (no Python on this machine).
  - Security/legal approval for the Claude plan is pending (Pro personal plan: synthetic data only). Evidence retention, metrics, cost limits, CI undecided.
  - DEMO-002: Q2 (where 50.00 belongs), Q3 (order of Position and Created on), Q6 (message for an empty filter result; BUG-001, low) need the approver; reload and browser Back checks not done.
  - Web steps: headless by default, `--headed` on `open` when the user asks to watch; one command per call; `open`, `goto`, `tab-new`, `upload`, `drop` ask; `run-code`, `eval`, `install`, `attach` are denied; gap: a click on an external link does not ask (read the Page URL after each command).
  - Check `git status`; edits after the last commit may be uncommitted (DEMO-002 and the permission changes are not committed).
  - The user's account-level instructions (bilingual mode) were not visible in the Code session; a new session may load them.
- **Key files to read:** `CLAUDE.md`, `qa-profile.yaml`, `docs/backlog/BACKLOG.md`, `docs/test-environment.md`, `workspace/DEMO-001/06-report.md`, `workspace/DEMO-002/06-report-run-2.md`.

## 2026-11-04: DEMO-004 (login on the-internet.herokuapp.com) started

- User chose `https://the-internet.herokuapp.com/login` (third-party practice site) after FEAT-001 was blocked; the user edited `qa-profile.yaml` (host added to `allowed_hosts`, the Vercel host removed). Data Guard pre-run: **PASS**, no waivers (`workspace/DEMO-004/00-data-gate.md`, with credential conditions).
- Explained again: agents cannot type a password into a third-party site's form (even a published practice password); the human runs the credential step from their own environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`.
- Looked at the page read-only with `playwright-cli` (open, screenshot, close); the page prints its practice credentials, so the screenshot, the snapshot and `.playwright-cli/` were **deleted** (nothing kept in `evidence/`; the structure was read with the credential lines filtered out). Drafted `workspace/DEMO-004/01-requirements.md` (REQ-001 observed, REQ-002 happy case assumed, 3 open questions). **Waiting:** requirements gate (approver).
- Requirements gate approved ("Use assumptions, approve", 2026-11-04). Drafted `workspace/DEMO-004/03-test-plan.md` (scripted, one case, human-run credential step) and `workspace/DEMO-004/04-test-cases.md` (TC-001, credentials only as variable names, `review_status: draft`). **Waiting:** test plan gate and review of TC-001.

## 2026-11-04: DEMO-004 automation: code approved, waiting for the human run

- Test plan, TC-001 and the automation selection were approved ("Approve plan and case", "Approve selection"; accepted A1: no earlier Passed run, the human's first run is the first real execution; A2: the human runs the credential step and reports only non-secret details; per-spec host list; loose success check first).
- `automation-tester` wrote `tests/DEMO-004/tc-001.spec.ts` (reads `QA_TEST_USER` and `QA_TEST_PASSWORD`, fail-fast, no defaults, no logging, sanitized error wrapper, trace/screenshot/video off) and changed `tests/helpers/host-guard.ts` (per-spec `allowedHosts` option, default demowebshop; DEMO-002 specs unchanged). `--list`: 5 tests load. Code review gate approved ("Approve code"). No test has been run; the AI never types the credentials.
- **Waiting for the human:** set the two variables in their own PowerShell (`workspace/DEMO-004/07-automation/01-review.md`, "How the human runs it"), run `npx --no-install playwright test tests/DEMO-004/tc-001.spec.ts --project=chromium`, delete `test-results/` and `playwright-report/`, and report only pass/fail and the non-secret success text. Then: record the result, Data Guard post-run, results gate.
- DEMO-003 (demo shop login) and FEAT-001 (own Vercel app, Data Guard BLOCK) stay paused.

## 2026-11-04: FEAT-001 (login of the user's own app) BLOCKED by Data Guard

- The user asked for the manual tester to create fake accounts and type credentials itself, then chose their own app `https://vlog-ai-powered-assistant.vercel.app/login` ("own app, test only, no real users or data"); the user added the host to `data.allowed_hosts`. Explained: agents may type credentials only on `localhost` or a host whose name labels a test environment (staging, qa, dev, sandbox, preview); this bare `*.vercel.app` host has no label, so the human would create the account and run the login step.
- Data Guard pre-run for FEAT-001: **BLOCK** (`workspace/FEAT-001/00-data-gate.md`): a bare `*.vercel.app` address is normally a production alias, it cannot be told apart from production from files, a chat declaration cannot override a BLOCK. No browser command was run on this host. Ways to PASS: a clearly non-production host (separate Vercel test project, a distinct preview deployment, `localhost`), or file-based proof of the environment, re-confirm Gate 0 for FEAT-001, then a new pre-run. Waiting for the user's choice.
- DEMO-003 (demo shop login) stays paused; its requirements draft exists.

## 2026-11-04: DEMO-003 (login happy case) started

- Flow check requested by the user: URL `https://demowebshop.tricentis.com/login`, feature `DEMO-003`, "only the login page, happy case". Data Guard pre-run: PASS, no waivers; `00-data-gate.md` includes credential conditions C1 to C8.
- Safety decision: I do not create the account, type or store the password. The human creates a test account and keeps the credentials only as environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`; the human runs the script in their own terminal. (The user had asked me to create and save the account; told that I cannot.)
- Looked at the login page with `playwright-cli` (read-only: open, screenshot, close; evidence in `workspace/DEMO-003/evidence/run-1/`) and drafted `workspace/DEMO-003/01-requirements.md` (REQ-001 observed; REQ-002 happy case assumed, 4 open questions). **Waiting:** the approver for the requirements gate (answer Q1 to Q4 or accept the assumptions).
- Slip: part of this was started while the session was in plan mode (global `defaultMode` is now `plan`); I created one empty folder before noticing; no harm.

## 2026-11-04: automation-tester agent defined

- Created `.claude/agents/automation-tester.md` (Read, Grep, Glob, Write, Bash): preconditions (Data Guard PASS, results gate approved, approved Passed neutral test cases), then gates for selection and code review, then runs, then traceability and results gate. Scripts follow the standard Playwright layout (user decision: "follow the Playwright instruction", for CI/CD): `playwright.config.ts` at the root, specs in `tests/<feature-id>/`, helpers in `tests/helpers/`; reviews and results in `workspace/<feature-id>/07-automation/`; run evidence copied to `evidence/automation-run-<n>/`.
- Added `templates/automation-review.md`, `docs/test-environment.md` section 6, git-ignore lines for Playwright output, BL-012 in the backlog, and the agent in `CLAUDE.md` status.
- Decisions: script location = standard Playwright layout (corrected by the user; my first reading, `automation/playwright/`, was wrong); browser = Playwright's default, its own bundled Chromium (confirmed by the user 2026-11-04; the shared cache `%LOCALAPPDATA%\ms-playwright` already holds several Chromium builds); pilot input = DEMO-002 candidates; session depth = agent and docs only.
- BL-012 step 1 done (2026-11-04): `manual-tester` wrote 13 draft neutral test cases in `workspace/DEMO-002/04-test-cases.md` (TC-001 to TC-013; 12 automation candidates, TC-011 not: empty "25.00 - 50.00" range, BUG-001/Q6) and TC rows in `07-traceability.md`. No browser or network used. Q2 and Q3 are listed as not covered. All 13 cases were approved by the approver in chat on 2026-11-04 ("Approve all"; `review_status: approved`, reviewer and date filled). Next: the `automation-tester` selection gate (document only), then the user approves installing `@playwright/test`.
- `automation-tester` ran Step 0 and Step 1 (first use): `workspace/DEMO-002/07-automation/00-selection.md` (12 yes, TC-011 no; no browser, network or install used). User answers 2026-11-04: first batch of 4 specs (TC-002, TC-004, TC-007, TC-009); run-2 "observed Passed" accepted for the pilot; names compared case-insensitive; TC-010 Blocked-if-empty, TC-013 `page.goto`, third-party requests blocked: accepted. **Waiting:** explicit approval of the selection gate, then a separate approval to install `@playwright/test` and the matching Chromium build (check the shared cache first).
- Selection gate approved (2026-11-04, "Approve selection"): 12 cases, first batch TC-002, TC-004, TC-007, TC-009.
- Install decision (user chose "stable runner, tools separate"): `@playwright/cli` pins a pre-release Playwright (1.65.0-alpha), so it was moved from the root to `tools/playwright-cli/` (own `package.json`, exact 0.1.23); the root now has `@playwright/test` **1.64.1** (exact) for CI. New CLI call form: `npx --no-install --prefix tools/playwright-cli playwright-cli <command>`; the permission rules in `.claude/settings.json` were re-created for it. Checked: CLI `--version` works, `npx playwright --version` shows 1.64.1, `eval` is still denied. `npx playwright install --dry-run chromium` shows the needed builds (Chromium v1248, headless shell 1248, ffmpeg 1013, winldd 1007) are **all already in the shared cache**, so no browser download is needed. Not re-tested after the move: an `open` of a page (it should still ask).
- `automation-tester` Step 2 and 3 done (2026-11-04): `playwright.config.ts` (root), `tests/helpers/host-guard.ts`, `tests/helpers/books-page.ts`, `tests/DEMO-002/tc-002|tc-004|tc-007|tc-009.spec.ts`, review file `workspace/DEMO-002/07-automation/01-review.md`. Only check run: `npx --no-install playwright test --list` (4 tests loaded, no error); no test, browser or install command ran. Locators U1 to U6 are UNVERIFIED until the first run (CSS `.product-item`, `.actual-price`, `.old-price`, comboboxes found by a marker option, pager current-page marker, URL query values). **Waiting:** human approval of the code (code review gate); then Data Guard pre-run for the automation run, then the first headless run (each `npx playwright` command asks).
- Code review gate approved ("Approve code", 2026-11-04). Data Guard pre-run for automation run 1: PASS. **Automation run 1:** the 4 specs (TC-002, TC-004, TC-007, TC-009) were run headless one per command on `demowebshop.tricentis.com`: all 4 Passed on the first run (the guessed locators U1 to U6 worked; no failure evidence). Results in `workspace/DEMO-002/07-automation/run-1-results.md`; Script column filled in `07-traceability.md`; Data Guard post-run: PASS. **Automation results gate approved** ("Approve results", 2026-11-04; first batch of 4 accepted). Not measured: flakiness (one run only), number of blocked third-party requests (the `list` reporter does not show them).
- Next options: repeat the 4 specs on another day (flakiness), second batch of 8 specs, a JSON/HTML run to see blocked hosts, a CI workflow file (code host not decided), commit; BL-012 steps 2 to 4 are done, step 5 (CI) later.

## 2026-11-03: DEMO-002 (Books page listing controls) started

- New feature `DEMO-002` (same page as DEMO-001, `https://demowebshop.tricentis.com/books`, scope = list, sort, page size, view, price filter, which DEMO-001 left out). Data Guard pre-run: plain PASS.
- Looked at the page with `playwright-cli` from the main session (open, screenshot, close; evidence in `workspace/DEMO-002/evidence/run-1/`). Drafted `workspace/DEMO-002/01-requirements.md` (REQ-001 to REQ-006, 5 open questions).
- Requirements gate approved in chat ("use assumptions, approve"): Q1, Q4, Q5 by assumption; Q2, Q3 have no expectation (record actual behavior). Drafted `workspace/DEMO-002/03-test-plan.md` (5 exploratory charters, `playwright-cli`, read-only).
- Test plan gate approved in chat ("Approve plan"). First exploration run was **stopped by the user** (too many approval prompts); partial screenshots kept in `workspace/DEMO-002/evidence/run-1-aborted/`, no notes or report.
- Permission change (user decision "ask me when going to a URL"; then "you can input data"): `.claude/settings.json` now asks only for `open`, `goto`, `tab-new`, `upload` and `drop`; allows `click`, `select`, typing (`fill`, `type`, `press`), `snapshot`, `screenshot`, `close` (typed data must be fake; no submissions unless the plan lists them); denies `run-code`, `eval`, `install`, `attach`, `route`, `--persistent`, `--profile`. `eval` was blocked in a test. Known gap: a click on an external link would not ask (mitigation in `docs/test-environment.md`).
- run-2 done by the `manual-tester` subagent (33 browser commands: 1 open, 2 goto, 15 select, 9 click, 5 screenshot, 1 close; page stayed on the allowed host per its report). Result: 5 charters, one low defect BUG-001 (empty result of the "25.00 - 50.00" filter has no message and hides the sort/display controls). Boundary check (Q2) not run: no product at 25.00 or 50.00. Q3 (Position, Created on order) and Q6 (message for an empty result) need the approver. Data Guard post-run: PASS. Leftover `.playwright-cli/` deleted by the main session. Files: `06-report-run-2.md`, `07-traceability.md`, `05-execution/session-1..5-notes.md`, `data-guard-report.md`.
- 2026-11-04: user decision on seeing the browser: keep `playwright-cli` headless by default; add `--headed` to `open` only when the user asks to watch (documented in `manual-tester.md` Step 2.2 and `docs/test-environment.md`). No extra fee or tokens from `--headed` itself.
- Results gate approved in chat ("Approve results", 2026-11-03). Still open (not answered, kept as "needs approver decision"): Q2 (where 50.00 belongs; no boundary product exists), Q3 (order of Position and Created on), Q6 (message for an empty filter result; BUG-001 stays a recorded low defect), CH-04 counted Passed. Follow-ups not done: reload and browser Back checks, retest of BUG-001 after a decision.

## 2026-11-03: manual-tester gap review

**Done**
- Reviewed `manual-tester` as a tester. Updated `.claude/agents/manual-tester.md` (exploratory flow, run numbering, `BUG-###` defect IDs, evidence rule, request limits, API spec check, web-skill placeholder).
- Templates: `test-case.md` (richer `api:` block, `environment`, `reviewed_by`, `review_date`), `execution-report.md` (run, tester, build, browser/OS, duration, severity scale, retest section), new `exploration-session.md`.
- New `docs/test-environment.md` (credentials by env var name, API spec location, limits, evidence paths).
- `.claude/settings.json`: added ask rules for `Invoke-WebRequest` and `Invoke-RestMethod` (Bash and PowerShell forms; the PowerShell rule syntax is not yet tested).

**Decisions**
- Web execution: the user will provide a skill; `tools:` of `manual-tester` unchanged until it is reviewed (BL-010).
- Defect IDs: `BUG-###` (DEMO-001 keeps its `F-01` to `F-03` labels).
- DEMO-001 `06-report.md` is treated as run-1.

- Skills `playwright-best-practices` and `playwright-cli` installed in `.claude/skills/` by the user. Reviewed `playwright-cli`: removed its `allowed-tools` pre-approval from the copy, added `ask` rules for `playwright-cli` and `npx playwright` in `.claude/settings.json`, added `playwright-cli` rules to `manual-tester.md` Step 2.2. Not wired into the agent; the binary is not installed.

- Skill update routine documented in `docs/test-environment.md` (section 5): update with `npx skills add ... --agent claude-code --copy`, not `npx skills update`. `.agents/` removed by the user; `skills-lock.json` kept (a dry-run restore confirmed it still tracks both skills).

- `@playwright/cli` 0.1.23 installed locally (not global): `package.json`, `package-lock.json`, `node_modules/` (git-ignored); added `ask` rules for `npx playwright-cli`. Version check works. Browser binary not downloaded; no page test run yet.

- Prompt test (2026-11-03): the `ask` rule for `npx playwright-cli` prompted for a single command in both Manual and Auto mode. An earlier compound command (`cat && ls && npx ...`) did not prompt; cause not proven. Rule: one command per call, prefer Manual mode, never Accept edits or Bypass.

- BL-010 page test (DEMO-001 run-2): Data Guard pre-run PASS with waivers; opened `https://demowebshop.tricentis.com/` in installed Chrome via `playwright-cli` (in-memory profile), saved a screenshot and a page snapshot under `workspace/DEMO-001/evidence/run-2/`, closed the browser. Each command (`open`, `screenshot`, `close`) prompted for approval (confirmed by the user). Data Guard post-run on that folder: PASS (no personal data in the screenshot or snapshot). Warning seen: skill does not match tool version (not acted on).

- BL-010 wired (user approved): `manual-tester.md` now lists `skills: playwright-cli` and Step 2.2 has the web rules (one command per call, allowed hosts, Chrome in-memory profile, no `run-code`/`eval`, Data Guard before and after, evidence in `evidence/run-<n>/`). Tested by running the `manual-tester` subagent (DEMO-001 run-3, Data Guard pre-run PASS with waivers): the `skills` field loaded the skill, and `open`, `screenshot`, `close` each prompted the user (confirmed). Evidence in `workspace/DEMO-001/evidence/run-3/` (Data Guard post-run PASS). Note: `open` writes a snapshot to `.playwright-cli/` on its own; copy it into evidence and delete the folder.

**Open items**
- BL-006 done: the human set both Gate 0 confirmations to true and removed the waiver block; Data Guard pre-run gave a plain PASS (no waivers). Not scanned by this pre-run: the run-2 and run-3 evidence (both already passed post-run). Next options: test a new URL (web), test an API (BL-009), build `test-reviewer` (BL-002).
- Changes are not committed.

## 2026-11-03: Phase 1 closed (scoped)

**Delivered**
- `manual-tester` agent; DEMO-001 (web, add to cart) run end to end: Gate 0, requirements, test plan (approved), two exploration sessions, report, traceability matrix, Data Guard post-run PASS (rescanned after the last file was added).
- Templates `test-plan.md` and `traceability.md` (added by the user with `/btw`, scanned and consistent); `manual-tester.md`, `README.md` and `CLAUDE.md` updated to match.
- Token record: about 24,000 plus 14,000 tokens of context for the two browser stages (`workspace/DEMO-001/05-execution/token-record.md`).

**DEMO-001 findings (approver decisions)**
- F-01 invalid quantities not rejected with a message: defect, low severity. F-02 "In stock" products without an Add to cart button: defect. F-03 cart total "Calculated during checkout" for shippable items: accepted, closed.

**Moved to the backlog (not done)**
- `test-reviewer` (BL-002), `ba-analyst` (BL-003), Playwright tooling (BL-004), new-session cart check (BL-005), Gate 0 waiver cleanup (BL-006), `/execute` (BL-008), API testing (BL-009), host hooks (BL-001).

## 2026-11-03: host hooks parked

- Hook scripts and 36 offline tests were written, then moved to `docs/backlog/host-guard-hooks/` at the user's request. They are not active and `.claude/settings.json` is unchanged. Nothing enforces `allowed_hosts` technically; the approval prompts do.
- Added `docs/backlog/BACKLOG.md` and a rule in `CLAUDE.md`: propose backlog items when the user wants to improve the agents.

## History (condensed)

- **Phase 0.1 (fix the draft):** `qa-profile.yaml` v0.2 (`masking_approval_ref`, `gate0_confirmations`, feature ID format, Jira cloud, TypeScript); `data-guard` reads human confirmations and handles `masked`, placeholders and screenshots only for synthetic or masked data; policy, templates, README and CLAUDE.md synced; `HANDOFF.md` marked outdated. Decisions: keep YAML, pilot platform order API, web, mobile, Jira keys as feature IDs, test cases stay in the repo for now.
- **`manual-tester` agent created:** requires Data Guard PASS and approved requirements; stops at required gates.
- **Demo set-up:** `demowebshop.tricentis.com` added to `allowed_hosts`; `data_class` stays `synthetic`, fake data only.
- **`blocked_hosts` waived:** `no_production_hosts: true` with `blocked_hosts: []` (user chose option 3); contradictions still HOLD.
- **Gate 0 waiver:** two new confirmation fields and a waiver scoped to `DEMO-001`; waived items are reported as WAIVED and never override a BLOCK.
- **DEMO-001 Gate 0 PASS (with 2 waivers) and requirements drafted** from the Books page; approver answered the questions in two rounds and approved the requirements and the test plan.
- **Exploration and execution:** two sessions in the built-in browser covering add, quantity edge values, remove, two products, reload; cart left empty each time; no personal data entered.
