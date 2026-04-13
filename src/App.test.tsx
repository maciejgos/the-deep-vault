import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("starts on the playable opening scene", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "P1. Survival Notice" })).toBeInTheDocument();
    expect(screen.getByText(/Tomas Vale/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Begin the maintenance shift" })).toBeInTheDocument();
    expect(screen.getByText("Survival Doctrine")).toBeInTheDocument();
  });

  it("plays the first content path and shows route records", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Begin the maintenance shift" }));
    await user.click(screen.getByRole("button", { name: "Pull the raw B-17 sensor spool" }));
    await user.click(screen.getByRole("button", { name: "Preserve the raw feed for exposure" }));

    expect(screen.getByRole("heading", { name: "Milestone Endpoint" })).toBeInTheDocument();
    expect(screen.getByText("B-17 Power Draw")).toBeInTheDocument();
    expect(screen.getByText("Full Exposure Preview")).toBeInTheDocument();
    expect(screen.getByText("full-exposure")).toBeInTheDocument();
  });
});
