import { readFile, writeFile } from "node:fs/promises";

export async function writeIfChanged(path, content) {
  try {
    if ((await readFile(path, "utf8")) === content) return;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await writeFile(path, content);
}
