#!/usr/bin/env node
'use strict';
// Offline tests for the hooks. Feeds sample JSON to the scripts; sends no network traffic.
// Run: node .claude/hooks/tests/run.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const hooksDir = path.resolve(__dirname, '..');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-hook-'));
fs.writeFileSync(path.join(fixture, 'qa-profile.yaml'), [
  'data:',
  '  allowed_hosts:',
  '    - localhost                # local app',
  '    - demo.example.test        # demo site',
  '  no_production_hosts: false',
  '  blocked_hosts:',
  '    - prod.example.test',
  '',
].join('\n'));
const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-hook-empty-'));

function run(script, payload, dir) {
  const r = spawnSync(process.execPath, [path.join(hooksDir, script)], {
    input: JSON.stringify(payload),
    env: { ...process.env, CLAUDE_PROJECT_DIR: dir },
    encoding: 'utf8',
  });
  if (r.status !== 0 && !r.stdout) return 'crash:' + (r.stderr || r.status);
  if (!r.stdout.trim()) return 'allow';
  try { return JSON.parse(r.stdout).hookSpecificOutput.permissionDecision; } catch (e) { return 'badjson'; }
}
const bash = c => ({ tool_name: 'Bash', tool_input: { command: c } });
const ps = c => ({ tool_name: 'PowerShell', tool_input: { command: c } });
const mcp = (n, i) => ({ tool_name: n, tool_input: i });

const cases = [
  ['host-check', 'curl localhost allowed', bash('curl http://localhost:3000/api'), fixture, 'allow'],
  ['host-check', 'curl demo host allowed', bash('curl -s https://demo.example.test/books'), fixture, 'allow'],
  ['host-check', 'curl unknown host denied', bash('curl https://example.com'), fixture, 'deny'],
  ['host-check', 'curl blocked host denied', bash('curl https://prod.example.test/'), fixture, 'deny'],
  ['host-check', 'PowerShell iwr unknown denied', ps('Invoke-WebRequest https://evil.example.org/x'), fixture, 'deny'],
  ['host-check', 'curl variable URL asks', bash('curl "$URL"'), fixture, 'ask'],
  ['host-check', 'curl bare host denied', bash('curl www.google.com'), fixture, 'deny'],
  ['host-check', 'node fetch URL denied', bash('node -e "fetch(\'https://example.com\')"'), fixture, 'deny'],
  ['host-check', 'IP URL denied', bash('curl http://10.0.0.5/'), fixture, 'deny'],
  ['host-check', 'plain ls allowed', bash('ls workspace'), fixture, 'allow'],
  ['host-check', 'git status allowed', bash('git status'), fixture, 'allow'],
  ['host-check', 'file name with dot not a host', bash('node .claude/hooks/tests/run.js'), fixture, 'allow'],
  ['host-check', 'npx without host asks', bash('npx playwright test'), fixture, 'ask'],
  ['secrets', 'cat .env denied', bash('cat .env'), fixture, 'deny'],
  ['secrets', 'PowerShell Get-Content secrets denied', ps('Get-Content .\\secrets\\key.txt'), fixture, 'deny'],
  ['secrets', 'cat README allowed', bash('cat README.md'), fixture, 'allow'],
  ['webfetch', 'WebFetch unknown asks', mcp('WebFetch', { url: 'https://docs.example.org/page' }), fixture, 'ask'],
  ['webfetch', 'WebFetch blocked denied', mcp('WebFetch', { url: 'https://prod.example.test/' }), fixture, 'deny'],
  ['webfetch', 'WebFetch demo allowed', mcp('WebFetch', { url: 'https://demo.example.test/' }), fixture, 'allow'],
  ['websearch', 'WebSearch asks', mcp('WebSearch', { query: 'playwright' }), fixture, 'ask'],
  ['mcp', 'browser navigate demo (no scheme) allowed', mcp('mcp__Claude_Browser__navigate', { url: 'demo.example.test/books' }), fixture, 'allow'],
  ['mcp', 'browser navigate https demo allowed', mcp('mcp__Claude_Browser__navigate', { url: 'https://demo.example.test/cart' }), fixture, 'allow'],
  ['mcp', 'browser navigate unknown denied', mcp('mcp__Claude_Browser__navigate', { url: 'www.google.com' }), fixture, 'deny'],
  ['mcp', 'browser navigate back allowed', mcp('mcp__Claude_Browser__navigate', { url: 'back' }), fixture, 'allow'],
  ['mcp', 'browser navigate blocked denied', mcp('mcp__Claude_Browser__navigate', { url: 'https://prod.example.test' }), fixture, 'deny'],
  ['mcp', 'unrelated mcp tool allowed', mcp('mcp__ccd_session__mark_chapter', { title: 'x' }), fixture, 'allow'],
  ['mcp', 'other mcp tool with a url key to unknown host denied', mcp('mcp__other__tool', { url: 'https://example.com' }), fixture, 'deny'],
  ['profile', 'missing profile fails closed', bash('curl http://localhost:3000'), emptyDir, 'deny'],
  ['other', 'unrelated tool (Read) allowed', mcp('Read', { file_path: 'README.md' }), fixture, 'allow'],
];

let fail = 0;
for (const [group, name, payload, dir, expect] of cases) {
  const got = run('check-host.js', payload, dir);
  const ok = got === expect;
  if (!ok) fail++;
  console.log((ok ? 'PASS' : 'FAIL') + '  [' + group + '] ' + name + (ok ? '' : '  (expected ' + expect + ', got ' + got + ')'));
}

const dg = (agent, file) => ({ tool_name: 'Write', agent_type: agent, tool_input: { file_path: file } });
const wcases = [
  ['data-guard writes gate file allowed', dg('data-guard', path.join(fixture, 'workspace', 'X-1', '00-data-gate.md')), 'allow'],
  ['data-guard writes report allowed', dg('data-guard', 'workspace/X-1/data-guard-report.md'), 'allow'],
  ['data-guard writes profile denied', dg('data-guard', 'qa-profile.yaml'), 'deny'],
  ['data-guard writes requirements denied', dg('data-guard', 'workspace/X-1/01-requirements.md'), 'deny'],
  ['data-guard path escape denied', dg('data-guard', 'workspace/X-1/../../qa-profile.yaml'), 'deny'],
  ['main session writes anywhere allowed', dg('', 'qa-profile.yaml'), 'allow'],
  ['other agent writes anywhere allowed', dg('manual-tester', 'workspace/X-1/03-test-plan.md'), 'allow'],
];
for (const [name, payload, expect] of wcases) {
  const got = run('limit-data-guard-writes.js', payload, fixture);
  const ok = got === expect;
  if (!ok) fail++;
  console.log((ok ? 'PASS' : 'FAIL') + '  [dg-write] ' + name + (ok ? '' : '  (expected ' + expect + ', got ' + got + ')'));
}

fs.rmSync(fixture, { recursive: true, force: true });
fs.rmSync(emptyDir, { recursive: true, force: true });
const total = cases.length + wcases.length;
console.log('\n' + (total - fail) + '/' + total + ' passed');
process.exit(fail ? 1 : 0);
