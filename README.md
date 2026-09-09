# svx-slides workspace

Monorepo `pnpm` pour écrire des présentations `mdsvex`/Svelte avec :

- un moteur de rendu indépendant dans `svx-slides/` ;
- des thèmes CSS réutilisables dans `themes/` ;
- des projets de slides autonomes dans `slides/` ;
- une vue projection et une vue présentateur ;
- des notes speaker excluables du build public ;
- un format de deck minimal : `deck.svx`, `deck.config.ts`, `static/`, `components/`.

```txt
/
  svx-slides/          # moteur : runtime, contrôleur, composants, CSS commun
  themes/              # thèmes CSS importables indépendamment
    gallery/
    default/
    academic/
    dark/
  slides/              # projets de slides autonomes
    demo/
  iapresenter-themes/  # thèmes iA Presenter exportables, séparés du moteur web
```

## Installer

```bash
pnpm install
```

## CLI du moteur

Le runner vit dans `@svx-slides/core` :

```bash
svx-slides dev slides/demo
svx-slides build slides/demo --public
svx-slides build slides/demo --presenter
svx-slides export slides/demo
svx-slides preview slides/demo
```

Dans ce workspace, les scripts racine appellent directement ce runner.

## Lancer la démo

Chaque dossier dans `slides/*` est un deck autonome. Il n’a pas besoin de contenir une application SvelteKit : le moteur génère et lance l’app interne dans `.svx-slides/`. La démo se lance ainsi :

```bash
pnpm dev:demo
```

Puis ouvrir :

```txt
http://localhost:5173/            # projection
http://localhost:5173/presenter   # vue présentateur
```

La vue présentateur ouvre la projection sur la racine du projet, pas sur une page d’agrégation centrale.

## Exporter un projet de slides

```bash
pnpm build:demo:public      # build sans notes speaker
pnpm build:demo:presenter   # build avec notes speaker
pnpm preview:demo
```

Le build est écrit dans :

```txt
slides/demo/build/
```

Pour produire un support de révision destiné aux étudiants :

```bash
pnpm export:demo
pnpm export:history

# Servir le build étudiant de l’histoire
pnpm preview:history
```

Les fichiers sont générés respectivement sous `slides/demo/build/` et `slides/history-1/build/`. Les flèches, la barre espace et les boutons permettent de naviguer ; les `steps` restent pris en compte. Les indications réservées au présentateur (`:::comment` et `[!COMMENT]`) sont supprimées avant l’import et ne sont donc pas embarquées dans le livrable étudiant.

## Intégrer un deck dans un autre site

```bash
node svx-slides/src/cli/index.mjs build slides/history-1 --embed \
  --base /slides/history-1 --out-dir /tmp/history-1-web
```

`--embed` produit un lecteur autonome avec boutons précédent/suivant et sélection
de slide. Les étapes et composants interactifs restent actifs. Les notes ne sont
pas incluses et aucune route présentateur n’est générée. La navigation ne
synchronise pas les autres fenêtres ouvertes. Ce mode ne se combine pas avec
`--students` ou `--presenter`.

`--base` configure le préfixe public SvelteKit et les références littérales aux
fichiers de `static/` dans les slides et composants. Utiliser un chemin sans slash
final. Les URL externes restent inchangées ; les chemins construits dynamiquement
par du code doivent eux-mêmes prendre ce préfixe en compte.

`--out-dir` choisit un répertoire de livraison distinct du build habituel (chemin
relatif au deck, ou absolu). Un dossier existant non vide doit déjà contenir le
manifeste `svx-slides.json` d’un export, sauf pour le dossier `build/` habituel.
Le manifeste indique le mode, le préfixe, la présence de notes et le nombre de slides.

Servir **tout** le répertoire obtenu sous `/slides/history-1/`, puis intégrer
`/slides/history-1/index.html` dans une iframe. Prévoir une hauteur de `9/16` de
la largeur, plus `52px` pour les commandes. Le thème reste celui du deck.

Les exports existants sont des sites HTML/CSS/JavaScript statiques : public sans
notes, présentateur avec notes, étudiant avec notes filtrées. Il n’existe pas de
commande d’export PDF, PPTX ou vidéo dans la CLI.

## Structure d’un projet de slides

Un projet typique ressemble à ceci :

```txt
slides/mon-projet/
  deck.svx              # source du deck
  deck.config.ts        # optionnel, mais recommandé
  static/               # images et assets servis à la racine
    image.jpg
  components/           # optionnel : composants Svelte propres au deck
    MonComposant.svelte
```

Le moteur reste dans `svx-slides/`. Au lancement, il crée un dossier interne ignoré par git :

```txt
slides/mon-projet/.svx-slides/
```

Ce dossier contient l’application SvelteKit générée : routes `/`, `/presenter`, config mdsvex, loader de deck et slides découpées.

## Deck mono-fichier

Un deck s’écrit dans un seul fichier :

```txt
slides/demo/deck.svx
```

Le runner du moteur découpe ce fichier en slides générées dans :

```txt
slides/demo/.svx-slides/app/src/generated/deck/
```

Ces fichiers générés sont ignorés par git.

### Configuration

Dans `deck.config.ts` :

```ts
import type { DeckConfig } from '@svx-slides/core/deck/types'

const config = {
  title: 'Mon deck',
  theme: 'gallery',
  template: {
    source: 'deck.svx',
    slideSeparator: '---',
    notesSeparator: '--- notes'
  }
} satisfies DeckConfig

export default config
```

Aucun `vite.config.ts`, `svelte.config.js` ou `src/` n’est nécessaire dans le deck : le CLI du moteur les fournit.

### Syntaxe

```md
---
title: Mon deck
theme: gallery
---

# Première slide

Contenu visible.

--- notes

Notes speaker en markdown.

---

<!-- slide: steps=3 -->

# Deuxième slide

<script>
  import MonComposant from '$components/MonComposant.svelte'
</script>

<MonComposant />
```

Règles :

- `---` démarre une nouvelle slide ;
- `--- notes` bascule le reste du bloc courant en notes speaker jusqu’à la prochaine slide ;
- les deux marqueurs sont configurables avec `slideSeparator` et `notesSeparator` ;
- `<!-- slide: ... -->` est facultatif et ne sert qu’à modifier les métadonnées nécessaires à cette slide : `steps`, `layout`, `align`, etc. ;
- sans directive, le moteur infère le titre depuis le premier `#`, génère l’identifiant et utilise `steps: 0` ;
- l’ordre des slides est toujours celui de `deck.svx` : les identifiants ne participent pas au tri ;
- `id` et `title` peuvent toujours être fixés explicitement lorsqu’un identifiant permanent ou un titre différent du heading est nécessaire.

## Layouts et attributs Markdown

Le moteur ajoute trois raccourcis pour éviter d’écrire du HTML uniquement pour styler une slide.

### Layout de slide

Un layout peut être déclaré dans la directive de slide :

```md
<!-- slide: layout="cover" -->

# Grand titre
```

Le runtime applique alors des attributs et classes sur la surface de slide :

```html
<section class="slide slide-layout-cover" data-layout="cover">
```

Layouts fournis par défaut :

```txt
cover
center
two-columns
columns
stack
```

On peut aussi ajouter :

```md
<!-- slide: layout="stack" align="center" tone="dark" -->
```

`align` et `tone` deviennent `data-align`, `data-tone` et des classes CSS correspondantes.

### Layout interne avec directives Markdown

Pour créer un bloc de layout sans écrire `<div class="...">`, utiliser la syntaxe directive :

```md
::: columns

# Colonne gauche

Texte.

::: column

![Image](/image.jpg)

:::

:::
```

Les espaces sont acceptés pour la lisibilité : `::: columns` est normalisé avant compilation. Les directives connues deviennent des classes de layout :

```txt
::: columns      → <div class="layout columns">
::: two-columns  → <div class="layout two-columns">
::: center       → <div class="layout center">
::: cover        → <div class="layout cover">
::: stack        → <div class="layout stack">
::: column       → <div class="column column">
```

Une directive inconnue devient simplement une classe du même nom :

```md
::: callout
Texte.
:::
```

```html
<div class="callout">...</div>
```

### Attributs ponctuels façon Pandoc

On peut ajouter des classes, id ou attributs sur certains éléments Markdown.

Sur un titre :

```md
# Images avec halo {.wide-heading}
```

Sur une image :

```md
![cover](/album.jpg){data-glow="strong" .poster #cover-image}
```

Ce qui permet notamment d’utiliser `data-glow` sans passer par une balise HTML.

Ces raccourcis sont activés automatiquement par le runner `svx-slides`.

## Notes speaker et builds publics

Les notes ne sont pas un composant caché dans la slide. Elles sont extraites à la compilation depuis le deck mono-fichier, puis générées en fichiers `.notes.md` séparés.

Le loader ne les importe que si :

```txt
import.meta.env.DEV === true
```

ou si :

```bash
VITE_INCLUDE_NOTES=true
```

Donc :

```bash
pnpm build:demo:public      # pas de notes dans le bundle
pnpm build:demo:presenter   # notes disponibles dans /presenter
```

## Vue présentateur

La vue présentateur est disponible sur :

```txt
/presenter
```

Elle affiche :

- à gauche : la slide actuelle ;
- sous elle : la slide suivante ;
- à droite : les notes speaker, plus largement priorisées ;
- en bas à droite : les contrôles de navigation et le timer.

La projection peut être ouverte depuis la vue présentateur avec le bouton dédié.

## Navigation et étapes

Le runtime gère :

- la navigation clavier ;
- la récupération d’état par hash URL ;
- les étapes internes d’une slide via `steps` ;
- les fragments et composants Svelte synchronisés sur l’étape courante.

Exemple :

```md
<!-- slide: steps=3 -->

<script>
  import Fragment from '@svx-slides/core/components/Fragment.svelte'
</script>

# Fragments

<Fragment at={1}>Premier fragment.</Fragment>
<Fragment at={2}>Deuxième fragment.</Fragment>
<Fragment at={3}>Troisième fragment.</Fragment>
```

## Images glowy

Le moteur fournit un attribut de style pour les images avec halo :

```svelte
<img src="/mon-image.jpg" alt="Description" data-glow />
<img src="/mon-image.jpg" alt="Description" data-glow="soft" />
<img src="/mon-image.jpg" alt="Description" data-glow="strong" />
```

Ou directement en Markdown avec la syntaxe d’attributs :

```md
![cover](/mon-image.jpg){data-glow="strong"}
```

Le runtime analyse l’image côté navigateur avec un canvas réduit, échantillonne ses couleurs, puis construit un halo symétrique autour de l’image. Les couleurs du halo suivent donc les zones de l’image : jaune en haut, jaune en haut du halo ; rose en bas, rose en bas du halo.

Si la lecture des pixels est impossible — par exemple avec une image distante sans CORS — le moteur retombe sur un fallback symétrique.

Les thèmes peuvent ajuster :

```css
--image-radius
--image-glow-color
```

`--image-glow-color` sert surtout de fallback.

## Thèmes et hot reload

Le thème est déclaré dans `deck.config.ts` :

```ts
export default {
  title: 'Mon deck',
  theme: 'gallery'
}
```

Le runner résout automatiquement `gallery` vers `@svx-slides/theme-gallery/style.css`. On peut aussi donner un paquet complet :

```ts
export default {
  title: 'Mon deck',
  theme: '@svx-slides/theme-gallery'
}
```

Comme les thèmes sont des paquets workspace `pnpm`, Vite suit directement leurs fichiers source. Modifier par exemple :

```txt
themes/gallery/src/style.css
```

met à jour à chaud les decks qui utilisent ce thème en mode dev.

### Grille d’espacement

Chaque thème définit une unité rythmique unique :

```css
[data-theme='mon-theme'] {
  --grid-unit: clamp(0.4rem, 0.65vw, 0.7rem);
}
```

Le moteur en dérive `--space-1`, `--space-2`, `--space-3`, `--space-4`,
`--space-6`, `--space-8` et `--space-12`. Le header et la slide partagent
`--padding-horizontal` ; la slide utilise aussi `--padding-vertical`, et les
layouts `--gap`. Modifier `--grid-unit` suffit donc à ajuster le rythme général
d’un thème.

## Thème gallery

Le thème `gallery` utilise notamment :

- `Instrument Serif` pour les gros titres ;
- des titres droits par défaut, pas italiques ;
- `Newsreader` pour le texte courant ;
- `JetBrains Mono` pour l’interface, les labels, compteurs et métadonnées ;
- un fond blanc plein écran ;
- un accent magenta ;
- des variables de thème pour l’effet `data-glow`.

## Créer un nouveau thème

Dupliquer un dossier dans `themes/`, par exemple :

```txt
themes/mon-theme/
  package.json
  src/style.css
```

Puis déclarer le paquet, par exemple `@svx-slides/theme-mon-theme`, et l’utiliser dans le `deck.config.ts` du deck :

```ts
export default {
  title: 'Mon deck',
  theme: 'mon-theme'
}
```

## Vérifier

```bash
pnpm check
pnpm build:demo:public
pnpm build:demo:presenter
```
