# Working on course resources

Read [README.md](README.md) for setup and supported workflows, and [content instructions](../content/AGENTS.md) before editing course content.

## Components and interaction

- Keep course navigation and content rendering in this app rather than `@dg/ui`.
- Preserve the course overview before its chapters, the fixed chapter-selection line and the separation between presentation, bibliography, slides and assistant.
- Keep course content available while interacting with the floating chat.
- Use `SkipLink`, `Page`, `Header`, `Main` and `Footer` from `@dg/ui`. `Page` owns responsive margins; `Main` joins adjacent section frames. Keep floating assistants and dialogs outside `Page` so framed sections remain the first and last DOM children of `Main`.

## Integration

- Editorial rules belong to `content/AGENTS.md`; the app reads `content/` without rewriting sources.
- Resolve the framework through the public `@svx-deck/core/cli` export. Keep portal orchestration in this app.
- Preserve public `/slides/<id>/` URLs while resolving source files in `decks/<id>/`.
- Production builds export referenced decks without speaker notes. Do not hand-edit generated bundles.
- Retain safe Markdown and public-URL validation.
