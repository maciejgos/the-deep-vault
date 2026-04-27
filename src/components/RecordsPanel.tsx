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
        items={state.evidenceIds.map((id) => ({
          title: content.evidence[id]?.title ?? id,
          summary: content.evidence[id]?.summary
        }))}
        emptyText="No evidence secured."
      />
      <RecordGroup
        title="Quests"
        items={Object.entries(state.questStates).map(([id, quest]) => ({
          title: `${content.quests[id]?.title ?? id}: ${quest.status}`,
          summary: content.quests[id]?.summary
        }))}
        emptyText="No active leads."
      />
      <RecordGroup
        title="Codex"
        items={state.codexIds.map((id) => ({
          title: content.codex[id]?.title ?? id,
          summary: content.codex[id]?.summary
        }))}
        emptyText="No doctrine notes logged."
      />
      <RecordGroup
        title="Factions"
        items={Object.entries(state.factionTrust).map(([id, trust]) => ({
          title: `${content.factions[id]?.name ?? id}: ${trust}`,
          summary: content.factions[id]?.summary
        }))}
        emptyText="No faction pressure tracked."
      />
      <RecordGroup
        title="Characters"
        items={Object.entries(state.characterStates).map(([id, value]) => ({
          title: `${content.characters[id]?.name ?? id}: ${value}`,
          summary: content.characters[id]?.summary
        }))}
        emptyText="No character outcomes tracked."
      />
      <RecordGroup
        title="Locations"
        items={visitedLocationIds.map((id) => ({
          title: content.locations[id]?.name ?? id,
          summary: content.locations[id]?.summary
        }))}
        emptyText="No locations visited."
      />
      <RecordGroup
        title="Items"
        items={state.itemIds.map((id) => ({
          title: content.items[id]?.name ?? id,
          summary: content.items[id]?.summary
        }))}
        emptyText="No key items secured."
      />
    </aside>
  );
}

interface RecordGroupProps {
  title: string;
  items: RecordItem[];
  emptyText: string;
}

interface RecordItem {
  title: string;
  summary?: string;
}

function RecordGroup({ title, items, emptyText }: RecordGroupProps) {
  return (
    <section>
      <h2>{title}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              {item.summary ? <span>{item.summary}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>{emptyText}</p>
      )}
    </section>
  );
}
