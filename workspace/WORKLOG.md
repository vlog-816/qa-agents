# Work log

Newest entry first. Each entry: date, done, decisions, open items. Never write secrets or real data here. Older steps are condensed under "History"; full text is in git history.

## Current state (updated 2026-11-03)

- **Phase:** Phase 1 closed (scoped). DEMO-002 (Books page listing controls) run-2 done, all gates approved. Next options: test a new URL (web), test an API (BL-009), build `test-reviewer` (BL-002).
- **Agents that exist:** `data-guard`, `manual-tester`. BA work is done by the main session. Web steps: `manual-tester` runs them through the `playwright-cli` skill (Bash, installed Chrome, in-memory profile); see `docs/test-environment.md`.
- **Active safety:** Gate 0 (Data Guard pre-run and post-run) and the user's approval prompts. **No host-enforcing hook is active**; a written, unreviewed version is parked in `docs/backlog/host-guard-hooks/` (BL-001).
- **Profile:** `data_class: synthetic`; allowed hosts `localhost` and `demowebshop.tricentis.com`; `no_production_hosts: true`; all Gate 0 confirmations true, no waiver (BL-006 done 2026-11-03).
- **Still open:**
  - Revisit `no_production_hosts: true` as soon as a production host exists.
  - DEMO-001: new-session cart check inconclusive (BL-005); shipping estimate and checkout not run; F-01 and F-02 are reported defects, not fixed.
  - `qa-profile.yaml` has not been syntax-checked (no Python on this machine).
  - Security/legal approval for the Claude plan is pending (Pro personal plan: synthetic data only). Evidence retention, metrics, cost limits, CI undecided.
  - DEMO-002: Q2 (where 50.00 belongs), Q3 (order of Position and Created on), Q6 (message for an empty filter result; BUG-001, low) need the approver; reload and browser Back checks not done.
  - Web steps: one command per call; `open`, `goto`, `tab-new`, `upload`, `drop` ask; `run-code`, `eval`, `install`, `attach` are denied; gap: a click on an external link does not ask (read the Page URL after each command).
  - Check `git status`; edits after the last commit may be uncommitted (DEMO-002 and the permission changes are not committed).
  - The user's account-level instructions (bilingual mode) were not visible in the Code session; a new session may load them.
- **Key files to read:** `CLAUDE.md`, `qa-profile.yaml`, `docs/backlog/BACKLOG.md`, `docs/test-environment.md`, `workspace/DEMO-001/06-report.md`, `workspace/DEMO-002/06-report-run-2.md`.

## 2026-11-03: DEMO-002 (Books page listing controls) started

- New feature `DEMO-002` (same page as DEMO-001, `https://demowebshop.tricentis.com/books`, scope = list, sort, page size, view, price filter, which DEMO-001 left out). Data Guard pre-run: plain PASS.
- Looked at the page with `playwright-cli` from the main session (open, screenshot, close; evidence in `workspace/DEMO-002/evidence/run-1/`). Drafted `workspace/DEMO-002/01-requirements.md` (REQ-001 to REQ-006, 5 open questions).
- Requirements gate approved in chat ("use assumptions, approve"): Q1, Q4, Q5 by assumption; Q2, Q3 have no expectation (record actual behavior). Drafted `workspace/DEMO-002/03-test-plan.md` (5 exploratory charters, `playwright-cli`, read-only).
- Test plan gate approved in chat ("Approve plan"). First exploration run was **stopped by the user** (too many approval prompts); partial screenshots kept in `workspace/DEMO-002/evidence/run-1-aborted/`, no notes or report.
- Permission change (user decision "ask me when going to a URL"; then "you can input data"): `.claude/settings.json` now asks only for `open`, `goto`, `tab-new`, `upload` and `drop`; allows `click`, `select`, typing (`fill`, `type`, `press`), `snapshot`, `screenshot`, `close` (typed data must be fake; no submissions unless the plan lists them); denies `run-code`, `eval`, `install`, `attach`, `route`, `--persistent`, `--profile`. `eval` was blocked in a test. Known gap: a click on an external link would not ask (mitigation in `docs/test-environment.md`).
- run-2 done by the `manual-tester` subagent (33 browser commands: 1 open, 2 goto, 15 select, 9 click, 5 screenshot, 1 close; page stayed on the allowed host per its report). Result: 5 charters, one low defect BUG-001 (empty result of the "25.00 - 50.00" filter has no message and hides the sort/display controls). Boundary check (Q2) not run: no product at 25.00 or 50.00. Q3 (Position, Created on order) and Q6 (message for an empty result) need the approver. Data Guard post-run: PASS. Leftover `.playwright-cli/` deleted by the main session. Files: `06-report-run-2.md`, `07-traceability.md`, `05-execution/session-1..5-notes.md`, `data-guard-report.md`.
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
