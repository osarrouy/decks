import { test, expect } from "@playwright/test";

for (const theme of ["light", "dark"]) {
  test(`Course cards show a subtle carousel cue on mobile (${theme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("http://127.0.0.1:4175/");
    await page.evaluate(
      (value) => (document.documentElement.dataset.theme = value),
      theme,
    );
    const cards = page.getByRole("region", {
      name: "Les enseignements",
      exact: true,
    });
    const track = cards.getByRole("group", { name: "Card scrolling" });
    const next = cards.getByRole("button", { name: "Next cards" });
    await expect(next).toBeVisible();
    await cards.scrollIntoViewIfNeeded();
    const cue = await track.evaluate((e) => {
      const bounds = e.getBoundingClientRect();
      const second = e.children[1].getBoundingClientRect();
      return bounds.right - second.left;
    });
    expect(cue).toBeGreaterThan(25);
    expect(cue).toBeLessThan(40);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(320);
    await page.screenshot({ path: `/tmp/dg-cards-mobile-${theme}.png` });
    await next.click();
    await expect
      .poll(() => track.evaluate((e) => e.scrollLeft))
      .toBeGreaterThan(100);
    const link = cards.locator("[data-card]").last();
    const href = await link.getAttribute("href");
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(href));
  });
}
