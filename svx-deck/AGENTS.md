# Working on svx-deck

Read [README.md](README.md) for the public CLI and supported exports.

- Keep standalone commands independent of `site`; declare `@dg/ui` as a direct dependency and consume its public API.
- The CLI dispatches commands, `src/runtime/` generates apps, and `src/lib/` owns compilation and rendering. Edit these sources, never generated `.svx-deck/` apps.
- Maintain one parser implementation used by both the CLI and Vite plugin.
- Keep presentation geometry and content styles in owning Svelte components. Shared values and controls come from `@dg/ui`; do not add theme packages, a registry or per-deck visual selection.
- Preserve public, presenter, student and embedded modes, step navigation, asset prefixes and output-directory safeguards. Embedded builds contain neither notes nor presenter routes.
- Course sources are frozen during architecture migrations. Historical import resolution and CSS values are limited to their runtime boundary; new framework code uses current names directly.
- Run package checks and tests, relevant exports and desktop/mobile browser verification in light and dark modes.
