import { createServer } from "node:net";
import { fork } from "node:child_process";
import { cp, mkdir, readFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { embeddedDecks } from "./decks.mjs";

const app = fileURLToPath(new URL("../", import.meta.url));
const workspace = resolve(app, "..");
const cli = fileURLToPath(import.meta.resolve("@svx-deck/core/cli"));
const vite = resolve(
  dirname(fileURLToPath(import.meta.resolve("vite/package.json"))),
  "bin/vite.js",
);
const [command, ...args] = process.argv.slice(2);
const children = new Set();
let stopping = false;

function start(file, args, env = {}) {
  const child = fork(file, args, {
    cwd: app,
    env: { ...process.env, ...env },
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });
  children.add(child);
  child.once("exit", () => children.delete(child));
  return child;
}

function finished(child) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0 || stopping) resolve();
      else reject(new Error(`Process failed (${signal ?? code}).`));
    });
  });
}

async function stop() {
  stopping = true;
  await Promise.all(
    [...children].map((child) => {
      const done = finished(child);
      child.kill("SIGTERM");
      return done;
    }),
  );
}
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, async () => {
    await stop();
    process.exit(0);
  });
}

async function availablePort() {
  const socket = createServer();
  await new Promise((resolve, reject) => {
    socket.once("error", reject);
    socket.listen(0, "127.0.0.1", resolve);
  });
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  return port;
}

async function startDeck(id) {
  const port = await availablePort();
  const child = start(cli, [
    "dev",
    resolve(workspace, "decks", id),
    "--embed",
    "--base",
    `/slides/${id}`,
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
    "--strict-port",
  ]);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Timed out starting deck ${id}`)),
      60000,
    );
    const fail = () => {
      clearTimeout(timer);
      reject(new Error(`Could not start deck ${id}`));
    };
    child.once("error", fail);
    child.once("exit", fail);
    child.on("message", (message) => {
      if (message.type !== "svx-deck:ready") return;
      clearTimeout(timer);
      child.removeListener("exit", fail);
      child.removeListener("error", fail);
      // An unavailable deck must not leave a seemingly healthy portal running.
      child.once("exit", async (code) => {
        if (stopping) return;
        console.error(`Deck ${id} stopped (${code}).`);
        await stop();
        process.exit(1);
      });
      resolve(message.origin);
    });
  });
}

try {
  const ids = await embeddedDecks(
    resolve(workspace, "content"),
    resolve(workspace, "decks"),
  );
  if (command === "dev") {
    const origins = {};
    for (const id of ids) origins[`/slides/${id}`] = await startDeck(id);
    await finished(
      start(vite, ["dev", "--host", "127.0.0.1", "--port", "5175", ...args], {
        COURSE_DECK_ORIGINS: JSON.stringify(origins),
      }),
    );
  } else if (command === "build") {
    const stage = resolve(app, ".decks");
    await rm(stage, { recursive: true, force: true });
    await mkdir(stage, { recursive: true });
    for (const id of ids) {
      const output = resolve(stage, id);
      await finished(
        start(cli, [
          "build",
          resolve(workspace, "decks", id),
          "--embed",
          "--base",
          `/slides/${id}`,
          "--out-dir",
          output,
        ]),
      );
      const manifest = JSON.parse(
        await readFile(resolve(output, "svx-deck.json"), "utf8"),
      );
      if (
        manifest.view !== "embed" ||
        manifest.notes !== false ||
        manifest.base !== `/slides/${id}` ||
        !manifest.slideCount
      ) {
        throw new Error(`Invalid embedded export: ${id}`);
      }
      await readFile(resolve(output, "index.html"));
    }
    // Finish all deck exports before replacing the portal's previous build.
    await finished(start(vite, ["build", ...args]));
    await cp(stage, resolve(app, "build/slides"), { recursive: true });
    console.log(`Built course portal with ${ids.length} embedded deck(s).`);
  } else {
    throw new Error("Usage: node scripts/site.mjs dev|build [Vite options]");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await stop();
}
