# Test plan: Demo Web Shop, Books page listing controls

- Feature ID: DEMO-002
- Date: 2026-11-03
- By: Claude (main session, drafted for the manual-tester)
- Approach: `exploratory` (chosen by the approver: "full exploratory run")
- Gate `test_plan`: approved (approver: the user, acting as Gate 0 approver Boss-QA; date: 2026-11-03; approved in chat with "Approve plan")

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

## Inputs

- `00-data-gate.md`: PASS (no waivers), 2026-11-03
- `01-requirements.md`: approved on 2026-11-03 (assumptions accepted by the approver)
- Other sources: first look at the page, `evidence/run-1/books-1.png` and `books-1-snapshot.yml`

## 1. Scope

- In scope (REQ IDs): REQ-001 to REQ-006 (list, sort, page size, view mode, price filter, combinations).
- Out of scope (and why): add to cart and cart (DEMO-001); product detail pages, search, compare, wishlist, checkout, register, login (not part of this feature).

## 2. Platforms and hosts

- Platforms: `web`
- Hosts: only `demowebshop.tricentis.com` (allowed). `localhost` is also allowed but not used here. Stop on any redirect to another host.

## 3. Approach

Exploratory sessions, no scripted cases. Executor: the `manual-tester` subagent with the `playwright-cli` skill (wired and tested in DEMO-001 run-3), or the main session if the approver prefers. Rules for every session:

- Installed Chrome, in-memory profile, `npx --no-install playwright-cli <command>`, one command per call. Prompts (changed 2026-11-03, user decision "ask me when going to a URL"): `open`, `goto` and data entry ask; `click`, `select`, `snapshot`, `screenshot`, `close` do not; `run-code`, `eval`, install, attach and profile options are denied. `open` once per session; `goto` only in CH-05 for direct-address checks. Read the `Page URL` after every command and stop if it leaves the allowed host. Never click external links (footer social links).
- The first attempt was stopped by the user (too many prompts): its partial screenshots are in `evidence/run-1-aborted/`, no notes or report exist. The real run is **run-2** (`evidence/run-2/`, `06-report-run-2.md`).
- Only clicks and choosing options in the page's own controls (sort, display, view, price links, pager). No typing, no forms, no cart actions, no login.
- Record what the page shows after each action (list order, names, prices, count, address). Where the requirement has no expected result (Q2, Q3), record the actual behavior and mark it "needs approver decision".
- Evidence only under `evidence/run-<n>/` (screenshots, snapshots); copy snapshots from `.playwright-cli/` and delete that folder; run `close` at the end of each session.

## 4. Test data

None. No account, no credentials, no input. All data is the public product list (six books).

## 5. Charters

| ID | Mission / Group | REQ | Time box | Status |
|---|---|---|---|---|
| CH-01 | List and view mode: confirm the six products with name and selling price; switch Grid and List; same products and order in both | REQ-001, REQ-004 | 15 min | not started |
| CH-02 | Sort: try each of the six sort options in Grid; check name A-Z/Z-A and price low-high/high-low (selling price, assumed); record what Position and Created on do (Q3) | REQ-002 | 20 min | not started |
| CH-03 | Page size: choose 4, 8, 12; check count per page, pager with 4 per page (two pages of 4 and 2), no pager with 8 and 12; page 2 content | REQ-003 | 15 min | not started |
| CH-04 | Price filter: "Under 25.00", "25.00 - 50.00", "Over 50.00"; boundary products (25.00, 50.00 if present, Q2); removing the filter; empty result display | REQ-005 | 20 min | not started |
| CH-05 | Combinations: filter + sort + page size + view together; changing one control keeps the others; direct address with `?price=` and combined values behaves the same as clicking | REQ-006 | 20 min | not started |

Ideas to try inside charters: reload (F5) keeps the choice; browser Back after a change; the selected option stays shown in each control; a result with zero products; out-of-stock books still listed (Q5).

## 6. Entry and exit criteria

- Entry: plan approved, Data Guard pre-run PASS (done), approval for each network action.
- Exit: charters done or time box used, results recorded, findings listed in `06-report-run-1.md`, Data Guard post-run on the evidence.

## 7. Risks

| Risk | Impact | Covered by (TC / CH) |
|---|---|---|
| Sort or filter uses the original price, not the selling price | Wrong order or wrong list | CH-02, CH-04 |
| Boundary values 25.00 and 50.00 land in the wrong range | Product missing or shown twice | CH-04 |
| Page size changes lose the filter or the sort | Inconsistent results | CH-05 |
| Paging with 4 per page skips or repeats a product | Product missing | CH-03 |
| The shared demo site data changes between sessions | Unstable expected results | all (record date and the product list at the start of each session) |

## 8. Assumptions and open questions

Approved by the approver in chat on 2026-11-03 ("use assumptions, approve"); not blocking:

- Assumed (accepted): price sort and filter use the selling price (Q1); two pages of 4 and 2 with 4 per page (Q4); out-of-stock books still appear (Q5).
- No expectation (record actual behavior, mark "needs approver decision"): where 50.00 belongs (Q2); order of Position and Created on (Q3).
- New questions found during exploration go to `01-requirements.md`, Open questions.

## 9. Cost note (optional)

Record the token cost per session in `05-execution/token-record.md` if measured (method: DEMO-001).

## 10. Approval

- Approver: the user (Boss-QA, Gate 0 approver), in chat
- Date: 2026-11-03
- Decisions that override earlier notes: none. Executor is the `manual-tester` subagent (suggestion accepted with the plan).
