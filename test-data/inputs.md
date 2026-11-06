# Reusable fake inputs

Non-secret values and patterns to reuse by type. Cases and notes point here ("see `test-data/inputs.md`, malformed email"). Fake data only. Passwords are never stored here (see the last section). Security-style strings (scripts, SQL) are not listed: they need an approved plan (`.claude/rules/performance-and-security-testing.md`).

## Emails

- Fresh valid-looking email: `qa.<name>.<timestamp>@example.com` (generate at run time; `example.com` is a reserved domain).
- Malformed emails: `notanemail` (no "@"), `a@` (no domain), `@example.com` (no name), `a@@example.com` (two "@"), `a b@example.com` (a space), `a@example` (no dot).
- Existing account: the email of an account in `accounts.md` (for duplicate tests).

## Names

- Normal: `QA Explorer`.
- Edge: empty, spaces only, one letter (`A`), 256 letters (`A` repeated), a name with accents (for example a French or German name), a name with an apostrophe or a hyphen.

## Text and characters

- Empty, spaces only, leading and trailing spaces, one character, 256 characters, many lines.
- Special characters: `" ' < > & / \ % ;` and an emoji.

## Numbers and dates

- Numbers: `0`, `-1`, `1.5`, `999999999`, letters in a number field (`abc`).
- Dates: `1900-01-01`, `2099-12-31`, an impossible date (`2026-02-30`).

## Jira-key shaped text

- Valid shape: `AIP-1`. Invalid shape: `abc`, `AIP`, `AIP-`. Typing is safe; **do not submit to Generate or Analyze without the user's yes** (they cost money).

## Passwords (rules only, no values)

- New account password: long, random, mixed characters (letters, digits, a symbol), generated at run time.
- Wrong password: random, 12 characters or more, different from the account's real one; generated at run time.
- Weak probes: one character, `12345678`, `password`.
- Every password actually typed goes into `typed-values.local.md`.
