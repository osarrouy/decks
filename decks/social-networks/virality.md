Oui — **avec une correction importante qui, à mon sens, rend même l’argument plus intéressant pour ton cours**. La littérature confirme assez fortement que l’image spontanée de la viralité — un contenu qui « prend » tout seul, puis se transmet horizontalement d’individu en individu comme un virus — décrit assez mal la plupart des phénomènes de très forte visibilité en ligne. En revanche, elle ne permet pas de dire rigoureusement que *la majorité* des contenus viraux ont été sciemment préparés par des institutions. Ce qu’elle établit beaucoup mieux, c’est que la visibilité est **structurellement inégalitaire** : audience préalable, position dans le réseau, capacité de coordination, relais organisés et sélection algorithmique pèsent énormément.

Autrement dit : le meilleur adversaire théorique n’est peut-être pas « la viralité est fausse », mais **« la viralité est le nom que l’on donne après coup à un processus dont on efface les conditions sociales de production »**.

# La viralité sur Internet : contagion spontanée ou production sociale de la visibilité ?

## 1. Le problème avec la métaphore du virus

Dans le langage courant, on dit qu’un contenu « devient viral » lorsqu’il semble se propager spontanément : A le partage avec B et C, qui le partagent à leur tour, puis leurs contacts font de même. La représentation implicite est celle d’une épidémie.

Or une partie importante de la recherche sur les cascades d’information montre que **cette représentation correspond assez rarement à la structure empirique de la diffusion**.

Une première étude décisive est celle de Sharad Goel, Duncan Watts et Daniel Goldstein, *The Structure of Online Diffusion Networks* (2012). À partir de données provenant de sept environnements numériques différents, les auteurs constatent que l’immense majorité des cascades de diffusion sont petites et s’interrompent très rapidement. Les longues chaînes de transmission de personne à personne sont extrêmement rares. Même dans les plus grandes cascades, une grande partie des adoptions se concentre à proximité de quelques individus particulièrement importants. 

Goel, Anderson, Hofman et Watts approfondissent cette idée dans *The Structural Virality of Online Diffusion* en étudiant environ **un milliard d'événements de diffusion sur Twitter**. Ils construisent précisément un indicateur permettant de distinguer deux formes idéales :

**broadcast**

`          ↗ B`
`A ───────→ C`
`          ↘ D`
`          ↘ E`

et **diffusion virale**

`A → B → C → D`
`    ↘ E → F`

Le résultat est essentiel : **la viralité structurelle est généralement faible et reste faible même lorsque la taille de la cascade augmente**. Beaucoup de contenus extrêmement populaires doivent donc leur succès non pas à une interminable contagion de proche en proche, mais à la taille de leurs plus grands épisodes de broadcast. 

C'est probablement le résultat le plus simple et le plus fort à donner à des étudiants :

> **Popularité massive ≠ nécessairement diffusion virale.**

Un contenu peut avoir été vu ou partagé des millions de fois sans avoir suivi une chaîne de transmission ressemblant à une épidémie.

Cette conclusion rejoint déjà les travaux pionniers de Leskovec, Adamic et Huberman sur le « viral marketing ». Sur quatre millions d'utilisateurs et seize millions de recommandations, ils constatent que les recommandations se propagent en moyenne assez peu loin : les grandes cascades existent, mais constituent l'exception plutôt que la règle. Cet article de 2007 est devenu l'un des textes classiques du domaine, avec plusieurs milliers de citations. 


## 2. Le premier mythe : « c'est le contenu qui devient viral »

Une deuxième famille de recherches demande pourquoi certains contenus sont davantage partagés que d'autres.

L'article canonique de Jonah Berger et Katherine Milkman, *What Makes Online Content Viral?* (2012), montre par exemple que certaines propriétés émotionnelles augmentent la probabilité de partage. Les émotions à forte activation physiologique — admiration, colère, anxiété notamment — favorisent davantage la transmission que les émotions à faible activation comme la tristesse. L'étude porte notamment sur les articles du *New York Times* et contrôle plusieurs variables, parmi lesquelles la place donnée au contenu par le média. 

Cette recherche est importante, mais elle peut facilement donner lieu à une interprétation trompeuse :

**contenu intéressant → partage → viralité.**

Or les travaux sur la structure des réseaux montrent qu'il faut ajouter une étape antérieure :

**être exposé au contenu → éventuellement le partager.**

La question de la viralité est donc d'abord une question de **distribution de l'exposition**.

Deux contenus également « partageables » n'ont presque aucune chance d'obtenir le même résultat si l'un est publié par un compte disposant de quinze abonnés et l'autre par un compte immédiatement exposé à plusieurs millions de personnes.

C'est ici que l'analyse sociologique devient décisive.


## 3. La visibilité est distribuée de manière extrêmement inégale

Dans *Who Says What to Whom on Twitter* (2011), Wu, Hofman, Mason et Watts montrent que la circulation de l'information sur Twitter est fortement concentrée. Ils distinguent notamment médias, organisations, célébrités et blogueurs : environ **la moitié des URL consommées dans leur échantillon provenaient de seulement 20 000 utilisateurs qu'ils qualifient d'« elite users »**. Les médias produisent beaucoup de l'information originale tandis que d'autres acteurs jouent davantage le rôle de relais. Les auteurs retrouvent ainsi une version numérique du modèle ancien du **two-step flow of communication** : l'information n'arrive pas uniformément à chacun ; elle transite par des acteurs occupant certaines positions stratégiques. 

Bakshy et ses collègues arrivent à une conclusion compatible dans *Everyone's an Influencer* : les plus grandes cascades ont davantage tendance à être initiées par des personnes ayant déjà une forte audience et ayant déjà produit de grandes cascades. Il reste très difficile de prédire quel utilisateur provoquera précisément un succès particulier, mais disposer préalablement de nombreux followers augmente fortement le potentiel de diffusion. 

On obtient donc une première correction majeure au récit ordinaire :

**la viralité ne supprime pas les hiérarchies ; elle travaille à l'intérieur de hiérarchies préexistantes.**

Le réseau n'est pas une surface plane sur laquelle chaque message disposerait d'une probabilité égale de se propager. Il ressemble davantage à un relief : quelques sommets disposent immédiatement d'un bassin de visibilité gigantesque.


## 4. Le succès produit aussi le succès

Une autre expérience classique permet d'aller plus loin : Salganik, Dodds et Watts, *Experimental Study of Inequality and Unpredictability in an Artificial Cultural Market* (Science, 2006).

Les chercheurs créent artificiellement un marché musical dans lequel plus de 14 000 participants écoutent et téléchargent des morceaux inconnus. Certains participants choisissent sans savoir ce que les autres ont choisi ; d'autres voient le nombre de téléchargements réalisés précédemment.

Le résultat est remarquable : **plus l'influence sociale est forte, plus les succès deviennent inégaux et plus leur résultat final devient imprévisible**. Une petite avance initiale peut être amplifiée simplement parce qu'elle devient visible, puis cette visibilité engendre de nouvelles sélections, qui produisent encore davantage de visibilité. 

C'est un mécanisme de **cumulative advantage**, très proche de l'effet Matthieu :

**visibilité → choix → davantage de visibilité → davantage de choix.**

Il ne faut donc même pas nécessairement supposer une gigantesque organisation centrale. Une légère asymétrie initiale peut être transformée par le système en une asymétrie gigantesque.

La formule importante devient :

**le succès d'un contenu n'est pas simplement la conséquence de ses qualités ; le fait d'avoir déjà du succès devient lui-même une cause de son succès.**


## 5. Le deuxième mythe : observer une cascade ne prouve pas une contagion

Le problème est encore plus profond méthodologiquement.

Quand plusieurs amis partagent le même contenu, on peut être tenté de conclure :

A influence B, qui influence C.

Mais Bakshy, Rosenn, Marlow et Adamic montrent dans une gigantesque expérimentation menée sur Facebook auprès de plus de 250 millions de personnes qu'il faut distinguer **influence interpersonnelle et exposition commune**. Deux personnes reliées peuvent partager le même contenu parce que l'une a influencé l'autre, mais aussi simplement parce qu'elles ont été exposées à une même source externe. 

L'expérience confirme néanmoins qu'une exposition provenant d'un ami **augmente causalement** la probabilité de partager. La transmission interpersonnelle existe donc bien.

C'est une nuance fondamentale : la littérature ne dit pas que la contagion sociale est imaginaire. Elle dit qu'on a tendance à **surestimer son importance lorsqu'on reconstruit une cascade uniquement à partir des traces observables**.

Un grand nombre de personnes peuvent sembler s'être mutuellement contaminées alors qu'elles ont en réalité rencontré simultanément le même objet parce qu'un média, une célébrité, une plateforme ou une autre source très visible l'a injecté dans leur environnement.


## 6. De la viralité spontanée à l'amplification organisée

Il existe ensuite des cas dans lesquels l'amplification est explicitement organisée.

L'étude de Shao et al. sur quatorze millions de messages contenant des liens vers des sources de faible crédibilité montre par exemple que les bots interviennent **de manière disproportionnée dans les premières phases de diffusion**, notamment en ciblant des utilisateurs disposant de fortes audiences. Dans leur échantillon, environ 6 % des comptes identifiés comme bots produisent 31 % des tweets renvoyant vers les sources de faible crédibilité étudiées. 

Les recherches sur l'**astroturfing** politique rendent le mécanisme encore plus visible. L'astroturfing consiste précisément à fabriquer l'apparence d'un mouvement populaire spontané. Keller et ses collègues ont ainsi étudié une campagne menée par les services de renseignement sud-coréens : de nombreux comptes apparemment indépendants étaient en réalité coordonnés centralement. Les traces temporelles et comportementales de cette coordination permettent de les distinguer des utilisateurs ordinaires. Point important cependant : les auteurs trouvent que cette campagne coordonnée a eu une influence plus limitée qu'on pourrait l'imaginer. **Organisation ne signifie donc pas automatiquement efficacité.** 

Des travaux comparatifs ultérieurs portant sur différentes campagnes politiques dans plusieurs pays retrouvent très fréquemment des pratiques coordonnées de co-publication et de co-retweet au sein des réseaux identifiés comme opérations d'astroturfing, alors que ces pratiques sont rares chez les utilisateurs ordinaires. 

Dans ces cas-là, ce qui apparaît extérieurement comme une foule peut donc être en partie une **architecture**.


## 7. Et maintenant les algorithmes : la plateforme devient elle-même un acteur de la diffusion

À cela s'ajoute aujourd'hui un troisième niveau : les systèmes de recommandation.

Le modèle épidémiologique supposait implicitement que les individus décidaient seuls ce qui circulait. Ce n'est plus une description acceptable des grandes plateformes contemporaines.

L'expérience à grande échelle de Huszár et al. sur Twitter montre que le fil algorithmique produit une amplification systématique de certains contenus politiques par rapport à un fil chronologique. Dans six des sept pays étudiés, les partis de la droite mainstream bénéficiaient davantage de cette amplification que ceux de la gauche mainstream ; aux États-Unis, les sources d'information classées à droite étaient également davantage amplifiées. 

Une expérience publiée dans *Nature* en 2026 sur X va encore plus loin : pendant sept semaines, les chercheurs ont assigné aléatoirement des utilisateurs américains soit au fil algorithmique, soit à un fil chronologique. Le fil algorithmique modifiait fortement la composition des contenus rencontrés, favorisant notamment certains contenus politiques et comptes militants, et l'expérience observe également des effets mesurables sur certaines opinions politiques. 

Cela oblige à modifier complètement le schéma de la « viralité ».

Ce n'est plus simplement :

**A → B → C → D**

mais quelque chose comme :

**source → plateforme → sélection algorithmique → exposition massive → réactions des utilisateurs → nouvelle sélection algorithmique → exposition supplémentaire.**

L'algorithme constitue donc une sorte de **moteur de récursivité de la visibilité**.


## 8. Peut-on alors dire que « la viralité est un mythe » ?

Oui, à condition de préciser ce que l'on veut dire.

La proposition forte suivante serait difficile à défendre empiriquement :

> « Presque tous les contenus viraux sont fabriqués à l'avance par des institutions. »

On dispose de nombreux cas démontrés de campagnes organisées, de marketing, de bots, d'astroturfing et de stratégies de seeding, mais la littérature ne permet pas d'extrapoler cela à l'ensemble des contenus très populaires.

Et il existe de vraies dynamiques horizontales. L'expérience de Bakshy et al. démontre causalement l'influence du partage entre amis.  La célèbre étude de Vosoughi, Roy et Aral sur les informations vraies et fausses montre même que, dans leur corpus Twitter, les informations fausses se propagent plus rapidement et plus profondément que les vraies, et que cette différence n'est pas principalement produite par les bots : elle provient largement des comportements humains. 

En revanche, une proposition légèrement différente est remarquablement bien étayée :

> **La visibilité massive sur Internet est rarement le produit d'une pure propagation horizontale spontanée. Elle émerge d'une combinaison d'inégalités initiales d'audience, de positions dans les réseaux, d'effets cumulatifs, de relais organisés, de propriétés du contenu, de sélection algorithmique et d'une part irréductible de contingence.**

C'est cette proposition que je conseillerais d'enseigner.


## 9. Une lecture en termes de capital économique et social

C'est ici qu'une lecture bourdieusienne devient particulièrement féconde, à condition de préciser qu'il s'agit d'une **interprétation sociologique des résultats**, et non du vocabulaire utilisé par la plupart de ces articles.

Les travaux empiriques mesurent surtout :

| Ressource empirique | Traduction sociologique possible |
|---|---|
| Nombre d'abonnés, centralité dans un réseau | Capital social |
| Audience déjà constituée | Capital symbolique et social |
| Capacité à mobiliser simultanément de nombreux comptes | Capital organisationnel |
| Personnel chargé de produire, tester et diffuser des contenus | Capital économique |
| Achat de publicité et de visibilité | Capital économique |
| Relations avec journalistes, influenceurs ou institutions | Capital social |
| Accès privilégié aux dispositifs de visibilité d'une plateforme | Position dans le champ |
| Visibilité déjà acquise | Capital symbolique cumulatif |

La littérature établit particulièrement solidement l'effet du **capital social et positionnel** : audience, centralité, réseaux de relais, prestige antérieur.

Elle établit moins directement l'effet du capital économique en tant que tel, parce que les études de diffusion disposent rarement des budgets et ressources financières des producteurs. Il serait donc abusif de dire que les recherches ont démontré une relation générale « argent → viralité ».

Mais le raisonnement sociologique est assez évident : le capital économique permet d'acheter du travail, de la publicité, des outils, des influenceurs, des campagnes coordonnées et surtout de multiplier les tentatives. Il permet donc d'acquérir les ressources positionnelles dont les études montrent qu'elles augmentent les probabilités d'obtenir une grande diffusion.

Le capital ne permet pas de commander la viralité. **Il permet d'acheter des billets de loterie en très grand nombre.**


## 10. Un modèle plus réaliste de la viralité

On pourrait finalement remplacer le modèle naïf :

**qualité du contenu → viralité**

par :

**ressources initiales × exposition × position réticulaire × organisation × amplification algorithmique × propension au partage × contingence → visibilité finale**

Ce modèle permet de comprendre une apparente contradiction.

Une grande diffusion reste **imprévisible** : même les acteurs puissants sont incapables de savoir exactement quel contenu fonctionnera. Bakshy et ses collègues montrent précisément combien il est difficile de prévoir quel utilisateur et quel message déclencheront une très grande cascade. 

Mais imprévisible ne signifie pas égalitaire.

Un casino est imprévisible à chaque partie tout en étant structurellement favorable à certains acteurs. De la même manière, on ne sait pas exactement quel contenu gagnera ; mais certains acteurs disposent de beaucoup plus d'occasions de jouer, d'un public initial plus grand et de meilleures positions de départ.


## 11. Les articles repères à connaître

Les compteurs de citations varient considérablement selon Google Scholar, OpenAlex, Crossref, Semantic Scholar, etc. Il vaut donc mieux parler d'un **canon du domaine** que produire un classement artificiellement précis. Plusieurs des articles ci-dessous comptent néanmoins entre environ un millier et plusieurs milliers de citations dans les index disponibles. 

1. **Salganik, M. J., Dodds, P. S. & Watts, D. J. (2006).** “Experimental Study of Inequality and Unpredictability in an Artificial Cultural Market.” *Science*. — Fondamental sur influence sociale, avantage cumulatif et imprévisibilité.

2. **Leskovec, J., Adamic, L. A. & Huberman, B. A. (2007).** “The Dynamics of Viral Marketing.” *ACM Transactions on the Web*. — Un des grands textes pionniers sur les cascades de recommandations.

3. **Cha, M., Haddadi, H., Benevenuto, F. & Gummadi, K. P. (2010).** “Measuring User Influence in Twitter: The Million Follower Fallacy.” *ICWSM*. — Important pour distinguer nombre de followers, retweets et véritable capacité d'influence. 

4. **Wu, S., Hofman, J., Mason, W. & Watts, D. J. (2011).** “Who Says What to Whom on Twitter.” *WWW*. — Concentration de la production et de la circulation de l'information autour d'utilisateurs d'élite.

5. **Bakshy, E., Hofman, J., Mason, W. & Watts, D. (2011).** “Everyone's an Influencer: Quantifying Influence on Twitter.” *WSDM*. — Audience préalable, grands diffuseurs et imprévisibilité.

6. **Goel, S., Watts, D. J. & Goldstein, D. G. (2012).** “The Structure of Online Diffusion Networks.” *EC*. — Les longues chaînes virales sont extrêmement rares.

7. **Bakshy, E., Rosenn, I., Marlow, C. & Adamic, L. (2012).** “The Role of Social Networks in Information Diffusion.” *WWW*. — Expérience causale majeure sur influence sociale et exposition.

8. **Berger, J. & Milkman, K. (2012).** “What Makes Online Content Viral?” *Journal of Marketing Research*. — Le grand article sur les propriétés intrinsèques augmentant la propension au partage.

9. **Goel, S., Anderson, A., Hofman, J. & Watts, D. J. (2015/2016).** “The Structural Virality of Online Diffusion.” *Management Science*. — Probablement le texte le plus directement pertinent pour déconstruire la métaphore de la viralité.

10. **Vosoughi, S., Roy, D. & Aral, S. (2018).** “The Spread of True and False News Online.” *Science*. — Important contre-exemple : des mécanismes humains horizontaux peuvent effectivement engendrer de grandes propagations.

11. **Shao, C. et al. (2018).** “The Spread of Low-Credibility Content by Social Bots.” *Nature Communications*. — Amplification précoce et organisée par les bots.

12. **Keller, F. B., Schoch, D., Stier, S. & Yang, J. (2020).** “Political Astroturfing on Twitter: How to Coordinate a Disinformation Campaign.” *Political Communication*. — Pour montrer empiriquement la fabrication d'une apparence de mobilisation spontanée.

13. **Huszár, F. et al. (2022).** “Algorithmic Amplification of Politics on Twitter.” *PNAS*. — Pour ajouter la plateforme elle-même au modèle de diffusion.

14. **Gauthier et al. (2026).** Étude expérimentale sur les effets du fil algorithmique de X, *Nature*. — État récent de la littérature sur l'allocation algorithmique de la visibilité. 


## Conclusion pour un cours de L1

L'image du virus est séduisante parce qu'elle raconte une société horizontale : n'importe qui pourrait produire quelque chose et, si ce quelque chose plaît suffisamment, la multitude se chargerait spontanément de le diffuser.

Les recherches racontent une histoire beaucoup moins romantique.

Les véritables chaînes virales longues sont rares. Les grands succès prennent souvent la forme de broadcasts. L'attention se concentre autour de quelques acteurs. Une audience préalable donne un avantage immense. La visibilité antérieure produit de la visibilité future. Des organisations peuvent fabriquer artificiellement les premiers signes d'un engouement. Et les algorithmes sélectionnent activement ce que les utilisateurs auront même la possibilité de choisir de partager.

La foule intervient bien : elle clique, relaie, transforme, détourne et quelquefois déclenche d'authentiques phénomènes émergents. Mais elle n'agit jamais dans le vide.

**Ce que nous appelons « viralité » est moins l'abolition des structures sociales que leur disparition derrière le spectacle de la propagation.**

Le contenu ne « contamine » pas mystérieusement Internet. Il est jeté dans un champ de forces où certains parlent depuis une estrade, certains disposent de mégaphones, certains peuvent mobiliser une armée de relais, tandis que d'autres murmurent depuis le fond de la salle.

Et lorsqu'un message finit par être entendu partout, nous avons tendance à appeler cela un virus plutôt qu'à regarder qui possédait le mégaphone.

Pour ton L1, je construirais assez volontiers le cours autour de l'opposition **« contagion vs amplification »** : elle permet de partir de l'intuition quotidienne des étudiants (« ça a buzzé »), puis de faire progressivement apparaître réseaux, two-step flow, avantage cumulatif, astroturfing et algorithmes. Ça s'articulerait aussi très bien avec tes passages sur *publish-then-filter*, l'audience imaginée et les foules : après avoir montré que tout le monde peut publier, on montre que **cela ne signifie absolument pas que tout le monde dispose de la même capacité à devenir visible**.
