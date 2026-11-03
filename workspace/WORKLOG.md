# Work log

Newest entry first. Each entry: date, done, decisions, open items. Never write secrets or real data here. Older steps are condensed under "History"; full text is in git history.

## Current state (updated 2026-11-03)

- **Phase:** Phase 1 closed (scoped). Next options: test a new URL (web), test an API (BL-009), build `test-reviewer` (BL-002).
- **Agents that exist:** `data-guard`, `manual-tester`. BA work is done by the main session. Browser steps run from the main session with the built-in browser (the `manual-tester` subagent has no browser).
- **Active safety:** Gate 0 (Data Guard pre-run and post-run) and the user's approval prompts. **No host-enforcing hook is active**; a written, unreviewed version is parked in `docs/backlog/host-guard-hooks/` (BL-001).
- **Profile:** `data_class: synthetic`; allowed hosts `localhost` and `demowebshop.tricentis.com`; `no_production_hosts: true`; Gate 0 waiver for `DEMO-001` only.
- **Still open:**
  - Gate 0 waiver: remove `data.gate0_waivers`, then check and set `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` to `true` (BL-006). Needed before any new feature.
  - DEMO-001: new-session cart check inconclusive (BL-005); shipping estimate and checkout not run; F-01 and F-02 are reported defects, not fixed.
  - `qa-profile.yaml` has not been syntax-checked (no Python on this machine).
  - Security/legal approval for the Claude plan is pending (Pro personal plan: synthetic data only). Evidence retention, metrics, cost limits, CI undecided.
  - Waiting for the user's web skill (BL-010); `manual-tester` has no browser tool yet.
  - Check `git status`; edits after the last commit may be uncommitted (manual-tester gap review is not committed).
  - The user's account-level instructions (bilingual mode) were not visible in the Code session; a new session may load them.
- **Key files to read:** `CLAUDE.md`, `qa-profile.yaml`, `docs/backlog/BACKLOG.md`, `workspace/DEMO-001/06-report.md`.

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

**Open items**
- BL-006 waiver cleanup still blocks any new feature. BL-010: browser download, a page test on an allowed host (needs Data Guard pre-run), then decide on wiring the skill (one command per call).
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
