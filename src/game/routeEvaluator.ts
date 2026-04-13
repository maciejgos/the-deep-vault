import { evaluateConditions } from "./conditions";
import type { Ending, EndingResult, GameContent, GameState, RouteId } from "./types";

const ROUTES: RouteId[] = ["controlled-truth", "full-exposure", "preserve-order", "exit-protocol"];

export function evaluateEnding(content: GameContent, state: GameState): EndingResult {
  const routeScores = scoreRoutes(state);
  const routeId = state.finalRoute ?? chooseHighestScoringRoute(routeScores);
  const ending = routeId ? findEndingForRoute(content, state, routeId) : null;

  return {
    routeId,
    ending,
    routeScores
  };
}

function scoreRoutes(state: GameState): Partial<Record<RouteId, number>> {
  return ROUTES.reduce<Partial<Record<RouteId, number>>>((scores, routeId) => {
    scores[routeId] = state.routeProgress[routeId] ?? 0;
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
  return (
    Object.values(content.endings).find(
      (ending) => ending.routeId === routeId && evaluateConditions(ending.conditions, state)
    ) ?? null
  );
}

