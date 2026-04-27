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
  getAvailableChoices,
  getCurrentScene,
  loadGame,
  runRouteChoices,
  runRouteFixture,
  saveGame,
  applyChoice,
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

  it("hides resolved side choices so optional rewards cannot be farmed", () => {
    const stateAtMarket = runRouteChoices(gameContent, [
      "choice.p1.begin-shift",
      "choice.a1.inspect-manifold",
      "choice.a2.partial-truth"
    ]);

    const afterSideQuest = applyChoice(gameContent, stateAtMarket, "choice.side.jun-recruit");
    const choices = getAvailableChoices(getCurrentScene(gameContent, afterSideQuest), afterSideQuest);

    expect(afterSideQuest.currentSceneId).toBe("scene.a3.shift-end-market");
    expect(afterSideQuest.supplies).toBe(stateAtMarket.supplies + 2);
    expect(choices.map((choice) => choice.id)).not.toContain("choice.side.jun-recruit");
    expect(choices.map((choice) => choice.id)).toContain("choice.a3.follow-mira");
  });

  it("supports early Act I branching before the market hub", () => {
    const cautious = runRouteChoices(gameContent, ["choice.p1.begin-shift", "choice.a1.seal-leak", "choice.a2.deny-voice"]);
    const exposed = runRouteChoices(gameContent, ["choice.p1.begin-shift", "choice.a1.call-central", "choice.a2.name-b17"]);

    expect(cautious.currentSceneId).toBe("scene.a3.shift-end-market");
    expect(cautious.routeProgress["preserve-order"]).toBeGreaterThan(0);
    expect(cautious.characterStates.tovin).toBe("watching");

    expect(exposed.currentSceneId).toBe("scene.a3.shift-end-market");
    expect(exposed.flags.security_awareness).toBe(2);
    expect(exposed.routeProgress["full-exposure"]).toBeGreaterThan(0);
    expect(exposed.publicStability).toBeLessThan(cautious.publicStability);
  });

  it("lets Jun and Ilya side quests resolve through distinct moral choices", () => {
    const stateAtMarket = runRouteChoices(gameContent, [
      "choice.p1.begin-shift",
      "choice.a1.inspect-manifold",
      "choice.a2.partial-truth"
    ]);
    const junExposed = applyChoice(gameContent, stateAtMarket, "choice.side.jun-expose");

    expect(junExposed.sideQuestOutcomes["side.juns-double-books"]).toBe("exposed");
    expect(junExposed.characterStates.jun).toBe("exposed");
    expect(getAvailableChoices(getCurrentScene(gameContent, junExposed), junExposed).map((choice) => choice.id)).not.toContain(
      "choice.side.jun-recruit"
    );

    const stateAtLesson = applyChoice(gameContent, stateAtMarket, "choice.a3.follow-mira");
    const ilyaReported = applyChoice(gameContent, stateAtLesson, "choice.side.broken-lesson-report");

    expect(ilyaReported.sideQuestOutcomes["side.broken-lesson"]).toBe("reported");
    expect(ilyaReported.characterStates.ilya).toBe("reported");
    expect(ilyaReported.routeProgress["preserve-order"]).toBeGreaterThan(0);
  });

  it("does not reveal endings before the terminal summary and locks execution to the committed route", () => {
    const fixture = gameContent.routeFixtures["fixture.controlled-truth"];
    const committed = runRouteChoices(gameContent, [...fixture.choiceIds.slice(0, -3)]);

    expect(committed.currentSceneId).toBe("scene.d2.open-speakers");
    expect(committed.finalRoute).toBe("controlled-truth");
    expect(evaluateEnding(gameContent, committed).ending).toBeNull();

    const terminal = runRouteChoices(gameContent, [fixture.choiceIds.at(-3) ?? "", "choice.d3.resolve-crisis"], committed);
    const terminalChoices = getAvailableChoices(getCurrentScene(gameContent, terminal), terminal);

    expect(terminal.currentSceneId).toBe("scene.d4.final-choice-terminal");
    expect(terminalChoices.map((choice) => choice.id)).toEqual(["choice.d4.execute-controlled-truth"]);
  });

  it("uses route-specific crisis scenes after coalition commitment", () => {
    for (const fixture of Object.values(gameContent.routeFixtures)) {
      const committed = runRouteChoices(gameContent, fixture.choiceIds.slice(0, -3));
      const crisis = applyChoice(gameContent, committed, fixture.choiceIds.at(-3) ?? "");

      expect(crisis.currentSceneId).toBe(`scene.d3.${fixture.routeId}`);
      expect(getCurrentScene(gameContent, crisis).title).toContain(routeTitle(fixture.routeId));
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

function routeTitle(routeId: string) {
  switch (routeId) {
    case "controlled-truth":
      return "Controlled Truth";
    case "full-exposure":
      return "Full Exposure";
    case "preserve-order":
      return "Preserve Order";
    case "exit-protocol":
      return "Exit Protocol";
    default:
      throw new Error(`Unknown route ${routeId}`);
  }
}
