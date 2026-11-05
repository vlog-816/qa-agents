# Exploration report: EXP-001 (staging web app, dry run)

- Date: 2026-11-05
- Host: https://assistant-qa-staging.vercel.app (an "AI-powered test assistant": you enter a Jira key and it generates test cases)
- Sessions: 3 (`02-session-1.md`, stopped early by the real-data stop rule; `02-session-2.md`, continued without the Dashboard page; `02-session-3.md`, the Dashboard page after the user said its data is fake)
- Items are findings (`FIND-###`), not verdicts. The user decides what is a bug.
- **Decision (user, 2026-11-05):** none of the findings (FIND-001 to FIND-011) is a bug. No `BUG-###` was created. They stay on record as observations.

## Pages seen

| Page name | Address | What it is |
|---|---|---|
| Login page | `/login` | Sign-in form (email, password, "Sign in", "Sign up" link). A signed-out visit to `/` ends here. |
| Sign-up page | `/register` | Create-account form (full name, email, password, "Create Account"). |
| Home page "Generate Test Cases" | `/` (signed in) | A field for a Jira key with "Analyze" and "Generate" buttons; header with "Generate", "Dashboard" and "Logout". |
| Dashboard page | `/dashboard` (signed in) | Tabs "All", "Mine" and "Published" and a table of generations: issue key, status, mode, owner, created, time, cost, "View" link. |
| View page | `/<id>/view` (signed in), opened with a "View" link | The generated test cases of one record (title, "Published" badge, version, date, owner, "Download" button, "Back to Dashboard" link, then the test cases). |
| Not-found page | any unknown address, for example `/nope-404` | A picture page with "404 NOT FOUND" and a "Go home" button. |

## Findings

### FIND-001: Empty sign-in says "username" for an email field
- **Where:** Login page (`/login`), the form
- **I did:** clicked "Sign in" with both fields empty.
- **I saw:** the message "Missing username or password" (the field is labelled "Email Address"); the backend answered 422.
- **Expected idea:** content consistency: the message should name what the form asks for.
- **Evidence:** `evidence/login-empty-submit.png`

### FIND-002: Same empty case, different words and status on sign-up
- **Where:** Sign-up page (`/register`), the form
- **I did:** clicked "Create Account" with all fields empty.
- **I saw:** "Email and password are required"; the backend answered 400. The Login page used other words and 422 for the same situation.
- **Expected idea:** consistency between similar pages.
- **Evidence:** none saved (text read from the page; scratch snapshot deleted).

### FIND-003: The old error message stays after the user changes the fields
- **Where:** Sign-up page (`/register`), the form
- **I did:** after the empty submit, typed a name, `notanemail` and a one-character password, and clicked "Create Account".
- **I saw:** "Email and password are required" still shown although the fields were filled; focus moved to the Email field; no new backend call appeared.
- **Expected idea:** the message should clear when the user edits or submits again; unsure whether the browser showed its own format tooltip (not visible in a hidden browser).
- **Evidence:** none saved.

### FIND-004: Password fields suggest the wrong autocomplete value
- **Where:** Login page (`/login`) and Sign-up page (`/register`), the Password field
- **I did:** opened both pages and read the console.
- **I saw:** a browser notice that password inputs lack `autocomplete`, suggesting `current-password`; on the Sign-up page the right value would be `new-password`.
- **Expected idea:** web standard and password-manager support.
- **Evidence:** console text only (scratch deleted).

### FIND-005: Analyze and Generate enable for any text
- **Where:** Home page "Generate Test Cases" (`/`, signed in), the Jira key field
- **I did:** typed `abc` into the Jira key field; did not click.
- **I saw:** both buttons became enabled; the placeholder suggests keys like `AIP-1`.
- **Expected idea:** unsure; maybe the key is checked after the click (not tested).
- **Evidence:** none saved.

### FIND-006: A new account sees other users' records on the Dashboard page
- **Where:** Dashboard page (`/dashboard`, signed in), tab "All"
- **I did:** registered a new test account and opened the Dashboard page.
- **I saw:** a table with the owner email of other users, issue keys, status, time and cost per run. It looks like real personal data (the type: an email address of another user). I stopped, copied nothing and took no screenshot.
- **Expected idea:** privacy and access control; unsure whether "All" is meant for everyone. (Update, user 2026-11-05: the data is fake data, and the user says no finding is a bug.)
- **Evidence:** none on purpose.

### FIND-007: Back after login opens the login form again
- **Where:** Login page (`/login`) while signed in
- **I did:** signed in, then pressed the browser Back button.
- **I saw:** the empty Login form at `/login`, with no redirect to the Home page; Forward went back to `/`.
- **Expected idea:** unsure; many apps send a signed-in user away from the login page.
- **Evidence:** none saved (text read from the page).

### FIND-008: The 404 page has its words only inside an image
- **Where:** Not-found page (any unknown address, for example `/nope-404`)
- **I did:** opened an address that does not exist.
- **I saw:** a picture page with "404 NOT FOUND" drawn in the image and a "Go home" button; the only accessible content was one link named "not found Go home", with no heading text.
- **Expected idea:** accessibility: the message should also exist as real text.
- **Evidence:** `evidence/not-found-1920x1080.png`

### FIND-009: Sign-up reveals that an email already has an account
- **Where:** Sign-up page (`/register`), the form
- **I did:** signed up with the email of the existing test account and another fake password.
- **I saw:** "Email already registered" (backend 400), while the Login page answers "Invalid credentials" for any wrong login.
- **Expected idea:** unsure: consistency between the two pages; this wording lets anyone check which emails have accounts.
- **Evidence:** none saved (text read from the page).

### FIND-010: The same record shows a different date format and time on two pages
- **Where:** Dashboard page (`/dashboard`, table, column "Created") and View page (`/<id>/view`, the line under the title)
- **I did:** opened the Dashboard page, then the View page of the first record (AIP-4).
- **I saw:** the Dashboard page says "Oct 21, 2026, 03:51 PM" (English month, 12-hour clock). The View page says "21 oct 2026, 03:59 p.m." (day first, lowercase month, "p.m."), eight minutes later.
- **Expected idea:** consistency between pages that show the same record; unsure whether the View page shows another moment (for example the publish time).
- **Evidence:** `evidence/dashboard-all-1920x1080.png`, `evidence/view-aip4-1920x1080.png`

### FIND-011: At phone size the Dashboard page's header and table are hard to use
- **Where:** Dashboard page (`/dashboard`, signed in) at 375x667, the header and the table
- **I did:** resized the window to 375x667 and scrolled the table sideways.
- **I saw:** the header title wraps into four lines and is cut at the top; the table shows only the first columns, and the owner, created, time, cost and "View" columns are off screen until you scroll sideways inside the table; the issue key then scrolls out of view.
- **Expected idea:** layout at small sizes; unsure whether the sideways scroll is intended.
- **Evidence:** `evidence/dashboard-375x667.png`, `evidence/dashboard-375x667-scrolled.png`

## Seen working (observations, not findings)

- Dashboard page: tab "Mine" shows a clear empty state ("No generations found. Start by generating test cases!"); tab "Published" shows the three published rows; the View page shows the generated test cases with steps and expected results.

- Login page: a wrong password gives "Invalid credentials"; the correct password goes to the Home page.
- Logout (header button on the Home page) goes to the Login page; Back after logout shows only the Login form (no stale signed-in page).
- Login page, keyboard only: focus order Email, Password, Sign in, Sign up; visible focus outline; Enter on the focused "Sign up" link opens the Sign-up page (`evidence/login-focus-signup-link.png`).
- Login page at three window sizes: nothing cut off (`evidence/login-375x667.png`, `login-768x1024.png`, `login-1920x1080.png`).

## Covered

- Login page: three window sizes, empty submit, wrong-password and valid login, Back and Forward, keyboard tour.
- Sign-up page: empty submit, malformed email with a weak password, successful sign-up, duplicate sign-up.
- Home page: signed-in header and navigation, the Jira key field's enabled state (no click), logout.
- Not-found page: one unknown address.
- Dashboard page: tabs All, Mine and Published, the table, three window sizes; View page of one record (fake data, after the user's answer).

## Not tested

- Home page: Generate and Analyze (a cost per run is shown on the Dashboard page; the brief says stop if something costs money).
- View page: the "Download" button (a file download; I ask first) and the page at small sizes; the other two records.
- Dashboard page: whether the chosen tab stays after a reload; a direct link while signed out; the View page address while signed out.
- Two tabs, session expiry, password rules, Sign-up and Home pages at other sizes, keyboard tour on the Sign-up page.

## Notes

- No "show password" button and no "forgot password" link on the Login page (observations, not findings).
- Test account: `ACC-EXP-001-1`; details in `test-data.md` (no password) and the git-ignored `test-data.local.md`. It stays on staging.

## Open questions

- Is the data on the Dashboard page demo data or real, and should a new user see it?
- May I use Generate and Analyze on the Home page?
- Which findings are bugs? Answered by the user on 2026-11-05: none.
- Is the data on the Dashboard page real? Answered by the user on 2026-11-05: it is fake data. The stop in session 1 was correct under doubt; the Dashboard page may now be explored.
- May Generate and Analyze be used on the Home page? Not answered; I do not assume an answer, so they stay untested.
