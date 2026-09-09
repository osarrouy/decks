# Working on course resources

Read [README.md](README.md) for setup and supported workflows, and [COURSE_FORMAT.md](COURSE_FORMAT.md) before editing course content.

## Components and interaction

- Keep course navigation and content rendering in this app rather than `@dg/ui`.
- Preserve the course overview before its chapters, the fixed chapter-selection line and the separation between presentation, bibliography, slides and assistant.
- Keep course content available while interacting with the floating chat.

## Course content

- Keep one complete course per title-slugged YAML file, `niveau` as metadata and stable chapter identifiers. Preserve existing resources and legacy links.
- An English documentation pass does not authorize translating the courses or renaming their YAML contract.
- Do not invent teaching content unless asked to draft it; label proposed chapters as provisional.
- Use APA 7 references with separate reading notes, following the course format guide.
- Keep unpublished notes private. The portal reads embedded deck references from course YAML and runs the workspace slide sources directly in development. Production builds export the referenced decks without notes. Do not hand-edit generated bundles.
- Retain safe Markdown and public-URL validation.
