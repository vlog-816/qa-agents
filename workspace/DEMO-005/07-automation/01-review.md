# Code review: login smoke test of the Vercel app / Review code: smoke test đăng nhập app Vercel

- Feature ID: DEMO-005
- Date: 2026-11-05
- By: automation-tester
- Framework: playwright / typescript
- Gate `automation` (selection): approved (Boss-QA, 2026-11-05, "Approve with recommendations"; see `00-selection.md`)
- Gate `automation` (code review): **approved** (approver: Boss-QA, the user; date: 2026-11-05; "Approve code")

## Part B. Code review

### Files written

| File | TC | REQ | Notes |
|---|---|---|---|
| `tests/helpers/email-login-page.ts` (new) | all | all | Locators `emailField` ("Email Address"), `passwordField` ("Password"), `signInButton` (role button, /sign in/i); sanitized `enterCredentialsAndSignIn`; `snapshotVisibleText` and `expectRejectedSignIn`. Re-exports `requireEnv` and `randomHex` from `./login-page`. |
| `tests/DEMO-005/tc-001.spec.ts` | TC-001 | REQ-001, REQ-002 | `requireEnv` for `QA_TEST_USER` and `QA_TEST_PASSWORD` first. Form checks, sanitized sign-in, then: URL not `/login`, email field and Sign in button hidden. |
| `tests/DEMO-005/tc-002.spec.ts` | TC-002 | REQ-003 | Unknown email = random hex local part on `example.com` (regenerated if equal to `QA_TEST_USER`, case-insensitive), random password. Negative checks. |
| `tests/DEMO-005/tc-003.spec.ts` | TC-003 | REQ-003 | Reads only `QA_TEST_USER` (`QA_TEST_PASSWORD` is not referenced); wrong password from `randomHex`. Same negative checks. |

Not changed: `tests/helpers/login-page.ts`, `tests/helpers/host-guard.ts`, all DEMO-002 and DEMO-004 files, `playwright.config.ts`, requirements, cases, plan, `qa-profile.yaml`, `CLAUDE.md`.

`npx --no-install playwright test --list` shows 10 tests (4 DEMO-002, 3 DEMO-004, 3 DEMO-005). Nothing was run.

### Per-spec host list

Each DEMO-005 spec: `baseURL` and `allowedHosts` = `vlog-ai-powered-assistant.vercel.app`, a subset of `data.allowed_hosts` (the host is in the profile). The host guard in `host-guard.ts` aborts every request to any other host. Trace, screenshot, video are OFF per spec. No blocked host appears in the code.

### Negative check (TC-002, TC-003), as implemented

`expectRejectedSignIn` checks: URL matches `/login` (before and after the error), email field and Sign in button visible, button enabled, and "some error text" = a non-empty `role=alert` element OR any visible text line that was not on the page before submit (comparison of the page's visible lines before and after). Wording is not asserted. Answer Q10 is followed: no signed-in UI is guessed.

### Locator and wording risks

- L1. Labels "Email Address", "Password" and the button name "Sign in" come from one recorded snapshot of `/login` (`evidence/run-1/login-1-snapshot.yml`). If the labels change, the specs fail on the first step (script problem, not a product defect).
- L2. `getByLabel('Password')` could match more than one element if a "show password" control with a label containing "Password" is added (strict-mode error). Not present in the snapshot.
- L3. The "new visible text" error check is weak by design: any new text (for example a loading text, a toast that is not an error, a validation hint) counts as an error, so a false pass is possible. It also cannot say whether the text is really an error. Because the button must be enabled and the form visible in the same step, a transient "Signing in..." state is mostly excluded, but not guaranteed. Recommended: tighten to the recorded wording or a `role=alert` after the first human run (A3).
- L4. If the page reloads or navigates on a rejected sign-in (full reload), the "before" snapshot still works (same page content), but a different error layout is not handled.
- L5. TC-001 success check is loose: URL leaves `/login` and the form is hidden. A redirect to any other page (including an error page) would pass. The post-login page is not recorded (A3).
- L6. A trailing slash or query on `/login` is accepted (`/\/login\/?$/`); a URL like `/login?error=...` would NOT match and TC-002/003 would fail. Triage if it happens.
- L7. `innerText` of the whole body is read in memory for comparison only; it is never printed or attached.

### What the sanitized wrapper does and does not cover

Does: `enterCredentialsAndSignIn` puts both `fill` calls and the click in try/catch and throws a NEW `Error('Credential entry failed (details hidden on purpose)')`; the original message, call log and stack are dropped. Covers the generated fake values as well as the real test account values. `requireEnv` messages name only the variable.

Does not cover: failures outside the wrapper. Assertion failures print locators and URLs, not typed values, but a failed `toHaveURL` prints the actual URL (it could contain a query string if the site puts one there; unlikely for this form). `toBeEmpty` and `toBeHidden` failures print no typed value. Anything the site itself shows on the page (for example an echoed email in an error text) is not read by the code and not printed by it; trace, screenshot and video are off, so it is not stored. The test runner's own console summary is outside the wrapper; the human reports only pass/fail and non-secret text. Values are never printed, attached, annotated or put in titles.

### Checklist (the automation-tester answers; the human verifies)

- [x] Every script maps to one approved TC and at least one REQ; steps and expected results match the case, in order. (Loose checks as approved in Q5.)
- [x] Nothing was invented: no extra steps, no new expected results. (The "no error message" check of TC-001 is not coded; only URL and form-hidden checks were requested. Noted below.)
- [x] No fixed sleeps; web-first assertions (`expect.poll` is used for the new-text check); locators by role and label.
- [x] Each test is independent and starts from a clean state (fresh Playwright context; no shared state).
- [x] No secrets or real personal data in code; credentials only by environment variable name; no email address or password value in any file (only the domain `example.com` as a rule).
- [x] `baseURL` and the allowed-host list match `data.allowed_hosts`; other hosts are aborted by the guard.
- [x] No blocked host anywhere in the code (`blocked_hosts` is `[]` today).
- [x] Standard layout (root `playwright.config.ts`, `testDir: './tests'`, helpers in `tests/helpers/`).
- [x] Headless, project `chromium`, `retries: 0` come from the unchanged config (not re-read in this step); default output folders stay git-ignored. Evidence copy is only for the human-approved run step.
- [x] Nothing installed or changed outside `tests/` and the review files.

### How the human runs it (after approval of this review)

Pre-run conditions that are still on you (the AI does not edit or verify them):

1. `qa-profile.yaml`: `data.no_production_hosts` set to `false` (and the `CLAUDE.md` production line updated) before the first run.
2. The dedicated test account exists and is active.
3. `QA_TEST_USER` (holds the email) and `QA_TEST_PASSWORD` are set in your own session. Never type the values in chat.
4. Optional: Data Guard pre-run (accepted in Q6; may be skipped at run time).

Set the variables in your own PowerShell with a prompt, for example (you type the values at the prompt, nothing is stored in a file):

```powershell
$env:QA_TEST_USER = Read-Host "QA_TEST_USER"
$env:QA_TEST_PASSWORD = Read-Host "QA_TEST_PASSWORD" -MaskInput
```

Run ONE spec per command, once, in this order (TC-002, TC-003, TC-001):

```powershell
npx --no-install playwright test tests/DEMO-005/tc-002.spec.ts --project=chromium
npx --no-install playwright test tests/DEMO-005/tc-003.spec.ts --project=chromium
npx --no-install playwright test tests/DEMO-005/tc-001.spec.ts --project=chromium
```

Rules:

- No rerun on an unexpected failure: stop and report (lockout risk R1).
- After EACH run, delete `test-results/` and `playwright-report/`.
- Report back only pass/fail and non-secret text (for example the visible error wording and the post-login address, if they contain no email or password).
- When done, clear the variables (`Remove-Item Env:QA_TEST_USER, Env:QA_TEST_PASSWORD`).

### Assumptions and open questions

- A1 to A4 and R1 to R8 from `00-selection.md` still apply (no prior execution, human-run only, loose checks, production host with the profile edit pending).
- OQ1. TC-001 step 4 says "no error message is shown"; this was not coded because no error element or wording is known and the request asked for URL and form-hidden checks only. Confirm that this is acceptable until the first run.
- OQ2. Is the weak "any new visible text" error check (L3) acceptable for the first run? Recommended: yes, then tighten.
- OQ3. TC-003 is a failed login against the real test account; the same lockout risk (R1) applies. One run only.

### Approval

- Approver: Boss-QA (the user, in chat: "Approve code")
- Date: 2026-11-05
- Decisions that override earlier notes: none. The loose error check (any new visible text) and the loose TC-001 success check are accepted for the first run; tighten them after the first human run, when the real post-login page and error wording are known. TC-003 runs once only (lockout risk).
- Status: **approved**. No script has been run. The human run still needs the user's pre-run steps (`no_production_hosts: false`, the dedicated test account, `QA_TEST_USER` and `QA_TEST_PASSWORD`).
