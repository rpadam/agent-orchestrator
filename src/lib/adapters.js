import { readJson } from './fs.js';

export function loadAdapters(adapterFilePath) {
  const config = readJson(adapterFilePath);
  return config.adapters || [];
}

export function getAdapter(adapters, name) {
  return adapters.find((adapter) => adapter.name === name);
}

export function buildCommand(adapter, task, projectRoot, promptFile, profileChoice) {
  const profileName = profileChoice.profile || adapter.default_profile;
  const profile = adapter.profiles?.[profileName];

  if (!profile) {
    throw new Error(`Missing profile ${profileName} for adapter ${adapter.name}`);
  }

  const model = profileChoice.explicitModel || profile.model;
  const tokens = {
    '{project}': projectRoot,
    '{prompt_file}': promptFile,
    '{model}': model,
    '{task_id}': task.id
  };

  return profile.command.map((part) => {
    let next = part;
    for (const [token, value] of Object.entries(tokens)) {
      next = next.replaceAll(token, value);
    }
    return next;
  });
}
