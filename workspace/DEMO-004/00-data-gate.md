# Data Guard: pre-run
- Date: 2026-11-04
- Feature ID: DEMO-004
- Verdict: PASS

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
