import { evaluateConditions } from "./conditions";
import { applyEffects, moveToScene } from "./effects";
import { getCurrentScene } from "./selectors";
import type { ChoiceId, GameContent, GameState } from "./types";

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

  nextState = applyEffects(nextState, choice.effects, scene.id);

  if (choice.targetSceneId) {
    if (!content.scenes[choice.targetSceneId]) {
      throw new Error(`Choice ${choiceId} targets missing scene: ${choice.targetSceneId}`);
    }

    nextState = moveToScene(nextState, choice.targetSceneId);
    nextState = applyEffects(nextState, content.scenes[choice.targetSceneId]?.entryEffects, choice.targetSceneId);
  }

  return nextState;
}

