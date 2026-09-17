import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("Mobile chapters support keyboard navigation, dismissal and course history", async ({
  page,
}) => {
  await page.goto("/l1/?onglet=bibliographie");
  const trigger = page.locator(".mobile-chapters summary");
  const menu = page.getByRole("navigation", {
    name: "Choisir un chapitre sur mobile",
  });
  // URL-derived selection confirms that the page has hydrated.
  await expect(trigger).toContainText("Histoire du numérique");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(menu.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Space");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const nextChapter = menu.getByRole("link").nth(1);
  await expect(nextChapter).toBeFocused();
  const destination = new URL(
    await nextChapter.getAttribute("href"),
    page.url(),
  );
  const scrollY = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(destination.href);
  await expect(menu).toBeHidden();
  await expect(trigger).toContainText("Cybernetics");
  expect(new URL(page.url()).searchParams.get("onglet")).toBe("bibliographie");
  expect(
    Math.abs((await page.evaluate(() => window.scrollY)) - scrollY),
  ).toBeLessThanOrEqual(2);
  await trigger.click();
  await expect(nextChapter).toHaveAttribute("aria-current", "page");
  await expect(menu.locator("[aria-current]")).toHaveCount(1);
  await page.getByRole("heading", { level: 1 }).click();
  await expect(menu).toBeHidden();
  await page.goBack();
  await expect(trigger).toContainText("Histoire du numérique");
  await trigger.click();
  await menu.getByRole("link").last().press("Tab");
  await expect(menu).toBeHidden();
});

for (const theme of ["light", "dark"]) {
  test(`Mobile chapter popup fits narrow screens with readable wrapped titles (${theme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/l1/?vue=chapitres&section=information-et-communication");
    await expect(page.locator(".mobile-chapters summary")).toContainText(
      "Information et communication",
    );
    await page.evaluate(
      (value) => (document.documentElement.dataset.theme = value),
      theme,
    );
    await page.locator(".mobile-chapters summary").click();
    const menu = page.getByRole("navigation", {
      name: "Choisir un chapitre sur mobile",
    });
    await expect(menu).toBeVisible();
    const bounds = await menu.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(700);
    for (const link of await menu.getByRole("link").all()) {
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
      expect(
        await link.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
      ).toBe(true);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(320);
    await page.setViewportSize({ width: 320, height: 620 });
    await expect
      .poll(async () => {
        const resized = await menu.boundingBox();
        return resized.y + resized.height;
      })
      .toBeLessThanOrEqual(620);
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await page.locator(".mobile-chapters summary").click();
    await expect(menu).toBeVisible();
    await expect
      .poll(async () => {
        const reopened = await menu.boundingBox();
        return reopened.y + reopened.height;
      })
      .toBeLessThanOrEqual(620);
  });
}
