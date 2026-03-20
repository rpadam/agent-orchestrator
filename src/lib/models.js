import { readJson, resolveProjectPath } from './fs.js';

export function loadModelPolicy(projectRoot, manifest) {
  if (!manifest.model_policy_file) {
    return {
      tiers: {
        cheap: { profile: 'cheap' },
        medium: { profile: 'medium' },
        high: { profile: 'high' }
      }
    };
  }

  return readJson(resolveProjectPath(projectRoot, manifest.model_policy_file));
}

export function chooseProfile(task, modelPolicy) {
  if (task.preferred_model) {
    return { explicitModel: task.preferred_model, profile: null };
  }

  const tier = task.preferred_tier || 'medium';
  const tierRule = modelPolicy.tiers?.[tier] || { profile: 'medium' };
  return { explicitModel: null, profile: tierRule.profile };
}
