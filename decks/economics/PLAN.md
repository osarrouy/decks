# Économie des données, attention et plateformes

Plan de cours et notes pour la préparation des slides — 4 octobre 2026.

**Public :** L1 Information-Communication. **Durée :** 4 heures, dont une pause de 10 minutes. **Statut :** proposition éditoriale documentée ; aucun slide n’est implémenté par ce document. Les intitulés ci-dessous désignent des unités pédagogiques, pas des textes définitifs à projeter.

## 1. Proposition et fil directeur

Le cours explique comment une activité ordinaire devient une trace, comment cette trace devient un signal utilisable et comment des organisations en tirent des revenus ou des capacités d’action. La publicité constitue l’entrée historique ; les interfaces, la surveillance et l’IA permettent ensuite d’en suivre les prolongements et les limites.

La question commune est : **qui organise la rencontre entre un contenu, une personne et une possibilité d’action — avec quelles informations, selon quels objectifs et au bénéfice de qui ?**

La progression retenue est la suivante :

1. Les médias constituent des audiences ; l’abondance informationnelle rend leur attention disputée.
2. Le web permet de compter des affichages et des réactions, puis de commercialiser des occasions de contact de plus en plus différenciées.
3. Les métriques, les enchères et les intermédiaires rendent ces occasions comparables et négociables.
4. Les plateformes produisent une partie de l’activité qu’elles mesurent : interfaces, recommandations et sollicitations participent à cette boucle.
5. La constitution de profils et de prévisions redistribue des capacités de connaître, de sélectionner et d’intervenir, au-delà de la publicité.
6. Ces infrastructures rencontrent l’histoire de l’apprentissage automatique ; elles n’en constituent ni l’origine unique ni une explication suffisante.

Ce n’est pas une succession où chaque innovation supprimerait la précédente. Emplacements, impressions, clics, actions, abonnements et prévisions coexistent. Il faut constamment distinguer **ce qui est observé, ce qui est estimé, ce qui est vendu et ce qui est effectivement causé**.

### Ce que l’étudiant doit savoir faire

À partir d’une publicité ou d’un fil recommandé, identifier l’activité observée, les données produites, les acteurs, la prestation vendue, la métrique optimisée et les effets possibles. Distinguer une corrélation d’un effet causal et une critique théorique d’un résultat empirique. Proposer enfin un autre objectif ou une autre organisation de la même fonctionnalité.

### Deux précisions structurantes

L’attention disponible n’est pas une quantité mondiale historiquement constante : population connectée, usages et temps consacré aux médias évoluent. **La capacité d’attention de chacun reste limitée et ne croît pas au rythme de l’offre de contenus.** Cette formulation suffit pour introduire la concurrence attentionnelle. La rareté ne prouve pas, à elle seule, une distribution très inégalitaire : les mécanismes de concentration ont leur place dans le cours sur les réseaux. Voir [S01](#s01), [S03](#s03), [S04](#s04).

Le modèle publicitaire explique certaines incitations des grandes plateformes. Il ne permet pas de déduire que toute recommandation maximise exclusivement le temps passé, ni qu’elle produit nécessairement viralité, désinformation ou polarisation. Ces effets demandent une enquête sur des dispositifs et des situations déterminés. Le cours prépare cette enquête ; il ne la remplace pas.

## 2. Corpus local analysé et traitement retenu

L’inventaire porte sur tous les fichiers éditoriaux, les métadonnées et les images du répertoire economics. Les sorties générées du moteur ne constituent pas des sources supplémentaires. Les doublons sont identifiés pour éviter de compter plusieurs fois une même proposition ; aucun original n’est supprimé.

| Fichier                                                                                                                                                                             | Contenu et statut                                                                                                                                                 | Traitement dans le plan                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AGENTS.md](./AGENTS.md)                                                                                                                                                            | Cadrage du cours de quatre heures, objectifs et distinctions requises.                                                                                            | Structure générale, niveau L1, précautions et critères de transmission.                                                                                        |
| [text.md](./text.md)                                                                                                                                                                | Notes longues : audience, attention, publicité, Google, enchères, CPA, RTB, surveillance, captologie ; bibliographie partiellement générée et passages inachevés. | Socle des unités 01–28 ; vérification des chiffres, de la chronologie et des références.                                                                       |
| [cours_publicite_surveillance.md](./cours_publicite_surveillance.md)                                                                                                                | Proposition courte, narrative, avec plusieurs raccourcis historiques et causaux.                                                                                  | Fil historique repris en 07–18, puis corrigé ; ses formulations fortes ne deviennent pas des faits sans examen.                                                |
| [deck.svx](./deck.svx)                                                                                                                                                              | Brouillon déjà scénarisé, 39 slides et notes : économie publicitaire, prédiction, surveillance.                                                                   | Réservoir d’exemples et d’explications ; le futur deck devra être réorganisé à partir de ce plan, pas simplement complété à la fin.                            |
| [5_economics.html](./5_economics.html)                                                                                                                                              | Ancien export de cours, notamment exemples d’enchères et développements sur Zuboff.                                                                               | Exercices d’enchères reconstruits ; longues citations remplacées par des paraphrases attribuées tant que leur édition et leur pagination ne sont pas établies. |
| [materials/Dark design.txt](./materials/Dark%20design.txt)                                                                                                                          | Notes issues d’un échange génératif : notifications, renouvellements, culpabilisation, défilement, récompenses, « brain hacking ».                                | Intégration en 21–23 ; vocabulaire repris avec distinctions et retrait des causalités neurologiques non démontrées.                                            |
| [materials/cours_publicite_surveillance.md](./materials/cours_publicite_surveillance.md)                                                                                            | Copie identique du fichier à la racine.                                                                                                                           | Même traitement, pas de contenu distinct.                                                                                                                      |
| [materials/Data economics.iapresenter/text.md](./materials/Data%20economics.iapresenter/text.md)                                                                                    | Copie identique de text.md.                                                                                                                                       | Même traitement, pas de contenu distinct.                                                                                                                      |
| [materials/Data economics.iapresenter/info.json](./materials/Data%20economics.iapresenter/info.json) et [thumb.png](./materials/Data%20economics.iapresenter/thumb.png)             | Métadonnées de présentation et vignette du titre.                                                                                                                 | Aucun apport conceptuel supplémentaire.                                                                                                                        |
| [assets/first_add.png](./assets/first_add.png), [static/first_add.png](./static/first_add.png), [copie iA Presenter](./materials/Data%20economics.iapresenter/assets/first_add.png) | Trois copies identiques de la bannière AT&T/HotWired.                                                                                                             | Image historique utilisable en 07 ; attribution et date dans les notes.                                                                                        |

Tous les thèmes du corpus trouvent ainsi une place, soit dans le cours, soit dans le registre des corrections, soit dans les renvois aux chapitres voisins. Prendre en compte une affirmation erronée signifie expliquer son retrait ou sa correction, pas la conserver dans l’enseignement.

## 3. Articulation avec les cours sur les réseaux sociaux

### Emplacement recommandé

Dans [social-networks-visibility-gatekeeping/deck.svx](../social-networks-visibility-gatekeeping/deck.svx), placer **la séquence courte de huit slides** après l’unité identifiée social-network-structure-conclusion et avant gatekeepers-001-title.

Le raisonnement devient : **la structure des relations distribue des possibilités de circulation → des organisations valorisent certaines rencontres et certaines réactions → des dispositifs sélectionnent ce qui sera effectivement montré → les contenus circulent, parfois de façon virale, avec des conséquences sociales à examiner.**

Après Clay Shirky et « Publish, then filter », une seule transition orale suffit : publier plus facilement n’augmente pas dans les mêmes proportions la capacité de chacun à recevoir les contenus. Développer toute l’économie publicitaire à cet endroit interromprait l’explication des structures relationnelles. Éviter aussi d’ouvrir le cours entier par une conclusion générale sur les algorithmes avant d’avoir expliqué leurs conditions économiques.

Le parcours de quatre heures est un **cours autonome d’approfondissement**. Il ne faut pas ajouter simultanément ses quatre heures et les huit slides de synthèse au même endroit sans annoncer la reprise. Deux usages cohérents sont possibles : enseigner le cours complet à la charnière structure/gatekeeping ; ou insérer le parcours court à cette charnière, puis enseigner les quatre heures lors d’une séance dédiée en traitant les premières notions comme un rappel. Le choix éditorial par défaut est le second, qui conserve le rythme du cours sur les réseaux.

### Répartition des responsabilités

| Cours existant                                                                 | Ce qu’il explique déjà                                                                                                                          | Apport propre à economics                                                                                                             | Renvoi à conserver                                                                                                                    |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Social networks](../social-networks/deck.svx)                                 | Profils, relations, publics, régimes d’expression et visibilité des conversations.                                                              | Qui finance les espaces de publication et ce qui devient mesurable ou commercialisable.                                               | Ne pas refaire l’histoire de l’ouverture de la publication.                                                                           |
| [Visibility / gatekeeping](../social-networks-visibility-gatekeeping/deck.svx) | Concentration de visibilité, Shirky, petits mondes, hubs, attachement préférentiel, bonding/bridging ; modération, recommandation et sélection. | Objectifs économiques, acteurs publicitaires, métriques, enchères, collecte et arbitrages.                                            | Aucun second exposé de Milgram, Watts, Barabási, Putnam ou du fonctionnement détaillé du classement.                                  |
| [Virality](../social-networks-virality/deck.svx)                               | Cascades, broadcast/contagion, émotions, avantages cumulatifs, MusicLab, amplification organisée.                                               | Pourquoi une réaction mesurable peut intéresser la plateforme ; pourquoi une mesure d’engagement ne prouve ni adhésion ni persuasion. | Réserver les mécanismes de diffusion, les compteurs comme preuve sociale et leurs études à ce chapitre.                               |
| [Polarization](../social-networks-polarization/deck.svx)                       | Homophilie, biais, bulles, chambres d’écho, polarisation idéologique/affective, résultats et limites empiriques.                                | Incitations et arbitrages organisationnels qui motivent la question des effets.                                                       | Ne pas répéter Bakshy, Flaxman, Bail, Rathje ou les expériences de modification du fil ; ne pas en anticiper une conclusion univoque. |

## 4. Déroulé des quatre heures

Les durées incluent explications, questions et activités. Une unité peut produire un ou deux slides, sauf les activités qui doivent rester suffisamment longtemps à l’écran. La cible raisonnable est de 38 à 44 slides, sans obligation d’atteindre un nombre exact.

| Séquence                             | Unités |  Durée | Repère cumulé | Question résolue                                                              |
| ------------------------------------ | ------ | -----: | ------------- | ----------------------------------------------------------------------------- |
| A. Attention, audience, données      | 01–05  | 30 min | 00:00–00:30   | Quelle ressource est disputée, et que peut-on en observer ?                   |
| B. Construire un marché publicitaire | 06–12  | 43 min | 00:30–01:13   | Que vend-on et comment fixe-t-on les prix ?                                   |
| C. Mesurer, suivre, attribuer        | 13–18  | 42 min | 01:13–01:55   | Que sait-on réellement de l’efficacité et des personnes ?                     |
| Pause                                | —      | 10 min | 01:55–02:05   | —                                                                             |
| D. Produire et orienter l’activité   | 19–23  | 35 min | 02:05–02:40   | Comment le financement rencontre-t-il l’interface ?                           |
| E. Profils, pouvoir, alternatives    | 24–28  | 35 min | 02:40–03:15   | Qui peut connaître et agir sur qui ?                                          |
| F. Prolongement vers l’IA            | 29–32  | 30 min | 03:15–03:45   | Quelles continuités et quelles différences avec l’apprentissage automatique ? |
| Synthèse et transfert                | 33     | 15 min | 03:45–04:00   | Peut-on analyser seul un dispositif ?                                         |

## 5. Plan détaillé et notes de cours

Les notes suivantes sont rédigées pour être reprises dans une vue présentateur. Les intentions visuelles indiquent l’information à rendre perceptible, sans fournir de code ni de contenu final de slide. Les exemples chiffrés inventés sont signalés comme tels.

### A. Attention, audience, données

#### 01 — Partir d’un geste ordinaire · 4 minutes

**Objectif et scène :** partir d’une personne qui consulte un article sur les trajets à vélo, voit une publicité pour un casque, puis reçoit une recommandation de vidéo. Faire apparaître les acteurs autour de ce geste, sans encore ajouter de sigles.

**Notes de cours.** Camille souhaite préparer un trajet. Le média veut être lu et financer son activité ; un commerçant veut vendre des casques ; un intermédiaire publicitaire peut organiser leur rencontre. Ces objectifs se recoupent parfois, mais ils ne sont pas identiques. Le fait que Camille trouve un contenu utile ne dit pas encore ce qui a été enregistré, qui a payé et selon quelle règle.

Demander aux étudiants ce qui, dans cette situation, pourrait avoir une valeur marchande : l’article, l’emplacement, la visite, le clic, l’achat, une catégorie supposée décrire Camille. Recueillir plusieurs réponses sans en choisir immédiatement une. Le cours montrera que ces objets correspondent à des opérations et à des marchés différents.

**Précision.** Cette scène est fictive. Elle ne décrit pas les pratiques d’une marque déterminée. La valeur d’une donnée dépend de sa qualité, de son contexte et de son usage ; elle n’existe pas comme une substance naturellement précieuse que l’on extrairait intacte.

**Transition :** avant de suivre l’argent, nommer précisément ce qui est enregistré.

#### 02 — Donnée, trace, information, signal, connaissance · 6 minutes

**Intention visuelle :** un même événement lu de cinq façons, plutôt qu’un tuyau qui transformerait mécaniquement toute trace en vérité.

**Notes de cours.** Une donnée est une représentation enregistrée : une heure, une URL, une durée. Une trace est ce qui reste d’une activité dans un dispositif : le journal d’une ouverture de page. Cette donnée devient une information lorsqu’on la rapporte à un contexte : cette ouverture concerne un article consacré au vélo. Elle devient un signal lorsqu’un système s’en sert pour décider : ajouter un indice à une estimation d’intérêt pour les déplacements urbains. Une connaissance suppose une interprétation justifiée, dont on peut discuter les conditions et les limites.

Ces catégories ne sont pas des étages universels et irréversibles. La même donnée peut servir à facturer, diagnostiquer une panne ou estimer une préférence. Camille consulte peut-être l’article pour un proche : une trace de lecture ne révèle donc pas directement une intention personnelle d’achat. Un signal est utile pour une tâche sans être une description exhaustive de la personne.

Faire classer rapidement « page ouverte à 18 h 12 », « intérêt supposé pour le vélo » et « annonce à afficher ». Réponses attendues : événement enregistré ; inférence ; décision. Demander ce qui manque pour affirmer que Camille veut acheter.

**Précision.** Ce vocabulaire est une convention pédagogique explicite, pas la citation d’une taxonomie unique. Les usages techniques varient selon les disciplines.

**Transition :** mesurer les publics et vendre un accès à eux précède ces traces numériques.

#### 03 — Smythe : constituer une audience commercialisable · 7 minutes

**Intention visuelle :** un média entre son public et des annonceurs ; distinguer le contenu proposé au premier et la prestation vendue aux seconds.

**Notes de cours.** Pour un média financé par la publicité, le lecteur ou le téléspectateur n’est pas seulement le destinataire d’un contenu. Le média rassemble un public, en décrit certaines caractéristiques et vend aux annonceurs la possibilité de le toucher. Smythe analyse cette production d’audience comme un moment du fonctionnement économique des industries de communication. Il s’agit d’une lecture critique de la marchandisation, située dans une perspective marxiste. [S02](#s02)

L’annonceur n’achète pas la propriété des personnes. Il achète une prestation d’exposition auprès d’un public attendu ou mesuré. Un journal peut aussi vendre des abonnements : financement publicitaire et paiement par les lecteurs peuvent coexister. Cette précision évite d’ériger un modèle particulier en définition de tous les médias.

L’épisode Patrick Le Lay peut servir de confirmation par un discours d’industriel : en 2004, le dirigeant de TF1 décrit la disponibilité des téléspectateurs comme une ressource vendue aux annonceurs. Présenter cet exemple comme un propos situé, pas comme une théorie générale de la réception. [S07](#s07)

**Vigilance historique.** Le texte original retenu est l’article de 1977, « Communications: Blindspot of Western Marxism ». Le livre Dependency Road date de 1981. Les notes locales mélangent ces références avec une anthologie ultérieure. Le propos de Le Lay provient du livre Les dirigeants face au changement, et non d’un entretien initial à Télérama.

**Transition :** réunir un public ne suffit pas ; encore faut-il obtenir une part de son attention.

#### 04 — Simon et Goldhaber : l’abondance déplace la rareté · 5 minutes

**Intention visuelle :** une offre de contenus qui augmente face à une capacité individuelle limitée ; schéma conceptuel sans courbes ni chiffres empiriques inventés.

**Notes de cours.** Simon pose en 1971 un problème d’allocation : traiter de l’information consomme l’attention des personnes qui la reçoivent. Ajouter des messages ne suffit donc pas à améliorer une organisation. Il faut organiser la sélection et l’usage de ressources cognitives limitées. Sa réflexion est bien économique et organisationnelle, même lorsqu’elle porte sur les capacités de traitement. [S01](#s01)

Goldhaber reprend en 1997 ce déplacement pour penser le réseau : lorsque les contenus circulent abondamment, attirer l’attention devient un enjeu de reconnaissance et de richesse. Son essai dépasse la seule publicité ; le réduire à la prédiction du modèle de Google ou de Facebook lui ferait dire autre chose. Il constitue un jalon important, pas une preuve d’invention exclusive de l’expression. [S03](#s03)

Revenir à Camille : chaque contenu peut être disponible sans être consulté. La contrainte explique la concurrence pour l’attention ; elle n’explique pas encore pourquoi certains acteurs en captent beaucoup plus que d’autres.

**Précision.** Dire « attention limitée », pas « quantité mondiale inchangée ». Dire coût de reproduction numérique souvent faible, pas absence de coûts de production, de stockage ou de distribution.

**Transition :** compter des minutes ne suffit pas à comprendre ce que signifie prêter attention.

#### 05 — Citton : de la ressource à l’écologie de l’attention · 8 minutes

**Intention visuelle :** une personne entourée de situations d’attention : conversation, salle de cours, trajet, téléphone. Montrer des conditions collectives, pas un cerveau isolé.

**Notes de cours.** Citton invite à examiner les environnements qui orientent ce que nous remarquons. L’attention n’est pas uniquement un stock intérieur que chacun gérerait seul. Des rythmes, des relations, des institutions et des dispositifs rendent certaines attentions possibles et en concurrencent d’autres. L’enjeu devient l’organisation collective de ces milieux. [S04](#s04)

Proposer un exemple de cours : écouter une explication et répondre à une notification ne constituent pas deux unités interchangeables d’une même expérience. Une métrique de durée peut enregistrer la présence sans décrire la disponibilité, la compréhension ou le soin porté à autrui. Kessous, Mellet et Zouinar aident à distinguer deux orientations du problème : protéger les ressources cognitives ou organiser leur valorisation économique. [S05](#s05)

Question brève : modifier une règle de notification, un horaire ou une disposition de salle peut-il changer l’attention sans changer les personnes ? Faire préciser le mécanisme : sollicitation, interruption, possibilité de se concentrer ensemble. L’exemple est une application pédagogique, pas un résultat expérimental attribué à Citton.

**Précision.** Une écologie de l’attention ne se résume ni à une détox individuelle ni au refus des écrans. Ce cadre reviendra lorsque nous discuterons des alternatives institutionnelles.

**Transition :** comment une attention située devient-elle une prestation que des entreprises peuvent acheter ?

### B. Construire un marché publicitaire

#### 06 — Marché biface : qui paie quoi ? · 6 minutes

**Intention visuelle :** deux relations passant par un même opérateur ; flèches distinctes pour service, paiement et information.

**Notes de cours.** Un marché biface met en relation des groupes dont les décisions se répondent. Dans notre exemple, la plateforme ou le média propose un service aux publics et un accès publicitaire aux annonceurs. Le niveau de prix sur une face peut favoriser la participation sur l’autre. La gratuité monétaire pour un groupe peut donc être une composante d’un modèle économique, pas l’absence de modèle. [S06](#s06)

Les effets entre les faces ne sont pas toujours bénéfiques dans les deux sens. Un public plus nombreux intéresse souvent les annonceurs ; davantage de publicité peut au contraire dégrader l’expérience du public. Il faut donc arbitrer entre recettes, qualité perçue et fidélité.

La formule « l’utilisateur est le produit » attire l’attention sur une asymétrie, mais décrit mal la transaction. Pour l’annonceur, ce qui est acheté peut être une impression, un clic ou une prestation de ciblage. Pour le public, le service peut conserver une utilité réelle. Ces deux faits n’annulent pas la critique.

**Précision.** Smythe et l’économie des marchés bifaces éclairent des dimensions différentes. Ne pas présenter la seconde comme une version simplement plus sophistiquée du premier. Certaines plateformes sont multifaces et certains services vivent d’autres ressources.

**Transition :** suivre historiquement la construction de l’unité publicitaire vendue.

#### 07 — HotWired, 1994 : l’affichage devient cliquable · 5 minutes

**Intention visuelle :** utiliser la bannière déjà présente dans static/first_add.png ; conserver son aspect historique, sans inventer une capture complète de page.

**Notes de cours.** Le 27 octobre 1994, HotWired lance une offre de bannières avec plusieurs annonceurs. Celle d’AT&T est devenue un emblème de cette période. Le bandeau attire l’œil mais offre aussi un passage vers une autre page : le public peut réagir par un clic, et cette réaction peut être comptée. Le web ajoute ainsi des possibilités de mesure et de circulation aux formats publicitaires existants. [S08](#s08)

L’intérêt de l’exemple n’est pas de raconter un Internet sans commerce soudainement corrompu par une image. Il est de montrer qu’un format matériel rend certaines opérations observables et certaines prestations commercialisables. L’affichage et le clic ne désignent déjà plus la même chose.

**Vigilance historique.** Présenter AT&T comme une bannière fondatrice emblématique ; la priorité absolue dépend de la définition du format. Le registre de vérification traite séparément le taux de clic spectaculaire mentionné dans les brouillons. Il reste hors projection : ne pas le convertir en pourcentage assuré de visiteurs uniques ni en référence pour les campagnes actuelles.

**Transition :** mesurer un affichage et mesurer une réaction conduisent à deux unités économiques différentes.

#### 08 — CPM, CPC, CPA : trois dénominateurs, trois questions · 8 minutes

**Intention visuelle :** une même campagne fictive lue avec trois dénominateurs. Révéler les calculs progressivement.

**Notes de cours.** Le CPM rapporte une dépense à mille impressions. Le CPC la rapporte aux clics. Le CPA la rapporte aux actions définies comme conversions : achat, inscription ou demande de devis selon l’objectif. Une impression est un affichage comptabilisé selon les règles du système, pas la preuve qu’une personne a regardé et compris le message. Un clic n’est pas nécessairement un intérêt durable ; une conversion observée n’est pas nécessairement causée par la publicité.

Exemple entièrement fictif : 100 € dépensés, 10 000 impressions, 200 clics, 10 achats attribués. CPM = 10 € ; CPC = 0,50 € ; CPA = 10 €. Le taux de clic est de 2 % et le taux de conversion après clic de 5 %. Donner deux minutes aux étudiants pour calculer, puis demander ce que chaque ratio laisse dans l’ombre.

**Précision.** Ces ratios peuvent être calculés sur la même campagne quel que soit son mode de facturation. Ils ne signifient pas que trois factures sont émises simultanément. Dix mille impressions ne signifient pas dix mille personnes. L’optimisation vers un CPA cible sera distinguée en 13 du paiement contractuel à l’action. [S12](#s12), [S16](#s16)

**Transition :** une fois l’unité définie, reste à décider quel annonceur obtient quelle place.

#### 09 — GoTo : mettre des mots-clés aux enchères · 6 minutes

**Intention visuelle :** plusieurs commerces en concurrence pour une requête fictive ; montrer une intention exprimée dans une situation, pas un portrait complet de l’internaute.

**Notes de cours.** En 1998, GoTo développe un dispositif de liens sponsorisés ordonnés par enchères et facturés au clic. Le mot-clé rapproche la demande exprimée et une offre commerciale : une recherche sur les casques constitue une occasion différente de l’affichage indifférencié d’une annonce. Les annonceurs peuvent proposer des montants différents selon ce qu’ils espèrent obtenir. [S10](#s10)

La plateforme organise un marché de places visibles. Le prix n’exprime pas une valeur universelle du mot-clé : il dépend des concurrents, de leurs marges, de leur stratégie et de leurs anticipations. Un commerçant peut payer davantage qu’un autre parce qu’il espère une meilleure conversion, sans que son produit soit meilleur.

**Vigilance historique.** Retenir GoTo en 1998 comme étape majeure des enchères de liens sponsorisés, puis Overture comme son nom ultérieur. Ne pas lui attribuer sans nuance l’invention de toute publicité au clic. Les anecdotes de prix et le montant de rachat par Yahoo ne sont pas nécessaires au raisonnement et ne sont pas repris.

**Transition :** Google articulera ce marché à un service de recherche dont l’utilité et la confiance sont elles-mêmes des enjeux économiques.

#### 10 — Google : pertinence, financement et conflit d’objectifs · 5 minutes

**Intention visuelle :** frise limitée à 1998, 2000 et 2002 ; distinguer résultats de recherche et annonces.

**Notes de cours.** L’article de Brin et Page de 1998 présente un moteur fondé notamment sur l’analyse des liens et discute les conflits d’intérêts des moteurs financés par la publicité. Cela permet de poser une tension entre service aux usagers et service aux annonceurs ; cela ne prouve pas une opposition immuable à toute forme de publicité. [S11](#s11)

AdWords est annoncé le 23 octobre 2000 avec une tarification au CPM. AdWords Select introduit le CPC en février 2002 et prend déjà en compte le taux de clic dans le placement. La construction du modèle s’étale donc dans le temps. [S12](#s12)

PageRank peut être rappelé en une phrase comme une mesure d’importance issue des liens. Il ne faut pas refaire son algorithme, l’assimiler à la vérité d’une page, ni confondre classement des résultats non sponsorisés et classement des annonces.

**Vigilance historique.** Écarter le récit monocausal « le krach impose la publicité, puis Schmidt invente la rentabilité ». Schmidt devient président du conseil en mars 2001 et directeur général en août 2001, après le lancement d’AdWords. [S13](#s13)

**Transition :** le mode d’enchère influence à la fois les paiements et les stratégies.

#### 11 — Premier prix et second prix généralisé · 7 minutes

**Intention visuelle :** deux places et trois offres fictives ; séparer classement, offre maximale et prix payé.

**Notes de cours.** Supposons trois annonceurs A, B et C proposant respectivement 3 €, 2 € et 1 € par clic pour deux places. Dans un modèle simple au premier prix, A et B gagnent et paient leurs offres. Dans un modèle pédagogique au second prix généralisé, ils paient respectivement l’offre suivante : 2 € et 1 €. Pour isoler le principe, nous supposons une qualité identique, aucune réserve et aucun incrément minimal.

Ce déplacement peut limiter certains ajustements incessants d’enchères, mais il ne supprime pas le calcul stratégique. Une enchère au second prix pour un objet unique et le GSP à plusieurs positions ne possèdent pas les mêmes propriétés. Edelman, Ostrovsky et Schwarz montrent notamment que le GSP n’est généralement pas un mécanisme où déclarer sa valeur réelle constitue une stratégie dominante. [S14](#s14)

Faire expliciter la différence entre « je suis prêt à payer jusqu’à 3 € » et « je paie 2 € ». Ne pas transformer l’exercice en description exhaustive de Google Ads aujourd’hui.

**Précision.** Le concurrent pertinent est celui placé juste au-dessous dans l’ordre considéré. Les réserves, les qualités, les formats et les règles actuelles compliquent ce modèle. Aucune conclusion de vérité automatique des offres n’est autorisée.

**Transition :** une enchère élevée n’assure pas à elle seule une bonne recette par affichage.

#### 12 — Qualité et probabilité de clic · 6 minutes

**Intention visuelle :** comparer deux offres avec leurs probabilités de clic fictives ; éviter de représenter un « score de qualité » comme une note de valeur culturelle.

**Notes de cours.** Une annonce offrant 2 € par clic avec une probabilité de clic de 1 % représente une recette attendue de 0,02 € par impression. Une autre offrant 1 € avec une probabilité de 3 % représente 0,03 €. Ce calcul hypothétique explique pourquoi une plateforme facturant au clic peut s’intéresser à autre chose qu’au montant de l’offre : la réaction attendue conditionne aussi ses recettes.

Le terme Quality Score apparaît chez Google en 2005, alors que le taux de clic intervenait déjà dans le dispositif de 2002. Il faut distinguer cette histoire et les outils actuels. La documentation actuelle présente le Quality Score affiché de 1 à 10 comme un diagnostic ; elle précise que ce score n’est pas lui-même une entrée de l’enchère. Les évaluations effectuées lors de l’enchère et les facteurs d’Ad Rank sont plus nombreux. [S12](#s12), [S15](#s15)

**Précision.** Le calcul ci-dessus est notre modèle explicatif, pas la formule officielle de classement. Qualité publicitaire estimée, qualité journalistique et intérêt général sont des jugements différents. Ne pas fusionner Quality Score, personnalisation de la recherche et optimisation des conversions.

**Transition :** le commerçant peut vouloir des achats plutôt que des clics ; il faut alors relier plusieurs événements.

### C. Mesurer, suivre, attribuer

#### 13 — Conversion : rapprocher la mesure de l’objectif · 7 minutes

**Intention visuelle :** distinguer trois cartes : objectif commercial, métrique de résultat, règle de facturation.

**Notes de cours.** Un clic vers le site du vendeur ne garantit pas une vente. L’annonceur peut donc chercher à optimiser le nombre d’achats ou le coût moyen par achat. Une conversion est l’événement choisi pour représenter cet objectif ; ce choix peut déjà introduire un écart. Une demande de devis n’est pas un contrat signé, un compte créé n’est pas un client fidèle.

Le CPA peut désigner un ratio calculé après la campagne, un objectif donné à un système d’enchères ou, dans certains contrats, la base de facturation. Ces trois sens doivent être explicités. Avec un CPA cible, un système peut ajuster automatiquement des enchères au clic pour essayer d’obtenir un coût moyen par conversion donné, sans que l’annonceur ne paie uniquement lors d’un achat.

Le Conversion Optimizer annoncé par Google en septembre 2007 fournit un exemple historique clair : des informations de conversion servent à piloter des enchères au CPC. Ce n’est donc ni une invention du CPA en 2009 ni une transformation universelle de la facturation vers le paiement à l’action. [S16](#s16)

**Précision.** Mesurer une conversion n’exige pas logiquement de suivre toute la navigation d’une personne sur tous les sites. Des mesures limitées au service ou à une campagne sont possibles. Il faut justifier chaque donnée collectée par l’opération qu’elle permet réellement.

**Transition :** rattacher une vente à une annonce ne prouve pas que l’annonce a créé cette vente.

#### 14 — Attribution et causalité : ce qui se serait passé sans publicité · 7 minutes

**Intention visuelle :** séparer une chaîne observée « clic puis achat » d’une comparaison entre groupes.

**Notes de cours.** L’attribution affecte un résultat à un contact publicitaire selon une règle : par exemple le dernier clic connu. La causalité demande autre chose : combien d’achats supplémentaires la campagne a-t-elle provoqués ? Une personne peut cliquer sur une annonce du magasin qu’elle avait déjà décidé de visiter. La campagne se voit attribuer un achat sans l’avoir nécessairement déclenché.

Exercice fictif : deux groupes comparables et répartis aléatoirement comptent chacun 1 000 personnes. Dans le groupe exposé, on observe 120 achats ; dans l’autre, 100. L’écart observé est de 20 achats, soit 2 points de pourcentage. Il ne faut pas confondre ces 20 achats supplémentaires estimés avec les 120 achats du premier groupe. Sans intervalle d’incertitude et examen du protocole, on n’affirme pas non plus que cet écart établit définitivement un effet.

L’expérience menée chez eBay par Blake, Nosko et Tadelis montre pourquoi cette distinction importe : dans ce contexte, les résultats varient notamment selon les requêtes et les types de clients. Elle ne démontre pas que toute publicité est inutile. [S17](#s17)

**Précision.** Une corrélation peut être utile pour prévoir sans fournir une preuve de persuasion. Conserver cette distinction jusqu’aux unités sur Zuboff et l’IA.

**Transition :** pour attribuer ou prévoir, il faut rapprocher des événements et des contextes ; jusqu’où va ce rapprochement ?

#### 15 — Contexte, comportement, personnalisation, prédiction · 6 minutes

**Intention visuelle :** quatre opérations autour du même exemple de casque, plutôt qu’une opposition entre publicité « ancienne » et « parfaite ».

**Notes de cours.** Une annonce pour un casque à côté d’un article sur les déplacements à vélo relève d’un ciblage contextuel : le contenu consulté fournit le contexte. Une annonce choisie à partir d’un historique de consultations relève d’un ciblage comportemental. Les deux peuvent se combiner. Une requête fournit elle-même un indice situé, sans nécessiter à elle seule un dossier longitudinal sur la personne. [S18](#s18)

La personnalisation désigne l’adaptation d’une expérience à une personne, à un compte ou à une situation ; elle peut concerner un fil non publicitaire. La prédiction estime un événement : probabilité de cliquer, de partir, de convertir. Un système peut personnaliser à partir de règles simples sans modèle prédictif complexe ; il peut aussi faire des prévisions agrégées sans identifier nominativement chaque personne.

Faire distinguer « cette page parle de vélo », « ce navigateur a consulté trois pages de vélo » et « cet affichage a une probabilité estimée de clic ». Les trois formulations n’ont ni les mêmes données ni la même portée.

**Précision.** Un profil est une construction opérationnelle, pas l’identité complète d’une personne. Une personnalisation différente pour deux usagers n’établit pas à elle seule une bulle informationnelle ; ce point appartient au cours sur la polarisation.

**Transition :** quelle infrastructure permet de reconnaître et de rapprocher les événements ?

#### 16 — Suivi : les traces ne se relient pas toutes seules · 7 minutes

**Intention visuelle :** deux visites et plusieurs modes de rapprochement, avec une légende distinguant compte, navigateur et estimation.

**Notes de cours.** Un cookie est une donnée que le navigateur conserve et transmet dans certaines requêtes. Il peut maintenir une session, mémoriser un panier ou participer au suivi. Le cookie n’est donc pas, par définition, un dispositif publicitaire. Un identifiant de compte peut relier des usages connectés ; un pixel ou un script peut transmettre un événement ; des caractéristiques du navigateur peuvent servir à une reconnaissance par empreinte. [S19](#s19)

Dans notre scénario fictif, le vendeur enregistre un achat et cherche à le rapprocher d’un contact antérieur. Le résultat dépend des identifiants disponibles, des réglages, des autorisations, des délais et des erreurs de rapprochement. Un même navigateur peut être partagé ; une même personne peut utiliser plusieurs appareils. Le suivi n’est ni une mémoire universelle ni une connaissance parfaite.

Introduire la différence entre données recueillies dans une relation directe avec un service et circulation vers d’autres acteurs. La publicité peut également exploiter des données obtenues de partenaires ou de courtiers ; le parcours réel doit être documenté, pas supposé. [S20](#s20)

**Précision.** Ne pas annoncer que tous les navigateurs ont supprimé les cookies tiers. Les politiques diffèrent et changent. Les règles de consentement aux traceurs seront situées en 27 ; elles ne sont pas identiques à une acceptation générale des conditions d’utilisation.

**Transition :** ces informations peuvent entrer dans l’évaluation d’une occasion publicitaire vendue automatiquement.

#### 17 — Programmatique et RTB : organiser la rencontre à grande vitesse · 8 minutes

**Intention visuelle :** deux côtés, vendeur et acheteur, reliés par une place d’échange ; introduire les sigles uniquement après leur fonction.

**Notes de cours.** La publicité programmatique automatise des opérations d’achat et de vente. Le real-time bidding, ou RTB, en est une modalité : une occasion d’affichage est mise aux enchères au moment où elle devient disponible. Il ne constitue ni une nouvelle unité de facturation équivalente au CPM ni l’ensemble de la programmatique. [S21](#s21)

Le média, ou éditeur, dispose de l’emplacement. Une SSP l’aide à proposer et valoriser son inventaire. Une DSP agit du côté de l’annonceur pour sélectionner des occasions et soumettre des offres. Une place d’échange, ou ad exchange, organise leur rencontre. Certaines entreprises cumulent plusieurs fonctions. Les données disponibles peuvent porter sur l’emplacement, le contexte ou une audience ; une DMP peut intervenir, mais n’est pas un passage obligé de toute transaction.

Faire rejouer le processus par quatre étudiants : média, représentant du vendeur, acheteur automatisé, annonceur. La question à chaque passage est « quelle information faut-il transmettre pour cette décision ? ». Montrer ensuite l’affichage, puis la mesure éventuelle d’une réaction.

**Précision.** Le temps d’enchère dépend du dispositif : ne pas enseigner « 120 millisecondes » comme une constante. Le RTB peut être contextuel ; il ne garantit ni identification individuelle ni pertinence parfaite. Le protocole OpenRTB documente des échanges possibles, pas la totalité des pratiques effectives.

**Transition :** automatiser et mesurer ne garantit pas que l’ensemble produise la valeur promise.

#### 18 — Hwang : interroger la valeur des promesses publicitaires · 7 minutes

**Intention visuelle :** séparer valeur annoncée, indicateurs disponibles et effet démontré ; reprendre l’exemple d’attribution de 14.

**Notes de cours.** Tim Hwang rapproche certaines fragilités de la publicité programmatique de celles de marchés financiers : opacité, standardisation d’objets hétérogènes, difficulté à évaluer ce qui est réellement acheté, confiance dans des intermédiaires et des métriques. Son livre formule un diagnostic critique et un scénario de fragilité ; il ne constitue pas l’annonce certaine d’un krach à une date donnée. [S22](#s22)

Les étudiants peuvent maintenant reformuler la difficulté sans slogan : un nombre élevé d’impressions ne garantit pas une attention humaine, un bon taux de clic ne garantit pas une vente supplémentaire, et un coût d’acquisition attribué ne démontre pas l’effet causal d’une campagne. Fraude, mauvais placement et sélection des publics ajoutent des problèmes distincts. L’étude eBay sert de contre-épreuve méthodologique, sans être assimilée à une enquête sur tout le RTB. [S17](#s17)

**Précision.** Conserver deux possibilités ouvertes : certaines campagnes ont des effets utiles ; certaines mesures en surestiment ou en décrivent mal la portée. La publicité peut financer des services tout en étant contestable dans ses instruments ou ses effets.

**Vigilance bibliographique.** Subprime Attention Crisis paraît en 2020 ; la traduction française de 2022 s’intitule Le grand krach de l’attention : La publicité, une bombe au cœur de l’internet.

**Transition avant la pause :** jusqu’ici, nous avons suivi la vente d’occasions de contact. Après la pause, nous examinerons comment les plateformes contribuent à produire ces occasions.

### D. Produire et orienter l’activité

#### 19 — Ce que finance la publicité, chiffres situés · 7 minutes

**Intention visuelle :** deux barres décomposant le chiffre d’affaires annuel des groupes ; aucun camembert de parts du marché mondial.

**Notes de cours.** Les comptes publiés permettent de mesurer la dépendance d’une entreprise à la publicité. Pour l’exercice 2025, Meta déclare 196,175 milliards de dollars de revenus publicitaires sur 200,966 milliards de chiffre d’affaires, soit environ 97,6 %. Alphabet déclare 294,691 milliards de revenus Google advertising sur 402,836 milliards au total, soit environ 73,2 %. Les pourcentages sont calculés à partir des tableaux des rapports annuels. [S23](#s23), [S24](#s24)

Ces chiffres justifient l’attention portée aux incitations publicitaires chez ces deux acteurs. Ils ne décrivent ni tout le web ni la proportion d’une journée individuelle consacrée à la publicité. Ils ne sont pas non plus leurs parts respectives du marché publicitaire mondial : le dénominateur est le chiffre d’affaires de chaque groupe.

Un abonnement, une commission sur une transaction, un financement public ou un don peuvent soutenir d’autres services. Des modèles se combinent. Une entreprise financée par abonnement peut également chercher à retenir l’attention, parce qu’elle veut conserver ses abonnés. Attention disputée et financement publicitaire se recoupent sans être synonymes.

**Précision.** Afficher « exercice 2025, USD, rapports annuels publiés en 2026 ». Ne pas mélanger dollars et euros, revenus et profits, périmètre du groupe et périmètre d’une application. Rafraîchir ces chiffres seulement avec une nouvelle source comparable.

**Transition :** quel lien peut-on établir entre cette dépendance financière et les choix de conception ?

#### 20 — La boucle économique de l’activité · 6 minutes

**Intention visuelle :** deux circuits connectés : activité et financement ; garder les objectifs distincts des signaux.

**Notes de cours.** L’activité produit des traces. Certaines traces servent à choisir des contenus ou à estimer des réactions. Les choix modifient les occasions d’activité suivantes. Dans un modèle publicitaire, des visites supplémentaires peuvent aussi produire davantage d’occasions d’affichage et d’informations utiles au ciblage. Le rapport de la FTC sur les services sociaux et vidéo documente ces incitations chez les entreprises étudiées. [S20](#s20)

Il faut cependant distinguer le financement du service et chaque décision locale de classement. Une entreprise peut chercher à accroître les recettes tout en optimisant plusieurs objectifs intermédiaires : satisfaction déclarée, fidélité, sécurité, pertinence ou qualité des interactions. La description publiée par Meta de son fil donne un exemple de cette pluralité ; c’est une présentation de l’entreprise, pas un audit indépendant. [S25](#s25)

Le choix d’un indicateur crée un problème : une réaction observable peut exprimer la curiosité, l’irritation ou l’adhésion. Optimiser ce signal ne revient donc pas à optimiser directement le bien-être ou l’intérêt civique. Cette remarque ouvre le chapitre sur les gatekeepers ; elle ne permet pas encore de conclure sur les effets de polarisation.

**Précision.** Une annonce est un contenu sponsorisé ; une recommandation non sponsorisée peut participer indirectement au financement en soutenant l’usage. Classer signifie ordonner des éléments ; recommander signifie en proposer une sélection ; modérer signifie appliquer des règles de recevabilité ou de traitement des contenus. Le chapitre suivant développe ces opérations. Ne pas représenter chaque recommandation comme l’issue d’une enchère publicitaire.

**Transition :** les objectifs deviennent aussi des choix de boutons, de rythme et de sollicitations.

#### 21 — Captologie, sollicitations et récompenses intermittentes · 5 minutes

**Intention visuelle :** une action rendue facile et sollicitée ; un retour parfois intéressant ; aucune image de cerveau prétendant prouver un mécanisme biologique.

**Notes de cours.** La captologie étudie la conception de technologies destinées à influencer les attitudes ou les comportements. Le modèle de Fogg invite à examiner ensemble motivation, facilité d’action et sollicitation. Une notification peut fournir cette sollicitation ; un accès en un geste peut faciliter l’action. Ce cadre est un outil de conception, pas une loi qui garantirait qu’une personne obéira. [S26](#s26)

L’attente d’un retour incertain peut contribuer à faire répéter une action : ouvrir une application ne livre pas toujours un message intéressant. Les recherches sur les programmes de renforcement constituent un arrière-plan pour penser cette intermittence. Toutefois, un dispositif social ordinaire ne se réduit pas à une expérience de laboratoire. [S27](#s27)

**Précision.** Distinguer intervalle variable, qui concerne le temps, et ratio variable, qui concerne le nombre de réponses. Ne pas attribuer automatiquement l’un de ces programmes à toute notification. Les formulations « décharge de dopamine », « cerveau piraté » ou « addiction assurée » demanderaient des preuves spécifiques absentes des notes locales. Bhargava et Velasquez proposent une discussion éthique de l’addiction aux médias sociaux, pas un diagnostic clinique de chaque utilisateur. [S28](#s28)

**Transition :** influencer un comportement n’est pas encore tromper ou entraver un choix ; il faut examiner le dispositif.

#### 22 — Dark patterns : qualifier les mécanismes · 8 minutes

**Intention visuelle :** comparer des choix d’interface fictifs, identiques dans leur fonction mais différents dans leurs asymétries.

**Notes de cours.** Les dark patterns sont des configurations d’interface qui trompent, manipulent ou entravent la capacité de décider. La FTC en documente plusieurs familles. Le terme plus large dark design est moins stabilisé ; il sert ici à désigner un problème général de conception, sans remplacer l’examen d’une pratique précise. [S29](#s29)

Exemples pédagogiques inventés : un essai devient payant sans information suffisamment saillante ; la résiliation exige plusieurs démarches alors que l’abonnement se fait en un geste ; une réponse de refus culpabilise la personne ; une option payante est présélectionnée ; un compte à rebours se réinitialise à chaque visite. Ce sont des mécanismes différents : continuité du paiement, obstruction, pression affective, défaut orienté, fausse urgence.

Le défilement infini retire une occasion d’arrêt ; il n’est pas automatiquement trompeur. Une notification peut être utile, importune ou manipulatoire selon son contenu, son rythme et les possibilités de contrôle. Une annonce présentée comme un message personnel soulève une autre difficulté : la dissimulation de sa nature commerciale.

**Précision.** Ne pas ranger « dark patterns » comme une technique parmi les dark patterns. Ne pas confondre renouvellement d’un abonnement et difficulté à le résilier. L’analyse porte sur l’information, les obstacles et leurs effets ; elle ne dépend pas d’une certitude sur l’intention secrète du designer.

**Transition :** appliquer ces critères à une interface et proposer une modification précise.

#### 23 — Atelier : transformer une interface et son objectif · 9 minutes

**Support à préparer :** un écran fictif proposant des notifications, avec un bouton d’acceptation saillant et un refus culpabilisant ; une page d’abonnement dont la résiliation est dissimulée. Mentionner clairement qu’il s’agit de maquettes pédagogiques.

**Consigne.** Pendant trois minutes, en binômes, identifier l’action souhaitée par l’entreprise, le mécanisme utilisé, la donnée éventuellement produite et le bénéfice attendu. Proposer ensuite une modification et expliquer quelle métrique permettrait de l’évaluer.

**Correction attendue.** Pour les notifications, le bénéfice peut être une augmentation des retours ; le refus culpabilisant pèse sur la décision. Une présentation symétrique, des catégories de notifications et un réglage accessible modifient les conditions du choix. Pour l’abonnement, une procédure de sortie proportionnée à celle d’entrée réduit l’obstruction. Les critères d’évaluation peuvent inclure la compréhension, le taux d’erreur, les demandes de support et la satisfaction après décision, pas uniquement le taux d’acceptation.

**Notes de cours.** Une modification visuelle ne supprime pas nécessairement l’incitation financière. Il faut donc examiner ensemble l’objectif donné à l’équipe, la métrique qui atteste sa réussite et les moyens laissés à l’usager. Faire expliciter un arbitrage réel : accepter moins d’inscriptions involontaires peut réduire un indicateur immédiat tout en améliorant la relation.

**Précision.** Cet atelier évalue un raisonnement de conception ; il ne démontre pas empiriquement les effets de la nouvelle interface. Les familles de pratiques sont documentées par [S29](#s29).

**Transition :** les mêmes capacités de mesure et d’intervention permettent d’interroger une forme plus générale de pouvoir.

### E. Profils, pouvoir, alternatives

#### 24 — Zuboff : extraction, prédiction, instrumentarisation · 8 minutes

**Intention visuelle :** distinguer le service rendu, les usages supplémentaires de données et les capacités d’action qui en résultent.

**Notes de cours.** Zuboff appelle surplus comportemental les données d’expérience appropriées au-delà de ce qui sert à fournir ou améliorer le service dans le modèle qu’elle critique. Leur traitement alimente des produits de prédiction et un pouvoir qu’elle qualifie d’instrumentarien : connaître et orienter les conduites grâce à des infrastructures largement asymétriques. [S30](#s30)

Ce cadre aide à poser des questions : qui définit l’usage légitime des traces ? Qui sait quoi sur qui ? Qui peut tester des interventions, en observer les résultats et en tirer avantage ? L’utilisateur peut fournir une grande part de l’activité sans disposer d’un accès équivalent aux modèles ni aux décisions.

Reprendre l’exemple du casque : vendre une capacité de ciblage à un annonceur n’implique pas nécessairement lui remettre le fichier de navigation de Camille. Des échanges ou ventes de données existent aussi, mais leurs acteurs et leurs modalités doivent être établis séparément. La théorie ne dispense pas de décrire la transaction réelle.

**Précision.** Prédire n’est pas garantir ; infléchir les probabilités n’est pas déterminer toutes les conduites. Le livre est une interprétation critique d’un modèle d’accumulation et de pouvoir, pas une expérience prouvant une efficacité publicitaire universelle. Original anglais en 2019, traduction française en 2020.

**Transition :** suivre des cas documentés pour savoir jusqu’où ce cadre éclaire d’autres secteurs.

#### 25 — Assurance et santé : changer de contexte change les enjeux · 8 minutes

**Intention visuelle :** deux petits dossiers distincts, chacun avec données, destinataires, usage et statut de la source.

**Notes de cours.** Le cas GM/OnStar permet de sortir de la seule publicité : la FTC a mis en cause la collecte et la transmission de données de localisation et de conduite, notamment vers des acteurs qui produisaient des informations utilisées par des assureurs. L’accord a donné lieu à une décision finale annoncée en janvier 2026. Le cas montre comment une activité liée à un véhicule peut devenir une information pertinente pour l’évaluation assurantielle. [S31](#s31)

Le dossier BetterHelp de 2023 porte sur l’usage et la divulgation de données sensibles à des fins publicitaires malgré des assurances de confidentialité. Il montre le changement de sens d’une information lorsqu’elle sort d’un contexte de demande d’aide pour participer au ciblage. Ne pas affirmer que des transcriptions de thérapie ont été vendues : ce n’est pas ce que la source utilisée établit. [S32](#s32)

Comparer les deux situations. Dans la première, les traces peuvent affecter l’évaluation d’un risque et les conditions d’accès à un service. Dans la seconde, la difficulté porte sur un réemploi publicitaire dans un contexte particulièrement sensible. Le terme « donnée » ne suffit donc pas à décrire l’enjeu.

**Précision.** Présenter les pratiques telles qu’exposées par l’autorité et le statut procédural documenté. Un règlement d’une procédure n’est pas une démonstration que tout un secteur agit de la même façon. Ces cas illustrent certains mécanismes ; ils ne prouvent pas à eux seuls toute la théorie de Zuboff.

**Transition :** la valorisation des traces peut aussi servir à organiser et contrôler l’activité sans vente publicitaire.

#### 26 — Travail, espaces connectés, sécurité : des extensions différenciées · 7 minutes

**Intention visuelle :** trois situations, sans les fondre dans un unique système total.

**Notes de cours.** Dans une décision publiée en 2025, la CNIL examine un dispositif de surveillance au travail fondé notamment sur l’inactivité informatique et des captures d’écran. Il permet de discuter la réduction d’un travail à ses traces sur un poste : lire, réfléchir ou parler à un collègue ne se mesure pas comme un mouvement de souris. [S33](#s33)

Les objets connectés installés dans des espaces domestiques posent des questions d’accès, de conservation et de contrôle. Le dossier Ring de la FTC, en 2023, documente des défaillances de confidentialité et de sécurité ; il ne doit pas être transformé en preuve que toute caméra vend des profils publicitaires. [S34](#s34)

Enfin, un rapport déclassifié par l’ODNI en 2023 examine l’accès des services de renseignement américains à des informations commercialement disponibles. Il illustre un passage possible du marché vers une utilisation publique de sécurité, sans établir que les prédictions obtenues sont justes ou qu’un dispositif militaire particulier en découle. [S35](#s35)

**Précision.** Pour la ville connectée, conserver une question de comparaison — mobilité, éclairage, sécurité, qui décide de la finalité ? — et non un récit empirique sans cas sourcé. Pour le travail, le pouvoir peut provenir du lien de subordination, sans marché publicitaire. Toutes ces situations ne sont pas des copies de Google.

**Transition :** si l’enjeu porte sur des capacités d’action asymétriques, les réponses ne peuvent pas reposer uniquement sur la volonté individuelle.

#### 27 — Alternatives : agir sur les règles et les milieux · 7 minutes

**Intention visuelle :** trois niveaux : réglage individuel, conception du service, organisation collective.

**Notes de cours.** À l’échelle individuelle, on peut limiter certaines sollicitations ou certains traceurs. À l’échelle d’un service, on peut choisir une publicité contextuelle, limiter la collecte, rendre le refus et la sortie accessibles, ou modifier l’objectif d’optimisation. À l’échelle collective, financement, droits, transparence et contrôle des usages des données changent les conditions du marché. Aucun choix isolé ne résout automatiquement toutes les difficultés.

En France, les règles relatives aux traceurs exigent en principe un consentement préalable, avec des exceptions pour les usages strictement nécessaires ; le refus doit pouvoir être exprimé aussi simplement que l’acceptation. Éviter de confondre cette règle avec un consentement universel à tout traitement de données. [S36](#s36)

Le DSA européen encadre notamment certaines interfaces manipulatoires, la transparence publicitaire et, pour les très grandes plateformes et moteurs concernés, la possibilité d’une recommandation non fondée sur le profilage. Les obligations diffèrent selon les acteurs et les pratiques. Le DMA concerne une autre question, celle de la contestabilité et de l’équité des marchés numériques. [S37](#s37)

Revenir à Citton : protéger l’attention, c’est aussi soutenir les milieux qui permettent d’apprendre, de discuter et de prendre soin. Demander quel financement et quelle organisation permettraient de poursuivre ces objectifs sans simplement augmenter le temps passé. [S04](#s04)

**Précision.** Un abonnement n’abolit pas par nature le suivi ; la publicité contextuelle ne rend pas toute autre collecte légitime. Les textes juridiques cités doivent être relus avant toute mise à jour normative.

**Transition :** réunir les cadres théoriques sans les transformer en auteurs disant tous la même chose.

#### 28 — Quatre questions, quatre apports théoriques · 5 minutes

**Intention visuelle :** tableau de questions, plutôt qu’une galerie de portraits accompagnés de slogans.

**Notes de cours.** Smythe aide à identifier ce qui est constitué comme audience commercialisable. Simon explique pourquoi le traitement de l’information impose des choix d’allocation. Citton déplace l’analyse vers les conditions collectives de l’attention. Zuboff interroge l’appropriation de l’expérience et les capacités asymétriques de prédiction et d’intervention. Ces cadres se complètent parfois ; leurs objets et leurs échelles restent différents. [S01](#s01), [S02](#s02), [S04](#s04), [S30](#s30)

Les Facebook Files peuvent fournir un bref exemple de débat sur les arbitrages internes : le témoignage de Frances Haugen devant le Sénat américain en octobre 2021 rapporte des tensions entre objectifs d’entreprise et dommages identifiés. Le présenter comme un témoignage et un dossier documentaire, pas comme la preuve que tout algorithme impose la haine. [S38](#s38)

Dans le parcours articulé aux réseaux sociaux, le relais est prêt : quels dispositifs traduisent ces objectifs en décisions de visibilité ? C’est le rôle du chapitre gatekeepers. Dans le cours autonome, il reste une extension à examiner : les mêmes entreprises et infrastructures participent au développement de modèles d’apprentissage bien au-delà du ciblage publicitaire.

**Précision.** Ne pas ajouter ici les résultats des études de polarisation déjà enseignées ailleurs. L’enjeu local est de formuler l’hypothèse et d’identifier les conditions nécessaires à sa vérification.

**Transition :** les données ne financent ni ne produisent un modèle à elles seules ; il faut une organisation matérielle et scientifique.

### F. Prolongement vers l’IA

#### 29 — Un écosystème de données, de calcul et de financement · 7 minutes

**Intention visuelle :** plusieurs histoires convergentes : recherche, données, calcul, travail, capitaux, usages. Aucune flèche unique « publicité → IA ».

**Notes de cours.** Les activités numériques ont contribué à développer des infrastructures de stockage, de calcul, d’expérimentation et de recrutement. Chez certaines entreprises, les revenus publicitaires participent à la capacité de financer de grands investissements. Les comptes annuels établissent la coexistence de ces activités ; ils ne permettent pas d’affecter chaque euro publicitaire à un modèle particulier. Il s’agit d’un lien d’écosystème, non d’une causalité financière intégrale. [S23](#s23), [S24](#s24)

L’apprentissage profond a également une histoire scientifique : architectures neuronales, méthodes d’optimisation, ensembles de données, puissance de calcul et collaborations universitaires et industrielles. AlexNet, en 2012, et la synthèse de LeCun, Bengio et Hinton, en 2015, donnent deux points d’appui pour rendre visible cette pluralité. [S39](#s39), [S40](#s40)

L’exemple de la recommandation YouTube décrite en 2016 montre un usage industriel de réseaux neuronaux pour sélectionner et classer des vidéos. Il constitue un pont entre les deux histoires ; il ne signifie pas que tous les modèles d’IA sont des moteurs publicitaires. [S41](#s41)

**Précision.** Conserver les contributions de la recherche publique, des ingénieurs, du travail de préparation des données et des fabricants de matériel. Ne pas raconter une génération spontanée des LLM à partir des clics.

**Transition :** préciser ce que signifie apprendre à partir de données.

#### 30 — Entraînement et inférence : deux opérations différentes · 7 minutes

**Intention visuelle :** d’un côté l’ajustement d’un modèle sur des exemples ; de l’autre son usage sur une nouvelle entrée.

**Notes de cours.** Pendant l’entraînement, un système ajuste les paramètres d’un modèle à partir d’exemples et d’un objectif. Pendant l’inférence, il utilise le modèle obtenu pour produire une estimation ou une sortie sur une entrée. Un modèle estimant la probabilité de clic et un modèle générant du texte peuvent partager des familles de méthodes sans traiter le même objet ni poursuivre le même objectif. [S40](#s40), [S43](#s43)

Une donnée d’usage peut être conservée pour la mesure d’un service, sélectionnée pour une évaluation, éventuellement intégrée à un entraînement ultérieur, ou ne servir à aucune de ces opérations. Ces possibilités dépendent de choix techniques, contractuels et juridiques. Ne pas dire qu’un clic ou un message entraîne immédiatement le modèle.

La qualité d’une prédiction dépend des exemples, de leur préparation, de l’objectif et des situations dans lesquelles le modèle est utilisé. Un modèle peut réussir sur une mesure et échouer sur une autre. Une bonne prédiction de clic n’établit toujours pas ce qui a causé une envie d’achat.

**Précision.** Expliquer paramètres et objectif en langage ordinaire : réglages appris et critère d’apprentissage. Ne pas introduire de formule de réseau neuronal. L’unité est une ouverture conceptuelle, pas un cours technique de machine learning.

**Transition :** la génération de langage prolonge certaines techniques, mais transforme le produit et les marchés concernés.

#### 31 — Des modèles de prédiction aux modèles de langage · 7 minutes

**Intention visuelle :** juxtaposer prédiction d’un clic et production d’une continuation textuelle ; représenter des tâches distinctes.

**Notes de cours.** Les grands modèles de langage apprennent notamment à prédire des éléments d’une séquence textuelle à partir d’un contexte. La génération itère ce type d’opération pour construire une réponse. Les architectures Transformer, introduites en 2017, constituent un jalon ; les travaux sur GPT-3, en 2020, illustrent le changement d’échelle de modèles de langage. [S42](#s42), [S43](#s43)

La continuité avec l’économie des données tient à l’organisation de grands corpus, au calcul, à l’optimisation et à la capacité industrielle de déployer un service. Les différences comptent autant : les données ne sont pas uniquement des traces publicitaires, la tâche n’est pas seulement de prévoir un comportement humain, et les revenus peuvent provenir d’abonnements, de licences ou de services facturés à l’usage.

**Précision.** L’« attention » des Transformers désigne un mécanisme de pondération des relations entre représentations. Ce terme technique n’est pas l’attention cognitive de Simon ou l’écologie de Citton. Son nom ne constitue aucune preuve d’un lien causal avec le marché de l’attention. Une sortie vraisemblable n’est pas une connaissance automatiquement vérifiée.

**Transition :** analyser la chaîne de production plutôt que traiter « l’IA » comme un acteur autonome.

#### 32 — Atelier : reconstruire les conditions d’un service d’IA · 9 minutes

**Support :** scénario fictif d’un service payant d’aide à la rédaction. Il utilise un modèle existant, conserve des journaux techniques pendant une durée annoncée et finance son usage par abonnement. Aucun fournisseur réel n’est visé.

**Consigne.** Trois minutes en binômes pour distinguer : corpus d’entraînement initial, requête de l’utilisateur, inférence, données d’usage, infrastructure de calcul, travail humain et revenu. Identifier ensuite une information manquante avant d’affirmer que les conversations entraînent le modèle.

**Correction attendue.** Le corpus initial et la conversation courante ne sont pas la même chose. Produire la réponse mobilise l’inférence ; la conservation d’un journal ne prouve pas sa réutilisation pour l’entraînement. Il faut connaître les finalités annoncées, les choix de collecte et la chaîne technique. Le prix payé peut financer l’accès au calcul et au service sans acheter la propriété du modèle. La production dépend aussi de la préparation, de l’évaluation, du développement et de l’exploitation.

**Notes de cours.** Revenir à la grille du cours : l’activité devient-elle une donnée ? Qui l’utilise ? Pour quelle décision ? Quelle transaction a lieu ? La même méthode d’enquête fonctionne, mais les réponses ne doivent pas être copiées du modèle publicitaire.

**Précision.** L’activité vérifie la maîtrise des distinctions de 30–31. Elle ne demande aucune connaissance des conditions commerciales actuelles d’un produit.

#### 33 — Synthèse : analyser un dispositif et préparer les gatekeepers · 15 minutes

**Support :** deux scénarios fictifs au choix : un fil social financé par publicité ; un service de recherche financé par abonnement. Ne fournir que les informations nécessaires, en laissant explicitement quelques inconnues.

**Consigne et rythme.** Cinq minutes de travail individuel, cinq de comparaison entre voisins, cinq de reprise collective. Répondre à quatre questions : quelle activité devient un signal ? Quelle boucle technique et économique ce signal alimente-t-il ? Qui gagne quoi et sous quelle condition ? Quelle expérience ou quel pouvoir en résulte, et que reste-t-il à vérifier ?

**Correction attendue.** Une bonne réponse nomme les acteurs, distingue l’événement enregistré et l’inférence, décrit une transaction précise, indique un objectif et une métrique, puis formule un effet possible sans le déclarer certain. Elle propose une alternative qui modifie les conditions d’action et indique les données nécessaires pour l’évaluer. Pour l’ouverture IA, elle distingue entraînement et utilisation d’un modèle.

**Notes de conclusion.** Les données ne produisent pas de la valeur toutes seules : il faut des dispositifs de mesure, des conventions, des modèles, des contrats et des acteurs capables d’agir. L’attention n’est pas seulement disputée ; les situations qui la rendent possible sont organisées. Les objectifs économiques aident à comprendre cette organisation, sans suffire à prévoir chacun de ses effets.

**Relais vers le cours suivant.** La structure du réseau rend certaines rencontres possibles. Nous savons désormais pourquoi des acteurs veulent en privilégier certaines. Il reste à comprendre comment les gatekeepers opèrent cette sélection, puis comment les contenus circulent et quels effets on peut effectivement établir.

## 6. Parcours court : huit slides entre structure et gatekeeping

Ce parcours dure environ **39 minutes**. Il constitue une sélection, pas un résumé accéléré des quatre heures. Les intitulés indiquent la fonction des futurs slides ; les notes longues des unités indiquées fournissent les définitions, références et précautions. Les enchères détaillées, les dark patterns, les extensions sectorielles et l’IA restent dans le cours autonome.

| Repère | Fonction pédagogique                                      | Unités sources | Durée | Intention visuelle                                                   |
| ------ | --------------------------------------------------------- | -------------- | ----: | -------------------------------------------------------------------- |
| K1     | Passer de la circulation possible à l’attention disputée  | 04–05          | 4 min | Abondance des contenus et capacité individuelle limitée.             |
| K2     | Expliquer qui finance l’accès aux publics                 | 03, 06         | 5 min | Public, média ou plateforme, annonceur ; deux relations distinctes.  |
| K3     | Donner trois jalons historiques                           | 07, 09–10      | 6 min | Bannière de 1994 ; enchères GoTo de 1998 ; AdWords 2000/Select 2002. |
| K4     | Montrer ce que les métriques déplacent                    | 08, 13–14      | 5 min | Impression, clic, action ; mesure distincte de l’effet causal.       |
| K5     | Relier les traces à une estimation                        | 02, 15–16      | 5 min | Événement enregistré, rapprochement, profil supposé, estimation.     |
| K6     | Comprendre la vente automatisée d’une occasion de contact | 17             | 4 min | Vendeur, échange, acheteur ; sigles secondaires.                     |
| K7     | Relier le financement aux objectifs du service            | 19–20          | 5 min | Boucle activité/traces/sélection et circuit publicitaire.            |
| K8     | Ouvrir la question politique de la sélection              | 05, 28, 33     | 5 min | Qui choisit l’objectif, l’indicateur et les conditions d’attention ? |

### Notes condensées à reprendre pour chaque slide

**K1.** Nous venons de voir comment groupes, ponts et hubs distribuent des possibilités de rencontre. Or tous les contenus disponibles ne peuvent recevoir la même attention au même moment. Simon aide à comprendre cette contrainte : recevoir de l’information mobilise une ressource limitée. Il ne faut pas en déduire mathématiquement la concentration de la visibilité ; les mécanismes de réseau expliqués auparavant participent précisément à cette distribution. Nous allons maintenant examiner les acteurs qui organisent et valorisent ces rencontres. [S01](#s01)

**K2.** Les médias publicitaires rassemblent des publics et commercialisent des possibilités de les atteindre : c’est le problème posé par Smythe. Dans un marché biface, l’opérateur doit attirer des usagers tout en proposant une prestation aux annonceurs. Le service peut être utile au public et rémunérateur pour l’entreprise. L’asymétrie vient notamment de la différence entre ce que chacun sait des opérations et ce qu’il peut en décider. Ne pas réduire la relation à la propriété ou à la vente des personnes. [S02](#s02), [S06](#s06)

**K3.** La bannière AT&T de HotWired, le 27 octobre 1994, matérialise un affichage auquel on peut réagir. GoTo organise en 1998 des enchères de liens sponsorisés facturés au clic. AdWords débute au CPM en 2000 ; Select propose le CPC en 2002. Ces jalons racontent la construction d’un marché mesurable et automatisable. Ils ne signifient pas que le web invente la publicité, ni que tous les formats précédents disparaissent. [S08](#s08), [S10](#s10), [S12](#s12)

**K4.** Une impression, un clic et un achat répondent à trois questions différentes. L’annonceur peut demander d’optimiser l’une ou l’autre, tandis que la facture conserve une unité distincte. Faire calculer seulement le CPC du petit exemple de 08 : 100 € pour 200 clics donnent 0,50 €. Puis poser le problème : si une vente suit le clic, aurait-elle eu lieu sans publicité ? Les données de campagne n’apportent pas spontanément cette réponse. [S16](#s16), [S17](#s17)

**K5.** L’article consulté peut permettre une annonce contextuelle ; un historique peut contribuer à un ciblage comportemental. Pour relier des événements, il faut des identifiants et des opérations concrètes. Le profil produit reste une inférence : lire un article sur le vélo ne signifie pas vouloir acheter un casque. La valeur commerciale vient d’un usage anticipé de ces informations, pas d’une vérité complète sur la personne. [S18](#s18), [S19](#s19)

**K6.** Une occasion d’affichage peut être proposée automatiquement à des acheteurs qui l’évaluent. Le RTB organise cette enchère au moment où l’occasion se présente. Le contexte et, selon les dispositifs, des données sur l’audience peuvent entrer dans cette estimation. Ce mécanisme n’est ni la totalité de la publicité numérique ni la preuve d’un ciblage parfait. Ne pas développer ici l’ensemble des acronymes. [S21](#s21)

**K7.** Dans un service largement financé par la publicité, multiplier les visites peut créer davantage d’occasions publicitaires. L’activité nourrit aussi des mesures utilisées pour adapter le service. Mais l’entreprise arbitre entre plusieurs objectifs : revenu immédiat, fidélité, satisfaction, sécurité. Cette pluralité n’efface pas les conflits ; elle permet de les formuler précisément. Une recommandation non sponsorisée peut participer à ce modèle sans être une annonce achetée. [S20](#s20), [S25](#s25)

**K8.** Citton invite à demander quelles attentions un environnement rend possibles. Un indicateur de clic ne mesure pas tout ce qui importe dans une conversation ou dans la compréhension d’un sujet. Qui décide alors de ce qui mérite d’être rendu visible et du critère de réussite ? Le chapitre suivant étudie les gatekeepers qui traduisent ces objectifs en sélections. La viralité et la polarisation seront ensuite examinées comme des processus et des effets à documenter. [S04](#s04)

## 7. Registre de vérification et corrections des matériaux

Ce registre distingue **faits retenus et sourcés**, **simplifications pédagogiques explicites**, **thèses attribuées**, **affirmations retirées** et **pistes non établies**. La vérification porte sur les informations factuelles utilisées dans ce plan ; elle ne transforme pas toutes les phrases des brouillons en propositions validées. Les exemples fictifs ne sont jamais des données d’enquête.

### Histoire, attention et économie

| Point des matériaux                                                          | Décision et formulation retenue                                                                                                                             | Appui / destination                                               |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| « Les données sont le nouvel or noir. »                                      | Métaphore éventuellement interrogée à l’oral, pas prémisse factuelle. La valeur dépend d’opérations et d’usages.                                            | 01–02, 33.                                                        |
| « Tous les contenus sont sur le web ; l’attention est identique. »           | Retirer l’universalité et la constance mondiale ; retenir la capacité individuelle limitée face à une offre abondante.                                      | [S01](#s01), 04.                                                  |
| Rareté donc nécessairement forte inégalité.                                  | L’inférence ne suffit pas : distinguer contrainte attentionnelle et mécanismes de concentration.                                                            | 04 et cours sur la structure.                                     |
| Smythe invente le concept en 1981.                                           | Article original retenu en 1977 ; ne pas mélanger livre et réédition dans une anthologie.                                                                   | [S02](#s02), 03.                                                  |
| Tous les médias vendent uniquement leur public.                              | Restreindre l’analyse aux dimensions publicitaires ; conserver les financements mixtes.                                                                     | 03, 06.                                                           |
| Le Lay, entretien Télérama, 2004.                                            | Publication initiale du propos dans Les dirigeants face au changement ; attribution rectifiée.                                                              | [S07](#s07).                                                      |
| Hastings et le sommeil « vingt ans plus tard ».                              | Épisode associé à 2017, non 2024 ; anecdote facultative écartée du déroulé. Elle ne démontrerait pas un financement publicitaire de Netflix à cette époque. | [S44](#s44).                                                      |
| Simon aurait un problème sans dimension économique.                          | Allocation organisationnelle de ressources cognitives.                                                                                                      | [S01](#s01).                                                      |
| Goldhaber serait l’inventeur unique et le prophète de la publicité ciblée.   | Jalonnement intellectuel en 1997 ; reconnaissance et économie de l’attention au-delà de cette seule application.                                            | [S03](#s03).                                                      |
| Information numérique de coût nul.                                           | Coût de reproduction souvent faible ; ne pas supprimer production, stockage et infrastructure.                                                              | 04, 29.                                                           |
| Citton réduit à une référence supplémentaire.                                | Deux fonctions précises : critique de la métrique de durée ; action sur les milieux collectifs.                                                             | [S04](#s04), 05, 27.                                              |
| 336 milliards en 2020 ; 500–600 milliards « aujourd’hui » ; 70 % du marché.  | Chiffres retirés : dates, géographies et périmètres des liens locaux ne suffisent pas pour une comparaison fiable.                                          | Remplacement par comptes datés en 19.                             |
| Alphabet 36 %, Meta 19 %, Amazon 6,9 % ; Meta 30 % de revenus publicitaires. | Ne pas reprendre ce mélange de parts de marché et de structure de revenus.                                                                                  | [S23](#s23), [S24](#s24) ; aucune nouvelle part mondiale avancée. |

### Techniques publicitaires et chronologie

| Point des matériaux                                                      | Décision et formulation retenue                                                                                               | Appui / destination                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Bannière du 17 octobre 1994.                                             | 27 octobre 1994 ; campagne emblématique parmi les annonceurs de HotWired.                                                     | [S08](#s08).                                        |
| Taux de clic inaugural.                                                  | 44 % rapportés par un concepteur ; mesure non auditée ici. Toute comparaison reste à établir.                                 | [S09](#s09), hors projection.                       |
| Internet en 1994 n’est qu’un laboratoire public.                         | Formulation retirée ; elle ne décrit pas la pluralité des usages de cette période.                                            | Aucun rôle dans le raisonnement retenu.             |
| Yahoo 1995, cinq sponsors et contrats de plusieurs milliers de dollars.  | Détails non nécessaires et non suffisamment établis dans les sources consultées ; ne pas les projeter.                        | 07 suffit sans ces anecdotes.                       |
| CPM intrinsèquement inefficace.                                          | Une métrique d’affichage n’est pas une mesure de vente ; son intérêt dépend de l’objectif.                                    | 08.                                                 |
| GoTo invente seul le PPC en 1997.                                        | Étape majeure en 1998 des enchères de liens sponsorisés ; éviter la priorité absolue.                                         | [S10](#s10).                                        |
| La valeur d’une citation prouve la qualité.                              | PageRank mesure une forme d’importance fondée sur les liens, pas la vérité ou la qualité absolue.                             | [S11](#s11), 10.                                    |
| Filiation précise Science Citation Index/HITS/PageRank.                  | Pas de généalogie simplifiée enseignée ; elle demanderait une histoire propre et doublerait le cours sur les réseaux.         | 10, rappel minimal.                                 |
| Krach puis Schmidt puis publicité.                                       | Distinguer facteurs de financement et dates documentées : AdWords 2000 ; Schmidt 2001.                                        | [S12](#s12), [S13](#s13).                           |
| AdWords dès le départ au CPC.                                            | CPM en octobre 2000 ; AdWords Select au CPC en février 2002.                                                                  | [S12](#s12).                                        |
| Second prix généralisé donc vérité des offres.                           | Proposition fausse en général ; ne pas transférer les propriétés d’autres mécanismes au GSP.                                  | [S14](#s14).                                        |
| Prix égal à l’offre précédente.                                          | Dans le modèle simplifié, prix fondé sur l’offre de rang inférieur ; hypothèses explicites.                                   | Exercice de 11.                                     |
| Enchères au premier prix toujours réduites à la troisième valeur.        | Retirer la généralisation : résultat dépendant d’un modèle et de stratégies précises.                                         | Exercice de 11 sans simulation historique inventée. |
| Qualité introduite seulement en 2005–2006.                               | Taux de clic déjà présent en 2002 ; nom Quality Score en 2005.                                                                | [S12](#s12), [S15](#s15).                           |
| Ad Rank = enchère × Quality Score affiché aujourd’hui.                   | Ne pas présenter cette formule comme celle du système actuel.                                                                 | [S15](#s15), 12.                                    |
| CPA inventé par Google en 2009.                                          | Exemple vérifiable de Conversion Optimizer en 2007 ; distinguer ratio, objectif et paiement.                                  | [S16](#s16), 13.                                    |
| Conversion donc surveillance nécessaire sur tout le web.                 | Mesure et attribution peuvent être limitées ; la collecte extensive n’est pas une nécessité logique.                          | 13–16.                                              |
| Chronologie 2004/2005/2007/2009 de recherche personnalisée.              | Ne conserver, en réserve, que le jalon primaire de décembre 2009 ; cette histoire reste distincte des enchères publicitaires. | [S45](#s45).                                        |
| Une date serait « la fin de la neutralité » de Google.                   | Jugement non réductible à un lancement de produit ; analyser critères et conflits au lieu d’un basculement moral unique.      | 10, 15.                                             |
| Gmail, Maps, Android : liste indifférenciée de collectes.                | Ne pas inférer de pratiques actuelles à partir de noms de services ; usages à documenter par produit et par période.          | 16.                                                 |
| Cookies tiers supprimés partout.                                         | Affirmation exclue ; les politiques varient, notamment après les annonces de Chrome de 2025.                                  | [S46](#s46).                                        |
| RTB = ciblage individuel ; enchères antérieures génériques et manuelles. | RTB = procédure de transaction ; ciblage, vitesse et automatisation sont des dimensions distinctes.                           | [S21](#s21).                                        |
| DMP obligatoire, enchère toujours en 120 ms.                             | Architecture simplifiée ; DMP optionnelle, délais variables.                                                                  | 17.                                                 |
| RTB garanti efficace, précis et sans gaspillage.                         | Promesse à évaluer, non résultat acquis ; attribution et causalité séparées.                                                  | 14, 18.                                             |

### Interfaces, pouvoir et IA

| Point des matériaux                                                           | Décision et formulation retenue                                                                                                               | Appui / destination                                 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Toute recommandation maximise exclusivement l’engagement.                     | Distinguer modèle financier, objectifs intermédiaires et système concret.                                                                     | [S20](#s20), [S25](#s25).                           |
| Publicité = contenu recommandé.                                               | Séparer enchère d’annonce et classement non sponsorisé, tout en montrant leurs liens économiques.                                             | 20.                                                 |
| Dark design et captologie synonymes de tromperie.                             | Distinguer influence, conception manipulatoire et expression générale moins stabilisée.                                                       | [S26](#s26), [S29](#s29).                           |
| Forced continuity = impossibilité de résilier.                                | Séparer poursuite/renouvellement du paiement et obstruction à la sortie.                                                                      | 22–23.                                              |
| Infinite scroll automatiquement dark pattern.                                 | Décrire l’absence de point d’arrêt ; qualifier séparément tromperie, contrôle et effets.                                                      | 22.                                                 |
| Notifications = dopamine = addiction.                                         | Chaîne causale non démontrée par le corpus ; ne pas projeter comme fait neurologique.                                                         | [S27](#s27), [S28](#s28).                           |
| Récompense aléatoire = n’importe quel programme variable.                     | Ratio et intervalle concernent des dimensions différentes ; analogie prudente seulement.                                                      | 21.                                                 |
| Facebook Files prouve une obligation universelle de produire de la haine.     | Témoignage situé et arbitrages organisationnels ; pas de déterminisme général.                                                                | [S38](#s38), 28.                                    |
| Twitter 2021 prouve « le même problème ».                                     | Une amplification politique mesurée n’est pas identique à une polarisation causée ; laisser l’étude à son chapitre et vérifier son protocole. | Renvoi à polarization, pas de nouveau résultat ici. |
| Zuboff établit que toutes les données brutes sont revendues.                  | Distinguer vente de données, accès ciblé et prestations de prévision.                                                                         | [S30](#s30), 24.                                    |
| Modèles prédictifs garantissant ou dictant les comportements.                 | Prévisions probabilistes, interventions et effets causaux distincts.                                                                          | 14, 24, 30.                                         |
| Chaque exemple assurances, santé, RH, ville serait tiré précisément du livre. | Aucun renvoi de page inventé ; cas empiriques sourcés indépendamment.                                                                         | [S31](#s31) à [S35](#s35).                          |
| Surveillance au travail, ville ou sécurité forcément publicitaire.            | Finalités et rapports de pouvoir différents ; comparaison explicite.                                                                          | 26.                                                 |
| Prédiction policière ou militaire présentée comme efficace par nature.        | Efficacité non établie ici ; aucune affirmation sur un ciblage militaire précis.                                                              | 26.                                                 |
| Hwang prédit un krach certain.                                                | Analogie et thèse critique ; distinguer scénario et résultat empirique.                                                                       | [S22](#s22).                                        |
| RGPD, DSA et DMA interchangeables.                                            | Données personnelles, obligations des services et organisation des marchés : fonctions distinctes, chevauchements possibles.                  | [S36](#s36), [S37](#s37).                           |
| L’argent de la publicité a créé les LLM.                                      | Relation d’écosystème, histoire scientifique plurielle, aucune affectation financière intégrale démontrée.                                    | 29–31.                                              |
| Toute donnée d’usage entraîne immédiatement l’IA.                             | Distinguer collecte, sélection, entraînement, évaluation et inférence.                                                                        | 30–32.                                              |
| Attention des Transformers = attention humaine.                               | Homonymie à expliciter ; concepts techniques et sociaux distincts.                                                                            | [S42](#s42), 31.                                    |

### Bibliographie locale à ne pas recopier automatiquement

- La référence de Smythe mélange un texte ancien et une anthologie ultérieure. Utiliser l’article original [S02](#s02).
- La pagination correcte de Kessous, Mellet et Zouinar est **359–373**, non 374–388. Voir [S05](#s05).
- Zuboff : **2019** pour l’original anglais, **2020** pour la traduction française. Hwang : **2020** pour l’original, **2022** pour la traduction ; corriger le sous-titre français. Voir [S22](#s22), [S30](#s30).
- La liste attribuée à un échange avec Anthropic est une piste de recherche, pas une source. Les noms de Franck, Davenport et Beck, Wu, Kahneman, Gazzaley et Rosen, Crawford et Hjarvard ne justifient pas les propositions vagues qui leur sont associées. Ils ne sont pas nécessaires au parcours retenu ; ne pas générer de slide supplémentaire sur cette seule base.
- De la misère symbolique n’est pas une « trilogie » : deux tomes, 2004 et 2005. La formule sur la « disruption » ne doit pas leur être attribuée sans passage identifié. Cette piste reste hors cours. Voir [S47](#s47).
- Jenny Odell ne doit pas être résumée à une « déconnexion productive » : cela réintroduit précisément un impératif de rendement dans une proposition qui interroge la destination de l’attention. Lecture complémentaire possible, hors déroulé. Voir [S48](#s48).
- Les liens de blogs marketing peuvent orienter une recherche historique, mais les dates structurantes sont ici appuyées par les archives primaires des annonces de Google. La mention imprécise d’un article Bloomberg de 2006 ne sert de preuve à aucune affirmation.
- Le texte de The Atlantic de 2012 mentionné dans Dark design.txt reste une piste journalistique. Il n’est pas utilisé pour établir un mécanisme neurologique ou un diagnostic d’addiction.

## 8. Sources vérifiées et portée de leur usage

Consultation pour ce plan : 4 octobre 2026. Les liens ci-dessous identifient les documents utilisés ; une page d’entreprise vaut comme preuve de son annonce ou de sa présentation du produit, pas comme preuve indépendante de ses effets. Pour les livres, l’accès aux présentations, introductions et entretiens ne vaut pas lecture intégrale. Les sources à accès limité sont signalées. Aucune citation longue n’est nécessaire à la fabrication des slides.

### Attention, publics, marchés

<a id="s01"></a>

**S01 — Herbert A. Simon, 1971.** « Designing Organizations for an Information-Rich World », dans Martin Greenberger (dir.), Computers, Communications, and the Public Interest, p. 37–72. [Reproduction du chapitre](https://atelierdesfuturs.org/wp-content/uploads/2025/07/1971-simon.pdf). Texte original consulté ; le passage sur l’attention se situe autour des pages imprimées 40–41. Appui : allocation de l’attention, pas mesure quantitative d’un stock mondial.

<a id="s02"></a>

**S02 — Dallas W. Smythe, 1977.** « Communications: Blindspot of Western Marxism », Canadian Journal of Political and Social Theory, 1(3), p. 1–27. [Article original](https://journals.uvic.ca/index.php/ctheory/article/view/13715/4463). Appui : critique de la production d’audience ; distinguer cet article de Dependency Road, 1981.

<a id="s03"></a>

**S03 — Michael H. Goldhaber, 1997.** « The Attention Economy and the Net », First Monday, 2(4), DOI 10.5210/fm.v2i4.519. [Texte original](https://firstmonday.org/ojs/index.php/fm/article/download/519/440?inline=1). Essai théorique ; ne démontre ni une priorité exclusive de l’expression ni les effets futurs de plateformes particulières.

<a id="s04"></a>

**S04 — Yves Citton, 2014.** Pour une écologie de l’attention, Seuil ; et L’économie de l’attention. Nouvel horizon du capitalisme ?, ouvrage dirigé, La Découverte. [Notice du premier livre](https://shs.cairn.info/pour-une-ecologie-de-l-attention--9782021181425), [présentation du collectif](https://www.editionsladecouverte.fr/l_economie_de_l_attention-9782707178701), [introduction de Citton](https://www.yvescitton.net/wp-content/uploads/2017/09/CITTON-EconomieAttention-Intro-2014.pdf), [entretien au Journal du CNRS](https://lejournal.cnrs.fr/articles/lattention-un-bien-precieux). Appui : distinction entre ressource valorisée et organisation collective des milieux attentionnels. Pas de prétention à une lecture intégrale des deux ouvrages dans cette vérification.

<a id="s05"></a>

**S05 — Emmanuel Kessous, Kevin Mellet et Moustafa Zouinar, 2010.** « L’économie de l’attention : entre protection des ressources cognitives et extraction de la valeur », Sociologie du travail, 52(3), p. 359–373. [Notice et résumé éditeur](https://www.sciencedirect.com/science/article/pii/S0038029610000622), [bibliographie de l’auteur](https://cv.hal.science/moustafa-zouinar). Appui limité à la distinction annoncée dans le titre et le résumé, ainsi qu’aux métadonnées vérifiées.

<a id="s06"></a>

**S06 — Jean-Charles Rochet et Jean Tirole, 2003.** « Platform Competition in Two-Sided Markets », Journal of the European Economic Association, 1(4), p. 990–1029. [Dépôt institutionnel](https://publications.ut-capitole.fr/id/eprint/1019/). Appui : participation de plusieurs faces et structure des prix. Les exemples du cours sont des applications pédagogiques, pas des résultats particuliers de l’article sur un réseau social contemporain.

<a id="s07"></a>

**S07 — Patrick Le Lay, propos de 2004, source journalistique contemporaine.** [Le Monde, « Les auteurs contre les propos de M. Le Lay », 1er septembre 2004](https://www.lemonde.fr/archives/article/2004/09/01/p-les-auteurs-contre-les-propos-de-m-le-lay-p_4292024_1819218.html). Sert à identifier la publication initiale et le contexte. Paraphrase courte uniquement ; pas de long extrait du livre non paginé.

### Histoire et mécanismes publicitaires

<a id="s08"></a>

**S08 — Wired, histoire de HotWired, 2010.** [« Oct. 27, 1994: Web Gives Birth to Banner Ads »](https://www.wired.com/2010/10/1027hotwired-banner-ads/). Appui : date, contexte de lancement et bannière AT&T. Source rétrospective du média concerné, pas preuve d’une priorité absolue de toute publicité numérique.

<a id="s09"></a>

**S09 — Joe McCambley, 2013.** [The Guardian](https://www.theguardian.com/media-network/media-network-blog/2013/dec/12/first-ever-banner-ad-advertising). Source du chiffre examiné dans le registre.

<a id="s10"></a>

**S10 — GoTo, documentation journalistique contemporaine, 1998.** [InternetNews, « And Now, a Pay-to-Play Search Directory », 24 février 1998](https://www.internetnews.com/marketing/and-now-a-pay-to-play-search-directory/). Appui : fonctionnement historique par enchères et paiement au clic. Complément historique : [Search Engine Watch, rapport de juillet 1998](https://searchenginewatch.com/1998/06/30/the-search-engine-report-july-1-1998-number-20/), qui rappelle notamment un précédent de paid listings. Pour les propriétés théoriques des enchères, utiliser S14.

<a id="s11"></a>

**S11 — Sergey Brin et Lawrence Page, 1998.** « The Anatomy of a Large-Scale Hypertextual Web Search Engine ». [Notice primaire Google Research](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/), [texte original hébergé à Stanford](https://infolab.stanford.edu/~backrub/google.html). Appui : analyse des liens et problème du financement publicitaire traité en appendice A. Accès au texte Stanford intermittent ; aucune citation littérale ni pagination nouvelle n’en est tirée.

<a id="s12"></a>

**S12 — Archives officielles Google, 2000 et 2002.** [Lancement d’AdWords, 23 octobre 2000](https://googlepress.blogspot.com/2000/10/google-launches-self-service.html) ; [AdWords Select, 20 février 2002](https://googlepress.blogspot.com/2002/02/google-introduces-new-pricing-for.html). Communiqués contemporains consultés : CPM initial, CPC ensuite, prise en compte du taux de clic dès 2002. Leur discours promotionnel n’établit pas l’efficacité causale des produits.

<a id="s13"></a>

**S13 — Google, 6 août 2001.** [Nomination d’Eric Schmidt au poste de CEO](https://googlepress.blogspot.com/2001/08/google-names-dr-eric-schmidt-chief.html). Appui uniquement chronologique : conseil en mars, direction générale en août 2001.

<a id="s14"></a>

**S14 — Benjamin Edelman, Michael Ostrovsky et Michael Schwarz, 2007.** « Internet Advertising and the Generalized Second-Price Auction: Selling Billions of Dollars Worth of Keywords », American Economic Review, 97(1), p. 242–259. [Notice et résumé des auteurs chez l’éditeur](https://www.aeaweb.org/articles?id=10.1257/aer.97.1.242). Le résumé établit explicitement la différence avec VCG et l’absence de propriété générale de vérité des offres. Le PDF éditeur n’a pas été accessible ; aucune démonstration intégrale n’est prétendue ici. L’exemple numérique est construit pour le cours.

<a id="s15"></a>

**S15 — Google, Quality Score historique et documentation actuelle.** [Archives officielles de juillet 2005](https://adwords.googleblog.com/2005/07/), [« About Quality Score »](https://support.google.com/google-ads/answer/6167118?department=sales&hl=en), [Ad Rank](https://support.google.com/google-ads/answer/1722122/about-ad-position-and-ad-rank?hl=en-GB). Appui : apparition du nom, statut diagnostique du score affiché, facteurs multiples de classement. Ne pas convertir la documentation actuelle en description inchangée depuis 2005.

<a id="s16"></a>

**S16 — Google, 24 septembre 2007.** [« New CPA bidding product available »](https://adwords.googleblog.com/2007/09/new-cpa-bidding-product-available.html). Texte primaire distinguant optimisation vers un coût par acquisition et paiement au clic dans Conversion Optimizer. Établit un jalon, pas l’invention mondiale du CPA.

<a id="s17"></a>

**S17 — Thomas Blake, Chris Nosko et Steven Tadelis, 2015.** « Consumer Heterogeneity and Paid Search Effectiveness: A Large-Scale Field Experiment », Econometrica, 83(1), p. 155–174, DOI 10.3982/ECTA12423. [Version de travail déposée par l’auteur, 2014](https://faculty.haas.berkeley.edu/stadelis/Tadelis.pdf), [notice NBER](https://www.nber.org/papers/w20171). Appui : expérience eBay, différence entre attribution et effet incrémental, hétérogénéité des résultats. Ne pas généraliser à toutes les publicités ou au RTB.

<a id="s18"></a>

**S18 — CNIL, publicité ciblée.** [« Publicité ciblée en ligne : quels enjeux pour la protection des données personnelles ? »](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookie-walls/publicite-ciblee-en-ligne-quels-enjeux-pour-la-protection-des-donnees-personnelles). Appui : contextualisation, profilage et enjeux des traitements. Les cas du vélo sont inventés pour expliquer les distinctions.

<a id="s19"></a>

**S19 — Documentation des mécanismes de suivi.** [MDN, Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies), [CNIL, définition du tracking pixel](https://www.cnil.fr/fr/definition/tracking-pixelweb-beacon-ou-pixel-espion), [CNIL, méthodes de traçage](https://www.cnil.fr/fr/nouvelles-methodes-de-tracage-en-ligne-quelles-solutions-pour-se-proteger). Appui : fonctionnement et diversité des usages, limites de l’assimilation cookie/surveillance.

<a id="s20"></a>

**S20 — Federal Trade Commission, 2024.** A Look Behind the Screens: Examining the Data Practices of Social Media and Video Streaming Services. [Rapport et présentation](https://www.ftc.gov/reports/look-behind-screens-examining-data-practices-social-media-video-streaming-services), [PDF](https://www.ftc.gov/system/files/ftc_gov/pdf/Social-Media-6b-Report-9-11-2024.pdf). Appui : pratiques de collecte, publicité et incitations chez les services étudiés ; voir notamment les sections relatives aux revenus publicitaires et aux traitements automatisés. Rapport fondé sur une enquête auprès de neuf entreprises, pas recensement de tout le web.

<a id="s21"></a>

**S21 — IAB Tech Lab, OpenRTB 2.6, 2022.** [Présentation](https://iabtechlab.com/openrtb-2-6-is-ready-for-implementation/), [spécification d’avril 2022](https://iabtechlab.com/wp-content/uploads/2022/04/OpenRTB-2-6_FINAL.pdf). Appui : protocole d’échange pour les enchères, objets et rôles. Version datée utilisée comme document de référence, sans prétendre qu’il s’agit de la dernière révision disponible ni que le protocole démontre les pratiques de chaque acteur.

<a id="s22"></a>

**S22 — Tim Hwang, 2020 / 2022.** Subprime Attention Crisis: Advertising and the Time Bomb at the Heart of the Internet, FSG Originals ; Le grand krach de l’attention : La publicité, une bombe au cœur de l’internet, traduction d’Anne Lemoine, C&F Éditions. [Présentation et extrait de l’éditeur original](https://us.macmillan.com/books/9780374538651/subprimeattentioncrisis/), [édition française](https://cfeditions.com/krach/). Appui : thèse critique et métadonnées, sans prétendre à une lecture intégrale du livre.

### Entreprises, interfaces et pouvoir

<a id="s23"></a>

**S23 — Meta, Form 10-K, exercice clos le 31 décembre 2025.** [Rapport déposé auprès de la SEC](https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm). Tableau de revenus : Advertising 196 175 ; Total revenue 200 966, en millions de dollars. Calcul du plan : 196 175 / 200 966 = 97,6 % après arrondi à une décimale. Pas une part de marché.

<a id="s24"></a>

**S24 — Alphabet, Form 10-K, exercice clos le 31 décembre 2025.** [Rapport déposé auprès de la SEC](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm). Tableau de revenus : Google advertising 294 691 ; Total revenues 402 836, en millions de dollars. Calcul du plan : 294 691 / 402 836 = 73,2 % après arrondi à une décimale. Ne pas agréger les revenus d’entreprises pour inventer un dénominateur mondial.

<a id="s25"></a>

**S25 — Meta, 2021.** [« How Does News Feed Predict What You Want to See? »](https://about.fb.com/news/2021/01/how-does-news-feed-predict-what-you-want-to-see/). Présentation par l’entreprise de plusieurs signaux et objectifs, notamment de retours déclarés. Preuve de son discours et de la description publiée à cette date ; ne vaut pas validation indépendante de l’efficacité ni description exhaustive du système actuel.

<a id="s26"></a>

**S26 — B. J. Fogg.** Persuasive Technology: Using Computers to Change What We Think and Do, 2003 ; [présentation du Fogg Behavior Model par son auteur](https://www.behaviormodel.org/home). Pour l’unité 21, usage du modèle Motivation, Ability, Prompt, dans sa présentation actuelle. Heuristique de conception, pas équation biologique prédictive.

<a id="s27"></a>

**S27 — Charles B. Ferster et B. F. Skinner, 1957.** Schedules of Reinforcement. [Ouvrage original mis à disposition par la B. F. Skinner Foundation](https://www.bfskinner.org/wp-content/uploads/2015/05/Schedules_of_Reinforcement_PDF.pdf). Appui limité aux distinctions entre programmes de renforcement. Aucun résultat sur une application contemporaine ne lui est attribué.

<a id="s28"></a>

**S28 — Vikram R. Bhargava et Manuel Velasquez, 2021.** « Ethics of the Attention Economy: The Problem of Social Media Addiction », Business Ethics Quarterly, 31(3), p. 321–359. [DOI et notice éditeur](https://doi.org/10.1017/beq.2020.32). Publication en ligne en 2020, volume en 2021. Appui : problème éthique exposé dans le résumé ; ni taux de prévalence ni diagnostic clinique tiré de cette lecture.

<a id="s29"></a>

**S29 — Federal Trade Commission, 2022.** Bringing Dark Patterns to Light. [Rapport](https://www.ftc.gov/reports/bringing-dark-patterns-light), [PDF](https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf). Appui : catégories et mécanismes de conception. Les interfaces de l’atelier sont fictives et ne reproduisent pas des entreprises mises en cause.

<a id="s30"></a>

**S30 — Shoshana Zuboff, 2015, 2019 / 2020.** « Big Other: Surveillance Capitalism and the Prospects of an Information Civilization », Journal of Information Technology, DOI 10.1057/jit.2015.5, [article original en PDF](https://www.sfu.ca/~palys/Zuboff-2015-BigOther-SurveillanceCapitalism.pdf), [présentation par l’autrice](https://shoshanazuboff.com/book/recent-publications-and-interviews/big-other-surveillance-capitalism-and-the-prospects-of-an-information-civilization/). Prolongement : The Age of Surveillance Capitalism, 2019 ; L’Âge du capitalisme de surveillance, traduction française, Zulma, 2020. Cadre théorique attribué ; les cas sectoriels ci-dessous possèdent leurs propres sources. Aucune pagination du livre n’est inventée pour les citations des brouillons.

<a id="s31"></a>

**S31 — FTC, GM et OnStar, 2025–2026.** [Dossier de procédure](https://www.ftc.gov/legal-library/browse/cases-proceedings/2423052-general-motors-llc-et-al-matter), [annonce de finalisation, janvier 2026](https://www.ftc.gov/news-events/news/press-releases/2026/01/ftc-finalizes-order-settling-allegations-gm-onstar-collected-sold-geolocation-data-without-consumers). Appui : pratiques contestées, destinataires, usages assurantiels et statut de l’accord. Ne pas présenter l’accord comme un jugement établissant toutes les allégations après procès.

<a id="s32"></a>

**S32 — FTC, BetterHelp, 2023.** [Déclaration de la commissaire Wilson, mars 2023](https://www.ftc.gov/system/files/ftc_gov/pdf/commissioner_wilson_concur_betterhelp_3.2.23.pdf), [dossier de décision finale du 14 juillet 2023](https://www.ftc.gov/legal-library/browse/cases-proceedings/betterhelp-inc-matter-timeline-item-2023-07-14). Appui : données sensibles et publicité ; ne pas extrapoler à la vente des contenus des séances thérapeutiques.

<a id="s33"></a>

**S33 — CNIL, décision du 19 décembre 2024, publication du 4 février 2025.** [Surveillance excessive de salariés dans le secteur immobilier](https://www.cnil.fr/fr/surveillance-excessive-des-salaries-sanction-de-40-000-euros-entreprise-secteur-immobilier). Appui : captures d’écran, mesure d’inactivité et proportionnalité. Exemple circonscrit d’indicateurs de travail, pas preuve d’un usage généralisé de reconnaissance des émotions.

<a id="s34"></a>

**S34 — FTC, Ring, 2023.** [Dossier de procédure](https://www.ftc.gov/legal-library/browse/cases-proceedings/ring-llc-timeline-item-2023-05-31). Appui : confidentialité, accès et sécurité des images. Ne pas en tirer une affirmation de commercialisation systématique des vidéos.

<a id="s35"></a>

**S35 — ODNI, rapport déclassifié en 2023 sur les informations commercialement disponibles.** [Publication institutionnelle](https://archive.dni.gov/index.php/newsroom/press-releases/press-releases-2023/3701-dni-haines-statement-on-declassified-report-on-commercially-available-information), [copie du rapport déposée au Congrès](https://www.congress.gov/118/meeting/house/116192/documents/HHRG-118-JU00-20230712-SD011.pdf). Appui : rapport entre marché des données et renseignement. Aucun résultat sur la fiabilité de la prédiction policière n’en est dérivé.

<a id="s36"></a>

**S36 — CNIL, règles relatives aux cookies et autres traceurs.** [Présentation des règles](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi), [recommandation consolidée, janvier 2026](https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf). Appui : consentement, exceptions et facilité du refus. Distinguer le régime des traceurs et l’ensemble des bases légales possibles d’un traitement de données personnelles.

<a id="s37"></a>

**S37 — Union européenne, DSA, règlement (UE) 2022/2065.** [Texte officiel](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng), [FAQ de la Commission](https://digital-strategy.ec.europa.eu/en/faqs/digital-services-act-questions-and-answers). Repères : article 25 sur les interfaces, article 26 sur la publicité, article 28 sur les mineurs, article 38 sur l’option de recommandation non fondée sur le profilage pour les très grands services concernés. L’article 25 comporte une articulation avec les pratiques déjà couvertes par le RGPD ou le droit des pratiques commerciales déloyales. Le cours ne transforme pas ces obligations différenciées en interdiction générale de tout ciblage. La FAQ distingue aussi DSA et DMA.

<a id="s38"></a>

**S38 — Sénat américain, 5 octobre 2021.** [« Protecting Kids Online: Testimony from a Facebook Whistleblower »](https://www.commerce.senate.gov/meetings/subcommittee-protecting-kids-online-testimony-from-a-facebook-whistleblower/). Appui : date et statut du témoignage de Frances Haugen. Le plan n’attribue pas à cette audition une démonstration causale générale de polarisation.

### Apprentissage automatique et compléments

<a id="s39"></a>

**S39 — Alex Krizhevsky, Ilya Sutskever et Geoffrey E. Hinton, 2012.** « ImageNet Classification with Deep Convolutional Neural Networks ». [Article original](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf). Appui : jalon de l’apprentissage profond, combinaison de données, architecture et calcul ; pas une origine unique de l’IA.

<a id="s40"></a>

**S40 — Yann LeCun, Yoshua Bengio et Geoffrey Hinton, 2015.** « Deep learning », Nature, 521, p. 436–444. [Article et résumé éditeur](https://www.nature.com/articles/nature14539). Appui : principes et pluralité des applications. Les distinctions de l’unité 30 sont des explications introductives, pas un exposé mathématique de l’article.

<a id="s41"></a>

**S41 — Paul Covington, Jay Adams et Emre Sargin, 2016.** « Deep Neural Networks for YouTube Recommendations ». [Publication des auteurs](https://research.google/pubs/deep-neural-networks-for-youtube-recommendations/). Appui : un cas industriel documenté de sélection et classement de recommandations. Le cours sur les gatekeepers garde l’explication détaillée de ces opérations.

<a id="s42"></a>

**S42 — Ashish Vaswani et al., 2017.** « Attention Is All You Need ». [Article original](https://arxiv.org/abs/1706.03762). Appui : architecture Transformer et sens technique d’attention. Aucun rapprochement substantiel avec l’attention humaine ne découle du titre.

<a id="s43"></a>

**S43 — Tom B. Brown et al., 2020.** « Language Models are Few-Shot Learners ». [Article original](https://arxiv.org/abs/2005.14165). Appui : exemple GPT-3, modèle de langage, entraînement et utilisation du contexte. Ne décrit pas les politiques actuelles de collecte d’un produit commercial.

<a id="s44"></a>

**S44 — Propos de Reed Hastings rapportés en avril 2017.** [Entrepreneur, « Netflix: Our Biggest Competitor Is Sleep »](https://www.entrepreneur.com/business-news/netflix-our-biggest-competitor-is-sleep/293004). Source secondaire utilisée uniquement pour corriger la chronologie de l’anecdote. Pas de citation exacte intégrée au cours ; aucune démonstration fondée sur ce seul propos.

<a id="s45"></a>

**S45 — Google, 4 décembre 2009.** [« Personalized Search for Everyone »](https://googleblog.blogspot.com/2009/12/personalized-search-for-everyone.html). Archive primaire sur l’extension de la personnalisation aux utilisateurs non connectés. Jalonnement facultatif ; ni invention de toute personnalisation ni date d’une « fin de neutralité ».

<a id="s46"></a>

**S46 — Google, 22 avril 2025.** [« Next steps for Privacy Sandbox and tracking protections in Chrome »](https://privacysandbox.google.com/blog/privacy-sandbox-next-steps). Appui pour écarter une annonce universelle de suppression des cookies tiers. Source datée, pas garantie de stabilité future des choix du navigateur.

<a id="s47"></a>

**S47 — Bernard Stiegler, De la misère symbolique, deux tomes.** 1. L’époque hyperindustrielle, 2004 ; 2. La catastrophe du sensible, 2005, Galilée. [Notice bibliographique du tome 2](https://www.decitre.fr/livres/de-la-misere-symbolique-9782718606347.html). Correction bibliographique uniquement ; aucune interprétation de ces livres n’entre dans le cours à partir de cette notice.

<a id="s48"></a>

**S48 — Jenny Odell, 2019.** How to Do Nothing: Resisting the Attention Economy. [Présentation éditeur de l’édition de poche, 2020](https://www.penguinrandomhouse.com/books/600671/how-to-do-nothing-by-jenny-odell/9781612198552/). Distinguer année de l’original et édition consultée. Lecture complémentaire, non mobilisée pour un résultat expérimental ou un conseil de « déconnexion productive ».

## 9. Consignes de transmission à l’IA qui fabriquera les slides

### Ce qui fait autorité

Ce document est le cahier éditorial proposé. Les notes locales servent de matériaux historiques ; leurs formulations corrigées ne doivent pas revenir lors de la génération. Les sources identifiées justifient les faits retenus. Une source inaccessible ultérieurement n’autorise pas à inventer une citation, une page ou un résultat.

Avant d’implémenter, relire les instructions locales et le format courant du moteur. Choisir explicitement le parcours complet ou le parcours court. Ne pas produire les deux comme une seule suite redondante. Les repères 01–33 et K1–K8 sont des identifiants de plan ; les futurs identifiants techniques seront établis lors de l’implémentation.

### Règles éditoriales

1. Donner une fonction claire à chaque slide : question, définition, mécanisme, jalon historique, cas, activité ou transition. Une unité dense peut être divisée en deux ; ne pas créer un slide par paragraphe de notes.
2. Garder la projection minimale. Faire porter la relation par le visuel ; conserver dates secondaires, hypothèses, sources et objections dans les notes présentateur.
3. Reprendre les notes de cours en phrases complètes. Garder les mentions « Précision » et « Vigilance historique » lorsqu’elles évitent une erreur de raisonnement ou une confusion de date.
4. Pour chaque sigle, donner d’abord la fonction en français. Distinguer graphiquement circulation monétaire, transmission d’information et succession d’événements.
5. Toute quantité illustrant une scène inventée doit être marquée « exemple fictif ». Les nombres de l’unité 19 doivent conserver année, devise, périmètre et source.
6. Associer toute citation exacte à une édition et une page vérifiées. À défaut, utiliser les paraphrases déjà attribuées dans ce plan. Ne pas placer entre guillemets une phrase de synthèse inventée pour Simon, Citton ou Zuboff.
7. Conserver les activités et leurs corrigés. Leur temps de travail est inclus dans les quatre heures ; ne pas le remplacer par une suite de définitions supplémentaires.
8. Garder les renvois aux autres cours : structure relationnelle, mécanismes de recommandation, cascades et polarisation disposent déjà de leurs développements. Ici, montrer leurs conditions économiques et les questions qu’elles soulèvent.
9. Ne pas ajouter de chiffre de marché, d’exemple de plateforme actuelle ou de détail de droit sans source datée et vérification supplémentaire. Les cas déjà documentés suffisent au cours.
10. Pour les supports, réutiliser la bannière existante. Les autres schémas sont conceptuels ou pédagogiques ; ne pas fabriquer de faux tableaux de bord, captures de services ou graphiques présentés comme empiriques.

### Vérification lors de la future implémentation

Contrôler d’abord la fidélité aux notes et aux distinctions, puis les commandes du moteur indiquées dans la documentation courante. Vérifier la projection et la vue présentateur, les notes et références, l’export public et l’export avec notes, ainsi que la lisibilité dans les deux thèmes et à différentes tailles d’écran. Cette vérification visuelle appartient à l’étape de création des slides : elle n’est pas prétendue accomplie par ce plan.

### Critère de validation pédagogique

Le cours est prêt si un étudiant peut expliquer un cas simple sans recourir aux raccourcis « tout est vendu », « l’algorithme veut nous rendre dépendants » ou « la donnée dit la vérité ». Il doit pouvoir nommer une opération, une incitation et une limite ; distinguer observation, prévision et effet ; puis indiquer ce qu’il faudrait changer ou mesurer pour soutenir une autre conclusion.
