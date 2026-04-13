import type { CodexEntry, EvidenceEntry, QuestEntry } from "../game";

function evidenceEntry(id: string, title: string, summary: string, sourceSceneId: string): EvidenceEntry {
  return { id, title, summary, sourceSceneId };
}

function record(id: string, title: string, summary: string): QuestEntry {
  return { id, title, summary };
}

export const evidence: Record<string, EvidenceEntry> = {
  "evidence.found-b17": evidenceEntry("evidence.found-b17", "B-17 Power Draw", "The failed manifold reports live power from a level erased by public doctrine.", "scene.a1.pressure-fault"),
  "evidence.paper-schematics": evidenceEntry("evidence.paper-schematics", "Paper Schematics", "Ilya's ash-hidden schematics show routes doctrine removed.", "scene.a4.ash-in-furnace"),
  "evidence.orchard-truth": evidenceEntry("evidence.orchard-truth", "Orchard Ledger", "Food numbers imply a hidden population beyond the public rolls.", "scene.b3.orchard-numbers"),
  "evidence.nursery-truth": evidenceEntry("evidence.nursery-truth", "Nursery Records", "Birth and transfer records prove population manipulation.", "scene.c1.nursery-ghosts"),
  "evidence.boundary-truth": evidenceEntry("evidence.boundary-truth", "Boundary Feed", "Alma's raw feed shows the external signal is curated.", "scene.c3.boundary-technician"),
  "evidence.exile-truth": evidenceEntry("evidence.exile-truth", "Exile Audio", "A last message proves people survived outside approved doctrine.", "scene.c3.boundary-technician"),
  "evidence.voss-continuity": evidenceEntry("evidence.voss-continuity", "Continuity Order", "Voss's doctrine links order to selective truth.", "scene.c6.audience-voss")
};

export const quests: Record<string, QuestEntry> = {
  "quest.trace-b17": record("quest.trace-b17", "Trace B-17", "Follow the pressure fault to the level that should not exist."),
  "quest.coalition": record("quest.coalition", "Choose the Coalition", "Commit allies and route tempo before the relay crisis."),
  "quest.broadcast": record("quest.broadcast", "Open Speakers", "Prepare the final relay path."),
  "quest.side.cold-hands-clinic": record("quest.side.cold-hands-clinic", "Cold Hands Clinic", "Repair the recycler or leave casualties to rise."),
  "quest.side.family-ledger": record("quest.side.family-ledger", "Family Ledger", "Secure transfer records for nursery truth."),
  "quest.side.juns-double-books": record("quest.side.juns-double-books", "Jun's Double Books", "Expose, recruit, or ignore Jun's market records."),
  "quest.side.broken-lesson": record("quest.side.broken-lesson", "Broken Lesson", "Help or betray Ilya's forbidden lesson."),
  "quest.side.pump-six": record("quest.side.pump-six", "Pump Six", "Repair pump pressure to support Brant and Mechanical."),
  "quest.side.missing-watchman": record("quest.side.missing-watchman", "Missing Watchman", "Find proof that can move Tovin toward doubt."),
  "quest.side.dead-garden": record("quest.side.dead-garden", "Dead Garden", "Trace orchard fraud to hidden survival context."),
  "quest.side.last-message": record("quest.side.last-message", "Last Message", "Recover exile audio before the final route choice.")
};

export const codex: Record<string, CodexEntry> = {
  "codex.survival-doctrine": record("codex.survival-doctrine", "Survival Doctrine", "Order is life. History is hazard. The surface is death."),
  "codex.black-levels": record("codex.black-levels", "Black Levels", "Maintenance slang for spaces removed from public maps."),
  "codex.keepers": record("codex.keepers", "Keepers", "Archivists who trade obedience for preservation."),
  "codex.descenders": record("codex.descenders", "Descenders", "A hidden society under the approved vault."),
  "codex.boundary-ring": record("codex.boundary-ring", "Boundary Ring", "The service ring that filters external truth."),
  "codex.route-doctrine": record("codex.route-doctrine", "Route Doctrine", "Every route decides who can bear the truth and who pays for it.")
};
