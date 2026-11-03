# Data Guard: post-run
- Date: 2026-11-03
- Feature ID: DEMO-001
- Verdict: PASS
- data_class: synthetic (from qa-profile.yaml)
- Scope: 8 text files under workspace/DEMO-001/ (00-data-gate.md, 01-requirements.md, 03-test-plan.md, 04-test-cases.md, 06-report.md, 05-execution/exploration-notes.md, 05-execution/session-2-notes.md, 05-execution/token-record.md). No evidence/ folder and no images exist.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none | - | No emails, phone numbers (0xxxxxxxxx, +84), 9/12-digit IDs, 13-19 digit card/account numbers, passwords, tokens, API keys, JWT strings, Authorization/Bearer headers, or name plus address/date-of-birth found | - | - |

Keyword hits reviewed and judged non-sensitive: "token" in token-record.md and 06-report.md refers to LLM token usage. "password", "cookie" and "address" in 03-test-plan.md, 01-requirements.md, 04-test-cases.md, 06-report.md and session-2-notes.md are policy statements or descriptions of tests. They contain no values. No credentials embedded in URLs.

## Open questions
- None from the scan.
- Carry-over for the human, not a data finding: Gate 0 items `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` are only WAIVED for DEMO-001 in qa-profile.yaml (both still `false`). Confirm them and remove the waiver block.
