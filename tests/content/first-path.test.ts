import { describe, expect, it } from "vitest";
import {
  gameContent,
  mandatoryCharacterIds,
  mandatoryEndingIds,
  mandatoryFactionIds,
  mandatoryFlagNames,
  mandatoryItemIds,
  mandatoryLocationIds,
  mandatoryMainSceneIds,
  mandatoryResourceNames,
  mandatorySideQuestIds
} from "../../src/content";
import {
  createInitialState,
  evaluateEnding,
  loadGame,
  runRouteChoices,
  runRouteFixture,
  saveGame,
  validateContentGraph,
  type Effect,
  type StorageLike
} from "../../src/game";

describe("MVP content coverage", () => {
  it("validates the content graph", () => {
    expect(validateContentGraph(gameContent)).toEqual({
      ok: true,
      errors: [],
      warnings: []
    });
  });

  it("contains every mandatory content record from the accepted MVP scope map", () => {
    expect(Object.keys(gameContent.scenes)).toEqual(expect.arrayContaining([...mandatoryMainSceneIds]));
    expect(Object.keys(gameContent.endings)).toEqual(expect.arrayContaining([...mandatoryEndingIds]));
    expect(Object.keys(gameContent.sideQuests)).toEqual(expect.arrayContaining([...mandatorySideQuestIds]));
    expect(Object.keys(gameContent.characters)).toEqual(expect.arrayContaining([...mandatoryCharacterIds]));
    expect(Object.keys(gameContent.locations)).toEqual(expect.arrayContaining([...mandatoryLocationIds]));
    expect(Object.keys(gameContent.items)).toEqual(expect.arrayContaining([...mandatoryItemIds]));
    expect(Object.keys(gameContent.factions)).toEqual(expect.arrayContaining([...mandatoryFactionIds]));
  });

  it("makes mandatory flags, resources, side quests, trust systems, and character states matter through effects", () => {
    const effects = collectEffects();
    const setFlags = new Set(effects.filter((effect) => effect.type === "setFlag").map((effect) => effect.flag));
    const sideQuestOutcomes = new Set(
      effects.filter((effect) => effect.type === "setSideQuestOutcome").map((effect) => effect.sideQuestId)
    );
    const trustSystems = new Set(
      effects.filter((effect) => effect.type === "adjustFactionTrust").map((effect) => effect.factionId)
    );
    const characterStates = new Set(
      effects.filter((effect) => effect.type === "setCharacterState").map((effect) => effect.characterId)
    );
    const resources = new Set(
      effects.flatMap((effect) => {
        switch (effect.type) {
          case "adjustStress":
            return ["stress"];
          case "adjustSupplies":
            return ["supplies"];
          case "setClearance":
            return ["clearance"];
          case "adjustPublicStability":
            return ["publicStability"];
          case "addEvidence":
            return ["evidenceCount"];
          default:
            return [];
        }
      })
    );

    expect([...setFlags]).toEqual(expect.arrayContaining([...mandatoryFlagNames]));
    expect([...sideQuestOutcomes]).toEqual(expect.arrayContaining([...mandatorySideQuestIds]));
    expect([...trustSystems]).toEqual(expect.arrayContaining([...mandatoryFactionIds]));
    expect([...characterStates]).toEqual(expect.arrayContaining(["mira", "tovin", "brant", "nera", "alma", "voss"]));
    expect([...resources]).toEqual(expect.arrayContaining([...mandatoryResourceNames]));
  });

  it("plays each route fixture to its matching ending", () => {
    for (const fixture of Object.values(gameContent.routeFixtures)) {
      const { state } = runRouteFixture(gameContent, fixture.id);

      expect(state.currentSceneId).toBe("scene.ending.summary");
      expect(evaluateEnding(gameContent, state).ending?.routeId).toBe(fixture.routeId);
    }
  });

  it("preserves route progress and major state when saved at mid-route and resumed", () => {
    for (const fixture of Object.values(gameContent.routeFixtures)) {
      const midpoint = Math.floor(fixture.choiceIds.length / 2);
      const beforeSave = runRouteChoices(gameContent, fixture.choiceIds.slice(0, midpoint));
      const storage = createMemoryStorage();

      const saveResult = saveGame(beforeSave, storage, "2026-04-13T15:00:00.000Z");
      expect(saveResult.ok).toBe(true);

      const loadResult = loadGame(storage);
      expect(loadResult.ok).toBe(true);

      const resumed = loadResult.ok
        ? runRouteChoices(gameContent, fixture.choiceIds.slice(midpoint), loadResult.state)
        : createInitialState(gameContent.startSceneId);

      expect(resumed.currentSceneId).toBe("scene.ending.summary");
      expect(resumed.selectedChoices).toHaveLength(fixture.choiceIds.length);
      expect(resumed.evidenceIds).toEqual(expect.arrayContaining(["evidence.found-b17", "evidence.paper-schematics"]));
      expect(resumed.questStates["quest.broadcast"]?.status).toBe("completed");
      expect(evaluateEnding(gameContent, resumed).ending?.routeId).toBe(fixture.routeId);
    }
  });
});

function collectEffects(): Effect[] {
  return Object.values(gameContent.scenes).flatMap((scene) => [
    ...(scene.entryEffects ?? []),
    ...scene.choices.flatMap((choice) => choice.effects ?? [])
  ]);
}

function createMemoryStorage(): StorageLike {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
}
