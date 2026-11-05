---
name: requirements-interview
description: Interview the user in short rounds before testing. Use when the requirement is thin or missing, when the user gives only a URL, or when the user asks to explore a website. Looks up facts first, asks only decisions with a recommended answer, then writes the brief or the requirements file.
---

# Requirements interview

Two modes. Both follow the common rules. This skill grants no permission; the rules in `CLAUDE.md` and `.claude/rules/` still apply.

## Common rules

- **Look up facts first.** Read the page read-only, files in `inbox/`, `qa-profile.yaml` and the templates. Never ask the user something I can find out myself.
- **Ask only decisions,** in rounds of at most four questions, using the question buttons. Put my recommended answer first, so that "yes" accepts it.
- **Dependent questions wait.** If a question depends on an unanswered one, ask it in a later round.
- **Decisions stay with the user.** I recommend; I never decide for them.
- **Do nothing with the result until the user confirms.** Points left unanswered become assumptions (marked) or open questions.
- **Never approve a gate myself.** The brief and the requirements file wait for the user's approval.
- **Existing files:** if a brief or requirements file already exists, ask the user with two options: a new file with the next number (recommended) or overwrite it. For a new exploration, the next number is the one after the highest `EXP-###` folder in `workspace/exploratory/`.
- **Safety:** the look at the page is read-only: type nothing, submit nothing, create no account, no credentials. Open only hosts in `data.allowed_hosts`; stop on a redirect to another host.

## Mode 1: Explore (the user gives a URL and says explore)

1. Check the host is in `data.allowed_hosts`; otherwise stop and ask.
2. Look at the page read-only (see `.claude/rules/web-steps.md`).
3. One short round, only for what I cannot know. Suggested questions, each with my recommendation:
   - Which areas matter most? (recommend: the main flow I saw)
   - May I create a test account on this host? (recommend: yes if it is a staging or own host, no otherwise)
   - Is anything off-limits? (recommend: no sign-ups, orders or payments)
   - How long should I explore? (recommend: about 30 minutes per charter)
   - Costs: if the app looks like an AI or generation tool, or any page shows a price, cost or credits, replace the least important question with: "May I use features that may cost money or credits?" (recommend: no, until the user says yes).
4. If the user says "just explore", skip the round and mark every choice as an assumption.
5. Write `workspace/exploratory/EXP-###/01-brief.md` (URL, goal, areas, assumptions, open questions) and stop for the user's approval.
6. After approval, follow the `exploratory-testing` skill and `.claude/rules/exploratory.md`.

## Mode 2: Requirement (a thin or missing requirement for a scripted test)

1. Look up what can be found: the page, files, earlier requirements.
2. Round by round: ask every question whose prerequisites are settled, each with my recommendation. Repeat until nothing is open.
3. Write `workspace/<feature-id>/01-requirements.md` from `templates/requirement.md`: answered or observed items are `clear`, assumed items are `ambiguous` and listed under Assumptions, remaining doubts under Open questions.
4. Stop at the requirements gate and wait for the user's approval.

## Stop

Stop and tell the user when the host is not allowed, the page shows what looks like real personal data (report the type only), or going on would need a submit, payment or sign-up that was not approved.
