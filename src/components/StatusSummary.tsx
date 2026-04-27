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
        <dt>Stability</dt>
        <dd>{state.publicStability}</dd>
      </div>
      <div>
        <dt>Clearance</dt>
        <dd>{state.clearance}</dd>
      </div>
      <div>
        <dt>Route</dt>
        <dd>{formatRoute(state.finalRoute)}</dd>
      </div>
    </dl>
  );
}

function formatRoute(routeId: string | null) {
  return routeId ? routeId.replaceAll("-", " ") : "undecided";
}
