import { mkdir, readdir, readFile, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  parseSingleFileDeck,
  renderGeneratedSlide,
  resolveDeckTemplateConfig,
} from "../deck/singleFile.mjs";
import { writeIfChanged } from "../../runtime/files.mjs";

function posixish(path) {
  return path.replace(/\\/g, "/");
}

function filterStudentNotes(markdown) {
  const lines = markdown.split("\n");
  const filtered = [];
  let inCommentDirective = false;
  let inCommentCallout = false;

  for (const line of lines) {
    if (inCommentDirective) {
      if (/^\s*:::\s*$/.test(line)) inCommentDirective = false;
      continue;
    }

    if (/^\s*:::\s*comment\b/i.test(line)) {
      inCommentDirective = true;
      continue;
    }

    if (/^\s*>\s*\[!COMMENT\]\s*$/i.test(line)) {
      inCommentCallout = true;
      continue;
    }

    if (inCommentCallout) {
      if (/^\s*>\s?/.test(line) || /^\s*$/.test(line)) continue;
      inCommentCallout = false;
    }

    filtered.push(line);
  }

  return filtered.join("\n").trim();
}

function transformNotes(notes, audience) {
  return audience === "student" ? filterStudentNotes(notes) : notes;
}

async function cleanGeneratedFiles(outDir) {
  try {
    const files = await readdir(outDir);
    await Promise.all(
      files
        .filter((file) => file.endsWith(".svx") || file.endsWith(".notes.md"))
        .map((file) => rm(join(outDir, file), { force: true })),
    );
  } catch {
    // The directory may not exist yet.
  }
}

async function generateSingleFileDeck(options) {
  const sourcePath = resolve(options.root, options.source);
  const outDir = resolve(options.root, options.outDir);

  let source;
  try {
    source = await readFile(sourcePath, "utf8");
  } catch {
    return { sourcePath, outDir, generated: 0, skipped: true };
  }

  const deck = parseSingleFileDeck(source, options);
  await mkdir(outDir, { recursive: true });
  if (options.clean) await cleanGeneratedFiles(outDir);

  await Promise.all(
    deck.slides.flatMap((slide) => {
      const fileStem = `${String(slide.order).padStart(3, "0")}-${slide.id}`;
      const notes = slide.notes
        ? transformNotes(slide.notes, options.notesAudience)
        : "";
      const writes = [
        writeIfChanged(
          join(outDir, `${fileStem}.svx`),
          renderGeneratedSlide(slide, options.root),
        ),
      ];
      if (notes)
        writes.push(
          writeIfChanged(join(outDir, `${fileStem}.notes.md`), `${notes}\n`),
        );
      return writes;
    }),
  );

  return { sourcePath, outDir, generated: deck.slides.length, skipped: false };
}

function reloadGeneratedDeck(server, outDir) {
  server.watcher.add(outDir);
  server.ws.send({ type: "full-reload" });
}

export function svxDeckSingleFileDeck(options = {}) {
  let viteConfig;
  let resolved;

  const setup = () => {
    const template = resolveDeckTemplateConfig(options);
    resolved = {
      root: options.root ? resolve(options.root) : viteConfig.root,
      source: template.source,
      outDir: template.outDir,
      slideSeparator: template.slideSeparator,
      notesSeparator: template.notesSeparator,
      notesAudience: options.notesAudience ?? "presenter",
      clean: options.clean ?? true,
    };
  };

  const run = async () => generateSingleFileDeck(resolved);

  return {
    name: "svx-deck:single-file-deck",
    enforce: "pre",
    configResolved(config) {
      viteConfig = config;
      setup();
    },
    async buildStart() {
      await run();
    },
    configureServer(server) {
      const sourcePath = resolve(resolved.root, resolved.source);
      server.watcher.add(sourcePath);
      server.watcher.on("add", async (changedPath) => {
        if (posixish(changedPath) !== posixish(sourcePath)) return;
        const result = await run();
        reloadGeneratedDeck(server, result.outDir);
      });
      server.watcher.on("change", async (changedPath) => {
        if (posixish(changedPath) !== posixish(sourcePath)) return;
        const result = await run();
        reloadGeneratedDeck(server, result.outDir);
      });
    },
  };
}
