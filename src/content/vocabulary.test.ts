import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC_DIR = resolve(process.cwd(), 'src');
const THIS_FILE = resolve(SRC_DIR, 'content', 'vocabulary.test.ts');
const CHECKED_EXTENSIONS = new Set(['.ts', '.tsx', '.css']);
const FORBIDDEN_PATTERN = /\b(?:ai[- ]assisted|ai[- ]native|vibe[- ]coding)\b/gi;

function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
    } else if (CHECKED_EXTENSIONS.has(extname(fullPath)) && fullPath !== THIS_FILE) {
      files.push(fullPath);
    }
  }

  return files;
}

describe('canonical vocabulary guard', () => {
  it('contains zero occurrences of forbidden AI terminology across src/', () => {
    const sourceFiles = collectSourceFiles(SRC_DIR);
    expect(sourceFiles.length).toBeGreaterThan(0);

    const violations: string[] = [];

    for (const filePath of sourceFiles) {
      const content = readFileSync(filePath, 'utf8');
      const matches = content.match(FORBIDDEN_PATTERN);
      if (matches) {
        violations.push(`${relative(SRC_DIR, filePath)}: ${matches.join(', ')}`);
      }
    }

    expect(violations).toEqual([]);
  });
});
