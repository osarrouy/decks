import { cp, mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { embeddedDecks } from "./decks.mjs";

const workspace = fileURLToPath(new URL("../../", import.meta.url));
const build = join(workspace, "site/build");
await readFile(join(build, "index.html"));
await readFile(join(build, "404.html"));
for (const id of await embeddedDecks(
  join(workspace, "content"),
  join(workspace, "decks"),
)) {
  const manifest = JSON.parse(
    await readFile(join(build, "slides", id, "svx-deck.json"), "utf8"),
  );
  if (manifest.view !== "embed" || manifest.notes !== false)
    throw new Error(`Deployment requires a note-free embedded export: ${id}`);
}

// An isolated upload contains only the public build and its server configuration.
const output = await mkdtemp(join(tmpdir(), "university-deploy-"));
await cp(new URL("../deploy/", import.meta.url), output, { recursive: true });
await cp(build, join(output, "public"), { recursive: true });
console.log(output);
