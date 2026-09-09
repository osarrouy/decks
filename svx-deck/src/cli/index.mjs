#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build, createServer, preview } from "vite";

import { ensureRuntimeApp } from "../runtime/generate.mjs";

function usage() {
  console.log(`svx-deck

Usage:
  svx-deck dev <deck-dir> [--students|--embed] [--base /prefix] [--host 0.0.0.0] [--port 5173]
  svx-deck build <deck-dir> [--public|--presenter|--students|--embed] [--base /prefix] [--out-dir path]
  svx-deck export <deck-dir>
  svx-deck preview <deck-dir> [--host 0.0.0.0] [--port 4173]
`);
}

function parseArgs(argv) {
  const [command, deckDirArg = "."] = argv;
  const flags = {};

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;

    const [rawKey, inlineValue] = token.slice(2).split(/=(.*)/s);
    const next = argv[index + 1];
    flags[rawKey] =
      inlineValue ?? (next && !next.startsWith("--") ? argv[++index] : true);
  }

  return { command, deckDirArg, flags };
}

async function runDev(deckRoot, flags) {
  const view = flags.embed ? "embed" : flags.students ? "students" : "deck";
  const base = flags.base ?? "";
  if (
    typeof base !== "string" ||
    (base && !/^\/(?!\/)[a-zA-Z0-9_/-]+$/.test(base)) ||
    base.endsWith("/")
  ) {
    throw new Error(
      "--base must be a path such as /decks/history-1, without a trailing slash",
    );
  }
  const { appRoot, configFile } = await ensureRuntimeApp(deckRoot, {
    view,
    base,
    dev: true,
  });
  process.chdir(appRoot);
  const server = await createServer({
    root: appRoot,
    configFile,
    server: {
      host: flags.host === true ? "0.0.0.0" : flags.host,
      port: flags.port ? Number(flags.port) : undefined,
      strictPort: Boolean(flags["strict-port"]),
    },
  });
  await server.listen();
  server.printUrls();
  // The portal launcher allocates a free port and waits for this ready signal.
  const address = server.httpServer.address();
  process.send?.({
    type: "svx-deck:ready",
    origin: `http://127.0.0.1:${address.port}`,
  });
}

async function runBuild(deckRoot, flags) {
  const view = flags.embed ? "embed" : flags.students ? "students" : "deck";
  if (flags.embed && (flags.presenter || flags.students))
    throw new Error(
      "--embed exports slides only; do not combine it with --presenter or --students",
    );
  const base = flags.base ?? "";
  if (
    typeof base !== "string" ||
    (base && !/^\/(?!\/)[a-zA-Z0-9_/-]+$/.test(base)) ||
    base.endsWith("/")
  ) {
    throw new Error(
      "--base must be a path such as /decks/history-1, without a trailing slash",
    );
  }
  if (flags["out-dir"] === true) throw new Error("--out-dir requires a path");
  const outputDir = resolve(deckRoot, flags["out-dir"] || "build");
  if (
    outputDir === deckRoot ||
    deckRoot.startsWith(outputDir + "/") ||
    ["static", "components", "source", ".svx-deck"].some(
      (name) =>
        outputDir === resolve(deckRoot, name) ||
        outputDir.startsWith(resolve(deckRoot, name) + "/"),
    )
  ) {
    throw new Error(
      "--out-dir must be a dedicated build directory outside the deck sources",
    );
  }
  if (
    outputDir !== resolve(deckRoot, "build") &&
    existsSync(outputDir) &&
    (await readdir(outputDir)).length &&
    !existsSync(resolve(outputDir, "svx-deck.json"))
  ) {
    throw new Error("--out-dir already exists and is not an svx-deck export");
  }
  const { appRoot, configFile } = await ensureRuntimeApp(deckRoot, {
    view,
    base,
    outputDir,
    presenter: Boolean(flags.presenter),
  });
  process.env.VITE_INCLUDE_NOTES =
    flags.presenter || flags.students ? "true" : "false";
  await rm(outputDir, { recursive: true, force: true });
  process.chdir(appRoot);
  await build({ root: appRoot, configFile });
  const slides = (await readdir(resolve(appRoot, "src/generated/deck"))).filter(
    (file) => file.endsWith(".svx"),
  );
  await writeFile(
    resolve(outputDir, "svx-deck.json"),
    JSON.stringify(
      {
        version: 1,
        view,
        base,
        notes: Boolean(flags.presenter || flags.students),
        slideCount: slides.length,
      },
      null,
      2,
    ) + "\n",
  );
}

async function runPreview(deckRoot, flags) {
  const server = await preview({
    root: deckRoot,
    build: { outDir: "build" },
    preview: {
      host: flags.host === true ? "0.0.0.0" : flags.host,
      port: flags.port ? Number(flags.port) : undefined,
    },
  });
  server.printUrls();
}

const { command, deckDirArg, flags } = parseArgs(process.argv.slice(2));

if (
  !command ||
  command === "--help" ||
  command === "-h" ||
  flags.help ||
  flags.h
) {
  usage();
  process.exit(command ? 0 : 1);
}

const deckRoot = resolve(process.cwd(), deckDirArg);

try {
  if (command === "dev") await runDev(deckRoot, flags);
  else if (command === "build") await runBuild(deckRoot, flags);
  else if (command === "export")
    await runBuild(deckRoot, { ...flags, students: true });
  else if (command === "preview") await runPreview(deckRoot, flags);
  else {
    usage();
    process.exit(1);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
