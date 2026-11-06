# Framework-neutral test case template

Goal: a test case **never mentions a framework, selector or code path**. The automation agent translates it to the configured framework (`automation.framework` in `qa-profile.yaml`) using a separate adapter skill. This way, changing framework does not require rewriting test cases.

## Conventions

- Keys (`id`, `req`, `platform`, ...) are always in English. Content follows the `language` in the profile.
- Describe actions at the business level ("click the Login button"), not at the technical level ("click `#btn-login`").
- Test data is fake data. Never copy real data into `test_data`.
- Every test case links to at least one `REQ`.

## Template (one block per test case)

```yaml
id: TC-001
req: [REQ-001]
title: Successful login with a valid account
platform: web            # web | api | mobile
priority: P1             # P1 | P2 | P3
type: positive           # positive | negative | boundary | data validation | error handling | cross-page flow | api integration | end-to-end workflow | data integrity | security | performance
tags: [login, smoke]
preconditions:
  - The test account exists and is active
test_data:                         # point to test-data/ (accounts.md, inputs.md) instead of repeating values
  username: <fake test account>
  password_env: QA_TEST_PASSWORD   # NAME of the environment variable; never write the password itself
steps:
  - n: 1
    action: Open the login page
    expected: The login form is displayed
  - n: 2
    action: Enter a valid username and password, then click Login
    expected: The user is taken to the home page
expected_result: The user logs in successfully and sees the home page
automation_candidate: yes   # yes | no
environment: local          # a key or name from the plan; hosts only from data.allowed_hosts
review_status: draft        # draft | in_review | approved | rejected (review state only)
reviewed_by: ""             # human reviewer; empty until reviewed
review_date: ""             # YYYY-MM-DD
open_questions: []          # if not empty, stop and ask a human
```

Run results (Passed / Failed / Blocked / Not run) are **not** stored in the test case. They live in the execution report, so one test case can be run many times in different environments.

## For `platform: api`, also add

```yaml
api:
  spec_ref: inbox/api-spec.yaml#/paths/~1endpoint-name   # where the endpoint is defined
  method: POST
  endpoint: /endpoint-name
  auth: none                    # none | basic | bearer | cookie (credentials only by env var name)
  token_env: QA_TEST_TOKEN      # NAME of the environment variable; never the token itself
  headers:
    Content-Type: application/json
  request_body:                 # fake data only
    field: <fake value>
  expected_status: 200
  expected_body:                # fields and types to check, not full real payloads
    id: <number>
  max_response_ms: 2000         # optional
```
