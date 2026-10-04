import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parseSingleFileDeck } from "@svx-deck/core/deck/singleFile";

const deckId = "social-networks-structure";
const { slides } = parseSingleFileDeck(
  readFileSync(
    new URL(`../../decks/${deckId}/deck.svx`, import.meta.url),
    "utf8",
  ),
);
const course =
  "/introduction-aux-cultures-numeriques/?vue=chapitres&section=distribution-de-la-visibilite&onglet=slides";
const { slides: introductionSlides } = parseSingleFileDeck(
  readFileSync(
    new URL("../../decks/social-networks/deck.svx", import.meta.url),
    "utf8",
  ),
);

for (const width of [1280, 390]) {
  for (const dark of [false, true]) {
    test(`visibility deck preserves media and steps at ${width}px in ${dark ? "dark" : "light"} mode`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({
        colorScheme: dark ? "dark" : "light",
        reducedMotion: "reduce",
      });
      const errors = [];
      const missing = [];
      const overflow = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (
          response.url().includes(`/slides/${deckId}/`) &&
          response.status() >= 400
        )
          missing.push(response.url());
      });
      await page.goto(course);
      const reader = page.frameLocator(
        `iframe[src="/slides/${deckId}/index.html"]`,
      );
      const select = reader.getByLabel("Choisir une slide");
      await expect(select.locator("option")).toHaveCount(slides.length);
      const frame = page
        .frames()
        .find((frame) => frame.url().includes(`/slides/${deckId}/`));
      await frame.waitForLoadState("networkidle");
      await expect(
        reader.getByRole("heading", {
          name: "La structure de nos réseaux sociaux",
          exact: true,
        }),
      ).toBeVisible();
      const toggle = reader.getByRole("switch", { name: "Dark mode" });
      if ((await toggle.getAttribute("aria-checked")) !== String(dark)) {
        await toggle.click();
      }
      await expect(toggle).toHaveAttribute("aria-checked", String(dark));
      for (let index = 0; index < slides.length; index++) {
        await select.selectOption(String(index));
        await expect(select).toHaveValue(String(index));
        await reader.locator(".slide").screenshot({
          path: `/tmp/social-networks-reorganization/slide-${width}-${dark ? "dark" : "light"}-${String(index).padStart(2, "0")}.png`,
        });
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
        for (const video of await reader.locator("video").all()) {
          await expect
            .poll(() => video.evaluate((element) => element.readyState))
            .toBeGreaterThan(0);
        }
        const outside = await reader.locator(".slide").evaluate((element) => {
          const surface = element.getBoundingClientRect();
          return [...element.children]
            .filter((child) => !child.classList.contains("corners"))
            .filter((child) => {
              const bounds = child.getBoundingClientRect();
              return (
                bounds.width &&
                (bounds.left < surface.left - 1 ||
                  bounds.right > surface.right + 1 ||
                  bounds.top < surface.top - 1 ||
                  bounds.bottom > surface.bottom + 1)
              );
            })
            .map((child) => ({
              tag: child.tagName,
              className: child.className,
            }));
        });
        // Preserve legacy slide geometry; inspect mobile clipping in the captures.
        if (width === 1280 && outside.length) overflow.push({ index, outside });
      }
      await expect(
        reader.getByRole("button", { name: "Slide ou étape suivante" }),
      ).toBeDisabled();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await frame.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.locator("iframe").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `/tmp/social-networks-reorganization/visibility-${width}-${dark ? "dark" : "light"}.png`,
      });
      await page.getByRole("link", { name: "Chapitre suivant →" }).click();
      await expect(page.locator("iframe")).toHaveAttribute(
        "src",
        "/slides/social-networks-virality/index.html",
      );
      await page.getByRole("link", { name: "Chapitre suivant →" }).click();
      await expect(page.locator("iframe")).toHaveAttribute(
        "src",
        "/slides/social-networks-polarization/index.html",
      );
      expect(overflow).toEqual([]);
      expect(errors).toEqual([]);
      expect(missing).toEqual([]);
    });
  }
}

for (const width of [1280, 390]) {
  for (const dark of [false, true]) {
    test(`publication sequence renders in the introduction at ${width}px in ${dark ? "dark" : "light"} mode`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({
        colorScheme: dark ? "dark" : "light",
        reducedMotion: "reduce",
      });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(
        course.replace(
          "distribution-de-la-visibilite",
          "reseaux-sociaux-numeriques",
        ),
      );
      const reader = page.frameLocator(
        'iframe[src="/slides/social-networks/index.html"]',
      );
      const select = reader.getByLabel("Choisir une slide");
      await expect(select.locator("option")).toHaveCount(
        introductionSlides.length,
      );
      const frame = page
        .frames()
        .find((frame) => frame.url().includes("/slides/social-networks/"));
      await frame.waitForLoadState("networkidle");
      const toggle = reader.getByRole("switch", { name: "Dark mode" });
      if ((await toggle.getAttribute("aria-checked")) !== String(dark))
        await toggle.click();
      await expect(toggle).toHaveAttribute("aria-checked", String(dark));
      const next = reader.getByRole("button", {
        name: "Slide ou étape suivante",
      });
      const start =
        introductionSlides.findIndex((slide) => slide.id === "clay-shirky") - 1;
      for (let index = start; index < introductionSlides.length; index++) {
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
        await reader.locator(".slide").screenshot({
          path: `/tmp/publication-sequence/${width}-${dark ? "dark" : "light"}-${index}.png`,
        });
      }
      const powerLawIndex = introductionSlides.findIndex(
        (slide) => slide.id === "power-law",
      );
      expect(powerLawIndex).toBeGreaterThan(-1);
      await select.selectOption(String(powerLawIndex));
      const chart = reader.locator(".power-law");
      const pareto = chart.locator(".pareto-layer");
      await expect(pareto).toHaveAttribute("data-visible", "false");
      await next.focus();
      await expect(next).toBeFocused();
      await next.press("Space");
      await expect(select).toHaveValue(String(powerLawIndex));
      await expect(pareto).toHaveAttribute("data-visible", "true");
      await expect(pareto).toHaveCSS("transition-duration", "0s");
      await expect(chart).toContainText("≈ 80 %");
      await chart.screenshot({
        path: `/tmp/publication-sequence/power-law-${width}-${dark}-step1.png`,
      });
      await next.press("Space");
      await expect(select).toHaveValue(String(powerLawIndex));
      await expect(reader.locator(".step")).toContainText("Étape 2/");
      await expect(chart).toContainText("≈ 92 %");
      await chart.screenshot({
        path: `/tmp/publication-sequence/power-law-${width}-${dark}-step2.png`,
      });
      const chartFits = await chart.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const slide = element.closest(".slide").getBoundingClientRect();
        return (
          bounds.left >= slide.left - 1 &&
          bounds.right <= slide.right + 1 &&
          bounds.top >= slide.top - 1 &&
          bounds.bottom <= slide.bottom + 1
        );
      });
      expect(chartFits).toBe(true);
      const publicationIndex = introductionSlides.findIndex(
        (slide) => slide.id === "publication-filter",
      );
      await select.selectOption(String(publicationIndex));
      const diagram = reader.locator("figure[data-mode]");
      const filter = diagram.locator(".filter");
      const audienceCount = await diagram.locator(".audience rect").count();
      const visibleCount = () =>
        diagram
          .locator(".content")
          .evaluateAll(
            (contents) =>
              contents.filter(
                (content) => Number(getComputedStyle(content).opacity) > 0.99,
              ).length,
          );
      await expect(diagram).toHaveAttribute("data-mode", "filter-first");
      const selectedCount = await visibleCount();
      const filterBefore = (await filter.boundingBox()).x;
      await expect(filter).toHaveCSS("transition-duration", "0s");
      await diagram.screenshot({
        path: `/tmp/publication-filter-component/${width}-${dark ? "dark" : "light"}-before.png`,
      });
      await next.focus();
      await expect(next).toBeFocused();
      await next.press("Space");
      await expect(select).toHaveValue(String(publicationIndex));
      await expect(diagram).toHaveAttribute("data-mode", "publish-first");
      expect(await visibleCount()).toBeGreaterThan(selectedCount * 10);
      expect((await filter.boundingBox()).x).toBeGreaterThan(filterBefore);
      await expect(diagram.locator(".audience rect")).toHaveCount(
        audienceCount,
      );
      await diagram.screenshot({
        path: `/tmp/publication-filter-component/${width}-${dark ? "dark" : "light"}-after.png`,
      });
      await reader
        .getByRole("button", { name: "Slide ou étape précédente" })
        .click();
      await expect(diagram).toHaveAttribute("data-mode", "filter-first");
      expect(await visibleCount()).toBe(selectedCount);
      const fits = await diagram.evaluate((element) => {
        const content = element.getBoundingClientRect();
        const surface = element.closest(".slide").getBoundingClientRect();
        return (
          content.left >= surface.left &&
          content.right <= surface.right + 1 &&
          content.top >= surface.top &&
          content.bottom <= surface.bottom + 1
        );
      });
      expect(fits).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test("the introduction renders its final authored slide and opens the merged chapter next", async ({
  page,
}) => {
  await page.goto(
    course.replace(
      "distribution-de-la-visibilite",
      "reseaux-sociaux-numeriques",
    ),
  );
  const reader = page.frameLocator(
    'iframe[src="/slides/social-networks/index.html"]',
  );
  const select = reader.getByLabel("Choisir une slide");
  const options = select.locator("option");
  await expect(options).toHaveCount(introductionSlides.length);
  const frame = page
    .frames()
    .find((frame) => frame.url().includes("/slides/social-networks/"));
  await frame.waitForLoadState("networkidle");
  await select.selectOption({ index: (await options.count()) - 1 });
  await expect(select).toHaveValue(String(introductionSlides.length - 1));
  const finalHeading = introductionSlides
    .at(-1)
    .content.match(/^#+\s+(.+)$/m)[1];
  await expect(
    reader.getByRole("heading", { name: finalHeading }),
  ).toBeVisible();
  await expect(
    reader.getByRole("button", { name: "Slide ou étape suivante" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Chapitre suivant →" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    `/slides/${deckId}/index.html`,
  );
});

test("publication filtering animates forward and restores the requested state after reload", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const index = introductionSlides.findIndex(
    (slide) => slide.id === "publication-filter",
  );
  const url = `/slides/social-networks/index.html#${index + 1}.0`;
  await page.goto(url);
  const diagram = page.locator("figure[data-mode]");
  const filter = diagram.locator(".filter");
  await expect(diagram).toHaveAttribute("data-mode", "filter-first");
  await expect(filter).toHaveCSS("transition-duration", "0.9s");
  await page.getByRole("button", { name: "Slide ou étape suivante" }).click();
  await expect(diagram).toHaveAttribute("data-mode", "publish-first");
  await expect
    .poll(() => filter.evaluate((element) => element.getAnimations().length))
    .toBeGreaterThan(0);
  await filter.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished)),
  );
  await page.reload();
  await expect(diagram).toHaveAttribute("data-mode", "publish-first");
  await page.getByRole("button", { name: "Slide ou étape précédente" }).click();
  await expect(diagram).toHaveAttribute("data-mode", "filter-first");
});

for (const width of [1280, 390]) {
  for (const theme of ["light", "dark"]) {
    test(`course summaries and readings follow the deck split at ${width}px in ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (value) => localStorage.setItem("dg-theme", value),
        theme,
      );
      await page.goto(
        course
          .replace(
            "distribution-de-la-visibilite",
            "reseaux-sociaux-numeriques",
          )
          .replace("onglet=slides", "onglet=resume"),
      );
      await page.waitForLoadState("networkidle");
      await expect(
        page.getByRole("heading", {
          name: "Publier, puis filtrer",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "Concentration de la visibilité et loi de puissance",
          exact: true,
        }),
      ).toBeVisible();
      await page.screenshot({
        path: `/tmp/social-networks-architecture/summary-${width}-${theme}.png`,
        fullPage: true,
      });
      await page
        .getByRole("navigation", { name: "Ressources du cours" })
        .getByRole("link", { name: "Bibliographie", exact: true })
        .click();
      const readings = page.getByRole("region", {
        name: "Bibliographie",
        exact: true,
      });
      await expect(readings).toContainText("Shirky");
      await expect(readings).toContainText("Clauset");
      await expect(readings.locator(".reading-list > li")).toHaveCount(6);
      await page.screenshot({
        path: `/tmp/social-networks-architecture/bibliography-${width}-${theme}.png`,
        fullPage: true,
      });
      if (width === 390) await page.locator(".mobile-chapters summary").click();
      const chapters = page.getByRole("navigation", {
        name:
          width === 390
            ? "Choisir un chapitre sur mobile"
            : "Choisir un chapitre",
        exact: true,
      });
      await chapters
        .getByRole("link", {
          name: /Structure des réseaux et classement algorithmique/,
        })
        .click();
      await expect(page).toHaveURL(/section=distribution-de-la-visibilite/);
      await expect(readings.locator(".reading-list > li")).toHaveCount(12);
      await expect(readings).toContainText("Barabási");
      await expect(readings).toContainText("Bucher");
      await expect(readings).not.toContainText("Shirky");
      await page
        .getByRole("navigation", { name: "Ressources du cours" })
        .getByRole("link", { name: "Résumé", exact: true })
        .click();
      await expect(
        page.getByRole("heading", {
          name: "Représenter un réseau",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "Modération et recommandation",
          exact: true,
        }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    });
  }
}
