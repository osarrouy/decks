import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  readdir,
  rm,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import {
  parseSingleFileDeck,
  renderGeneratedSlide,
} from "../src/lib/deck/singleFile.mjs";
import { svxDeckSingleFileDeck } from "../src/lib/vite/index.mjs";
import { ensureRuntimeApp, loadDeckConfig } from "../src/runtime/generate.mjs";

const source = `---
title: Fixture
theme: missing-custom-theme
---
# Repeated title
<Persona name="Example" />
--- notes
Visible revision note.

:::comment
Private presentation direction.
:::

:::example
Preserved example.
:::
---
<!-- slide: steps=2 -->
# Repeated title
Second slide.
`;

async function fixture(run) {
  const temp = await mkdtemp(resolve(tmpdir(), "svx-deck-test-"));
  const collection = resolve(temp, "decks");
  const root = resolve(collection, "fixture");
  try {
    await mkdir(root, { recursive: true });
    await writeFile(resolve(root, "deck.svx"), source);
    await run(root, collection);
    assert.equal(await readFile(resolve(root, "deck.svx"), "utf8"), source);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

test("the shared parser preserves order, steps and notes with repeated titles", () => {
  const deck = parseSingleFileDeck(source);
  assert.equal(deck.config.title, "Fixture");
  assert.deepEqual(
    deck.slides.map((slide) => [slide.order, slide.metadata.steps]),
    [
      [1, 0],
      [2, 2],
    ],
  );
  assert.match(deck.slides[0].notes, /Private presentation direction/);
  assert.match(
    renderGeneratedSlide(deck.slides[0]),
    /@svx-deck\/core\/components\/Persona.svelte/,
  );
  assert.match(
    renderGeneratedSlide(deck.slides[0]),
    /@svx-deck\/core\/components\/FramedImage.svelte/,
  );
});

test("shared component imports replace matching manual imports", () => {
  const rendered = renderGeneratedSlide({
    metadata: {},
    content: `<script>
  import FramedImage from '@svx-deck/core/components/FramedImage.svelte'
</script>
<FramedImage src="/example.jpg" alt="Example" />`,
  });

  assert.equal(
    rendered.match(
      /import FramedImage from '@svx-deck\/core\/components\/FramedImage\.svelte'/g,
    )?.length,
    1,
  );
});

test("generation filters student notes and removes stale output without editing sources", async () =>
  fixture(async (root) => {
    const plugin = svxDeckSingleFileDeck({
      root,
      outDir: ".generated",
      notesAudience: "student",
    });
    plugin.configResolved({ root });
    await mkdir(resolve(root, ".generated"));
    await writeFile(
      resolve(root, ".generated/stale.notes.md"),
      "Old private notes",
    );
    await plugin.buildStart();
    assert.deepEqual((await readdir(resolve(root, ".generated"))).sort(), [
      "001-repeated-title.notes.md",
      "001-repeated-title.svx",
      "002-repeated-title.svx",
    ]);
    const notes = await readFile(
      resolve(root, ".generated/001-repeated-title.notes.md"),
      "utf8",
    );
    assert.match(notes, /Visible revision note/);
    assert.match(notes, /Preserved example/);
    assert.doesNotMatch(notes, /Private presentation direction|:::comment/);
  }));

test("shared YAML, frontmatter and local YAML follow the documented precedence", async () =>
  fixture(async (root, collection) => {
    assert.equal((await loadDeckConfig(root)).title, "Fixture");
    await writeFile(
      resolve(collection, "deck.config.yaml"),
      [
        "title: Shared fallback",
        "description: Shared description",
        "template:",
        "  source: deck.svx",
        '  notesSeparator: "--- shared notes"',
        "",
      ].join("\n"),
    );
    const inherited = await loadDeckConfig(root);
    assert.equal(inherited.title, "Fixture");
    assert.equal(inherited.description, "Shared description");
    assert.equal(inherited.template.source, "deck.svx");
    assert.equal(inherited.template.slideSeparator, "---");
    assert.equal(inherited.template.notesSeparator, "--- shared notes");

    const custom = [
      "title: Configured",
      "template:",
      '  notesSeparator: "--- notes"',
      "",
    ].join("\n");
    await writeFile(resolve(root, "deck.config.yaml"), custom);
    const config = await loadDeckConfig(root);
    assert.equal(config.title, "Configured");
    assert.equal(config.description, "Shared description");
    assert.equal(config.template.source, "deck.svx");
    assert.equal(config.template.notesSeparator, "--- notes");
    assert.equal(
      await readFile(resolve(root, "deck.config.yaml"), "utf8"),
      custom,
    );
  }));

test("YAML configuration rejects unsupported keys and legacy TypeScript", async () =>
  fixture(async (root) => {
    await writeFile(resolve(root, "deck.config.yaml"), "theme: gallery\n");
    await assert.rejects(
      loadDeckConfig(root),
      /unknown configuration key "theme"/,
    );

    await rm(resolve(root, "deck.config.yaml"));
    await writeFile(resolve(root, "deck.config.ts"), "export default {}\n");
    await assert.rejects(
      loadDeckConfig(root),
      /use deck\.config\.yaml instead/,
    );
  }));

test("runtime generation replaces stale routes and controls the presenter route", async () =>
  fixture(async (root) => {
    const embed = await ensureRuntimeApp(root, {
      view: "embed",
      dev: true,
      base: "/decks/test",
    });
    const loader = await readFile(
      resolve(embed.appRoot, "src/lib/deck.ts"),
      "utf8",
    );
    assert.match(loader, /const includeNotes = false/);
    await assert.rejects(
      access(resolve(embed.appRoot, "src/routes/presenter/+page.svelte")),
    );
    const presenter = await ensureRuntimeApp(root, {
      view: "deck",
      presenter: true,
    });
    assert.equal(presenter.appRoot, resolve(root, ".svx-deck.nosync/deck"));
    await access(
      resolve(presenter.appRoot, "src/routes/presenter/+page.svelte"),
    );
    await writeFile(
      resolve(presenter.appRoot, "src/routes/presenter/+page 3.svelte"),
      "stale route",
    );
    await ensureRuntimeApp(root, { view: "deck", presenter: true });
    await assert.rejects(
      access(resolve(presenter.appRoot, "src/routes/presenter/+page 3.svelte")),
    );
    await ensureRuntimeApp(root, { view: "deck" });
    await assert.rejects(
      access(resolve(presenter.appRoot, "src/routes/presenter/+page.svelte")),
    );
  }));
