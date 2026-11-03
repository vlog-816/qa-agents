#!/usr/bin/env node
'use strict';
// PreToolUse hook: blocks network use outside data.allowed_hosts (qa-profile.yaml) and shell reads of secrets.
// Pattern-based guard, NOT a security boundary. Fails closed when the profile cannot be read.
const fs = require('fs');
const path = require('path');

function decide(decision, reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: reason },
  }));
  process.exit(0);
}
function pass() { process.exit(0); }

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); }
catch (e) { decide('deny', 'check-host: cannot read hook input; failing closed.'); }

const toolName = String(input.tool_name || '');
const ti = input.tool_input || {};
const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();

// ---- helpers: extract hosts -------------------------------------------------
const URL_RE = /\b(?:https?|ftps?|wss?|ssh|sftp|git):\/\/(?:[^\s\/?#@'"`]*@)?(\[[^\]]+\]|[^\s\/?#:'"`)\]>,;]+)/gi;
const BARE_RE = /(?<![\w@./\\-])((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}|\d{1,3}(?:\.\d{1,3}){3})(?::\d+)?(?=[\/\s'"`)?#]|$)/gi;
const FILE_EXT = new Set(['js', 'mjs', 'cjs', 'ts', 'tsx', 'jsx', 'json', 'md', 'yaml', 'yml', 'txt', 'py', 'exe', 'cmd', 'bat', 'ps1', 'sh', 'html', 'htm', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'log', 'csv', 'xml', 'env', 'toml', 'lock', 'zip', 'pdf', 'docx', 'xlsx', 'pptx', 'spec', 'test']);
const NET_TOOL_RE = /\b(curl|wget|iwr|irm|invoke-webrequest|invoke-restmethod|test-netconnection|tnc|ssh|scp|sftp|ftp|telnet|nc|ncat|nmap|ping|nslookup|npx|npm\s+(?:install|i|publish|view|info)|pip\s+install|winget|choco|git\s+(?:clone|fetch|pull|ls-remote)|playwright-cli)\b/i;
const SECRET_READ_RE = /\b(cat|type|more|less|head|tail|get-content|gc|select-string|sls|findstr|grep|rg|copy|cp|xcopy|robocopy|source|notepad|code)\b[^|;&\n]*?(\.env(\.[\w-]+)?\b|[\\/]secrets[\\/]|\bsecrets[\\/]|credential)/i;

function clean(h) { return h.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, ''); }
function urlHosts(s) {
  const out = []; let m; URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(s))) out.push(clean(m[1]));
  return out;
}
function bareHosts(s) {
  const out = []; let m; BARE_RE.lastIndex = 0;
  while ((m = BARE_RE.exec(s))) {
    const h = clean(m[1]);
    const ext = h.split('.').pop();
    if (/^\d/.test(h) || !FILE_EXT.has(ext)) out.push(h);
  }
  if (/\blocalhost\b/i.test(s)) out.push('localhost');
  return out;
}
function hostish(v) {
  const m = String(v).trim().match(/^([a-z0-9.-]+|\[[^\]]+\])(?::\d+)?(?:[\/?#]|$)/i);
  if (!m) return null;
  const h = clean(m[1]);
  return (h === 'localhost' || h.includes('.') || m[1].startsWith('[')) ? h : null;
}
const URL_KEYS = new Set(['url', 'uri', 'href', 'link', 'host', 'hostname', 'domain', 'origin', 'address']);
function walk(v, key, hosts, state) {
  if (typeof v === 'string') {
    hosts.push(...urlHosts(v));
    if (key && URL_KEYS.has(key.toLowerCase())) {
      state.hasUrlKey = true;
      const h = hostish(v); if (h) hosts.push(h);
    }
  } else if (Array.isArray(v)) { v.forEach(x => walk(x, key, hosts, state)); }
  else if (v && typeof v === 'object') { for (const k of Object.keys(v)) walk(v[k], k, hosts, state); }
}

// ---- decide which kind of call this is -------------------------------------
let kind = null;
if (toolName === 'Bash' || toolName === 'PowerShell') kind = 'shell';
else if (toolName === 'WebFetch') kind = 'webfetch';
else if (toolName === 'WebSearch') kind = 'websearch';
else if (toolName.startsWith('mcp__')) {
  const probe = { hasUrlKey: false }; walk(ti, null, [], probe);
  if (/browser|navigate|fetch|http|web|playwright|puppeteer|chrome|request|curl|crawl|scrape/i.test(toolName) || probe.hasUrlKey) kind = 'mcp';
}
if (!kind) pass();

if (kind === 'websearch') {
  decide('ask', 'Web search leaves the allowed hosts. Approve only for documentation research, never for testing.');
}

// ---- load the profile (fail closed) ----------------------------------------
function stripComment(s) { return s.replace(/\s+#.*$/, '').trim(); }
function unquote(s) { return s.replace(/^["']|["']$/g, ''); }
function readList(text, key) {
  const lines = text.split(/\r?\n/);
  const re = new RegExp('^\\s*' + key + '\\s*:\\s*(.*)$');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re); if (!m) continue;
    const rest = stripComment(m[1]);
    if (rest.startsWith('[')) {
      return rest.replace(/^\[|\]$/g, '').split(',').map(x => unquote(x.trim()).toLowerCase()).filter(Boolean);
    }
    const out = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (/^\s*(#.*)?$/.test(lines[j])) continue;
      const li = lines[j].match(/^\s*-\s*(.+)$/);
      if (!li) break;
      const v = unquote(stripComment(li[1])).toLowerCase();
      if (v) out.push(v);
    }
    return out;
  }
  return [];
}
let allowed, blocked;
try {
  const text = fs.readFileSync(path.join(projectDir, 'qa-profile.yaml'), 'utf8');
  allowed = readList(text, 'allowed_hosts');
  blocked = readList(text, 'blocked_hosts');
} catch (e) {
  decide('deny', 'check-host: cannot read qa-profile.yaml; failing closed. Network and secret access are blocked until it is fixed.');
}
const ALWAYS = ['localhost', '127.0.0.1', '::1'];
const matches = (h, list) => list.some(a => a === h || (a.startsWith('*.') && h.endsWith(a.slice(1))));
const isAllowed = h => ALWAYS.includes(h) || matches(h, allowed);

function checkHosts(hosts, onUnknown) {
  for (const h of [...new Set(hosts)]) {
    if (matches(h, blocked)) decide('deny', 'Host "' + h + '" is in data.blocked_hosts (production). Never test it.');
    if (!isAllowed(h)) decide(onUnknown, 'Host "' + h + '" is not in data.allowed_hosts of qa-profile.yaml. A human must add it (and run Data Guard) before any use.');
  }
}

// ---- rules -----------------------------------------------------------------
if (kind === 'shell') {
  const cmd = String(ti.command || '');
  if (SECRET_READ_RE.test(cmd)) {
    decide('deny', 'Reading .env, secrets/ or credential files from the shell is blocked (data policy section 7).');
  }
  const net = NET_TOOL_RE.test(cmd);
  const hosts = urlHosts(cmd);
  if (net) hosts.push(...bareHosts(cmd));
  checkHosts(hosts, 'deny');
  if (net && hosts.length === 0) {
    decide('ask', 'This command uses a network tool but no host could be detected. Check the target host is in allowed_hosts before approving.');
  }
  pass();
}

if (kind === 'webfetch') {
  const u = String(ti.url || '');
  const hosts = urlHosts(u); const h = hostish(u); if (h) hosts.push(h);
  if (hosts.length === 0) decide('ask', 'WebFetch without a detectable host. Approve only for documentation research.');
  checkHosts(hosts, 'ask');
  pass();
}

if (kind === 'mcp') {
  const hosts = []; walk(ti, null, hosts, { hasUrlKey: false });
  checkHosts(hosts, 'deny');
  pass();
}
pass();
