# Data Guard: pre-run
- Date: 2026-11-03
- Feature ID: DEMO-001
- Verdict: PASS (with 2 WAIVED items, pilot only)

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
| `evidence/` in `.gitignore` | ok (`workspace/**/evidence/` present) | .gitignore line 2 |
| Gate 0 approver (name) | ok (`Boss-QA`) | gate0_confirmations.approver |
| Gate 0 date | ok (`2026-11-03`) | gate0_confirmations.date |
| Claude plan approved for this data_class | ok (human confirmed: true) | gate0_confirmations.claude_plan_approved |
| Dedicated minimum-privilege test account | ok (human confirmed: true) | gate0_confirmations.test_account_confirmed |
| No secrets in prompts or repo files | WAIVED (not confirmed; value is `false`) | gate0_confirmations.no_secrets_in_repo_confirmed; gate0_waivers |
| Every allowed host is non-production | WAIVED (not confirmed; value is `false`) | gate0_confirmations.allowed_hosts_confirmed_non_production; gate0_waivers |

## Waivers
- Waiver applies to feature `DEMO-001`, which matches this run. The waived items are exactly the two items that section 3 of `docs/data-policy.md` allows to be waived for a pilot.
- WAIVED items: `no_secrets_in_repo_confirmed`, `allowed_hosts_confirmed_non_production`.
- Reason (from profile): public practice site, fake data only; approver will set the confirmations later.
- Requested by: approver, in chat, 2026-11-03.
- Data Guard did not fill in or assume these confirmations. They remain unconfirmed.
- The waiver is valid for DEMO-001 only. Remove `data.gate0_waivers` after the pilot and set both confirmations to `true`. Any other feature ID gets HOLD until then.
- `demowebshop.tricentis.com` is a public domain. Data Guard cannot independently tell whether it is non-production. The PASS relies on the human waiver and on the declared fake-data-only use. Do not enter any real data on this host.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | - | - | none (pre-run, no data scan) | - | - |

## Open questions
- None blocking. Reminder: the two WAIVED items are still unconfirmed by a human, and the waiver must be removed after the DEMO-001 pilot.
