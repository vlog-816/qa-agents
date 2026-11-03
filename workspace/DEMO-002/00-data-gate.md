# Data Guard: pre-run
- Date: 2026-11-03
- Feature ID: DEMO-002
- Verdict: PASS

Production host list waived by human declaration (pilot only) / Danh sách production host được miễn theo khai báo của con người (chỉ cho pilot).

No gate0 waivers are in effect (no `data.gate0_waivers` block in `qa-profile.yaml`). / Không có waiver nào đang áp dụng.

Scope reviewed / Phạm vi: exploratory testing of https://demowebshop.tricentis.com/books (host `demowebshop.tricentis.com`, in `allowed_hosts`). Read-only browsing via playwright-cli, in-memory profile; no login, no forms, no purchases, no personal data. Evidence in `workspace/DEMO-002/evidence/run-1/`.

## Checklist (pre-run only)
| Item | Status (ok / needs human confirmation / fail) | Source |
|---|---|---|
| `data_class` declared and valid (`synthetic`) | ok | qa-profile.yaml `data.data_class` |
| `allowed_hosts` non-empty, no overlap with `blocked_hosts`, no known production host | ok (public demo shop, human-confirmed non-production) | qa-profile.yaml `data.allowed_hosts` |
| `real_data_approval_ref` (only if real) | ok (not applicable, class is synthetic) | qa-profile.yaml |
| `masking_approval_ref` (only if masked) | ok (not applicable) | qa-profile.yaml |
| Dedicated minimum-privilege test account | ok (human-confirmed; this run uses no login) | `gate0_confirmations.test_account_confirmed: true` |
| No secrets in prompts or repo files | ok (human-confirmed) | `gate0_confirmations.no_secrets_in_repo_confirmed: true` |
| Claude plan approved for this data_class | ok (human-confirmed) | `gate0_confirmations.claude_plan_approved: true` |
| `blocked_hosts` or `no_production_hosts: true` | ok (`no_production_hosts: true`, `blocked_hosts: []`, data_class synthetic, consistent) | qa-profile.yaml |
| Allowed hosts confirmed non-production | ok (human-confirmed, not waived) | `gate0_confirmations.allowed_hosts_confirmed_non_production: true` |
| Jira read-only | ok | qa-profile.yaml `jira.mode: read-only` |
| `workspace/**/evidence/` in `.gitignore` | ok | .gitignore line 2 |
| `team` filled in | ok (`qa-pilot`) | qa-profile.yaml |
| Gate 0 approver and date recorded | ok (Boss-QA, 2026-11-03) | `gate0_confirmations.approver`, `.date` |

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | (none, pre-run) | - | - | - | - |

## Open questions
None blocking. Reminders (non-blocking):
- `localhost` is also in `allowed_hosts`; this run is limited to `demowebshop.tricentis.com`. Following links must stay on that host.
- No host-enforcing hook is active (data-policy section 9); host limits rely on agent discipline. Revisit `no_production_hosts` once a real production host exists.
- Run Data Guard in post-run mode before sharing any evidence. Screenshots may be opened by Data Guard since data_class is synthetic.
