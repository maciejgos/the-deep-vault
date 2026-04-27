import type { EndingResult, GameContent, GameState } from "../game";

interface EndingViewProps {
  content: GameContent;
  endingResult: EndingResult;
  state: GameState;
}

export function EndingView({ content, endingResult, state }: EndingViewProps) {
  if (!endingResult.ending) {
    return null;
  }

  const allies = Object.entries(state.characterStates)
    .filter(([, value]) => ["alive", "allied", "turned", "recruited", "protected", "supported", "shielded"].includes(value))
    .map(([id, value]) => `${content.characters[id]?.name ?? id}: ${value}`);

  return (
    <aside className="ending-panel" aria-labelledby="ending-title">
      <p className="eyebrow">Route Outcome</p>
      <h2 id="ending-title">{endingResult.ending.title}</h2>
      <p>{endingResult.ending.summary}</p>
      <dl className="ending-report" aria-label="Ending report">
        <div>
          <dt>Evidence secured</dt>
          <dd>{state.evidenceCount}</dd>
        </div>
        <div>
          <dt>Public stability</dt>
          <dd>{state.publicStability}</dd>
        </div>
        <div>
          <dt>Stress</dt>
          <dd>{state.stress}</dd>
        </div>
        <div>
          <dt>Supplies</dt>
          <dd>{state.supplies}</dd>
        </div>
      </dl>
      {allies.length > 0 ? (
        <section className="ending-allies" aria-label="Ending allies">
          <h3>Remembered allies</h3>
          <ul>
            {allies.map((ally) => (
              <li key={ally}>{ally}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
