import { test, expect } from "@playwright/test";

test("Both course tab groups preserve views, chapter and scroll position", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4175/l1/");
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
    resources.getByRole("link", { name: "Slides", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const chapter = new URL(page.url()).searchParams.get("section");
  expect(chapter).toBeTruthy();
  await resources
    .getByRole("link", { name: "Lectures du chapitre", exact: true })
    .click();
  await expect(
    resources.getByRole("link", { name: "Lectures du chapitre", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const url = new URL(page.url());
  expect(url.searchParams.get("section")).toBe(chapter);
  expect(url.searchParams.get("vue")).toBe("chapitres");
  expect(url.searchParams.get("onglet")).toBe("bibliographie");
  await page.goBack();
  await expect(
    resources.getByRole("link", { name: "Slides", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});
