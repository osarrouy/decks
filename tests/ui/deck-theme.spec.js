import { test, expect } from "@playwright/test";

const course =
  "/introduction-aux-cultures-numeriques/?vue=chapitres&section=histoire-du-numerique&onglet=slides";

for (const width of [1280, 390]) {
  test(`embedded decks follow the shared design and stored preference at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(course);
    const reader = page.frameLocator(
      'iframe[title="Slides : Histoire du numérique"]',
    );
    const surface = reader.locator(".slide");
    await expect(surface).toBeVisible();
    await expect(
      reader.getByLabel("Choisir une slide").locator("option"),
    ).toHaveCount(58);
    const toggle = page.getByRole("switch", { name: "Dark mode" });
    for (const dark of [false, true]) {
      if ((await toggle.getAttribute("aria-checked")) !== String(dark))
        await toggle.click();
      await expect(
        reader.getByRole("switch", { name: "Dark mode" }),
      ).toHaveAttribute("aria-checked", String(dark));
      const background = await page
        .locator("body")
        .evaluate((element) => getComputedStyle(element).backgroundColor);
      await expect(surface).toHaveCSS("background-color", background);
      await expect(surface).toHaveCSS("font-family", /Helvetica|Arial/);
      await expect(surface.locator("h1").first()).toHaveCSS(
        "font-family",
        /Instrument Serif/,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await surface.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.reload();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(
      reader.getByRole("switch", { name: "Dark mode" }),
    ).toHaveAttribute("aria-checked", "true");
    // Changes made inside the embedded reader also reach the portal through storage.
    await reader.getByRole("switch", { name: "Dark mode" }).click();
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await reader.getByLabel("Choisir une slide").selectOption("2");
    const portrait = reader.getByRole("img", { name: "Blaise Pascal" });
    await expect(portrait).toBeVisible();
    expect((await portrait.boundingBox()).height).toBeGreaterThan(20);
    expect(errors).toEqual([]);
  });
}
