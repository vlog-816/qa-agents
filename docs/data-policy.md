# Data Policy and Gate 0 (draft 0.1)

> **Status:** draft, not yet reviewed by security or legal. This document does not replace company policy.

## 1. Purpose and scope

Testing agents read and operate on real applications, so they may see personal data and secrets. This document sets the conditions under which agents may run and what to do when sensitive data is involved. It applies to every agent in this kit.

## 2. Environment classification

| `data_class` | Meaning | May agents run? |
|---|---|---|
| `synthetic` | Fully fake data | Yes |
| `masked` | Real data that has been anonymized so people can no longer be identified | Yes, once security has confirmed the masking process |
| `real` | Contains real or sensitive data | **No**, unless there is written approval recorded in `real_data_approval_ref` |

**If unsure, treat it as `real`.** An environment that has not been classified is also treated as `real`.

## 3. Gate 0: checklist before every run

- [ ] `qa-profile.yaml` declares a `data_class` that matches the environment about to be tested
- [ ] `allowed_hosts` contains only staging or local hosts; production is listed in `blocked_hosts`
- [ ] If `data_class = real`: a `real_data_approval_ref` exists (approval number, approver, date)
- [ ] A dedicated test account with minimum privileges is used; no personal or real admin accounts
- [ ] Passwords and tokens are not in prompts or repo files; use environment variables or a secret store
- [ ] The Claude account plan in use has been approved by the company for this type of data
- [ ] If `data_class = masked`: a `masking_approval_ref` exists (security confirmed the masking process)
- [ ] `blocked_hosts` lists the production host(s) (no placeholders), or a human has declared `data.no_production_hosts: true` (allowed only for `synthetic` data and pilot targets; must be revisited when a production host exists)
- [ ] Jira is in read-only mode
- [ ] The `evidence/` folder is in `.gitignore`
- [ ] Gate 0 approver (name, date): recorded in `data.gate0_confirmations` in `qa-profile.yaml`

Human-only items (Claude plan approved, test account, no secrets in repo, allowed hosts are non-production) are recorded by a person in `data.gate0_confirmations`. For a pilot, the approver may waive the last two for one named feature via `data.gate0_waivers`; waivers are reported as WAIVED and must be removed after the pilot. Data Guard reads them but never fills them in. If any is empty, the verdict is HOLD.

Since 2026-11-05 the Data Guard check of this list is optional (the user asks for it). The checklist stays as guidance, and agents still only use hosts in `allowed_hosts` and never put real data or secrets in files or chat.

## 4. Rules for agents

Agents **must not**:

1. Run when `data_class = real` without approval.
2. Access URLs outside `allowed_hosts`, especially production.
3. Copy personal data, passwords or tokens into reports, test cases, tickets or conversations. Write only masked values (for example `09******12`) or describe the type ("customer email").
4. Send data outside the permitted scope (Jira, chat, web) before it passes a review gate.
5. Use real data as `test_data`. Use fake data only.
6. Modify or delete original evidence. Only report and suggest how to mask it.
7. Decide on their own when unsure whether data is sensitive. They must stop and record it under "Open questions".

## 5. What data can reach the AI

Anything an agent reads or sees (page content, screenshots, API responses, files in the repo, ticket content) may be sent to the model for processing. Principle: if you do not want the AI to see it, do not put it within the agent's view.

Data retention and usage terms depend on the plan type (personal or commercial) and change over time. Security or legal must read the current terms before approving use with company data. A personal plan (Pro) should not be used with company data without approval.

## 6. Evidence and reports

- Screenshots and raw responses are stored in `workspace/<feature-id>/evidence/` (gitignored, never committed).
- Reports use only masked values and reference evidence by path.
- Before sharing (Jira, email, chat): running Data Guard in `post-run` mode is optional (since 2026-11-05; the user asks for it). If it is run, a `BLOCK` result means do not share.
- Data Guard opens screenshots only when `data_class` is `synthetic` or `masked`. For `real` or unknown data, images are not opened by the AI and need human review.
- Evidence retention period: ______ (to be confirmed by security).

## 7. Secrets (credentials)

- Use environment variables or the company secret store.
- `.env` and the `secrets/` folder are blocked from reading via `.claude/settings.json` (see the limits in section 9).
- If a secret is accidentally pasted into a conversation or file: treat it as leaked, revoke it and rotate it immediately.

## 8. Incidents

If you suspect real data or secrets have leaked outside the permitted scope:

1. Stop the agent.
2. Do not delete the conversation or logs before reporting.
3. Notify the person responsible for security.
4. Revoke the affected secrets.
5. Record what happened, when and where.

## 9. Technical limits to be aware of

- According to the Claude Code permissions documentation, `deny` rules for `Read` and `Edit` apply to the built-in file tools, **not** to Bash subprocesses. A `Read(./.env)` rule does not stop `cat .env` in Bash. Blocking at the operating-system level requires enabling the sandbox. (Cross-check: `code.claude.com/docs/en/permissions`.)
- Bash rules rely on prefix matching and can be bypassed.
- A host-enforcing hook is **not active**. A written and offline-tested version is parked in `docs/backlog/host-guard-hooks/` (backlog BL-001): pattern-based, never run live, not independently reviewed. Native Windows has no sandbox (WSL2 needed).
- Rules written in agent files or prompts are guidance, not hard barriers.

## 10. Questions for security or legal

1. Does the company allow external AI tools with staging data? Which plan?
2. What type of data does staging currently hold? What is the masking process?
3. Which personal-data protection regulations apply (domestic or foreign)?
4. How long should evidence and logs be retained?
5. Who approves Gate 0, and who may approve the use of real data?
