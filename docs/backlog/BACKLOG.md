# Backlog of improvement ideas

Ideas that are parked, not active. When the user asks to improve the agents, harden the setup or plan the next step, read this file and propose the relevant items. Never enable or build one without the user's approval. Update the status here when something changes.

Status values: `parked`, `proposed`, `approved`, `done`, `dropped`.

| ID | Idea | Status | Why parked | Propose when | Where |
|---|---|---|---|---|---|
| BL-001 | Host-guard hooks (block hosts outside `allowed_hosts`, block shell reads of secrets, limit data-guard writes) | parked | Too complex for the pilot; unreviewed and never run live; enabling needs a settings edit by the user | User wants technical enforcement, tests a non-demo site, or asks to improve safety | `docs/backlog/host-guard-hooks/README.md` |
| BL-002 | `test-reviewer` agent (checks test cases for gaps, duplicates, ambiguity) | parked | Not needed for the first demo | User wants higher quality test cases or more features per month | Plan Phase 1 |
| BL-003 | `ba-analyst` agent (URL, documents, designs into standard requirements) | parked | The main session does BA work for now | User gives requirement documents or designs regularly | Plan Phase 2 |
| BL-004 | Playwright tooling: Playwright MCP, `playwright-cli`, skill `playwright-best-practices` (see notes below) | parked | Built-in browser was enough; installs add risk and files | User wants repeatable runs, scripts or lower token cost per run | Plan Phase 3 |
| BL-005 | DEMO-001: check that the cart is kept per session with a clean browser profile | parked | The HttpOnly cookie could not be cleared by script (result inconclusive) | User wants the report completed | `workspace/DEMO-001/06-report.md` |
| BL-006 | Remove the Gate 0 waiver for DEMO-001 and confirm `no_secrets_in_repo_confirmed` and `allowed_hosts_confirmed_non_production` | parked | Demo shortcut agreed on 2026-11-03 | Demo ends, or any new feature is started | `qa-profile.yaml` (`data.gate0_waivers`) |
| BL-007 | `git init` / commit and first review of all files | done (user committed 2026-11-03; later changes still need commits) | Done | User wants history, review or a PR | repo root |
| BL-008 | `/execute` command (run the whole flow from the main session, stopping at each gate) | parked | Flow was run by hand for DEMO-001 | User runs many features and wants one command | Plan Phase 1 |
| BL-009 | API testing (order: API, web, mobile): test an API with `curl` or Postman, for example restful-booker-platform or a public API with docs | parked | Phase 1 only covered web on a demo shop | User has an API URL or spec to test | Plan Phase 1 |
| BL-010 | Web skill from the user: review it (hosts, prompts, files it installs), then wire it into `manual-tester` (tools and web steps) | in progress | `playwright-cli` skill installed in `.claude/skills/` and reviewed (see below). Not wired into the agent; binary not installed; ask rule not yet confirmed to prompt | User approves wiring and installing the binary | `.claude/agents/manual-tester.md` Step 2.2 |
| BL-011 | Cross-browser, accessibility, responsive and performance checks | parked | Out of scope for the pilot | User needs coverage beyond functional checks | Plan Phase 3 |

Notes for BL-010 (2026-11-03): skills installed with `npx skills add ... --agent claude-code --copy` (copies in `.claude/skills/`; `.agents/` and `skills-lock.json` are the installer's own records). The `playwright-cli` skill had `allowed-tools` that pre-approved its commands; the line was removed from the copy, and `ask` rules were added in `.claude/settings.json`. Snyk rating: Med Risk. Re-check after any update (the line may come back). Update routine: `docs/test-environment.md`, section 5.

BL-006 is the first blocker for any new feature (Gate 0 returns HOLD without it).

## Notes for BL-004 (tooling facts, 2026-11-03)

- `playwright-best-practices` (currents-dev): a reference for writing and maintaining Playwright test code; says nothing about driving a browser. Fits Phase 3 (scripts).
- `playwright-cli` (Microsoft, Apache-2.0, v0.1.x, depends on an alpha Playwright): drives a real browser from the command line with page snapshots; has origin allow/block settings but the docs say they are not a security boundary. Installs a global npm package and a skill. Review before installing.
- Token cost of the built-in browser on DEMO-001: about 24,000 (first exploration) and 14,000 (second) tokens of context; see `workspace/DEMO-001/05-execution/token-record.md`.
