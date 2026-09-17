import { test, expect } from "@playwright/test";

for (const theme of ["light", "dark"]) {
  test(`Header identity uses identity, identityUrl and app (${theme})`, async ({
    page,
  }) => {
    for (const example of [
      { url: "/", identity: "olivier@sarrouy", href: "/", app: "university" },
    ]) {
      await page.goto(example.url);
      await page.evaluate(
        (value) => (document.documentElement.dataset.theme = value),
        theme,
      );
      const header = page.locator("header").first();
      const identity = header.getByRole("link", {
        name: `${example.identity} >_`,
        exact: true,
      });
      await expect(identity).toHaveText(`${example.identity} >_`);
      await expect(identity).toHaveAttribute("href", example.href);
      const colors = await header.evaluate((element) => {
        const probe = document.createElement("span");
        element.append(probe);
        const result = Object.fromEntries(
          ["text-muted", "text-prominent", "accent"].map((name) => {
            probe.style.color = `var(--${name})`;
            return [name, getComputedStyle(probe).color];
          }),
        );
        probe.remove();
        return result;
      });
      await page.mouse.move(0, 0);
      await expect(identity).toHaveCSS(
        "color",
        colors[example.app ? "text-muted" : "text-prominent"],
      );
      const app = header.getByRole("link", { name: example.app, exact: true });
      if (example.app) {
        await expect(app).toHaveText(example.app);
        await expect(app).toHaveCSS("color", colors["text-prominent"]);
      } else {
        await expect(app).toHaveCount(0);
      }
      await identity.hover();
      await expect(identity).toHaveCSS("color", colors.accent);
      await identity.focus();
      await expect(identity).toHaveCSS("outline-style", "solid");
      if (example.href === "/") {
        const course = header.getByRole("navigation").getByRole("link").first();
        await course.click();
        await expect(course).toHaveAttribute("aria-current", "page");
        await identity.click();
        await expect(page).toHaveURL("/");
      }
    }
  });
}
