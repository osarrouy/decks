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
            const stroke = getComputedStyle(element, "::before");
            return {
              framed: element.classList.contains("framed"),
              x: bounds.x,
              right: bounds.right,
              top: bounds.top,
              bottom: bounds.bottom,
              stroke: [
                stroke.top,
                stroke.borderTopWidth,
                stroke.borderBottomWidth,
              ],
            };
          });
        });
        for (let index = 0; index < frames.length; index++) {
          const frame = frames[index];
          expect(frame.framed).toBe(true);
          // Page margins follow --space-4 below --narrow and --space-7 above.
          expect(frame.x).toBe(width === 390 ? 16 : 48);
          expect(frame.right).toBe(width - frame.x);
          // Every frame draws its stroke centered on the edge of its box, without taking space.
          expect(frame.stroke).toEqual(["-0.5px", "1px", "1px"]);
          // Each frame starts at the edge of the one before, so both strokes of a junction fall on the same pixels.
          if (index) expect(frame.top).toBeCloseTo(frames[index - 1].bottom, 1);
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
  const dialog = page.getByRole("dialog", { name: "Navigation principale" });
  // The theme switch stays in the header bar; the menu holds the links.
  const toggle = page
    .getByRole("banner")
    .getByRole("switch", { name: "Mode sombre" });
  // Retry until hydration attaches the switch's handler.
  await expect(async () => {
    if ((await toggle.getAttribute("aria-checked")) !== "true")
      await toggle.click();
    await expect(toggle).toBeChecked({ timeout: 500 });
  }).toPass({ timeout: 15_000 });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "L2", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/\/l2\/$/);
  await trigger.click();
  await expect(
    dialog.getByRole("link", { name: "L2", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(toggle).toBeChecked();
  await page.reload();
  await expect(toggle).toBeChecked();
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
  // A suggestion names the current chapter in the draft; the local demonstration answers without the backend.
  const input = dialog.getByRole("textbox", { name: "Ta question" });
  await dialog.getByRole("button", { name: /^Résume le chapitre/ }).click();
  await expect(input).toHaveValue(/^Résume le chapitre « .+ »$/);
  await expect(input).toBeFocused();
  await input.fill("/demo");
  await input.press("Enter");
  await expect(dialog.getByRole("log")).toContainText(
    "Démonstration · Sources fictives",
    { timeout: 15_000 },
  );
  await expect(dialog.getByRole("heading", { level: 2 })).toContainText("Démo");
  await page
    .getByRole("navigation", { name: "Choisir un chapitre", exact: true })
    .getByRole("link")
    .nth(1)
    .click();
  await expect(page).toHaveURL(/section=consensus-sans-tiers-de-confiance/);
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("log")).toContainText("/demo");
  await page.keyboard.press("Escape");
  await expect(launcher).toBeFocused();
  await page.getByRole("link", { name: "university", exact: true }).click();
  await expect(launcher).toHaveCount(0);
  await expect(dialog).toHaveCount(0);
});
