export const SAVE_VERSION = "1";

export type SceneId = string;
export type ChoiceId = string;
export type EvidenceId = string;
export type QuestId = string;
export type CodexId = string;
export type LocationId = string;
export type FactionId = "mechanical" | "stability" | "keepers" | "descenders" | string;
export type CharacterId = string;
export type ItemId = string;
export type SideQuestId = string;
export type RouteId = "controlled-truth" | "full-exposure" | "preserve-order" | "exit-protocol";

export type QuestStatus = "active" | "completed" | "failed" | "unresolved";

export interface SaveMetadata {
  version: string;
  savedAt: string | null;
}

export interface ChoiceSelection {
  sceneId: SceneId;
  choiceId: ChoiceId;
}

export interface QuestState {
  status: QuestStatus;
  updatedAtSceneId?: SceneId;
}

export interface GameState {
  currentSceneId: SceneId;
  visitedSceneIds: SceneId[];
  selectedChoices: ChoiceSelection[];
  flags: Record<string, boolean | number | string>;
  factionTrust: Record<FactionId, number>;
  characterStates: Record<CharacterId, string>;
  evidenceIds: EvidenceId[];
  questStates: Record<QuestId, QuestState>;
  codexIds: CodexId[];
  itemIds: ItemId[];
  stress: number;
  supplies: number;
  clearance: number;
  evidenceCount: number;
  routeProgress: Partial<Record<RouteId, number>>;
  finalRoute: RouteId | null;
  publicStability: number;
  sideQuestOutcomes: Record<SideQuestId, string>;
  save: SaveMetadata;
}

export type Condition =
  | { type: "hasEvidence"; evidenceId: EvidenceId }
  | { type: "flagEquals"; flag: string; value: boolean | number | string }
  | { type: "factionTrustAtLeast"; factionId: FactionId; value: number }
  | { type: "characterStateEquals"; characterId: CharacterId; value: string }
  | { type: "resourceAtLeast"; resource: "stress" | "supplies" | "clearance" | "evidenceCount" | "publicStability"; value: number }
  | { type: "resourceAtMost"; resource: "stress" | "supplies" | "clearance" | "evidenceCount" | "publicStability"; value: number }
  | { type: "routeSelected"; routeId: RouteId }
  | { type: "sideQuestOutcome"; sideQuestId: SideQuestId; value: string }
  | { type: "sceneVisited"; sceneId: SceneId }
  | { type: "itemAcquired"; itemId: ItemId }
  | { type: "allOf"; conditions: Condition[] }
  | { type: "anyOf"; conditions: Condition[] }
  | { type: "not"; condition: Condition };

export type Effect =
  | { type: "setFlag"; flag: string; value: boolean | number | string }
  | { type: "addEvidence"; evidenceId: EvidenceId }
  | { type: "updateQuest"; questId: QuestId; status: QuestStatus }
  | { type: "addCodex"; codexId: CodexId }
  | { type: "adjustFactionTrust"; factionId: FactionId; amount: number }
  | { type: "setCharacterState"; characterId: CharacterId; value: string }
  | { type: "adjustStress"; amount: number }
  | { type: "adjustSupplies"; amount: number }
  | { type: "setClearance"; value: number }
  | { type: "adjustPublicStability"; amount: number }
  | { type: "setSideQuestOutcome"; sideQuestId: SideQuestId; value: string }
  | { type: "adjustRouteTendency"; routeId: RouteId; amount: number }
  | { type: "setFinalRoute"; routeId: RouteId }
  | { type: "acquireItem"; itemId: ItemId }
  | { type: "moveToScene"; sceneId: SceneId };

export interface Choice {
  id: ChoiceId;
  text: string;
  conditions?: Condition[];
  effects?: Effect[];
  targetSceneId?: SceneId;
}

export interface Scene {
  id: SceneId;
  title: string;
  zone: string;
  locationId?: LocationId;
  narrative: string[];
  entryEffects?: Effect[];
  choices: Choice[];
}

export interface EvidenceEntry {
  id: EvidenceId;
  title: string;
  summary: string;
  sourceSceneId?: SceneId;
}

export interface QuestEntry {
  id: QuestId;
  title: string;
  summary: string;
}

export interface CodexEntry {
  id: CodexId;
  title: string;
  summary: string;
}

export interface NamedContentEntry {
  id: string;
  name: string;
  summary?: string;
}

export interface SideQuestEntry {
  id: SideQuestId;
  title: string;
  summary: string;
}

export interface Ending {
  id: string;
  routeId: RouteId;
  title: string;
  summary: string;
  conditions?: Condition[];
}

export interface RouteFixture {
  id: string;
  routeId: RouteId;
  choiceIds: ChoiceId[];
}

export interface GameContent {
  startSceneId: SceneId;
  scenes: Record<SceneId, Scene>;
  endings: Record<string, Ending>;
  evidence: Record<EvidenceId, EvidenceEntry>;
  quests: Record<QuestId, QuestEntry>;
  codex: Record<CodexId, CodexEntry>;
  locations: Record<LocationId, NamedContentEntry>;
  factions: Record<FactionId, NamedContentEntry>;
  characters: Record<CharacterId, NamedContentEntry>;
  items: Record<ItemId, NamedContentEntry>;
  sideQuests: Record<SideQuestId, SideQuestEntry>;
  routeFixtures: Record<string, RouteFixture>;
}

export interface EndingResult {
  routeId: RouteId | null;
  ending: Ending | null;
  routeScores: Partial<Record<RouteId, number>>;
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

