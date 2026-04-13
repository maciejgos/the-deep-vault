import { expect, test } from "@playwright/test";

test("opening scene is visible and menu based", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "P1. Survival Notice" })).toBeVisible();
  await expect(page.getByText(/Tomas Vale/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin the maintenance shift" })).toBeVisible();
});

test("first route endpoint is playable", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Begin the maintenance shift" }).click();
  await page.getByRole("button", { name: "Pull the raw B-17 sensor spool" }).click();
  await page.getByRole("button", { name: "Preserve the raw feed for exposure" }).click();

  await expect(page.getByRole("heading", { name: "Milestone Endpoint" })).toBeVisible();
  await expect(page.getByText("B-17 Power Draw")).toBeVisible();
  await expect(page.getByText("Full Exposure Preview")).toBeVisible();
});
