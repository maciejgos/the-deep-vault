import { GameContentSchema } from "./schemas";
import type { Condition, Effect, GameContent, Scene, ValidationResult } from "./types";

export function validateContentGraph(content: GameContent): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const parsed = GameContentSchema.safeParse(content);

  if (!parsed.success) {
    errors.push(...parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`));
    return { ok: false, errors, warnings };
  }

  if (!content.scenes[content.startSceneId]) {
    errors.push(`Start scene does not exist: ${content.startSceneId}`);
  }

  for (const scene of Object.values(content.scenes)) {
    validateScene(content, scene, errors);
  }

  for (const ending of Object.values(content.endings)) {
    validateConditions(content, ending.conditions, `ending ${ending.id}`, errors);
  }

  for (const routeFixture of Object.values(content.routeFixtures)) {
    if (!content.endings || !Object.values(content.endings).some((ending) => ending.routeId === routeFixture.routeId)) {
      errors.push(`Route fixture ${routeFixture.id} has no ending for route ${routeFixture.routeId}`);
    }
  }

  if (Object.keys(content.endings).length === 0) {
    warnings.push("Content has no endings yet.");
  }

  return { ok: errors.length === 0, errors, warnings };
}

function validateScene(content: GameContent, scene: Scene, errors: string[]) {
  if (scene.id !== content.scenes[scene.id]?.id) {
    errors.push(`Scene key does not match scene id: ${scene.id}`);
  }

  for (const effect of scene.entryEffects ?? []) {
    validateEffect(content, effect, `scene ${scene.id} entry effect`, errors);
  }

  for (const choice of scene.choices) {
    if (choice.targetSceneId && !content.scenes[choice.targetSceneId]) {
      errors.push(`Choice ${choice.id} in scene ${scene.id} targets missing scene: ${choice.targetSceneId}`);
    }

    validateConditions(content, choice.conditions, `choice ${choice.id} in scene ${scene.id}`, errors);

    for (const effect of choice.effects ?? []) {
      validateEffect(content, effect, `choice ${choice.id} in scene ${scene.id}`, errors);
    }
  }
}

function validateConditions(content: GameContent, conditions: Condition[] | undefined, context: string, errors: string[]) {
  for (const condition of conditions ?? []) {
    validateCondition(content, condition, context, errors);
  }
}

function validateCondition(content: GameContent, condition: Condition, context: string, errors: string[]) {
  switch (condition.type) {
    case "hasEvidence":
      requireKey(content.evidence, condition.evidenceId, `${context} references missing evidence`, errors);
      break;
    case "sceneVisited":
      requireKey(content.scenes, condition.sceneId, `${context} references missing scene`, errors);
      break;
    case "itemAcquired":
      requireKey(content.items, condition.itemId, `${context} references missing item`, errors);
      break;
    case "sideQuestOutcome":
      requireKey(content.sideQuests, condition.sideQuestId, `${context} references missing side quest`, errors);
      break;
    case "factionTrustAtLeast":
      requireKey(content.factions, condition.factionId, `${context} references missing faction`, errors);
      break;
    case "characterStateEquals":
      requireKey(content.characters, condition.characterId, `${context} references missing character`, errors);
      break;
    case "allOf":
    case "anyOf":
      condition.conditions.forEach((child) => validateCondition(content, child, context, errors));
      break;
    case "not":
      validateCondition(content, condition.condition, context, errors);
      break;
    case "flagEquals":
    case "resourceAtLeast":
    case "resourceAtMost":
    case "routeSelected":
      break;
  }
}

function validateEffect(content: GameContent, effect: Effect, context: string, errors: string[]) {
  switch (effect.type) {
    case "addEvidence":
      requireKey(content.evidence, effect.evidenceId, `${context} references missing evidence`, errors);
      break;
    case "updateQuest":
      requireKey(content.quests, effect.questId, `${context} references missing quest`, errors);
      break;
    case "addCodex":
      requireKey(content.codex, effect.codexId, `${context} references missing codex`, errors);
      break;
    case "adjustFactionTrust":
      requireKey(content.factions, effect.factionId, `${context} references missing faction`, errors);
      break;
    case "setCharacterState":
      requireKey(content.characters, effect.characterId, `${context} references missing character`, errors);
      break;
    case "setSideQuestOutcome":
      requireKey(content.sideQuests, effect.sideQuestId, `${context} references missing side quest`, errors);
      break;
    case "acquireItem":
      requireKey(content.items, effect.itemId, `${context} references missing item`, errors);
      break;
    case "moveToScene":
      requireKey(content.scenes, effect.sceneId, `${context} references missing scene`, errors);
      break;
    case "setFlag":
    case "adjustStress":
    case "adjustSupplies":
    case "setClearance":
    case "adjustPublicStability":
    case "adjustRouteTendency":
    case "setFinalRoute":
      break;
  }
}

function requireKey(record: Record<string, unknown>, key: string, message: string, errors: string[]) {
  if (!record[key]) {
    errors.push(`${message}: ${key}`);
  }
}

