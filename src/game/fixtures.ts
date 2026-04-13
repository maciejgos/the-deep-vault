import { applyChoice } from "./engine";
import { createInitialState } from "./initialState";
import type { GameContent, GameState, RouteFixture } from "./types";

export interface FixtureRunResult {
  fixture: RouteFixture;
  state: GameState;
}

export function runRouteFixture(content: GameContent, fixtureId: string, initialState?: GameState): FixtureRunResult {
  const fixture = content.routeFixtures[fixtureId];

  if (!fixture) {
    throw new Error(`Route fixture does not exist: ${fixtureId}`);
  }

  const startingState = initialState ?? createInitialState(content.startSceneId);
  const state = fixture.choiceIds.reduce((nextState, choiceId) => applyChoice(content, nextState, choiceId), startingState);

  return { fixture, state };
}

export function runRouteChoices(content: GameContent, choiceIds: string[], initialState?: GameState): GameState {
  return choiceIds.reduce((nextState, choiceId) => applyChoice(content, nextState, choiceId), initialState ?? createInitialState(content.startSceneId));
}

