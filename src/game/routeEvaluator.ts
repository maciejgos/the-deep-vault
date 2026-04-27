import { evaluateConditions } from "./conditions";
import type { Ending, EndingResult, GameContent, GameState, RouteId } from "./types";

const ROUTES: RouteId[] = ["controlled-truth", "full-exposure", "preserve-order", "exit-protocol"];

export function evaluateEnding(content: GameContent, state: GameState): EndingResult {
  const routeScores = scoreRoutes(state);
  const routeId = state.finalRoute ?? chooseHighestScoringRoute(routeScores);
  const currentScene = content.scenes[state.currentSceneId];
  const isTerminalScene = Boolean(currentScene && currentScene.choices.length === 0);
  const ending = state.finalRoute && isTerminalScene ? findEndingForRoute(content, state, state.finalRoute) : null;

  return {
    routeId,
    ending,
    routeScores
  };
}

function scoreRoutes(state: GameState): Partial<Record<RouteId, number>> {
  return ROUTES.reduce<Partial<Record<RouteId, number>>>((scores, routeId) => {
    scores[routeId] = (state.routeProgress[routeId] ?? 0) + scoreRouteSignals(state, routeId);
    return scores;
  }, {});
}

function chooseHighestScoringRoute(routeScores: Partial<Record<RouteId, number>>): RouteId | null {
  let bestRoute: RouteId | null = null;
  let bestScore = 0;

  for (const routeId of ROUTES) {
    const score = routeScores[routeId] ?? 0;
    if (score > bestScore) {
      bestRoute = routeId;
      bestScore = score;
    }
  }

  return bestRoute;
}

function findEndingForRoute(content: GameContent, state: GameState, routeId: RouteId): Ending | null {
  const routedState = { ...state, finalRoute: routeId };

  return (
    Object.values(content.endings).find(
      (ending) => ending.routeId === routeId && evaluateConditions(ending.conditions, routedState)
    ) ?? null
  );
}

function scoreRouteSignals(state: GameState, routeId: RouteId): number {
  switch (routeId) {
    case "controlled-truth":
      return (
        evidenceScore(state, ["evidence.paper-schematics", "evidence.nursery-truth", "evidence.voss-continuity"]) +
        trustScore(state, "keepers") +
        characterScore(state, "nera", "allied") +
        stabilityBonus(state)
      );
    case "full-exposure":
      return (
        evidenceScore(state, ["evidence.found-b17", "evidence.boundary-truth", "evidence.exile-truth"]) +
        trustScore(state, "descenders") +
        characterScore(state, "cael", "pressing") +
        pressureBonus(state)
      );
    case "preserve-order":
      return (
        evidenceScore(state, ["evidence.voss-continuity"]) +
        trustScore(state, "stability") +
        characterScore(state, "voss", "bargaining") +
        stabilityBonus(state)
      );
    case "exit-protocol":
      return (
        evidenceScore(state, ["evidence.boundary-truth", "evidence.exile-truth"]) +
        characterScore(state, "alma", "allied") +
        itemScore(state, ["item.raw-sensor-spool", "item.relay-bypass-coil", "item.broadcast-cipher"]) +
        resourceScore(state, "supplies")
      );
  }
}

function evidenceScore(state: GameState, evidenceIds: string[]): number {
  return evidenceIds.filter((evidenceId) => state.evidenceIds.includes(evidenceId)).length;
}

function itemScore(state: GameState, itemIds: string[]): number {
  return itemIds.filter((itemId) => state.itemIds.includes(itemId)).length;
}

function trustScore(state: GameState, factionId: string): number {
  return Math.max(0, Math.floor((state.factionTrust[factionId] ?? 0) / 2));
}

function characterScore(state: GameState, characterId: string, value: string): number {
  return state.characterStates[characterId] === value ? 1 : 0;
}

function stabilityBonus(state: GameState): number {
  return state.evidenceCount > 0 && state.publicStability >= 0 ? 1 : 0;
}

function pressureBonus(state: GameState): number {
  return state.publicStability < 0 || state.stress >= 10 ? 1 : 0;
}

function resourceScore(state: GameState, resource: "supplies"): number {
  return Math.max(0, Math.min(2, state[resource]));
}
