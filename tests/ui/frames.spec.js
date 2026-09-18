import { test, expect } from "@playwright/test";

for (const width of [1280, 390]) {
  for (const theme of ["light", "dark"]) {
    test(`Page frames join once at ${width}px in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript(
        (theme) => localStorage.setItem("dg-theme", theme),
        theme,
      );
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));

      for (const path of ["/", "/l2/"]) {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        await expect(page.locator("main#main")).toHaveCount(1);
        const frames = await page.locator("main#main").evaluate((main) => {
          const elements = [
            main.previousElementSibling,
            ...main.children,
            main.nextElementSibling,
          ];
          return elements.map((element) => {
            const bounds = element.getBoundingClientRect();
            const frame = getComputedStyle(element, "::before");
            return {
              framed: element.classList.contains("framed"),
              x: bounds.x,
              right: bounds.right,
              top: bounds.top,
              bottom: bounds.bottom,
              topBorder: frame.borderTopWidth,
              crosses: getComputedStyle(element, "::after").backgroundImage,
            };
          });
        });
        for (let index = 0; index < frames.length; index++) {
          const frame = frames[index];
          expect(frame.framed).toBe(true);
          expect(frame.x).toBe(width === 390 ? 16 : 44);
          expect(frame.right).toBe(width - frame.x);
          if (index) {
            expect(frame.top).toBeCloseTo(frames[index - 1].bottom, 1);
            expect(frame.topBorder).toBe("0px");
            // The first gradient draws the following frame's top crosses.
            expect(frame.crosses).toMatch(
              /^linear-gradient\(rgba\(0, 0, 0, 0\)/,
            );
          }
        }
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBe(width);
        await testInfo.attach(
          `${path === "/" ? "home" : "course"}-${theme}-${width}`,
          {
            body: await page.screenshot({ fullPage: true }),
            contentType: "image/png",
          },
        );
      }
      expect(errors).toEqual([]);
    });
  }
}

test("Mobile navigation preserves the active course, theme and keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  const dialog = page.getByRole("dialog", { name: "Main navigation" });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("switch", { name: "Dark mode" }).click();
  await dialog.getByRole("link", { name: "L2", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/\/l2\/$/);
  await trigger.click();
  await expect(
    dialog.getByRole("link", { name: "L2", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(dialog.getByRole("switch", { name: "Dark mode" })).toBeChecked();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.reload();
  await trigger.click();
  await expect(dialog.getByRole("switch", { name: "Dark mode" })).toBeChecked();
});

test("The assistant stays outside the frame and retains conversation across chapters", async ({
  page,
}) => {
  await page.goto("/l2/?section=section-1");
  const launcher = page.getByRole("button", { name: /Assistant IA/ });
  const dialog = page.getByRole("dialog", {
    name: /^Assistant IA/,
  });
  await expect(async () => {
    if (!(await dialog.isVisible())) await launcher.click();
    await expect(dialog).toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 15_000 });
  expect(
    await dialog.evaluate((element) => Boolean(element.closest("main"))),
  ).toBe(false);
  await dialog
    .getByRole("button", { name: "Résumer ce chapitre", exact: true })
    .click();
  await expect(dialog.getByRole("log")).toContainText("Résumer ce chapitre");
  await page
    .getByRole("navigation", { name: "Choisir un chapitre", exact: true })
    .getByRole("link")
    .nth(1)
    .click();
  await expect(page).toHaveURL(/section=consensus-sans-tiers-de-confiance/);
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("log")).toContainText("Résumer ce chapitre");
  await page.keyboard.press("Escape");
  await expect(launcher).toBeFocused();
  await page.getByRole("link", { name: "university", exact: true }).click();
  await expect(launcher).toHaveCount(0);
  await expect(dialog).toHaveCount(0);
});
