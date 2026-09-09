import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { prefixStaticAssets } from "../src/lib/vite/staticAssets.mjs";

test("subpath exports prefix real assets across Markdown, component props and CSS", async () => {
  const root = await mkdtemp(join(tmpdir(), "svx-assets-"));
  try {
    await writeFile(join(root, "image.png"), "");
    assert.equal(
      prefixStaticAssets(
        '![Alt](/image.png) <Persona picture="/image.png" /> url(/image.png?v=1#detail)',
        root,
        "/slides/history",
      ),
      '![Alt](/slides/history/image.png) <Persona picture="/slides/history/image.png" /> url(/slides/history/image.png?v=1#detail)',
    );
    const external =
      '<img src="https://example.org/image.png" /><a href="/chapter">route</a> url(//cdn.example.org/image.png)';
    assert.equal(
      prefixStaticAssets(external, root, "/slides/history"),
      external,
    );
    assert.equal(prefixStaticAssets('"/image.png"', root, ""), '"/image.png"');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
