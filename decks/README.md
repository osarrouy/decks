# Deck authoring

Each subdirectory is a standalone deck, with `deck.svx`, an optional `deck.config.yaml`, `static/` media and optional `components/`. Shared technical defaults live in `decks/deck.config.yaml`; a deck's local configuration overrides them. The framework generates its application under `.svx-deck.nosync/`; no hand-maintained SvelteKit app is required.

```sh
pnpm deck dev decks/history-1
pnpm deck build decks/history-1 --presenter
pnpm deck export decks/history-1
```

See the [framework guide](../svx-deck/README.md) for syntax, the public API and export modes. Local components import through `$components`.

## Indications dans les notes

Dans une section `--- notes`, les directives conteneur `:::comment`, `:::example` et `:::warning` permettent d’annoter plusieurs paragraphes :

```md
:::comment
Montrer la trajectoire sur la slide.

Insister sur la différence entre position mesurée et position anticipée.
:::
```

Une directive `:::comment` reçoit un style distinct dans le panneau **Notes** de `/presenter`. Elle n’apparaît pas sur la slide projetée.

Pour distinguer un exemple pédagogique d’une indication de mise en scène, utiliser `:::example` :

```md
:::example
Le thermostat est un exemple simple de rétroaction.

La consigne est conçue de l’extérieur ; la régulation, elle, est produite
par la boucle de rétroaction.
:::
```

The `:::warning` container marks an important qualification or a likely misunderstanding. It is labelled **Attention** in the rendered notes:

```md
:::warning
Une valeur exprimée en euros ne représente pas nécessairement une quantité
de monnaie disponible pour payer.
:::
```

Each container opens with three colons and its name on a separate line and closes with `:::`. These containers can contain several paragraphs, lists and other Markdown elements. They do not appear in the projected slide. Student exports preserve examples and warnings but omit `:::comment` presentation cues.

L’ancien format en blockquote reste accepté :

```md
> [!COMMENT]
> Une indication courte.

> [!EXEMPLE]
> Un exemple court.
```

## Editorial guidance

See [AGENTS.md](AGENTS.md) for the distinction between minimal projected slides and concise speaker notes written in complete sentences, and for the workflow governing editorial changes.
