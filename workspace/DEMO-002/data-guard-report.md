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

---

# Data Guard: post-run (automation run 1 post-run)
- Date: 2026-11-04
- Feature ID: DEMO-002
- Run: automation run 1 (TC-002, TC-004, TC-007, TC-009; 4 passed)
- data_class (from qa-profile.yaml): synthetic (images may be opened; none existed in scope)
- Verdict: PASS

## Scope scanned
- `workspace/DEMO-002/07-automation/`: `00-selection.md`, `01-review.md`, `run-1-results.md` (all read in full).
- `workspace/DEMO-002/07-traceability.md` (read in full).
- `workspace/DEMO-002/evidence/`: `automation-run-1/` does not exist (no failures), as expected. Existing folders `run-1`, `run-1-aborted`, `run-2` were already covered by the run-2 post-run and are not part of this run.
- `test-results/`: only `.last-run.json` (status passed, no failed tests). No screenshots, traces or videos. `playwright-report/`: does not exist.
- Code: `playwright.config.ts`, `tests/helpers/host-guard.ts`, `tests/helpers/books-page.ts`, `tests/DEMO-002/tc-002.spec.ts`, `tc-004.spec.ts`, `tc-007.spec.ts`, `tc-009.spec.ts` (all read in full).
- `.gitignore` excludes `workspace/**/evidence/`, `test-results/`, `playwright-report/`, `blob-report/`.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| - | none | - | - | - | - |

Pattern searches over the code, the 07-automation files and the traceability file, no real hit: emails, Vietnamese phone formats (0xxxxxxxxx, +84), 9 to 19 digit numbers, password, Bearer, Authorization, API key, secret, token, JWT-like strings, login, credential. The only matches are prose such as "no login", "no credentials" and "no secrets" in the review and selection files.

## Code check
- Typed input: none. No `fill`, `type` or `pressSequentially` calls. Interaction is limited to `selectOption` on the sort and display dropdowns and clicks on pager and price-filter links.
- Login or credentials: none. No cart, no account, no form submission.
- Hosts: the only host in code is `demowebshop.tricentis.com` (`baseURL` in `playwright.config.ts` and `ALLOWED_HOSTS` in `host-guard.ts`). It is a subset of `data.allowed_hosts`. No `blocked_hosts` entry exists (`no_production_hosts: true`). The host guard aborts other http/https hosts and also checks `baseURL`.
- Test data: only paths and query values (`/books`, `orderby`, `pagesize`, `pagenumber`, `price=-25`) and a price limit of 25.00. No personal data.

## Open questions
- Advisory, does not change the verdict: the host guard records blocked third-party hosts only as an annotation, and the `list` reporter does not print them. So it is not known whether any request left for a non-allowed host. They were aborted, not sent. If the approver wants proof, run once with a JSON or HTML reporter. The guard does not cover WebSocket traffic (noted in the review).
- Advisory: `run-1-results.md` still says "Data Guard post-run: pending". A human or the main session should update it. This PASS does not replace the Gate `automation` (results) approval, which is still waiting for a human.
- Advisory: Gate 0 confirmations are dated 2026-11-03 and the run was 2026-11-04. The pre-run was PASS and the policy does not set a limit here; the approver may want a same-day confirmation.
- Advisory, carried over from run-2: `.playwright-cli/` was not listed in this scan and may hold raw snapshots of the same public page.
