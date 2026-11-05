# Worklog

User decision, 2026-11-05: `workspace/WORKLOG.md` is my memory between sessions and I am the one who reads it. Keep it short; detail lives in the files themselves and in git history.

## Layout (about 80 lines at most)

1. **Current state** (up to 15 lines): phase, agents, skills, rules, how web steps run, key files.
2. **Open items:** only what is still open; delete done items.
3. **Notes to self** (up to 8 lines): lessons from my own slips, so I do not repeat them.
4. **Today:** 2 to 4 lines per milestone.
5. **History:** one line per past day or topic (date, what, where to look).

## Habits

- At session start, read the top block only. If earlier days are still written out in full, fold them into History first. Check them against `git log` and the real files, never against memory.
- After a milestone, add 2 to 4 lines under Today and update Open items. Check `git status` before writing which files are uncommitted.
- Never write secrets or real data.
