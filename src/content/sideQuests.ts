import type { SideQuestEntry } from "../game";

function sideQuest(id: string, title: string, summary: string): SideQuestEntry {
  return { id, title, summary };
}

export const sideQuests: Record<string, SideQuestEntry> = {
  "side.cold-hands-clinic": sideQuest("side.cold-hands-clinic", "S1. Cold Hands Clinic", "Repair outcome affects sedatives, trust, and riot casualties."),
  "side.family-ledger": sideQuest("side.family-ledger", "S2. Family Ledger", "Transfer records support nursery truth and emotional proof."),
  "side.juns-double-books": sideQuest("side.juns-double-books", "S3. Jun's Double Books", "Jun can be exposed, recruited, or ignored for access and trust context."),
  "side.broken-lesson": sideQuest("side.broken-lesson", "S4. Broken Lesson", "Ilya's forbidden lesson affects Keeper or Stability trust."),
  "side.pump-six": sideQuest("side.pump-six", "S5. Pump Six", "Mechanical trust and Brant survivability support."),
  "side.missing-watchman": sideQuest("side.missing-watchman", "S6. Missing Watchman", "Evidence path for Tovin doubt."),
  "side.dead-garden": sideQuest("side.dead-garden", "S7. Dead Garden", "Orchard proof and hidden survival context."),
  "side.last-message": sideQuest("side.last-message", "S8. Last Message", "Exile audio evidence and emotional route context.")
};
