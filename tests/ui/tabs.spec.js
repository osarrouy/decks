import { test, expect } from "@playwright/test";

test("Both course tab groups preserve views, chapter and scroll position", async ({
  page,
}) => {
  await page.goto("/l1/");
  const general = page.getByRole("navigation", {
    name: "Informations générales du cours",
  });
  await expect(
    general.getByRole("link", { name: "Présentation", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await general.scrollIntoViewIfNeeded();
  const scrollY = await page.evaluate(() => window.scrollY);
  await general
    .getByRole("link", { name: "Bibliographie générale", exact: true })
    .click();
  await expect(
    general.getByRole("link", { name: "Bibliographie générale", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page).toHaveURL(/vue=bibliographie/);
  expect(
    Math.abs((await page.evaluate(() => window.scrollY)) - scrollY),
  ).toBeLessThanOrEqual(2);
  await page
    .getByRole("navigation", { name: "Choisir un chapitre" })
    .getByRole("link")
    .first()
    .click();
  const resources = page.getByRole("navigation", {
    name: "Ressources du cours",
  });
  await expect(
    resources.getByRole("link", { name: "Résumé", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const chapter = new URL(page.url()).searchParams.get("section");
  expect(chapter).toBeTruthy();
  await resources
    .getByRole("link", { name: "Bibliographie", exact: true })
    .click();
  await expect(
    resources.getByRole("link", { name: "Bibliographie", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const url = new URL(page.url());
  expect(url.searchParams.get("section")).toBe(chapter);
  expect(url.searchParams.get("vue")).toBe("chapitres");
  expect(url.searchParams.get("onglet")).toBe("bibliographie");
  await page.goBack();
  await expect(
    resources.getByRole("link", { name: "Résumé", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

for (const width of [1280, 390]) {
  for (const theme of ["light", "dark"]) {
    test(`Chapter resources stay separate at ${width}px in ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (value) => localStorage.setItem("dg-theme", value),
        theme,
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/l1/?vue=chapitres&section=cybernetics");
      const resources = page.getByRole("navigation", {
        name: "Ressources du cours",
      });
      await expect(resources.getByRole("link")).toHaveText([
        "Résumé",
        "Slides",
        "Bibliographie",
      ]);
      await expect(
        resources.getByRole("link", { name: "Résumé", exact: true }),
      ).toHaveAttribute("aria-current", "page");
      const summary = page.getByRole("heading", {
        name: "Piloter dans l’incertitude : la rétroaction",
      });
      await expect(summary).toBeVisible();
      await expect(page.locator("iframe")).toHaveCount(0);
      await expect(page.locator(".picker")).toHaveCount(0);
      await expect(page.locator("#chapter-title .part")).toHaveText("2/3");
      await expect(page.locator("#chapter-title sup")).toHaveCount(0);
      await expect(page.locator(".content .heading .subtitle")).toHaveCount(0);
      const part =
        width === 390
          ? page.locator(".mobile-chapters summary .part")
          : page.locator(".chapters a[aria-current] .part");
      await expect(part).toHaveText("2/3");
      await expect(part).toHaveCSS(
        "position",
        width === 390 ? "static" : "absolute",
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await page.screenshot({
        path: `/tmp/course-summary-${width}-${theme}.png`,
      });
      await resources
        .getByRole("link", { name: "Slides", exact: true })
        .click();
      await expect(summary).toHaveCount(0);
      await expect(page.locator("iframe")).toHaveAttribute(
        "src",
        "/slides/cybernetics/index.html",
      );
      await resources
        .getByRole("link", { name: "Bibliographie", exact: true })
        .click();
      await expect(page.locator("iframe")).toHaveCount(0);
      await expect(summary).toHaveCount(0);
      await expect(
        page.getByRole("heading", { name: "Bibliographie", exact: true }),
      ).toBeVisible();
      await page.reload();
      await expect(
        resources.getByRole("link", { name: "Bibliographie", exact: true }),
      ).toHaveAttribute("aria-current", "page");
      await resources
        .getByRole("link", { name: "Résumé", exact: true })
        .click();
      await page.getByRole("link", { name: "← Chapitre précédent" }).click();
      await expect(page).toHaveURL(/section=histoire-du-numerique/);
      await expect(
        resources.getByRole("link", { name: "Résumé", exact: true }),
      ).toHaveAttribute("aria-current", "page");
      await expect(page.locator("iframe")).toHaveCount(0);
    });
  }
}
