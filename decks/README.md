# Deck authoring

Each subdirectory is a standalone deck, with `deck.svx`, an optional `deck.config.ts`, `static/` media and optional `components/`. The framework generates its application under `.svx-deck/`; no hand-maintained SvelteKit app is required.

```sh
pnpm deck dev decks/history-1
pnpm deck build decks/history-1 --presenter
pnpm deck export decks/history-1
```

See the [framework guide](../svx-deck/README.md) for syntax, the public API and export modes. Local components import through `$components`.

## Indications dans les notes

Dans une section `--- notes`, utiliser les directives conteneur `:::comment` et `:::example` pour annoter plusieurs paragraphes :

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

Ces deux directives peuvent contenir plusieurs paragraphes, listes et autres éléments Markdown. Elles restent réservées aux notes du speaker et n’apparaissent pas dans la projection.

L’ancien format en blockquote reste accepté :

```md
> [!COMMENT]
> Une indication courte.

> [!EXEMPLE]
> Un exemple court.
```

## Style des notes de cours

Les notes du speaker doivent servir d’aide-mémoire, et non constituer un texte intégral à lire ou à rédiger mot à mot. Leur longueur est variable : les passages simples restent très courts ; les passages techniques, subtils ou pédagogiquement délicats peuvent être développés davantage.

Privilégier des paragraphes de cours en phrases complètes plutôt qu’une liste de points. La priorité est de conserver l’ordre pédagogique du discours : idée directrice, définitions, enchaînement des mécanismes, exemples, dates et noms, précautions, conclusion et transition vers la slide suivante. La formulation doit rester condensée, mais suffisamment précise pour permettre de retrouver exactement comment articuler et expliquer le propos.

Quand c’est utile, hiérarchiser explicitement ce qui est indispensable à retenir et ce qui relève d’un approfondissement. Signaler aussi les formulations à éviter lorsqu’une simplification risquerait de produire un contresens historique, technique ou conceptuel.

Utiliser `:::example` pour les exemples ou développements à mobiliser oralement, et `:::comment` pour les indications de présentation, de mise en scène ou d’accentuation. Lorsqu’un résumé est demandé, proposer d’abord le texte sans modifier directement le deck ; une modification ne sera effectuée qu’après accord explicite.
