import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_DIRECTIVES = ["frame-ancestors 'none'", "base-uri 'self'", "object-src 'none'"];

export function hashScript(scriptContent) {
  return `'sha256-${createHash('sha256').update(scriptContent, 'utf8').digest('base64')}'`;
}

export function extractInlineScripts(html) {
  const scripts = [];
  const regex = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(regex)) {
    const attrs = match[1] ?? '';
    const content = match[2];
    if (/\btype\s*=\s*["']application\/ld\+json["']/i.test(attrs)) {
      continue;
    }
    if (content && content.trim().length > 0) {
      scripts.push(content);
    }
  }
  return scripts;
}

export function extractJsonLdScripts(html) {
  const blocks = [];
  const regex =
    /<script(?![^>]*\bsrc=)[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(regex)) {
    blocks.push(match[1] ?? '');
  }
  return blocks;
}

export function verifyCsp({ html, headers }) {
  const errors = [];
  const inlineScripts = extractInlineScripts(html);
  const jsonLdBlocks = extractJsonLdScripts(html);

  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch {
      errors.push('Invalid JSON inside <script type="application/ld+json"> block.');
    }
  }

  const hashes = inlineScripts.map(hashScript);

  const cspLine = headers
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.toLowerCase().startsWith('content-security-policy:'));

  if (!cspLine) {
    errors.push('Missing Content-Security-Policy header in _headers.');
    return { ok: false, errors, hashes };
  }

  const cspValue = cspLine.slice(cspLine.indexOf(':') + 1).trim();
  const directives = cspValue
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean);

  const scriptSrc = directives.find((d) => d.startsWith('script-src '));
  if (!scriptSrc) {
    errors.push('Missing script-src directive in Content-Security-Policy.');
  } else {
    if (scriptSrc.includes("'unsafe-inline'")) {
      errors.push("script-src must not contain 'unsafe-inline'.");
    }
    for (const hash of hashes) {
      if (!scriptSrc.includes(hash)) {
        errors.push(`script-src is missing required inline script hash ${hash}.`);
      }
    }
  }

  for (const required of REQUIRED_DIRECTIVES) {
    if (!directives.includes(required)) {
      errors.push(`Content-Security-Policy is missing required directive: ${required}`);
    }
  }

  return { ok: errors.length === 0, errors, hashes };
}

function runCli() {
  const htmlPath = resolve(process.cwd(), 'dist', 'index.html');
  const headersPath = resolve(process.cwd(), 'public', '_headers');

  const html = readFileSync(htmlPath, 'utf8');
  const headers = readFileSync(headersPath, 'utf8');
  const result = verifyCsp({ html, headers });

  if (!result.ok) {
    console.error('CSP verification failed:');
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  const detail = result.hashes.length > 0 ? result.hashes.join(', ') : 'no inline scripts';
  console.log(`CSP verified (${detail}).`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  runCli();
}
