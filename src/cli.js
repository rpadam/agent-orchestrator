#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { parseArgs } from './lib/args.js';
import {
  loadManifest,
  validateManifest,
  getRunnableTasks,
  getTaskById,
  checkRunCloseout
} from './lib/manifest.js';
import { loadAdapters, getAdapter, buildCommand } from './lib/adapters.js';
import { loadModelPolicy, chooseProfile } from './lib/models.js';
import { getChangedFiles, reviewAllowedPaths, runVerificationCommands } from './lib/review.js';

function requireOption(options, key) {
  if (!options[key]) {
    throw new Error(`Missing required option --${key}`);
  }

  return options[key];
}

function printJson(payload) {
  console.log(JSON.stringify(payload, null, 2));
}

function main() {
  const { command, options } = parseArgs(process.argv.slice(2));

  if (!command) {
    throw new Error('Missing command. Use validate, plan, run, review, or closeout.');
  }

  const projectRoot = path.resolve(requireOption(options, 'project'));
  const manifestPath = requireOption(options, 'manifest');
  const { manifest } = loadManifest(projectRoot, manifestPath);

  if (command === 'validate') {
    const errors = validateManifest(manifest);
    printJson({ ok: errors.length === 0, errors });
    process.exit(errors.length === 0 ? 0 : 1);
  }

  if (command === 'plan') {
    const runnable = getRunnableTasks(manifest).map((task) => ({
      id: task.id,
      title: task.title,
      prompt_file: task.prompt_file,
      preferred_tier: task.preferred_tier || 'medium',
      can_run_parallel: Boolean(task.can_run_parallel)
    }));

    const executionPolicy = manifest.execution_policy || {
      default_mode: 'sequential',
      parallel_requires_explicit_user_consent: true,
      keep_task_recommended_model_tier_in_parallel: true
    };

    printJson({ runnable, execution_policy: executionPolicy });
    return;
  }

  if (command === 'run') {
    const taskId = requireOption(options, 'task');
    const adapterFile = requireOption(options, 'adapter');
    const task = getTaskById(manifest, taskId);
    if (!task) {
      throw new Error(`Unknown task ${taskId}`);
    }

    const adapters = loadAdapters(path.resolve(adapterFile));
    const adapterName = options.provider || adapters[0]?.name;
    const adapter = getAdapter(adapters, adapterName);
    if (!adapter) {
      throw new Error(`Unknown adapter ${adapterName}`);
    }

    const modelPolicy = loadModelPolicy(projectRoot, manifest);
    const profileChoice = chooseProfile(task, modelPolicy);
    const commandParts = buildCommand(
      adapter,
      task,
      projectRoot,
      path.resolve(projectRoot, task.prompt_file),
      profileChoice
    );

    if (options['dry-run']) {
      printJson({
        task: task.id,
        adapter: adapter.name,
        command: commandParts
      });
      return;
    }

    const result = spawnSync(commandParts[0], commandParts.slice(1), {
      cwd: projectRoot,
      stdio: 'inherit'
    });

    process.exit(result.status ?? 1);
  }

  if (command === 'review') {
    const taskId = requireOption(options, 'task');
    const task = getTaskById(manifest, taskId);
    if (!task) {
      throw new Error(`Unknown task ${taskId}`);
    }

    const changedFiles = getChangedFiles(projectRoot);
    const allowed = reviewAllowedPaths(changedFiles, task.allowed_paths || []);
    const verification = runVerificationCommands(projectRoot, task.verification || []);
    const verificationFailed = verification.filter((item) => item.exitCode !== 0);

    const payload = {
      task: task.id,
      changed_files: changedFiles,
      allowed_paths_ok: allowed.ok,
      path_violations: allowed.violations,
      verification
    };

    printJson(payload);
    process.exit(allowed.ok && verificationFailed.length === 0 ? 0 : 1);
  }

  if (command === 'closeout') {
    const closeout = checkRunCloseout(manifest);
    printJson(closeout);
    process.exit(closeout.ok ? 0 : 1);
  }

  throw new Error(`Unknown command ${command}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
