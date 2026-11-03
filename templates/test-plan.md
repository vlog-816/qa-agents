# Test plan: <feature name>

- Feature ID: PROJ-123   <!-- Jira key; FEAT-### only when there is no ticket -->
- Date:
- By: manual-tester
- Approach: `scripted` | `exploratory` (chosen by the approver)
- Gate `test_plan`: waiting for human approval (approver, date: ______)

<!-- Write content in the language set in qa-profile.yaml. Keep keys and IDs in English. -->

## Inputs

- `00-data-gate.md`: verdict (PASS | PASS with waivers | HOLD | BLOCK)
- `01-requirements.md`: approved on (date)
- Other sources (exploration notes, designs):

## 1. Scope

- In scope (REQ IDs):
- Out of scope (and why):

## 2. Platforms and hosts

- Platforms: `web` | `api` | `mobile` (from `platforms` in `qa-profile.yaml`)
- Hosts: only values in `data.allowed_hosts`

## 3. Approach

- Scripted: how test cases are derived and run.
- Exploratory: charters (mission, areas, ideas, time box, what to record).

## 4. Test data

- Fake data only. List the account type and the environment variable names for credentials (never the values).

## 5. Charters or test case groups

| ID | Mission / Group | REQ | Time box | Status |
|---|---|---|---|---|
| CH-01 | | | | |

## 6. Entry and exit criteria

- Entry: plan approved, Gate 0 PASS (waivers listed), approvals for each network action.
- Exit: charters done or time box used, results recorded, findings listed.

## 7. Risks

| Risk | Impact | Covered by (TC / CH) |
|---|---|---|

## 8. Assumptions and open questions

If this section is not empty, stop and ask a human (uncertainty_policy: stop_and_ask).

- 

## 9. Cost note (optional)

Tool used and token cost, if measured (see `05-execution/token-record.md`).

## 10. Approval

- Approver:
- Date:
- Decisions that override earlier notes:
