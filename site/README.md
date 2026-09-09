<p><strong>distributed·gallery / university</strong></p>

# Course resources

Outlines, readings and interactive slides for Olivier Sarrouy's courses, with a floating assistant demo alongside the material.

[Workspace](../README.md) · [YAML format](../content/COURSE_FORMAT.md) · [Interactive slides](#interactive-slides) · [Assistant](#assistant)

---

## Run locally

From the repository root, after `pnpm install`:

```sh
pnpm dev
```

Open **http://localhost:5175**. The app uses Svelte and SvelteKit with static output; no credentials or backend are needed for the current demo.

## Reading a course

| Area      | Contents                                             |
| --------- | ---------------------------------------------------- |
| Overview  | Course presentation and general bibliography         |
| Chapter   | Summary, slides and chapter-specific readings        |
| Assistant | Contextual suggestions and predefined demo responses |

Courses open on Overview, before the ordered chapter list. On mobile, a collapsible chapter menu replaces the chapter list while Overview remains directly accessible. Its choices are ordinary links: use Tab and Enter to navigate, or Escape to close the menu and return focus to its trigger. The menu scrolls within the available viewport height. The pink selection line is 3 px thick, offset 2 px left of the frame, with corner crosses above it.

The URL preserves the selected view, chapter and resource through `vue=presentation|bibliographie|chapitres`, `section` and `onglet`. Existing chapter links without `vue` remain supported.

## Edit course content

One file in `../content/` describes one complete course. Its filename becomes its URL; `niveau` is academic metadata, independent of that filename. Chapter identifiers remain stable when chapters are reordered.

| Source                                                                                              | Public route                                                   |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`introduction-aux-cultures-numeriques.yaml`](../content/introduction-aux-cultures-numeriques.yaml) | `/introduction-aux-cultures-numeriques/` (legacy `/l1/` alias) |
| [`l2.md`](../content/l2.md)                                                                         | `/l2/`                                                         |
| [`m2.md`](../content/m2.md)                                                                         | `/m2/`                                                         |

YAML takes precedence over a Markdown file with the same basename. Legacy `section=section-N` links remain usable. The three chapters following the history chapter in the introductory course are provisional proposals.

Legacy Markdown course filenames start with a lowercase letter or digit. Uppercase Markdown files in `content/`, such as `AGENTS.md` and `COURSE_FORMAT.md`, are documentation and are excluded from the catalog.

To add a course, create a title-slugged `.yaml` file using the [complete format example](../content/COURSE_FORMAT.md#complete-example). Add its resources under `static/` and reference their public paths, such as `/documents/reading.pdf`. The catalog discovers course files automatically.

Descriptions and summaries render Markdown with supplied HTML escaped. General and chapter bibliographies use APA 7 references with inline italics and DOI/URL links, hanging indents and double spacing. Reading instructions belong in the separate `note` field. See [COURSE_FORMAT.md](../content/COURSE_FORMAT.md) for validation rules and supported fields.

## Interactive slides

The course portal and decks share this workspace. The history chapter uses `decks/history-1/deck.svx`; an iframe preserves its presentation layout, interactive components, steps and keyboard controls independently of the portal.

```yaml
slides:
  - titre: "Histoire du numérique"
    url: "/slides/history-1/index.html"
    integration: "iframe"
```

`pnpm dev` discovers local deck references in course YAML, starts an embedded development server for each referenced deck, and proxies them through the portal. Edit `decks/<deck-id>/deck.svx`, its components or the shared design system to see changes without an import step. Restart the command after adding or removing deck references or changing a deck configuration. Remote slide links remain external resources.

`pnpm build` exports those decks without speaker notes, checks their manifests, builds the portal and includes the exports in `site/build/slides/`. Generated files live in ignored build directories; there are no committed copies under `static/slides/`. A failed deck export stops the build before the portal build is replaced. Asset paths constructed dynamically must include the deck's public prefix.

Standalone slide commands remain independent:

```sh
pnpm deck dev decks/history-1
pnpm deck build decks/demo --public
pnpm deck build decks/demo --presenter
pnpm deck export decks/history-1
```

They write to each deck's own `build/`, separate from `site/build/`. The portal uses embedded exports; student exports still include filtered revision notes and presenter exports retain speaker notes. See the [workspace guide](../README.md) for all slide commands.

## Local UI development

The app imports the public components and styles of `@dg/ui`. The workspace selects its local checkout once through the root `pnpm.overrides` entry; see [workspace setup](../README.md#setup). Vite compiles the linked sources, watches their changes and deduplicates Svelte. The deck framework consumes the same package independently.

## Assistant

[`Chat.svelte`](src/lib/Chat.svelte) is a local demo with predefined responses: it makes no network requests and stores nothing persistently. The same three suggestions generate responses from the selected chapter and its bibliography.

Conversations and drafts survive chapter and tab changes, resizing, closing the chat and returning from fullscreen. They reset when leaving the course or reloading the page. Floating mode keeps course resources accessible; fullscreen uses a native modal dialog, and Escape closes it.

The assistant appears when the course has at least one chapter. A future live service would connect through `send` in `Chat.svelte`, with credentials kept on a backend. The app uses the public chat component API from `@dg/ui`.

## Source map

| Location                                                               | Responsibility                                      |
| ---------------------------------------------------------------------- | --------------------------------------------------- |
| [`src/lib/courses.js`](src/lib/courses.js)                             | Catalog loading, YAML precedence and legacy aliases |
| [`src/lib/course-content.js`](src/lib/course-content.js)               | Parsing, validation and safe Markdown rendering     |
| [`src/routes/[course]/+page.svelte`](src/routes/[course]/+page.svelte) | Course views, chapter selection and resource tabs   |
| [`src/lib/ChapterPicker.svelte`](src/lib/ChapterPicker.svelte)         | Mobile chapter navigation and viewport fitting      |
| [`src/lib/SlideDeck.svelte`](src/lib/SlideDeck.svelte)                 | Embedded presentation and fullscreen controls       |
| [`src/lib/FloatingAssistant.svelte`](src/lib/FloatingAssistant.svelte) | Floating chat integration                           |
| [`scripts/site.mjs`](scripts/site.mjs)                                 | Development servers and combined production build   |
| [`scripts/decks.mjs`](scripts/decks.mjs)                               | Local deck discovery and source validation          |

The layout composes shared `Header`, `Page` and `Footer` components. Header identifies `olivier@sarrouy` / `university`; Footer shows `olivier·sarrouy` and a local clock. The retained Rennes 2 mark in `static/rennes2.svg` comes from the university's official website.

## Build and verify

From the workspace root:

```sh
node --test site/tests/course-content.test.js
pnpm --filter site build
pnpm --filter site preview
```

Output is written to `site/build/`, including slide assets. Serve this directory from the host root with directory-index support: course routes use trailing slashes and generate `<course>/index.html`. Use `pnpm check:site` for Svelte diagnostics and content tests and `pnpm test:ui` for browser coverage, including chapter selection, tabs, slides and the assistant.

## Error responses

[`src/routes/+error.svelte`](src/routes/+error.svelte) uses the shared `ErrorPage` component with French text. The build also generates `404.html` with the app's navigation and error content, readable without JavaScript.

Configure the static host to serve `build/404.html` for missing pages **with HTTP status 404**, keeping the requested URL. Do not redirect missing URLs to `/404` or rewrite every request to `index.html` with status 200. The app’s SvelteKit configuration emits root-relative asset URLs so the error document works at nested paths. Existing pages must still resolve before the error document is used.

No production host configuration is tracked in this app. The host's own 400/500/502/503 responses require its custom-error support; a Svelte component cannot handle a host outage. Verify the deployed site with a nested missing URL and check the status, styles and home link.
