import type { GameContent, GameState } from "../game";

interface RecordsPanelProps {
  content: GameContent;
  state: GameState;
}

export function RecordsPanel({ content, state }: RecordsPanelProps) {
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

