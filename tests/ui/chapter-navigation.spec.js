import { test, expect } from "@playwright/test";

for (const width of [1280, 390]) {
  for (const theme of ["light", "dark"]) {
    test(`Chapter navigation preserves resources and a simple bibliography heading at ${width}px in ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (value) => localStorage.setItem("dg-theme", value),
        theme,
      );
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(
        "/l1/?vue=chapitres&section=cybernetics&onglet=bibliographie",
      );
      const reading = page.getByRole("region", {
        name: "Bibliographie",
        exact: true,
      });
      await expect(reading).toBeVisible();
      await expect(reading.getByRole("heading")).toHaveText(["Bibliographie"]);
      await expect(reading.locator(".heading")).toHaveText("Bibliographie");
      await expect(reading.locator(".reading-name")).toHaveCount(0);
      await expect(reading.locator(".reading-list > li")).toHaveCount(14);
      await page.screenshot({
        path: `/tmp/chapter-bibliography-${width}-${theme}.png`,
      });

      const navigation =
        width === 390
          ? page.getByRole("navigation", {
              name: "Choisir un chapitre sur mobile",
            })
          : page.getByRole("navigation", {
              name: "Choisir un chapitre",
              exact: true,
            });
      const trigger = page.locator(".mobile-chapters summary");
      if (width === 390) await trigger.click();
      await expect(navigation.getByRole("link")).toHaveCount(9);
      await expect(navigation.locator("[aria-current]")).toHaveCount(1);
      await expect(navigation.locator("[aria-current]")).toContainText(
        "Cybernetics",
      );
      await page.screenshot({
        path: `/tmp/chapter-navigation-${width}-${theme}.png`,
      });
      await navigation.getByRole("link").first().click();
      await expect(page).toHaveURL(/section=histoire-du-numerique/);
      expect(new URL(page.url()).searchParams.get("onglet")).toBe(
        "bibliographie",
      );
      await expect(reading.locator(".reading-list > li")).toHaveCount(13);
      if (width === 390) await expect(navigation).toBeHidden();
      await page.reload();
      await expect(reading.locator(".heading")).toHaveText("Bibliographie");
      await page.getByRole("link", { name: /Vue d’ensemble/ }).click();
      await expect(
        page.getByRole("heading", { name: "Présentation du cours" }),
      ).toBeVisible();
      await expect(page.locator(".overview-link")).toHaveAttribute(
        "aria-current",
        "page",
      );
      await page.goBack();
      await expect(reading).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      expect(errors).toEqual([]);
    });
  }
}
