import { describe, expect, it } from "vitest";
import {
  SAVE_SLOT_KEY,
  applyChoice,
  applyEffect,
  createInitialState,
  evaluateCondition,
  evaluateEnding,
  getAvailableChoices,
  getCurrentScene,
  loadGame,
  saveGame,
  validateContentGraph,
  type GameContent,
  type GameState,
  type StorageLike
} from ".";

const content: GameContent = {
  startSceneId: "scene.start",
  scenes: {
    "scene.start": {
      id: "scene.start",
      title: "Survival Notice",
      zone: "Level 62",
      narrative: ["The doctrine board repeats its warning."],
      choices: [
        {
          id: "choice.inspect",
          text: "Inspect the broken manifold",
          targetSceneId: "scene.archive",
          effects: [
            { type: "setFlag", flag: "manifoldInspected", value: true },
            { type: "addEvidence", evidenceId: "evidence.b17" },
            { type: "adjustFactionTrust", factionId: "mechanical", amount: 2 },
            { type: "adjustRouteTendency", routeId: "full-exposure", amount: 3 },
            { type: "updateQuest", questId: "quest.find-b17", status: "active" },
            { type: "addCodex", codexId: "codex.doctrine" },
            { type: "acquireItem", itemId: "item.sensor-spool" }
          ]
        },
        {
          id: "choice.locked",
          text: "Enter the archive",
          targetSceneId: "scene.archive",
          conditions: [{ type: "hasEvidence", evidenceId: "evidence.b17" }]
        }
      ]
    },
    "scene.archive": {
      id: "scene.archive",
      title: "B-17 Archive",
      zone: "Level 17",
      narrative: ["A forbidden level answers."],
      choices: []
    }
  },
  endings: {
    "ending.full-exposure": {
      id: "ending.full-exposure",
      routeId: "full-exposure",
      title: "Full Exposure",
      summary: "Vault-9 learns what it was built to bury.",
      conditions: [{ type: "hasEvidence", evidenceId: "evidence.b17" }]
    }
  },
  evidence: {
    "evidence.b17": {
      id: "evidence.b17",
      title: "B-17 Sensor Spool",
      summary: "The spool proves the sealed level is still drawing power."
    }
  },
  quests: {
    "quest.find-b17": {
      id: "quest.find-b17",
      title: "Find B-17",
      summary: "Trace the forbidden maintenance route."
    }
  },
  codex: {
    "codex.doctrine": {
      id: "codex.doctrine",
      title: "Civic Doctrine",
      summary: "Order is life. History is hazard."
    }
  },
  locations: {},
  factions: {
    mechanical: { id: "mechanical", name: "Mechanical" }
  },
  characters: {
    tomas: { id: "tomas", name: "Tomas Vale" }
  },
  items: {
    "item.sensor-spool": { id: "item.sensor-spool", name: "Sensor Spool" }
  },
  sideQuests: {},
  routeFixtures: {
    "fixture.full-exposure": {
      id: "fixture.full-exposure",
      routeId: "full-exposure",
      choiceIds: ["choice.inspect"]
    }
  }
};

describe("game foundation", () => {
  it("rejects invalid content and reports missing graph links", () => {
    expect(validateContentGraph(content).ok).toBe(true);

    const invalidContent: GameContent = {
      ...content,
      scenes: {
        ...content.scenes,
        "scene.start": {
          ...content.scenes["scene.start"],
          choices: [{ id: "choice.broken", text: "Break", targetSceneId: "scene.missing" }]
        }
      }
    };

    const result = validateContentGraph(invalidContent);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Choice choice.broken in scene scene.start targets missing scene: scene.missing");
  });

  it("evaluates conditions, applies effects, and transitions scenes deterministically", () => {
    const state = createInitialState(content.startSceneId);
    const scene = getCurrentScene(content, state);

    expect(getAvailableChoices(scene, state).map((choice) => choice.id)).toEqual(["choice.inspect"]);

    const nextState = applyChoice(content, state, "choice.inspect");

    expect(nextState).not.toBe(state);
    expect(nextState.currentSceneId).toBe("scene.archive");
    expect(nextState.visitedSceneIds).toEqual(["scene.start", "scene.archive"]);
    expect(nextState.selectedChoices).toEqual([{ sceneId: "scene.start", choiceId: "choice.inspect" }]);
    expect(nextState.flags.manifoldInspected).toBe(true);
    expect(nextState.evidenceIds).toEqual(["evidence.b17"]);
    expect(nextState.evidenceCount).toBe(1);
    expect(nextState.factionTrust.mechanical).toBe(2);
    expect(nextState.routeProgress["full-exposure"]).toBe(3);
    expect(nextState.questStates["quest.find-b17"]?.status).toBe("active");
    expect(nextState.codexIds).toEqual(["codex.doctrine"]);
    expect(nextState.itemIds).toEqual(["item.sensor-spool"]);
    expect(evaluateCondition({ type: "hasEvidence", evidenceId: "evidence.b17" }, nextState)).toBe(true);
  });

  it("keeps effect application immutable and bounded", () => {
    const state = createInitialState(content.startSceneId);
    const stressedState = applyEffect(state, { type: "adjustStress", amount: 200 });

    expect(stressedState).not.toBe(state);
    expect(stressedState.stress).toBe(100);
    expect(state.stress).toBe(0);
  });

  it("evaluates endings from final route or route progress", () => {
    const playedState = applyChoice(content, createInitialState(content.startSceneId), "choice.inspect");

    expect(evaluateEnding(content, playedState).ending?.id).toBe("ending.full-exposure");

    const committedState: GameState = {
      ...playedState,
      finalRoute: "full-exposure",
      routeProgress: {}
    };

    expect(evaluateEnding(content, committedState).routeId).toBe("full-exposure");
  });

  it("saves and loads validated state from one local slot", () => {
    const storage = createMemoryStorage();
    const state = applyChoice(content, createInitialState(content.startSceneId), "choice.inspect");
    const saveResult = saveGame(state, storage, "2026-04-13T14:00:00.000Z");

    expect(saveResult.ok).toBe(true);
    expect(storage.getItem(SAVE_SLOT_KEY)).toContain("scene.archive");

    const loadResult = loadGame(storage);

    expect(loadResult.ok).toBe(true);
    expect(loadResult.ok ? loadResult.state.currentSceneId : null).toBe("scene.archive");
    expect(loadResult.ok ? loadResult.state.save.savedAt : null).toBe("2026-04-13T14:00:00.000Z");
  });

  it("returns player-facing load failures for missing, malformed, and incompatible saves", () => {
    const storage = createMemoryStorage();

    expect(loadGame(storage)).toMatchObject({ ok: false, reason: "no-save" });

    storage.setItem(SAVE_SLOT_KEY, "{bad json");
    expect(loadGame(storage)).toMatchObject({ ok: false, reason: "malformed-save" });

    storage.setItem(SAVE_SLOT_KEY, JSON.stringify({ save: { version: "old" } }));
    expect(loadGame(storage)).toMatchObject({ ok: false, reason: "incompatible-version" });
  });
});

function createMemoryStorage(): StorageLike {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
}

