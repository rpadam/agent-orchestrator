import path from 'node:path';
import { readJson, resolveProjectPath } from './fs.js';

export function loadManifest(projectRoot, manifestPath) {
  const absoluteManifestPath = resolveProjectPath(projectRoot, manifestPath);
  const manifest = readJson(absoluteManifestPath);

  for (const task of manifest.tasks) {
    task.depends_on = task.depends_on || [];
    task.allowed_paths = task.allowed_paths || [];
    task.verification = task.verification || [];
    task.prompt_file_abs = resolveProjectPath(projectRoot, task.prompt_file);
  }

  return {
    projectRoot: path.resolve(projectRoot),
    manifestPath: absoluteManifestPath,
    manifest
  };
}

export function validateManifest(manifest) {
  const errors = [];
  const taskIds = new Set();

  for (const task of manifest.tasks) {
    if (taskIds.has(task.id)) {
      errors.push(`Duplicate task id: ${task.id}`);
    }
    taskIds.add(task.id);
  }

  for (const task of manifest.tasks) {
    for (const dep of task.depends_on || []) {
      if (!taskIds.has(dep)) {
        errors.push(`Task ${task.id} depends on missing task ${dep}`);
      }
    }
  }

  return errors;
}

export function getTaskById(manifest, taskId) {
  return manifest.tasks.find((task) => task.id === taskId);
}

export function getRunnableTasks(manifest) {
  const completed = new Set(
    manifest.tasks.filter((task) => task.status === 'completed').map((task) => task.id)
  );

  return manifest.tasks.filter((task) => {
    if (task.status !== 'pending') {
      return false;
    }

    return (task.depends_on || []).every((dep) => completed.has(dep));
  });
}
