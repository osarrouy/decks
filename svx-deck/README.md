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
decks/
  deck.config.yaml          Optional configuration shared by child decks
  example/
    deck.svx
    deck.config.yaml        Optional local overrides
    static/                 Public media
    components/             Local Svelte components
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

The frontmatter supplies `id`, `title` and `description`. Technical defaults can be declared once in `deck.config.yaml` beside the deck directories:

```yaml
template:
  source: deck.svx
  slideSeparator: "---"
  notesSeparator: "--- notes"
```

A deck can override the shared values with its own `deck.config.yaml`:

```yaml
title: Example presentation
template:
  notesSeparator: "--- speaker notes"
```

Configuration is resolved in this order: framework defaults, the shared parent YAML, deck frontmatter for `id`, `title` and `description`, then the local YAML. The `template` mapping is merged so a local field does not erase the other shared fields. Unknown keys and invalid value types stop the command with a configuration error.

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

`Persona` and `FramedImage` are available in deck markup without imports. `Persona` displays `name`, `dates` and `picture`; `FramedImage` displays an image inside the shared frame and extends its lines to the slide edges. Other reusable components and controller helpers are exported through the package. Domain-specific teaching simulations remain with their decks.

`Persona` uses standard frame borders without corner crosses or glow. Both components accept `glow`, a boolean that defaults to `false`; `glow={true}` adds a light color-derived halo. Direct `FramedImage` usage retains corner crosses by default; pass `crosses={false}` to hide them.

```svelte
<Persona name="Ada Lovelace" dates="1815–1852" picture="/lovelace.jpg" />
<Persona name="Ada Lovelace" picture="/lovelace.jpg" glow={true} />
```

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

`@dg/ui` owns shared colors, fonts, typography roles, spacing, crosses and controls. The deck's visual styles live in [`theme/default.css`](theme/default.css), automatically imported by `SlideSurface.svelte` in projection, presenter, student and embedded views. Edit this file to change slide typography, layouts, media and decoration. Its selectors are contained by the slide surface; projection sizes remain fluid, while shared values and the `.crossed` decoration come from DG. Other components keep their own geometry and styles.

The default frame uses DG's one-pixel `--border` strokes and corner crosses. Its lines extend to the slide edges, with the same clearance around every cross as DG frames.

Imported CSS and component sources participate in normal Vite hot reload. There is no theme registry, theme package or per-deck theme selection.

Slide surfaces use DG's `.typography` context and set only `--font-size-base` for their type scale. The surrounding view supplies a query container, so projection, presenter, student and embedded surfaces follow their own available width. The document root, notes and controls keep their normal scale. H1 uses DG's viewport-fluid formula where typed CSS division is supported, with DG's proportional fallback elsewhere.

Teaching sources use current DG color and font-family tokens. Their historical `theme` fields are ignored and former package imports remain resolved by the runtime. Technical token migrations preserve prose, notes, metadata and assets. New code uses `@svx-deck/core` and the current design tokens directly.

## Verify

```sh
pnpm --filter @svx-deck/core check
pnpm --filter @svx-deck/core test
```

The parser and Vite plugin share one implementation. `src/cli/` dispatches commands; `src/runtime/` generates applications and supplies build configuration; `src/lib/` owns compilation helpers and presentation components.
