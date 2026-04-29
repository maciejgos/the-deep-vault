import type { RouteFixture, RouteId } from "../game";

const commonPath = [
  "choice.p1.begin-shift",
  "choice.a1.inspect-manifold",
  "choice.a2.partial-truth",
  "choice.a3.follow-mira",
  "choice.a4.take-schematics",
  "choice.a5.open-locker",
  "choice.b1.accept-nera",
  "choice.b2.continue-orchard",
  "choice.b3.take-ledger",
  "choice.b4.open-stair",
  "choice.b5.meet-cael",
  "choice.b6.stabilize-mira",
  "choice.c1.copy-records",
  "choice.c2.spare-tovin",
  "choice.c3.take-raw-feed",
  "choice.c4.slow-the-fire",
  "choice.c5.hold-pumps",
  "choice.c6.take-cipher"
];

function fixture(routeId: RouteId, routeChoiceId: string, finalChoiceId: string): RouteFixture {
  return {
    id: `fixture.${routeId}`,
    routeId,
    choiceIds: [...commonPath, routeChoiceId, `choice.d2.prepare-relay-${routeId}`, "choice.d3.resolve-crisis", finalChoiceId]
  };
}

export const routeFixtures: Record<string, RouteFixture> = {
  "fixture.controlled-truth": fixture("controlled-truth", "choice.d1.controlled-truth", "choice.d4.execute-controlled-truth"),
  "fixture.full-exposure": fixture("full-exposure", "choice.d1.full-exposure", "choice.d4.execute-full-exposure"),
  "fixture.preserve-order": fixture("preserve-order", "choice.d1.preserve-order", "choice.d4.execute-preserve-order"),
  "fixture.exit-protocol": fixture("exit-protocol", "choice.d1.exit-protocol", "choice.d4.execute-exit-protocol")
};
