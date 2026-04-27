export const mandatoryMainSceneIds = [
  "scene.p1.survival-notice",
  "scene.a1.pressure-fault",
  "scene.a2.routine-questions",
  "scene.a3.shift-end-market",
  "scene.a4.ash-in-furnace",
  "scene.a5.missing-shift",
  "scene.b1.restricted-light",
  "scene.b2.clinic-recycler",
  "scene.b3.orchard-numbers",
  "scene.b4.black-stair",
  "scene.b5.first-descent",
  "scene.b6.refused-to-die",
  "scene.c1.nursery-ghosts",
  "scene.c2.good-man-badge",
  "scene.c3.boundary-technician",
  "scene.c4.price-of-fire",
  "scene.c5.brants-line",
  "scene.c6.audience-voss",
  "scene.d1.choosing-coalition",
  "scene.d2.open-speakers",
  "scene.d3.controlled-truth",
  "scene.d3.full-exposure",
  "scene.d3.preserve-order",
  "scene.d3.exit-protocol",
  "scene.d4.final-choice-terminal"
] as const;

export const mandatoryEndingIds = [
  "ending.controlled-truth",
  "ending.full-exposure",
  "ending.preserve-order",
  "ending.exit-protocol"
] as const;

export const mandatorySideQuestIds = [
  "side.cold-hands-clinic",
  "side.family-ledger",
  "side.juns-double-books",
  "side.broken-lesson",
  "side.pump-six",
  "side.missing-watchman",
  "side.dead-garden",
  "side.last-message"
] as const;

export const mandatoryCharacterIds = [
  "tomas",
  "brant",
  "mira",
  "nera",
  "voss",
  "tovin",
  "cael",
  "ilya",
  "jun",
  "alma"
] as const;

export const mandatoryLocationIds = [
  "location.level-62-manifold",
  "location.stability-interview",
  "location.mid-commons-market",
  "location.tomas-pod",
  "location.education-incinerator",
  "location.mechanical-depot",
  "location.restricted-records",
  "location.clinic-recycler",
  "location.orchard-processing",
  "location.black-stair-door",
  "location.upper-black-levels",
  "location.hidden-relay",
  "location.nursery-records",
  "location.transit-ambush",
  "location.boundary-ring",
  "location.descender-assembly",
  "location.pump-substation",
  "location.voss-chamber",
  "location.final-relay-core",
  "location.external-node"
] as const;

export const mandatoryItemIds = [
  "item.maintenance-multitool",
  "item.contraband-map-scrap",
  "item.paper-schematics",
  "item.override-key-a",
  "item.override-key-b",
  "item.archive-seal-fragment",
  "item.orchard-route-ledger",
  "item.relay-bypass-coil",
  "item.sedatives",
  "item.raw-sensor-spool",
  "item.broadcast-cipher",
  "item.exile-audio-file"
] as const;

export const mandatoryFlagNames = [
  "found_b17",
  "paper_schematics",
  "orchard_truth",
  "nursery_truth",
  "boundary_truth",
  "exile_truth",
  "raw_feed_obtained",
  "broadcast_key",
  "black_stair_open"
] as const;

export const mandatoryFactionIds = ["mechanical", "stability", "keepers", "descenders"] as const;
export const mandatoryResourceNames = ["stress", "supplies", "clearance", "evidenceCount", "publicStability"] as const;

export const milestoneThreeScope = {
  scenes: ["scene.p1.survival-notice", "scene.a1.pressure-fault"],
  evidence: ["evidence.found-b17"],
  routeFixtures: ["fixture.full-exposure"],
  note: "Milestone 5 expands the proving path into all mandatory MVP-depth content records."
};
