# Exploration session: EXP-001 session 2

- Exploration ID: EXP-001 (charter CH-01 continued, same approved brief)
- Session: 2
- Date: 2026-11-05
- Scope decided by the user: continue, but skip the Dashboard page (and Generate/Analyze on the Home page stay unused)
- Environment (`data_class`): synthetic, staging host `assistant-qa-staging.vercel.app`
- Browser / OS: Chrome via `playwright-cli`, hidden, Windows (default window 1280x720)
- Pages of this app (name, address, what it is): see "Pages seen" at the top of `03-report.md`.

## Mission

Cover the remaining tours without the Dashboard page: login (wrong and valid), logout and the Back button, a not-found address, keyboard use, duplicate sign-up.

## Notes (what was done and observed)

| # | Page | Action | Observation | Evidence (path) |
|---|---|---|---|---|
| 1 | Login page (`/login`) | Signed in with the test email and a wrong password | Message "Invalid credentials"; stays on the Login page | text only |
| 2 | Login page, then Home page "Generate Test Cases" (`/`) | Signed in with the correct password | Goes to the Home page, signed in | text only |
| 3 | Home page (`/`) and Login page (`/login`), while signed in | Pressed Back, then Forward | Back shows the empty Login form again (no redirect away from it); Forward returns to the Home page | text only |
| 4 | Home page, then Login page (`/login`) | Clicked "Logout" in the header, then pressed Back | Logout goes to the Login page; Back afterwards shows only the Login form, no signed-in content | text only |
| 5 | Not-found page (`/nope-404`) | Opened an address that does not exist | A custom "404 NOT FOUND" picture page with a "Go home" button; the visible words are part of the image | `evidence/not-found-1920x1080.png` |
| 6 | Login page (`/login`) | Keyboard only: pressed Tab four times, then Enter on the focused link | Focus order Email, Password, Sign in, Sign up; a visible focus outline on the link; Enter opens the Sign-up page | `evidence/login-focus-signup-link.png` |
| 7 | Sign-up page (`/register`) | Signed up again with the existing email and another fake password | Message "Email already registered" (backend 400); no new account | text only |
| 8 | (no page) | Closed the browser and deleted the scratch folder | The Dashboard page was not opened in this session | - |

## Findings

New `FIND-###` items are in `03-report.md` (FIND-007 to FIND-009).

## Follow-ups

- Dashboard page, and Generate and Analyze on the Home page: waiting for the user's decisions (see the report).
- Two tabs, session expiry, Sign-up and Home pages at other sizes, password rules.

## Open questions

- Same as in `03-report.md`.
