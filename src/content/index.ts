import type { GameContent } from "../game";
import { endings } from "./endings";
import { codex, evidence, quests } from "./records";
import { routeFixtures } from "./routeFixtures";
import { scenes } from "./scenes";
import { sideQuests } from "./sideQuests";
import { characters, factions, items, locations } from "./world";

export const gameContent: GameContent = {
  startSceneId: "scene.p1.survival-notice",
  scenes,
  endings,
  evidence,
  quests,
  codex,
  locations,
  factions,
  characters,
  items,
  sideQuests,
  routeFixtures
};

export * from "./mvpScope";

