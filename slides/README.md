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
