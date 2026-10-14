# Working on course resources

Read [README.md](README.md) for setup and supported workflows, and [content instructions](../content/AGENTS.md) before editing course content.

## Components and interaction

- Keep course navigation and content rendering in this app rather than `@dg/ui`.
- Preserve the course overview before its chapters, the fixed chapter-selection line and the separation between presentation, bibliography, slides and assistant.
- Keep course content available while interacting with the floating chat.
- Use `SkipLink`, `Page`, `Header`, `Main` and `Footer` from `@dg/ui`, with `Page lang="fr"` and `SkipLink` as its first child. `Page` owns responsive margins; `Main` joins adjacent section frames. Place floating assistants and dialogs inside `Page` after `Footer`, so they receive the page language while framed sections remain the first and last DOM children of `Main`.
- Course resource views are separate URLs: navigate between them with links (`ResourceTabs`), not the panel-switching `Tabs` widget.

## Integration

- Editorial rules belong to `content/AGENTS.md`; the app reads `content/` without rewriting sources.
- Resolve the framework through the public `@svx-deck/core/cli` export. Keep portal orchestration in this app.
- Preserve public `/slides/<id>/` URLs while resolving source files in `decks/<id>/`.
- Production builds export referenced decks without speaker notes. Do not hand-edit generated bundles.
- Retain safe Markdown and public-URL validation.
