# Working on course resources

Read [README.md](README.md) for setup and supported workflows, and [content instructions](../content/AGENTS.md) before editing course content.

## Components and interaction

- Keep course navigation and content rendering in this app rather than `@dg/ui`.
- Preserve the course overview before its chapters, the fixed chapter-selection line and the separation between presentation, bibliography, slides and assistant.
- Keep course content available while interacting with the floating chat.
- Use `Page` with direct `width` and `margin` props, preceded by `SkipLink`. Do not introduce `PageFrame`, abstract size presets or wrappers that duplicate existing frames.

## Integration

- Editorial rules belong to `content/AGENTS.md`; the app reads `content/` without rewriting sources.
- Resolve the framework through the public `@svx-deck/core/cli` export. Keep portal orchestration in this app.
- Preserve public `/slides/<id>/` URLs while resolving source files in `decks/<id>/`.
- Production builds export referenced decks without speaker notes. Do not hand-edit generated bundles.
- Retain safe Markdown and public-URL validation.
