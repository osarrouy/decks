import { test, expect } from "@playwright/test";

test("Svelte pages hydrate cleanly and preserve the theme across navigation and reloads", async ({
  page,
  baseURL,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      /hydration_|ownership_|effect_update_depth_exceeded/.test(message.text())
    )
      errors.push(message.text());
  });
  for (const [origin, start, link] of [[baseURL, "/", "L1"]]) {
    await page.goto(origin + start);
    const toggle = page.getByRole("switch", { name: "Dark mode" }).first();
    await toggle.click();
    await expect(toggle).toBeChecked();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: link, exact: true })
      .click();
    await expect(toggle).toBeChecked();
    await page.reload();
    await expect(toggle).toBeChecked();
    await toggle.click();
    await expect(toggle).not.toBeChecked();
  }
  expect(errors).toEqual([]);
});
