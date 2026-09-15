# University

A pnpm workspace for a course website and standalone Svelte presentations. The portal and the deck engine share the locally linked `@dg/ui` design system.

```text
site/         Course website and deck integration
svx-deck/     Presentation framework and CLI (@svx-deck/core)
content/      Course descriptions, outlines and bibliographies
decks/<id>/   Deck sources, assets and local teaching components
tooling/      Shared formatting and browser verification
tests/ui/     Browser tests for the site and embedded decks
```

## Setup

```sh
pnpm install
pnpm dev
```

The portal normally opens on `http://localhost:5175`. Vite reports another port if it is occupied.

The root `package.json` selects the local `@dg/ui` checkout through `pnpm.overrides`. Its path is relative to this workspace and currently points to `~/Code/@dg/packages/ui`. Install that checkout's dependencies once, then install this workspace. No UI package build is required. Update the override if the checkout moves; replace it with a published version when available. Both consumers declare their own dependency and deduplicate Svelte.

## Work with decks

Start an existing deck directly from the workspace root:

```sh
pnpm dev:blockchain
pnpm dev:demo
pnpm dev:economics
pnpm dev:history-1
pnpm dev:history-2
pnpm dev:introduction
pnpm dev:social-networks
```

Each shortcut starts only its deck, with projection and `/presenter` views. Additional CLI options can be appended, for example `pnpm dev:history-1 --port 5180` or `pnpm dev:history-1 --students`.

The generic command also supports other decks and exports:

```sh
pnpm deck dev decks/history-1
pnpm deck dev decks/history-1 --students
pnpm deck build decks/demo --public
pnpm deck build decks/demo --presenter
pnpm deck export decks/history-1
pnpm deck preview decks/history-1
```

Deck commands do not build or start the course portal. Each deck keeps its generated app under `.svx-deck.nosync/` and its default export under `build/`; both are ignored by Git. The `.nosync` suffix keeps volatile runtime files out of cloud synchronization.

See the [framework guide](svx-deck/README.md) for configuration, syntax and export modes, and the [deck authoring guide](decks/README.md) for speaker notes.

## Course website

```sh
pnpm dev
pnpm build
pnpm preview
```

The portal reads `content/`. Development starts embedded servers for referenced local decks; production assembles their static exports into `site/build/`. Public course URLs under `/slides/<id>/` remain stable even though the source directory is named `decks/`. Speaker notes are excluded from embedded exports.

See the [portal guide](site/README.md) and [course format](content/COURSE_FORMAT.md).

## Verify

```sh
pnpm check
pnpm deck build decks/demo --public
pnpm deck build decks/demo --presenter
pnpm deck export decks/demo
pnpm build
PLAYWRIGHT_CHANNEL=chrome pnpm test:ui
```

`pnpm check` runs Svelte diagnostics and unit tests for both packages. Browser tests cover the portal and its embedded decks. To test an already running portal, set `COURSE_TEST_ORIGIN`, for example `http://127.0.0.1:5177`.

Formatting configuration lives in `tooling/prettier.json`. Generated exports, dependencies and course source files must not be included in broad formatting commands.
