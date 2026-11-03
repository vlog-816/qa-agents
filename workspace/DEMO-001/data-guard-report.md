# Data Guard: post-run
- Date: 2026-11-03
- Feature ID: DEMO-001
- Verdict: PASS
- data_class: synthetic (from qa-profile.yaml)
- Scope: 10 text files under workspace/DEMO-001/ (00-data-gate.md, 01-requirements.md, 03-test-plan.md, 04-test-cases.md, 06-report.md, 07-traceability.md, 05-execution/exploration-notes.md, 05-execution/session-2-notes.md, 05-execution/token-record.md, and the previous data-guard-report.md, which is overwritten by this one). New since the last scan: 07-traceability.md. No evidence/ folder and no images exist, so nothing was left unscanned.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none | - | No emails, phone numbers (0xxxxxxxxx, +84), 9/12-digit IDs, 13-19 digit card/account numbers, passwords, tokens, API keys, JWT strings, Authorization/Bearer headers, or name plus address/date-of-birth found | - | - |

Reviewed and judged non-sensitive:
- 07-traceability.md (new): contains only TC/REQ/finding IDs (F-01, F-02), result words, short test notes and a reference to `docs/backlog/BACKLOG.md` (BL-005). No personal data, credentials or URLs.
- "token" in token-record.md and 06-report.md means LLM token usage; the numbers are comma-separated counts.
- Long numbers in 04-test-cases.md TC-012 (2147483648 and a 20-digit run of nines) are deliberate boundary test inputs, not IDs or card numbers.
- "password", "cookie" and "address" appear only as policy or test descriptions (for example the HttpOnly cart cookie), with no values.
- URLs contain no credentials. Names found are only the approver label (Boss-QA) and demo product names.

## Open questions
- None from the scan.
- Carry-over for the human, not a data finding: Gate 0 items `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` are only WAIVED for DEMO-001 (both still `false` in qa-profile.yaml). Confirm them and remove the waiver block after the demo.
- Note: `docs/backlog/BACKLOG.md` is referenced by 07-traceability.md but is outside this scan scope (workspace/DEMO-001/ only).
