# Performance, stress and security testing

User decision, 2026-11-05: these tests are part of testing and are allowed on hosts the user owns, under an approved plan.

## Shared frame

- **Hosts:** `localhost` and `assistant-qa-staging.vercel.app` (the user's own). Never `demowebshop.tricentis.com` or `the-internet.herokuapp.com`. Any other host only with the user's written yes in chat.
- **Approved plan first** (gate `test_plan`): goal, kinds of checks, tool, limits, stop condition. One run per approval, only the approved command. Start small, grow in steps.
- **Before the first run:** the user confirms the hosting provider allows it. Installing a tool (for example k6) needs the user's approval; never install on my own.
- **Data:** fake data only; test accounts follow `test-accounts.md`. Keep tool summary numbers or short notes as evidence, not raw bodies.
- **Stop at once** on: error rate above the plan limit, a burst of 5xx, any 429 or block, real personal data (report the type only), or the user says stop.
- **Report:** numbers or findings with scope and limits, as `FIND-###`. No go/no-go; the user decides what is a bug.

## Performance and stress

Response time, load, stress, endurance. A short run is a smoke check, not proof of capacity.

## Security

Login and permission checks, session handling, security headers, CORS, error messages that leak details, rate limiting, and input strings such as injection, as listed in the approved plan.

Out of scope: destructive actions; copying or stealing real data; guessing passwords on real accounts; going beyond proof that a weakness exists; attack code in reports; any site that is not the user's.
