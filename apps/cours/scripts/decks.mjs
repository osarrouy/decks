import { readdir, readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { parseYamlCourse } from "../src/lib/course-content.js";

// Only referenced local decks are built; remote links remain external resources.
export async function embeddedDecks(contentRoot, slidesRoot) {
  const ids = new Set();
  for (const file of (await readdir(contentRoot)).filter((file) =>
    file.endsWith(".yaml"),
  )) {
    const course = parseYamlCourse(
      await readFile(resolve(contentRoot, file), "utf8"),
      file.slice(0, -5),
    );
    for (const chapter of course.sections)
      for (const slide of chapter.slides) {
        if (!slide.url.startsWith("/slides/")) continue;
        const id = slide.url.match(
          /^\/slides\/([a-z0-9]+(?:-[a-z0-9]+)*)\/(?:index\.html)?(?:[?#].*)?$/,
        )?.[1];
        if (!id)
          throw new Error(
            `${file}: local decks must use /slides/<deck-id>/index.html`,
          );
        await access(resolve(slidesRoot, id, "deck.svx")).catch(() => {
          throw new Error(`${file}: missing source slides/${id}/deck.svx`);
        });
        ids.add(id);
      }
  }
  return [...ids].sort();
}
