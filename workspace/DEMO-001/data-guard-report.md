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

---

# Data Guard: post-run, run-2 (added section; earlier results above are kept)
- Date: 2026-11-03
- Feature ID: DEMO-001
- Verdict: PASS
- data_class: synthetic (from qa-profile.yaml), so the image was opened and checked
- Scope: workspace/DEMO-001/evidence/run-2/ only (2 files: home-1.png, home-1-snapshot.yml). Source: public page https://demowebshop.tricentis.com/ (host is in allowed_hosts), anonymous session, no login, no forms, no typed input.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | home-1-snapshot.yml | all (1-333) | none: no emails, phones, 9/12-digit IDs, 13-19 digit card or account numbers, passwords, tokens, API keys, JWT strings, Authorization/Bearer headers, names with addresses or dates of birth | - | - |
| - | home-1.png | - | none: image shows only the anonymous home page (logo, menus, categories, tags, newsletter box empty, poll, welcome text); no personal data, no credentials, no logged-in user name | - | - |

Reviewed and judged non-sensitive:
- Snapshot numbers are review counts, prices (for example 25.00, 1590.00), element refs (e2 to e314), tag IDs in URLs and cart/wishlist counts (0). None are ID, card or phone formats.
- Snapshot URLs are site-relative links or public social/vendor links (tricentis.com, nopCommerce, Facebook, Twitter, YouTube); no query strings, session IDs or credentials.
- Search box shows the default placeholder "Search store"; the newsletter textbox is empty. No cookies or headers are captured in the snapshot.
- "Copyright 2026 Tricentis Demo Web Shop" and demo product names are public site content.

## Open questions
- None from the scan. No images were left unscanned.
- Carry-over (not a data finding): the Gate 0 waivers for `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` still apply only to DEMO-001; confirm them before the waiver is removed.

---

# Data Guard: post-run, run-3 (added section; earlier results above are kept)
- Date: 2026-11-03
- Feature ID: DEMO-001
- Verdict: PASS
- data_class: synthetic (from qa-profile.yaml), so the image was opened and checked
- Scope: workspace/DEMO-001/evidence/run-3/ only (2 files: home-1.png, home-1-snapshot.yml). Source: public page https://demowebshop.tricentis.com/ (host is in allowed_hosts), Chrome with in-memory profile, anonymous session, no login, no forms, no typed input.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | home-1-snapshot.yml | all (1-333) | none: no emails, phones, 9/12-digit IDs, 13-19 digit card or account numbers, passwords, tokens, API keys, JWT strings, Authorization/Bearer headers, names with addresses or dates of birth | - | - |
| - | home-1.png | - | none: image shows only the anonymous home page (logo, menus, categories, tags, empty newsletter box, poll, welcome text, Tricentis Academy banner with a public vendor URL); no personal data, no credentials, no logged-in user name | - | - |

Reviewed and judged non-sensitive:
- Snapshot numbers are review counts, prices, element refs (e2 to e314), tag IDs in URLs and cart/wishlist counts (0). None are ID, card or phone formats.
- Snapshot URLs are site-relative links or public social/vendor links; no query strings, session IDs or credentials.
- Search box shows the default placeholder "Search store"; the newsletter textbox is empty. No cookies or headers are captured.
- The public banner URL in the screenshot is vendor marketing content, not a secret.
- Content is consistent with run-2 and with the stated no-login, no-input session.

## Open questions
- None from the scan. No images were left unscanned.
- Carry-over (not a data finding): the Gate 0 waivers for `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` still apply only to DEMO-001; confirm them before the waiver is removed.
