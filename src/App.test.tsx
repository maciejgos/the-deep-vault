import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("starts on the playable opening scene", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "The Deep Vault" })).toBeInTheDocument();
    expect(screen.getByText(/You are Tomas Vale/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Begin shift" })).toBeInTheDocument();
  });
});
