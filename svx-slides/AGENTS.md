# Working on the slide engine

- Keep the CLI and standalone exports independent of `apps/cours` and `@dg/ui`.
- Modify the runtime generator, not generated `.svx-slides/` apps.
- Preserve public, presenter, student and embedded modes, step navigation, asset prefixes and output-directory safeguards.
- Embedded builds never include speaker notes or presenter routes. Student exports keep only filtered student notes.
- Preserve the existing deck themes and layouts; portal UI defaults do not replace them.
- Run the engine tests and the relevant standalone exports after generator changes.
