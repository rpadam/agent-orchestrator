import { readFileSync } from 'node:fs';
import path from 'node:path';

export function resolveProjectPath(projectRoot, maybeRelativePath) {
  if (path.isAbsolute(maybeRelativePath)) {
    return maybeRelativePath;
  }

  return path.resolve(projectRoot, maybeRelativePath);
}

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

export function readText(filePath) {
  return readFileSync(filePath, 'utf8');
}
