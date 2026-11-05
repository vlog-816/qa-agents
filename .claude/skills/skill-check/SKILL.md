---
name: skill-check
description: Check a skill, agent or rule file of this project against a short checklist. Use when a skill, agent or rule is added or edited, or when the user asks to review them. Reports COMPLIANT, WARNINGS or NON-COMPLIANT per file.
---

# Skill and agent check

A static review of files in `.claude/skills/`, `.claude/agents/` and `.claude/rules/`. It reads the file and judges its text. **A pass proves the structure, not that it works when run.** To see it work, do a dry run on a real URL.

Read-only: report in the chat. Write a result file only if the user asks (then under `workspace/`).

## Checklist

Checks 1 to 6 are required; checks 7 and 8 give warnings.

1. **Header:** skills have `name` and `description` (what it does and when to use it); agents have `name`, `description` and `tools`. **No `allowed-tools` line** (it pre-approves commands and skips the user's prompts).
2. **Language:** English only; no Vietnamese text.
3. **Stop and ask:** says to stop and ask when unsure; lists doubts under "Open questions".
4. **Hosts and gates:** if it touches a website, it checks `data.allowed_hosts` first; it never approves a gate itself and waits for the user's approval where `qa-profile.yaml` says `required`.
5. **No secrets:** no passwords, tokens, keys or real personal data in the text; credentials only by variable name or as set in `.claude/rules/test-accounts.md`.
6. **Safe writes:** writes only inside the project (results under `workspace/`); asks before deleting or overwriting; never commits, pushes or installs on its own.
7. **Clear steps:** numbered or titled steps, where results are written, and the next step or hand-off.
8. **Short and not duplicated:** no long copies of rules that already live in `.claude/rules/` or `CLAUDE.md`; point to them instead.

## Modes

- **`static [file|all]`:** the checklist above.
- **`spec <name>`:** read `docs/agent-tests/<name>.md` and the file it names, then judge each statement of the five cases from the file's text: PASS (it says so clearly), PARTIAL (it says part of it), FAIL (it says the opposite or nothing), NOT ASSESSED (cannot tell). A case verdict is the weakest statement in it. Ask before writing the verdicts into the spec and `docs/agent-tests/results.md`.

A dry run on a staging host is the only real behavior test; record it in `results.md`.

## Verdict per file

- **COMPLIANT:** checks 1 to 8 pass.
- **WARNINGS:** checks 1 to 6 pass; check 7 or 8 has a gap (name it).
- **NON-COMPLIANT:** any of checks 1 to 6 fails (name each).
- **NOT ASSESSED:** the file could not be read or is not the right kind of file.

If you check fewer files than exist, say how many you checked out of how many.

## Report format

One short table: file, verdict, failed or weak checks with the line or section. Then at most three suggested fixes. Do not fix anything unless the user says so.
