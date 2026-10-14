import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(
  new URL("../../svx-deck/package.json", import.meta.url),
);
const tokens = readFileSync(require.resolve("@dg/ui/tokens.css"), "utf8");
const base = readFileSync(require.resolve("@dg/ui/base.css"), "utf8").replace(
  /@font-face\s*\{[\s\S]*?\}/g,
  "",
);
const theme = readFileSync(
  new URL("../../svx-deck/theme/default.css", import.meta.url),
  "utf8",
);

for (const mode of ["light", "dark"]) {
  test(`slides inherit DG foundations and respect embedded typography in ${mode}`, async ({
    page,
  }) => {
    const content = `<h2>A heading</h2>
      <ul><li>First item<ul><li>Nested item</li></ul></li><li>Second item</li></ul>
      <div class="ui" style="--ui-font-size: 19px; --ui-line-height: 1.75"><p>Interface text</p></div>
      <div style="font-size: 23px; line-height: 1.4"><p>Component-owned text</p></div>`;
    await page.setContent(`<style>${tokens}${base}${theme}</style>
      <section id="reference" class="typescale formatted" style="--font-size-base: 1rem">${content}</section>
      <section id="slide" class="slide typescale formatted" data-slide-surface style="--font-size-base: 1rem">${content}</section>`);
    await page.evaluate(
      (value) => (document.documentElement.dataset.theme = value),
      mode,
    );
    const read = (root) =>
      [...root.querySelectorAll("h2, ul, li, p")].map((element) => {
        const style = getComputedStyle(element);
        return {
          tag: element.tagName,
          font: style.fontFamily,
          size: style.fontSize,
          weight: style.fontWeight,
          tracking: style.letterSpacing,
          color: style.color,
          display: style.display,
          indent: style.paddingInlineStart,
          marker: style.listStyleType,
          lineHeight: element.tagName === "H2" ? null : style.lineHeight,
        };
      });
    expect(await page.locator("#slide").evaluate(read)).toEqual(
      await page.locator("#reference").evaluate(read),
    );
    await expect(page.locator("#slide .ui p")).toHaveCSS("font-size", "19px");
    await expect(page.locator("#slide > div:last-child p")).toHaveCSS(
      "font-size",
      "23px",
    );
  });
}

test("the slide base follows its view, not the slide or nested containers", async ({
  page,
}) => {
  await page.setContent(`<style>${tokens}${base}${theme}</style>
    <div style="width: 1000px; height: 560px; container-type: inline-size">
      <section class="slide typescale" data-slide-surface>
        <p id="reading">Reading</p>
        <div style="width: 100px; container-type: inline-size"><h2 id="nested">Heading</h2></div>
      </section>
    </div>`);
  await expect(page.locator("#reading")).toHaveCSS("font-size", "20px");
  await expect(page.locator("#nested")).toHaveCSS("font-size", "40px");
});
