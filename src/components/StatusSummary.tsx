import type { GameState } from "../game";

interface StatusSummaryProps {
  state: GameState;
}

export function StatusSummary({ state }: StatusSummaryProps) {
  return (
    <dl className="status-summary" aria-label="Current state">
      <div>
        <dt>Stress</dt>
        <dd>{state.stress}</dd>
      </div>
      <div>
        <dt>Supplies</dt>
        <dd>{state.supplies}</dd>
      </div>
      <div>
        <dt>Evidence</dt>
        <dd>{state.evidenceCount}</dd>
      </div>
      <div>
        <dt>Route</dt>
        <dd>{state.finalRoute ?? "undecided"}</dd>
      </div>
    </dl>
  );
}

