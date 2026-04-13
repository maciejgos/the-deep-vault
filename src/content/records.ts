import type { CodexEntry, EvidenceEntry, QuestEntry } from "../game";

export const evidence: Record<string, EvidenceEntry> = {
  "evidence.found-b17": {
    id: "evidence.found-b17",
    title: "B-17 Power Draw",
    summary: "The failed manifold reports live power from a level erased by public doctrine.",
    sourceSceneId: "scene.a1.pressure-fault"
  }
};

export const quests: Record<string, QuestEntry> = {
  "quest.trace-b17": {
    id: "quest.trace-b17",
    title: "Trace B-17",
    summary: "Follow the pressure fault to the level that should not exist."
  }
};

export const codex: Record<string, CodexEntry> = {
  "codex.survival-doctrine": {
    id: "codex.survival-doctrine",
    title: "Survival Doctrine",
    summary: "Order is life. History is hazard. The surface is death."
  },
  "codex.black-levels": {
    id: "codex.black-levels",
    title: "Black Levels",
    summary: "Maintenance slang for spaces removed from public maps."
  }
};

