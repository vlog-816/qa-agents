# Data Guard: pre-run
- Date: 2026-11-03
- Feature ID: DEMO-001
- Run scope (latest, run-4): Gate 0 re-check only (BL-006 cleanup verification). No test run is planned.
- Verdict: PASS (no waivers) / PASS (không có miễn trừ)

Production host list waived by human declaration (pilot only) / Danh sách host production được miễn theo khai báo của con người (chỉ cho pilot).

## Checklist (pre-run only)
| Item | Status (ok / needs human confirmation / fail) | Source |
|---|---|---|
| `team` filled, not a placeholder | ok (`qa-pilot`) | qa-profile.yaml `team` |
| `data_class` valid and declared | ok (`synthetic`) | qa-profile.yaml `data.data_class` |
| `real_data_approval_ref` | ok (not required, class is not real) | qa-profile.yaml |
| `masking_approval_ref` | ok (not required, class is not masked) | qa-profile.yaml |
| `allowed_hosts` not empty, none in `blocked_hosts` | ok (`localhost`, `demowebshop.tricentis.com`; `blocked_hosts` is empty) | qa-profile.yaml `data.allowed_hosts` |
| `blocked_hosts` / `no_production_hosts` consistent | ok (`no_production_hosts: true`, `blocked_hosts: []`, `data_class: synthetic`); production host list waived by human declaration (pilot only) | qa-profile.yaml |
| `jira.mode` is read-only | ok | qa-profile.yaml `jira.mode` |
| `evidence/` in `.gitignore` | ok (`workspace/**/evidence/` present, line 2) | .gitignore |
| Gate 0 approver (name) | ok (`Boss-QA`) | gate0_confirmations.approver |
| Gate 0 date | ok (`2026-11-03`) | gate0_confirmations.date |
| Claude plan approved for this data_class | ok (human confirmed: true) | gate0_confirmations.claude_plan_approved |
| Dedicated minimum-privilege test account | ok (human confirmed: true) | gate0_confirmations.test_account_confirmed |
| No secrets in prompts or repo files | ok (human confirmed: true) | gate0_confirmations.no_secrets_in_repo_confirmed |
| Every allowed host is non-production | ok (human confirmed: true) | gate0_confirmations.allowed_hosts_confirmed_non_production |

## Waivers
- None. The `data.gate0_waivers` block is no longer in `qa-profile.yaml`. Both formerly waived items are now confirmed `true` by the human approver. Data Guard did not fill in or assume any confirmation.
- Waiver cleanup (BL-006) verified in the profile.

## History
- run-4 (this run): gate re-check after waiver removal. PASS, no waivers.
- run-3: tooling check of `manual-tester` with `playwright-cli`, one public page, one screenshot under `workspace/DEMO-001/evidence/run-3/`. Verdict was PASS with waivers: no_secrets_in_repo_confirmed, allowed_hosts_confirmed_non_production (reason: public practice site, fake data only; approver to set confirmations later). Superseded.
- run-2: same tooling check, evidence under `workspace/DEMO-001/evidence/run-2/`. Verdict was PASS with the same waivers. Superseded.

## Notes
- No test run is planned now. Before any future run, re-check Gate 0 (scope and host for that run).
- Data Guard did not modify `qa-profile.yaml`.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | - | - | none (pre-run, no data scan) | - | Evidence of run-2 and run-3 has not been scanned by post-run mode in this check; run Data Guard post-run on `workspace/DEMO-001/evidence/` before sharing anything |

## Open questions
- None blocking. `demowebshop.tricentis.com` is a public domain, and Data Guard cannot independently verify from files that it is non-production. The PASS relies on the human confirmation `allowed_hosts_confirmed_non_production: true`, the `no_production_hosts` declaration and the demo-shop name.
- Revisit `no_production_hosts: true` as soon as a production host exists (set it to false and fill `blocked_hosts`).
