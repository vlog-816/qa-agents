# Test plan: The Internet practice site, login cases / Kế hoạch kiểm thử: các ca đăng nhập

- Feature ID: DEMO-004
- Date: 2026-11-04
- By: Claude (main session, drafted for the manual-tester)
- Approach: `scripted` (cases, then automated)
- Gate `test_plan`: approved for TC-001 (approver: Boss-QA, the user; date: 2026-11-04; "Approve plan and case"). The amendment (TC-002, TC-003) is **approved** too (Boss-QA, the user; 2026-11-04; "Approve plan and cases"; see section 8).

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

## Inputs

- `00-data-gate.md`: PASS (no waivers), 2026-11-04, with credential conditions
- `01-requirements.md`: approved on 2026-11-04 (assumptions accepted); REQ-003 and REQ-004 approved on 2026-11-04 with assumptions (Q4, Q5, Q6 accepted)
- Other sources: first look at the page (structure only; no evidence files kept because the page prints practice credentials)

## 1. Scope

- In scope (REQ IDs): REQ-001, REQ-002 (login form shown; login happy case); REQ-003 (unknown username rejected); REQ-004 (wrong password for the test user rejected).
- Out of scope (and why): empty fields, access to the secure page without login, logout, the password-masked check, other pages, external links (not part of this round).
- Phạm vi / Scope: REQ-001 đến REQ-004 nằm trong phạm vi; trường rỗng, truy cập trang bảo mật khi chưa đăng nhập, đăng xuất và kiểm tra ẩn mật khẩu nằm ngoài phạm vi.

## 2. Platforms and hosts

- Platforms: `web`
- Hosts: only `the-internet.herokuapp.com` (in `data.allowed_hosts`). Stop on any redirect to another host.

## 3. Approach

- Scripted test cases (`TC-001`, `TC-002`, `TC-003`) in `04-test-cases.md`, then Playwright scripts written by the `automation-tester` after your review.
- **The AI never types credentials, or any other value, on this site** (third-party site, not the user's own application). The steps that type values are run **by the human** in their own terminal.
- The AI may do only read-only browsing with playwright-cli (no typing, no submit), already done once.

## 4. Test data

- Credentials only as the human's environment variables **`QA_TEST_USER`** (username) and **`QA_TEST_PASSWORD`** (password). No value in any file, report, evidence or chat. The practice credentials printed on the page are not copied anywhere.
- TC-002 and TC-003 use random fake values (an unknown username; a wrong password) **generated at run time** by the script and never stored. TC-003 uses `QA_TEST_USER` only; `QA_TEST_PASSWORD` is not used there.
- The human sets the variables in their own PowerShell session before the run; the script fails fast if a required one is missing.

## 5. Charters or test case groups

| ID | Mission / Group | REQ | Time box | Status |
|---|---|---|---|---|
| TC-001 | Login form is shown; a valid username and password lead to the secure area | REQ-001, REQ-002 | one scripted run | not started |
| TC-002 | An unknown username is rejected with an error (stays on /login) | REQ-003 | one scripted run | not started |
| TC-003 | A wrong password for the valid test user is rejected with an error (stays on /login) | REQ-004 | one scripted run | not started |

## 6. Entry and exit criteria

- Entry: plan approved, Gate 0 PASS, the human has set the needed variables, approval for each network action.
- Exit: the script has run once by the human, the result is recorded, Data Guard post-run on the files.

## 7. Risks

| Risk | Impact | Covered by (TC / CH) |
|---|---|---|
| The success page text or address differs from the assumption | False failure, needs approver decision | TC-001 (record actual) |
| The error message wording differs from the assumption | False failure, needs approver decision | TC-002, TC-003 (loose check, record actual) |
| The site is public and shared and may be unavailable or changed | Unstable result | rerun later |
| Credentials leak into a trace, video, log or screenshot | Policy breach | trace/video/screenshot off for these specs; Data Guard post-run |

## 8. Assumptions and open questions

Approved by the approver in chat on 2026-11-04 ("use assumptions, approve"); not blocking:

- Assumed (accepted): after a valid login the address is `/secure`, a success message and a "Logout" control are shown.
- Assumed (accepted, Q4, Q5, Q6): an unknown username or a wrong password keeps the user on `/login` with an error message about an invalid username or password; random fake values generated at run time are acceptable.

### Amendment 2026-11-04 / Bổ sung 2026-11-04

The scope was extended by the approved REQ-003 and REQ-004 (new cases TC-002 and TC-003). The plan gate for this amendment is given together with the review of TC-002 and TC-003; until then they stay `draft` and nothing is executed. / Phạm vi được mở rộng bởi REQ-003 và REQ-004 đã duyệt; cổng kế hoạch cho phần bổ sung được cấp cùng lúc với việc duyệt TC-002 và TC-003.

## 9. Cost note (optional)

None.

## 10. Approval

- Approver: Boss-QA (the user, in chat: "Approve plan and case")
- Date: 2026-11-04
- Applies to: TC-001, and the amendment (TC-002, TC-003) approved by the same approver in chat on 2026-11-04 ("Approve plan and cases").
- Decisions that override earlier notes: none. The credential step is run by the human, not by the AI.
