import { test, expect } from "@playwright/test";

const apps = [
  {
    name: "cours",
    title: "Page introuvable",
    home: "Retour à l’accueil",
  },
];

for (const app of apps) {
  for (const width of [1280, 390]) {
    for (const theme of ["light", "dark"]) {
      test(`${app.name} error page at ${width}px in ${theme} theme`, async ({
        page,
      }, testInfo) => {
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript(
          (value) => localStorage.setItem("dg-theme", value),
          theme,
        );
        const origin = test.info().project.use.baseURL;
        const response = await page.goto(`${origin}/missing/deep/page`);
        expect(response.status()).toBe(404);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
          app.title,
        );
        await expect(page.locator("main")).toHaveCount(1);
        await expect(page.locator("main#main")).toHaveCount(1);
        await expect(page).toHaveTitle(/404/);
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
          "content",
          "noindex",
        );
        // The inline toggle remains in the DOM when the mobile menu takes over.
        const toggle = page.getByRole("switch", {
          name: "Dark mode",
          includeHidden: true,
        });
        await expect(toggle).toHaveAttribute(
          "aria-checked",
          String(theme === "dark"),
        );
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width);
        await page.evaluate(() => document.fonts.ready);
        await testInfo.attach("error-page", {
          body: await page.screenshot({
            path: testInfo.outputPath("error-page.png"),
            fullPage: true,
          }),
          contentType: "image/png",
        });
        await page.reload();
        await page.waitForLoadState("networkidle");
        await expect(toggle).toHaveAttribute(
          "aria-checked",
          String(theme === "dark"),
        );
        await page.keyboard.press("Tab");
        await expect(page.locator('a[href="#main"]')).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#main$/);
        const home = page.getByRole("link", { name: app.home, exact: true });
        await page.keyboard.press("Tab");
        await expect(home).toBeFocused();
        await expect(home).toHaveCSS("outline-style", "solid");
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${origin}/`);
        await expect(
          page.getByRole("heading", { name: app.title, exact: true }),
        ).toHaveCount(0);
        expect(errors).toEqual([]);
      });
    }
  }

  test(`${app.name} prerender source is readable without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`${test.info().project.use.baseURL}/404`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(app.title);
    await page.getByRole("link", { name: app.home, exact: true }).click();
    await expect(page).toHaveURL(`${test.info().project.use.baseURL}/`);
    await context.close();
  });
}
