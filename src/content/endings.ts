import type { Ending } from "../game";

export const endings: Record<string, Ending> = {
  "ending.full-exposure-preview": {
    id: "ending.full-exposure-preview",
    routeId: "full-exposure",
    title: "Full Exposure Preview",
    summary: "Tomas keeps the raw B-17 feed intact. Vault-9 has not heard the truth yet, but the route is now testable.",
    conditions: [
      { type: "routeSelected", routeId: "full-exposure" },
      { type: "hasEvidence", evidenceId: "evidence.found-b17" }
    ]
  }
};

