import type { EndingResult, RouteId } from "../game";

interface RoutePressureProps {
  endingResult: EndingResult;
}

const ROUTE_LABELS: Record<RouteId, string> = {
  "controlled-truth": "Controlled truth",
  "full-exposure": "Full exposure",
  "preserve-order": "Preserve order",
  "exit-protocol": "Exit protocol"
};

export function RoutePressure({ endingResult }: RoutePressureProps) {
  const scores = Object.entries(endingResult.routeScores) as [RouteId, number][];
  const maxScore = Math.max(1, ...scores.map(([, score]) => score));

  return (
    <section className="route-pressure" aria-label="Route pressure">
      <div className="panel-heading">
        <p className="eyebrow">Pressure</p>
        <h2>Route drift</h2>
      </div>
      <div className="route-bars">
        {scores.map(([routeId, score]) => (
          <div key={routeId} className={endingResult.routeId === routeId ? "route-row active" : "route-row"}>
            <span>{ROUTE_LABELS[routeId]}</span>
            <div className="route-track" aria-hidden="true">
              <span style={{ width: `${Math.max(6, (score / maxScore) * 100)}%` }} />
            </div>
            <strong>{score}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
