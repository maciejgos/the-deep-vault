import type { GameContent, GameState } from "../game";

interface RecordsPanelProps {
  content: GameContent;
  state: GameState;
}

export function RecordsPanel({ content, state }: RecordsPanelProps) {
  const visitedLocationIds = Array.from(
    new Set(
      state.visitedSceneIds
        .map((sceneId) => content.scenes[sceneId]?.locationId)
        .filter((locationId): locationId is string => Boolean(locationId))
    )
  );

  return (
    <aside className="records-panel" aria-label="Records">
      <RecordGroup
        title="Evidence"
        items={state.evidenceIds.map((id) => content.evidence[id]?.title ?? id)}
        emptyText="No evidence secured."
      />
      <RecordGroup
        title="Quests"
        items={Object.entries(state.questStates).map(([id, quest]) => `${content.quests[id]?.title ?? id}: ${quest.status}`)}
        emptyText="No active leads."
      />
      <RecordGroup
        title="Codex"
        items={state.codexIds.map((id) => content.codex[id]?.title ?? id)}
        emptyText="No doctrine notes logged."
      />
      <RecordGroup
        title="Factions"
        items={Object.entries(state.factionTrust).map(([id, trust]) => `${content.factions[id]?.name ?? id}: ${trust}`)}
        emptyText="No faction pressure tracked."
      />
      <RecordGroup
        title="Characters"
        items={Object.entries(state.characterStates).map(([id, value]) => `${content.characters[id]?.name ?? id}: ${value}`)}
        emptyText="No character outcomes tracked."
      />
      <RecordGroup
        title="Locations"
        items={visitedLocationIds.map((id) => content.locations[id]?.name ?? id)}
        emptyText="No locations visited."
      />
      <RecordGroup
        title="Items"
        items={state.itemIds.map((id) => content.items[id]?.name ?? id)}
        emptyText="No key items secured."
      />
    </aside>
  );
}

interface RecordGroupProps {
  title: string;
  items: string[];
  emptyText: string;
}

function RecordGroup({ title, items, emptyText }: RecordGroupProps) {
  return (
    <section>
      <h2>{title}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{emptyText}</p>
      )}
    </section>
  );
}
