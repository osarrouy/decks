# AGENTS.md — Économie des données, attention et plateformes

## Finalité du cours

Ce projet produit un cours de **4 heures** pour des étudiant·es de **Licence 1 Information-Communication**. Il doit leur permettre de comprendre, sans réduire l’analyse à la formule « si c’est gratuit, c’est toi le produit » :

- d’où vient l’économie publicitaire du web ;
- comment une plateforme transforme une activité, une trace ou une attention en signal mesurable ;
- comment s’articulent utilisateurs, annonceurs, enchères, métriques, profilage et recommandation ;
- comment les interfaces et les boucles de rétroaction orientent les conduites ;
- pourquoi la publicité ciblée constitue un point d’entrée vers l’analyse du capitalisme de surveillance ;
- comment cette histoire prépare — sans la déterminer à elle seule — l’essor du deep learning et des systèmes d’IA contemporains.

Le cours doit partir d’expériences reconnaissables (fil d’actualité, recherche, notification, bannière, consentement, recommandation) pour faire monter progressivement l’abstraction. Il ne s’agit ni d’un récit technophile du progrès publicitaire, ni d’un réquisitoire moral contre « les plateformes » : il faut décrire les mécanismes, leurs incitations, leurs asymétries et les formes d’expérience qu’ils rendent possibles ou empêchent.

## Public et exigences pédagogiques

Le deck s’adresse à un public débutant. Chaque notion doit donc être :

1. définie dans une formulation simple mais exacte ;
2. reliée à un exemple concret ;
3. distinguée des notions voisines ;

La simplicité ne doit pas produire de fausse évidence. Les étudiant·es doivent pouvoir distinguer notamment :

- donnée, information, trace, signal et connaissance ;
- attention comme ressource cognitive et attention comme marchandise médiatique ;
- marché biface et affirmation simpliste selon laquelle l’utilisateur serait « le produit » ;
- ciblage contextuel, ciblage comportemental, personnalisation et prédiction ;
- CPM, CPC, CPA et RTB ;
- recommandation, classement, modération et publicité ;
- captologie, dark design et dark patterns ;
- corrélation prédictive, influence et déterminisme ;
- entraînement d’un modèle, inférence, données d’usage, puissance de calcul et financement.

## Arc conceptuel prévu pour 4 heures

L’ordre pourra être ajusté pendant la construction, mais le cours doit conserver ce mouvement :

### 1. De l’audience à l’économie de l’attention

Partir de la publicité médiatique et de la notion d’**audience commodity** (Dallas Smythe), puis introduire Herbert Simon et Michael Goldhaber. Montrer que l’abondance informationnelle déplace la rareté vers l’attention, sans prétendre que toute attention devient automatiquement une marchandise.

### 2. De la bannière au marché publicitaire automatisé

Retracer une histoire resserrée : première bannière web, CPM, pay-per-click, enchères sur mots-clés, AdWords/Google Ads, Quality Score, conversion, ciblage comportemental, cookies et autres mécanismes de suivi, puis programmatique et RTB. Expliquer l’architecture minimale (annonceur, éditeur, SSP, DSP, ad exchange, mesure) plutôt que d’empiler les sigles.

Le fil directeur est le déplacement de l’unité de valeur : emplacement → impression → clic → action → probabilité d’une action future. Il faut montrer que chaque métrique ne décrit pas seulement un comportement : elle réorganise le marché et les décisions des acteurs.

### 3. Plateformes sociales, captation et pouvoir comportemental

Analyser le modèle des réseaux sociaux : inscription et usage souvent gratuits, marché biface, production de contenu par les usagers, classement algorithmique, recommandation, notifications, compteurs, défilement infini et récompense intermittente. Introduire la captologie, les dark patterns et le dark design comme des objets proches mais non synonymes.

Les boucles de rétroaction doivent être visibles : activité → trace → classement/recommandation → nouvelle activité. Les effets de polarisation, de viralité ou de désinformation doivent être présentés comme des risques et des résultats documentés dans certains contextes, pas comme une loi universelle selon laquelle tout algorithme favoriserait nécessairement le contenu clivant.

### 4. Du profil à la prédiction, puis de la publicité à l’IA

Présenter Zuboff comme une grille critique — **surplus comportemental**, produits de prédiction, pouvoir d’instrumentarisation — et non comme la preuve que les plateformes revendent toujours des données brutes. Ouvrir ensuite vers les assurances, le travail, la santé, la ville ou la sécurité en distinguant les exemples établis des extrapolations.

La transition vers l’IA doit être historiquement et causalement prudente : les revenus publicitaires ont contribué à financer des infrastructures, des centres de données, des viviers de compétences et une course au calcul ; ils n’expliquent pas à eux seuls le deep learning ni les LLM. Il faut relier les deux histoires par les infrastructures de données, l’optimisation, la prédiction et le capital disponible, tout en rappelant les apports de la recherche publique, de l’informatique théorique, des architectures neuronales et des méthodes d’apprentissage.

## Garde-fous historiques et conceptuels

Les notes de travail contiennent des formulations à vérifier. Toute correction ou nuance importante doit apparaître dans les **notes speaker du deck**, sous une rubrique explicite de type `Vigilance historique` ou `Précision`. En particulier :

- vérifier la date exacte et le contexte de la bannière AT&T/HotWired ; présenter le taux de clic de 44 % comme un chiffre historique lié à une campagne et à un contexte inaugural, non comme une moyenne comparable aux taux actuels ;
- distinguer la date de publication et les versions de la notion d’**audience commodity** chez Dallas Smythe (1977/1981 selon l’édition ou le texte cité) ;
- ne pas raconter Google comme une entreprise « opposée à toute publicité » puis soudain convertie sans distinguer les formats, les périodes et les contraintes de financement ;
- présenter les enchères de GoTo/Overture et le GSP de Google avec prudence : mécanismes, dates, vocabulaire et mise en œuvre ont évolué ;
- ne pas confondre Quality Score, optimisation des conversions/CPA, personnalisation de la recherche et RTB : ce sont des opérations et des périodes distinctes ;
- ne pas présenter le RTB comme l’intégralité de la publicité programmatique, ni comme une garantie de ciblage individuel parfait ;
- ne pas transformer les **Facebook Files** de Frances Haugen en preuve générale que les algorithmes « obligent » partout à produire de la haine ; préciser ce que les documents établissent et ce qui relève de l’interprétation ;
- distinguer le concept analytique de Zuboff des slogans « les données sont le nouvel or noir » et « l’utilisateur est le produit » ;
- signaler que « dark pattern » est une catégorie de conception manipulatoire documentée, tandis que « dark design » est un terme plus large et moins stabilisé ;
- éviter toute affirmation directe du type « l’argent de la publicité a créé les LLM ». Formuler une relation d’écosystème et de financement, pas une causalité unique.

Les références doivent privilégier les textes originaux, les articles scientifiques, les rapports institutionnels et les sources journalistiques reconnues. Une référence ne doit pas être utilisée pour soutenir davantage qu’elle ne permet d’établir. Les dates, chiffres de marché et parts d’acteurs sont datés : ils doivent comporter une année, une source et, si nécessaire, une mention de périmètre.

## Principe de mise en scène

Le deck doit alterner :

- slides de seuil, avec peu de texte et une question forte ;
- schémas de flux et de boucles ;
- définitions courtes ;
- chronologies limitées aux inflexions utiles ;
- études de cas ;
- activités brèves pour faire raisonner les étudiant·es.

Il doit rester lisible en projection. Les détails historiques, les références et les objections vont dans les notes speaker, pas dans des blocs illisibles sur la slide. Les formulations fortes doivent être préparées par l’analyse et ne jamais remplacer celle-ci.

## Contraintes techniques du projet

- Le deck se trouve dans `decks/economics/`.
- The existing deck in `decks/cybernetics/` is a reference for the system and syntax, **not a file to modify**.
- Le projet utilise le moteur `svx-deck`, son format `deck.svx`, son `deck.config.yaml`, ses assets et ses notes speaker.
- Le lancement attendu est `pnpm deck dev decks/economics`.
- Utiliser la commande générique `pnpm deck` ; aucun script racine propre à ce cours n’est nécessaire.
- Les vérifications doivent inclure le lancement du serveur, l’ouverture de la projection et de la vue présentateur, ainsi qu’un build public et un build avec notes si le temps le permet.
- Les fichiers générés (`.svx-deck.nosync/`, `build/`) ne doivent pas servir de source éditoriale.

## Critère de réussite

À la fin des quatre heures, un étudiant·e doit pouvoir prendre une fonctionnalité ordinaire — par exemple un fil recommandé ou une bannière ciblée — et répondre avec précision à quatre questions :

1. Quelle activité ou quelle trace est transformée en signal ?
2. Quelle boucle technique et économique ce signal alimente-t-il ?
3. Qui gagne quoi, et à quelle condition ?
4. Quelle forme d’expérience, d’attention ou de pouvoir cette architecture produit-elle — et quel lien prudent peut-on établir avec l’IA contemporaine ?
