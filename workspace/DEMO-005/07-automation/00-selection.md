# Automation selection and code review: login smoke test of the Vercel app / Lựa chọn tự động hóa và review code: smoke test đăng nhập app Vercel

- Feature ID: DEMO-005
- Date: 2026-11-05
- By: automation-tester
- Framework: playwright / typescript (`automation.framework` / `automation.code_language`)
- Gate `automation` (selection): approved (approver: Boss-QA, the user; date: 2026-11-05; "Approve with recommendations")
- Gate `automation` (code review): not started

## Inputs / Đầu vào

- `00-data-gate.md`: **not present** (Data Guard is optional and was not requested; see question 6). / Không có (Data Guard là tùy chọn, chưa yêu cầu).
- `qa-profile.yaml` (read today): host `vlog-ai-powered-assistant.vercel.app` IS in `data.allowed_hosts`. `no_production_hosts` is still `true` and `blocked_hosts` is `[]` (the user's edit is pending, see risk R4).
- `01-requirements.md`: approved 2026-11-05 (Boss-QA).
- `03-test-plan.md`: approved 2026-11-05, plus the approved amendment "production smoke test" (TC-004 to TC-006 withdrawn).
- `04-test-cases.md`: TC-001, TC-002, TC-003 are `review_status: approved`, `automation_candidate: yes` (run by the human). TC-004 to TC-006 are `withdrawn` and are NOT selected.
- Execution report: **none** (see assumption A1). / **Không có** báo cáo chạy (xem A1).

### Deviations from the normal Step 0 / Khác biệt so với Step 0 thông thường

- **A1 (no prior execution, no "Passed" result).** This is the first execution for DEMO-005, same as DEMO-004 (accepted there, see `workspace/DEMO-004/07-automation/00-selection.md`). There is no `06-report` and no Passed result. The first scripted run, done by the HUMAN in their own terminal, is the first real execution. The normal precondition (results gate approved, cases Passed) is NOT met and is replaced by this assumption. **Needs the human's acceptance.** This is not treated as a blocker. / Chưa có lần chạy trước; lần chạy script đầu tiên do con người thực hiện là lần thực thi thật đầu tiên. Cần con người chấp nhận.
- **A2 (credential step run by the human only).** The AI never types on this host, never reads the environment variables and sees no value. The human runs each spec once in their own terminal with `QA_TEST_USER` (holds the email) and `QA_TEST_PASSWORD` set from their own session, and reports back only non-secret details (pass/fail, visible error text, post-login address).
- **A3 (post-login page and error wording assumed).** Not observed (requirements Q1, Q2). Checks are loose; a mismatch in the first run is not automatically a product defect, the approver decides. Loose checks may also give a false pass.
- **A4 (production host).** The plan treats this as a "production smoke test" on a host with no test label. The profile edit (`no_production_hosts: false`) and the `CLAUDE.md` wording are the user's job and are pending. The AI edits neither.

## Part A. Selection / Phần A. Lựa chọn

| TC | REQ | Automate? (yes / no) | Why (stable, repeatable) or why not | Data needed | Risks |
|---|---|---|---|---|---|
| TC-001 | REQ-001, REQ-002 | yes | Approved, `automation_candidate: yes`. Short linear flow (open `/login`, check form, fill, click "Sign in", check). Independent; fresh context, starts logged out. Locators by label and role are expected to exist ("Email Address", "Password", "Sign in"; see snapshot in `evidence/run-1/`). / Ca duyệt, luồng ngắn, độc lập. | Env var NAMES only: `QA_TEST_USER`, `QA_TEST_PASSWORD`. No value in any file. | R1, R3, R4, R5, R6, R7 |
| TC-002 | REQ-003 | yes | Approved, `automation_candidate: yes`. Same short flow. Needs no account and no env var; lowest credential risk. | Unknown email and random password, both **generated at run time** (node `crypto`), in memory only, never written, printed, attached or put in a title. No env var. | R1, R2, R3, R5, R6 |
| TC-003 | REQ-003 | yes | Approved, `automation_candidate: yes`. Same short flow, independent. | `QA_TEST_USER` (NAME only; fail fast if unset or empty). Wrong password **generated at run time**, in memory only. `QA_TEST_PASSWORD` is NOT read in TC-003. | R1, R2, R3, R5, R6, R8 |

Cases skipped: TC-004, TC-005, TC-006 (`withdrawn` in the approved production amendment; they could create real accounts on a live host). Not selected, not coded. / Bỏ qua: TC-004..006 (đã rút lại vì có thể tạo tài khoản thật).

## Risks / Rủi ro

- **R1. Lockout or alerts from failed logins.** TC-002 and TC-003 are failed logins on a live host; TC-003 targets the real test account and may lock it or raise alerts. Mitigation: one run per case, no retries, no loops; stop and report on an unexpected failure, do not rerun.
- **R2. Live data.** The host has no test label; real data may exist. Mitigation: only the dedicated test account, no sign-up, no orders or payments, no destructive actions, no clicks on links other than "Sign in".
- **R3. Site terms unverified.** The terms of use for automated checks on this host were not verified (the user states it is his own app; not confirmed in a file).
- **R4. Pending profile edit.** `no_production_hosts` is still `true` and the `CLAUDE.md` "never touch production" line is not yet updated. Running before the user edits them conflicts with the written rules. Also pending: the human-created test account and the human-set env vars (not verifiable by the AI).
- **R5. Unknown post-login page and error wording (A3).** Loose checks: possible false pass or false failure; tighten after the first human run.
- **R6. Credential or value leak** into trace, screenshot, video, log or report, including Playwright call logs of a failed `fill`. Mitigation: trace, screenshot and video OFF per spec; entry wrapper replaces any error with a fixed message; `test-results/` and `playwright-report/` deleted by the human after each run; evidence only masked.
- **R7. No prior execution (A1).** Script problems (locator, timing) and product differences cannot be told apart before the first run; the first failure needs human triage.
- **R8. Collision of generated values with real ones** (practically impossible with 16 hex characters; no comparison reads `QA_TEST_PASSWORD` in TC-003).

## Proposed approach (recommendation only, no code written) / Cách tiếp cận đề xuất

- **Layout (standard Playwright):** unchanged root `playwright.config.ts` (`testDir: './tests'`). New specs only: `tests/DEMO-005/tc-001.spec.ts`, `tc-002.spec.ts`, `tc-003.spec.ts`. One test per case, title starts with the TC ID, tag and annotation carry the REQ IDs.
- **Reuse:** `tests/helpers/host-guard.ts` unchanged (per-spec `test.use({ allowedHosts: ['vlog-ai-powered-assistant.vercel.app'], baseURL: 'https://vlog-ai-powered-assistant.vercel.app', trace: 'off', screenshot: 'off', video: 'off' })`; default stays the demo shop). From `tests/helpers/login-page.ts` reuse `requireEnv` and `randomHex`.
- **New helper (recommendation):** a second file, for example `tests/helpers/email-login-page.ts`, because the existing `login-page.ts` locators are for the-internet ("Username", "Login"). It would export locators by label and role ("Email Address", "Password", "Sign in") and its own sanitized `enterCredentialsAndLogin` (fixed error message, no original message or stack, covers all typed values). `login-page.ts` and all DEMO-004 specs stay unchanged.
- **Steps and assertions (loose, web-first, no fixed sleeps), in the order of the approved cases:**
  - TC-001: open `/login`; email and password empty, "Sign in" enabled; fill via the wrapper from `QA_TEST_USER` and `QA_TEST_PASSWORD`; click; URL no longer `/login`; no error message visible. Post-login page not asserted exactly.
  - TC-002: open `/login`; generated unknown email (reserved domain `example.com`, per `02-test-data.md`) and random password; click; URL still `/login`; an error message visible (any wording); no signed-in area.
  - TC-003: open `/login`; `QA_TEST_USER` and a generated wrong password; click; same expectations as TC-002.
  - "Signed-in area absent" would be checked by a loose, role-based condition chosen at code review, because the signed-in UI is unknown.
- **Credentials:** only `process.env.QA_TEST_USER` / `QA_TEST_PASSWORD` by name; fail fast naming the VARIABLE; no defaults; never log, print, attach or put in a title.
- **Run (Step 4, later):** the human runs one spec at a time, once, e.g. `npx --no-install playwright test tests/DEMO-005/tc-001.spec.ts --project=chromium`, headless, then deletes `test-results/` and `playwright-report/`. The AI does not run them.
- **Not touched:** requirements, test cases, test plan, `qa-profile.yaml`, `CLAUDE.md`, `00-data-gate.md`, DEMO-002 and DEMO-004 specs.
- **Next gates:** Step 2 (write scripts) only after this selection is approved; then Step 3 code review (`01-review.md`); then the human runs the specs.

## Install needs / Cần cài đặt

None expected (`@playwright/test` and Chromium were installed for earlier features; not re-checked at this step because no command may be run). / Không cần cài gì.

## Open questions with recommended answers / Câu hỏi mở kèm đề xuất

Reply "approve with recommendations" to accept all recommended answers.

1. **A1:** accept that there is no prior execution report or Passed result, and that the first human-run execution is the first real execution of TC-001 to TC-003 (as for DEMO-004)? Recommended: **yes**.
2. **A2:** confirm that the human runs every spec once in their own terminal with their own env vars and reports back only non-secret details? Recommended: **yes**.
3. **Profile edit (R4):** will you update `qa-profile.yaml` (`no_production_hosts: false`) and the `CLAUDE.md` production line before the first run? Recommended: **yes, before Step 4 (running), not required for writing code**; I will not edit them.
4. **Second login helper:** add a new `tests/helpers/email-login-page.ts` (email variant) and leave `login-page.ts` and the DEMO-004 specs unchanged? Recommended: **yes**.
5. **Strictness of checks until the first human run:** loose (leaves `/login` and no error; stays on `/login` with any error visible), then tighten to the recorded wording and post-login page? Recommended: **loose first**.
6. **Data Guard:** run `data-guard` pre-run for DEMO-005 before the human runs the specs (no `00-data-gate.md` exists)? Recommended: **yes** (live host, real login), the main session runs it.
7. **Throttling and lockout (R1):** accept running TC-003 and the failed login of TC-002 once each against the live host, and stopping without a rerun on any unexpected failure? Recommended: **yes**.
8. **Site terms (R3):** do you confirm that automated checks of your own app on this host are permitted? Recommended: **yes (your statement, noted in the review file)**.
9. **Run order:** TC-002 first (no account), then TC-003, then TC-001? Recommended: **yes** (an account problem shows up before a valid login attempt; each once).
10. **Signed-in area check:** for "no signed-in area" in TC-002 and TC-003, rely on the URL staying `/login` plus the form still visible, rather than guessing signed-in UI? Recommended: **yes**.

## Part B. Code review / Phần B. Review code

Not started. / Chưa bắt đầu.

## Approval / Phê duyệt (selection)

- Status: **approved** (approve with recommendations: all ten recommended answers accepted as written). / **Đã duyệt.**
- Approver: Boss-QA (the user, in chat: "Approve with recommendations")
- Date: 2026-11-05
- Decisions that override earlier notes: none. Q6 is accepted as written (Data Guard pre-run before the human run); Data Guard is read-only and is still optional in `CLAUDE.md`, so the user may skip it at run time. Q3 stays the user's to do before the run (`no_production_hosts: false`, the test account, the two env vars).

### Tóm tắt tiếng Việt / Vietnamese summary

- Chọn tự động hóa TC-001, TC-002, TC-003 (đều `yes`); TC-004..006 đã rút lại nên không chọn.
- Chưa có báo cáo chạy trước (A1, giống DEMO-004): ghi là giả định cần duyệt, không phải rào cản.
- Rủi ro chính: khóa tài khoản/cảnh báo do đăng nhập sai, dữ liệu thật, điều khoản trang chưa xác minh, `no_production_hosts` vẫn `true` (chờ bạn sửa), tài khoản test và biến môi trường do bạn tạo, trang sau đăng nhập và câu chữ lỗi chưa biết (kiểm tra lỏng).
- Đề xuất: spec mới trong `tests/DEMO-005/`, thêm helper đăng nhập bằng email, không sửa helper/spec cũ. Trả lời "approve with recommendations" để chấp nhận 10 đề xuất. Chưa viết code, chưa chạy gì.
