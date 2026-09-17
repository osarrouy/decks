import { readFile, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

// Only rewrite disposable CI checkouts; keep the developer's local link intact.
if (process.env.CI !== "true")
  throw new Error("This command is for CI checkouts only.");
const root = process.cwd();
const target = resolve(root, ".ci/interfaces/packages/ui");
const ui = JSON.parse(await readFile(resolve(target, "package.json"), "utf8"));
if (ui.name !== "@dg/ui") throw new Error("Missing @dg/ui CI checkout.");
const manifest = JSON.parse(await readFile("package.json", "utf8"));
const previous = manifest.pnpm.overrides["@dg/ui"];
if (!previous.startsWith("link:"))
  throw new Error("Expected a local @dg/ui override.");
let lock = await readFile("pnpm-lock.yaml", "utf8");
const replacements = new Map(
  [".", "site", "svx-deck"].map((directory) => {
    const base = resolve(root, directory);
    return [
      `link:${join(relative(base, root), previous.slice(5))}`,
      `link:${relative(base, target)}`,
    ];
  }),
);
for (const [before, after] of replacements) {
  if (!lock.includes(before))
    throw new Error(`UI link absent from lockfile: ${before}`);
  lock = lock.replaceAll(before, after);
}
manifest.pnpm.overrides["@dg/ui"] = `link:${relative(root, target)}`;
await writeFile("package.json", `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile("pnpm-lock.yaml", lock);
