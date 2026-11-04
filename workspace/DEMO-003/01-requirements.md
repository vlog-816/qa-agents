# Requirements: Demo Web Shop, login happy case / Yêu cầu: đăng nhập thành công

- Feature ID: DEMO-003
- Analysis date: 2026-11-04
- By: Claude (main session, no ba-analyst agent yet)
- Gate "requirements" status: draft (approver, date: ______)

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

> Note / Lưu ý: these requirements are **observed from the public page** (read only, nothing typed), not taken from an official spec. The behavior after a successful login could not be observed, because the AI must not create an account or type a password; it is an assumption until the approver (acting as BA) or the human run confirms it. / Hành vi sau khi đăng nhập thành công không quan sát được; đó là giả định cho đến khi người duyệt hoặc lần chạy của con người xác nhận.

## Sources

| Source ID | Type | Reference | Notes |
|---|---|---|---|
| SRC-01 | web | https://demowebshop.tricentis.com/login | Public practice site, viewed 2026-11-04 with playwright-cli (open, screenshot, snapshot, close; no typing, no submit). Evidence: `evidence/run-1/login-1.png`, `login-1-snapshot.yml` |

## Requirements

### REQ-001: The login page offers a login form for returning customers / Trang đăng nhập có form cho khách hàng cũ

- Description: the page `/login` has the heading "Welcome, Please Sign In!" and a "Returning Customer" block with an "Email:" field, a "Password:" field, a "Remember me?" checkbox, a "Forgot password?" link and a "Log in" button. A "New Customer" block offers a "Register" button.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): the login form is displayed with an empty email field, an empty password field, an unchecked "Remember me?" and an enabled "Log in" button.
- Related platform: `web`
- Notes: the header shows "Register" and "Log in" links and the cart and wishlist counters (0) for a visitor who is not logged in.

### REQ-002: A returning customer logs in with a valid email and password / Khách hàng cũ đăng nhập bằng email và mật khẩu hợp lệ (happy case)

- Description: entering the email and the password of an existing account and choosing "Log in" signs the customer in.
- Source: SRC-01 (the form and the button); the result is **not observed** (no account, no typing by the AI)
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): after a successful login (1) the browser leaves `/login` and the site home page is shown; (2) the header no longer shows the "Register" and "Log in" links; it shows the account email as a link to the account page and a "Log out" link; (3) no error message is displayed.
- Related platform: `web`
- Notes: this behavior is common for this shop software, but must be confirmed (Q1, Q2). The test uses an account created by a human; credentials only as the human's environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`, never in a file or in chat.

### Scope of this round / Phạm vi lần này

- In scope: REQ-001 and REQ-002 (login happy case only).
- Out of scope: wrong or empty credentials, "Remember me?", "Forgot password?", registering an account, logging out, the account pages, the cart and checkout after login.

## Conflicts between sources

| REQ | Source A says | Source B says | Who decides |
|---|---|---|---|
| none | | | |

## Assumptions (need confirmation)

- The post-login behavior in REQ-002 is assumed (see Q1, Q2).
- A test account exists, created by the human on the public shared demo site with fake data; the site data can change at any time.
- Each test starts logged out (a fresh browser context), so no logout step is needed.

## Sensitive data encountered

None in the page. The only sensitive items are the test account credentials: **never copied anywhere**; handled only as the human's environment variables (see `00-data-gate.md`, conditions C1 to C8).

## Open questions

If this section is not empty, the workflow must stop and ask a human (uncertainty_policy: stop_and_ask).

- Q1: After a successful login, which page should be shown: the home page? (Assumed: the home page.)
- Q2: What should the header show after a successful login: the account email as a link and a "Log out" link instead of "Register" and "Log in"? (Assumed: yes.)
- Q3: Who creates the test account, and is it a dedicated account with a fake email (as the Data Guard conditions require)? (Assumed: the human, before the run.)
- Q4: Should the test check anything about "Remember me?" in the happy case? (Assumed: leave it unchecked, no check.)
