import type { Condition, GameState } from "./types";

export function evaluateCondition(condition: Condition, state: GameState): boolean {
  switch (condition.type) {
    case "hasEvidence":
      return state.evidenceIds.includes(condition.evidenceId);
    case "flagEquals":
      return state.flags[condition.flag] === condition.value;
    case "factionTrustAtLeast":
      return (state.factionTrust[condition.factionId] ?? 0) >= condition.value;
    case "characterStateEquals":
      return state.characterStates[condition.characterId] === condition.value;
    case "resourceAtLeast":
      return getResourceValue(state, condition.resource) >= condition.value;
    case "resourceAtMost":
      return getResourceValue(state, condition.resource) <= condition.value;
    case "routeSelected":
      return state.finalRoute === condition.routeId;
    case "sideQuestOutcome":
      return state.sideQuestOutcomes[condition.sideQuestId] === condition.value;
    case "sceneVisited":
      return state.visitedSceneIds.includes(condition.sceneId);
    case "itemAcquired":
      return state.itemIds.includes(condition.itemId);
    case "allOf":
      return condition.conditions.every((child) => evaluateCondition(child, state));
    case "anyOf":
      return condition.conditions.some((child) => evaluateCondition(child, state));
    case "not":
      return !evaluateCondition(condition.condition, state);
  }
}

export function evaluateConditions(conditions: Condition[] | undefined, state: GameState): boolean {
  return !conditions || conditions.every((condition) => evaluateCondition(condition, state));
}

function getResourceValue(state: GameState, resource: "stress" | "supplies" | "clearance" | "evidenceCount" | "publicStability") {
  return state[resource];
}

