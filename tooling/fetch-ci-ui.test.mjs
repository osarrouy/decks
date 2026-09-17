import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("./fetch-ci-ui.mjs", import.meta.url));

test("private UI checkout refuses local development and missing credentials", async () => {
  const directory = await mkdtemp(join(tmpdir(), "ui-guard-test-"));
  try {
    for (const [CI, expected] of [
      ["false", /disposable CI\/build/],
      ["true", /Missing read-only DG_UI_DEPLOY_KEY/],
    ]) {
      const result = spawnSync(process.execPath, [script], {
        cwd: directory,
        env: { ...process.env, CI, DG_UI_DEPLOY_KEY: "" },
        encoding: "utf8",
      });
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, expected);
      assert.deepEqual(await readdir(directory), []);
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("failed Git checkout removes temporary keys without logging them", async () => {
  const directory = await mkdtemp(join(tmpdir(), "ui-key-test-"));
  try {
    const bin = join(directory, "bin");
    const temporary = join(directory, "tmp");
    await mkdir(bin);
    await mkdir(temporary);
    await writeFile(join(bin, "git"), "#!/bin/sh\nexit 42\n", { mode: 0o700 });
    const secret = "test-private-key-never-log";
    const result = spawnSync(process.execPath, [script], {
      cwd: directory,
      env: {
        ...process.env,
        CI: "true",
        DG_UI_DEPLOY_KEY: secret,
        PATH: bin,
        TMPDIR: temporary,
      },
      encoding: "utf8",
    });
    assert.notEqual(result.status, 0);
    assert.doesNotMatch(result.stdout + result.stderr, new RegExp(secret));
    assert.deepEqual(await readdir(temporary), []);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
