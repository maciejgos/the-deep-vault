import { expect, test } from "@playwright/test";

test("opening scene is visible and menu based", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "The Deep Vault" })).toBeVisible();
  await expect(page.getByText("You are Tomas Vale")).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin shift" })).toBeVisible();
});
