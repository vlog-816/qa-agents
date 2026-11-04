# Automation selection and code review: The Internet practice site, login happy case / Lựa chọn tự động hóa và review code: đăng nhập thành công

- Feature ID: DEMO-004
- Date: 2026-11-04
- By: automation-tester
- Framework: playwright / typescript (`automation.framework` / `automation.code_language`)
- Gate `automation` (selection): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "Approve selection"; TC-001, per-spec host list, loose success check first)
- Gate `automation` (code review): TC-001 approved (2026-11-04, see `01-review.md`); TC-002 and TC-003 not started

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

---

## Amendment 2026-11-04: TC-002 and TC-003 / Bổ sung 2026-11-04: TC-002 và TC-003

- Gate `automation` (selection, amendment): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "Approve with recommendations"). / **Đã duyệt.**
- Scope: only the selection (Step 0 and Step 1). The approval above for TC-001 is not changed by this amendment. / Chỉ phần lựa chọn; phê duyệt TC-001 ở trên không đổi.

### Step 0 check for the amendment / Kiểm tra Step 0 cho phần bổ sung

| Precondition | Result | Source |
|---|---|---|
| Data gate PASS, no waivers | ok | `00-data-gate.md` (PASS, 2026-11-04). Scope text mentions the login happy case; the host and the credential conditions are the same for TC-002/TC-003. See open question 8. |
| Requirements REQ-003, REQ-004 approved with assumptions Q4, Q5, Q6 | ok | `01-requirements.md` (approved 2026-11-04, "Use assumptions, approve"). Both are `ambiguous` / `low` confidence (wording not observed). |
| Test plan covers TC-002, TC-003 | ok | `03-test-plan.md` section 5 and amendment (approved by Boss-QA, 2026-11-04, "Approve plan and cases"). |
| TC-002, TC-003: `review_status: approved`, `automation_candidate: yes` | ok | `04-test-cases.md` (reviewed 2026-11-04). |
| Execution report with "Passed" | **not met** (same deviation as A1) | No earlier manual or exploratory run exists. See A4. |
| TC-001 selection and code review approved | ok | This file (selection), `01-review.md` (code review "Approve code"). TC-001 is **not yet run** by the human. |

Assumptions for the amendment (same as before) / Giả định:

- **A4 (no prior execution for TC-002 and TC-003).** There is no earlier manual or exploratory run and no "Passed" result for these cases. The first human-run script execution would be the first real execution. The user accepted this for TC-001 (A1); **whether it also applies to TC-002 and TC-003 is an open question (Q7) and needs an explicit answer.** / Cần xác nhận A1 có áp dụng cho TC-002 và TC-003 không.
- **A2 (applies unchanged).** The AI never types on this site. The human runs the script in their own terminal and reports back only non-secret details (pass/fail, the visible error text). / AI không bao giờ gõ gì trên trang này; con người chạy script.
- **A5 (error wording assumed).** The error texts (username invalid, password invalid) are assumed from the approved requirements (Q4, Q5), not observed. A mismatch in the first run is not automatically a product defect; the approver decides. / Câu chữ lỗi là giả định.

### Part A. Selection (amendment) / Phần A. Lựa chọn (bổ sung)

| TC | REQ | Automate? (yes / no) | Why (stable, repeatable) or why not | Data needed | Risks |
|---|---|---|---|---|---|
| TC-002 | REQ-003 | yes | Approved, `automation_candidate: yes`. Short linear flow (open, fill, submit, check). Independent of other cases; each run starts logged out in a fresh context. Needs no environment variable and no account, so it is the lowest-risk case for credentials. / Ca duyệt, luồng ngắn, độc lập, không cần biến môi trường. | Invalid username and random password, both **generated at run time** (node `crypto`), kept in memory only; never written to a file, printed, attached, annotated or put in a title. No environment variable. | Error wording assumed (A5). Shared public site may change. Random value must not collide with a real username (see approach). Fill or click failure logs could echo typed values. |
| TC-003 | REQ-004 | yes | Approved, `automation_candidate: yes`. Same short linear flow. Independent; fresh context per run. / Ca duyệt, luồng ngắn, độc lập. | `QA_TEST_USER` (env var NAME only; fail fast if unset or empty). Wrong password **generated at run time**, in memory only. **`QA_TEST_PASSWORD` is NOT used and NOT read in TC-003.** | Error wording assumed (A5). Repeated failed logins on the real test user: the site might throttle or lock the account (unknown; this practice site is not known to do so, not verified). Wrong password must not equal the real one (see approach). Uses the real username, so it must never be printed. |

Cases skipped: none. / Ca bỏ qua: không có.

### Risks (amendment) / Rủi ro (bổ sung)

1. **Typed values in Playwright call logs.** A failing `fill` or `click` can print the typed value in its call log. The invalid values are fake, but they should not leak patterns, and in TC-003 the username is the real `QA_TEST_USER`. The credential-entry wrapper must cover all typed values in both specs, and replace any error with a fixed message (no original message, no stack), as in TC-001. / Nhật ký lệnh của Playwright có thể chứa giá trị đã gõ; wrapper phải che cả giá trị giả.
2. **Collision of generated values with real ones.** A random unknown username could equal the real `QA_TEST_USER` (very unlikely), and a random wrong password could equal the real `QA_TEST_PASSWORD` (very unlikely). The check is done in memory only, without printing or attaching (see approach).
3. **Error wording assumed (A5).** The loose check may fail on a different wording, or match unrelated text. First-run triage by the human and the approver.
4. **Public shared site** (third party): may be down, slow or changed at any time.
5. **No prior execution (A4).** Script problems and product differences cannot be told apart before the first run.
6. **Account throttling** for the real test user in TC-003 (unknown, not verified).
7. **Test output files.** On failure Playwright may write page-state files (for example `error-context.md`) into `test-results/`; whether they can contain the typed values is not verified. Same rule as TC-001: the human deletes `test-results/` and `playwright-report/` after every run before sharing or committing.
8. **Hint credentials on the page** are not used or copied. External links are not clicked; the guard aborts other hosts.

### Proposed approach (amendment) / Cách tiếp cận đề xuất (bổ sung)

(No code is written at this step. Everything below needs approval first. / Chưa viết code ở bước này.)

- **New specs:** `tests/DEMO-004/tc-002.spec.ts` (title starts with `TC-002`, tag `@REQ-003`, annotation `REQ`) and `tests/DEMO-004/tc-003.spec.ts` (title starts with `TC-003`, tag `@REQ-004`, annotation `REQ`). One test per file, steps and expected results in the order of the approved cases.
- **Same style as `tc-001.spec.ts`:** per-spec `test.use({ allowedHosts: ['the-internet.herokuapp.com'], baseURL: 'https://the-internet.herokuapp.com', trace: 'off', screenshot: 'off', video: 'off' })`. Headless, project `chromium`, `retries: 0` from the unchanged config. `host-guard.ts` and `playwright.config.ts` are not changed.
- **Shared tiny helper** `tests/helpers/login-page.ts` (new), with two parts:
  1. **Sanitized credential-entry wrapper:** fills the Username and Password fields and clicks Login; any error is replaced by a fixed message (no original message, no stack). It takes the values as arguments and covers **all** typed values (the fake ones too), so a failing `fill` cannot echo them.
  2. **Random fake value generator:** uses node `crypto` (`randomBytes`), not `Math.random`. Fixed-length lowercase hex (proposal: 16 hex characters, for example a prefix-free string, so the value is lowercase letters and digits only). Values are created inside the test at run time, never stored.
- **Collision guard (in memory only):** TC-002 compares the generated username with `process.env.QA_TEST_USER` if that variable happens to be set (it is not required for TC-002, so the check runs only when the variable exists) and regenerates on a match. TC-003 compares the generated password with `process.env.QA_TEST_PASSWORD` **only if that variable exists** and regenerates on a match. Reading `QA_TEST_PASSWORD` inside TC-003 for this comparison is a point that conflicts with "QA_TEST_PASSWORD is not used in TC-003", so I propose NOT to read it at all in TC-003 and rely on the 64-bit random value (a collision is practically impossible); see open question 3. The comparison, if approved, never prints, attaches or annotates a value, and the failure message names no value.
- **TC-003 credentials:** read `process.env.QA_TEST_USER` only; fail fast with a message naming the VARIABLE (never a value) if it is unset or empty; no default. `QA_TEST_PASSWORD` is never referenced in `tc-003.spec.ts`.
- **Assertions (loose, as in TC-001; web-first, no fixed sleeps):**
  - Step 1: open `/login`; username and password empty; Login button enabled (same checks as TC-001).
  - Steps 2 and 3: enter the values through the wrapper; click Login.
  - Step 4, TC-002: `toHaveURL(/\/login$/)`; an error message visible whose text matches `/username/i` and `/invalid/i` (loose, case-insensitive; implemented as one visible text match, for example a regex that requires both words); the Username and Password fields and the Login button are visible again (form shown again); no link or button named `/logout/i`; the page is not `/secure`.
  - Step 4, TC-003: `toHaveURL(/\/login$/)`; an error message visible whose text matches `/password/i` and `/invalid/i` loosely; no Logout control; the page is not `/secure`.
  - The error message is located by visible text (no markup selector), because the markup was not inspected. This is UNVERIFIED until the first human run.
- **No separate "password not shown in clear text" assertion** (same gap as TC-001, recorded, nothing invented).
- **Refactor of `tc-001.spec.ts`:** recommendation **NO**. TC-001 is approved at code review and not yet run; changing it would invalidate that approval and mix two changes. The small duplication of the entry wrapper is accepted for now. A later refactor can be proposed after the first runs.
- **Run (Step 4, later):** the human runs one spec at a time in their own terminal, for example `npx --no-install playwright test tests/DEMO-004/tc-002.spec.ts --project=chromium`, then deletes `test-results/` and `playwright-report/`. TC-002 needs no environment variable; TC-003 needs only `QA_TEST_USER`. The AI does not run these.
- **Not touched:** requirements, test cases, test plan, `qa-profile.yaml`, `00-data-gate.md`, `tc-001.spec.ts`, DEMO-002 specs.
- **Next gates:** Step 2 (write scripts) only after you approve this amendment; then Step 3 code review gate (`01-review.md` Part B for TC-002 and TC-003); then the human runs the specs.

### Install needs (amendment) / Cần cài đặt (bổ sung)

None. `crypto` is a built-in node module; `@playwright/test` and Chromium are already installed. / Không cần cài gì.

### Open questions (amendment) / Câu hỏi mở (bổ sung)

1. **Refactor of `tc-001.spec.ts`** to use the new helper: recommended NO (leave the approved spec untouched). Confirm or choose yes.
2. **Random value format:** is a fixed-length lowercase hex string from node `crypto` (proposal: 16 characters) acceptable for the unknown username and the wrong password? Or do you want a different length or a letters-only format?
3. **Collision guard in TC-003:** to compare the generated password with the real `QA_TEST_PASSWORD`, the script would have to read that variable, which conflicts with "QA_TEST_PASSWORD is not used in TC-003". Proposal: do NOT read it in TC-003 and rely on the random value. Confirm. For TC-002, comparing with `QA_TEST_USER` only when it is set: acceptable?
4. **Strictness of the error text check until the first human run:** proposal is loose (the message contains "username" or "password" respectively, plus "invalid", case-insensitive), then tighten to the exact text recorded from the first run. Confirm, or choose exact now.
5. **TC-002 and the password field after the failed login:** should the script also assert that the password field is empty again (and the username field state)? The approved case says only "the login form is shown again". Proposal: assert only that the form fields and the Login button are visible, because asserting empty values is not in the approved case and I must not invent expected results. If you want the empty-field check, the case must be changed by the manual-tester first.
6. **Throttling of the test user (TC-003):** acceptable to run TC-003 against the real `QA_TEST_USER` account on the public site, given that lockout behavior is unknown?
7. **A4:** does the acceptance of "no prior execution; the first human-run execution is the first real execution" (A1 for TC-001) also apply to TC-002 and TC-003? Needed before approval.
8. **Data gate scope:** `00-data-gate.md` describes the "login happy-case check". The host, data class and conditions are the same for TC-002 and TC-003. Is that sufficient, or do you want the `data-guard` pre-run mode run again for the amended scope before the human runs the specs? (I do not edit `00-data-gate.md`.)
9. **Existing `00-selection.md` header:** it still says "code review: not started" although `01-review.md` shows approved. I left the old text untouched on purpose; please confirm if you want it corrected.

### Approval (amendment) / Phê duyệt (bổ sung)

- Status: **approved.** / **Đã duyệt.**
- Approver: Boss-QA (the user, in chat: "Approve with recommendations")
- Date: 2026-11-04
- Decisions that override earlier notes: the user accepted the main session's recommended answers to all nine open questions: (1) do not refactor `tc-001`; (2) 16-character lowercase hex for random values; (3) TC-003 does not read `QA_TEST_PASSWORD`, TC-002 compares with `QA_TEST_USER` only when it is set; (4) loose error-text check first; (5) no "password field empty" assertion in TC-002; (6) TC-003 against the real test user is acceptable; (7) the first human run is the first real execution for TC-002 and TC-003 too; (8) the main session re-runs the Data Guard pre-run for the amended scope; (9) the old header line is corrected.

### Tóm tắt tiếng Việt / Vietnamese summary

- Chọn tự động hóa cả TC-002 (REQ-003, username không tồn tại) và TC-003 (REQ-004, mật khẩu sai của `QA_TEST_USER`): đều là `yes`.
- Dữ liệu: giá trị giả sinh khi chạy bằng node `crypto`, chỉ ở trong bộ nhớ, không ghi file, không in, không đính kèm. TC-003 chỉ dùng `QA_TEST_USER`, KHÔNG dùng `QA_TEST_PASSWORD`.
- Cách làm: hai spec mới `tc-002.spec.ts`, `tc-003.spec.ts` cùng phong cách `tc-001` (allowedHosts theo spec, baseURL qua `test.use`, trace/screenshot/video tắt), thêm helper nhỏ `tests/helpers/login-page.ts` (wrapper che lỗi cho cả giá trị giả, bộ sinh giá trị ngẫu nhiên). Khuyến nghị KHÔNG sửa `tc-001`.
- Kiểm tra lỏng: URL vẫn là `/login`, thông báo lỗi hiển thị có "username"/"password" và "invalid" (không phân biệt hoa thường), không có Logout, form hiện lại.
- Rủi ro chính: nhật ký lệnh có thể lộ giá trị đã gõ, câu chữ lỗi chỉ là giả định, trang công cộng có thể đổi, chưa có lần chạy trước (A4), có thể bị giới hạn đăng nhập sai với tài khoản thử (chưa kiểm chứng).
- Cổng chọn lựa cho phần bổ sung: **đang chờ con người duyệt**, chưa được duyệt. Chưa cài gì, chưa chạy gì.
