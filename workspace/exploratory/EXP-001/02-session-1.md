# Exploration session: EXP-001 session 1

- Exploration ID: EXP-001 (charter CH-01, from `01-brief.md`)
- Session: 1
- Date: 2026-11-05
- Time box: about 15 minutes planned; stopped early (real-data stop rule)
- Environment (`data_class`): synthetic, staging host `assistant-qa-staging.vercel.app`
- Browser / OS: Chrome via `playwright-cli`, hidden, Windows
- Pages of this app (name, address, what it is): see "Pages seen" at the top of `03-report.md`.

## Mission

Explore sign-up, login and the signed-in area with the tours that fit, to find problems in messages, validation, states and layout.

## Notes (what was done and observed)

| # | Page | Action | Observation | Evidence (path) |
|---|---|---|---|---|
| 1 | Login page (`/login`), reached from `/` | Opened the site address `/` while signed out (first look, read-only) | The site sends a signed-out visitor to the Login page: heading "Welcome back!", Email Address and Password fields, "Sign in" button, "Sign up" link | `evidence/home-1.png`, `evidence/home-1-snapshot.yml` |
| 2 | Login page (`/login`) | Size tour at 375x667, 768x1024 and 1920x1080 | The card is centered and fully visible at all three sizes; nothing cut off or overlapped | `evidence/login-375x667.png`, `login-768x1024.png`, `login-1920x1080.png` |
| 3 | Login page (`/login`) | Clicked "Sign in" with both fields empty | Message "Missing username or password"; the backend answered 422 (console) | `evidence/login-empty-submit.png` |
| 4 | Sign-up page (`/register`), opened with the "Sign up" link on the Login page | Clicked "Create Account" with all fields empty | Message "Email and password are required"; the backend answered 400 (console) | text read from the page; no screenshot |
| 5 | Sign-up page (`/register`) | Filled a fake name, the text `notanemail` and a one-character password; clicked "Create Account" | The old message stayed; focus moved to the Email field; no new backend error appeared (the browser probably blocked the submit; its tooltip is not visible in a hidden browser) | none |
| 6 | Sign-up page (`/register`), then Home page "Generate Test Cases" (`/`) | Reloaded the Sign-up page and registered the test account (fake data, recorded per `test-accounts.md`) | Account created; the browser went to the Home page signed in: header shows the email, links "Generate" and "Dashboard", a "Logout" button | `evidence/register-clean-1920x1080.png` (before typing), `evidence/signed-in-home-1920x1080.png` |
| 7 | Home page "Generate Test Cases" (`/`, signed in) | Typed `abc` in the Jira key field (not a Jira key format); did not click | The "Analyze" and "Generate" buttons became enabled | none |
| 8 | Dashboard page (`/dashboard`, signed in), opened with the "Dashboard" link in the header | Looked at the page | A table of generations with the owner email of other users, issue keys, status and a cost per run; it looks like real personal data (the type: an email address of another user) | none taken on purpose |
| 9 | Dashboard page (`/dashboard`) | **Stopped** (stop rule: possible real personal data). Closed the browser and deleted the scratch folder `.playwright-cli/` | Nothing from the Dashboard page is saved in any file | - |

## Findings

`FIND-###` items are in `03-report.md` (no verdicts).

## Follow-ups

- Logout, Back after logout, direct links while signed out, wrong-password and valid login, keyboard-only tour, duplicate-email sign-up (done in session 2).
- Dashboard page details and its "View" pages, after the user decides about the personal data.
- Generate and Analyze on the Home page, after the user confirms they may be used (they appear to cost money).

## Open questions

- Is the data on the Dashboard page demo data or real? Should a new user see other users' rows on its "All" tab?
- May I use Generate and Analyze on the Home page (a cost per run is shown on the Dashboard page)?
- Deviation to fix in our templates: `templates/exploration-session.md` still says `BUG-###` and severity; this exploration used `FIND-###` without severity, as `.claude/rules/exploratory.md` says.
