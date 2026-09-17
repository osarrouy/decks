import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parseSingleFileDeck } from "@svx-deck/core/deck/singleFile";

const { slides } = parseSingleFileDeck(
  readFileSync(
    new URL("../../decks/history-1/deck.svx", import.meta.url),
    "utf8",
  ),
);

const course =
  "/introduction-aux-cultures-numeriques/?vue=chapitres&section=histoire-du-numerique&onglet=slides";

test("History deck loads its slides and assets, preserves steps, and supports fullscreen", async ({
  page,
}) => {
  const errors = [];
  const missing = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().includes("/slides/history-1/") &&
      response.status() >= 400
    )
      missing.push(response.url());
  });
  await page.goto(course);
  const reader = page.frameLocator(
    'iframe[src="/slides/history-1/index.html"]',
  );
  const select = reader.getByLabel("Choisir une slide");
  await expect(select.locator("option")).toHaveCount(slides.length);
  // Live decks compile on demand; wait for their client runtime before clicking.
  const frame = page
    .frames()
    .find((frame) => frame.url().includes("/slides/history-1/"));
  await frame.waitForLoadState("networkidle");
  const next = reader.getByRole("button", { name: "Slide ou étape suivante" });
  await next.click();
  await expect(select).toHaveValue("1");
  await expect(reader.getByRole("img", { name: "Boulier" })).toBeVisible();
  await expect
    .poll(() =>
      reader
        .locator("img")
        .first()
        .evaluate((image) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  const previous = reader.getByRole("button", {
    name: "Slide ou étape précédente",
  });
  await previous.focus();
  await previous.press("Space");
  await expect(select).toHaveValue("0");
  // Turing machine: advancing reveals a step without changing slide.
  await select.selectOption("17");
  await next.click();
  await expect(select).toHaveValue("17");
  await expect(reader.locator(".step")).toContainText("Étape 1/");
  // Exercise every authored slide, including local components and videos.
  for (let index = 0; index < slides.length; index++) {
    await select.selectOption(String(index));
    await expect(select).toHaveValue(String(index));
    await expect
      .poll(() =>
        reader
          .locator("img")
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
      )
      .toBe(true);
    for (const video of await reader.locator("video").all()) {
      await expect
        .poll(() => video.evaluate((element) => element.readyState))
        .toBeGreaterThan(0);
    }
  }
  await expect(next).toBeDisabled();
  await select.selectOption("0");
  await page
    .getByRole("button", { name: "Afficher les slides en plein écran" })
    .click();
  await expect
    .poll(() => page.evaluate(() => Boolean(document.fullscreenElement)))
    .toBe(true);
  await page.getByRole("button", { name: "Quitter le plein écran" }).click();
  await expect
    .poll(() => page.evaluate(() => Boolean(document.fullscreenElement)))
    .toBe(false);
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
});

test("Embedded slides fit mobile and chapter changes unmount the deck", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(course);
  const reader = page.frameLocator("iframe");
  await expect(reader.getByLabel("Choisir une slide")).toHaveValue("0");
  await page
    .locator(".reader")
    .evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(
    reader.getByRole("heading", { name: "Histoire du numérique" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await expect(
    reader.getByRole("button", { name: "Slide ou étape suivante" }),
  ).toBeVisible();
  await page.screenshot({ path: "/tmp/course-slides-mobile.png" });
  await page.getByRole("link", { name: "Chapitre suivant →" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "/slides/cybernetics/index.html",
  );
  await page.locator("iframe").scrollIntoViewIfNeeded();
  await expect(
    reader.getByRole("heading", { name: "Cybernetics", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Chapitre suivant →" }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.getByText("Les slides arrivent ici.")).toBeVisible();
});
