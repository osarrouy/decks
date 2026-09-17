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

The [Caddy configuration](deploy/Caddyfile) serves the generated error document with status 404. Railway's own gateway errors require platform support; a Svelte component cannot handle a host outage.

## Railway deployment

The [Site workflow](../.github/workflows/site.yml) runs on pushes and pull requests targeting `main`, and can be started manually. It runs diagnostics, unit tests, the complete portal/deck build, HTTP checks and browser tests against a Caddy container. It does not upload artifacts or trigger deployments. Railway watches `main` with **Wait for CI** enabled: after GitHub Actions succeeds, Railway retrieves that commit, builds the site and deploys it. Pull requests never deploy.

GitHub Actions and Railway use the same [private UI checkout script](../tooling/fetch-ci-ui.mjs), which pins a commit from `distributedgallery/interfaces`, verifies GitHub's SSH host key and deletes temporary credentials even when checkout fails. A [build-only helper](../tooling/ci-ui.mjs) adjusts dependency links in the disposable checkout without changing locked versions. Local development retains its existing UI link. Uncommitted UI changes are not included; update the pinned commit after pushing UI changes to its repository.

Configure these settings:

| Setting | Purpose |
| --- | --- |
| GitHub Actions secret `DG_UI_DEPLOY_KEY` | Read-only deploy key on `distributedgallery/interfaces` for CI |
| Railway variable `DG_UI_DEPLOY_KEY` | Separate read-only deploy key on the same private repository for builds |
| Railway variable `RAILPACK_CONFIG_FILE` | `site/deploy/railpack.json` |
| Railway source | `osarrouy/decks`, branch `main`, repository root `/` |
| Railway build settings | Railpack builder; health check `/`, timeout 60 seconds; restart on failure, maximum 3 retries |
| Railway **Wait for CI** | Enabled; failed checks block automatic deployment |

The Railway GitHub integration needs access to the course repository. The [Railpack configuration](deploy/railpack.json) installs Node 22 and the workspace's pnpm version, retrieves the private UI dependency, and runs `pnpm build`. Build credentials are supplied through secret mounts, removed from package-install/build child environments, and excluded from the final image. Only `site/build/` and the shared [Caddy configuration](deploy/Caddyfile) are copied into the runtime image. The public domain targets port 8080; the root-page health check gates promotion. HTML and mutable media revalidate; fingerprinted assets use long-lived caching.

GitHub Actions needs only repository read access; `RAILWAY_TOKEN`, `RAILWAY_SERVICE_ID` and `SITE_URL` are no longer used by the workflow. Do not add a deployment-waiting job to this workflow: Railway is itself waiting for the workflow to finish. Fork pull requests cannot access the private UI key and require a trusted branch with access to run the full build.

To verify the public server locally, after `pnpm check` and `pnpm build`:

```sh
deployment_dir=$(node site/scripts/prepare-deploy.mjs)
docker build -t university-site "$deployment_dir"
docker run --rm -p 127.0.0.1:8080:8080 university-site
# In another terminal:
node site/scripts/check-deploy.mjs http://127.0.0.1:8080
COURSE_TEST_ORIGIN=http://127.0.0.1:8080 pnpm test:ui
# After Railway deploys the same source and UI commits:
node site/scripts/check-deploy.mjs https://<public-domain>
```

The preparation command creates an isolated temporary directory for local/CI Docker checks and prints its path. It copies only `site/build/`, the Dockerfile and Caddyfile, verifies that embedded manifests exclude notes, and leaves authored course files intact. Production builds happen directly on Railway; there is no CLI export upload or generated publication branch. The HTTP check compares served pages against the local build, so run it against matching source and UI commits.
