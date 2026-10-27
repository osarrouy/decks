import { test, expect } from "@playwright/test";

// Safari engine: an embedded deck must start its client, which lazy iframes once prevented.
test.use({ browserName: "webkit", channel: "" });

test("Embedded slides respond to their buttons and the keyboard in WebKit", async ({
  page,
}) => {
  await page.goto(
    "/introduction-aux-cultures-numeriques/?vue=chapitres&section=histoire-du-numerique&onglet=slides",
  );
  const reader = page.frameLocator("iframe");
  const select = reader.getByLabel("Choisir une slide");
  await expect(select).toHaveValue("0");
  await page
    .frames()
    .find((frame) => frame.url().includes("/slides/history-1/"))
    .waitForLoadState("networkidle");
  await reader.getByRole("button", { name: "Slide ou étape suivante" }).click();
  await expect(select).toHaveValue("1");
  await reader.locator(".viewport").click();
  await page.keyboard.press("ArrowRight");
  await expect(select).toHaveValue("2");
});
