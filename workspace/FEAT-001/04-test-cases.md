# Test cases: FEAT-001 sign-up, login and logout (draft)

Designed with the `test-case-design` skill from the approved `01-requirements.md`. Framework-neutral. All 13 cases were approved by the user on 2026-11-06 ("Approve the cases"). The test plan (`03-test-plan.md`) was not written in this dry run. Host: `assistant-qa-staging.vercel.app` (in `data.allowed_hosts`). Test data is fake; the existing test account is `ACC-EXP-001-1` (`workspace/exploratory/EXP-001/test-data.md`, password only in the git-ignored `test-data.local.md`).

```yaml
id: TC-001
req: [REQ-001]
title: Login page shows the sign-in form
platform: web
priority: P1
type: positive
tags: [login, smoke]
preconditions:
  - The browser is signed out (fresh session)
test_data: {}
steps:
  - n: 1
    action: Open the Login page, `/login`
    expected: The heading "Welcome back!", an empty Email Address field, an empty masked Password field, an enabled "Sign in" button and a "Sign up" link are shown
  - n: 2
    action: On the Login page, set the window to 375x667, then 768x1024, then 1920x1080
    expected: The sign-in card is fully visible at each size; nothing is cut off or overlapped
expected_result: The Login page shows the complete sign-in form at the three sizes.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-002
req: [REQ-002]
title: A signed-out visit to the home address goes to the Login page
platform: web
priority: P2
type: cross-page flow
tags: [login, navigation]
preconditions:
  - The browser is signed out (fresh session)
test_data: {}
steps:
  - n: 1
    action: Open the home address, `/`
    expected: The address becomes `/login` and the Login page form is shown
expected_result: A signed-out visitor lands on the Login page.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-003
req: [REQ-003]
title: Valid email and password sign the user in
platform: web
priority: P1
type: positive
tags: [login, smoke, happy-path]
preconditions:
  - The test account exists and is active
  - The browser is signed out
test_data:
  username: the test account email (ACC-EXP-001-1)
  password_env: QA_TEST_PASSWORD   # NAME only; the value is in the git-ignored test-data.local.md
steps:
  - n: 1
    action: Open the Login page, `/login`
    expected: The sign-in form is shown
  - n: 2
    action: On the Login page, enter the test account email and password, then click "Sign in"
    expected: The Home page opens at `/`; the header shows the test account email, the links "Generate" and "Dashboard" and a "Logout" button
expected_result: The user is signed in and sees the Home page header with their email.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-004
req: [REQ-004]
title: A wrong password is refused
platform: web
priority: P1
type: negative
tags: [login, negative]
preconditions:
  - The test account exists
  - The browser is signed out
test_data:
  username: the test account email (ACC-EXP-001-1)
  password: generated at run time (random, different from the real one); recorded as evidence in the git-ignored test-data.local.md during the run
steps:
  - n: 1
    action: Open the Login page, `/login`
    expected: The sign-in form is shown
  - n: 2
    action: On the Login page, enter the test account email and the wrong password, then click "Sign in"
    expected: The user stays on the Login page and sees "Invalid credentials"; the Home page is not shown
expected_result: The sign-in is refused with the message "Invalid credentials".
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions:
  - Q6: does an unknown email show the same message? (not observed)
```

```yaml
id: TC-005
req: [REQ-005]
title: Empty sign-in fields are refused
platform: web
priority: P2
type: data validation
tags: [login, negative, validation]
preconditions:
  - The browser is signed out
test_data: {}
steps:
  - n: 1
    action: Open the Login page, `/login`
    expected: The sign-in form is shown with empty fields
  - n: 2
    action: On the Login page, click "Sign in" without typing anything
    expected: The user stays on the Login page and sees "Missing username or password"
expected_result: Sign-in with empty fields is refused with that message.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-006
req: [REQ-006]
title: Sign-up page shows the create-account form
platform: web
priority: P2
type: positive
tags: [register, smoke]
preconditions:
  - The browser is signed out
test_data: {}
steps:
  - n: 1
    action: Open the Sign-up page, `/register`
    expected: The heading "Create Account", empty Full Name, Email and masked Password fields, an enabled "Create Account" button and a "Sign in" link are shown
expected_result: The Sign-up page shows the complete create-account form.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-007
req: [REQ-007]
title: A valid sign-up creates an account and signs the user in
platform: web
priority: P1
type: positive
tags: [register, happy-path]
preconditions:
  - The browser is signed out
  - The user accepts that the new test account stays on staging
test_data:
  full_name: fake name generated at run time
  email: new unique address on example.com, generated at run time
  password: long random password generated at run time; recorded only in the git-ignored local file
steps:
  - n: 1
    action: Open the Sign-up page, `/register`
    expected: The create-account form is shown
  - n: 2
    action: On the Sign-up page, enter the full name, the new email and the password, then click "Create Account"
    expected: The Home page opens at `/`; the header shows the new email; no email-verification step appears
expected_result: The account is created and the user is signed in with the new email shown in the header.
automation_candidate: no   # creates a permanent account on staging; decide with the user
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions:
  - Q1: password rules are unknown
```

```yaml
id: TC-008
req: [REQ-008]
title: Empty sign-up fields are refused
platform: web
priority: P2
type: data validation
tags: [register, negative, validation]
preconditions:
  - The browser is signed out
test_data: {}
steps:
  - n: 1
    action: Open the Sign-up page, `/register`
    expected: The create-account form is shown with empty fields
  - n: 2
    action: On the Sign-up page, click "Create Account" without typing anything
    expected: The user stays on the Sign-up page and sees "Email and password are required"; no account is created
expected_result: Sign-up with empty fields is refused with that message.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-009
req: [REQ-009]
title: Signing up with an existing email is refused
platform: web
priority: P1
type: negative
tags: [register, negative]
preconditions:
  - The test account already exists
  - The browser is signed out
test_data:
  full_name: fake name
  email: the test account email (ACC-EXP-001-1)
  password: different fake password generated at run time; recorded as evidence in the git-ignored test-data.local.md during the run
steps:
  - n: 1
    action: Open the Sign-up page, `/register`
    expected: The create-account form is shown
  - n: 2
    action: On the Sign-up page, enter a fake name, the existing test account email and the other password, then click "Create Account"
    expected: The user stays on the Sign-up page and sees "Email already registered"; no second account is created
expected_result: The sign-up is refused with "Email already registered".
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-010
req: [REQ-010]
title: A malformed email at sign-up is not accepted
platform: web
priority: P2
type: data validation
tags: [register, negative, validation]
preconditions:
  - The browser is signed out
test_data:
  full_name: fake name
  email: text without an "@", for example the word "notanemail"
  password: fake password generated at run time
steps:
  - n: 1
    action: Open the Sign-up page, `/register`
    expected: The create-account form is shown
  - n: 2
    action: On the Sign-up page, enter the fake name, the text without "@" and the password, then click "Create Account"
    expected: No account is created and the user stays on the Sign-up page; the message is unknown, record from the run (the browser's own tooltip shows only in a visible browser)
expected_result: A malformed email is not accepted; the exact message is recorded from the run.
automation_candidate: no   # the message is unknown; decide after the first run
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions:
  - Q2: exact message for a malformed email
```

```yaml
id: TC-011
req: [REQ-011]
title: Logout signs the user out
platform: web
priority: P1
type: positive
tags: [logout, smoke]
preconditions:
  - The user is signed in with the test account on the Home page
test_data:
  username: the test account email (ACC-EXP-001-1)
  password_env: QA_TEST_PASSWORD
steps:
  - n: 1
    action: On the Home page, `/`, click "Logout" in the header
    expected: The Login page opens at `/login`
expected_result: The user is signed out and sees the Login page.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-012
req: [REQ-011]
title: After logout the Back button does not show a signed-in page
platform: web
priority: P2
type: cross-page flow
tags: [logout, navigation]
preconditions:
  - The user signed in with the test account and then clicked "Logout"
test_data: {}
steps:
  - n: 1
    action: On the Login page after logout, press the browser Back button
    expected: Only the Login form is shown at `/login`; no signed-in content (no "Generate" or "Dashboard" links, no email in a header)
expected_result: Going Back after logout does not reveal a signed-in page.
automation_candidate: yes
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions: []
```

```yaml
id: TC-013
req: [REQ-003, REQ-007, REQ-011]
title: An account created at sign-up can log out and sign in again
platform: web
priority: P2
type: end-to-end workflow, data integrity
tags: [register, login, logout, e2e]
preconditions:
  - The browser is signed out
  - The user accepts that the new test account stays on staging
test_data:
  full_name: fake name generated at run time
  email: new unique address on example.com, generated at run time
  password: long random password generated at run time; recorded only in the git-ignored local file
steps:
  - n: 1
    action: On the Sign-up page, `/register`, create the account with the fake data
    expected: The Home page opens at `/` with the new email in the header
  - n: 2
    action: On the Home page, click "Logout"
    expected: The Login page opens at `/login`
  - n: 3
    action: On the Login page, sign in with the same email and password
    expected: The Home page opens at `/` and the header shows the same email
expected_result: The data entered at sign-up is the data that signs the user in later, and the header shows the same email.
automation_candidate: no   # creates a permanent account on staging
environment: assistant-qa-staging.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Approve the cases)"
review_date: "2026-11-06"
open_questions:
  - Q1: password rules are unknown
```

## Coverage check (skill step 4)

| REQ | Cases |
|---|---|
| REQ-001 | TC-001 |
| REQ-002 | TC-002 |
| REQ-003 | TC-003, TC-013 |
| REQ-004 | TC-004 |
| REQ-005 | TC-005 |
| REQ-006 | TC-006 |
| REQ-007 | TC-007, TC-013 |
| REQ-008 | TC-008 |
| REQ-009 | TC-009 |
| REQ-010 | TC-010 |
| REQ-011 | TC-011, TC-012, TC-013 |

Every REQ has at least one case (11 of 11, 13 cases).

Inputs:
- Login email: no negative case of its own (an unknown email was not observed; see Q6). Login password: TC-004, TC-005.
- Sign-up full name: only inside TC-008. Sign-up email: TC-008, TC-009, TC-010. Sign-up password: TC-008 only.
- Boundary cases: none, because the limits are unknown (Q1 password rules, Q5 maximum field lengths). This is the reason, not an oversight.

Types skipped, with a reason:
- Boundary and weak-password cases: limits unknown (Q1, Q5).
- API integration: no spec in `inbox/`.
- Performance and security: follow `.claude/rules/performance-and-security-testing.md`; they need an approved plan.
- Accessibility and window sizes beyond TC-001: covered by exploring (`exploratory-testing`).
- Compatibility, localization, installation, data migration: later.

Open questions: Q1 password rules; Q2 message for a malformed email; Q3 limit on wrong attempts; Q4 session length and reload; **Q5 (new)** maximum lengths of the fields; **Q6 (new)** does an unknown email show the same message as a wrong password.
