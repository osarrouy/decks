import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const target = args[0];
const { scripts } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

let command = ["--filter", "site", "dev", ...args];
if (target && !target.startsWith("-")) {
  if (!scripts[`dev:${target}`]) {
    console.error(`Unknown development target: ${target}`);
    process.exit(1);
  }
  command = ["run", `dev:${target}`, ...args.slice(1)];
}

const child = spawn("pnpm", command, { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal === "SIGINT" ? 130 : 1);
});
