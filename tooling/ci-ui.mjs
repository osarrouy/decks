import { readFile, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";

// Only rewrite disposable CI checkouts; keep the developer's local links intact.
if (process.env.CI !== "true")
  throw new Error("This command is for CI checkouts only.");
const root = process.cwd();
const checkout = resolve(root, ".ci/interfaces/packages");
const manifest = JSON.parse(await readFile("package.json", "utf8"));
let lock = await readFile("pnpm-lock.yaml", "utf8");
// Point every @dg package linked from the local checkout to the same package in the CI clone.
for (const [name, previous] of Object.entries(manifest.pnpm.overrides)) {
  if (!name.startsWith("@dg/")) continue;
  if (!previous.startsWith("link:"))
    throw new Error(`Expected a local ${name} override.`);
  const target = resolve(checkout, basename(previous));
  const linked = JSON.parse(
    await readFile(resolve(target, "package.json"), "utf8"),
  );
  if (linked.name !== name) throw new Error(`Missing ${name} CI checkout.`);
  let found = false;
  for (const directory of [".", "site", "svx-deck"]) {
    const base = resolve(root, directory);
    const before = `link:${join(relative(base, root), previous.slice(5))}`;
    if (!lock.includes(before)) continue;
    lock = lock.replaceAll(before, `link:${relative(base, target)}`);
    found = true;
  }
  if (!found) throw new Error(`${name} link absent from lockfile.`);
  manifest.pnpm.overrides[name] = `link:${relative(root, target)}`;
}
await writeFile("package.json", `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile("pnpm-lock.yaml", lock);
