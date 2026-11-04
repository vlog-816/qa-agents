# Data Guard: pre-run
- Date: 2026-11-04
- Feature ID: FEAT-001 (no Jira ticket; FEAT-### allowed by the profile when there is no ticket)
- Verdict: BLOCK

**EN:** BLOCK. The newly added host `vlog-ai-powered-assistant.vercel.app` is a bare `*.vercel.app` project address. From files alone I cannot tell it apart from a production address. Policy says: when unsure, treat as production. This is a BLOCK condition, and a human declaration or a waiver cannot override a BLOCK.

**VI:** BLOCK. Host moi them `vlog-ai-powered-assistant.vercel.app` la dia chi project `*.vercel.app` tran. Chi dua vao file, toi khong phan biet duoc voi dia chi production. Chinh sach: khi khong chac thi coi la production. Day la dieu kien BLOCK, loi khai cua con nguoi hoac waiver khong the ghi de BLOCK.

## Checklist (pre-run only)
| Item | Status (ok / needs human confirmation / fail) | Source |
|---|---|---|
| `data_class` declared and valid | ok (`synthetic`). Whether it matches this deployment is only the human's statement (no real users, no real data) | qa-profile.yaml `data.data_class` |
| `real_data_approval_ref` (only if real) | ok, not applicable | qa-profile.yaml |
| `masking_approval_ref` (only if masked) | ok, not applicable | qa-profile.yaml |
| `allowed_hosts` not empty, no overlap with `blocked_hosts` | ok (3 hosts, `blocked_hosts` is empty) | qa-profile.yaml |
| `allowed_hosts` contains no production-looking host | **fail**: `vlog-ai-powered-assistant.vercel.app` (see "Production-host judgment") | qa-profile.yaml, Data Guard judgment |
| `blocked_hosts` / `no_production_hosts` | ok formally: `no_production_hosts: true`, `blocked_hosts: []`, `data_class: synthetic`, no contradiction. But the declaration is doubtful for this host (see below) | qa-profile.yaml |
| `team` set | ok (`qa-pilot`) | qa-profile.yaml |
| `jira.mode` = read-only | ok | qa-profile.yaml |
| `.gitignore` excludes `workspace/**/evidence/` | ok (line 2) | .gitignore |
| `approver`, `date` | ok (recorded: Boss-QA, 2026-11-03). Note: the date is from the previous day and predates the new host. Please re-confirm for FEAT-001 | qa-profile.yaml |
| `claude_plan_approved` | ok (true, human-recorded, not verified by me) | qa-profile.yaml |
| `test_account_confirmed` | ok in profile (true). But the FEAT-001 test account is created later by the human, so this must be re-confirmed once it exists | qa-profile.yaml |
| `no_secrets_in_repo_confirmed` | ok (true, human-recorded) | qa-profile.yaml |
| `allowed_hosts_confirmed_non_production` | ok (true, human-recorded). It does not remove the BLOCK (see below) | qa-profile.yaml |
| Waivers (`data.gate0_waivers`) | none present. No item is WAIVED | qa-profile.yaml |

## Production-host judgment
- Host: `vlog-ai-powered-assistant.vercel.app`. It is a bare, stable project alias on a public domain. On Vercel, the default `<project>.vercel.app` alias is normally the production deployment. Preview or staging deployments usually have an extra suffix (branch or hash, e.g. `<project>-git-<branch>-<team>.vercel.app`), or are a separate project, or have their own non-production name.
- Nothing in the host name (no `test`, `staging`, `dev`, `preview`) says non-production. The route `/login` is reachable on a public URL.
- Honest judgment: it looks like a production address and I cannot tell it apart from staging. Per the rules, I treat it as production, so it is BLOCK.
- Effect of the human declaration (chat, 2026-11-04: "TEST deployment, no real users, no real data", plus `allowed_hosts_confirmed_non_production: true`):
  - The declaration is recorded and taken seriously. It is evidence of intent, and it is the only reason this is not a plain "production" finding.
  - It does not change the verdict. The BLOCK rule is "when unsure, treat as production", and the declaration is not a file-verifiable fact. The policy also states that a waiver never overrides a BLOCK, and a chat statement carries less weight than a waiver.
  - Chat declarations are not in `qa-profile.yaml`, so they cannot be audited later.
  - The "no real users" claim also covers only the present moment. A bare production alias can gain real users at any time.
- Related doubt: `no_production_hosts: true` says no production host exists. If this app's team later deploys a production instance, or this very alias is the production one, the declaration is wrong. It was written for demo/local targets only ("pilot with demo/local targets only"), and this host is the user's own application, which is a different kind of target.

## Findings
| # | File / image | Line | Type | Masked value | Recommendation |
|---|---|---|---|---|---|
| 1 | qa-profile.yaml | 14 | Allowed host looks like production (bare `*.vercel.app`) | n/a (not a sensitive value) | See "How to get to PASS" |

## Credential conditions (apply to any later run on this feature, once the verdict allows it)
1. The test account is created by the human, dedicated, with minimum privileges. No personal or admin accounts.
2. Credentials exist only as the human's environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`. They must never appear in any file, report, evidence, prompt or chat.
3. Any run that types the password is done by the human in their own terminal. The AI does not type it and does not see it.
4. The Playwright script reads `process.env`, fails fast when a variable is missing, has no default values, no logging of the values, and trace/video/screenshot are off for that spec.
5. AI-driven exploration with `playwright-cli` is read-only: in-memory Chrome profile, snapshot and screenshot only, no typing, no form submission, stop on any redirect to another host.
6. Evidence goes under `workspace/FEAT-001/evidence/run-1/` (git-ignored). Screenshots of the login page before login are fine to scan (`data_class: synthetic`). Screenshots taken after a human login must be reviewed by the human first.
7. If a secret is ever pasted into chat or a file: treat it as leaked, revoke and rotate it (data-policy section 7).
8. Scope limits: the AI makes no network calls itself in this gate. Reading the page with `playwright-cli` happens only after the verdict becomes PASS.

## How to get to PASS (options for the human, I have not changed anything)
1. Preferred: test against a host that is clearly non-production, for example a separate Vercel project or a preview deployment with a distinct name (`...-staging...`, `...-test...`), or `localhost`. Put that host in `allowed_hosts` instead of the bare alias.
2. If this bare alias is truly only a test deployment, make that verifiable from files: for example rename or document it (a note in `qa-profile.yaml` or in `inbox/` stating the Vercel project, environment type and owner), and add deployment protection if available. Then ask for a fresh pre-run. I will re-judge honestly; a claim in chat alone is not enough.
3. If a production deployment of this app exists (or may exist), set `no_production_hosts: false` and list it in `blocked_hosts`.
4. Re-confirm Gate 0 for FEAT-001 (approver, date 2026-11-04, test account once created).

## Open questions
(The workflow must stop for a human decision.)
1. Is `vlog-ai-powered-assistant.vercel.app` the Vercel production alias of the project, or a separate test project? What evidence from files can show it?
2. Does any other deployment of this app (production, or one meant to become production) exist? If yes, `no_production_hosts: true` is not valid.
3. Can the human confirm the deployment really holds no real users and no real data, for example that sign-up is closed and only the human-created test account exists?
4. Re-confirm Gate 0 (approver, date) for FEAT-001, since the existing confirmations are dated 2026-11-03 and cover a different host set.
5. The test account for FEAT-001 does not exist yet. `test_account_confirmed: true` should be re-confirmed after the human creates it.
6. Evidence retention period is still blank in the data policy (section 6, to be confirmed by security). Not a blocker for this verdict, but it matters for screenshots of an app the team owns.
