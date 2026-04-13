import type { Ending } from "../game";

export const endings: Record<string, Ending> = {
  "ending.controlled-truth": {
    id: "ending.controlled-truth",
    routeId: "controlled-truth",
    title: "Controlled Truth",
    summary: "Tomas and the Keepers release proof slowly, preserving enough order to keep Vault-9 alive while doctrine cracks.",
    conditions: [{ type: "routeSelected", routeId: "controlled-truth" }]
  },
  "ending.full-exposure": {
    id: "ending.full-exposure",
    routeId: "full-exposure",
    title: "Full Exposure",
    summary: "The raw feed floods every speaker. Vault-9 survives the first riot with its founding lie in the open.",
    conditions: [{ type: "routeSelected", routeId: "full-exposure" }]
  },
  "ending.preserve-order": {
    id: "ending.preserve-order",
    routeId: "preserve-order",
    title: "Preserve Order",
    summary: "Voss keeps the vault stable by burying the proof. Tomas becomes a collaborator with a ledger of names.",
    conditions: [{ type: "routeSelected", routeId: "preserve-order" }]
  },
  "ending.exit-protocol": {
    id: "ending.exit-protocol",
    routeId: "exit-protocol",
    title: "Exit Protocol",
    summary: "Tomas uses Alma's feed and the relay core to open a path beyond Vault-9, carrying proof into the external node.",
    conditions: [{ type: "routeSelected", routeId: "exit-protocol" }]
  }
};
