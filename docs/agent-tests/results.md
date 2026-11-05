# Agent test results

One row per file. Update after a check (`skill-check static` or `spec`) or a dry run on a staging host. No secrets here.

| File | Last static check | Last spec check | Last dry run | Result |
|---|---|---|---|---|
| `.claude/agents/manual-tester.md` | not run | 2026-11-05: PARTIAL (4 of 5 cases PASS) | not run | 3 findings fixed 2026-11-05 and the scratch-folder deletion allowed by the user; re-check pending |
| `.claude/agents/automation-tester.md` | not run | not run | not run | |
| `.claude/agents/data-guard.md` | not run | not run | not run | |
| `.claude/skills/exploratory-testing/SKILL.md` | 2026-11-05: WARNINGS (4 small gaps) | 2026-11-05: 5 of 5 PASS (after the fixes) | 2026-11-05 (EXP-001): held, 11 findings, none a bug | 6 dry-run gaps and 3 small gaps fixed 2026-11-05; scratch-folder deletion allowed by the user; no gap open |
| `.claude/skills/requirements-interview/SKILL.md` | 2026-11-05: COMPLIANT | 2026-11-05: 5 of 5 PASS (after the fix) | 2026-11-05 (EXP-001): held | costs question and text fallback added 2026-11-05; no gap open |
