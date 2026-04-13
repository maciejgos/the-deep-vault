import { expect, test, type Page } from "@playwright/test";

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

test("opening scene is visible and menu based", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "P1. Survival Notice" })).toBeVisible();
  await expect(page.getByText(/Tomas Vale/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin the maintenance shift" })).toBeVisible();
});

test("full exposure route endpoint is playable", async ({ page }) => {
  await page.goto("/");
  await playChoices(page, fullExposurePath);

  await expect(page.getByRole("heading", { name: "Ending Summary" })).toBeVisible();
  await expect(page.getByText("B-17 Power Draw")).toBeVisible();
  await expect(page.getByText("Full Exposure")).toBeVisible();
});

async function playChoices(page: Page, choiceNames: string[]) {
  for (const choiceName of choiceNames) {
    await page.getByRole("button", { name: choiceName }).click();
  }
}
