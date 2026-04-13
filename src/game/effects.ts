import type { Effect, GameState, SceneId } from "./types";

const MIN_RESOURCE = 0;
const MAX_RESOURCE = 100;

export function applyEffect(state: GameState, effect: Effect, currentSceneId = state.currentSceneId): GameState {
  switch (effect.type) {
    case "setFlag":
      return { ...state, flags: { ...state.flags, [effect.flag]: effect.value } };
    case "addEvidence":
      return state.evidenceIds.includes(effect.evidenceId)
        ? state
        : {
            ...state,
            evidenceIds: [...state.evidenceIds, effect.evidenceId],
            evidenceCount: state.evidenceCount + 1
          };
    case "updateQuest":
      return {
        ...state,
        questStates: {
          ...state.questStates,
          [effect.questId]: {
            status: effect.status,
            updatedAtSceneId: currentSceneId
          }
        }
      };
    case "addCodex":
      return state.codexIds.includes(effect.codexId) ? state : { ...state, codexIds: [...state.codexIds, effect.codexId] };
    case "adjustFactionTrust":
      return {
        ...state,
        factionTrust: {
          ...state.factionTrust,
          [effect.factionId]: clamp((state.factionTrust[effect.factionId] ?? 0) + effect.amount, -100, 100)
        }
      };
    case "setCharacterState":
      return {
        ...state,
        characterStates: { ...state.characterStates, [effect.characterId]: effect.value }
      };
    case "adjustStress":
      return { ...state, stress: clamp(state.stress + effect.amount, MIN_RESOURCE, MAX_RESOURCE) };
    case "adjustSupplies":
      return { ...state, supplies: clamp(state.supplies + effect.amount, MIN_RESOURCE, MAX_RESOURCE) };
    case "setClearance":
      return { ...state, clearance: clamp(effect.value, MIN_RESOURCE, MAX_RESOURCE) };
    case "adjustPublicStability":
      return { ...state, publicStability: clamp(state.publicStability + effect.amount, -100, 100) };
    case "setSideQuestOutcome":
      return {
        ...state,
        sideQuestOutcomes: { ...state.sideQuestOutcomes, [effect.sideQuestId]: effect.value }
      };
    case "adjustRouteTendency":
      return {
        ...state,
        routeProgress: {
          ...state.routeProgress,
          [effect.routeId]: (state.routeProgress[effect.routeId] ?? 0) + effect.amount
        }
      };
    case "setFinalRoute":
      return { ...state, finalRoute: effect.routeId };
    case "acquireItem":
      return state.itemIds.includes(effect.itemId) ? state : { ...state, itemIds: [...state.itemIds, effect.itemId] };
    case "moveToScene":
      return moveToScene(state, effect.sceneId);
  }
}

export function applyEffects(state: GameState, effects: Effect[] | undefined, currentSceneId = state.currentSceneId): GameState {
  return effects?.reduce((nextState, effect) => applyEffect(nextState, effect, currentSceneId), state) ?? state;
}

export function moveToScene(state: GameState, sceneId: SceneId): GameState {
  return {
    ...state,
    currentSceneId: sceneId,
    visitedSceneIds: state.visitedSceneIds.includes(sceneId) ? state.visitedSceneIds : [...state.visitedSceneIds, sceneId]
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

