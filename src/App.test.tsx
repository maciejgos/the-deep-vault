import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const fullExposurePath = [
  "Begin the maintenance shift",
  "Pull the raw B-17 sensor spool",
  "Give Tovin enough truth to create doubt",
  "Follow Mira's market trail",
  "Take the paper schematics",
  "Use Mira's locker mark",
  "Accept Nera's archive seal",
  "Trace the recycler ration numbers",
  "Take the orchard route ledger",
  "Open the Black Stair",
  "Hear Cael's demand for full exposure",
  "Keep Mira alive for the coalition",
  "Copy the nursery records",
  "Leave Tovin a path to help",
  "Take Alma's raw boundary feed",
  "Buy time without burying the proof",
  "Hold the pumps and keep Brant alive",
  "Take the continuity cipher",
  "Give Cael the raw exposure route",
  "Prepare the relay core",
  "Spend the last resources to keep the route viable",
  "Execute full exposure"
];

describe("App", () => {
  it("starts on the animated landing screen and enters the opening scene", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: "The Deep Vault" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Start" }));

    expect(screen.getByRole("heading", { name: "P1. Survival Notice" })).toBeInTheDocument();
    expect(screen.getByText(/Tomas Vale/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Begin the maintenance shift" })).toBeInTheDocument();
    expect(screen.getByText("Survival Doctrine")).toBeInTheDocument();

    const records = screen.getByRole("complementary", { name: "Records" });
    expect(within(records).getByRole("heading", { name: "Factions" })).toBeInTheDocument();
    expect(within(records).getByText("Mechanical: 0")).toBeInTheDocument();
    expect(within(records).getByRole("heading", { name: "Locations" })).toBeInTheDocument();
    expect(within(records).getByText("Level 62 Manifold Corridor")).toBeInTheDocument();
  });

  it("plays the full-exposure MVP route and shows records", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Start" }));

    for (const choiceName of fullExposurePath) {
      await user.click(screen.getByRole("button", { name: choiceName }));
    }

    expect(screen.getByRole("heading", { name: "Ending Summary" })).toBeInTheDocument();
    expect(screen.getByText("Full Exposure")).toBeInTheDocument();
    expect(screen.getByText("full exposure")).toBeInTheDocument();

    const records = screen.getByRole("complementary", { name: "Records" });
    expect(within(records).getByText("B-17 Power Draw")).toBeInTheDocument();
    expect(within(records).getByRole("heading", { name: "Characters" })).toBeInTheDocument();
    expect(within(records).getByText("Mira Senn: alive")).toBeInTheDocument();
    expect(within(records).getByRole("heading", { name: "Locations" })).toBeInTheDocument();
    expect(within(records).getByText("External Node")).toBeInTheDocument();
    expect(within(records).getByRole("heading", { name: "Items" })).toBeInTheDocument();
    expect(within(records).getByText("Broadcast Cipher")).toBeInTheDocument();
  });

  it("starts a fresh game from an in-progress scene", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("button", { name: "Begin the maintenance shift" }));
    expect(screen.getByRole("heading", { name: "A1. Pressure Fault" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "New game" }));

    expect(screen.getByRole("heading", { name: "P1. Survival Notice" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("New game started.");
    expect(screen.getByText("No active leads.")).toBeInTheDocument();
  });
});
