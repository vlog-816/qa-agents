# Web steps

- The main session may run web steps itself (no subagent needed) with the allowed call form, from the project root, one command per Bash call:
  `npx --no-install --prefix tools/playwright-cli playwright-cli <command>`
  Other forms (`npx --no-install playwright cli ...`, bare `playwright-cli`) hit the `ask` rules and prompt on every command.
- Add `--headed` to `open` when the user wants to watch; close the browser at the end.
- Open only hosts in `data.allowed_hosts` in `qa-profile.yaml`; read the `Page URL` after each command and stop on any redirect to another host.
- When done, or when a stop rule fires, copy only the evidence that is needed, then delete the scratch folder: `rm -r .playwright-cli` (allowed without asking, see `file-access.md`).
- Details: `docs/test-environment.md`.
