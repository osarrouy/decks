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
