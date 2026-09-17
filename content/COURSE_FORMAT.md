# Course content format — YAML

This document describes the editorial format used to prepare courses and their resources. Use this structure when creating or updating a course file.

**Status: supported by the site.** `site/src/lib/courses.js` loads `.yaml` files from `content/` and validates their fields. L2 and M2 courses remain readable in their legacy Markdown format; YAML with the same name takes precedence. Descriptions and summaries render as Markdown without executing supplied HTML.

## General organization

- One `.yaml` file per course, stored in `content/`, for example `content/introduction-aux-cultures-numeriques.yaml`.
- The file contains the course overview, general bibliography and ordered chapter list.
- Each chapter contains its summary, presentation resources and its own bibliography.
- Descriptions and summaries are multiline YAML strings. They can contain basic Markdown, which the site renders with formatting.
- Slides and downloadable documents remain separate resources, referenced by their URLs.

The entire document is YAML, rather than Markdown with YAML front matter. The filename identifies the course and its public URL; no additional root-level `id` field is required. Use the title as a lowercase slug, without accents and with hyphens (for example `introduction-aux-cultures-numeriques.yaml`). The academic level stays in `niveau`, allowing several courses to belong to the same year. The order of the `chapitres` list determines chapter order.

## Course fields

| Field           | Type               | Required | Usage                                           |
| --------------- | ------------------ | -------- | ----------------------------------------------- |
| `titre`         | String             | Yes      | Full course title.                              |
| `niveau`        | String             | Yes      | Academic level, for example `L1`, `L2` or `M2`. |
| `description`   | String             | Yes      | General introduction shown in Overview.         |
| `bibliographie` | List of references | No       | Course-wide readings.                           |
| `chapitres`     | List of chapters   | Yes      | Chapters in display order.                      |

`L1`, `L2` and `M2` are examples, not an exhaustive list of levels. The chapter list may be empty if no outline has been provided yet. `titre` and `niveau` must be non-empty strings; `description` and chapter `resume` must be strings but may be empty.

## Chapter fields

| Field           | Type               | Required | Usage                                            |
| --------------- | ------------------ | -------- | ------------------------------------------------ |
| `id`            | String             | Yes      | Stable identifier, unique within the course.     |
| `titre`         | String             | Yes      | Chapter title in the table of contents.          |
| `partie`        | String             | No       | Part number as `N/M`, displayed as a superscript without a separator. |
| `sous-titre`    | String             | No       | Short subtitle below the chapter title in desktop and mobile navigation. |
| `resume`        | String             | Yes      | Chapter summary, optionally spanning paragraphs. |
| `slides`        | List of resources  | No       | Presentations associated with the chapter.       |
| `bibliographie` | List of references | No       | Readings specific to this chapter.               |

Use a descriptive lowercase identifier without accents and with hyphens: `histoire-du-numerique`. It is independent of the chapter number and does not change when reordering the course. Preserve existing identifiers when editing. The order of `chapitres` determines numbering; do not add an `ordre` or `numero` field.

`sous-titre` is plain text, displayed with the shared `metadata` typography and accent color. Omit it or use `""` to show only the chapter title, without extra spacing. Whitespace-only subtitles are treated as empty; `null` and non-string values are rejected.

Use `partie: "1/3"` for a chapter taught in several parts. Navigation, headings and the course overview display the part as a superscript without a middle dot. Plain-text contexts such as the assistant use `Histoire du numérique 1/3`. Keep `titre` free of the part number to avoid duplication. `partie` is independent of `sous-titre` and the chapter's position in the course; it does not create or reorder chapters. Each part remains a separate chapter entry with its own stable `id`, resources and summary. Only add entries for supplied course material.

Omit `partie` or use `""` to leave the title unchanged. Whitespace-only values are treated as empty. Otherwise, use a quoted `N/M` string with positive integers, no leading zeros, and `N <= M`; invalid values, including `null`, are rejected.

## Slide resources

Each `slides` entry has the following fields:

| Field         | Type   | Required | Usage                                                                                    |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------- |
| `titre`       | String | Yes      | Resource label.                                                                          |
| `url`         | String | Yes      | Resource URL, either external or public within the site.                                 |
| `integration` | String | No       | `iframe` to display a web presentation within the chapter. Otherwise, it remains a link. |

```yaml
slides:
  - titre: "Chapter slides — PDF"
    url: "/supports/l1/histoire.pdf"
  - titre: "Online presentation"
    url: "https://example.org/presentations/histoire/"
```

`url` can point to a PDF, a web presentation or a site route providing access to a presentation. A source path such as `src/lib/Slides.svelte` is not a URL: for a Svelte resource, reference its public route once available.

Decks from the personal `svx-deck` framework are built separately and hosted
from workspace sources under `decks/<deck>/`, compiled into the portal build automatically. The iframe preserves their Svelte 5 runtime,
styles and interactions within the Svelte 5 course site. Use
`integration: "iframe"` only for web resources intended for embedding. Omit `integration` for ordinary links; any other value is rejected.

```yaml
slides:
  - titre: "History of computing"
    url: "/slides/history-1/index.html"
    integration: "iframe"
```

The build command and export modes are described in the
[course README](../site/README.md#interactive-slides).

## Bibliographies

Course and chapter bibliographies use exactly the same structure. Every entry is an object, even when it has no links.

| Field       | Type   | Required | Usage                                                                       |
| ----------- | ------ | -------- | --------------------------------------------------------------------------- |
| `reference` | String | Yes      | Full APA 7 reference; italics and links use inline Markdown.                |
| `url`       | String | No       | External URL for accessing the resource.                                    |
| `fichier`   | String | No       | Public path to a downloadable document hosted on the site.                  |
| `note`      | String | No       | Reading instruction separate from the reference, e.g. “Focus on chapter 2.” |

`url` and `fichier` are independent: an entry can have neither, either one, or both.

References follow **APA 7**, using French abbreviations (`s. d.`, `trad.`, `éd.`) for the French course content. Author surnames are followed by initials and the date in parentheses. Italicize book, web page and video titles, as well as journal titles and volumes; article titles, issue numbers and pages stay in roman type. For translated books, include the translator and original year when known. Do not invent a missing date: use `s. d.`.

Sort each bibliography by author, then chronologically for the same author. Teaching instructions belong in `note`, not in the APA citation. References are prepared editorially: the reader displays their formatting without automatically converting free-form citations to APA.

Use `*…*` for italics in `reference` and `[URL](URL)` for links. Include the DOI (as `https://doi.org/…`) or relevant URL at the end of the reference, without a final period after the address. Also retain `url` to identify the resource. The interface avoids repeating the access button when the address already appears in the reference. `fichier` retains its download button.

Structural examples with fictional references and addresses:

```yaml
bibliographie:
  - reference: "Author, A. (2020). *Book title*. Publisher."
    note: "Focus on chapter 2."

  - reference: "Author, B. (2021). Article title. *Journal Title, 12*(3), 10–25. [https://example.org/article](https://example.org/article)"
    url: "https://example.org/article"

  - reference: "Author, C. (2022). *Report title*. Organization."
    fichier: "/documents/l1/rapport.pdf"
```

The site displays italics, links, hanging indents and double spacing, without numbering references. HTML supplied in strings remains escaped. A URL can point to a PDF; forced downloading depends on the remote server.

Guidance: [books and translations](https://uniskills.library.curtin.edu.au/referencing/apa7/books/), [articles](https://uniskills.library.curtin.edu.au/referencing/apa7/journals/), [reference order and presentation](https://uniskills.library.curtin.edu.au/referencing/apa7/reference-lists/).

Keep the citation in `reference`. Do not replace it with separate `auteur`, `annee`, `editeur`, etc. fields or a plain string directly in the list. Do not use the current JavaScript model's English `bibliography` field in editorial YAML files.

## File paths

Paths beginning with `/` are **public URLs relative to the site root**, not absolute paths on the computer or paths relative to the YAML file.

With the current SvelteKit structure:

| YAML value                  | File location in the project           |
| --------------------------- | -------------------------------------- |
| `/documents/l1/texte.pdf`   | `site/static/documents/l1/texte.pdf`   |
| `/supports/l1/histoire.pdf` | `site/static/supports/l1/histoire.pdf` |

Do not put `/Users/...`, `file://...` or `static/...` in a link field. Use a full external URL (`https://...`, or `http://...` if necessary) or a public path beginning with a single `/`. Protocol-relative URLs (`//example.org`), whitespace, backslashes and control characters are rejected.

Do not invent a file or address to complete an entry. If a document has been supplied but not yet placed in the project, state the intended location and remaining work; do not claim the link already works.

## Complete example

This example illustrates the structure. Its teaching content, references and links are fictional and must be replaced with the actual course resources.

```yaml
titre: "Introduction to digital cultures"
niveau: "L1"

description: |
  This course explores the technologies, practices and imaginaries
  that shape our digital cultures.

  It combines a historical approach with an analysis of contemporary
  uses.

bibliographie:
  - reference: "Author, A. (2020). *General reference book title*. Publisher."
    url: "https://example.org/ouvrage"
    fichier: "/documents/l1/ouvrage.pdf"

chapitres:
  - id: "histoire-du-numerique"
    titre: "A history of computing"
    partie: "1/3"
    sous-titre: "From calculating machines to the Web"

    resume: |
      This chapter traces the major stages in the development
      of computing and networks.

      ## Key takeaways

      - Distinguish **the Internet** from **the Web**.
      - Identify the main technological transformations.

    slides:
      - titre: "Chapter slides"
        url: "/supports/l1/histoire.pdf"

    bibliographie:
      - reference: "Author, B. (2021). Article title. *Journal Title, 12*(3), 10–25."
        url: "https://example.org/article"

  - id: "information-et-communication"
    titre: "Information and communication"

    resume: |
      This chapter examines how information is encoded,
      transmitted and interpreted.

    slides: []
    bibliographie: []
```

## Authoring checklist

1. Produce a single YAML document with an object at its root. Use the `.yaml` extension, the French keys defined here and two spaces per indentation level, without tabs.
2. Put short strings in double quotes; escape internal quotes with `\"`. Use `|` for `description` and `resume`, preserving indentation throughout their paragraphs and Markdown lines.
3. Use Markdown in `description` and `resume` (paragraphs, lists, emphasis, links and subheadings) and inline Markdown in `reference` (APA italics and links). Other fields, including `note`, remain plain text or addresses. Do not insert HTML, Svelte code or executable expressions.
4. For an empty optional list, omit the field or write `[]`. Do not leave an empty key, which would become `null`. For absent `url` and `fichier` values, omit the key instead of providing an empty string.
5. Do not invent content, references, links or resources. If a description or summary has not been supplied and writing it has not been requested, use `""` and identify the missing content in the accompanying message. Do not create dummy resources or bibliography entries to fill lists.
6. Separate general references from chapter references according to Olivier's instructions. Do not automatically copy the general bibliography into each chapter. The same reference may appear at both levels if desired.
7. Preserve existing chapter identifiers and resources when updating. Do not add keys, YAML anchors, aliases, custom tags or undocumented configuration fields without an explicit need.
8. Verify that the YAML parses, required fields are present, lists contain the expected objects and chapter identifiers are unique. Check associated local files when accessible; distinguish proposed paths from files that are actually available.

YAML field names form the editorial contract. The reader converts them to internal JavaScript names (`title`, `sections`, etc.) without changing the format requested from Olivier. Course content retains its intended audience's language.
