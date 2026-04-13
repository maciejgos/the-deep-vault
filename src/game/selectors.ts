import { evaluateConditions } from "./conditions";
import type { Choice, GameContent, GameState, Scene } from "./types";

export function getCurrentScene(content: GameContent, state: GameState): Scene {
  const scene = content.scenes[state.currentSceneId];

  if (!scene) {
    throw new Error(`Current scene does not exist: ${state.currentSceneId}`);
  }

  return scene;
}

export function getAvailableChoices(scene: Scene, state: GameState): Choice[] {
  return scene.choices.filter((choice) => evaluateConditions(choice.conditions, state));
}

