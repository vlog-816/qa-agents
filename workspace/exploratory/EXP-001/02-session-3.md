# Exploration session: EXP-001 session 3

- Exploration ID: EXP-001 (charter CH-01 continued, same approved brief)
- Session: 3
- Date: 2026-11-05
- Scope decided by the user: explore the Dashboard page now (the user said its data is fake data); Generate and Analyze on the Home page stay unused; no downloads, no deleting
- Environment (`data_class`): synthetic, staging host `assistant-qa-staging.vercel.app`
- Browser / OS: Chrome via `playwright-cli`, hidden, Windows
- Pages of this app (name, address, what it is): see "Pages seen" at the top of `03-report.md`.

## Mission

Explore the Dashboard page and the View page it links to: tabs, table, content, and three window sizes.

## Notes (what was done and observed)

| # | Page | Action | Observation | Evidence (path) |
|---|---|---|---|---|
| 1 | Login page (`/login`), then Home page (`/`) | Signed in with the fake test account | Signed in, on the Home page | text only |
| 2 | Dashboard page (`/dashboard`), opened with the "Dashboard" link in the header | Looked at the page at 1920x1080, tab "All" | A table with eight columns: issue key (with a "Published" badge), status "Completed", mode "Manual", owner, created, time, cost and a "View" link; three rows, owner `user1@gmail.com` (fake data) | `evidence/dashboard-all-1920x1080.png` |
| 3 | Dashboard page, tab "Mine" | Clicked "Mine" | Empty state: "No generations found. Start by generating test cases!" with a "Generate Test Cases" button; the address stays `/dashboard` | `evidence/dashboard-mine-1920x1080.png` |
| 4 | Dashboard page, tab "Published" | Clicked "Published" | Same three rows as "All" (all are published) | text only |
| 5 | View page (`/<id>/view`, for AIP-4), opened with the first "View" link | Looked at the page | Title "AIP-4's test cases", a "Published" badge, folder AIP, "Version 1", a created date, the owner, a "Download" button, a "Back to Dashboard" link, and the generated test cases (TC01, TC02 ... with priority, preconditions, steps, expected result). I did not click "Download" | `evidence/view-aip4-1920x1080.png` |
| 6 | Dashboard page (`/dashboard`), reached with "Back to Dashboard" | Size tour at 375x667 | The header title wraps into four lines and is cut at the top; the table shows only the first columns and scrolls sideways inside its card (the owner, created, time, cost and "View" columns are off screen until scrolled) | `evidence/dashboard-375x667.png`, `evidence/dashboard-375x667-scrolled.png` |
| 7 | Dashboard page, 768x1024 | Size tour | All columns fit when scrolled to the right; header, tabs and table are readable; the header email is close to the navigation links | `evidence/dashboard-768x1024.png` |
| 8 | (no page) | Closed the browser and deleted the scratch folder | No downloads, no clicks on Generate or Analyze, no deleting | - |

## Findings

New `FIND-###` items are in `03-report.md` (FIND-010 and FIND-011).

## Follow-ups

- Generate and Analyze on the Home page, and "Download" on the View page: waiting for the user's decisions.
- Direct links to a View page by its address while signed out; reload on the Dashboard page (does the chosen tab stay?); the View page at small sizes.

## Open questions

- Same as in `03-report.md`.
