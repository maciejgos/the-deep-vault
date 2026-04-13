import { SAVE_VERSION, type GameState, type SceneId } from "./types";

export function createInitialState(startSceneId: SceneId): GameState {
  return {
    currentSceneId: startSceneId,
    visitedSceneIds: [startSceneId],
    selectedChoices: [],
    flags: {},
    factionTrust: {
      mechanical: 0,
      stability: 0,
      keepers: 0,
      descenders: 0
    },
    characterStates: {},
    evidenceIds: [],
    questStates: {},
    codexIds: [],
    itemIds: [],
    stress: 0,
    supplies: 0,
    clearance: 0,
    evidenceCount: 0,
    routeProgress: {},
    finalRoute: null,
    publicStability: 0,
    sideQuestOutcomes: {},
    save: {
      version: SAVE_VERSION,
      savedAt: null
    }
  };
}

