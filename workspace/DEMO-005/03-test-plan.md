# Test plan: Vercel app login page / Kế hoạch kiểm thử: trang đăng nhập của app Vercel

- Feature ID: DEMO-005
- Date: 2026-11-05
- By: manual-tester
- Approach: `scripted` (chosen by the approver / do người duyệt chọn)
- Gate `test_plan`: approved (approver: Boss-QA, the user; date: 2026-11-05; "Use assumptions, approve"). Open question Q-A is resolved: the host is in `data.allowed_hosts` (confirmed by reading `qa-profile.yaml`).

## Inputs

- `00-data-gate.md`: not present (Data Guard is optional and was not requested).
- `01-requirements.md`: approved on 2026-11-05 (Boss-QA).
- Other sources: none.

## 1. Scope

- In scope (REQ IDs): REQ-001, REQ-002, REQ-003.
- Out of scope: REQ-004 (empty fields). Reason: Q3 in the requirements says it is tested only if the approver asks; he did not. / Lý do: chỉ kiểm thử khi người duyệt yêu cầu; chưa yêu cầu.
- Also out of scope: the "Sign up" link and `/register` (no account creation); load, security and mobile testing.

## 2. Platforms and hosts

- Platforms: `web`.
- Hosts: `vlog-ai-powered-assistant.vercel.app` (in `data.allowed_hosts`, to be confirmed by the user before execution: the entry is not visible in the profile shown to this agent; see open question Q-A). Only the `/login` path and the page it redirects to after sign-in.

## 3. Approach

- Scripted: 3 framework-neutral test cases in `04-test-cases.md`, run in order TC-001, TC-002, TC-003. Each case starts logged out in a fresh browser context.
- This host has no test label, so the AI types **no credentials**. Typing steps are marked `run_by: human`; the human types from their own environment variables. The AI may open the page, take snapshots and screenshots and read the result.
- The post-login page and error wording are assumptions. They are checked loosely (leaves `/login` and no error; stays on `/login` and an error is shown) and recorded from the first human run.
- Invalid email and password values are generated at run time and never written to any file, report or evidence.

## 4. Test data

- Account type: one dedicated test account on this deployment (test data only, per the user).
- `username_env: QA_TEST_USER` (holds the email), `password_env: QA_TEST_PASSWORD`. Names only; values are never written anywhere.
- Unknown email and wrong password: generated at run time by the human, never stored.
- Mask any personal-looking value (including the email) in screenshots before saving; if masking is not possible, do not save the file.

## 5. Charters or test case groups

| ID | Mission / Group | REQ | Time box | Status |
|---|---|---|---|---|
| TC-001 | Form shown; valid sign-in succeeds | REQ-001, REQ-002 | n/a | draft |
| TC-002 | Unknown email with random password rejected | REQ-003 | n/a | draft |
| TC-003 | Valid email with wrong password rejected | REQ-003 | n/a | draft |

## 6. Entry and exit criteria

- Entry: plan approved; the host confirmed in `allowed_hosts`; `QA_TEST_USER` and `QA_TEST_PASSWORD` set by the human; approval for each network action.
- Exit: all 3 cases have a recorded result, evidence saved for Failed/Blocked, findings listed.

## 7. Risks

| Risk | Impact | Covered by (TC / CH) |
|---|---|---|
| Post-login page and error wording unknown | Checks are loose; false pass possible | TC-001, TC-002, TC-003 (record from first human run) |
| Test account missing or locked after wrong attempts | TC-001 Blocked | TC-001, TC-003 |
| Host has no test label, real data may exist | Data exposure in evidence | all (mask evidence) |
| Server may rate-limit failed logins | Few attempts only | TC-002, TC-003 |

## 8. Assumptions and open questions

- Q-A: The profile lists `localhost`, `demowebshop.tricentis.com` and `the-internet.herokuapp.com` as allowed hosts; the user states `vlog-ai-powered-assistant.vercel.app` is allowed. Confirm it is present in `data.allowed_hosts` before execution (the agent cannot edit the profile).
- Q1 (requirements): the exact page after sign-in is unknown; recorded from the first human run.
- Q2 (requirements): the error wording and whether it differs for unknown email vs wrong password is unknown; recorded from the first human run.
- Q4 (requirements): the human supplies the test account through `QA_TEST_USER` / `QA_TEST_PASSWORD`.
- Assumption: the deployment holds test data only (user statement).

## 9. Cost note (optional)

Not measured.

## 10. Approval

- Approver: Boss-QA (the user, in chat: "Use assumptions, approve")
- Date: 2026-11-05
- Decisions that override earlier notes: none. Assumptions for the post-login page and the error wording are accepted and recorded from the first human run.

## Amendment 2026-11-05 (registration) / Bổ sung 2026-11-05 (đăng ký)

- Status: **waiting for human approval** (the amendment only). The approval above for TC-001 to TC-003 is unchanged and untouched. / Chỉ phần bổ sung chờ duyệt; phê duyệt TC-001..003 giữ nguyên.
- Scope adds: REQ-005, REQ-006 (requirements approved 2026-11-05). For the amendment only, this replaces the earlier "out of scope: `/register`" line in section 1; the AI still does not click the "Sign up" link or sign up.
- New test cases (in `04-test-cases.md`, `review_status: draft`):

| ID | Mission / Group | REQ | Time box | Status |
|---|---|---|---|---|
| TC-004 | Registration form shown; new email creates an account | REQ-005, REQ-006 | n/a | draft |
| TC-005 | Duplicate email rejected | REQ-006 | n/a | draft |
| TC-006 | Malformed email or weak password rejected | REQ-006 | n/a | draft |

- New test data file: `02-test-data.md` (rules only; no values, no secrets; generated emails only on `example.com`).
- Execution rules: the host has no test label, so the AI does not sign up and types no credentials. The AI only opens `/register`, takes snapshots and screenshots and reads results; the human types every value and clicks "Create Account". Suggested order: TC-004 (can create the test account used by TC-001, TC-003 and TC-005 if it does not exist yet), TC-005, TC-006.
- Additional risks: accounts created by TC-004 stay on the deployment (test data only; the human decides on cleanup); TC-005 and TC-006 could create an account by mistake if validation is missing (record as a finding); rate limits on repeated sign-ups (few attempts only).
- Open questions: Q5 (password rules), Q6 (behavior and wording after submit), Q8 (cleanup of the created account).
- Approval of the amendment: pending (approver and date to be filled by a human).

## Amendment 2026-11-05 (production smoke test) / Bổ sung 2026-11-05 (smoke test trên production)

- Status: **approved** (approver: Boss-QA, the user; date: 2026-11-05; "Approve amendment"). This amendment **replaces the registration amendment above**: TC-004, TC-005 and TC-006 are **withdrawn** (each could create a real account on production). TC-001 to TC-003 stay approved and unchanged. / Thay thế phần bổ sung đăng ký ở trên; TC-004..006 bị rút lại.
- Why: the user needs to test the login on the live host `vlog-ai-powered-assistant.vercel.app` ("production smoke test", decided in chat 2026-11-05: "Yes, that is enough"). The host has no test label.
- Scope: TC-001 (form shown, valid login), TC-002 (unknown email rejected), TC-003 (wrong password rejected). Three checks, one run each. `02-test-data.md` is kept only for the data sets of these three cases.
- **Preconditions that only the user can do** (the AI edits none of these):
  1. Update `qa-profile.yaml` (`no_production_hosts: false`; keep the host in `allowed_hosts`) and the "Never touch production" line in `CLAUDE.md` to allow this one host.
  2. Create ONE dedicated minimum-privilege test account on the host by hand, and set `QA_TEST_USER` and `QA_TEST_PASSWORD` in their own PowerShell session (Read-Host pattern; never in chat or files).
- **Who does what:** the AI reads pages, writes cases and the report, and (after selection and code review) the automation tester prepares Playwright specs. A human types every credential: they run each spec once in their own terminal with their own environment variables, delete `test-results/` and `playwright-report/`, and report pass/fail and non-secret text only. The AI does not sign up, type credentials or submit forms on this host.
- **Production safety rules:** very low volume, one run per case, no retries, no loops; only the dedicated test account; failed logins may lock the account or raise alerts (stop and report if a run fails unexpectedly, do not rerun); no orders, payments or destructive actions; no registration; trace, screenshot and video off; host list limited to this host.
- Open questions: Q1 and Q2 (post-login page, error wording; loose checks, recorded from the first run); the production-rule edits above are pending on the user.
- Approval of the amendment: Boss-QA (the user, in chat: "Approve amendment"), 2026-11-05. The preconditions above are still the user's to do before any run.
