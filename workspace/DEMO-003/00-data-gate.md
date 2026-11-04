# Data Guard: pre-run
- Date: 2026-11-04
- Feature ID: DEMO-003
- Verdict: PASS (with conditions, see "Credential-handling conditions"; no waivers)
- Scope: read the page https://demowebshop.tricentis.com/login with playwright-cli (snapshot and screenshot only, no typing, no submit), then a login happy-case check where only the human types the password.
- Note: Production host list waived by human declaration (pilot only) (`data.no_production_hosts: true`).
- Ghi chu (vi): Ket luan PASS, khong co waiver. Danh sach host production duoc mien theo khai bao cua con nguoi (chi cho pilot).

## Checklist (pre-run only)
| Item | Status (ok / needs human confirmation / fail) | Source |
|---|---|---|
| `team` filled in (not a placeholder) | ok (`qa-pilot`) | qa-profile.yaml |
| `data_class` valid and matches the target | ok (`synthetic`) | qa-profile.yaml |
| `real_data_approval_ref` / `masking_approval_ref` | ok (not required for synthetic) | qa-profile.yaml |
| `allowed_hosts` non-empty, no overlap with `blocked_hosts` | ok (`localhost`, `demowebshop.tricentis.com`; blocked list is empty) | qa-profile.yaml |
| Target host in `allowed_hosts` | ok (`demowebshop.tricentis.com`) | qa-profile.yaml |
| `blocked_hosts` / `no_production_hosts` consistency | ok (`no_production_hosts: true`, `blocked_hosts: []`, `data_class: synthetic`) | qa-profile.yaml |
| Jira read-only | ok (`jira.mode: read-only`) | qa-profile.yaml |
| `workspace/**/evidence/` in .gitignore | ok (line 2) | .gitignore |
| Gate 0 approver | ok (recorded; value in profile) | gate0_confirmations |
| Gate 0 date | ok (2026-11-03) | gate0_confirmations |
| Claude plan approved for this data_class | ok (human-confirmed `true`) | gate0_confirmations |
| Dedicated minimum-privilege test account | ok (human-confirmed `true`); see condition C1 for the DEMO-003 account | gate0_confirmations |
| No secrets in repo/prompts | ok (human-confirmed `true`); see conditions C2 to C4 | gate0_confirmations |
| Allowed hosts confirmed non-production | ok (human-confirmed `true`) | gate0_confirmations |
| Waivers (`data.gate0_waivers`) | none present; nothing WAIVED | qa-profile.yaml |

## Credential-handling conditions (apply to DEMO-003)
- C1. The test account is created by THE HUMAN on the demo site, is dedicated and minimum-privilege, uses a fake identity (no real name, email or phone), and is kept outside the repo. Do not reuse a password used anywhere else.
- C2. Credentials exist only as the human's environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`. No value in any file, report, evidence, prompt or chat.
- C3. The AI only reads the page with playwright-cli (in-memory Chrome profile, snapshot and screenshot). The AI does not type into any field and does not submit any form.
- C4. Any run that types the password is done by the human in their own terminal. The AI does not run it and does not see its output unless the output has been checked to contain no credentials.
- C5. The Playwright script reads `process.env`, fails fast if a variable is unset, has no defaults, does not log the values, and has trace, video and screenshot turned off for that spec.
- C6. Evidence goes only under `workspace/DEMO-003/evidence/run-1/` (git-ignored). A screenshot taken after login or with a filled form must not be opened by the AI without a post-run check; if any doubt, keep it as "not scanned: needs human review".
- C7. If a credential is pasted into a conversation or file, treat it as leaked: revoke and rotate it (policy section 7).
- C8. Run Data Guard in `post-run` mode on `workspace/DEMO-003/` before anything is shared.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none (pre-run, no files scanned) | - | - | - | - |

## Open questions
(Non-blocking notes for the human; they do not change the verdict.)
1. `demowebshop.tricentis.com` is a public domain. It is a known public practice shop and the human has confirmed it as non-production, so it is accepted. Please keep fake data only, because this is a shared public site.
2. `test_account_confirmed` is a general confirmation dated 2026-11-03. Please confirm the DEMO-003 account was created per C1 before the human-run login step. The page-reading step needs no account.
3. The Gate 0 confirmations are not tied to a feature ID. Re-confirm if the scope grows beyond the login check.
4. Revisit `no_production_hosts` as soon as a real production host exists.
