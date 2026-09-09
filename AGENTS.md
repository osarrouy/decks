# Assistant persona

At session start, read `~/Documents/Lilith/persona.md`, then `~/Documents/Lilith/style.md`, then `~/Documents/Lilith/workflows.md`.

# Working on University

Shared repository instructions for coding agents. Start with the [project overview](README.md), then read the local `AGENTS.md` and README for the directory you are changing. The current user request takes precedence over these defaults.

## Documentation scope

- Keep root documentation limited to repository-wide concerns, the slide engine and the course portal. Do not put subproject-specific behavior, constraints or implementation details in general `README.md` or `AGENTS.md` files.
- Put agent instructions in the nearest applicable `AGENTS.md`, inside the owning app or package. Move a rule there as soon as it applies only to that subproject; do not repeat it in parent instructions or sibling projects.
- Keep `README.md` files reader-oriented: purpose, setup, public APIs, examples and commands for their own scope. Agent workflows and implementation preferences belong in the local `AGENTS.md`; editorial schemas belong in the local format guide.
- General documentation may link to local documentation for orientation, without reproducing its details. Before adding documentation, identify its owner and choose the narrowest applicable scope.

## Work within the existing project

- Inspect the working tree before editing. Preserve unrelated work, including uncommitted changes and files moved by another task.
- Implement the requested change through verification. Make routine, reversible decisions without repeatedly asking for confirmation; clarify when missing information changes the scope or intended behavior.
- Read the current code and configuration before relying on conversation history. Keep existing dependency versions and framework conventions unless an upgrade is part of the task.
- Keep changes focused. Do not add dependencies, configuration layers, files or public options without a present need. Keep shared configuration and maintenance scripts together in `tooling/`. App-specific scripts stay in their owning app.
- Keep private credentials in local environment files and server-side services. Never embed them in static pages, examples, logs or commits.

## Code and component design

Both the portal and `svx-deck` consume `@dg/ui`. The framework owns projection and presenter geometry; shared design values come from the UI package. Keep deck surfaces independent of the portal Page wrapper.

- **KISS.** Prefer direct logic, short descriptive names and native JavaScript, HTML and Svelte features. Remove dead code and unnecessary indirection in the code being changed. Concision must remain readable.
- Use `$props` for component inputs, `$state` for mutable UI state and `$derived` for computed values. Reserve `$effect` for browser side effects and clean up timers and listeners. Use callback props, snippets and `$app/state`; use `$bindable` only for intentional two-way bindings. Avoid `svelte/legacy` migration helpers.
- Keep component markup, logic and styles together in the owning `.svelte` file. This includes pages, layouts, media queries and interaction states.
- Reuse public components through `@dg/ui`. Keep domain-specific components in their owning app; reusable presentation components belong in `svx-deck`.
- Prefer composition and direct CSS-valued props. Use `Button` with `href` for a link styled as a button.
- Preserve native semantics, keyboard behavior, visible focus, accessible names and reduced-motion support. Give each rendered view one `main#main` landmark and a `SkipLink` before it.

## CSS ownership

- Use `@dg/ui` for shared design values and CSS foundations. Reuse across apps calls for an `@dg/ui` component with its own scoped styles, not component CSS moved into global foundations.
- Use simple local selectors: `a`, `footer`, `.logo`, `.links`. Avoid redundant classes, systematic prefixes and BEM naming used solely to prevent component collisions.
- Keep `:global(...)` narrowly anchored under an owning local element for snippets, generated markup or necessary cross-component layout. Avoid global selectors that depend on component internals.
- A token represents a shared decision, not every pixel or state. Keep component-specific dimensions, radii and optical adjustments local. Internal CSS variables use `--_`; public overrides identify their component.
- Use shared spacing and typography roles where they fit. Self-host shared custom fonts. Reading text is sans-serif, editorial headings are serif, and explicitly mono UI uses CSS `text-transform: uppercase` without mutating data.
- Preserve values and cascade order during CSS cleanup. Group declarations and tokens by function; retain useful inline comments after declarations. Use the repository's current Prettier configuration rather than copying historical settings.
- Preserve frame geometry: one-pixel strokes, clear corner cutouts and a single cross at shared junctions.

## Visual decisions

- Carry the existing visual language forward: white and neutral-gray surfaces, restrained borders, pink accents, thin controls and the capsule theme toggle. Read current tokens and component defaults for exact values.
- When visual exploration is requested, show concrete rendered alternatives. Once an option is chosen, make it the default in development and production and remove temporary pickers, variants and preference plumbing.
- Do not put implementation details or development controls into audience-facing flows unless they help users make a meaningful decision.

## Writing

- Write repository documentation, comments, test descriptions, developer messages and shared UI defaults in English. Respond to humans in the language of the conversation.
- Preserve audience-specific text, source quotations, existing data keys, URLs and identifiers in their intended language.
- Write clear, concrete prose. Explain purpose, usage and meaningful constraints; omit promotional filler, repeated rules and histories of discarded experiments. Comments should explain intent or non-obvious behavior, not restate the code.
- Preserve supplied material and source provenance. Do not invent references, links or missing files.

## Verification and delivery

- Match verification to the change. Documentation-only work needs formatting, local-link and example checks; behavior changes need the relevant existing tests. Add tests for meaningful behavior or fragile regressions, not to mirror a trivial edit.
- For app or shared UI code, run the relevant checks and build. Verify shared changes across their consumers. The [README commands](README.md#verify) are authoritative.
- For rendered UI changes, inspect the browser on desktop and at a narrow mobile width (around 390 px), in both themes. Check overflow, frame junctions, long text, keyboard interaction and affected state transitions. Compilation alone does not establish visual correctness.
- When themes or interactive components change, check persistence, reloads, focus restoration and reduced motion where relevant. Review visual snapshot changes before accepting them; do not regenerate snapshots merely to silence failures.
- If a check or browser tool is unavailable, report what remains unverified. Distinguish pre-existing failures from regressions caused by the change.
- Finish with a concise account of what changed, why, what was verified and any remaining limitation. Link to the relevant files; do not present unrun checks as successful.

## Local UI dependency

- The portal and framework declare `@dg/ui`; the root pnpm override selects its local checkout during development. Keep imports through its public API and resolve a single Svelte runtime. The link will later be replaced by a published version.
- Changes to the external UI package belong in its own repository. This workspace owns the portal and presentation integration; do not import tooling from the UI repository.
- Keep standalone deck development and public, presenter, student and embedded exports usable without building the portal.

## Source layout

- Software lives in `site/` and `svx-deck/`; editorial sources live in `content/` and `decks/`. Read their local instructions before authorized content changes.
- Preserve authored files byte for byte during architecture and style migrations. Historical imports and metadata in frozen courses are handled at the framework boundary.
