# Data Guard: pre-run
- Date: 2026-11-03
- Feature ID: DEMO-001
- Run scope (latest, run-3): tooling check of the `manual-tester` subagent with the `playwright-cli` skill. Open ONE public page (https://demowebshop.tricentis.com/) in installed Chrome with an in-memory profile, take one screenshot saved under `workspace/DEMO-001/evidence/run-3/`. No login, no forms, no purchases, no typed input, fake data only.
- Previous run scope (run-2): same tooling check of `playwright-cli`, one page, one snapshot and one screenshot under `workspace/DEMO-001/evidence/run-2/`.
- Verdict (run-3): PASS with waivers: no_secrets_in_repo_confirmed, allowed_hosts_confirmed_non_production, reason: "Public practice site https://demowebshop.tricentis.com, fake data only; approver will set the confirmations later" / PASS kèm miễn trừ: no_secrets_in_repo_confirmed, allowed_hosts_confirmed_non_production (chỉ cho pilot).
- Verdict (run-2, kept): PASS with the same waivers.

Production host list waived by human declaration (pilot only) / Danh sách host production được miễn theo khai báo của con người (chỉ cho pilot).

## Checklist (pre-run only)
| Item | Status (ok / needs human confirmation / fail) | Source |
|---|---|---|
| `team` filled, not a placeholder | ok (`qa-pilot`) | qa-profile.yaml `team` |
| `data_class` valid and declared | ok (`synthetic`) | qa-profile.yaml `data.data_class` |
| `real_data_approval_ref` | ok (not required, class is not real) | qa-profile.yaml |
| `masking_approval_ref` | ok (not required, class is not masked) | qa-profile.yaml |
| `allowed_hosts` not empty, none in `blocked_hosts` | ok (`localhost`, `demowebshop.tricentis.com`; `blocked_hosts` is empty). The run host is in the allowed list | qa-profile.yaml `data.allowed_hosts` |
| `blocked_hosts` / `no_production_hosts` consistent | ok (`no_production_hosts: true`, `blocked_hosts: []`, `data_class: synthetic`); production host list waived by human declaration (pilot only) | qa-profile.yaml |
| `jira.mode` is read-only | ok | qa-profile.yaml `jira.mode` |
| `evidence/` in `.gitignore` | ok (`workspace/**/evidence/` present, line 2) | .gitignore |
| Gate 0 approver (name) | ok (`Boss-QA`) | gate0_confirmations.approver |
| Gate 0 date | ok (`2026-11-03`) | gate0_confirmations.date |
| Claude plan approved for this data_class | ok (human confirmed: true) | gate0_confirmations.claude_plan_approved |
| Dedicated minimum-privilege test account | ok (human confirmed: true) | gate0_confirmations.test_account_confirmed |
| No secrets in prompts or repo files | WAIVED (not confirmed; value is `false`) | gate0_confirmations.no_secrets_in_repo_confirmed; gate0_waivers |
| Every allowed host is non-production | WAIVED (not confirmed; value is `false`) | gate0_confirmations.allowed_hosts_confirmed_non_production; gate0_waivers |

## Waivers
- Waiver `feature_id` is `DEMO-001`, which matches this run (run-3).
- WAIVED items: `no_secrets_in_repo_confirmed`, `allowed_hosts_confirmed_non_production`. Neither is `approver`, `date` or `claude_plan_approved`, so they are waivable.
- Reason (from profile): public practice site, fake data only; approver will set the confirmations later.
- Requested by: approver, in chat, 2026-11-03.
- Data Guard did not fill in or assume these confirmations. They remain unconfirmed.
- The waiver is valid for DEMO-001 only. Any other feature ID gets HOLD until the confirmations are set to `true`. Remove `data.gate0_waivers` after the pilot.
- A waiver never overrides a BLOCK condition. No BLOCK condition applies.

## Run-specific notes (run-2)
- Only the allowed host `demowebshop.tricentis.com` is used. No other host or redirect target is approved. Stop if the page redirects elsewhere.
- No login, forms, purchases or typed input. Do not enter any real data on this host.
- The snapshot and screenshot go only under `workspace/DEMO-001/evidence/run-2/` (gitignored).
- `data_class` is `synthetic`, so Data Guard may open the screenshot in post-run mode.
- Chrome with a temporary profile means no saved accounts or cookies should be present. This is a human-side setup detail that Data Guard cannot verify.

## Run-specific notes (run-3)
- Subagent under test: `manual-tester` with the `playwright-cli` skill. Profile re-read for run-3: values unchanged from run-2 (same confirmations, same waiver for DEMO-001).
- Only the allowed host `demowebshop.tricentis.com` is used, one page (the home page). No other host or redirect target is approved. Stop if the page redirects elsewhere.
- No login, forms, purchases or typed input. Fake data only.
- In-memory browser profile: no saved accounts or cookies should be present. Data Guard cannot verify this from files.
- The screenshot goes only under `workspace/DEMO-001/evidence/run-3/` (gitignored by `workspace/**/evidence/`). Do not write snapshot or other output outside that folder.
- `data_class` is `synthetic`, so Data Guard may open the screenshot in post-run mode.
- Data Guard did not modify `qa-profile.yaml`.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | - | - | none (pre-run, no data scan) | - | Run Data Guard post-run on `workspace/DEMO-001/evidence/run-3/` (and run-2 if not yet done) before sharing anything |

## Open questions
- None blocking. `demowebshop.tricentis.com` is a public domain, and Data Guard cannot independently verify it is non-production. The PASS relies on the name (demo shop), the profile comment, the human `no_production_hosts` declaration and the waiver. If the approver considers it unclear, treat it as production and stop.
- Confirm these before the waiver is removed: `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` (both still `false`).
