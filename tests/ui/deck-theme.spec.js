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

for (const width of [1280, 390]) {
  test(`embedded decks follow the shared design and stored preference at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(course);
    const reader = page.frameLocator(
      'iframe[src="/slides/history-1/index.html"]',
    );
    const surface = reader.locator(".slide");
    await expect(surface).toBeVisible();
    await expect(
      reader.getByLabel("Choisir une slide").locator("option"),
    ).toHaveCount(slides.length);
    const toggle = page
      .getByRole("switch", { name: "Dark mode", includeHidden: true })
      .first();
    for (const dark of [false, true]) {
      if ((await toggle.getAttribute("aria-checked")) !== String(dark)) {
        if (width < 1100) {
          await page.getByRole("button", { name: "Menu", exact: true }).click();
          await page
            .getByRole("dialog", { name: "Main navigation" })
            .getByRole("switch", { name: "Dark mode" })
            .click();
          await page.keyboard.press("Escape");
        } else await toggle.click();
      }
      await expect(
        reader.getByRole("switch", { name: "Dark mode" }),
      ).toHaveAttribute("aria-checked", String(dark));
      const background = await page
        .locator("body")
        .evaluate((element) => getComputedStyle(element).backgroundColor);
      await expect(surface).toHaveCSS("background-color", background);
      await expect(surface).toHaveCSS("font-family", /Helvetica|Arial/);
      await expect(surface.locator("h1").first()).toHaveCSS(
        "font-family",
        /Instrument Serif/,
      );
      const scale = await surface.evaluate((element) => {
        const heading = element.querySelector("h1");
        const control = document.querySelector("nav button");
        const read = () => ({
          base: parseFloat(
            getComputedStyle(element).getPropertyValue("--font-size-base"),
          ),
          heading: parseFloat(getComputedStyle(heading).fontSize),
          body: getComputedStyle(document.body).fontSize,
          root: getComputedStyle(document.documentElement).fontSize,
          control: getComputedStyle(control).fontSize,
          width: element.getBoundingClientRect().width,
        });
        const before = read();
        element.style.setProperty("--font-size-base", `${before.base * 2}px`);
        const after = read();
        element.style.removeProperty("--font-size-base");
        return { before, after };
      });
      expect(scale.before.base).toBeCloseTo(
        Math.max(12, Math.min(32, scale.before.width * 0.02)),
        2,
      );
      expect(scale.after.heading).toBeCloseTo(scale.before.heading * 2, 2);
      expect(scale.after.body).toBe(scale.before.body);
      expect(scale.after.root).toBe(scale.before.root);
      expect(scale.after.control).toBe(scale.before.control);
      expect(scale.after.width).toBe(scale.before.width);
      const corners = surface.locator(":scope > .corners.crossed");
      await expect(corners).toHaveCount(1);
      await expect(corners).toHaveCSS("pointer-events", "none");
      const decoration = await corners.evaluate((element) => {
        const style = getComputedStyle(element);
        const strokes = getComputedStyle(element, "::after");
        const frame = getComputedStyle(element, "::before");
        const cross = style.getPropertyValue("--cross").trim();
        const border = style.getPropertyValue("--border-width").trim();
        return {
          actual: strokes.backgroundSize,
          expected: Array(4)
            .fill(`${cross} ${border}, ${border} ${cross}`)
            .join(", "),
          oldCrosses: getComputedStyle(element.parentElement, "::before")
            .content,
          frameVisible: frame.display !== "none",
          frameWidth: style.borderTopWidth,
          borderWidth: border,
          extensions: [...element.querySelectorAll(".extension")].map(
            (extension) => {
              const line = getComputedStyle(extension);
              return (
                line.display === "block" &&
                line.backgroundColor === frame.borderTopColor
              );
            },
          ),
        };
      });
      expect(decoration.actual).toBe(decoration.expected);
      expect(decoration.oldCrosses).toBe("none");
      expect(decoration.frameVisible).toBe(true);
      expect(decoration.frameWidth).toBe(decoration.borderWidth);
      expect(decoration.extensions).toEqual(Array(8).fill(true));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await surface.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.reload();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(
      reader.getByRole("switch", { name: "Dark mode" }),
    ).toHaveAttribute("aria-checked", "true");
    // Changes made inside the embedded reader also reach the portal through storage.
    await reader.getByRole("switch", { name: "Dark mode" }).click();
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await reader.getByLabel("Choisir une slide").selectOption("2");
    const portrait = reader.getByRole("img", { name: "Blaise Pascal" });
    await expect(portrait).toBeVisible();
    expect((await portrait.boundingBox()).height).toBeGreaterThan(20);
    expect(errors).toEqual([]);
  });
}
