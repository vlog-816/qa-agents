# Work log

Newest entry first. Each entry: date, done, decisions, open items. Never write secrets or real data here.

## 2026-11-03: findings decided, session test inconclusive (DEMO-001)

**Done**
- Approver decisions: F-01 defect (low), F-02 defect, F-03 accepted and closed. Updated `06-report.md`.
- Cart-per-session check: cleared visible cookies, cart stayed (cart cookie is HttpOnly): inconclusive. Cart left empty.

**Open items**
- Retry the new-session check with a clean browser profile (user clears site data) or skip.
- Remove `data.gate0_waivers`, confirm the two Gate 0 items; review files and commit.
- Re-run Data Guard post-run because `06-report.md` changed.

## 2026-11-03: DEMO-001 execution sessions done, report written

**Done**
- Test plan approved by Boss-QA; approver decisions recorded in `03-test-plan.md`.
- Ran exploration session 2; wrote `05-execution/session-2-notes.md` and `06-report.md` (3 findings: invalid quantity handling, In-stock products without Add to cart, cart total missing for shippable items).
- Token record stage 2: +13,842 context tokens (browser stages total about 37,966).

**Open items**
- Data Guard post-run before sharing the report.
- Approver answers Q10 to Q12 and decides on findings; remove Gate 0 waiver after the demo.
- Not run: new-session persistence, shipping estimate, checkout.

## 2026-11-03: approver answers round 2 (DEMO-001)

**Done**
- Recorded answers in `01-requirements.md` (max quantity: none; 3 products out of stock; qty must be >= 1, whole, not empty; header = total quantity; tax and shipping count in total; cart per session).

**Open items**
- Conflict on invalid quantity handling (current silent reset/remove vs. reject with message): waiting for the approver.
- Test plan not approved yet; update TC-013, TC-014, TC-017 and REQ-008 expectations after the decision.

## 2026-11-03: DEMO-001 exploration done (built-in browser)

**Done**
- Explored the add-to-cart flow on the demo shop (add, change quantity, edge quantities, remove). Cart left empty. Notes: `workspace/DEMO-001/05-execution/exploration-notes.md`.
- Token cost recorded in `workspace/DEMO-001/05-execution/token-record.md`: context +24,124 tokens (242,012 to 266,136), Pro 5-hour limit 16% to 18%.
- Added observed behavior and new questions Q7 to Q9 to `01-requirements.md`.

**Open items**
- Re-propose `03-test-plan.md` and `04-test-cases.md` from the notes, then user approves the test plan gate.
- Not explored: qty 0, decimals, empty, same product twice, 3 products without list button, checkout and login (out of scope).
- Playwright MCP / `playwright-cli` / skills not installed; user will refactor tooling later.

## 2026-11-03: DEMO-001 Gate 0 PASS and requirements drafted

**Done**
- Data Guard pre-run: PASS with two WAIVED items (scoped to DEMO-001).
- Read `https://demowebshop.tricentis.com/books` (page text only) and drafted `workspace/DEMO-001/01-requirements.md` (5 requirements, status draft).

**Open items**
- User (as BA) must answer Q1 to Q5 in the requirements file and approve it (gate `requirements`) before `manual-tester` runs.

## 2026-11-03: Gate 0 waiver for DEMO-001

**Done**
- Added `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` (both `false`) to `data.gate0_confirmations`, and a scoped `data.gate0_waivers` block for `DEMO-001` (user asked in chat, "make it easy, set them after the demo").
- `data-guard.md` / `data-policy.md`: waived items are reported as WAIVED; waiver applies only to the named feature; never overrides BLOCK; `approver`, `date`, `claude_plan_approved` cannot be waived.

**Open items**
- After the demo: remove `gate0_waivers`, then user sets the two new confirmations to `true` after checking them.

## 2026-11-03: blocked_hosts waived for the pilot

**Done**
- User chose option 3: added `data.no_production_hosts: true` to `qa-profile.yaml` and set `blocked_hosts: []`.
- `.claude/agents/data-guard.md` and `docs/data-policy.md`: the flag removes the HOLD for an empty list; contradictions (flag true with a non-empty list, or flag true with non-synthetic data) still HOLD.

**Open items**
- Revisit when a production host exists: set the flag to `false` and fill `blocked_hosts`.
- `gate0_confirmations` still to be filled in by the user.

## 2026-11-03: demo run set-up (DEMO-001, https://demowebshop.tricentis.com)

**Done**
- Added `demowebshop.tricentis.com` to `data.allowed_hosts` (user-approved plan). `data_class` stays `synthetic`; use fake data only on this public shared site.

**Open items (user must do; AI must not)**
- Replace the `.invalid` placeholder in `blocked_hosts` with a real production host, or decide how to handle "no production host".
- Fill `data.gate0_confirmations` (approver, date, `claude_plan_approved`, `test_account_confirmed`) truthfully.
- Then run `data-guard` pre-run for `DEMO-001`; requirements for the demo are drafted only after Gate 0 is PASS (no access to the site before that).
- `manual-tester` has no browser tool: web UI steps will run from the main session with the built-in browser, with user approval.

## 2026-11-03: manual-tester agent created

**Done**
- Added `.claude/agents/manual-tester.md` (tools: Read, Grep, Glob, Write, Bash). Requires Data Guard PASS and approved requirements before it works; stops at required gates.

**Open items**
- Agent not yet tested. Expected result today: it refuses (Gate 0 is HOLD until `gate0_confirmations` and `blocked_hosts` are filled in).
- No hook enforces `allowed_hosts` yet (Phase 0.5 skipped by user choice). Host safety relies on prompt rules and manual approval of every network command.
- Not created yet: `test-reviewer`, `/execute`, `templates/test-plan.md`, `templates/traceability.md`, Playwright MCP, local pilot app setup.

## 2026-11-03: Phase 0.1 (fix the Phase 0 draft)

**Done**
- `qa-profile.yaml` v0.2: added `masking_approval_ref`, `gate0_confirmations`, `feature_id_format`, `test_management`; Jira set to `cloud`; automation language set to `typescript`.
- `.claude/agents/data-guard.md`: reads human confirmations from the profile; BLOCK/HOLD rules for `masked`, placeholders and empty `blocked_hosts`; screenshots opened only for `synthetic` or `masked` data.
- `docs/data-policy.md`, `templates/*`, `README.md`, `CLAUDE.md` synced with the above.
- `HANDOFF.md` marked as an outdated snapshot; this work log added.

**Decisions**
- Keep `qa-profile.yaml` as YAML (hook for `allowed_hosts` in Phase 0.5 needs a structured file).
- Pilot app: restful-booker-platform on localhost, `data_class: synthetic`. Platform order: API, web, mobile.
- Feature IDs are Jira keys; `PILOT-001` until a ticket exists.
- Test cases stay in this repo for now; exports to Google Sheets, TestRail, Xray come later.

**Open items**
- `qa-profile.yaml` not syntax-checked (no Python on this machine).
- `data.gate0_confirmations` still empty (human must fill in), so Gate 0 returns HOLD.
- `blocked_hosts` still holds a placeholder; replace with the real production host.
- Security/legal approval for the Claude plan pending (Pro personal plan: synthetic data only).
- Phase 0.5 (host-enforcing hook) not started. Evidence retention, metrics, cost limits, CI undecided.
- Changes are not committed yet.
