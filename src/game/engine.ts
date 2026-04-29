import { evaluateConditions } from "./conditions";
import { applyEffect, moveToScene } from "./effects";
import { createInitialState } from "./initialState";
import { getCurrentScene } from "./selectors";
import type { ChoiceId, Effect, GameContent, GameState, SceneId } from "./types";

const MAX_SCENE_TRANSITIONS = 100;

export function startNewGame(content: GameContent): GameState {
  const initialState = createInitialState(content.startSceneId);
  const startScene = content.scenes[content.startSceneId];

  if (!startScene) {
    throw new Error(`Start scene does not exist: ${content.startSceneId}`);
  }

  return applyContentEffects(content, initialState, startScene.entryEffects, new Set([startScene.id]));
}

export function applyChoice(content: GameContent, state: GameState, choiceId: ChoiceId): GameState {
  const scene = getCurrentScene(content, state);
  const choice = scene.choices.find((candidate) => candidate.id === choiceId);

  if (!choice) {
    throw new Error(`Choice does not exist in scene ${scene.id}: ${choiceId}`);
  }

  if (!evaluateConditions(choice.conditions, state)) {
    throw new Error(`Choice is not available in scene ${scene.id}: ${choiceId}`);
  }

  let nextState = {
    ...state,
    selectedChoices: [...state.selectedChoices, { sceneId: scene.id, choiceId: choice.id }]
  };

  const transitionTrail = new Set<SceneId>([scene.id]);

  nextState = applyContentEffects(content, nextState, choice.effects, transitionTrail);

  if (choice.targetSceneId && nextState.currentSceneId !== choice.targetSceneId) {
    nextState = transitionToScene(content, nextState, choice.targetSceneId, transitionTrail);
  }

  return nextState;
}

function applyContentEffects(
  content: GameContent,
  state: GameState,
  effects: Effect[] | undefined,
  transitionTrail = new Set<SceneId>()
): GameState {
  return (
    effects?.reduce((nextState, effect) => {
      if (effect.type === "moveToScene") {
        return transitionToScene(content, nextState, effect.sceneId, transitionTrail);
      }

      return applyEffect(nextState, effect);
    }, state) ?? state
  );
}

function transitionToScene(
  content: GameContent,
  state: GameState,
  sceneId: SceneId,
  transitionTrail = new Set<SceneId>()
): GameState {
  const targetScene = content.scenes[sceneId];

  if (!targetScene) {
    throw new Error(`Transition targets missing scene: ${sceneId}`);
  }

  if (transitionTrail.has(sceneId)) {
    throw new Error(`Scene transition cycle detected: ${sceneId}`);
  }

  if (transitionTrail.size > MAX_SCENE_TRANSITIONS) {
    throw new Error(`Scene transition chain exceeded ${MAX_SCENE_TRANSITIONS} transitions`);
  }

  transitionTrail.add(sceneId);

  const movedState = moveToScene(state, sceneId);

  return applyContentEffects(content, movedState, targetScene.entryEffects, transitionTrail);
}
