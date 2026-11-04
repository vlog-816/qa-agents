# Data Guard: pre-run
- Date: 2026-11-04
- Feature ID: DEMO-004
- Verdict: PASS
- Amended scope (TC-002, TC-003) re-checked on 2026-11-04: see section "Amended scope" at the end. Verdict there: PASS (no waivers, with conditions).

Scope / Phạm vi: login happy-case check of the public third-party practice site `https://the-internet.herokuapp.com/login` (host `the-internet.herokuapp.com`).
No waivers are in use (`data.gate0_waivers` is absent). Production host list waived by human declaration (pilot only): `data.no_production_hosts: true`.
Không dùng waiver nào. Danh sách host production được miễn theo khai báo của con người (chỉ cho pilot).

## Checklist (pre-run only)
| Item | Status | Source |
|---|---|---|
| `data_class` declared and valid (`synthetic`) | ok | qa-profile.yaml `data.data_class` |
| `real_data_approval_ref` (only needed for `real`) | ok (not required) | data_class is synthetic |
| `masking_approval_ref` (only needed for `masked`) | ok (not required) | data_class is synthetic |
| `allowed_hosts` not empty, no overlap with `blocked_hosts` | ok | `localhost`, `demowebshop.tricentis.com`, `the-internet.herokuapp.com`; `blocked_hosts` is empty |
| No allowed host looks like production | ok (see Host assessment) | qa-profile.yaml + assessment below |
| `blocked_hosts` empty is acceptable | ok | `no_production_hosts: true`, `data_class: synthetic`, `blocked_hosts: []` (consistent) |
| `team` set, not a placeholder | ok | `qa-pilot` |
| Jira read-only | ok | `jira.mode: read-only` |
| `evidence/` in `.gitignore` | ok | `.gitignore` line 2: `workspace/**/evidence/` |
| Gate 0 approver | ok | `Boss-QA` |
| Gate 0 date | ok | `2026-11-03` (the human also stated the host confirmation in chat on 2026-11-04) |
| Claude plan approved | ok (human-confirmed) | `claude_plan_approved: true` |
| Dedicated test account | ok (human-confirmed) | `test_account_confirmed: true`. See Credential conditions |
| No secrets in repo/prompts | ok (human-confirmed) | `no_secrets_in_repo_confirmed: true`. See Credential conditions |
| Allowed hosts are non-production | ok (human-confirmed) | `allowed_hosts_confirmed_non_production: true` |

Note: I did not fill in or change any confirmation. `qa-profile.yaml` was not modified.

## Host assessment: `the-internet.herokuapp.com`
- It is a third-party public practice/demo site (the well-known "the-internet" test playground), hosted on a shared Heroku subdomain. It is not a production system of this team or of any company we test for.
- The page is a deliberately open login exercise. No real customer data is expected, which fits `data_class: synthetic`.
- The only reason for doubt is that it is a public internet domain, as with `demowebshop.tricentis.com`. The evidence points to a practice site, not a business production system, so it is not treated as production. The human has also confirmed this explicitly.
- Limit: I cannot access the network, so this judgement comes from the host name, the human's statement and general knowledge of the site. It was not verified live.
- Anyone on the internet can use and change this site, so the site's data and behaviour are not under our control. Use fake data only.

## Conditions for the run (must hold, otherwise stop)
Browsing by the AI (playwright-cli):
1. Read only: open the page, take a snapshot and a screenshot. No typing, no form submission.
2. In-memory Chrome profile only (no persistent profile, no saved cookies).
3. Stop immediately on any redirect to a host outside `data.allowed_hosts`.
4. Screenshots go only to `workspace/DEMO-004/evidence/run-1/` (git-ignored).

Credential conditions:
1. The credentials shown on the practice page are NOT copied into any file, report, evidence, test code or chat.
2. The credential step is done by THE HUMAN in their own terminal, using their own environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`. No value appears in any file, report, evidence or chat.
3. The Playwright script reads `process.env`, fails fast when a variable is missing, has no default values and does no logging of them.
4. Trace, video and screenshot are OFF for the login spec, so that a typed value cannot end up in evidence.
5. The AI does not run the credential step and does not read the environment variables.
6. If a value is ever pasted into a chat or file: treat it as leaked and rotate it (policy section 7). For a public practice site the impact is low, but the rule stays.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none (pre-run, no files scanned) | - | - | - | - |

## Open questions
None blocking.

Reminders (not blockers):
- Run Data Guard in `post-run` mode on `workspace/DEMO-004/` before sharing anything. Images in `evidence/run-1/` may be opened by Data Guard only because `data_class` is `synthetic`.
- Revisit `no_production_hosts` and `blocked_hosts` as soon as a real production host exists.
- Section 6 of the data policy still has the evidence retention period blank (open for security).

---

# Amended scope: TC-002 and TC-003 (pre-run re-check) / Phạm vi bổ sung
- Date: 2026-11-04
- Feature ID: DEMO-004
- Verdict (amended scope): **PASS** (no waivers; with the conditions below, which must hold or the run stops)
- The earlier PASS above (login happy case, TC-001) is unchanged.

New scope / Phạm vi mới: two NEGATIVE login cases on `https://the-internet.herokuapp.com/login`:
- TC-002: unknown username (random, generated at run time) with a random password.
- TC-003: the env var `QA_TEST_USER` with a random wrong password. `QA_TEST_PASSWORD` is not used.

No waivers are in use (`data.gate0_waivers` is absent). Production host list waived by human declaration (pilot only): `data.no_production_hosts: true`.
Không dùng waiver nào. Danh sách host production được miễn theo khai báo của con người (chỉ cho pilot).

## Checklist (amended scope)
Re-read `qa-profile.yaml` and `.gitignore` today; no value changed since the earlier check.

| Item | Status | Source |
|---|---|---|
| `data_class` valid | ok | `synthetic`. Random generated values are fake, so the class still fits |
| `real_data_approval_ref` / `masking_approval_ref` | ok (not required) | data_class is synthetic |
| `allowed_hosts` not empty, no overlap with `blocked_hosts`, nothing production-like | ok | `the-internet.herokuapp.com` is allowed; same host assessment as above; no new host |
| `blocked_hosts` empty is consistent | ok | `no_production_hosts: true`, `data_class: synthetic`, `blocked_hosts: []` |
| `team` set | ok | `qa-pilot` |
| Jira read-only | ok | `jira.mode: read-only` |
| `evidence/` in `.gitignore` | ok | `.gitignore` line 2: `workspace/**/evidence/`. Also ignored: `test-results/`, `playwright-report/`, `blob-report/` (lines 10-12) |
| Gate 0 approver, date, claude_plan_approved | ok (human-confirmed, never waivable) | `Boss-QA`, `2026-11-03`, `true` |
| test_account_confirmed | ok (human-confirmed) | `true` |
| no_secrets_in_repo_confirmed | ok (human-confirmed) | `true` |
| allowed_hosts_confirmed_non_production | ok (human-confirmed) | `true` |

Note: `qa-profile.yaml` was not modified. I did not fill in any confirmation.

## Assessment of the amended scope
1. Data: all invalid values are random, fake, generated in memory at run time and never stored or printed. This fits `synthetic`. The only real-ish value is `QA_TEST_USER` in TC-003, held in the human's environment; it is not to be written anywhere.
2. Secret handling: TC-003 does not read `QA_TEST_PASSWORD` (smaller exposure than TC-001). TC-002 needs no env var.
3. Leak paths: trace, screenshot and video off; typed-value echo in Playwright call logs is handled by a wrapper that rethrows sanitized errors; no AI typing on the site; the human runs the scripts; evidence goes only to `workspace/DEMO-004/evidence/run-1/` (git-ignored); the human deletes `test-results/` and `playwright-report/` after each run. These are all consistent with policy sections 4, 6 and 7.
4. Limit: the TC-002 and TC-003 scripts and the wrapper did not exist when I checked (the DEMO-004 folder holds no spec code, and I did not read `tests/`). I verify the declared controls only as stated by the requester. They must be confirmed at the code review gate (`01-review.md`) before the human runs anything. Wrapper coverage of all failure modes is not proven (the TC-001 review already lists this as unverified: for example failed navigation logs or assertion failures could still echo something).

## Policy concern: failed-login attempts by a script on a shared public third-party site
Result: not a Gate 0 blocker, but real residual risks. None can be verified by me (I cannot access the network and did not read the site's terms).
- **Lockout / throttling:** unknown. The site is a practice exercise and is not known to lock accounts, but this is not verified. TC-003 repeats failed logins against the real `QA_TEST_USER` and could, in theory, lock or throttle that account. Impact is limited to the practice account; no company data is involved. This was already accepted by the approver (selection amendment, question 6).
- **Rate:** the plan is one human-run spec at a time, one failed attempt per case, `retries: 0`, headless. That is very low volume. It should stay that way.
- **Terms of use:** not verified. The site is public and intended for practice, but a shared third-party host is outside our control. Whether automated failed-login attempts are permitted by its owner is an open item for the human to confirm (read the site's README or terms).
- **Shared account:** if `QA_TEST_USER` is the public practice account printed on the page, other people share it. Failed attempts may affect them, and anyone can change its state. This also means that the "dedicated minimum-privilege test account" confirmation (`test_account_confirmed: true`) is the human's statement; I cannot verify that the account is dedicated.
- **Log noise:** the failed attempts generate server-side logs with the source IP and the random values. The values are fake; the IP is the human's. Low concern for a practice site.

## Conditions for the amended run (must hold, otherwise stop)
1. The AI types nothing on this site. The human runs each spec in their own terminal, one spec at a time; the AI receives only pass/fail and non-secret details.
2. `retries: 0`, no loops, no repeated reruns to force a result. If an attempt fails for an unexpected reason (site down, lock message), stop and report; do not retry blindly.
3. Invalid values are generated at run time in memory only. Never stored, printed, attached, annotated or used in a test title. The failure messages name no value.
4. `QA_TEST_PASSWORD` is not read or used in TC-003. `QA_TEST_USER` is never printed.
5. Trace, screenshot and video stay OFF for both specs. Per-spec host list contains only `the-internet.herokuapp.com`; external links are not clicked; requests to other hosts are aborted.
6. Evidence only under `workspace/DEMO-004/evidence/run-1/` (git-ignored). The human deletes `test-results/` and `playwright-report/` after each run, before sharing or committing anything.
7. The TC-002 and TC-003 code review gate (`01-review.md`) must be approved before the first run, including a check of the wrapper and the absence of any logging of values.
8. If any value is pasted into chat or a file: treat it as leaked and rotate it (policy section 7).
9. Run Data Guard in `post-run` mode on `workspace/DEMO-004/` before sharing results.

## Findings (amended scope)
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none (pre-run, no files scanned) | - | - | - | - |

## Open questions (amended scope)
None blocking for Gate 0. Items for the human (not waivers, not blockers):
1. Confirm the site's terms permit automated failed-login attempts, and that a lockout of `QA_TEST_USER` is acceptable (already accepted by the approver in the selection amendment, but the terms were not read).
2. Confirm that `QA_TEST_USER` is a dedicated practice account (or is the public practice account and the consequences of sharing are accepted).
3. Revisit `no_production_hosts` and `blocked_hosts` when a production host exists; evidence retention period is still blank in policy section 6.

## Tóm tắt tiếng Việt
- Phạm vi bổ sung (TC-002 sai username, TC-003 sai mật khẩu của `QA_TEST_USER`): **PASS**, không waiver, kèm điều kiện ở trên.
- Giá trị sai được sinh ngẫu nhiên trong bộ nhớ, không lưu, không in. TC-003 không dùng `QA_TEST_PASSWORD`. Trace, ảnh chụp, video tắt. Con người chạy script; AI không gõ gì.
- Rủi ro còn lại (không chặn): trang công cộng của bên thứ ba có thể khóa hoặc giới hạn tài khoản sau nhiều lần đăng nhập sai, điều khoản sử dụng chưa kiểm chứng, tài khoản thử có thể dùng chung. Giữ khối lượng rất thấp, `retries: 0`, không chạy lặp.
- Script chưa tồn tại lúc kiểm tra; phải xác nhận wrapper ở bước review code trước khi chạy.
