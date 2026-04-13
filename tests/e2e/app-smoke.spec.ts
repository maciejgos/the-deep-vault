import { expect, test, type Page } from "@playwright/test";
import { gameContent } from "../../src/content";

const choiceTextById = new Map(
  Object.values(gameContent.scenes).flatMap((scene) => scene.choices.map((choice) => [choice.id, choice.text] as const))
);

test("opening scene is visible, menu based, and keyboard reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "P1. Survival Notice" })).toBeVisible();
  await expect(page.getByText(/Tomas Vale/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin the maintenance shift" })).toBeVisible();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "A1. Pressure Fault" })).toBeVisible();
});

for (const fixture of Object.values(gameContent.routeFixtures)) {
  test(`${fixture.routeId} route reaches matching ending`, async ({ page }, testInfo) => {
    await page.goto("/");
    await playFixture(page, fixture.choiceIds);

    await expect(page.getByRole("heading", { name: "Ending Summary" })).toBeVisible();
    await expect(page.getByRole("heading", { name: routeTitle(fixture.routeId) })).toBeVisible();
    await expect(page.getByText(fixture.routeId)).toBeVisible();

    if (fixture.routeId === "full-exposure") {
      await testInfo.attach("full-exposure-ending", {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png"
      });
    }
  });
}

test("browser save/load resumes a route and preserves records", async ({ page }) => {
  const fixture = gameContent.routeFixtures["fixture.exit-protocol"];
  const midpoint = Math.floor(fixture.choiceIds.length / 2);

  await page.goto("/");
  await playFixture(page, fixture.choiceIds.slice(0, midpoint));
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("status")).toContainText("Game saved.");

  await page.reload();
  await page.getByRole("button", { name: "Load" }).click();
  await expect(page.getByRole("status")).toContainText("Game loaded.");

  await playFixture(page, fixture.choiceIds.slice(midpoint));

  await expect(page.getByRole("heading", { name: "Ending Summary" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Exit Protocol" })).toBeVisible();
  await expect(page.getByText("B-17 Power Draw")).toBeVisible();
  await expect(page.getByText("Trace B-17: active")).toBeVisible();
});

async function playFixture(page: Page, choiceIds: string[]) {
  for (const choiceId of choiceIds) {
    const choiceText = choiceTextById.get(choiceId);
    if (!choiceText) {
      throw new Error(`Missing choice text for ${choiceId}`);
    }

    await page.getByRole("button", { name: choiceText }).click();
  }
}

function routeTitle(routeId: string) {
  switch (routeId) {
    case "controlled-truth":
      return "Controlled Truth";
    case "full-exposure":
      return "Full Exposure";
    case "preserve-order":
      return "Preserve Order";
    case "exit-protocol":
      return "Exit Protocol";
    default:
      throw new Error(`Unknown route ${routeId}`);
  }
}
