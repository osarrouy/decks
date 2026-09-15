# svx-deck

A Svelte/mdsvex presentation framework with one visual design supplied by `@dg/ui`. Package: `@svx-deck/core`; executable: `svx-deck`.

## Commands

From the workspace root:

```sh
pnpm deck dev decks/history-1
pnpm deck build decks/history-1 --public
pnpm deck build decks/history-1 --presenter
pnpm deck export decks/history-1
pnpm deck preview decks/history-1
```

| Mode                     | Output                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Development              | Projection and `/presenter`, with speaker notes                                    |
| `--public`               | Projection without notes or a presenter route                                      |
| `--presenter`            | Projection and presenter view with speaker notes                                   |
| `--students` or `export` | Revision reader with filtered student notes                                        |
| `--embed`                | Interactive slide reader without notes, presenter routes or window synchronization |

Arrow keys and Space advance slides and steps. Hash URLs retain the current slide and step. The presenter view offers current/next previews, notes, navigation and a timer. Embedded readers offer native controls and a slide selector. The design system's stored light/dark preference applies to all views; same-origin embeds follow their portal.

## Deck sources

```text
decks/example/
  deck.svx
  deck.config.ts      Optional technical configuration
  static/             Public media
  components/         Local Svelte components
```

A minimal `deck.svx`:

```md
---
title: Example presentation
---

# First slide

Visible content.

--- notes

Speaker notes.

---

<!-- slide: steps=2 layout="center" -->

# Second slide
```

The frontmatter supplies `id`, `title` and `description`. Optional `deck.config.ts` fields take precedence:

```ts
import type { DeckConfig } from "@svx-deck/core/deck/types";

export default {
  title: "Example presentation",
  template: {
    source: "deck.svx",
    slideSeparator: "---",
    notesSeparator: "--- notes",
  },
} satisfies DeckConfig;
```

Defaults need not be repeated. A configuration file is useful for custom separators or a different source file. Generated files live in `.svx-deck.nosync/` and are never edited by hand. The `.nosync` suffix prevents cloud synchronization from duplicating volatile runtime files.

## Slide syntax

`---` starts a slide; `--- notes` starts its notes. A slide's title is inferred from its first heading and its ID from the title; source order controls navigation. Optional `<!-- slide: ... -->` metadata sets `id`, `title`, `steps`, `layout`, `align` or `tone`.

Layouts: `cover`, `center`, `two-columns`, `columns`, `stack`. Alignment values: `start`, `center`, `end`. Internal Markdown containers such as `::: columns`, `::: column` and `::: center` provide equivalent layout blocks. Unknown container names become classes.

Pandoc-style attributes can be appended to headings and images:

```md
# A heading {.wide-heading}

![Artwork](/artwork.jpg){data-glow="strong"}
```

Local components import through `$components`. Progressive content uses `Fragment`:

```svelte
<script>
  import Fragment from "@svx-deck/core/components/Fragment.svelte";
  import Diagram from "$components/Diagram.svelte";
</script>

<Fragment at={1}><Diagram /></Fragment>
```

`Persona` is available in deck markup without an import. It displays `name`, `dates` and `picture`. Other reusable components and controller helpers are exported through the package. Domain-specific teaching simulations remain with their decks.

Images with `data-glow`, `data-glow="soft"` or `data-glow="strong"` receive a color-derived halo. If browser pixel access is unavailable, the accent supplies a fallback.

## Embedded exports and assets

```sh
pnpm deck build decks/history-1 --embed \
  --base /slides/history-1 --out-dir /tmp/history-1-web
```

Serve the complete output under `/slides/history-1/` and embed `/slides/history-1/index.html`. Reserve a 16:9 viewport plus 52 px for controls. `--embed` cannot be combined with `--students` or `--presenter`.

`--base` is a public path without a trailing slash. Literal references to actual files in `static/` receive this prefix; external URLs stay unchanged. Dynamically constructed paths must account for the prefix themselves.

`--out-dir` is relative to the deck or absolute. A nonempty custom output directory must already contain `svx-deck.json`; deck sources cannot be used as output. The manifest records export mode, base, note inclusion and slide count. Static HTML/CSS/JavaScript exports are supported; PDF, PPTX and video exports are not provided.

## Design and source preservation

`@dg/ui` owns shared colors, fonts, typography roles and controls. The framework owns slide geometry, projection sizes, layouts, notes and previews in their Svelte components. Imported CSS and component sources participate in normal Vite hot reload. There is no theme registry, theme package or per-deck theme selection.

Existing teaching sources were moved without edits. Their historical `theme` fields are ignored; the runtime resolves their former package imports and supplies local CSS values derived from `@dg/ui`. These accommodations preserve authored material and do not introduce another theme. New code uses `@svx-deck/core` and the current design tokens directly.

## Verify

```sh
pnpm --filter @svx-deck/core check
pnpm --filter @svx-deck/core test
```

The parser and Vite plugin share one implementation. `src/cli/` dispatches commands; `src/runtime/` generates applications and supplies build configuration; `src/lib/` owns compilation helpers and presentation components.
