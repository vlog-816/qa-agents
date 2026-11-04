# Requirements: The Internet practice site, login happy case / Yêu cầu: đăng nhập thành công

- Feature ID: DEMO-004
- Analysis date: 2026-11-04
- By: Claude (main session, no ba-analyst agent yet)
- Gate "requirements" status: approved (approver: Boss-QA, the user; date: 2026-11-04; approved in chat with "Use assumptions, approve")

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

> Note / Lưu ý: these requirements are **observed from the public page** (read only, nothing typed), not taken from an official spec. The behavior after a successful login could not be observed, because the AI must not type credentials on a third-party site; it is an assumption until the approver (acting as BA) or the human run confirms it. / Hành vi sau khi đăng nhập thành công không quan sát được; đó là giả định cho đến khi người duyệt hoặc lần chạy của con người xác nhận.

## Sources

| Source ID | Type | Reference | Notes |
|---|---|---|---|
| SRC-01 | web | https://the-internet.herokuapp.com/login | Third-party public practice site, viewed 2026-11-04 with playwright-cli (open, screenshot, snapshot, close; no typing, no submit). **No screenshot or snapshot is kept in `evidence/`**: the page prints its own practice credentials as a hint, and Data Guard condition says they must not be copied anywhere; both files were deleted. The structure below was read with the credential lines filtered out. |

## Requirements

### REQ-001: The login page offers a login form / Trang đăng nhập có form đăng nhập

- Description: the page `/login` (title "The Internet") has the heading "Login Page", a hint text that says which username and password to enter and that wrong information shows error messages, a "Username" field, a "Password" field and a "Login" button. External links on the page (GitHub, Elemental Selenium, Sauce Labs) are not used.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria (assumed): the login form is displayed with an empty username field, an empty password field and an enabled "Login" button.
- Related platform: `web`
- Notes: the first field is a **username**, not an email.

### REQ-002: A user logs in with a valid username and password / Đăng nhập bằng username và mật khẩu hợp lệ (happy case)

- Description: entering a valid username and password and choosing "Login" signs the user in.
- Source: SRC-01 (the form and the hint text); the result is **not observed** (no typing by the AI)
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): after a successful login (1) the browser goes to the secure area page (address `/secure`); (2) a success message is shown on the page; (3) a "Logout" control is available; (4) no error message is displayed.
- Related platform: `web`
- Notes: the secure area page and its message are known from general knowledge of this practice site, not observed by us; confirm in the human run (Q1, Q2). Credentials only as the human's environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`; never in a file or in chat.

### REQ-003: An unknown username is rejected with an error / Username không tồn tại bị từ chối kèm lỗi (added 2026-11-04, approved with assumptions 2026-11-04)

- Description: entering a username that does not exist (any generated fake value) with any password and choosing "Login" does not sign the user in.
- Source: SRC-01 (the hint text says that wrong information shows error messages); the exact message is **not observed** (no typing by the AI)
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): (1) the user stays on the login page (address `/login`); (2) an error message is displayed that says the username is invalid; (3) no secure-area page is shown and no Logout control appears; (4) the form is shown again.
- Related platform: `web`
- Notes: the message wording is assumed from general knowledge of this practice site; confirm in the human run (Q4). The fake username and password are **generated at run time** by the script (random strings), never stored in a file.

### REQ-004: A wrong password for the test user is rejected with an error / Mật khẩu sai của người dùng thử bị từ chối kèm lỗi (added 2026-11-04, approved with assumptions 2026-11-04)

- Description: entering the valid username (from `QA_TEST_USER`) with a generated wrong password and choosing "Login" does not sign the user in.
- Source: SRC-01 (the hint text); the exact message is **not observed**
- Status: `ambiguous`
- Confidence: `low`
- Acceptance criteria (assumed): (1) the user stays on the login page (`/login`); (2) an error message is displayed that says the password is invalid; (3) no secure-area page is shown and no Logout control appears.
- Related platform: `web`
- Notes: the wrong password is generated at run time (a random string that is not the real password); the real `QA_TEST_PASSWORD` is not used in this case. Confirm the message wording in the human run (Q5).

### Scope of this round / Phạm vi lần này

- In scope: REQ-001 and REQ-002 (approved, login happy case); **REQ-003 and REQ-004 (added 2026-11-04, approved by the approver in chat with "Use assumptions, approve": wrong or unknown credentials)**.
- Out of scope: empty fields, access to the secure page without login, logging out, the password-masked check, other pages of the site, the external links (kept out by the user's selection on 2026-11-04).

## Conflicts between sources

| REQ | Source A says | Source B says | Who decides |
|---|---|---|---|
| none | | | |

## Assumptions (need confirmation)

- The post-login behavior in REQ-002 is assumed (Q1, Q2).
- The practice credentials the page shows are public, but they are treated as data: the AI does not type them and does not copy them; the human supplies them from their own environment variables.
- Each test starts logged out (a fresh browser context); a shared public site may change at any time.

## Sensitive data encountered

The page itself prints practice credentials as a hint. They are **not copied** into any file, report, evidence or chat. No other sensitive data was seen.

## Open questions

If this section is not empty, the workflow must stop and ask a human (uncertainty_policy: stop_and_ask).

Decision 2026-11-04 (approver, in chat): "Use assumptions, approve". Q1, Q2 and Q3 are answered by the stated assumptions. The exact success text is recorded from the human run.

- Q1 (answered: assumption accepted): After a successful login, should the browser be on the page with the address `/secure`? (Assumed: yes.)
- Q2: What should be shown there: a success message and a "Logout" control? (Assumed: yes; the exact text is recorded from the human run.)
- Q3: Is it acceptable that the human supplies the practice credentials through the environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`, even though the site publishes them? (Assumed: yes; same procedure as any other account.)
- Q4 (answered: assumption accepted 2026-11-04, for REQ-003): After a login attempt with an unknown username, should the user stay on `/login` and see an error that says the username is invalid? (Assumed: yes.)
- Q5 (answered: assumption accepted 2026-11-04, for REQ-004): After a wrong password for the test user, should the user stay on `/login` and see an error that says the password is invalid? (Assumed: yes.)
- Q6 (answered: assumption accepted 2026-11-04): Are random fake values, generated by the script at run time and never stored, acceptable as the invalid username and the wrong password? (Assumed: yes.)
