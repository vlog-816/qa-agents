# Test plan: The Internet practice site, login happy case / Kế hoạch kiểm thử: đăng nhập thành công

- Feature ID: DEMO-004
- Date: 2026-11-04
- By: Claude (main session, drafted for the manual-tester)
- Approach: `scripted` (one case, then automated)
- Gate `test_plan`: approved (approver: Boss-QA, the user; date: 2026-11-04; "Approve plan and case")

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

## Inputs

- `00-data-gate.md`: PASS (no waivers), 2026-11-04, with credential conditions
- `01-requirements.md`: approved on 2026-11-04 (assumptions accepted)
- Other sources: first look at the page (structure only; no evidence files kept because the page prints practice credentials)

## 1. Scope

- In scope (REQ IDs): REQ-001, REQ-002 (login form shown; login happy case).
- Out of scope (and why): wrong or empty credentials, logout, other pages, external links (not part of this round).

## 2. Platforms and hosts

- Platforms: `web`
- Hosts: only `the-internet.herokuapp.com` (in `data.allowed_hosts`). Stop on any redirect to another host.

## 3. Approach

- One framework-neutral test case (`TC-001`) in `04-test-cases.md`, then a Playwright script written by the `automation-tester` after your review.
- **The AI never types credentials on this site** (third-party site, not the user's own application). The step that types the username and password is run **by the human** in their own terminal.
- The AI may do only read-only browsing with playwright-cli (no typing, no submit), already done once.

## 4. Test data

- Credentials only as the human's environment variables **`QA_TEST_USER`** (username) and **`QA_TEST_PASSWORD`** (password). No value in any file, report, evidence or chat. The practice credentials printed on the page are not copied anywhere.
- The human sets the variables in their own PowerShell session before the run; the script fails fast if either is missing.

## 5. Charters or test case groups

| ID | Mission / Group | REQ | Time box | Status |
|---|---|---|---|---|
| TC-001 | Login form is shown; a valid username and password lead to the secure area | REQ-001, REQ-002 | one scripted run | not started |

## 6. Entry and exit criteria

- Entry: plan approved, Gate 0 PASS, the human has set the two variables, approval for each network action.
- Exit: the script has run once by the human, the result is recorded, Data Guard post-run on the files.

## 7. Risks

| Risk | Impact | Covered by (TC / CH) |
|---|---|---|
| The success page text or address differs from the assumption | False failure, needs approver decision | TC-001 (record actual) |
| The site is public and shared and may be unavailable or changed | Unstable result | rerun later |
| Credentials leak into a trace, video, log or screenshot | Policy breach | trace/video/screenshot off for this spec; Data Guard post-run |

## 8. Assumptions and open questions

Approved by the approver in chat on 2026-11-04 ("use assumptions, approve"); not blocking:

- Assumed (accepted): after a valid login the address is `/secure`, a success message and a "Logout" control are shown.

## 9. Cost note (optional)

None.

## 10. Approval

- Approver: Boss-QA (the user, in chat: "Approve plan and case")
- Date: 2026-11-04
- Decisions that override earlier notes: none. The credential step is run by the human, not by the AI.
