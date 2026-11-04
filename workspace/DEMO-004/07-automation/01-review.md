# Automation code review: login happy case / Review code tự động hóa: đăng nhập thành công

- Feature ID: DEMO-004
- Date: 2026-11-04
- By: automation-tester
- Framework: playwright / typescript
- Gate `automation` (selection): approved (Boss-QA, 2026-11-04), see `00-selection.md`
- Gate `automation` (code review): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "Approve code"). The human runs the script in their own terminal; the AI does not run the login. / **đã duyệt**.

## Part B. Code review

### Files written / changed / File đã viết hoặc sửa

| File | TC | REQ | Notes |
|---|---|---|---|
| `tests/DEMO-004/tc-001.spec.ts` (new) | TC-001 | REQ-001, REQ-002 | One test. Title starts with `TC-001`; tags `@REQ-001`, `@REQ-002` and a `REQ` annotation. |
| `tests/helpers/host-guard.ts` (changed) | - | - | New option fixture `allowedHosts` (default `['demowebshop.tricentis.com']`). `isAllowedHost(hostname, hosts?)` has an optional list. `ALLOWED_HOSTS` is still exported (default list). `test` and `expect` still exported. The baseURL check now uses the effective `baseURL` fixture (so `test.use({ baseURL })` is validated), not the project value. |

Not changed: `playwright.config.ts` (the spec overrides baseURL, trace, screenshot and video itself), `package.json`, `qa-profile.yaml`, `00-data-gate.md`, all DEMO-002 specs and `tests/helpers/books-page.ts`. Grep check: only the four DEMO-002 specs import `host-guard` (only `test`, `expect`); `books-page.ts` does not import it. / Không đổi các file còn lại.

### Steps mapping (TC-001, in order) / Ánh xạ bước

| Step | Code |
|---|---|
| 1 Open login page; empty username, empty password, enabled Login | `goto('/login')`; `getByLabel('Username')` visible and empty; `getByLabel('Password')` visible and empty; `getByRole('button', {name: /login/i})` enabled |
| 2 Enter both values | `enterCredentialsAndLogin` (two `fill` calls) |
| 3 Choose Login; leave login page, `/secure` | click in the same helper; `toHaveURL(/\/secure$/)` |
| 4 Success message, Logout control, no error | `getByText(/logged in/i)` visible; link or button named `/logout/i` visible; `getByText(/invalid\|error\|incorrect/i)` count 0 (loose, see below) |

Step 2 "password not shown in clear text" is not asserted separately: the field is found by label and filled; no `type=password` assertion was added because the approved case does not give a locator for it. Recorded as a gap, nothing invented. / Chưa assert riêng việc mật khẩu bị ẩn.

### Credential safety / An toàn thông tin đăng nhập

- `QA_TEST_USER` and `QA_TEST_PASSWORD` are read from `process.env` only, with fail-fast (message names the variable, never a value), no defaults, no file reads.
- Values are never logged, attached, annotated, put in a title or an error message.
- Credential entry (two fills and the Login click) is wrapped; any error is replaced by `Credential entry failed (details hidden on purpose)` (no original message, no stack).
- Trace, screenshot, video: OFF for this spec. No external link is clicked. The credentials printed on the page are not used.
- Limit: assertions after login (outside the wrapper) cannot contain the typed values in their messages, but I could not verify what Playwright prints in all failure modes (see unverified list).

### Checklist

- [x] Every script maps to one approved TC and at least one REQ; steps and expected results match the case, in order. (Gap: the "not shown in clear text" check, see above.)
- [x] Nothing was invented: no extra steps, no new expected results. (The "no error" check uses a loose text pattern; it implements the case's "no error message is displayed".)
- [x] No fixed sleeps; web-first assertions; locators by role, label or text. (Locators UNVERIFIED, see below.)
- [x] Each test is independent and starts from a clean state (fresh Playwright context per test).
- [x] No secrets or real personal data in code; credentials only by environment variable name.
- [x] `baseURL` (`https://the-internet.herokuapp.com`) and the spec's list (`['the-internet.herokuapp.com']`) are a subset of `data.allowed_hosts` (read from `qa-profile.yaml` today); requests to other hosts are aborted by the guard. The guard default list still matches the profile (subset).
- [x] No blocked host anywhere in the code (`blocked_hosts` is empty).
- [x] Standard layout kept (`playwright.config.ts` at root, `testDir: './tests'`, helper in `tests/helpers/`).
- [x] Headless, project `chromium`, `retries: 0` (from the unchanged config). Evidence copying applies in Step 4; for this spec nothing is produced by design.
- [x] Nothing installed. Changes only in `tests/` and this review file.

### UNVERIFIED (not checked; nothing was run against the site) / CHƯA kiểm chứng

1. Locators `getByLabel('Username')`, `getByLabel('Password')` and `getByRole('button', {name: /login/i})` are UNVERIFIED until the first human run (the page markup was not inspected by me for this code; the label association and button role are assumed). `getByLabel('Password')` could also be ambiguous if another element carries a similar label.
2. The exact success text: only `/logged in/i` is assumed (A3). Tighten after the first run.
3. The flash message region: not located by a selector. The success check uses text only and the "no error" check uses the pattern `/invalid|error|incorrect/i` over the whole page; it could miss a differently worded error or (rarely) match unrelated text.
4. Whether sanitizing hides all call logs: the wrapper hides errors thrown by fill/click. Assertion failures after login, `requireEnv`, and the runner's own output are outside it. I could not verify that no other part of the runner output (for example a failed navigation log) can echo a value; to my knowledge none of those touch the typed values, but this is unconfirmed.
5. Possible effect: with `{ type: 'REQ' }` annotation plus tags, the list reporter prints only the title; not verified.

### What I ran / Đã chạy

Only `npx --no-install playwright test --list` (compile and load check, opens no page). Result: 5 tests listed in 5 files (4 DEMO-002 specs unchanged, plus `DEMO-004\tc-001.spec.ts` `TC-001 Valid username and password lead to the secure area`). No test, browser, install, curl or network command ran.

### How the human runs it / Cách con người chạy

Run in your own PowerShell, from the project root `D:\Source\qa-agents`. Type the real values yourself; do not paste them into chat or files.

```powershell
cd D:\Source\qa-agents
$env:QA_TEST_USER = Read-Host "Username"          # type <your username>
$sec = Read-Host "Password" -AsSecureString          # type <your password>
$env:QA_TEST_PASSWORD = [System.Net.NetworkCredential]::new("", $sec).Password
npx --no-install playwright test tests/DEMO-004/tc-001.spec.ts --project=chromium
```

Clear afterwards (same session):

```powershell
Remove-Item Env:QA_TEST_USER, Env:QA_TEST_PASSWORD
Remove-Variable sec
```

Closing the terminal also clears them. Note: `Read-Host` for the username echoes it on screen; clear the screen if needed.

Paste back only: pass or fail; the non-secret success text shown on the secure page (for example the message sentence); and for a failure, the short failing step name. Never the credentials; do not paste full logs if unsure. After the run, run `data-guard` in post-run mode before anything is shared.
/ Chỉ dán lại: đạt/không đạt, câu thông báo thành công (không bí mật), tên bước lỗi. Không dán thông tin đăng nhập; không dán log đầy đủ nếu không chắc.

**After a run, delete Playwright's output folder (added by the main session at review):** when a test fails, Playwright can write a page-state file (for example `error-context.md`) into `test-results/`. Whether it could contain the typed value is **not verified**. So after every run, delete `test-results/` and `playwright-report/` yourself (`Remove-Item -Recurse -Force test-results, playwright-report -ErrorAction SilentlyContinue`) before you share or commit anything. Both folders are git-ignored. / Sau mỗi lần chạy, hãy xoá thư mục `test-results/` và `playwright-report/` trước khi chia sẻ hay commit bất cứ thứ gì.

### Assumptions and open questions / Giả định và câu hỏi mở

Assumptions (from `00-selection.md`): A1 (no prior execution), A2 (human runs the credential step), A3 (post-login behavior assumed). All accepted by the user.

Open questions:

1. Should "password not shown in clear text" (step 2) be asserted (for example `toHaveAttribute('type', 'password')`)? The case does not state the locator or attribute; I did not add it. / Có thêm assert mật khẩu bị ẩn không?
2. The "no error" check scans the whole page text. Acceptable for the loose first run, or prefer a specific flash-region locator after you give me the markup from the first run?
3. The Logout control is accepted as link or button by role (selection answer 5, "confirm at code review"): please confirm.
4. `Read-Host` echoes the username on screen; acceptable, or should the username also be entered as a secure string?

### Approval / Phê duyệt

- Status: **approved.** / Đã duyệt.
- Approver: Boss-QA (the user, in chat: "Approve code")
- Date: 2026-11-04
- Decisions that override earlier notes: none. The agent's four open questions are accepted as proposed (no separate "password not shown" assertion for now; whole-page "no error" check for the first run; Logout by role; `Read-Host` echoes the username, accepted). After every run the human deletes `test-results/` and `playwright-report/` before sharing or committing anything.

---

## Amendment 2026-11-04: TC-002 and TC-003 (Part B) / Bổ sung 2026-11-04: TC-002 và TC-003 (Phần B)

- Gate `automation` (code review, amendment): **approved** (approver: Boss-QA, the user; date: 2026-11-04; "ok" in reply to the approval question; no changes requested). / **đã duyệt**.
- Selection amendment: approved (Boss-QA, 2026-11-04), see `00-selection.md`. Data Guard pre-run for the amended scope: PASS (`00-data-gate.md`, "Amended scope").
- The TC-001 code review above is unchanged.

### Files written / File đã viết

| File | TC | REQ | Notes |
|---|---|---|---|
| `tests/helpers/login-page.ts` (new) | - | - | `requireEnv(name)` (error names only the variable); `randomHex(length = 16)` (node:crypto `randomBytes`, lowercase hex, no `Math.random`); locator helpers `usernameField`, `passwordField`, `loginButton`, `logoutControl` (link or button, `/logout/i`); `enterCredentialsAndLogin(page, username, password)` with the sanitized wrapper (any error replaced by a NEW `Error('Credential entry failed (details hidden on purpose)')`, no original message or stack). |
| `tests/DEMO-004/tc-002.spec.ts` (new) | TC-002 | REQ-003 | One test; title starts with `TC-002`; tag `@REQ-003` and `REQ` annotation. No env var needed; reads `QA_TEST_USER` only if set, for the in-memory collision guard. |
| `tests/DEMO-004/tc-003.spec.ts` (new) | TC-003 | REQ-004 | One test; title starts with `TC-003`; tag `@REQ-004` and `REQ` annotation. `requireEnv('QA_TEST_USER')` first. `QA_TEST_PASSWORD` is not referenced anywhere in this file. |

Not changed: `tests/DEMO-004/tc-001.spec.ts`, `tests/helpers/host-guard.ts`, DEMO-002 files, `playwright.config.ts`, `package.json`, `qa-profile.yaml`, requirements, test cases, `00-data-gate.md`.

### Steps mapping / Ánh xạ bước

| Step | TC-002 | TC-003 |
|---|---|---|
| 1 Open login page; form with empty fields, enabled Login | `goto('/login')`; Username and Password visible and empty; Login enabled | same |
| 2 Enter values | wrapper: random unknown username, random password | wrapper: `QA_TEST_USER`, random wrong password |
| 3 Choose Login; stay on `/login` | click in wrapper; `toHaveURL(/\/login$/)` | same |
| 4 Error, form again, no Logout | one visible element matching `/username[\s\S]*invalid\|invalid[\s\S]*username/i`; `logoutControl` count 0; Username and Login visible | same with `password` and `invalid` |

"Password not shown in clear text" (step 2) and "password field empty after failure" are not asserted (approved decision 5 and the TC-001 gap). Nothing invented. / Không assert các mục này theo quyết định đã duyệt.

### Credential safety / An toàn thông tin đăng nhập

- Generated values exist only in memory; never logged, attached, annotated, put in a title or an error message. The collision check is in memory only.
- All typed values (fake and real) go through the sanitized wrapper.
- `requireEnv` errors name only the variable.
- Trace, screenshot, video OFF in both specs. The hint credentials on the page are not used. No external link is clicked.

### Checklist

- [x] Each script maps to one approved TC and its REQ; steps and expected results in order.
- [x] Nothing invented (loose text checks implement "error mentions invalid username/password").
- [x] No fixed sleeps; web-first assertions; locators by label, role or visible text. (UNVERIFIED, see below.)
- [x] Independent tests, fresh context each.
- [x] No secrets or real personal data in code; env var NAMES only; fake values generated at run time.
- [x] `baseURL` `https://the-internet.herokuapp.com` and per-spec list `['the-internet.herokuapp.com']` are a subset of `data.allowed_hosts` (from the `qa-profile.yaml` provided in context); other hosts are aborted by the guard.
- [x] No blocked host in code (`blocked_hosts` is empty).
- [x] Standard layout kept; headless, project `chromium`, `retries: 0` (unchanged config).
- [x] Nothing installed. Changes only in `tests/` and this review file.
- [ ] NOT verified: anything that needs a real run (see next list).

### UNVERIFIED / CHƯA kiểm chứng

1. Label locators `getByLabel('Username')` and `getByLabel('Password')`, and the Login button role: markup not inspected; they could also be ambiguous.
2. Error wording: "username" + "invalid" (TC-002) and "password" + "invalid" (TC-003) is assumed (A5). The match could fail on a different wording, or match more than one element (strict mode would then fail the test; I did not add `.first()`, so a double match is visible rather than hidden).
3. The hint paragraph is assumed not to contain "invalid" (so it does not match); not checked on the live page. For TC-003 the word "password" may appear in the hint, but "invalid" is also required.
4. Wrapper coverage: it covers errors from the two `fill` calls and the click only. Not covered: `page.goto`, `toHaveURL` and other assertion failures, the runner output. Their messages and call logs may include the URL or locator text; I believe they do not include typed values, but this is not proven. After a failure Playwright could also write page state (for example `error-context.md`) into `test-results/`; whether it can hold typed values is unknown, hence the deletion rule.
5. Whether `QA_TEST_USER` appears anywhere in failure output of TC-003: I believe not (only locators and the fixed wrapper message), unconfirmed.
6. The `toBeEmpty()` check on a label-located field assumes the label resolves to an input element.

### What I ran / Đã chạy

One test-related command: `npx --no-install playwright test --list` (compile and load check, opens no page). Result: **7 tests in 7 files**: four DEMO-002 specs, `DEMO-004\tc-001`, `DEMO-004\tc-002`, `DEMO-004\tc-003`. No test, browser, install, curl or network command ran. (One extra shell command, a heredoc append to this file, failed with a shell syntax error before doing anything; this file was then written with the Write tool instead. It touched no network and no test.)

### How the human runs it / Cách con người chạy

Run in your own PowerShell from `D:\Source\qa-agents`, one spec at a time, always `--project=chromium`. Type real values yourself; never paste them into chat or files. Run order: TC-002, TC-003, then TC-001 (the valid login last).

1. TC-002 (no variable needed):

```powershell
cd D:\Source\qa-agents
npx --no-install playwright test tests/DEMO-004/tc-002.spec.ts --project=chromium
Remove-Item -Recurse -Force test-results, playwright-report -ErrorAction SilentlyContinue
```

2. TC-003 (needs `QA_TEST_USER` only):

```powershell
cd D:\Source\qa-agents
$env:QA_TEST_USER = Read-Host "Username"          # type <your username>
npx --no-install playwright test tests/DEMO-004/tc-003.spec.ts --project=chromium
Remove-Item -Recurse -Force test-results, playwright-report -ErrorAction SilentlyContinue
```

3. TC-001 (needs `QA_TEST_USER` and `QA_TEST_PASSWORD`):

```powershell
cd D:\Source\qa-agents
$env:QA_TEST_USER = Read-Host "Username"          # type <your username>
$sec = Read-Host "Password" -AsSecureString          # type <your password>
$env:QA_TEST_PASSWORD = [System.Net.NetworkCredential]::new("", $sec).Password
npx --no-install playwright test tests/DEMO-004/tc-001.spec.ts --project=chromium
Remove-Item -Recurse -Force test-results, playwright-report -ErrorAction SilentlyContinue
```

Clear afterwards (same session):

```powershell
Remove-Item Env:QA_TEST_USER, Env:QA_TEST_PASSWORD -ErrorAction SilentlyContinue
Remove-Variable sec -ErrorAction SilentlyContinue
```

Report back only pass or fail and non-secret text (for example the visible error sentence, the failing step name). Never credentials; no full logs if unsure. Run `data-guard` in post-run mode before sharing anything. / Chỉ báo đạt/không đạt và văn bản không bí mật; không dán thông tin đăng nhập.

### Advisories from Data Guard / Lưu ý từ Data Guard

- Possible lockout or throttling of the test user after failed logins (TC-003); not verified.
- The site's terms of use are not verified (are automated failed logins allowed?).
- `QA_TEST_USER` may be a shared public account; failed attempts may affect other people.
- Keep the volume very low: one spec at a time, one failed attempt per case.
- Never retry on failure and no loops; if a run fails unexpectedly (site down, lock message), stop and report.

### Open questions / Câu hỏi mở

1. The error text check uses no `.first()`: a double match fails strict mode. Accept, or allow `.first()` after the first run?
2. Is the "form shown again" check (Username visible and Login visible only) enough? Password visibility is covered at step 1 only, as instructed.
3. Confirm that `QA_TEST_USER` is dedicated, and that the site terms permit this (Data Guard open items for the human).

### Approval / Phê duyệt (amendment)

- Status: **approved.** / **Đã duyệt.**
- Approver: Boss-QA (the user)  Date: 2026-11-04  Decisions: approve as written; one spec at a time, no retries or reruns; locator and wording risks accepted until the first human run.

### Tóm tắt tiếng Việt

- Đã viết `tests/helpers/login-page.ts` (requireEnv, randomHex bằng node:crypto, wrapper che lỗi cho mọi giá trị đã gõ, locator helper) và hai spec: `tc-002.spec.ts` (REQ-003, không cần biến môi trường), `tc-003.spec.ts` (REQ-004, chỉ cần `QA_TEST_USER`, không đọc `QA_TEST_PASSWORD`).
- Chưa kiểm chứng: locator theo label, câu chữ lỗi, đoạn gợi ý không khớp "invalid", wrapper chưa che lỗi của goto và assertion.
- Chỉ chạy `playwright test --list`: 7 test. Không chạy test, trình duyệt hay cài đặt.
- Thứ tự chạy cho con người: TC-002, TC-003, rồi TC-001; mỗi lần một spec, xoá `test-results/` và `playwright-report/` sau mỗi lần. Cổng review code bổ sung: **chờ duyệt, chưa duyệt**.
