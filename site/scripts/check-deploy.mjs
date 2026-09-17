import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const origin = process.argv[2];
if (!origin)
  throw new Error("Usage: node site/scripts/check-deploy.mjs <origin>");
const build = new URL("../build/", import.meta.url);

async function request(path, status = 200, options = {}) {
  const response = await fetch(new URL(path, origin), {
    signal: AbortSignal.timeout(15000),
    ...options,
  });
  assert.equal(response.status, status, path);
  return response;
}

const files = await readdir(build, { recursive: true });
const pages = files.filter((file) => file.endsWith("index.html"));
for (const file of pages) {
  const response = await request(`/${file.replace(/index\.html$/, "")}`);
  assert.match(response.headers.get("content-type"), /text\/html/);
  const html = await response.text();
  assert.equal(html, await readFile(new URL(file, build), "utf8"), file);
}
for (const file of files.filter((file) => file.endsWith("svx-deck.json"))) {
  const manifest = await (await request(`/${file}`)).json();
  assert.equal(manifest.view, "embed", file);
  assert.equal(manifest.notes, false, file);
  assert.ok(manifest.slideCount > 0, file);
}

const missing = await request("/missing/deep/deployment-check", 404);
assert.equal(
  await missing.text(),
  await readFile(new URL("404.html", build), "utf8"),
);
assert.match(missing.headers.get("cache-control"), /must-revalidate/);
await request("/missing/asset.js", 404);

const asset = files.find((file) => /^_app\/immutable\/.*\.js$/.test(file));
assert.ok(asset, "The build contains an immutable JavaScript asset");
const cached = await request(`/${asset}`);
assert.match(cached.headers.get("content-type"), /javascript/);
assert.match(cached.headers.get("cache-control"), /immutable/);
await cached.body.cancel();

const video = files.find((file) => file.endsWith(".mp4"));
if (video) {
  const range = await request(`/${video}`, 206, {
    headers: { Range: "bytes=0-31" },
  });
  assert.match(range.headers.get("content-range"), /^bytes 0-31\//);
  assert.equal((await range.arrayBuffer()).byteLength, 32);
}
console.log(
  `Verified ${pages.length} pages, embedded decks, 404s and assets at ${origin}`,
);
