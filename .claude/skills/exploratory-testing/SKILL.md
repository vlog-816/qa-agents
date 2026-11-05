---
name: exploratory-testing
description: Think deeply while exploring a web page or app. Use when the user gives a URL and asks to explore, find issues, or run an exploratory session. Gives tours, input and navigation ideas, what to watch, how to judge, and how to record findings as FIND-###.
---

# Exploratory testing

Use with `.claude/rules/exploratory.md` (folder `workspace/exploratory/EXP-###/`) and `.claude/rules/web-steps.md` (how to run `playwright-cli`). This skill is about what to think and try. It does not grant any permission.

## 1. Before you start

- Host is in `data.allowed_hosts`; the brief (`01-brief.md`) is approved.
- One charter per session: "Explore <area> with <ideas> to find <kind of problem>". Time box about 30 minutes.
- Note what you assume. Anything you cannot know goes to "Open questions".

## 2. Think in tours (pick the ones that fit the charter)

- **Feature tour:** use every visible control once. Does each do what its label says?
- **Input tour:** feed every field the ideas in section 3.
- **State and navigation tour:** section 4.
- **Error tour:** make things go wrong on purpose and read every message.
- **Content tour:** read all text. Wrong words, typos, mixed languages, labels that do not match the field (for example "username" for an email field), missing units.
- **Size and device tour:** resize the window to three sizes: desktop 1920x1080, tablet 768x1024, mobile 375x667. Is anything cut off, overlapped or unreachable?
- **Consistency tour:** compare similar pages and controls with each other.

## 3. Input ideas (fake data only)

- Empty; spaces only; one character; exactly at a limit and one past it.
- Very long text (hundreds of characters); many lines.
- Special characters: quotes, angle brackets, ampersand, slash, emoji, accents, right-to-left text.
- Numbers: zero, negative, decimals, huge, letters in a number field.
- Dates: past, far future, impossible dates.
- Duplicates: the same value twice; the same email with different letter case.
- Paste instead of typing; leading and trailing spaces.
- Security-style strings (scripts, SQL fragments) only if the approved brief lists them.

## 4. State and navigation ideas

- Back, forward, reload in the middle of a flow.
- Double click and click fast twice on a submit button (without submitting anything not allowed by the brief).
- Two tabs on the same page; sign out in one, act in the other.
- Direct links to inner pages while signed out; a page address with a changed id.
- Keyboard only: Tab order, Enter and Escape, visible focus.

## 5. Watch while exploring

- Messages on the page: wording, tone, whether they tell the user what to do.
- Console errors and warnings (`console`), failed or slow network calls (`requests`), calls to hosts outside `allowed_hosts` (report; do not visit them).
- Screens that hang, flicker, jump, or give no feedback after a click.
- Anything that shows data that looks like another person's.

## 6. Judge (the oracles)

Ask for each odd thing: does it differ from
- what the requirement or brief says,
- how the same page behaved a minute ago,
- how similar pages or controls behave,
- common sense and the product's own wording,
- standard behavior of the browser or web?

If one of these says "wrong", record it. If you are unsure, record it as a question. Never decide for the user that something is a bug.

## 7. Record each finding

`FIND-###` in `03-report.md`, one block each:
- **Where:** page address and area.
- **I did:** the exact steps, short.
- **I saw:** what happened, with the exact message text.
- **Expected idea:** which oracle looked wrong, or "unsure".
- **Evidence:** path under `evidence/` (screenshot taken before typing or after a reload; never a value that is a password).
- No verdict, no severity unless the user asks.

Rules for the record:
- A screenshot proves how a page looks, not how it behaves. For behavior, record the steps and the result you saw.
- Zero findings is a valid result, as long as you state what you covered and what you did not.
- Never invent a requirement. If the spec is silent, write a question, not a defect.

End the report with two short lists: **Covered** and **Not tested** (with the reason). Not tested is not a defect.

## 8. Stop and ask

- A click or redirect leaves the allowed hosts.
- The page shows what looks like real personal data (note the type only).
- Going on needs a submit, payment or sign-up that the brief does not list.
- A command is denied or needs an approval you do not have.
