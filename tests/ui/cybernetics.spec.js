import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parseSingleFileDeck } from "@svx-deck/core/deck/singleFile";

const { slides } = parseSingleFileDeck(
  readFileSync(
    new URL("../../decks/cybernetics/deck.svx", import.meta.url),
    "utf8",
  ),
);
const course =
  "/introduction-aux-cultures-numeriques/?vue=chapitres&section=cybernetics";

for (const width of [1280, 390]) {
  for (const theme of ["light", "dark"]) {
    test(`Cybernetics integrates slides and readings at ${width}px in ${theme}`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(120000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (value) => localStorage.setItem("dg-theme", value),
        theme,
      );
      const errors = [];
      const missing = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (
          response.url().includes("/slides/cybernetics/") &&
          response.status() >= 400
        )
          missing.push(response.url());
      });
      await page.goto(`${course}&onglet=slides`);
      const iframe = page.locator(
        'iframe[src="/slides/cybernetics/index.html"]',
      );
      await iframe.scrollIntoViewIfNeeded();
      const reader = page.frameLocator(
        'iframe[src="/slides/cybernetics/index.html"]',
      );
      const select = reader.getByLabel("Choisir une slide");
      await expect(select.locator("option")).toHaveCount(slides.length);
      await expect(
        reader.getByRole("heading", { name: "Cybernetics", exact: true }),
      ).toBeVisible();
      await page
        .frames()
        .find((frame) => frame.url().includes("/slides/cybernetics/"))
        .waitForLoadState("networkidle");
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await testInfo.attach(`cybernetics-${width}-${theme}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
      if (width === 1280 && theme === "light") {
        for (let index = 0; index < slides.length; index++) {
          await select.selectOption(String(index));
          await expect(select).toHaveValue(String(index));
          await expect
            .poll(() =>
              reader
                .locator("img")
                .evaluateAll((images) =>
                  images.every(
                    (image) => image.complete && image.naturalWidth > 0,
                  ),
                ),
            )
            .toBe(true);
          for (const video of await reader.locator("video").all())
            await expect
              .poll(() => video.evaluate((element) => element.readyState))
              .toBeGreaterThan(0);
        }
        const progressiveSlide = slides.findIndex(
          (slide) => slide.metadata.steps > 0,
        );
        expect(
          progressiveSlide,
          "Cybernetics includes a slide with progressive steps",
        ).toBeGreaterThanOrEqual(0);
        await select.selectOption(String(progressiveSlide));
        await reader
          .getByRole("button", { name: "Slide ou étape suivante" })
          .click();
        await expect(select).toHaveValue(String(progressiveSlide));
        await expect(reader.locator(".step")).toContainText("Étape 1/");
      }
      await page
        .getByRole("link", { name: "Bibliographie", exact: true })
        .click();
      await expect(page.locator("iframe")).toHaveCount(0);
      await expect(
        page.getByText("The perceptron: A probabilistic model", {
          exact: false,
        }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await testInfo.attach(`cybernetics-readings-${width}-${theme}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
      expect(errors).toEqual([]);
      expect(missing).toEqual([]);
    });
  }
}
