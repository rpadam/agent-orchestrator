import path from 'node:path';
import { readJson, resolveProjectPath } from './fs.js';

const PLAN_CREATION_REQUIRED_FIELDS = [
  'planner_agent_role',
  'planner_agent_label',
  'planner_provider',
  'planner_model_requested',
  'planner_model_actual',
  'planner_input_tokens_actual',
  'planner_output_tokens_actual',
  'planner_total_tokens_actual',
  'planner_cost_actual_usd',
  'plan_created_at',
  'planning_usage_notes'
];

export function loadManifest(projectRoot, manifestPath) {
  const absoluteManifestPath = resolveProjectPath(projectRoot, manifestPath);
  const manifest = readJson(absoluteManifestPath);

  for (const task of manifest.tasks || []) {
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

function isNil(value) {
  return value === null || value === undefined;
}

function validateRangeObject(errors, task, range) {
  const inMin = range.input_tokens_estimate_min;
  const inMax = range.input_tokens_estimate_max;
  const outMin = range.output_tokens_estimate_min;
  const outMax = range.output_tokens_estimate_max;

  if (!Number.isInteger(inMin) || inMin < 0) {
    errors.push(`Task ${task.id} has invalid input_tokens_estimate_min`);
  }
  if (!Number.isInteger(inMax) || inMax < 0) {
    errors.push(`Task ${task.id} has invalid input_tokens_estimate_max`);
  }
  if (!Number.isInteger(outMin) || outMin < 0) {
    errors.push(`Task ${task.id} has invalid output_tokens_estimate_min`);
  }
  if (!Number.isInteger(outMax) || outMax < 0) {
    errors.push(`Task ${task.id} has invalid output_tokens_estimate_max`);
  }

  if (Number.isInteger(inMin) && Number.isInteger(inMax) && inMin > inMax) {
    errors.push(`Task ${task.id} has input token estimate min greater than max`);
  }

  if (Number.isInteger(outMin) && Number.isInteger(outMax) && outMin > outMax) {
    errors.push(`Task ${task.id} has output token estimate min greater than max`);
  }
}

function validateCompletionUsage(errors, task, usage) {
  const input = usage.input_tokens_actual;
  const output = usage.output_tokens_actual;
  const total = usage.total_tokens_actual;

  if (!isNil(input) && (!Number.isInteger(input) || input < 0)) {
    errors.push(`Task ${task.id} has invalid input_tokens_actual`);
  }
  if (!isNil(output) && (!Number.isInteger(output) || output < 0)) {
    errors.push(`Task ${task.id} has invalid output_tokens_actual`);
  }
  if (!isNil(total) && (!Number.isInteger(total) || total < 0)) {
    errors.push(`Task ${task.id} has invalid total_tokens_actual`);
  }

  if (!isNil(input) && !isNil(output) && !isNil(total) && input + output !== total) {
    errors.push(`Task ${task.id} has total_tokens_actual that does not equal input + output`);
  }
}

function validateExecutionPolicy(errors, manifest) {
  const policy = manifest.execution_policy;
  if (!policy) {
    return;
  }

  if (policy.default_mode && !['sequential', 'parallel'].includes(policy.default_mode)) {
    errors.push('execution_policy.default_mode must be sequential or parallel');
  }

  for (const key of [
    'parallel_requires_explicit_user_consent',
    'keep_task_recommended_model_tier_in_parallel'
  ]) {
    if (key in policy && typeof policy[key] !== 'boolean') {
      errors.push(`execution_policy.${key} must be a boolean`);
    }
  }
}

export function validateManifest(manifest) {
  const errors = [];
  const tasks = manifest.tasks || [];
  const taskIds = new Set();

  for (const task of tasks) {
    if (taskIds.has(task.id)) {
      errors.push(`Duplicate task id: ${task.id}`);
    }
    taskIds.add(task.id);
  }

  for (const task of tasks) {
    for (const dep of task.depends_on || []) {
      if (!taskIds.has(dep)) {
        errors.push(`Task ${task.id} depends on missing task ${dep}`);
      }
    }

    if (task.token_estimate) {
      validateRangeObject(errors, task, task.token_estimate);
    }

    if (task.completion_usage) {
      validateCompletionUsage(errors, task, task.completion_usage);
    }
  }

  validateExecutionPolicy(errors, manifest);

  return errors;
}

export function checkRunCloseout(manifest) {
  const issues = [];
  const plan = manifest.plan_creation;

  if (!plan) {
    issues.push('Missing manifest.plan_creation block');
    return { ok: false, issues };
  }

  for (const field of PLAN_CREATION_REQUIRED_FIELDS) {
    if (!(field in plan)) {
      issues.push(`Missing plan_creation.${field}`);
    }
  }

  const numericOrNullFields = [
    'planner_input_tokens_actual',
    'planner_output_tokens_actual',
    'planner_total_tokens_actual',
    'planner_cost_actual_usd'
  ];

  for (const field of numericOrNullFields) {
    const value = plan[field];
    if (!isNil(value) && (typeof value !== 'number' || value < 0)) {
      issues.push(`plan_creation.${field} must be null or a non-negative number`);
    }
  }

  const input = plan.planner_input_tokens_actual;
  const output = plan.planner_output_tokens_actual;
  const total = plan.planner_total_tokens_actual;

  if (!isNil(input) && !isNil(output) && !isNil(total) && input + output !== total) {
    issues.push('plan_creation.planner_total_tokens_actual must equal input + output when all are provided');
  }

  return { ok: issues.length === 0, issues };
}

export function getTaskById(manifest, taskId) {
  return (manifest.tasks || []).find((task) => task.id === taskId);
}

export function getRunnableTasks(manifest) {
  const tasks = manifest.tasks || [];
  const completed = new Set(tasks.filter((task) => task.status === 'completed').map((task) => task.id));

  return tasks.filter((task) => {
    if (task.status !== 'pending') {
      return false;
    }

    return (task.depends_on || []).every((dep) => completed.has(dep));
  });
}
