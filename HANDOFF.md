# HANDOFF: AI Testing Team on Claude Code (continue in plan mode)

> **Outdated snapshot (written 2026-11-03).** For current progress and open items, see `workspace/WORKLOG.md`.

- Written: 2026-11-03, by Claude in a claude.ai chat, for Claude Code.
- Status: Phase 0 draft is complete. Nothing else has been built or tested.
- You (Claude Code) have no memory of the chat that produced this. Everything you need is in this file and in the repository.

## 0. How to use this file

You are in **plan mode**. Your job in this session is to **produce a plan**, not to implement it.

1. Do not create or edit files. Do not run tests. Do not make network calls against any application or Jira.
2. Reading is fine. Read in this order: `CLAUDE.md` → this file → `qa-profile.yaml` → `docs/data-policy.md` → `.claude/settings.json` → `.claude/agents/data-guard.md` → `templates/*.md` → `README.md`.
3. Follow section 9 (your task). Ask the user the questions in section 8 before you finalize the plan.
4. Do not start implementing until the user approves the plan. Then build **one phase at a time**.

## 1. The user and ground rules

- The user writes in **Vietnamese**. Reply to the user in Vietnamese. Write all repository files in **English** (keys, IDs and field names always English; generated content follows `language` in `qa-profile.yaml`).
- **Ask when unclear. Do not assume or guess.** This is an explicit user preference. Prefer one focused question at a time, or a short numbered list.
- The user wants to **build gradually**, not all at once.
- The user will **review at every stage** and whenever the AI is unsure. This will be relaxed later as trust grows, so review gates must be configurable.
- Optional courtesy: when the user writes in Vietnamese, start with a one-line English translation of their request.
- Environment: Windows, Claude desktop app (Code tab), Pro (personal) plan. The `claude` CLI command is **not** installed. Project folder: `D:\Source\qa-agents`.

## 2. Goal

Build an **extensible AI testing team** inside Claude Code. Roles are added over time without rewriting earlier ones.

Intended flow once complete:

```
Gate 0: data and environment check
   ↓
[BA agent] intake of mixed sources (Jira, documents, web links) → standard requirements
   ↓  ◆ human review
[Manual Tester] re-analyzes, clarifies with BA (and verifies with a human BA/PO) → test plan and test cases
   ↓  ◆ human review
[Test Reviewer] checks test cases for gaps, duplicates, ambiguity
   ↓
[Manual Tester] executes tests by platform (web, API, mobile) → execution report
   ↓
[Data Guard] scans results and evidence for sensitive data
   ↓  ◆ human review
[Automation Tester] writes scripts for Passed cases, via a framework adapter
   ↓  ◆ human review
```

Anthropic's "Building effective agents" patterns used: prompt chaining (the flow), routing (by platform), evaluator-optimizer (Test Reviewer), orchestrator-workers (a coordinating session), plus human-in-the-loop.

## 3. Decisions already made (from the interview)

| Topic | Decision |
|---|---|
| Requirement sources | **Mixed**: Jira tickets, documents (Word/PDF/Confluence), web links |
| Human review | **Every stage and whenever AI is unsure**; configurable, to be relaxed later |
| Users | **Multiple teams or the whole company** |
| Automation framework | **Playwright now**, will likely change (other companies, other frameworks) |
| Jira type | **Unknown** (Cloud vs Server/Data Center) |
| Code hosting | **Unknown**; currently GitHub and Bitbucket |
| Pilot product type | **Mixed** (web, API, mobile) |
| Staging data | **Real or sensitive data** present |
| Language of generated content | **Per team** (`language: vi | en | bilingual`) |
| Build approach | Gradual, one phase at a time |

Note on pilot platform order: in the walkthrough the user first asked about **website** testing. The recommended order for the pilot is **API → web → mobile** (mobile is the hardest to set up and the most sensitive on real devices). **Confirm with the user.**

## 4. Target architecture

### Principles

1. **One role = one agent file** in `.claude/agents/`. Adding a role means adding a file, not editing existing roles.
2. **Agents communicate through files** in `workspace/<feature-id>/`, never directly. Files are reviewable and versionable in git.
3. **Human gates** between stages, configured in `qa-profile.yaml` (`required` | `optional`). Gate 0 (data) is always `required`.
4. **Uncertainty policy:** `stop_and_ask`. Every output file has an "Open questions" section. If it is not empty, the workflow stops for a human.
5. **Tools are separate from roles.** MCP servers and CLI tools are configured once (`.mcp.json`) and granted per agent as needed.
6. **Company-specific things live in the profile and adapters, not in the core.** Moving to another company means changing the profile and adapters only.
7. **Framework-neutral test cases.** Approved test cases never mention a framework. The automation agent translates them using a per-framework skill.

### Layers (target, not yet built)

```
CORE (shared, versioned git repo, packaged as a plugin later)
  agents/: ba-analyst, manual-tester, automation-tester, test-reviewer, data-guard, ...
  commands/: /analyze, /plan, /execute, /pipeline
  skills/: intake-files, intake-jira-cloud, intake-jira-dc, framework-playwright, framework-selenium, ...
  templates/: requirement, test-case (neutral), test-plan, execution-report, traceability

TEAM PROFILE (per team repo)
  CLAUDE.md, qa-profile.yaml, .mcp.json, inbox/, workspace/

GOVERNANCE (mandatory at company scale)
  permissions, hooks, secrets handling, audit trail (git), cost control
```

For the single-team pilot, everything stays in **one folder**. Split core from team profiles only when a second team joins.

### Workspace layout per feature (target)

```
workspace/<feature-id>/
  00-data-gate.md          (Data Guard, pre-run)
  01-requirements.md       (BA)
  02-clarifications.md     (Q&A between Manual Tester and BA)
  03-test-plan.md
  04-test-cases.md         (neutral format)
  05-execution/            (results)
  06-report.md
  07-automation/
  data-guard-report.md     (Data Guard, post-run)
  evidence/                (gitignored; screenshots, raw responses)
```

Also planned: a **traceability matrix** `REQ → TC → result → script`.

### Roles

- **AI agents (planned):** ba-analyst, manual-tester, automation-tester, test-reviewer, data-guard (exists), bug-reporter, test-data agent, regression/impact analyst, platform specialists (API, mobile), later performance/security/accessibility.
- **Humans:** QA lead (approver), real BA/PO (answers clarification questions), developers (fix bugs), DevOps (stable staging), platform owner (maintains the core repo), team champions, security reviewer.

## 5. Current state: what exists (Phase 0 draft)

```
qa-agents/
├── CLAUDE.md                 rules for every session
├── README.md                 for humans
├── qa-profile.yaml           team profile (language, data, hosts, sources, jira, platforms, framework, gates)
├── .gitignore
├── docs/data-policy.md       data classes, Gate 0 checklist, agent rules, incidents, limits, questions for security
├── .claude/
│   ├── settings.json         permissions: deny (secrets, git push, rm -rf, sudo), ask (curl, git commit)
│   └── agents/data-guard.md  pre-run (Gate 0) and post-run (scan) modes
├── templates/
│   ├── requirement.md
│   ├── test-case.md          framework-neutral YAML format
│   └── execution-report.md
├── inbox/                    drop documents and exported tickets (gitignored)
└── workspace/
```

Not tested on a real machine. JSON and YAML syntax were validated only.

## 6. Not built yet

- Agents: `ba-analyst`, `manual-tester`, `automation-tester`, `test-reviewer`, `bug-reporter`.
- Commands: `/analyze`, `/plan`, `/execute`, `/pipeline` (and gate handling driven by `qa-profile.yaml`).
- Skills: intake (files, Jira), framework adapters (Playwright first).
- Templates: test plan, traceability matrix.
- A **hook that enforces `data.allowed_hosts`** ("Phase 0.5"). Currently the rule exists only as guidance.
- MCP setup: Playwright MCP (web), mobile MCP or Appium MCP (mobile), Atlassian/Jira MCP. Node.js 20+ is needed for `npx`-based MCP servers.
- Core vs team split, plugin packaging, versioning.
- An evaluation set to test the agents themselves.
- Pending small change: add `@qa-profile.yaml` at the end of `CLAUDE.md` so the profile is always in context (the user has not decided yet).

## 7. Facts and their confidence

Re-verify the ones that are not "official" against `code.claude.com/docs` before relying on them.

| Claim | Confidence |
|---|---|
| Subagents are Markdown files with YAML frontmatter in `.claude/agents/` (project) or `~/.claude/agents/` (user) | Official docs |
| Since v2.1.198 the `/agents` command no longer opens a creation wizard; it prints a reminder. The user's version is unknown, so **check agents by asking Claude to list available subagents** | Official docs |
| If a new subagent is not found, restart Claude Code | Official docs |
| Use the filename `data-guard.md`, not `.agent.md` (the `.agent.md` suffix is a GitHub Copilot/VS Code convention; sources disagree on whether Claude Code requires `name` to match the filename) | Community sources |
| Subagents cannot spawn other subagents, so orchestration must come from the main session or a command | Community source, **verify** |
| `CLAUDE.md` loads at session start (including parent directories); `CLAUDE.md` in subdirectories loads on demand; `@path` imports are expanded at launch; CLAUDE.md is context, not enforced configuration | Official docs and community |
| `permissions` in `settings.json` uses `deny` / `ask` / `allow` arrays; `Read(...)` deny rules apply to built-in file tools, **not** to Bash subprocesses (`cat .env` still works); a sandbox or hook is needed for real enforcement; Bash pattern rules can be bypassed | Official docs |
| The `tools:` frontmatter field is a comma-separated list; if omitted, the subagent inherits all tools | Community sources |
| The desktop app (Code tab) reads the same settings files as the CLI, and on Windows needs Git for Windows | Official docs (desktop page); whether it loads `.claude/agents/` identically is **unverified** |
| A plugin marketplace can be added from any git host, including Bitbucket, with a full URL ending in `.git`; private repos need git credentials per user | Official docs |
| Official Atlassian Rovo MCP server supports **Cloud only**. Jira Server/Data Center needs a community server such as `sooperset/mcp-atlassian` (reported to support Server/DC 8.14+ and a read-only mode); it handles credentials and needs a security review | Official + community |
| Consumer plans (Free/Pro/Max) and commercial plans (Team/Enterprise/API) have different data retention and training terms, and the consumer terms changed recently. The user is on **Pro (personal)** | Official docs; **re-read current terms** |
| Managed Agents (API product) is beta and not eligible for Zero Data Retention or HIPAA BAA | Official docs |

## 8. Open questions for the user

Ask these before finalizing the plan. Group them in small rounds.

**Data and compliance (ask first)**
1. Has security/legal approved using Claude on company data? Which plan will be used for sensitive data (Team, Enterprise, API)?
2. Can the pilot use a synthetic or masked staging environment? What is the masking process?
3. Evidence retention period; who approves Gate 0 and real-data use?

**Pilot**
4. Which team and product? How many people? Which platforms exactly (web, API, mobile)?
5. Typical requirement documents: formats, size, how many features per month?
6. Who acts as the real BA/PO in the clarification loop, and how available are they?

**Execution**
7. Web: which test accounts and environments? API: Postman collections or OpenAPI specs available? Mobile: Android, iOS, emulators or real devices?
8. Is Node.js 20+ installed? Which MCP servers are allowed by company policy?

**Tooling**
9. Jira type (Cloud vs Server/Data Center). Ask the user to check the URL pattern or ask the Jira admin.
10. Where should test cases finally live: this repo only, or a test-management tool (Xray, Zephyr, TestRail, other)? Should bugs be created in Jira (currently read-only)?
11. Code hosting for the core repo and automation scripts (GitHub or Bitbucket). CI system?
12. Automation code language and repo structure.

**Process**
13. Feature ID convention: reuse Jira keys?
14. Success metrics for the pilot (time saved, defects found, review effort)?
15. Cost tolerance and usage limits.
16. Confirm the pilot platform order (API → web → mobile).
17. Apply the pending `@qa-profile.yaml` import in `CLAUDE.md`?

## 9. Your task in plan mode

1. **Audit Phase 0.** Read all existing files. List inconsistencies, gaps and risks. Verify the points marked "community" or "unverified" in section 7 against official documentation if you have web access; otherwise list them as to-verify.
2. **Interview the user** with the questions in section 8. Do not assume answers. Record the answers.
3. **Produce a phased implementation plan** (use section 10 as a starting proposal). For each phase give: goal, exact file paths to create or change, acceptance criteria, human gates, risks, and what must be verified first.
4. **Present the plan in Vietnamese** (summary) and keep file names and contents in English. Wait for the user's approval before implementing anything.
5. After approval, implement **one phase at a time**, and ask for review at the end of each phase.

## 10. Proposed roadmap (refine with the user)

| Phase | Goal | Main deliverables | Done when |
|---|---|---|---|
| 0 (draft exists) | Standards and data policy | Files in section 5 | Security/legal has reviewed `docs/data-policy.md`; syntax verified on the user's machine |
| 0.5 | Enforce host and secret rules technically | A hook (or sandbox) that blocks hosts outside `allowed_hosts`; decision on `curl` ask-mode | A test shows production and unknown hosts are blocked |
| 1 | Manual Tester alone, one pilot team, synthetic data | `manual-tester` agent, test-plan template, `test-reviewer`, `/execute` command, traceability matrix, API then web executors (Playwright MCP) | One feature goes from requirements file to execution report with all gates working |
| 2 | BA and multi-source intake | `ba-analyst`, `intake-files` skill, Jira intake skill (after Jira type is known), clarification loop (orchestrated from the main session), `/pipeline` reading gates from `qa-profile.yaml` | A mixed-source feature produces standard requirements with conflicts and open questions flagged |
| 3 | Automation | `automation-tester`, `framework-playwright` skill, neutral-to-code translation, review gate | Scripts are generated from approved Passed cases and reviewed by a human |
| 4 | Company rollout | Core split from team profiles, plugin packaging, git-URL install, versioning, second team onboarding | A second team runs the pipeline with only its own profile |
| 5 | Extra roles and quality of the agents | bug-reporter, test-data agent, impact analyst, evaluation set ("test the testers"), metrics; relax gates based on evidence | Gate relaxation is justified by measured results |

Mobile executors (mobile MCP or Appium MCP) come after web is stable.

## 11. Non-negotiable constraints

- Never run an agent against `data_class: real` without a recorded approval in `real_data_approval_ref`. If the class is unknown, treat it as `real`.
- Never touch production. Only hosts in `data.allowed_hosts`.
- Never write real personal data, passwords or tokens into any file, report, ticket or conversation. Use masked values.
- Secrets live in environment variables or a secret store, never in the repo or prompts.
- Keep Jira read-only until the user explicitly changes it.
- Instructions written in agent files or `CLAUDE.md` are guidance, not hard barriers. Anything safety-critical needs technical enforcement (permissions, sandbox, hooks).
- When unsure, stop and ask. Record the doubt under "Open questions".
- Do not over-build. Smallest useful step first.

## 12. Definition of done for this planning session

- The audit of Phase 0 is written down (issues, gaps, verification list).
- All questions in section 8 are answered or explicitly deferred by the user.
- A phased plan exists with file paths, acceptance criteria, gates and risks per phase.
- The user has approved the plan or asked for changes.
- No files were modified during planning.
