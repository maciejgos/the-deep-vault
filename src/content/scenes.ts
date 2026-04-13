import type { Choice, Effect, Scene, SceneId } from "../game";

function choice(id: string, text: string, targetSceneId: SceneId, effects: Effect[] = []): Choice {
  return { id, text, targetSceneId, effects };
}

function sideChoice(id: string, text: string, sideQuestId: string, effects: Effect[]): Choice {
  return {
    id,
    text,
    effects: [
      { type: "setSideQuestOutcome", sideQuestId, value: "resolved" },
      ...effects
    ]
  };
}

function scene(
  id: SceneId,
  title: string,
  zone: string,
  locationId: string,
  narrative: string[],
  choices: Choice[],
  entryEffects: Effect[] = []
): Scene {
  return { id, title, zone, locationId, narrative, choices, entryEffects };
}

export const scenes: Record<string, Scene> = {
  "scene.p1.survival-notice": scene(
    "scene.p1.survival-notice",
    "P1. Survival Notice",
    "Public Doctrine",
    "location.level-62-manifold",
    [
      "The corridor board wakes before the shift bell: Order is life. History is hazard. The surface is death.",
      "Tomas Vale checks the route slate for Level 62-70. The coolant line is already running hot."
    ],
    [
      choice("choice.p1.begin-shift", "Begin the maintenance shift", "scene.a1.pressure-fault", [
        { type: "updateQuest", questId: "quest.trace-b17", status: "active" },
        { type: "acquireItem", itemId: "item.maintenance-multitool" }
      ])
    ],
    [{ type: "addCodex", codexId: "codex.survival-doctrine" }]
  ),
  "scene.a1.pressure-fault": scene(
    "scene.a1.pressure-fault",
    "A1. Pressure Fault",
    "Mechanical",
    "location.level-62-manifold",
    [
      "A coolant manifold punches steam across the service crawl.",
      "The diagnostic slate marks the pressure source as B-17, a level missing from every public map."
    ],
    [
      choice("choice.a1.inspect-manifold", "Pull the raw B-17 sensor spool", "scene.a2.routine-questions", [
        { type: "setFlag", flag: "found_b17", value: true },
        { type: "addEvidence", evidenceId: "evidence.found-b17" },
        { type: "addCodex", codexId: "codex.black-levels" },
        { type: "acquireItem", itemId: "item.raw-sensor-spool" },
        { type: "adjustFactionTrust", factionId: "mechanical", amount: 1 },
        { type: "adjustRouteTendency", routeId: "full-exposure", amount: 1 },
        { type: "adjustStress", amount: 8 }
      ])
    ]
  ),
  "scene.a2.routine-questions": scene(
    "scene.a2.routine-questions",
    "A2. Routine Questions",
    "Stability",
    "location.stability-interview",
    ["Tovin Reed asks why a routine runner copied a pressure log before reporting the breach."],
    [
      choice("choice.a2.partial-truth", "Give Tovin enough truth to create doubt", "scene.a3.shift-end-market", [
        { type: "setCharacterState", characterId: "tovin", value: "doubtful" },
        { type: "adjustFactionTrust", factionId: "stability", amount: 1 },
        { type: "setClearance", value: 1 }
      ])
    ]
  ),
  "scene.a3.shift-end-market": scene(
    "scene.a3.shift-end-market",
    "A3. Shift's End Market",
    "Mid Commons",
    "location.mid-commons-market",
    ["The market trades in ration cards, rumors, and people who remember Mira Senn asking the same questions."],
    [
      sideChoice("choice.side.jun-books", "Recruit Jun through the double books", "side.juns-double-books", [
        { type: "updateQuest", questId: "quest.side.juns-double-books", status: "completed" },
        { type: "acquireItem", itemId: "item.contraband-map-scrap" },
        { type: "adjustSupplies", amount: 2 }
      ]),
      choice("choice.a3.follow-mira", "Follow Mira's market trail", "scene.a4.ash-in-furnace")
    ]
  ),
  "scene.a4.ash-in-furnace": scene(
    "scene.a4.ash-in-furnace",
    "A4. Ash in the Furnace",
    "Education",
    "location.education-incinerator",
    ["Sister Ilya hides forbidden schematics in lesson ash and asks whether Tomas wants proof or safety."],
    [
      sideChoice("choice.side.broken-lesson", "Protect Ilya's broken lesson", "side.broken-lesson", [
        { type: "updateQuest", questId: "quest.side.broken-lesson", status: "completed" },
        { type: "adjustFactionTrust", factionId: "keepers", amount: 1 },
        { type: "setCharacterState", characterId: "ilya", value: "protected" }
      ]),
      choice("choice.a4.take-schematics", "Take the paper schematics", "scene.a5.missing-shift", [
        { type: "setFlag", flag: "paper_schematics", value: true },
        { type: "addEvidence", evidenceId: "evidence.paper-schematics" },
        { type: "acquireItem", itemId: "item.paper-schematics" },
        { type: "adjustFactionTrust", factionId: "keepers", amount: 1 }
      ])
    ]
  ),
  "scene.a5.missing-shift": scene(
    "scene.a5.missing-shift",
    "A5. Missing Shift",
    "Mechanical",
    "location.mechanical-depot",
    ["Mira's locker is empty. Brant Hollow recognizes the map scrap and warns that survival fails before revolution does."],
    [
      sideChoice("choice.side.pump-six", "Stabilize Pump Six for Brant", "side.pump-six", [
        { type: "updateQuest", questId: "quest.side.pump-six", status: "completed" },
        { type: "adjustFactionTrust", factionId: "mechanical", amount: 2 },
        { type: "setCharacterState", characterId: "brant", value: "supported" }
      ]),
      choice("choice.a5.open-locker", "Use Mira's locker mark", "scene.b1.restricted-light", [
        { type: "acquireItem", itemId: "item.override-key-a" }
      ])
    ]
  ),
  "scene.b1.restricted-light": scene(
    "scene.b1.restricted-light",
    "B1. A Clerk in Restricted Light",
    "Records",
    "location.restricted-records",
    ["Nera Quill slides a redacted archive page under glass: orchard numbers, false births, and a second key half."],
    [
      choice("choice.b1.accept-nera", "Accept Nera's archive seal", "scene.b2.clinic-recycler", [
        { type: "addCodex", codexId: "codex.keepers" },
        { type: "acquireItem", itemId: "item.archive-seal-fragment" },
        { type: "acquireItem", itemId: "item.override-key-b" },
        { type: "setCharacterState", characterId: "nera", value: "allied" },
        { type: "adjustFactionTrust", factionId: "keepers", amount: 2 },
        { type: "adjustRouteTendency", routeId: "controlled-truth", amount: 1 }
      ])
    ]
  ),
  "scene.b2.clinic-recycler": scene(
    "scene.b2.clinic-recycler",
    "B2. Clinic Recycler",
    "Clinic",
    "location.clinic-recycler",
    ["Cold vapor shakes from the recycler while patients wait for a quiet machine to decide who panics tonight."],
    [
      sideChoice("choice.side.cold-hands", "Repair the clinic recycler", "side.cold-hands-clinic", [
        { type: "updateQuest", questId: "quest.side.cold-hands-clinic", status: "completed" },
        { type: "acquireItem", itemId: "item.sedatives" },
        { type: "adjustStress", amount: -3 },
        { type: "adjustPublicStability", amount: 3 }
      ]),
      choice("choice.b2.continue-orchard", "Trace the recycler ration numbers", "scene.b3.orchard-numbers")
    ]
  ),
  "scene.b3.orchard-numbers": scene(
    "scene.b3.orchard-numbers",
    "B3. Orchard Numbers",
    "Food Systems",
    "location.orchard-processing",
    ["The orchard ledger feeds more mouths than Vault-9 admits exist."],
    [
      sideChoice("choice.side.dead-garden", "Recover the dead garden records", "side.dead-garden", [
        { type: "updateQuest", questId: "quest.side.dead-garden", status: "completed" },
        { type: "adjustSupplies", amount: 2 }
      ]),
      choice("choice.b3.take-ledger", "Take the orchard route ledger", "scene.b4.black-stair", [
        { type: "setFlag", flag: "orchard_truth", value: true },
        { type: "addEvidence", evidenceId: "evidence.orchard-truth" },
        { type: "acquireItem", itemId: "item.orchard-route-ledger" }
      ])
    ]
  ),
  "scene.b4.black-stair": scene(
    "scene.b4.black-stair",
    "B4. The Black Stair",
    "Access Gate",
    "location.black-stair-door",
    ["Two override halves answer the seal. The stair opens into air warmer than doctrine allows."],
    [
      choice("choice.b4.open-stair", "Open the Black Stair", "scene.b5.first-descent", [
        { type: "setFlag", flag: "black_stair_open", value: true },
        { type: "adjustStress", amount: 4 }
      ])
    ]
  ),
  "scene.b5.first-descent": scene(
    "scene.b5.first-descent",
    "B5. First Descent",
    "Black Levels",
    "location.upper-black-levels",
    ["Cael Dorn meets Tomas among occupied rooms that public doctrine erased."],
    [
      choice("choice.b5.meet-cael", "Hear Cael's demand for full exposure", "scene.b6.refused-to-die", [
        { type: "addCodex", codexId: "codex.descenders" },
        { type: "setCharacterState", characterId: "cael", value: "pressing" },
        { type: "adjustFactionTrust", factionId: "descenders", amount: 2 },
        { type: "adjustRouteTendency", routeId: "full-exposure", amount: 1 }
      ])
    ]
  ),
  "scene.b6.refused-to-die": scene(
    "scene.b6.refused-to-die",
    "B6. The Woman Who Refused to Die",
    "Hidden Relay",
    "location.hidden-relay",
    ["Mira Senn is alive, wounded, and furious that Tomas still thinks truth can wait."],
    [
      choice("choice.b6.stabilize-mira", "Keep Mira alive for the coalition", "scene.c1.nursery-ghosts", [
        { type: "setCharacterState", characterId: "mira", value: "alive" },
        { type: "adjustRouteTendency", routeId: "controlled-truth", amount: 1 }
      ])
    ]
  ),
  "scene.c1.nursery-ghosts": scene(
    "scene.c1.nursery-ghosts",
    "C1. Nursery Ghosts",
    "Nursery",
    "location.nursery-records",
    ["The ward records children transferred to places that do not exist on public maps."],
    [
      sideChoice("choice.side.family-ledger", "Secure the family ledger", "side.family-ledger", [
        { type: "updateQuest", questId: "quest.side.family-ledger", status: "completed" }
      ]),
      choice("choice.c1.copy-records", "Copy the nursery records", "scene.c2.good-man-badge", [
        { type: "setFlag", flag: "nursery_truth", value: true },
        { type: "addEvidence", evidenceId: "evidence.nursery-truth" }
      ])
    ]
  ),
  "scene.c2.good-man-badge": scene(
    "scene.c2.good-man-badge",
    "C2. A Good Man With a Badge",
    "Transit",
    "location.transit-ambush",
    ["Tovin corners Tomas with orders in one hand and doubt in the other."],
    [
      sideChoice("choice.side.missing-watchman", "Show Tovin the missing watchman file", "side.missing-watchman", [
        { type: "updateQuest", questId: "quest.side.missing-watchman", status: "completed" },
        { type: "setCharacterState", characterId: "tovin", value: "turned" },
        { type: "adjustFactionTrust", factionId: "stability", amount: 1 }
      ]),
      choice("choice.c2.spare-tovin", "Leave Tovin a path to help", "scene.c3.boundary-technician")
    ]
  ),
  "scene.c3.boundary-technician": scene(
    "scene.c3.boundary-technician",
    "C3. The Boundary Technician",
    "Boundary",
    "location.boundary-ring",
    ["Alma Vey shows Tomas the difference between a surface feed and the feed Vault-9 is allowed to see."],
    [
      sideChoice("choice.side.last-message", "Recover the exile's last message", "side.last-message", [
        { type: "updateQuest", questId: "quest.side.last-message", status: "completed" },
        { type: "setFlag", flag: "exile_truth", value: true },
        { type: "addEvidence", evidenceId: "evidence.exile-truth" },
        { type: "acquireItem", itemId: "item.exile-audio-file" }
      ]),
      choice("choice.c3.take-raw-feed", "Take Alma's raw boundary feed", "scene.c4.price-of-fire", [
        { type: "setFlag", flag: "boundary_truth", value: true },
        { type: "setFlag", flag: "raw_feed_obtained", value: true },
        { type: "addEvidence", evidenceId: "evidence.boundary-truth" },
        { type: "addCodex", codexId: "codex.boundary-ring" },
        { type: "setCharacterState", characterId: "alma", value: "allied" },
        { type: "adjustRouteTendency", routeId: "exit-protocol", amount: 2 }
      ])
    ]
  ),
  "scene.c4.price-of-fire": scene(
    "scene.c4.price-of-fire",
    "C4. The Price of Fire",
    "Descenders",
    "location.descender-assembly",
    ["Cael wants every speaker opened tonight. Nera warns that panic can kill faster than lies."],
    [
      choice("choice.c4.slow-the-fire", "Buy time without burying the proof", "scene.c5.brants-line", [
        { type: "adjustPublicStability", amount: 2 },
        { type: "adjustRouteTendency", routeId: "controlled-truth", amount: 1 }
      ]),
      choice("choice.c4.feed-the-fire", "Let the fire spread", "scene.c5.brants-line", [
        { type: "adjustPublicStability", amount: -6 },
        { type: "adjustRouteTendency", routeId: "full-exposure", amount: 2 }
      ])
    ]
  ),
  "scene.c5.brants-line": scene(
    "scene.c5.brants-line",
    "C5. Brant's Line",
    "Mechanical",
    "location.pump-substation",
    ["Brant draws a line around the pumps: no revolution matters if water pressure dies first."],
    [
      choice("choice.c5.hold-pumps", "Hold the pumps and keep Brant alive", "scene.c6.audience-voss", [
        { type: "setCharacterState", characterId: "brant", value: "alive" },
        { type: "acquireItem", itemId: "item.relay-bypass-coil" },
        { type: "adjustFactionTrust", factionId: "mechanical", amount: 2 }
      ])
    ]
  ),
  "scene.c6.audience-voss": scene(
    "scene.c6.audience-voss",
    "C6. Audience With Director Voss",
    "Stability",
    "location.voss-chamber",
    ["Director Voss does not deny the lie. He asks Tomas how many bodies truth is worth."],
    [
      choice("choice.c6.take-cipher", "Take the continuity cipher", "scene.d1.choosing-coalition", [
        { type: "setFlag", flag: "broadcast_key", value: true },
        { type: "addEvidence", evidenceId: "evidence.voss-continuity" },
        { type: "acquireItem", itemId: "item.broadcast-cipher" },
        { type: "setCharacterState", characterId: "voss", value: "bargaining" },
        { type: "addCodex", codexId: "codex.route-doctrine" },
        { type: "updateQuest", questId: "quest.coalition", status: "active" }
      ])
    ]
  ),
  "scene.d1.choosing-coalition": scene(
    "scene.d1.choosing-coalition",
    "D1. Choosing the Coalition",
    "Coalition",
    "location.hidden-relay",
    ["Every ally wants a different kind of mercy. Tomas has enough evidence to choose who hears the truth first."],
    [
      choice("choice.d1.controlled-truth", "Build a controlled truth coalition", "scene.d2.open-speakers", [
        { type: "setFinalRoute", routeId: "controlled-truth" },
        { type: "adjustRouteTendency", routeId: "controlled-truth", amount: 3 }
      ]),
      choice("choice.d1.full-exposure", "Give Cael the raw exposure route", "scene.d2.open-speakers", [
        { type: "setFinalRoute", routeId: "full-exposure" },
        { type: "adjustRouteTendency", routeId: "full-exposure", amount: 3 }
      ]),
      choice("choice.d1.preserve-order", "Accept Voss's order-preserving bargain", "scene.d2.open-speakers", [
        { type: "setFinalRoute", routeId: "preserve-order" },
        { type: "adjustRouteTendency", routeId: "preserve-order", amount: 3 }
      ]),
      choice("choice.d1.exit-protocol", "Prepare Alma's exit protocol", "scene.d2.open-speakers", [
        { type: "setFinalRoute", routeId: "exit-protocol" },
        { type: "adjustRouteTendency", routeId: "exit-protocol", amount: 3 }
      ])
    ]
  ),
  "scene.d2.open-speakers": scene(
    "scene.d2.open-speakers",
    "D2. The Night of Open Speakers",
    "Relay",
    "location.final-relay-core",
    ["The relay core accepts the cipher. Every route now has a mission and a cost."],
    [
      choice("choice.d2.prepare-relay", "Prepare the relay core", "scene.d3.crisis-variants", [
        { type: "updateQuest", questId: "quest.broadcast", status: "active" },
        { type: "adjustStress", amount: 10 }
      ])
    ]
  ),
  "scene.d3.crisis-variants": scene(
    "scene.d3.crisis-variants",
    "D3. Crisis Scene Variants",
    "Crisis",
    "location.final-relay-core",
    ["Crowds surge, pumps cough, and allies hold their assigned lines as the route consequences come due."],
    [
      choice("choice.d3.resolve-crisis", "Spend the last resources to keep the route viable", "scene.d4.final-choice-terminal", [
        { type: "adjustSupplies", amount: -1 },
        { type: "adjustPublicStability", amount: -3 }
      ])
    ]
  ),
  "scene.d4.final-choice-terminal": scene(
    "scene.d4.final-choice-terminal",
    "D4. Final Choice Terminal",
    "Final Relay",
    "location.final-relay-core",
    ["The terminal asks for the last irreversible confirmation. Tomas sees all four costs, even the one already chosen."],
    [
      choice("choice.d4.execute-controlled-truth", "Execute controlled truth", "scene.ending.summary", [
        { type: "setFinalRoute", routeId: "controlled-truth" },
        { type: "updateQuest", questId: "quest.broadcast", status: "completed" }
      ]),
      choice("choice.d4.execute-full-exposure", "Execute full exposure", "scene.ending.summary", [
        { type: "setFinalRoute", routeId: "full-exposure" },
        { type: "updateQuest", questId: "quest.broadcast", status: "completed" }
      ]),
      choice("choice.d4.execute-preserve-order", "Execute preserve order", "scene.ending.summary", [
        { type: "setFinalRoute", routeId: "preserve-order" },
        { type: "updateQuest", questId: "quest.broadcast", status: "completed" }
      ]),
      choice("choice.d4.execute-exit-protocol", "Execute exit protocol", "scene.ending.summary", [
        { type: "setFinalRoute", routeId: "exit-protocol" },
        { type: "updateQuest", questId: "quest.broadcast", status: "completed" }
      ])
    ]
  ),
  "scene.ending.summary": scene(
    "scene.ending.summary",
    "Ending Summary",
    "Outcome",
    "location.external-node",
    ["The chosen route resolves in the ending panel. Vault-9 will not return to the same doctrine."],
    []
  )
};
