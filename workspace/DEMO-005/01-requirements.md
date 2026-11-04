# Requirements: Vercel app login page / Yêu cầu: trang đăng nhập của app Vercel

- Feature ID: DEMO-005
- Analysis date: 2026-11-05
- By: Claude (main session, no ba-analyst agent yet)
- Gate "requirements" status: approved (approver: Boss-QA, the user; date: 2026-11-05; "Use assumptions, approve"). Q1 to Q3 are answered by the stated assumptions; REQ-004 (empty fields) stays out of scope because Q3 says "only if you ask". Q4: only the variable names are used (`QA_TEST_USER` holds the email, `QA_TEST_PASSWORD`).

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

> Note / Lưu ý: these requirements are **observed from the page** (read only, nothing typed), not from an official spec. Behavior after submit is assumed until confirmed. / Hành vi sau khi submit là giả định cho đến khi được xác nhận.

## Sources

| Source ID | Type | Reference | Notes |
|---|---|---|---|
| SRC-02 | web | https://vlog-ai-powered-assistant.vercel.app/register | Viewed 2026-11-05 with playwright-cli (open, snapshot, screenshot, close; no typing, no submit). Evidence: `evidence/run-1/register-1.png`, `evidence/run-1/register-1-snapshot.yml`. No credentials shown. Added for the test data and registration cases. |
| SRC-01 | web | https://vlog-ai-powered-assistant.vercel.app/login | The user's own app (stated by the user; the host name has no test label). Viewed 2026-11-05 with playwright-cli (open, snapshot, screenshot, close; no typing, no submit). Evidence: `evidence/run-1/login-1.png`, `evidence/run-1/login-1-snapshot.yml`. The page shows no credentials. |

## Requirements

### REQ-001: The login page offers a sign-in form / Trang đăng nhập có form đăng nhập

- Description: the page `/login` (title "AI-POWERED | VyVy") has the heading "Welcome back!", the text "Sign in to your account to continue", an "Email Address" field (placeholder `you@email.com`), a "Password" field (masked placeholder), a "Sign in" button and a "Sign up" link to `/register`.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): the form is displayed with an empty email field, an empty password field and an enabled "Sign in" button.
- Related platform: `web`
- Notes: the first field is an **email address**, not a username.

### REQ-002: A user signs in with a valid email and password / Đăng nhập bằng email và mật khẩu hợp lệ (happy case)

- Description: entering a valid email and password and choosing "Sign in" signs the user in.
- Source: SRC-01 (the form); the result is **not observed**
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): after a successful sign-in the browser leaves `/login`, the signed-in area is shown, and no error message is displayed.
- Related platform: `web`
- Notes: where the user lands and what is shown are unknown (Q1). Credentials only through environment variable names; the human types them on this host (see Assumptions).

### REQ-003: A wrong password or unknown email is rejected / Mật khẩu sai hoặc email không tồn tại bị từ chối

- Description: a wrong password for a valid email, or an email that does not exist, does not sign the user in.
- Source: SRC-01 (the form); the result is **not observed**
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): the user stays on `/login`, an error message is shown, and the signed-in area is not shown.
- Related platform: `web`
- Notes: the error wording and whether the message distinguishes the two cases are unknown (Q2).

### REQ-004: Email and password are required / Email và mật khẩu là bắt buộc

- Description: submitting with an empty field should not sign the user in.
- Source: SRC-01 (observed form fields); behavior not observed
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): submit is blocked or an error is shown, and the user stays on `/login`.
- Related platform: `web`
- Notes: whether the check is in the browser or on the server is unknown (Q3). Optional, include only if the approver wants it.

### REQ-005: The registration page offers a sign-up form / Trang đăng ký có form đăng ký (added 2026-11-05, draft)

- Description: the page `/register` (title "AI-POWERED | VyVy") has the heading "Create Account", the text "Sign up to get started", a "Full Name" field, an "Email" field, a "Password" field, a "Create Account" button and a "Sign in" link to `/login`.
- Source: SRC-02 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): the form is displayed with three empty fields and an enabled "Create Account" button.
- Related platform: `web`
- Notes: observed read-only; nothing typed.

### REQ-006: Registration accepts a new account and rejects invalid input / Đăng ký chấp nhận tài khoản mới và từ chối đầu vào không hợp lệ (added 2026-11-05, draft)

- Description: submitting the form with a new email creates an account; a duplicate email, a malformed email or a weak password does not.
- Source: SRC-02 (the form); behavior **not observed**
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): (1) a new email with a valid name and password creates the account and the user is signed in or sent to `/login`; (2) a duplicate email is rejected with an error; (3) a malformed email is rejected; (4) a weak or empty password is rejected; in cases 2 to 4 no account is created.
- Related platform: `web`
- Notes: the password rules and the messages are unknown (Q5, Q6). **The assistant does not sign up on this host** (no test label); a human types the values. The real test account used by the login cases is created by the human here.

## Conflicts between sources

| REQ | Source A says | Source B says | Who decides |
|---|---|---|---|
| none | | | |

## Assumptions (need confirmation)

- The host `vlog-ai-powered-assistant.vercel.app` is a deployment holding **test data only**, as the user stated ("this is for test"). Its name has no test label, so the assistant types **no credentials** on it; the human does, from their own environment variables (for example `QA_TEST_USER`, `QA_TEST_PASSWORD`). The user may switch to `localhost` or a test-labelled host to let the agent type.
- The behavior after submit (REQ-002 to REQ-004) is assumed from general practice.
- Each test starts logged out (a fresh browser context).
- Scope on 2026-11-05: `/login` (REQ-001 to REQ-003, approved) and, added at the user's request ("create test data"), `/register` (REQ-005, REQ-006, draft). The assistant creates no account on this host.

## Sensitive data encountered

None seen. The page prints no credentials.

## Open questions

If this section is not empty, the workflow must stop and ask a human (uncertainty_policy: stop_and_ask).

- Q1: After a successful sign-in, where should the browser go and what should be shown? (Assumed: it leaves `/login` and a signed-in area appears; exact page recorded from the human run.)
- Q2: What should a wrong password or an unknown email show? (Assumed: stay on `/login` with an error message; wording recorded from the human run.)
- Q3: Should empty fields be tested (REQ-004)? (Assumed: optional, only if you ask.)
- Q4: Which dedicated test account (email) exists on this deployment? (Only the variable names are needed; the human supplies the values.)
- Q5 (REQ-006): What are the password rules (minimum length, character types)? (Assumed: unknown; recorded from the human run.)
- Q6 (REQ-006): Is the user signed in after registering, or sent to `/login`, and what do duplicate-email and invalid-input errors say? (Assumed: loose checks; wording recorded from the human run.)
- Q7: May the human create one or more test accounts (and leave them) on this deployment for these tests? (Assumed: yes, test data only.)

Status of REQ-005 and REQ-006: **approved** (approver: Boss-QA, the user; date: 2026-11-05; "Use assumptions, approve"). Q5 to Q7 are answered by the stated assumptions.
