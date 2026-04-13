import { z } from "zod";
import { SAVE_VERSION } from "./types";

const idSchema = z.string().min(1);
const routeIdSchema = z.enum(["controlled-truth", "full-exposure", "preserve-order", "exit-protocol"]);
const resourceSchema = z.enum(["stress", "supplies", "clearance", "evidenceCount", "publicStability"]);

export const ConditionSchema: z.ZodType = z.lazy(() =>
  z.discriminatedUnion("type", [
    z.object({ type: z.literal("hasEvidence"), evidenceId: idSchema }),
    z.object({ type: z.literal("flagEquals"), flag: idSchema, value: z.union([z.boolean(), z.number(), z.string()]) }),
    z.object({ type: z.literal("factionTrustAtLeast"), factionId: idSchema, value: z.number() }),
    z.object({ type: z.literal("characterStateEquals"), characterId: idSchema, value: z.string() }),
    z.object({ type: z.literal("resourceAtLeast"), resource: resourceSchema, value: z.number() }),
    z.object({ type: z.literal("resourceAtMost"), resource: resourceSchema, value: z.number() }),
    z.object({ type: z.literal("routeSelected"), routeId: routeIdSchema }),
    z.object({ type: z.literal("sideQuestOutcome"), sideQuestId: idSchema, value: z.string() }),
    z.object({ type: z.literal("sceneVisited"), sceneId: idSchema }),
    z.object({ type: z.literal("itemAcquired"), itemId: idSchema }),
    z.object({ type: z.literal("allOf"), conditions: z.array(ConditionSchema) }),
    z.object({ type: z.literal("anyOf"), conditions: z.array(ConditionSchema) }),
    z.object({ type: z.literal("not"), condition: ConditionSchema })
  ])
);

export const EffectSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("setFlag"), flag: idSchema, value: z.union([z.boolean(), z.number(), z.string()]) }),
  z.object({ type: z.literal("addEvidence"), evidenceId: idSchema }),
  z.object({ type: z.literal("updateQuest"), questId: idSchema, status: z.enum(["active", "completed", "failed", "unresolved"]) }),
  z.object({ type: z.literal("addCodex"), codexId: idSchema }),
  z.object({ type: z.literal("adjustFactionTrust"), factionId: idSchema, amount: z.number() }),
  z.object({ type: z.literal("setCharacterState"), characterId: idSchema, value: z.string() }),
  z.object({ type: z.literal("adjustStress"), amount: z.number() }),
  z.object({ type: z.literal("adjustSupplies"), amount: z.number() }),
  z.object({ type: z.literal("setClearance"), value: z.number() }),
  z.object({ type: z.literal("adjustPublicStability"), amount: z.number() }),
  z.object({ type: z.literal("setSideQuestOutcome"), sideQuestId: idSchema, value: z.string() }),
  z.object({ type: z.literal("adjustRouteTendency"), routeId: routeIdSchema, amount: z.number() }),
  z.object({ type: z.literal("setFinalRoute"), routeId: routeIdSchema }),
  z.object({ type: z.literal("acquireItem"), itemId: idSchema }),
  z.object({ type: z.literal("moveToScene"), sceneId: idSchema })
]);

export const ChoiceSchema = z.object({
  id: idSchema,
  text: z.string().min(1),
  conditions: z.array(ConditionSchema).optional(),
  effects: z.array(EffectSchema).optional(),
  targetSceneId: idSchema.optional()
});

export const SceneSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  zone: z.string().min(1),
  locationId: idSchema.optional(),
  narrative: z.array(z.string().min(1)).min(1),
  entryEffects: z.array(EffectSchema).optional(),
  choices: z.array(ChoiceSchema)
});

const evidenceSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  sourceSceneId: idSchema.optional()
});

const titledSummarySchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  summary: z.string().min(1)
});

const namedEntrySchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  summary: z.string().optional()
});

export const EndingSchema = z.object({
  id: idSchema,
  routeId: routeIdSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  conditions: z.array(ConditionSchema).optional()
});

export const GameContentSchema = z.object({
  startSceneId: idSchema,
  scenes: z.record(SceneSchema),
  endings: z.record(EndingSchema),
  evidence: z.record(evidenceSchema),
  quests: z.record(titledSummarySchema),
  codex: z.record(titledSummarySchema),
  locations: z.record(namedEntrySchema),
  factions: z.record(namedEntrySchema),
  characters: z.record(namedEntrySchema),
  items: z.record(namedEntrySchema),
  sideQuests: z.record(titledSummarySchema),
  routeFixtures: z.record(z.object({ id: idSchema, routeId: routeIdSchema, choiceIds: z.array(idSchema) }))
});

export const GameStateSchema = z.object({
  currentSceneId: idSchema,
  visitedSceneIds: z.array(idSchema),
  selectedChoices: z.array(z.object({ sceneId: idSchema, choiceId: idSchema })),
  flags: z.record(z.union([z.boolean(), z.number(), z.string()])),
  factionTrust: z.record(z.number()),
  characterStates: z.record(z.string()),
  evidenceIds: z.array(idSchema),
  questStates: z.record(z.object({ status: z.enum(["active", "completed", "failed", "unresolved"]), updatedAtSceneId: idSchema.optional() })),
  codexIds: z.array(idSchema),
  itemIds: z.array(idSchema),
  stress: z.number(),
  supplies: z.number(),
  clearance: z.number(),
  evidenceCount: z.number(),
  routeProgress: z.record(routeIdSchema, z.number()),
  finalRoute: routeIdSchema.nullable(),
  publicStability: z.number(),
  sideQuestOutcomes: z.record(z.string()),
  save: z.object({
    version: z.literal(SAVE_VERSION),
    savedAt: z.string().nullable()
  })
});
