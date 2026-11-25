import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

export const MAX_INITIAL_JS_GZIP_BYTES = 90 * 1024;
export const MAX_WOFF2_TOTAL_BYTES = 75 * 1024;

export function extractInitialJsPaths(html) {
  const paths = new Set();

  const scriptRegex = /<script\b[^>]*\bsrc=["']([^"']+\.js)["'][^>]*>/gi;
  for (const match of html.matchAll(scriptRegex)) {
    if (match[1]) {
      paths.add(match[1]);
    }
  }

  const preloadRegex =
    /<link\b[^>]*\brel=["']modulepreload["'][^>]*\bhref=["']([^"']+\.js)["'][^>]*>/gi;
  for (const match of html.matchAll(preloadRegex)) {
    if (match[1]) {
      paths.add(match[1]);
    }
  }

  return [...paths];
}

function collectWoff2Files(dir, results = []) {
  if (!existsSync(dir)) {
    return results;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectWoff2Files(fullPath, results);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.woff2')) {
      results.push(fullPath);
    }
  }
  return results;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

export function verifyBudgets({
  distDir,
  maxInitialJsGzipBytes = MAX_INITIAL_JS_GZIP_BYTES,
  maxWoff2TotalBytes = MAX_WOFF2_TOTAL_BYTES,
}) {
  const errors = [];
  const indexPath = resolve(distDir, 'index.html');

  if (!existsSync(indexPath)) {
    return {
      ok: false,
      errors: [`Missing built index.html at ${indexPath}. Run npm run build first.`],
      initialJsGzipBytes: 0,
      initialJsFiles: [],
      woff2TotalBytes: 0,
      woff2Files: [],
    };
  }

  const html = readFileSync(indexPath, 'utf8');
  const initialJsFiles = extractInitialJsPaths(html);

  let initialJsGzipBytes = 0;
  if (initialJsFiles.length === 0) {
    errors.push(
      'Initial JS budget check failed: no entry <script src="*.js"> found in index.html.',
    );
  } else {
    for (const relPath of initialJsFiles) {
      const normalized = relPath.replace(/^\/+/, '');
      const fullPath = resolve(distDir, normalized);
      if (!existsSync(fullPath)) {
        errors.push(`Initial JS file referenced in index.html not found: ${relPath}`);
        continue;
      }
      const raw = readFileSync(fullPath);
      initialJsGzipBytes += gzipSync(raw, { level: 9 }).length;
    }

    if (initialJsGzipBytes >= maxInitialJsGzipBytes) {
      errors.push(
        `Initial JS gzipped payload (${formatKb(initialJsGzipBytes)}) must be < ${formatKb(maxInitialJsGzipBytes)}.`,
      );
    }
  }

  const woff2FullPaths = collectWoff2Files(distDir);
  const woff2Files = woff2FullPaths.map((full) => relative(distDir, full).replace(/\\/g, '/'));

  let woff2TotalBytes = 0;
  if (woff2FullPaths.length === 0) {
    errors.push('WOFF2 font budget check failed: no self-hosted .woff2 files found in dist/.');
  } else {
    for (const fullPath of woff2FullPaths) {
      woff2TotalBytes += statSync(fullPath).size;
    }

    if (woff2TotalBytes >= maxWoff2TotalBytes) {
      errors.push(
        `Self-hosted WOFF2 font payload (${formatKb(woff2TotalBytes)}) must be < ${formatKb(maxWoff2TotalBytes)}.`,
      );
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    initialJsGzipBytes,
    initialJsFiles,
    woff2TotalBytes,
    woff2Files,
  };
}

function runCli() {
  const distDir = resolve(process.cwd(), 'dist');
  const result = verifyBudgets({ distDir });

  if (!result.ok) {
    console.error('Budget verification failed:');
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `Budgets verified: initial JS ${formatKb(result.initialJsGzipBytes)} gzipped (< ${formatKb(MAX_INITIAL_JS_GZIP_BYTES)}), WOFF2 fonts ${formatKb(result.woff2TotalBytes)} (< ${formatKb(MAX_WOFF2_TOTAL_BYTES)}).`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  runCli();
}
