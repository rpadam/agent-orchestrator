import { spawnSync } from 'node:child_process';

export function runVerificationCommands(projectRoot, verificationCommands) {
  const results = [];

  for (const command of verificationCommands) {
    const result = spawnSync(command, {
      cwd: projectRoot,
      shell: true,
      encoding: 'utf8'
    });

    results.push({
      command,
      exitCode: result.status ?? 1,
      stdout: result.stdout || '',
      stderr: result.stderr || ''
    });
  }

  return results;
}

export function getChangedFiles(projectRoot) {
  const result = spawnSync('git status --short', {
    cwd: projectRoot,
    shell: true,
    encoding: 'utf8'
  });

  if ((result.status ?? 1) !== 0) {
    return [];
  }

  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[A-Z?! ]+/, '').trim());
}

export function reviewAllowedPaths(changedFiles, allowedPaths) {
  if (allowedPaths.length === 0) {
    return { ok: true, violations: [] };
  }

  const violations = changedFiles.filter((file) => {
    return !allowedPaths.some((allowed) => file === allowed || file.startsWith(`${allowed}/`));
  });

  return {
    ok: violations.length === 0,
    violations
  };
}
