import { test, expect } from "@playwright/test";

async function setToggle(toggle, checked) {
  await expect(async () => {
    if ((await toggle.getAttribute("aria-checked")) !== String(checked))
      await toggle.click();
    await expect(toggle).toHaveAttribute("aria-checked", String(checked), {
      timeout: 500,
    });
  }).toPass({ timeout: 15_000 });
}

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
    await setToggle(toggle, true);
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: link, exact: true })
      .click();
    await expect(toggle).toBeChecked();
    await page.reload();
    await expect(toggle).toBeChecked();
    await setToggle(toggle, false);
  }
  expect(errors).toEqual([]);
});
