import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

if (process.env.CI !== "true")
  throw new Error("This command is for disposable CI/build checkouts only.");
const key = process.env.DG_UI_DEPLOY_KEY;
if (!key) throw new Error("Missing read-only DG_UI_DEPLOY_KEY.");
delete process.env.DG_UI_DEPLOY_KEY;

// Both GitHub Actions and Railway build this exact UI revision.
const ref = "2147a1267357f228286158680ee887c791d7e4b2";
const target = ".ci/interfaces";
await mkdir(".ci", { recursive: true });
await mkdir(target);
const credentials = await mkdtemp(join(tmpdir(), "university-ui-key-"));
try {
  await writeFile(join(credentials, "key"), `${key.trim()}\n`, { mode: 0o600 });
  // GitHub's published Ed25519 host key; never trust an unauthenticated scan.
  await writeFile(
    join(credentials, "known_hosts"),
    "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl\n",
  );
  const env = {
    ...process.env,
    GIT_TERMINAL_PROMPT: "0",
    GIT_SSH_COMMAND: `ssh -F /dev/null -i '${credentials}/key' -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile='${credentials}/known_hosts'`,
  };
  const git = (...args) =>
    execFileSync("git", args, { cwd: target, env, stdio: "inherit" });
  git("init", "--quiet");
  git(
    "remote",
    "add",
    "origin",
    "git@github.com:distributedgallery/interfaces.git",
  );
  git("fetch", "--depth=1", "origin", ref);
  git("checkout", "--detach", "FETCH_HEAD");
  const actual = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: target,
    encoding: "utf8",
  }).trim();
  if (actual !== ref) throw new Error("Unexpected @dg/ui revision.");
} finally {
  // This directory was created above and contains only this build's credentials.
  await rm(credentials, { recursive: true, force: true });
}
await import("./ci-ui.mjs");
