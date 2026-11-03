# Data Guard: post-run (run-2 post-run)
- Date: 2026-11-03
- Feature ID: DEMO-002
- Run: run-2
- data_class (from qa-profile.yaml): synthetic (screenshots may be opened)
- Verdict: PASS

## Scope scanned
- `evidence/run-2/`: 15 yml page snapshots (text) and 5 png screenshots (opened, allowed for synthetic).
- `05-execution/session-1..5-notes.md`, `06-report-run-2.md`, `07-traceability.md`.
- `evidence/run-1-aborted/` (4 png): not part of the verdict, looked at for information only.
- Note: sessions 1, 4 and 5 notes, the report and the traceability file were read in full. Session 2 and 3 notes were scanned with pattern searches only (no match), not read line by line.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none | - | - | - | - |

Checks done, all with no hit: emails, phone numbers (0xxxxxxxxx, +84), 9 to 19 digit numbers (ID, card, account), password, Bearer, JWT, token, Authorization, API key, typed text in textboxes (the only textbox value is the default placeholder "Search store"; the newsletter box is empty), names with addresses or dates of birth. The 5 screenshots show only the public Demo Web Shop Books page (product names, prices, controls); the search and newsletter boxes are empty or default. The "Shopping cart(0)" and "Wishlist(0)" counters show nothing was added.

## Host check
- No evidence that the browser left `demowebshop.tricentis.com`. The snapshots contain no "Page URL" lines, so this rests on three things: the report states the URL was checked after every command (33 commands, always on-host, no external link clicked); the sessions record only on-host paths (`/books?...`); every absolute URL in the 15 snapshots is either `https://demowebshop.tricentis.com/books?...` or a footer link target.
- External link targets (fine, as agreed): facebook.com/nopCommerce, twitter.com/nopCommerce, youtube.com/user/nopCommerce, plus.google.com/+nopcommerce, nopcommerce.com. They appear as link targets only, in every snapshot, and no page content from them is present.
- Host `demowebshop.tricentis.com` is in `allowed_hosts`. No blocked host involved.

## run-1-aborted (not in the verdict)
4 screenshots (CH-01-001, CH-01-002, CH-02-001, CH-03-001): same public Books page, no personal data, no secrets. Nothing sensitive.

## Open questions
- Advisory, outside the scanned scope: the report says `D:\Source\qa-agents\.playwright-cli\` was not deleted and still holds raw snapshots. I could not list it (not read as part of this scan). It should hold the same public, synthetic page content, but a human should delete it or approve the deletion. It does not change this verdict.
- The report says the Results gate is waiting for human approval; this PASS does not replace that approval.
