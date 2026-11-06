# Requirements: Sign-up, login and logout of the staging web app

- Feature ID: FEAT-001 (no Jira ticket)
- Analysis date: 2026-11-06
- By: Claude (main session); purpose: dry run of the `test-case-design` skill
- Gate "requirements" status: draft, waiting for approval (approver, date: ______)

## Sources

| Source ID | Type | Reference | Notes |
|---|---|---|---|
| SRC-01 | file | `workspace/exploratory/EXP-001/03-report.md` and `02-session-1.md` to `02-session-3.md` | Observed on `https://assistant-qa-staging.vercel.app` on 2026-11-05 with fake data; the user decided none of the findings is a bug, so the observed behavior is treated as expected. |

Pages: Login page `/login`, Sign-up page `/register`, Home page `/` (signed in).

## Requirements

### REQ-001: The Login page offers a sign-in form
- Description: the Login page (`/login`) shows the heading "Welcome back!", an Email Address field, a Password field (masked), a "Sign in" button and a "Sign up" link to the Sign-up page.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the form is shown with empty fields; the card is fully visible at 375x667, 768x1024 and 1920x1080.
- Related platform: `web`

### REQ-002: A signed-out visitor to the home address is sent to the Login page
- Description: opening `/` while signed out leads to `/login`.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the address becomes `/login` and the Login form is shown.
- Related platform: `web`

### REQ-003: A valid email and password sign the user in
- Description: signing in on the Login page with a valid account opens the Home page, signed in.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the address is `/`; the header shows the user's email, links "Generate" and "Dashboard", and a "Logout" button.
- Related platform: `web`

### REQ-004: A wrong password is refused
- Description: signing in with a valid email and a wrong password does not sign the user in.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the user stays on the Login page and sees "Invalid credentials".
- Related platform: `web`

### REQ-005: Empty sign-in fields are refused
- Description: clicking "Sign in" with both fields empty does not sign the user in.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the user stays on the Login page and sees "Missing username or password".
- Related platform: `web`

### REQ-006: The Sign-up page offers a create-account form
- Description: the Sign-up page (`/register`) shows the heading "Create Account", Full Name, Email and Password fields, a "Create Account" button and a "Sign in" link to the Login page.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the form is shown with empty fields.
- Related platform: `web`

### REQ-007: A valid sign-up creates an account and signs the user in
- Description: submitting a full name, a new valid email and a password creates the account.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the address becomes `/` (Home page) and the header shows the new email; no email verification step.
- Related platform: `web`

### REQ-008: Empty sign-up fields are refused
- Description: clicking "Create Account" with all fields empty does not create an account.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the user stays on the Sign-up page and sees "Email and password are required".
- Related platform: `web`

### REQ-009: Signing up with an existing email is refused
- Description: signing up with an email that already has an account does not create a second account.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the user stays on the Sign-up page and sees "Email already registered".
- Related platform: `web`

### REQ-010: A malformed email at sign-up is not accepted
- Description: submitting text that is not an email address (for example text without an "@") does not create an account.
- Source: SRC-01 (observed in part)
- Status: `ambiguous`
- Confidence: `medium`
- Acceptance criteria: no account is created; the submit looks blocked by the browser and the earlier message stayed. The exact message is unknown (the browser's own tooltip is not visible in a hidden browser).
- Related platform: `web`

### REQ-011: Logout ends the session
- Description: clicking "Logout" in the header signs the user out.
- Source: SRC-01 (observed)
- Status: `clear`
- Confidence: `high`
- Acceptance criteria: the address becomes `/login`; pressing Back afterwards shows only the Login form, no signed-in page.
- Related platform: `web`

## Conflicts between sources

| REQ | Source A says | Source B says | Who decides |
|---|---|---|---|
| none | | | |

## Assumptions (need confirmation)

- The test host is the user's staging app `assistant-qa-staging.vercel.app` (in `data.allowed_hosts`); data is fake.
- The behavior seen on 2026-11-05 is the intended behavior (the user said none of the findings is a bug).

## Sensitive data encountered

None in this file. Test account values are only in `workspace/exploratory/EXP-001/test-data.local.md` (git-ignored).

## Open questions

- Q1: What are the password rules at sign-up (minimum length, character types)? Unknown; only one long mixed password was tried.
- Q2: What is the exact message for a malformed email (REQ-010)?
- Q3: Is there a limit on wrong-password attempts (lock or delay)? Not tested.
- Q4: How long does a session last, and does a reload keep the user signed in? Not tested.
