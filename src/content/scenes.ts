import type { Scene } from "../game";

export const scenes: Record<string, Scene> = {
  "scene.p1.survival-notice": {
    id: "scene.p1.survival-notice",
    title: "P1. Survival Notice",
    zone: "Public Doctrine",
    locationId: "location.level-62",
    narrative: [
      "The corridor board wakes before the shift bell: Order is life. History is hazard. The surface is death.",
      "Tomas Vale checks the route slate for Level 62-70. The coolant line is already running hot."
    ],
    entryEffects: [{ type: "addCodex", codexId: "codex.survival-doctrine" }],
    choices: [
      {
        id: "choice.p1.begin-shift",
        text: "Begin the maintenance shift",
        targetSceneId: "scene.a1.pressure-fault",
        effects: [{ type: "updateQuest", questId: "quest.trace-b17", status: "active" }]
      }
    ]
  },
  "scene.a1.pressure-fault": {
    id: "scene.a1.pressure-fault",
    title: "A1. Pressure Fault",
    zone: "Mechanical",
    locationId: "location.level-62",
    narrative: [
      "A coolant manifold punches steam across the service crawl.",
      "The diagnostic slate marks the pressure source as B-17, a level missing from every public map."
    ],
    choices: [
      {
        id: "choice.a1.inspect-manifold",
        text: "Pull the raw B-17 sensor spool",
        targetSceneId: "scene.b17.signal",
        effects: [
          { type: "setFlag", flag: "found_b17", value: true },
          { type: "addEvidence", evidenceId: "evidence.found-b17" },
          { type: "addCodex", codexId: "codex.black-levels" },
          { type: "acquireItem", itemId: "item.b17-sensor-spool" },
          { type: "adjustFactionTrust", factionId: "mechanical", amount: 1 },
          { type: "adjustRouteTendency", routeId: "full-exposure", amount: 2 },
          { type: "adjustStress", amount: 8 }
        ]
      }
    ]
  },
  "scene.b17.signal": {
    id: "scene.b17.signal",
    title: "B-17 Signal",
    zone: "Black Levels",
    locationId: "location.level-17",
    narrative: [
      "The spool resolves into a live feed: oxygen, heat, and voices below the approved city.",
      "Someone on the line says Tomas by name."
    ],
    choices: [
      {
        id: "choice.b17.open-feed",
        text: "Preserve the raw feed for exposure",
        targetSceneId: "scene.milestone.endpoint",
        effects: [
          { type: "setFinalRoute", routeId: "full-exposure" },
          { type: "adjustPublicStability", amount: -5 },
          { type: "updateQuest", questId: "quest.trace-b17", status: "completed" }
        ]
      }
    ]
  },
  "scene.milestone.endpoint": {
    id: "scene.milestone.endpoint",
    title: "Milestone Endpoint",
    zone: "Validation",
    locationId: "location.level-17",
    narrative: [
      "The first playable path has enough state to prove scene flow, evidence, records, and route evaluation."
    ],
    choices: []
  }
};

