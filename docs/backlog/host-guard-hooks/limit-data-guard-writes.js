#!/usr/bin/env node
'use strict';
// PreToolUse hook: the data-guard subagent may only write its two report files.
const fs = require('fs');
const path = require('path');

function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
  process.exit(0);
}

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); }
catch (e) { deny('limit-data-guard-writes: cannot read hook input; failing closed.'); }

if (!String(input.agent_type || '').includes('data-guard')) process.exit(0);

const ti = input.tool_input || {};
const base = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const target = ti.file_path || ti.path;
if (!target) deny('data-guard write without a file path is not allowed.');
const rel = path.relative(base, path.resolve(base, String(target))).split(path.sep).join('/');
if (/^workspace\/[^/]+\/(00-data-gate|data-guard-report)\.md$/.test(rel)) process.exit(0);
deny('data-guard may only write workspace/<feature-id>/00-data-gate.md and data-guard-report.md (tried: ' + rel + ').');
