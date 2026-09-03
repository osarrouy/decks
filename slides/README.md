# Decks

Chaque sous-dossier de `slides/` est désormais un deck autonome, pas une application SvelteKit à maintenir à la main.

Structure recommandée :

```txt
slides/mon-projet/
  deck.svx              # source unique du deck
  deck.config.ts        # titre, thème, séparateurs
  static/               # images et assets servis à la racine
  components/           # optionnel : composants Svelte locaux
```

Le moteur `@svx-slides/core` fournit le runner :

```bash
svx-slides dev slides/mon-projet
svx-slides build slides/mon-projet --public
svx-slides build slides/mon-projet --presenter
svx-slides preview slides/mon-projet
```

Au lancement, le moteur génère une app SvelteKit interne dans `.svx-slides/` : routes `/` et `/presenter`, config mdsvex, loader, notes speaker et assets. Ce dossier est ignoré par git.

Les composants locaux s’importent avec l’alias stable :

```svelte
<script>
  import MonComposant from '$components/MonComposant.svelte'
</script>
```

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
