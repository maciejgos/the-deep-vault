import { describe, expect, it } from "vitest";
import { gameContent } from "../../src/content";
import { applyChoice, createInitialState, evaluateEnding, validateContentGraph } from "../../src/game";

describe("first playable content path", () => {
  it("validates the content graph", () => {
    expect(validateContentGraph(gameContent)).toEqual({
      ok: true,
      errors: [],
      warnings: []
    });
  });

  it("plays from Survival Notice through B-17 evidence to a route endpoint", () => {
    const fixture = gameContent.routeFixtures["fixture.full-exposure-preview"];
    let state = createInitialState(gameContent.startSceneId);

    for (const choiceId of fixture.choiceIds) {
      state = applyChoice(gameContent, state, choiceId);
    }

    expect(state.currentSceneId).toBe("scene.milestone.endpoint");
    expect(state.flags.found_b17).toBe(true);
    expect(state.evidenceIds).toContain("evidence.found-b17");
    expect(state.codexIds).toEqual(["codex.black-levels"]);
    expect(state.itemIds).toContain("item.b17-sensor-spool");
    expect(state.questStates["quest.trace-b17"]?.status).toBe("completed");
    expect(state.finalRoute).toBe("full-exposure");
    expect(evaluateEnding(gameContent, state).ending?.id).toBe("ending.full-exposure-preview");
  });
});

