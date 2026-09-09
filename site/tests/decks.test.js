import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { embeddedDecks } from "../scripts/decks.mjs";

const course = (urls) =>
  `titre: Test\nniveau: L1\ndescription: Test\nchapitres:\n  - id: chapter\n    titre: Chapter\n    resume: Test\n    slides:\n${urls.map((url) => `      - titre: Deck\n        url: "${url}"\n        integration: iframe`).join("\n")}\n`;

test("local decks are deduplicated while remote resources stay external", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "course-decks-"));
  try {
    const content = resolve(root, "content"),
      slides = resolve(root, "slides");
    await mkdir(content);
    await mkdir(resolve(slides, "history"), { recursive: true });
    await writeFile(resolve(slides, "history/deck.svx"), "# History");
    await writeFile(
      resolve(content, "test.yaml"),
      course([
        "/slides/history/index.html",
        "/slides/history/index.html#2.1",
        "https://example.org/slides/remote/index.html",
      ]),
    );
    assert.deepEqual(await embeddedDecks(content, slides), ["history"]);
    await writeFile(
      resolve(content, "test.yaml"),
      course(["/slides/missing/index.html"]),
    );
    await assert.rejects(
      embeddedDecks(content, slides),
      /missing source decks\/missing\/deck.svx/,
    );
    await writeFile(
      resolve(content, "test.yaml"),
      course(["/slides/../private/index.html"]),
    );
    await assert.rejects(
      embeddedDecks(content, slides),
      /local decks must use/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
