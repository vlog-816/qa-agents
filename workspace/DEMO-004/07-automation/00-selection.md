# Automation selection and code review: The Internet practice site, login happy case / Lựa chọn tự động hóa và review code: đăng nhập thành công

- Feature ID: DEMO-004
- Date: 2026-11-04
- By: automation-tester
- Framework: playwright / typescript (`automation.framework` / `automation.code_language`)
- Gate `automation` (selection): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "Approve selection"; TC-001, per-spec host list, loose success check first)
- Gate `automation` (code review): not started (Part B is not started)

## Inputs / Đầu vào

- `00-data-gate.md`: PASS (2026-11-04), no waivers, with credential conditions (see below). / PASS, không waiver, có điều kiện về thông tin đăng nhập.
- `01-requirements.md`: gate "requirements" approved (Boss-QA, 2026-11-04, assumptions accepted).
- `03-test-plan.md`: gate `test_plan` approved (Boss-QA, the user, 2026-11-04).
- `04-test-cases.md`: TC-001 is `review_status: approved`, `automation_candidate: yes`.
- Execution report: **none** (see assumption A1 below). / **Không có** báo cáo chạy (xem giả định A1).
- Host `the-internet.herokuapp.com` is listed in `data.allowed_hosts` in `qa-profile.yaml` (read today); `blocked_hosts` is empty and `no_production_hosts: true`.

### Deviations from the normal Step 0 / Khác biệt so với Step 0 thông thường

These are recorded as assumptions that need the human's acceptance. / Ghi lại như giả định cần con người chấp nhận.

- **A1 (no prior execution, no "Passed" result).** This feature was not run exploratory or manual, so there is no `06-report` and no Passed result for TC-001. Reason: the AI may not type credentials on this third-party site. The first scripted run, done by the HUMAN in their own terminal, is the first and real execution of TC-001. The normal precondition ("report shows results gate approved and cases Passed") is therefore NOT met and is replaced by this assumption. Needs the human's acceptance before the selection is approved.
  / Tính năng này chưa từng được chạy thủ công; không có báo cáo và không có kết quả "Passed". Lần chạy script đầu tiên do CON NGƯỜI thực hiện trong terminal của họ là lần thực thi thật đầu tiên. Cần con người chấp nhận.
- **A2 (credential step is run by the human only).** The AI does not run the script that types credentials, does not read the environment variables, and sees no value. Credentials exist only as the human's environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`. In the later Step 4, the human runs the command and gives the AI only the pass/fail summary (no values).
  / Bước nhập thông tin đăng nhập chỉ do con người chạy; AI không đọc biến môi trường.
- **A3.** The post-login behavior (`/secure`, success message, Logout control) is an assumption from the approved requirements (Q1, Q2), not observed. A mismatch in the first run is not automatically a product defect; the approver decides.

## Part A. Selection / Phần A. Lựa chọn

| TC | REQ | Automate? (yes / no) | Why (stable, repeatable) or why not | Data needed | Risks |
|---|---|---|---|---|---|
| TC-001 | REQ-001, REQ-002 | yes | Approved, `automation_candidate: yes`. One short linear flow (open, fill, submit, check). No data setup, no dependency on other cases, each run starts logged out in a fresh context. Locators by label/role are available (Username, Password, Login). / Ca duyệt, luồng ngắn, độc lập, bắt đầu từ trạng thái chưa đăng nhập. | Env var NAMES only: `QA_TEST_USER`, `QA_TEST_PASSWORD`. No value in any file. | See risk list below. |

Cases skipped: none (the plan has one case). / Ca bỏ qua: không có.

### Risks / Rủi ro

1. **Credential leak** into trace, video, screenshot, log or report. Mitigation: trace, screenshot and video OFF for this spec; no logging or attaching of the values; Data Guard post-run.
2. **Public shared site** (third party): may be down, slow or changed at any time; not under our control. Possible false failure.
3. **Assumed post-login behavior** (A3): exact success text and address not observed; may differ.
4. **No prior execution** (A1): script problems (locator, timing) and product differences cannot be told apart before the first run; the first failure needs human triage.
5. **Host guard currently allows only `demowebshop.tricentis.com`** and the config `baseURL` is that host; both must change (see below) without breaking DEMO-002.
6. **Hint credentials on the page**: the page prints practice credentials; the script must not use or copy them.
7. External links on the page (GitHub, Elemental Selenium, Sauce Labs) must not be clicked; the guard also aborts requests to other hosts.

## Proposed approach / Cách tiếp cận đề xuất

(No code is written at this step. Everything below needs approval first. / Chưa viết code ở bước này.)

- **Layout (standard Playwright):** keep the existing `playwright.config.ts` at the repository root (`testDir: './tests'`) and `tests/helpers/host-guard.ts`. New spec: `tests/DEMO-004/tc-001.spec.ts`. If useful, a tiny page helper `tests/helpers/the-internet-login-page.ts` (locators by label/role only). One test, title starts with `TC-001`, annotation carries `REQ-001` and `REQ-002`.
- **Host guard change (to be approved):** the guard list becomes configurable while the current DEMO-002 behavior stays the default. Proposed option 1: the helper exports `ALLOWED_HOSTS` containing `demowebshop.tricentis.com` and `the-internet.herokuapp.com` (both a subset of `data.allowed_hosts`; `localhost` is still not used and not listed), and the existing check "baseURL host must be in the list" stays. Proposed option 2 (stricter): a per-spec option, for example `test.use({ allowedHosts: ['the-internet.herokuapp.com'] })` as a Playwright option fixture, with the default `['demowebshop.tricentis.com']`, so each spec only reaches its own host. Recommendation: option 2, because DEMO-004 then cannot reach the demo shop and DEMO-002 cannot reach the-internet. The DEMO-002 specs must keep working unchanged (same default, same behavior); I will compare them by reading the code and re-run them only if the human asks.
- **baseURL:** the config `baseURL` is currently `https://demowebshop.tricentis.com`. For DEMO-004 the spec (or a second config project/`test.use`) sets `baseURL: 'https://the-internet.herokuapp.com'`. Proposal: `test.use({ baseURL: ... })` in the DEMO-004 spec file, no change to the DEMO-002 default. The helper's second-barrier check then validates the effective baseURL against the per-spec list.
- **Run settings:** headless, project `chromium` (single), `retries: 0`.
- **For this spec only:** `trace: 'off'`, `screenshot: 'off'`, `video: 'off'` via `test.use(...)`, overriding the config's `trace: 'retain-on-failure'` and `screenshot: 'only-on-failure'`. The host-guard `blocked-hosts.json` attachment contains hostnames only, which is acceptable.
- **Credentials:** read `process.env.QA_TEST_USER` and `process.env.QA_TEST_PASSWORD`; fail fast with a clear message naming the VARIABLE (never a value) if either is unset or empty; no defaults; never log, print, attach or put them in an error message or title; do not use the credentials printed on the page; do not click external links.
- **Steps and assertions:** exactly the steps of TC-001, in order: open `/login`; assert the form (empty username, empty password, enabled Login button; password field is type password); fill both; click Login; assert URL `/secure`; assert a success message is visible and a Logout control is available; assert no error message. Web-first assertions, no fixed sleeps.
- **Not touched:** requirements, test cases, `qa-profile.yaml`, `00-data-gate.md`.
- **Next gates:** Step 2 (write scripts) only after you approve this selection; then Step 3 code review gate; then the human runs the script in their own PowerShell session.

## Install needs / Cần cài đặt

None. The runner `@playwright/test` 1.64.1 and the Chromium build are already installed. / Không cần cài gì.

## Open questions / Câu hỏi mở

1. **Assumption A1:** do you accept that there is no prior execution report or "Passed" result, and that the first human-run script execution is the first real execution of TC-001? (Needed before approval.)
2. **Assumption A2:** do you confirm that you (the human) run the credential step and only report pass/fail and non-secret text back to the AI?
3. **Guard list:** option 1 (shared list with both hosts) or option 2 (per-spec allowed list, recommended)? And is `test.use({ baseURL })` in the spec acceptable instead of changing the config default?
4. **Success message text:** assert exactly or loosely until the first human run? Proposal: loose first (a visible success message region that contains the word "logged in" case-insensitively, plus the Logout control and the `/secure` URL), then tighten to the exact text recorded from your first run. Please confirm or choose exact.
5. **Logout control:** assert it as a link or button named "Logout" (role-based, case-insensitive)? Please confirm.
6. Should any non-secret result detail (for example the exact success text) be passed back by you, since I do not see the run output otherwise?

## Answers from the user (2026-11-04, in chat) / Câu trả lời của người dùng

1. A1 accepted: the first human-run script execution is the first real execution of TC-001.
2. A2 confirmed: the human runs the credential step in their own terminal and reports back only non-secret details (pass/fail, exact success text).
3. Guard list: **per-spec allowed list** (default stays `demowebshop.tricentis.com`; the DEMO-004 spec sets its own list and `baseURL` with `test.use`).
4. Success message: **loose first** (address `/secure`, a success message containing "logged in" case-insensitively, a Logout control); tightened to the exact text after the first human run.
5. Logout control: asserted by role (link or button named "Logout", case-insensitive), accepted as proposed (the user did not object; confirm at code review).
6. Non-secret result details are passed back by the user (covered by A2).

## Part B. Code review / Phần B. Review code

Not started. / Chưa bắt đầu.

## Approval / Phê duyệt (selection)

- Status: approved. / Đã duyệt.
- Approver: Boss-QA (the user, in chat: "Approve selection")
- Date: 2026-11-04
- Decisions that override earlier notes: ______
