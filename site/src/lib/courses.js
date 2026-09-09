import { parseLegacyCourse, parseYamlCourse } from "./course-content.js";

const yamlFiles = import.meta.glob("../../../content/*.yaml", {
  query: "?raw",
  import: "default",
  eager: true,
});
// Lowercase course slugs exclude uppercase documentation such as AGENTS.md.
const markdownFiles = import.meta.glob("../../../content/[a-z0-9]*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const slugOf = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.(yaml|md)$/, "");

// Keep old public links valid while course names become independent of levels.
export const courseAliases = { l1: "introduction-aux-cultures-numeriques" };
const yamlCourses = Object.entries(yamlFiles).map(([path, raw]) =>
  parseYamlCourse(raw, slugOf(path)),
);
const slugs = new Set(yamlCourses.map((course) => course.slug));
const legacyCourses = Object.entries(markdownFiles)
  .filter(
    ([path]) =>
      !slugs.has(slugOf(path)) && !slugs.has(courseAliases[slugOf(path)]),
  )
  .map(([path, raw]) => parseLegacyCourse(raw, slugOf(path)));

export const courses = [...yamlCourses, ...legacyCourses].sort(
  (a, b) =>
    a.level.localeCompare(b.level, "fr", { numeric: true }) ||
    a.title.localeCompare(b.title, "fr"),
);
