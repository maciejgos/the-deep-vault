import { GameStateSchema } from "./schemas";
import { SAVE_VERSION, type GameState } from "./types";

export const SAVE_SLOT_KEY = "the-deep-vault:mvp-save";

export type SaveResult =
  | { ok: true; state: GameState }
  | { ok: false; reason: "storage-unavailable"; message: string };

export type LoadResult =
  | { ok: true; state: GameState }
  | { ok: false; reason: "no-save" | "storage-unavailable" | "malformed-save" | "incompatible-version"; message: string };

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function saveGame(
  state: GameState,
  storage: StorageLike | undefined = getBrowserStorage(),
  savedAt = new Date().toISOString()
): SaveResult {
  if (!storage) {
    return { ok: false, reason: "storage-unavailable", message: "Save storage is unavailable." };
  }

  const stateToSave: GameState = {
    ...state,
    save: {
      version: SAVE_VERSION,
      savedAt
    }
  };

  try {
    storage.setItem(SAVE_SLOT_KEY, JSON.stringify(stateToSave));
    return { ok: true, state: stateToSave };
  } catch {
    return { ok: false, reason: "storage-unavailable", message: "Save storage could not be written." };
  }
}

export function loadGame(storage: StorageLike | undefined = getBrowserStorage()): LoadResult {
  if (!storage) {
    return { ok: false, reason: "storage-unavailable", message: "Save storage is unavailable." };
  }

  const rawSave = storage.getItem(SAVE_SLOT_KEY);
  if (!rawSave) {
    return { ok: false, reason: "no-save", message: "No saved game exists." };
  }

  let parsedSave: unknown;
  try {
    parsedSave = JSON.parse(rawSave);
  } catch {
    return { ok: false, reason: "malformed-save", message: "Saved game data is malformed." };
  }

  if (!hasCompatibleVersion(parsedSave)) {
    return { ok: false, reason: "incompatible-version", message: "Saved game data uses an incompatible version." };
  }

  const state = GameStateSchema.safeParse(parsedSave);
  if (!state.success) {
    return { ok: false, reason: "malformed-save", message: "Saved game data failed validation." };
  }

  return { ok: true, state: state.data as GameState };
}

function hasCompatibleVersion(value: unknown): value is { save: { version: string } } {
  return (
    typeof value === "object" &&
    value !== null &&
    "save" in value &&
    typeof value.save === "object" &&
    value.save !== null &&
    "version" in value.save &&
    value.save.version === SAVE_VERSION
  );
}

function getBrowserStorage(): StorageLike | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

