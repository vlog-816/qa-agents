# Data Guard: post-run
- Date: 2026-11-03
- Feature ID: DEMO-001
- Verdict: PASS
- data_class: synthetic (from qa-profile.yaml)
- Scope: 8 text files under workspace/DEMO-001/ (00-data-gate.md, 01-requirements.md, 03-test-plan.md, 04-test-cases.md, 06-report.md, 05-execution/exploration-notes.md, 05-execution/session-2-notes.md, 05-execution/token-record.md). The previous version of this report was overwritten. No evidence/ folder and no images exist.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none | - | No emails, phone numbers (0xxxxxxxxx, +84), 9/12-digit IDs, 13-19 digit card/account numbers, passwords, tokens, API keys, JWT strings, Authorization/Bearer headers, or name plus address/date-of-birth found | - | - |

Reviewed and judged non-sensitive:
- "token" in token-record.md and 06-report.md refers to LLM token usage; the numbers there are comma-separated counts.
- Long numbers in 04-test-cases.md TC-012 (2147483648 and a 20-digit run of nines) are deliberate boundary test inputs, not IDs or card numbers.
- "password", "cookie" and "address" appear only as policy or test descriptions (for example the HttpOnly cart cookie in 06-report.md), with no values.
- URLs contain no credentials. Names found are only the approver label (Boss-QA) and demo product names.

## Open questions
- None from the scan.
- Carry-over for the human, not a data finding: Gate 0 items `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` are only WAIVED for DEMO-001 (both still `false`). Confirm them and remove the waiver block after the demo.
- 06-report.md still says "Data Guard post-run: pending". The owner may update it to PASS (Data Guard does not edit it).
