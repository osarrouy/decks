import { load, JSON_SCHEMA } from "js-yaml";
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});
// Editorial headings sit below the course/chapter heading in the page.
markdown.renderer.rules.heading_open = (tokens, index) =>
  `<h${Math.min(6, Number(tokens[index].tag.slice(1)) + 1)}>`;
markdown.renderer.rules.heading_close = (tokens, index) =>
  `</h${Math.min(6, Number(tokens[index].tag.slice(1)) + 1)}>\n`;

export const renderMarkdown = (text) => markdown.render(text || "");
export const renderReference = (text) => markdown.renderInline(text || "");
export function selectChapter(course, id) {
  const legacyIndex = /^section-(\d+)$/.exec(id || "");
  return (
    course.sections.find((section) => section.id === id) ||
    (legacyIndex ? course.sections[Number(legacyIndex[1]) - 1] : undefined) ||
    course.sections[0]
  );
}

export function excerpt(text) {
  return text
    .trim()
    .split(/\n\s*\n/)[0]
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ");
}

export function isPublicUrl(value) {
  return (
    typeof value === "string" &&
    !/[\s\\]/.test(value) &&
    ![...value].some((char) => char.charCodeAt(0) < 32) &&
    (/^\/(?!\/)/.test(value) || /^https?:\/\/[^/]+/i.test(value))
  );
}

export function parseYamlCourse(raw, slug) {
  const fail = (message) => {
    throw new Error(`${slug}.yaml: ${message}`);
  };
  const object = (value, path) => {
    if (!value || typeof value !== "object" || Array.isArray(value))
      fail(`${path} must be an object`);
  };
  const string = (value, path, nonempty = false) => {
    if (typeof value !== "string" || (nonempty && !value.trim()))
      fail(`${path} must be ${nonempty ? "a non-empty" : "a"} string`);
    return value;
  };
  const list = (value, path) => {
    if (!Array.isArray(value)) fail(`${path} must be a list`);
    return value;
  };
  const url = (value, path) => {
    if (!isPublicUrl(value))
      fail(`${path} must be an http(s) URL or a public path starting with /`);
    return value;
  };
  const bibliography = (value, path) =>
    list(value === undefined ? [] : value, path).map((entry, index) => {
      const name = `${path}[${index}]`;
      object(entry, name);
      return {
        reference: string(entry.reference, `${name}.reference`, true),
        ...(entry.note !== undefined
          ? { note: string(entry.note, `${name}.note`) }
          : {}),
        ...(entry.url !== undefined
          ? { url: url(entry.url, `${name}.url`) }
          : {}),
        ...(entry.fichier !== undefined
          ? { fichier: url(entry.fichier, `${name}.fichier`) }
          : {}),
      };
    });
  const course = load(raw, { schema: JSON_SCHEMA });
  object(course, "course");
  const title = string(course.titre, "titre", true);
  const cycle = string(course.niveau, "niveau", true);
  const description = string(course.description, "description");
  const ids = new Set();
  const sections = list(course.chapitres, "chapitres").map((chapter, index) => {
    const name = `chapitres[${index}]`;
    object(chapter, name);
    const id = string(chapter.id, `${name}.id`, true);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id))
      fail(`${name}.id is invalid or duplicated: ${id}`);
    ids.add(id);
    const description = string(chapter.resume, `${name}.resume`);
    const headings = [...description.matchAll(/^## (.+)$/gm)].map(
      (match) => match[1],
    );
    const title = string(chapter.titre, `${name}.titre`, true);
    const part =
      chapter.partie === undefined
        ? ""
        : string(chapter.partie, `${name}.partie`).trim();
    if (part) {
      const [current, total] = part.split("/").map(Number);
      if (
        !/^[1-9]\d*\/[1-9]\d*$/.test(part) ||
        !Number.isSafeInteger(current) ||
        !Number.isSafeInteger(total) ||
        current > total
      )
        fail(`${name}.partie must be N/M with positive integers and N <= M`);
    }
    return {
      id,
      title,
      part,
      // Plain-text contexts such as headings and chat keep the complete label.
      label: part ? `${title}\u00a0${part}` : title,
      subtitle:
        chapter["sous-titre"] === undefined
          ? ""
          : string(chapter["sous-titre"], `${name}.sous-titre`).trim(),
      description,
      summary: excerpt(description),
      items: headings.length
        ? headings
        : [...description.matchAll(/^- (.+(?:\n[ \t]+.+)*)/gm)].map((match) =>
            match[1].replace(/\s+/g, " "),
          ),
      bibliography: bibliography(
        chapter.bibliographie,
        `${name}.bibliographie`,
      ),
      slides: list(
        chapter.slides === undefined ? [] : chapter.slides,
        `${name}.slides`,
      ).map((slide, slideIndex) => {
        object(slide, `${name}.slides[${slideIndex}]`);
        if (slide.integration !== undefined && slide.integration !== "iframe")
          fail(`${name}.slides[${slideIndex}].integration must be iframe`);
        return {
          ...(slide.integration ? { integration: slide.integration } : {}),
          title: string(
            slide.titre,
            `${name}.slides[${slideIndex}].titre`,
            true,
          ),
          url: url(slide.url, `${name}.slides[${slideIndex}].url`),
        };
      }),
    };
  });
  const level = cycle.replace(/^Licence\s*/i, "L").replace(/^Master\s*/i, "M");
  const cycleLabel = /^L\d+$/.test(cycle)
    ? `Licence ${cycle.slice(1)}`
    : /^M\d+$/.test(cycle)
      ? `Master ${cycle.slice(1)}`
      : cycle;
  return {
    slug,
    title,
    level,
    cycle: cycleLabel,
    description,
    summary: excerpt(description),
    sections,
    bibliography: bibliography(course.bibliographie, "bibliographie"),
  };
}

export function parseLegacyCourse(raw, slug) {
  const blocks = raw.trim().split(/^## /m);
  const [heading, ...intro] = blocks.shift().trim().split("\n");
  const sections = [];
  let bibliography = [];
  for (const block of blocks) {
    const [title, ...lines] = block.trim().split("\n");
    const items = lines
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2));
    if (title === "Bibliographie")
      bibliography = items.map((reference) => ({ reference }));
    else {
      const description = lines.join("\n").trim();
      sections.push({
        id: `section-${sections.length + 1}`,
        title,
        label: title,
        part: "",
        subtitle: "",
        description,
        summary: excerpt(description),
        items,
        bibliography: [],
        slides: [],
      });
    }
  }
  const description = intro.join("\n").trim();
  return {
    slug,
    level: slug.toUpperCase(),
    cycle: slug === "m2" ? "Master 2" : `Licence ${slug.slice(1)}`,
    title: heading.slice(2),
    description,
    summary: excerpt(description),
    sections,
    bibliography,
  };
}
