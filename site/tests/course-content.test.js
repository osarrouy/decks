import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
import {
  parseYamlCourse,
  parseLegacyCourse,
  renderMarkdown,
  renderReference,
  selectChapter,
} from "../src/lib/course-content.js";

const fixture = (extra = "") =>
  `titre: Exemple\nniveau: L1\ndescription: Présentation\nchapitres: []\n${extra}`;

test("course content and assistant select the same chapter from current and legacy links", () => {
  const course = { sections: [{ id: "history" }, { id: "networks" }] };
  for (const id of ["networks", "section-2"]) {
    assert.equal(selectChapter(course, id), course.sections[1]);
  }
  for (const id of [null, "missing", "section-0", "section-99"]) {
    assert.equal(selectChapter(course, id), course.sections[0]);
  }
  assert.equal(selectChapter({ sections: [] }, null), undefined);
});

test("the actual course preserves its shortened history outline and separate bibliographies", () => {
  const raw = readFileSync(
    new URL(
      "../../content/introduction-aux-cultures-numeriques.yaml",
      import.meta.url,
    ),
    "utf8",
  );
  const course = parseYamlCourse(raw, "introduction-aux-cultures-numeriques");
  assert.equal(course.level, "L1");
  assert.equal(course.sections.length, 9);
  assert.equal(course.sections[0].id, "histoire-du-numerique");
  assert.deepEqual(course.sections[0].items, [
    "Mécaniser le calcul, programmer les opérations",
    "La révolution du contrôle",
    "La statistique et la mise en calcul du social",
    "Formaliser la logique et le calcul",
    "Numériser : construire une représentation calculable",
    "La guerre et les premiers ordinateurs",
  ]);
  assert.equal(course.sections[0].bibliography.length, 13);
  assert.equal(course.bibliography.length, 3);
  const cybernetics = course.sections[1];
  assert.equal(cybernetics.id, "cybernetics");
  assert.equal(cybernetics.part, "2/3");
  assert.equal(cybernetics.subtitle, "Cybernetics");
  assert.equal(cybernetics.items.length, 6);
  assert.equal(cybernetics.bibliography.length, 12);
  assert.equal(cybernetics.slides[0].url, "/slides/cybernetics/index.html");
  assert.equal(cybernetics.slides[0].integration, "iframe");
  const internetAndPersonalComputing = course.sections[2];
  assert.equal(internetAndPersonalComputing.id, "internet-et-ordinateur-personnel");
  assert.equal(internetAndPersonalComputing.part, "3/3");
  assert.equal(
    internetAndPersonalComputing.subtitle,
    "Internet et l’ordinateur personnel",
  );
  assert.deepEqual(internetAndPersonalComputing.items, [
    "Distinguer Internet et le Web",
    "Relier des réseaux : de la commutation par paquets à TCP/IP",
    "Du microprocesseur à l’ordinateur personnel",
    "La contre-culture californienne et l’informatique comme outil",
    "D’ARPANET à Internet",
    "Le Web, sa commercialisation et le tournant participatif",
  ]);
  assert.equal(internetAndPersonalComputing.bibliography.length, 10);
  assert.equal(
    internetAndPersonalComputing.slides[0].url,
    "/slides/history-3/index.html",
  );
  assert.equal(
    internetAndPersonalComputing.slides[0].integration,
    "iframe",
  );
  const socialNetworks = course.sections.slice(-6, -1);
  assert.deepEqual(
    socialNetworks.map(({ id, part, title }) => ({ id, part, title })),
    [
      {
        id: "reseaux-sociaux-numeriques",
        part: "1/5",
        title: "Réseaux sociaux numériques",
      },
      {
        id: "structure-des-reseaux-sociaux",
        part: "2/5",
        title: "Réseaux sociaux numériques",
      },
      {
        id: "gatekeeping-algorithmique",
        part: "3/5",
        title: "Réseaux sociaux numériques",
      },
      {
        id: "viralite-cascades-amplification",
        part: "4/5",
        title: "Réseaux sociaux numériques",
      },
      {
        id: "bulles-chambres-echo-polarisation",
        part: "5/5",
        title: "Réseaux sociaux numériques",
      },
    ],
  );
  assert.deepEqual(
    socialNetworks.map((section) => section.items.length),
    [4, 4, 4, 6, 5],
  );
  assert.deepEqual(
    socialNetworks.map((section) => section.bibliography.length),
    [5, 6, 4, 14, 14],
  );
  assert.deepEqual(
    socialNetworks.map((section) => section.slides[0].url),
    [
      "/slides/social-networks/index.html",
      "/slides/social-networks-structure/index.html",
      "/slides/social-networks-gatekeepers/index.html",
      "/slides/social-networks-virality/index.html",
      "/slides/social-networks-polarization/index.html",
    ],
  );
  assert(
    socialNetworks.every(
      (section) => section.slides[0].integration === "iframe",
    ),
  );
  const interpassivity = course.sections.at(-1);
  assert.equal(interpassivity.id, "interpassivite-des-foules");
  assert.equal(interpassivity.items.length, 6);
  assert.equal(interpassivity.bibliography.length, 9);
  assert.equal(
    interpassivity.slides[0].url,
    "/slides/interpassivity/index.html",
  );
  assert.equal(interpassivity.slides[0].integration, "iframe");
  assert(course.sections[0].description.includes("Hollerith"));
  assert(course.sections[0].description.includes("UNIVAC"));
  assert(!course.sections[0].description.includes("Web"));
  assert(
    course.sections[0].summary.includes("premiers ordinateurs électroniques"),
  );
  assert.equal(
    (renderMarkdown(course.sections[0].description).match(/<h3>/g) || [])
      .length,
    6,
  );
});

test("legacy Markdown courses preserve their identifiers and lists", () => {
  const raw = readFileSync(
    new URL("../../content/l2.md", import.meta.url),
    "utf8",
  );
  const course = parseLegacyCourse(raw, "l2");
  assert.equal(course.sections[0].id, "section-1");
  assert.equal(course.sections[0].items.length, 3);
  assert(course.bibliography[0].reference.includes("Nakamoto"));
  assert(renderMarkdown(course.sections[0].description).includes("<ul>"));
});

test("a course can have no chapters and a level independent of its filename", () => {
  const course = parseYamlCourse(fixture(), "autre-cours");
  assert.equal(course.slug, "autre-cours");
  assert.equal(course.cycle, "Licence 1");
  assert.deepEqual(course.sections, []);
  assert.deepEqual(course.bibliography, []);
});

test("slide resources and both bibliography links are preserved", () => {
  const course = parseYamlCourse(
    `titre: Exemple\nniveau: M2\ndescription: ''\nchapitres:\n  - id: exemple\n    titre: Exemple\n    resume: ''\n    slides:\n      - titre: Support\n        url: /supports/exemple.pdf\n    bibliographie:\n      - reference: Texte\n        url: https://example.org/texte\n        fichier: /documents/texte.pdf\n`,
    "exemple",
  );
  assert.equal(course.sections[0].slides[0].url, "/supports/exemple.pdf");
  assert.equal(
    course.sections[0].bibliography[0].fichier,
    "/documents/texte.pdf",
  );
  assert.equal(
    course.sections[0].bibliography[0].url,
    "https://example.org/texte",
  );
});

test("the reader reports invalid fields and duplicate identifiers", () => {
  assert.throws(
    () =>
      parseYamlCourse(fixture().replace("niveau: L1", "niveau: null"), "test"),
    /niveau/,
  );
  assert.throws(
    () => parseYamlCourse(fixture("bibliographie: null"), "test"),
    /bibliographie/,
  );
  const chapter = "\n  - id: identique\n    titre: Titre\n    resume: Texte";
  assert.throws(
    () =>
      parseYamlCourse(
        fixture().replace("chapitres: []", `chapitres:${chapter}${chapter}`),
        "test",
      ),
    /duplicated/,
  );
  assert.throws(
    () => parseYamlCourse(fixture("titre: Autre"), "test"),
    /duplicated/,
  );
});

test("chapter subtitles are optional plain text and reject non-string values", () => {
  const chapter = fixture().replace(
    "chapitres: []",
    "chapitres:\n  - id: exemple\n    titre: Exemple\n    resume: ''",
  );
  const parse = (field = "") =>
    parseYamlCourse(`${chapter}${field}`, "test").sections[0];
  assert.equal(parse().subtitle, "");
  assert.equal(parse('    sous-titre: ""\n').subtitle, "");
  assert.equal(parse('    sous-titre: "   "\n').subtitle, "");
  assert.equal(
    parse('    sous-titre: "  Du calcul au Web  "\n').subtitle,
    "Du calcul au Web",
  );
  for (const value of ["null", "42", "false", "[]", "{}"])
    assert.throws(
      () => parse(`    sous-titre: ${value}\n`),
      /chapitres\[0\]\.sous-titre must be a string/,
    );
});

test("optional part numbering labels chapters without changing identifiers or subtitles", () => {
  const chapter = fixture().replace(
    "chapitres: []",
    "chapitres:\n  - id: histoire\n    titre: Histoire du numérique\n    resume: ''",
  );
  const parse = (field = "") =>
    parseYamlCourse(`${chapter}${field}`, "test").sections[0];
  for (const field of ["", '    partie: ""\n', '    partie: "   "\n'])
    assert.equal(parse(field).title, "Histoire du numérique");
  for (const part of ["1/3", "2/3", "3/3", "1/1"])
    assert.equal(
      parse(`    partie: " ${part} "\n`).label,
      `Histoire du numérique\u00a0${part}`,
    );
  const section = parse(
    '    partie: "1/3"\n    sous-titre: "Du calcul au Web"\n',
  );
  assert.equal(section.id, "histoire");
  assert.equal(section.subtitle, "Du calcul au Web");
  const course = parseYamlCourse(
    `${chapter}    partie: "1/3"\n  - id: histoire-suite\n    titre: Histoire du numérique\n    partie: "2/3"\n    resume: ''\n`,
    "test",
  );
  assert.deepEqual(
    course.sections.map(({ id, label }) => ({ id, label })),
    [
      { id: "histoire", label: "Histoire du numérique\u00a01/3" },
      { id: "histoire-suite", label: "Histoire du numérique\u00a02/3" },
    ],
  );
  for (const value of [
    "null",
    "42",
    "false",
    "[]",
    "{}",
    '"0/3"',
    '"1/0"',
    '"4/3"',
    '"1.5/3"',
    '"-1/3"',
    '"01/3"',
    '"1/03"',
    '"1 / 3"',
    '"1/3/4"',
    '"1/9007199254740992"',
  ])
    assert.throws(
      () => parse(`    partie: ${value}\n`),
      /chapitres\[0\]\.partie/,
    );
});

test("executable links and private paths are rejected as resources", () => {
  for (const url of [
    "javascript:alert(1)",
    "file:///Users/test.pdf",
    "//example.org",
    "/\\example.org",
  ]) {
    assert.throws(
      () =>
        parseYamlCourse(
          fixture(`bibliographie:\n  - reference: Texte\n    url: '${url}'`),
          "test",
        ),
      /URL/,
    );
  }
});

test("Markdown renders formatting without executing HTML or unsafe links", () => {
  const html = renderMarkdown(
    "## Titre\n\n**Fort**, *italique* et [lien](https://example.org).\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))",
  );
  assert(html.includes("<h3>Titre</h3>"));
  assert(html.includes("<strong>Fort</strong>"));
  assert(html.includes("<em>italique</em>"));
  assert(html.includes('href="https://example.org"'));
  assert(!html.includes("<script>"));
  assert(!html.includes('href="javascript:'));
});

test("APA references preserve italics and links without creating blocks or executing HTML", () => {
  const html = renderReference(
    "Yates, J. (1993). Titre. *Business History Review, 67*(1), 1–51. [https://doi.org/10.2307/3117467](https://doi.org/10.2307/3117467)",
  );
  assert(html.includes("<em>Business History Review, 67</em>(1)"));
  assert(html.includes('href="https://doi.org/10.2307/3117467"'));
  assert(!html.includes("<p>"));
  assert(!renderReference("<script>alert(1)</script>").includes("<script>"));
  assert(
    !renderReference("[x](javascript:alert(1))").includes('href="javascript:'),
  );
});

test("reading instructions remain separate from the APA citation", () => {
  const course = parseYamlCourse(
    fixture(
      'bibliographie:\n  - reference: Auteur. (2023). *Livre*. Éditeur.\n    note: "Lecture ciblée : chapitre 2."',
    ),
    "test",
  );
  assert.equal(course.bibliography[0].note, "Lecture ciblée : chapitre 2.");
  assert(!course.bibliography[0].reference.includes("chapitre 2"));
});

test("embedded presentations remain explicit and validated", () => {
  const chapter = `titre: Exemple\nniveau: L1\ndescription: ''\nchapitres:\n  - id: histoire\n    titre: Histoire\n    resume: ''\n    slides:\n      - titre: Slides\n        url: /slides/history-1/index.html\n        integration: iframe\n`;
  assert.equal(
    parseYamlCourse(chapter, "exemple").sections[0].slides[0].integration,
    "iframe",
  );
  assert.throws(
    () =>
      parseYamlCourse(
        chapter.replace("integration: iframe", "integration: script"),
        "exemple",
      ),
    /integration/,
  );
});
