# Cybernétique



## 2. Avant 1948 : un monde qui accélère

**Temps indicatif : 3 à 4 minutes.**

La cybernétique ne surgit pas dans un vide historique. Depuis le XIXe siècle, l’industrialisation transforme profondément les vitesses et les échelles de l’activité humaine. La vapeur accélère la production et les transports. Le chemin de fer déplace rapidement des personnes et des marchandises sur de longues distances. Le télégraphe permet à un message de voyager plus vite que son porteur. Les entreprises et les administrations coordonnent des ensembles toujours plus vastes.

Ces innovations ne résolvent pas seulement des problèmes : elles en produisent de nouveaux. Une locomotive peut aller plus vite qu’un cheval, mais il faut savoir où se trouvent les autres trains, organiser les croisements, transmettre les horaires et éviter les collisions. Une usine peut produire davantage, mais il faut coordonner l’approvisionnement, le travail, le stockage et la distribution. Des marchandises peuvent traverser un continent, mais il faut savoir où elles se trouvent et à qui elles sont destinées.

L’historien James R. Beniger décrira rétrospectivement cette transformation comme une **révolution du contrôle**. Selon lui, l’accélération des flux matériels provoque une crise de coordination à laquelle répond le développement de technologies de l’information, de procédures administratives et de dispositifs de suivi.

Cette thèse est utile pour situer la cybernétique dans une histoire longue. Elle montre que le problème du contrôle précède Wiener : les sociétés industrielles cherchent déjà à rendre des processus rapides observables, comparables et coordonnables.

Mais il faut éviter d’en faire une évolution naturelle et inévitable. Les dispositifs de contrôle répondent à des décisions économiques et politiques. Ils ne se développent pas pour le seul bénéfice abstrait de « la société ». Ils organisent le travail, répartissent les responsabilités, rendent certaines activités visibles et en laissent d’autres dans l’ombre. Ils rencontrent également des conflits et des résistances.

La cybernétique n’est donc pas l’aboutissement nécessaire de l’industrialisation. Elle formalise, au milieu du XXe siècle, certaines réponses à un problème déjà ancien :

> **Comment coordonner des processus devenus trop rapides et trop complexes pour être directement suivis par un individu ?**

La Seconde Guerre mondiale radicalise ce problème. Il ne s’agit plus seulement d’organiser une usine ou un réseau ferroviaire. Il faut détecter une cible qui se déplace rapidement, prévoir sa position future et agir avant que l’information reçue ne devienne périmée.

### Transition

> L’industrie avait posé un problème de coordination ; la guerre en fait un problème de prédiction sous contrainte de temps.

---

## 3. La scène antiaérienne : cible, mesure et erreur

**Temps indicatif : 6 à 7 minutes.**

Pendant la Seconde Guerre mondiale, Norbert Wiener et l’ingénieur Julian Bigelow travaillent sur des problèmes de prédiction liés au tir antiaérien.

Un canon ne peut pas simplement viser l’endroit où l’avion se trouve. Entre la détection de la cible, la transmission de la mesure, le calcul de la trajectoire, le déclenchement du tir et l’arrivée du projectile, l’avion s’est déplacé. Il faut viser une position qui n’est pas encore observée.

Le problème combine plusieurs difficultés :

- la cible se déplace rapidement ;
- le pilote peut en modifier la trajectoire de façon imprévisible ;
- la mesure comporte du bruit et des erreurs ;
- le calcul et l’action prennent du temps ;
- chaque nouvelle observation peut rendre l’estimation précédente obsolète.

Le dispositif doit donc accomplir plusieurs opérations :

1. mesurer une trajectoire partielle ;
2. distinguer autant que possible le mouvement du bruit ;
3. estimer une position future ;
4. comparer cette estimation aux nouvelles positions observées ;
5. modifier la prédiction suivante.

Une simplification décisive intervient ici. Pour le problème considéré, l’avion et le pilote peuvent être traités comme une **boîte noire**. Le dispositif ne cherche pas à connaître la psychologie du pilote, la totalité du fonctionnement de l’appareil ou les raisons de chaque changement de direction. Il sélectionne ce qui lui est utile : une position qui varie dans le temps.

Le pilote et l’avion sont ainsi provisoirement réduits à un point, ou à une série de positions successives. Cette abstraction produit un gain considérable : le comportement devient mathématiquement traitable. On peut comparer une trajectoire attendue à une trajectoire observée et calculer l’écart entre elles.

Mais l’abstraction a également un prix. Elle ne conserve pas l’objet tout entier. Elle rend certaines relations visibles en éliminant une grande partie de la réalité. Ce point sera important lorsque des modèles analogues seront appliqués aux organismes, aux personnes ou aux sociétés.

L’opération centrale peut être formulée simplement :

- une position est attendue ;
- une position est observée ;
- un écart apparaît entre les deux ;
- cet écart modifie la prédiction suivante.




### Question aux étudiants

> Qu’est-ce que le système doit connaître de l’avion pour corriger son estimation ? Qu’est-ce qu’il peut ignorer ?

L’objectif est de faire apparaître trois idées :

1. un modèle sélectionne seulement certaines propriétés ;
2. cette sélection permet d’agir sans connaissance totale ;
3. ce qui est exclu du modèle peut redevenir important lorsque l’on change de question.

### Transition

> L’innovation n’est pas de supprimer l’erreur, mais de faire de l’erreur une information utilisable.

---

## 4. La rétroaction : corriger plutôt que tout prévoir

**Temps indicatif : 6 minutes.**

La structure rencontrée dans le dispositif antiaérien peut être isolée sous une forme générale :

`objectif → action → effet → écart mesuré → nouvelle action`

L’effet d’une action devient l’une des causes de l’action suivante. C’est ce que l’on appelle une **boucle de rétroaction**, ou *feedback*.

Dans une représentation strictement linéaire de la causalité, `A` produit `B`, puis l’analyse s’arrête. Dans une boucle, `A` modifie `B`, puis le nouvel état de `B` revient modifier l’état suivant de `A`.

On parle alors de **causalité circulaire**. Cela ne signifie pas qu’une cause se produirait magiquement elle-même. La circularité se déploie dans le temps : les effets d’une action deviennent de nouvelles conditions pour les actions ultérieures.

### Le thermostat

Le thermostat fournit une version simple de cette structure.

- Une température souhaitée constitue la **consigne**.
- Un capteur mesure la température présente.
- Si la température est inférieure à la consigne, le chauffage s’active.
- Le chauffage modifie la température de la pièce.
- La nouvelle température est mesurée.
- Cette mesure détermine l’action suivante.

Le thermostat n’a pas besoin de prévoir exactement l’évolution de toutes les molécules d’air de la pièce. Il lui suffit d’observer une variable pertinente, de la comparer à une consigne et de corriger l’écart.

### Rétroaction négative

La **rétroaction négative** réduit un écart ou s’oppose à une variation. Si la pièce refroidit, le chauffage compense le refroidissement. Le mot « négative » ne signifie pas mauvaise ou nuisible. Il indique que la réponse agit dans le sens opposé à la perturbation.

Ce type de rétroaction peut favoriser la stabilité, l’équilibre ou l’homéostasie. Il ne produit toutefois jamais une immobilité absolue. Le système oscille autour d’une zone acceptable et continue de répondre aux perturbations.

### Rétroaction positive

La **rétroaction positive** amplifie une variation. Lorsqu’un microphone reprend le son d’un haut-parleur, le signal amplifié est capté puis amplifié de nouveau. La boucle peut produire un emballement : c’est l’effet Larsen.

Dans les phénomènes sociaux, la visibilité peut également alimenter la visibilité. Une rumeur très partagée devient plus visible ; cette visibilité provoque de nouveaux partages, qui l’amplifient encore. Le mot « positive » ne signifie donc pas bénéfique.

### L’action orientée vers un but


Nous avons introduit le concept de rétroaction avec l'exemple très simple du thermostat.

Les cybernéticiens, eux, identifient de telles boucles de rétroaction dans une multiplicité de phénomène : le ré-enforcement des réseaux neuronaux, les bulles financières, 

Ces boucles de rétroaction que nous venons de présenter avec l'exemple très simple du thermostat 

Le transcript propose l’exemple d’une personne qui saisit un verre. Elle n’a pas besoin de calculer consciemment chaque contraction musculaire. Son action peut être décrite comme une succession d’ajustements qui réduisent progressivement la distance entre la main et le verre.

Le comportement est orienté vers un but, mais chacun de ses détails n’a pas été programmé à l’avance. Il demeure adaptable aux variations : si le verre est déplacé, la trajectoire de la main peut être corrigée.

Cette description permet de rapprocher des situations très différentes :

- un thermostat qui maintient une température ;
- un pilote qui conserve un cap ;
- un organisme qui régule certaines constantes ;
- une personne qui ajuste un geste ;
- un GPS qui recalcule un itinéraire.

La formule à retenir est :

> **Piloter ne signifie pas tout prévoir ; piloter signifie pouvoir détecter et corriger les écarts.**

Cette formule est puissante, mais elle ne répond pas encore à toutes les questions. Une boucle de rétroaction ne nous dit pas qui a choisi l’objectif, si cet objectif est souhaitable, ni si l’acteur peut le modifier.

### Interaction

Classer trois exemples :

- thermostat : rétroaction principalement négative ;
- effet Larsen : rétroaction positive ;
- GPS : détection d’un écart et recalcul d’une action.

Pour chaque exemple, demander :

1. quel est l’objectif ?
2. quelle différence est mesurée ?
3. quelle action est modifiée ?

### Transition

> Pour qu’un écart puisse modifier l’action suivante, encore faut-il qu’il soit détecté, codé et transmis.

---

## 5. L’information : rendre une différence transmissible

**Temps indicatif : 7 à 8 minutes.**

La rétroaction répond à une première question : comment un système peut-il corriger son action à partir de ses effets ? Elle en soulève immédiatement une seconde : comment ces effets peuvent-ils entrer dans le système sous une forme exploitable ?

La pièce chauffée ne rentre pas matériellement dans le thermostat. L’avion ne rentre pas dans le système de visée. Le dispositif sélectionne une variable — température, position, vitesse — et la transforme en signal.

Cette opération implique déjà une réduction. Le réel n’est jamais mesuré dans sa totalité. Un capteur ne saisit que ce pour quoi il a été conçu. Ce qui n’est pas converti en signal ne pourra ni être comparé à la consigne ni déclencher une correction.

### Le problème de Shannon

En 1948, Claude Shannon publie « A Mathematical Theory of Communication ». Son problème vient de l’ingénierie des télécommunications : comment représenter des messages, mesurer la capacité d’un canal et transmettre ces messages malgré le bruit ?

Le schéma général distingue :

- une source qui produit des messages ;
- un dispositif qui les encode en signaux ;
- un canal dans lequel du bruit peut intervenir ;
- un dispositif de réception ;
- une destination.

La théorie de Shannon ne mesure pas directement le sens, la vérité ou l’importance sociale d’un message. Elle traite des possibilités parmi lesquelles un message peut être sélectionné et de leur probabilité.

Pour un événement `x`, l’information apportée par sa survenue peut être représentée ainsi :

[
I(x) = -\log\_2 p(x)
]

- `x` est l’événement observé ;
- `p(x)` est sa probabilité ;
- `I(x)` mesure l’information apportée par sa survenue ;
- le logarithme en base 2 permet d’exprimer cette quantité en **bits**.

Plus un événement est probable, moins sa survenue modifie notre incertitude. Plus il est improbable, plus sa survenue est informative relativement à l’ensemble de possibilités considéré.

Si une source répond toujours « oui », la réponse était déjà connue : elle apporte zéro bit. Si elle répond « oui » ou « non » avec la même probabilité, apprendre la réponse permet de distinguer deux possibilités équiprobables : cela correspond à un bit.

Il est utile de distinguer l’information apportée par un événement particulier de l’**entropie informationnelle** d’une source. L’entropie correspond à l’information moyenne attendue lorsque la source produit différents événements possibles :

[
H(X) = -\sum\_x p(x)\log\_2 p(x)
]

Cette distinction évite de transformer trop rapidement une formule relative à des messages possibles en mesure générale de « l’ordre du monde ».

### Information et signification

Un message peut être très improbable et donc apporter beaucoup d’information au sens mathématique, tout en n’ayant aucun sens pour son destinataire. Inversement, une phrase hautement prévisible peut posséder une signification importante dans une situation donnée.

Shannon met les dimensions sémantiques entre parenthèses parce qu’elles ne sont pas nécessaires au problème d’ingénierie qu’il formalise. Il ne démontre pas que le sens n’existe pas ou qu’il serait réductible à une quantité de bits.

Pour des étudiants en information-communication, la distinction est essentielle :

- l’information au sens de Shannon suppose des événements possibles, des probabilités, un codage, un canal et du bruit ;
- la signification suppose des codes culturels, des situations, des interprètes et des pratiques ;
- la valeur d’une information dépend d’un contexte et d’un usage.

Une plateforme peut savoir qu’une vidéo a été regardée pendant dix-huit secondes. Cette trace peut être très utile pour prédire ou orienter un comportement. Elle ne contient pas automatiquement le sens que la vidéo a eu pour la personne.

### Shannon et Wiener

Shannon et Wiener travaillent à la même époque sur des problèmes proches, mais leurs usages du mot « information » ne doivent pas être confondus.

Chez Shannon, l’information répond à un problème précisément délimité de représentation et de transmission des messages.

Chez Wiener, elle s’inscrit parfois dans une réflexion plus générale sur l’organisation, le vivant et l’entropie. Wiener présente les organismes comme des îlots capables de maintenir temporairement leur organisation dans un monde marqué par la dégradation et l’irréversibilité.

Cette extension est intellectuellement féconde, mais elle change de niveau. La capacité à quantifier des messages dans un canal ne démontre pas automatiquement que l’information constitue la substance de la vie ou la mesure de tout ordre biologique, social et cosmique.

Shannon lui-même mettra en garde, dans « The Bandwagon » en 1956, contre les extensions qui déplaceraient quelques mots — information, entropie, redondance — sans définir de nouvelles hypothèses ni fournir de vérifications empiriques.

La formule à retenir est donc :

> **Parce qu’un phénomène peut être codé comme information, il ne s’ensuit pas que ce phénomène ne soit rien d’autre que de l’information.**

### Question aux étudiants

> Une plateforme qui connaît la durée de visionnage d’une vidéo connaît-elle le sens que cette vidéo a eu pour la personne ?

Réponse attendue : elle dispose d’une trace exploitable relativement à certains objectifs, mais pas automatiquement de l’interprétation de l’expérience.

### Transition

> Dès lors que des phénomènes différents peuvent être décrits comme des transformations de signaux, ils deviennent formellement comparables.

---

# II. Un schème change d’échelle

## De la machine à l’animal et à la société

---

## 6. Décrire un comportement de l’extérieur

**Temps indicatif : 5 minutes.**

Dans « Behavior, Purpose and Teleology », publié en 1943, Arturo Rosenblueth, Norbert Wiener et Julian Bigelow proposent d’étudier certains objets à partir de leur comportement observable plutôt que de commencer par leur matière ou par tous leurs mécanismes internes.

Cette méthode permet de comparer des dispositifs très différents à partir de leurs entrées, de leurs sorties et des relations entre elles.

Un thermostat maintient une température. Un missile poursuit une cible. Un organisme régule certaines constantes. Une personne ajuste son geste pour atteindre un objet. Ces comportements peuvent être décrits comme orientés vers un état final sans supposer que tous les systèmes concernés possèdent une intention consciente.

### Une finalité sans intention

La cybernétique réintroduit ainsi la **finalité** dans la description scientifique sans affirmer qu’un but futur agit magiquement sur le présent.

Le but est matérialisé dans le système :

- par une consigne ;
- par une structure ;
- par une organisation physiologique ;
- par une règle de comparaison ;
- par une boucle qui transforme les écarts présents en corrections présentes.

Dire qu’un thermostat « cherche » à maintenir une température constitue une description fonctionnelle de son comportement. Cela ne signifie pas qu’il désire consciemment cette température.

Cette distinction deviendra importante pour l’intelligence artificielle. Dire qu’un système optimise une fonction ne signifie pas qu’il comprend ou souhaite l’objectif inscrit dans cette fonction.

### La boîte noire

W. Ross Ashby systématise en 1956 la méthode de la **boîte noire**. Face à un dispositif dont l’intérieur n’est pas directement accessible ou dont la complexité est trop grande, l’observateur agit sur certaines entrées et étudie les sorties obtenues.

Une boîte noire n’est pas nécessairement un objet mystérieux. C’est souvent un choix de niveau d’analyse. On décide provisoirement que la connaissance complète des mécanismes internes n’est pas nécessaire pour répondre à la question posée.

Le choix peut être légitime et puissant. Il permet de construire un modèle sans attendre une connaissance exhaustive. Mais il faut toujours demander ce que la mise en boîte noire élimine.

Traiter un pilote comme un point mobile peut être suffisant pour calculer une trajectoire. Traiter un étudiant comme un taux de réussite peut être suffisant pour construire un tableau de bord. Dans le second cas, l’opération risque toutefois de rendre invisibles l’expérience vécue, les inégalités, les apprentissages non quantifiés et la transformation intellectuelle.

### Comparer des relations plutôt que des substances

Le déplacement intellectuel important se situe ici :

> On ne compare plus seulement des objets par ce dont ils sont faits ; on compare des comportements par la forme de leurs relations.

Cette méthode rend comparables une régulation physiologique, un pilote automatique, un réseau de neurones ou une organisation. Mais une comparaison formelle ne supprime pas les différences de nature et d’histoire :

- un organisme possède un métabolisme et une histoire évolutive ;
- une machine a été construite selon un projet ;
- une institution possède un droit, des conflits et des rapports de pouvoir ;
- une personne interprète les situations dans lesquelles elle agit.

Le gain du modèle est réel. Son prix est la sélection.

### Transition

> Le même schème peut désormais circuler entre plusieurs disciplines ; les conférences Macy lui donnent un lieu de rencontre.

---

## 7. Les conférences Macy : construire une comparabilité

**Temps indicatif : 6 minutes.**

Les conférences Macy constituent l’une des principales scènes de formation de la cybernétique. Dix conférences généralement associées à cette série se tiennent à New York entre 1946 et 1953. Warren McCulloch en assure la présidence.

Leur premier titre est révélateur : *Feedback Mechanisms and Circular Causal Systems in Biological and Social Systems*. Il ne s’agit pas encore d’appliquer une cybernétique entièrement constituée. Les conférences commencent avant la publication, en 1948, de l’article de Shannon et du livre de Wiener.

Les concepts, les expériences et les disciplines se développent en parallèle. Les participants essaient de comprendre si des problèmes rencontrés dans des domaines très différents peuvent être comparés.

On y rencontre, avec des présences variables selon les sessions, des mathématiciens, des ingénieurs, des neurophysiologistes, des psychologues et des anthropologues, parmi lesquels Warren McCulloch, Walter Pitts, John von Neumann, Norbert Wiener, Arturo Rosenblueth, Margaret Mead, Gregory Bateson et Heinz von Foerster.

### Une conversation avant d’être une doctrine

Le mot « cybernétique » ne précède pas le collectif. En 1949, Heinz von Foerster, chargé de l’édition des actes avec Margaret Mead et Hans-Lukas Teuber, propose d’utiliser le terme rendu public par Wiener. À partir de la conférence suivante, le titre de la série intègre explicitement le mot.

Le nom vient donc stabiliser une conversation déjà engagée.

Les participants ne partagent ni le même objet, ni les mêmes méthodes, ni une doctrine parfaitement unifiée. Ils cherchent plutôt à déterminer si plusieurs notions peuvent permettre à leurs disciplines de se parler :

- rétroaction ;
- causalité circulaire ;
- information ;
- apprentissage ;
- comportement orienté vers un but ;
- régulation ;
- organisation.

Un ingénieur décrit un servomécanisme. Un physiologiste étudie la régulation d’un organisme. Un neurophysiologiste analyse l’activité cérébrale. Un anthropologue observe des interactions sociales. Le pari est que certaines relations formelles peuvent se retrouver dans ces situations très différentes.

### Une grammaire commune

Cette grammaire permet de poser les mêmes questions dans plusieurs domaines :

- quelles différences un système reçoit-il de son environnement ?
- comment transforme-t-il ces entrées en actions ?
- comment les effets de son action reviennent-ils modifier son comportement ?
- comment maintient-il une certaine stabilité malgré les perturbations ?
- comment apprend-il ou transforme-t-il son organisation ?

L’objet isolé compte moins que la structure des relations. On ne demande plus seulement « de quoi cette chose est-elle faite ? », mais également : « que reçoit-elle, que produit-elle et comment son comportement évolue-t-il ? »

### Commensurabilité formelle

Il serait toutefois faux d’affirmer que les conférences auraient établi l’identité du cerveau, de la machine et de la société.

La formulation la plus juste est :

> **Les conférences Macy construisent un espace dans lequel un langage commun peut circuler entre des disciplines hétérogènes.**

Ce langage produit une **commensurabilité formelle**. On peut dessiner des boucles analogues et comparer certains comportements. Mais la comparaison ne démontre pas une identité ontologique.

Un thermostat, un cerveau et une institution peuvent tous comporter des rétroactions. Cela ne fait pas d’eux trois exemplaires d’un même être.

### Question aux étudiants

> Si une entreprise et une fourmilière peuvent toutes deux être décrites comme des réseaux, qu’avons-nous réellement démontré ?

Réponse attendue : nous avons rendu certaines relations comparables ; nous n’avons pas établi que ces réalités fonctionnent ou existent de la même manière.

### Transition

> À Macy, le modèle voyage entre les disciplines ; chez Mead et Bateson, les relations sociales elles-mêmes deviennent l’objet.

---

## 8. Systèmes, relations et auto-organisation

**Temps indicatif : 7 minutes.**

Le mot **système** n’est ni inventé par Wiener ni réservé à la cybernétique. La théorie générale des systèmes de Ludwig von Bertalanffy se développe au même moment depuis la biologie. Pour ce cours, une définition opératoire suffit :

> **Un système est un ensemble d’éléments dont les relations produisent une dynamique que les éléments isolés ne suffisent pas à expliquer.**

Décrire un système suppose au moins trois décisions :

1. identifier des éléments à une certaine échelle ;
2. observer les relations par lesquelles leurs états s’affectent ;
3. tracer une frontière entre le système et son environnement.

Cette frontière n’est pas toujours donnée d’avance. Inclure ou exclure le milieu, l’observateur, une institution ou une histoire transforme l’explication.

### Reprendre le thermostat

Le thermostat isolé n’est pas toute la boucle. Selon la question posée, le système peut comprendre le capteur, le chauffage et la pièce. La température extérieure constitue alors une perturbation venue de l’environnement.

Les notions précédentes s’articulent ainsi :

- le **système** désigne l’ensemble relationnel choisi pour l’analyse ;
- l’**information** désigne les différences codées et transmises entre ses composantes ;
- la **rétroaction** désigne le retour des effets sur les actions ultérieures.

### Bateson : la relation comme unité d’analyse

Gregory Bateson avait étudié avant Macy la **schismogenèse**, c’est-à-dire le processus par lequel des individus ou des groupes accentuent mutuellement leurs différences.

Une démonstration de puissance appelle une démonstration plus forte. La réponse renforce la conduite initiale, qui provoque une nouvelle réponse. La boucle permet de penser une escalade sociale sans chercher une cause unique située dans l’un des participants.

Le groupe de Palo Alto appliquera ensuite ce raisonnement aux relations familiales. Plus une personne insiste, plus une autre se retire ; plus elle se retire, plus la première insiste. Chaque conduite est à la fois une réponse à ce qui précède et une condition de ce qui suit.

Cette analyse ne doit pas dissoudre les personnes dans le système. L’histoire, les asymétries, la violence et le pouvoir ne deviennent pas secondaires parce qu’un diagramme peut représenter les échanges.

Margaret Mead insistera plus tard sur une difficulté supplémentaire : l’observatrice appartient elle-même aux circuits de communication qu’elle décrit. La frontière entre le système et son observation doit donc devenir un problème explicite.

### Émergence

L’**émergence** désigne un changement d’échelle. Un ensemble peut posséder une propriété que ses éléments isolés ne possèdent pas.

Un conducteur immobile ne constitue pas un embouteillage. Pourtant, les ajustements de nombreux conducteurs peuvent produire un ralentissement collectif qu’aucun d’eux n’a décidé. Un neurone isolé ne pense pas ; un réseau de neurones participe à des activités de perception, de mémoire ou de raisonnement.

Mais dire qu’une propriété « émerge » ne suffit pas à l’expliquer. Il faut encore identifier :

- les interactions entre les éléments ;
- les boucles qui amplifient ou stabilisent certains états ;
- les contraintes du milieu ;
- les seuils ;
- les temporalités ;
- l’échelle à laquelle la propriété devient observable.

L’émergence nomme d’abord un problème de composition.

### Auto-organisation

L’**auto-organisation** pose une question plus dynamique : comment un ordre collectif se forme-t-il ou se maintient-il à partir d’interactions locales, sans qu’un centre attribue à chaque élément sa place définitive ?

Chaque composante peut disposer d’une information limitée. Les ajustements répétés produisent néanmoins une configuration collective : stabilisation, différenciation, apprentissage ou réorganisation.

Cette notion semble s’opposer au commandement central. Elle promet de coordonner sans hiérarchie omnisciente et de préserver l’initiative locale.

Il faut cependant formuler immédiatement sa limite :

> **Sans centre ne signifie pas sans règles, sans infrastructure, sans environnement ni sans histoire.**

Un système auto-organisé dépend toujours :

- de règles d’interaction ;
- de canaux de communication ;
- de ressources ;
- de critères de stabilité ;
- d’une manière de distinguer ce qui compte comme réussite ou comme erreur.

Celui qui fixe ce cadre peut exercer un pouvoir considérable sans donner d’ordres détaillés.

L’auto-organisation peut donc distribuer réellement l’initiative. Elle peut aussi déplacer le contrôle vers les conditions dans lesquelles les initiatives locales doivent s’exercer.

### Exemple pédagogique

Un travail de groupe peut s’organiser sans chef désigné. Cette absence de hiérarchie visible ne supprime pas la consigne, l’échéance, la plateforme, le mode d’évaluation ni les inégalités de parole.

La question n’est pas seulement : « Le groupe a-t-il un chef ? » Elle est : « Qui a défini le cadre dans lequel son auto-organisation doit avoir lieu ? »

### Transition

> Plus le modèle devient général, plus il faut distinguer ce qu’il décrit, ce qu’il compare et ce qu’il prétend expliquer.

---

## 9. Du modèle au mythe : trois niveaux à ne pas confondre

**Temps indicatif : 5 minutes.**

La cybernétique doit une partie de sa force à la simplicité de ses diagrammes. Une même boucle peut représenter un thermostat, un geste, une régulation physiologique, un apprentissage ou une interaction sociale.

Cette puissance de circulation crée aussi une tentation : parce qu’un modèle peut être employé dans plusieurs domaines, on lui attribue la capacité d’expliquer la totalité de ces domaines.

Il faut donc distinguer trois niveaux.

### Niveau 1 — Une opération déterminée

Un dispositif concret mesure une variable et agit relativement à une consigne.

Exemple : un thermostat mesure une température et commande un chauffage.

Les éléments de la boucle peuvent être précisément identifiés : capteur, valeur mesurée, consigne, action et temporalité.

### Niveau 2 — Une analogie formelle

Des réalités différentes comportent des relations comparables.

Exemple : un organisme et un thermostat peuvent tous deux être décrits comme régulant une variable autour d’une zone de stabilité.

L’analogie peut être féconde, mais elle exige une enquête supplémentaire. Il faut vérifier ce qu’elle conserve, ce qu’elle élimine et si les variables possèdent réellement un rôle comparable.

### Niveau 3 — Une thèse générale sur le monde

La vie, l’esprit, la société ou l’histoire seraient essentiellement des systèmes d’information et de contrôle.

À ce niveau, le modèle peut devenir une ontologie ou un mythe : il ne représente plus seulement certaines relations, il prétend dire ce que les êtres sont réellement et expliquer la totalité de leur histoire.

### La cosmologie de l’information

Wiener développe parfois un récit très large dans lequel les organismes maintiennent leur organisation malgré la tendance à la dégradation et à l’augmentation de l’entropie.

La thermodynamique décrit notamment l’irréversibilité de certains processus et la dissipation de l’énergie disponible. Wiener mobilise ce vocabulaire pour penser le vivant comme un îlot temporaire d’organisation : un organisme maintient des différences, échange de la matière et de l’énergie, traite des signaux et agit pour persévérer.

Cette image permet de relier information, organisation et survie. Elle constitue une hypothèse intellectuelle ambitieuse. Mais elle ne doit pas être confondue avec la théorie mathématique de Shannon. L’entropie informationnelle d’une source de messages et l’entropie thermodynamique ne peuvent pas être identifiées simplement parce que les deux grandeurs utilisent une forme mathématique apparentée.

La cybernétique devient mythique lorsqu’un schème précis est transformé en récit de l’origine de tout ordre : la vie, l’esprit, la société et la civilisation seraient autant de manifestations d’une même lutte informationnelle contre le désordre.

Le mot « mythe » ne signifie pas ici simple mensonge. Un mythe organise une manière de voir, relie des phénomènes dispersés et donne un sens général au présent. Son risque est de naturaliser les choix qu’il incorpore.

### Une règle de méthode

Face à toute affirmation cybernétique, poser trois questions :

1. Le dispositif décrit existe-t-il concrètement ?
2. S’agit-il d’une analogie formelle entre plusieurs domaines ?
3. L’analogie est-elle devenue une affirmation sur la nature de toute réalité ?

Cette distinction permettra ensuite de lire Tiqqun. Son hypothèse critique se situe volontairement au troisième niveau : elle décrit la cybernétique comme une logique générale des sociétés contemporaines. Elle peut révéler certaines structures sans constituer pour autant une histoire exhaustive de chaque usage de la rétroaction.

### Transition

> Tant que l’objectif est une température ou une trajectoire, la consigne semble technique. Lorsqu’il s’agit d’une société, l’objectif devient une norme politique.

---

# III. Le contrôle change de forme

## Du commandement à l’architecture des boucles

---

## 10. Du pilotage au gouvernement

**Temps indicatif : 5 minutes.**

Nous pouvons maintenant revenir à l’image du timonier.

Au début du cours, elle désignait une opération technique : maintenir une trajectoire malgré les perturbations. Le timonier observe, compare et corrige.

Appliquée à une organisation ou à une société, la même structure soulève des questions supplémentaires :

- Qui détermine la destination ?
- Qui choisit les variables observées ?
- Qui construit les instruments de mesure ?
- Qui reçoit les informations ?
- Qui intervient lorsqu’un écart est détecté ?
- Qui peut modifier ou refuser l’objectif ?

Il faut éviter de projeter cette dimension politique rétroactivement sur chaque usage technique du mot « contrôle ». Chez Wiener, « control » et « command » ne signifient pas initialement gouvernement des populations. Ils désignent le fonctionnement de dispositifs capables de suivre une consigne ou de conserver une stabilité.

Mais dès que les notions sont appliquées aux sociétés, aux entreprises ou aux institutions, la boucle devient politique. Une température souhaitée peut être une valeur technique relativement simple. Un taux de productivité, de réussite scolaire, de chômage ou de conformité implique une définition normative de ce qui doit être poursuivi.

### La promesse démocratique

Wiener développe une lecture progressiste de la communication. Il oppose la circulation des informations à la concentration des secrets et des moyens de décision.

Un gouvernement strictement descendant émet des ordres sans recevoir de retour réel. Un régime doté de boucles de rétroaction — élections, débats, informations remontant de la population — peut ajuster ses décisions et demeurer plus attentif aux gouvernés.

Dans cette lecture, la cybernétique peut soutenir :

- la coordination sans centre omniscient ;
- l’apprentissage à partir des erreurs ;
- la circulation des informations ;
- la préservation d’une autonomie locale ;
- l’adaptation à l’imprévu.

### Le risque du cadre

La même structure possède un envers. Un centre peut laisser les acteurs choisir leurs moyens tout en conservant la maîtrise :

- des objectifs ;
- des indicateurs ;
- des seuils acceptables ;
- des infrastructures ;
- des données de retour.

Le contrôle ne passe alors plus principalement par l’ordre détaillé. Il passe par la définition du cadre dans lequel les acteurs doivent s’ajuster.

Une université peut laisser chaque composante organiser librement son enseignement tout en l’évaluant sur quelques indicateurs. L’autonomie des moyens est réelle, mais le centre continue de déterminer ce qui compte comme performance.

L’acteur peut finir par intérioriser l’indicateur, surveiller ses propres écarts et corriger lui-même sa conduite. La surveillance n’a plus besoin de prendre la forme visible d’un ordre permanent.

La formule centrale est :

> **Le contrôle peut se déplacer du commandement vers l’architecture du cadre.**

La cybernétique n’a donc pas une orientation politique unique. Une boucle peut soutenir une autonomie réelle ou une normalisation très forte. Tout dépend de la manière dont sont distribués les objectifs, les informations, les capacités de décision et la possibilité de contester les règles.

### Transition

> Cette indétermination apparaît lorsque la même grammaire sert à penser aussi bien une économie socialiste que le marché.

---

## 11. Cybersyn et Hayek : deux politiques de l’information distribuée

**Temps indicatif : 8 à 10 minutes.**

Cybersyn et Hayek permettent de comparer deux projets politiques très différents qui partagent pourtant une même méfiance à l’égard d’un centre supposé omniscient.

Il ne s’agit pas de soutenir qu’ils seraient deux applications équivalentes d’une doctrine cybernétique. La comparaison vise à identifier une difficulté commune : comment coordonner une société lorsque les connaissances pertinentes sont dispersées entre de nombreux acteurs ?

### Cybersyn : planifier sans tout centraliser

À partir de 1971, sous le gouvernement de Salvador Allende, le projet Cybersyn cherche à coordonner les entreprises chiliennes nationalisées.

L’ingénieur Fernando Flores invite le cybernéticien britannique Stafford Beer à adapter ses travaux sur la régulation des organisations, notamment le *Viable System Model*. Le projet est développé par une équipe chilienne et internationale ; il ne faut donc pas l’attribuer à Beer seul.

Un réseau de télex permet aux unités de production de faire remonter rapidement certaines données : niveaux de production, approvisionnements, problèmes significatifs ou absentéisme. Des outils statistiques doivent détecter des variations anormales et signaler les situations qui nécessitent une intervention.

Le projet ne cherche pas seulement à concentrer toutes les décisions dans une salle de commandement. Le modèle de Beer distingue plusieurs niveaux de régulation. Chaque unité doit conserver une autonomie pour traiter les problèmes locaux ; les niveaux supérieurs interviennent lorsque la difficulté dépasse cette capacité locale.

Cybersyn peut ainsi être présenté comme une tentative de planification sans microgestion centrale. L’information produite par l’activité doit contribuer à ajuster le plan au lieu d’appliquer un programme entièrement défini à l’avance.

### La tension technocratique

Cette lecture émancipatrice doit être mise à l’épreuve de la réalisation concrète.

Quelles données les usines doivent-elles fournir ? Qui définit les indicateurs ? Qui possède les modèles statistiques ? Quelle prise les travailleurs et les syndicats ont-ils sur les objectifs, les données et la salle d’opérations ?

Le transcript d’Ivan Bouchardeau insiste sur le risque technocratique : les travailleurs peuvent devenir les fournisseurs d’un système d’information qu’ils ne maîtrisent pas. La remontée des données peut court-circuiter les formes existantes de représentation et de délibération.

Cette critique doit être présentée comme une controverse historique et politique, non comme un verdict contenu dans le réseau de télex lui-même. Les travaux d’Eden Medina montrent précisément la tension entre coordination gouvernementale, autonomie des unités et aspirations à la participation des travailleurs.

Cybersyn demeure un cas fécond parce qu’il refuse deux solutions simples :

- le marché comme unique mécanisme de coordination ;
- la planification bureaucratique entièrement centralisée.

Son intérêt réside autant dans cette ambition que dans les contradictions de sa mise en œuvre.

### Hayek : le marché comme système de communication

Friedrich Hayek aborde le problème de la connaissance dispersée depuis une perspective opposée.

Dans « The Use of Knowledge in Society », publié en 1945, il soutient qu’aucun planificateur ne peut posséder toutes les connaissances locales nécessaires à la coordination d’une économie. Une grande partie de ces connaissances est située, pratique, temporaire et distribuée entre des acteurs différents.

Le système des prix joue alors, pour Hayek, un rôle informationnel. Une variation de prix condense et transmet certains effets d’une modification de l’offre ou de la demande sans que chaque acteur connaisse la totalité des causes.

Il faut être précis historiquement : cet argument central précède le livre de Wiener de 1948. Hayek n’est donc pas simplement un produit de la cybernétique. Il mobilisera cependant ensuite des notions compatibles avec elle : information distribuée, complexité, adaptation, impossibilité d’une connaissance centrale exhaustive et ordre spontané.

Le marché est présenté comme un mécanisme de coordination qui n’a pas besoin de représenter le système dans tous ses détails. Les acteurs locaux deviennent en partie des boîtes noires : il n’est pas nécessaire de connaître leurs motivations internes si leurs actions répondent aux signaux des prix.

### Le problème de l’ordre spontané

Hayek oppose l’ordre spontané du marché à la planification. Mais cet ordre n’apparaît pas en dehors de toute institution.

Un marché suppose notamment :

- des droits de propriété ;
- des règles contractuelles ;
- des infrastructures ;
- une définition de ce qui peut être échangé ;
- des institutions capables de faire appliquer les règles ;
- une distribution préalable des ressources et des capacités d’action.

Le centre peut donc sembler disparaître au niveau des décisions détaillées tout en demeurant présent au niveau de l’architecture.

La question devient : qui définit les conditions dans lesquelles l’ordre spontané doit apparaître, et à partir de quels critères déclare-t-on qu’il fonctionne correctement ?

### Comparaison

Cybersyn et Hayek partagent plusieurs intuitions :

- aucun centre ne possède toute l’information pertinente ;
- les connaissances locales doivent jouer un rôle ;
- la coordination doit répondre aux variations ;
- un ordre collectif peut apparaître sans prescription détaillée de chaque action.

Ils diffèrent profondément sur :

- le statut du marché ;
- la propriété ;
- la planification ;
- la participation politique ;
- la maîtrise des infrastructures ;
- la possibilité de délibérer collectivement sur les objectifs.

Cette comparaison montre que la grammaire cybernétique ne détermine pas à elle seule un programme politique.

La question n’est pas simplement : « Faut-il centraliser ou décentraliser ? » Elle est :

> **Qui institue les conditions dans lesquelles la coordination distribuée doit avoir lieu ?**

### Question aux étudiants

Comparer Cybersyn et le marché décrit par Hayek à l’aide de la grille du cours :

1. Quel est l’objectif du système ?
2. Quelles informations circulent ?
3. Qui possède les infrastructures ?
4. Où se prennent les décisions ?
5. Qui peut contester les règles ?

### Transition

> Le contrôle ne disparaît pas nécessairement avec le commandement central ; il peut se déplacer vers la conception de l’environnement.

---

## 12. Tiqqun : contrôler en faisant circuler

**Temps indicatif : 6 à 7 minutes.**

Tiqqun publie *L’Hypothèse cybernétique* en 2001. Le texte ne propose pas une histoire académique et équilibrée de la cybernétique. Il construit une hypothèse critique : la cybernétique serait devenue une forme générale de gouvernement des sociétés contemporaines.

### Du commandement à la boucle

Dans une représentation classique de la souveraineté, le pouvoir est imaginé comme un centre qui ordonne, interdit et sanctionne.

Tiqqun attire l’attention sur une autre forme de pouvoir :

1. des dispositifs captent continuellement des traces ;
2. les traces rendent les comportements comparables à une norme ou à un objectif ;
3. les écarts déclenchent des ajustements ;
4. les ajustements modifient les conduites ;
5. les nouvelles conduites sont mesurées à leur tour.

Le contrôle passe alors par la circulation de l’information. Il ne cherche pas nécessairement à immobiliser les individus. Il cherche à rendre les flux observables, prévisibles et corrigibles.

Un tableau de bord ne donne pas toujours un ordre direct. Il sélectionne des variables, établit des comparaisons et attire l’attention sur certains écarts.

Un système de recommandation ne commande pas explicitement de regarder une vidéo. Il organise sa visibilité, mesure la réaction, puis modifie les recommandations suivantes.

Un prix dynamique n’interdit pas un comportement. Il transforme l’environnement économique dans lequel la décision doit être prise.

### Le pouvoir environnemental

Cette lecture permet de comprendre une forme de gouvernement qui agit moins sur chaque geste que sur les conditions dans lesquelles les gestes ont lieu.

Le système peut laisser l’individu apparemment libre de choisir, tout en :

- hiérarchisant les options ;
- modulant leur visibilité ;
- ajustant leurs coûts ;
- produisant des notifications ;
- mesurant les réactions ;
- personnalisant l’environnement suivant.

Le contrôle se rapproche alors de ce que le transcript décrit comme une action sur l’environnement des boîtes noires. Il n’est pas nécessaire de connaître entièrement l’intériorité d’une personne. Il suffit parfois de mesurer ses entrées et ses sorties, puis de modifier les conditions auxquelles elle réagit.

Cette forme peut devenir d’autant plus efficace qu’elle se fait oublier. L’interface paraît pratique, fluide et immédiatement disponible. L’utilisateur agit à travers elle sans devoir penser aux classements, aux catégories et aux objectifs incorporés dans son fonctionnement.

### Ce que la critique révèle

Tiqqun oblige à poser des questions politiques à des dispositifs apparemment neutres :

- Quelle norme se cache dans la boucle ?
- Qu’est-ce qui devient mesurable ?
- Que devient ce qui ne peut pas être quantifié ?
- Qui bénéficie de la circulation des données ?
- Qui peut interrompre ou modifier le système ?

La critique révèle que mesurer, comparer et faire circuler ne sont pas des opérations politiquement innocentes.

### Ce que la critique force

Le texte tend cependant à transformer une famille de concepts et de dispositifs en logique historique presque totale. Toute communication risque d’y devenir captation ; toute auto-organisation, une ruse du contrôle ; toute circulation, une opération de gouvernement.

Cette généralisation est contestable.

Les cybernéticiens ne forment pas un bloc homogène. Wiener critique la concentration du pouvoir, l’automatisation irresponsable et le secret. Cybersyn cherche au moins en partie à distribuer l’information et les capacités de décision. Des boucles de rétroaction peuvent rendre une institution plus sensible aux personnes qu’elle affecte.

Il faut donc utiliser Tiqqun comme une **lentille critique**, non comme une histoire exhaustive :

- la lentille révèle que la norme peut être incorporée dans le dispositif ;
- elle oblige à chercher le pouvoir dans l’infrastructure et les indicateurs ;
- elle ne démontre pas que tout réseau ou toute régulation constitue nécessairement une domination.

### La grille finale

Face à un dispositif contemporain, poser cinq questions :

1. Quel est l’objectif ?
2. Quelle variable représente le comportement ?
3. Où circule l’information ?
4. Quelle correction ou modulation est déclenchée ?
5. Qui peut contester ou transformer la boucle ?

### Question aux étudiants

> Dans un système de recommandation, où se trouve le contrôle : dans un ordre explicite, dans l’algorithme, dans l’interface, dans la métrique d’engagement ou dans leur combinaison ?

La bonne réponse n’est pas de choisir nécessairement un seul emplacement. Le contrôle est souvent distribué dans l’ensemble de l’architecture : collecte des traces, objectif d’optimisation, classement, interface et modèle économique.

### Transition

> La cybernétique ne lègue pas seulement à l’informatique des boucles de contrôle. Elle légitime également une manière de rendre l’esprit et le cerveau formalisables.

---

## 13. Conclusion : ce que la cybernétique lègue à l’intelligence artificielle

**Temps indicatif : 5 minutes.**

La cybernétique ne s’est pas constituée comme une discipline durablement unifiée. Son vocabulaire, ses diagrammes et ses opérations ont néanmoins circulé dans l’informatique, les sciences cognitives, la biologie, les sciences sociales, le management et les théories du gouvernement.

Quatre idées doivent être retenues :

1. **Réguler**, c’est corriger une action à partir de ses effets.
2. **Informer**, c’est rendre certaines différences détectables et transmissibles.
3. **Modéliser**, c’est sélectionner des relations et en éliminer d’autres.
4. **Gouverner par une boucle**, c’est aussi décider de l’objectif, de la mesure et des possibilités de contestation.

### De l’esprit au cerveau

Une partie du programme cybernétique cherche à produire une description scientifique de l’esprit. Pour rendre l’esprit observable, elle le rapporte aux processus matériels du cerveau.

Ce geste possède une portée critique : il refuse d’ajouter à l’activité corporelle une entité spirituelle inexplicable. Les perceptions, les raisonnements et les comportements doivent être réalisés par des processus physiques.

Mais ce déplacement ouvre une nouvelle question : à quel niveau faut-il décrire ces processus ?

### Du cerveau aux états logiques

Une stratégie consiste à chercher des unités élémentaires : des événements physiques suffisamment simples pour recevoir une représentation logique.

L’état binaire possède ici un avantage considérable. Il peut être :

- représenté symboliquement par `0` ou `1` ;
- matérialisé par l’absence ou la présence d’un signal électrique ;
- associé à l’inactivité ou à l’activation idéalisée d’un neurone ;
- combiné selon des opérations logiques.

Le bit de la théorie de l’information ne constitue pas à lui seul une unité de pensée. Mais la possibilité de faire correspondre des distinctions symboliques et des états matériels contribue à rendre plausible un programme de formalisation du cerveau.

### McCulloch et Pitts

Warren McCulloch et Walter Pitts publient en 1943 « A Logical Calculus of the Ideas Immanent in Nervous Activity ».

La date est essentielle : leur article précède le livre de Wiener et la première conférence Macy. Il ne constitue donc pas une application d’une cybernétique déjà achevée. Il participe à l’effervescence intellectuelle qui permettra ensuite de rapprocher cerveau, logique et machine.

McCulloch et Pitts sélectionnent quelques propriétés du neurone biologique :

- des entrées excitatrices ou inhibitrices ;
- leur combinaison ;
- un seuil ;
- une sortie décrite comme active ou inactive ;
- des connexions entre plusieurs éléments.

La cellule vivante devient un opérateur logique idéal.

Cette réduction produit un gain : des réseaux peuvent être décrits et étudiés mathématiquement. Certaines organisations réalisent des opérations comparables à **ET**, **OU** ou **NON**.

Elle produit aussi une perte : la chimie, les variations continues, la diversité des cellules, la plasticité et une grande partie de la temporalité du vivant disparaissent du modèle.

Il ne faut donc pas raconter que le neurone artificiel serait une copie miniature du neurone biologique. Il s’agit d’une abstraction construite pour répondre à une question précise : quelles opérations logiques un réseau d’éléments simples peut-il réaliser ?

### La double réduction

La transition vers l’intelligence artificielle peut être résumée par deux réductions successives :

1. **l’esprit est rapporté au cerveau** : les activités mentales doivent être réalisées matériellement ;
2. **l’activité cérébrale est rapportée à des relations formelles** : certains événements neuronaux sont représentés comme des états binaires combinables.

Le passage de « certaines opérations cérébrales sont formalisables » à « toute pensée est intégralement réductible à du calcul » n’est cependant pas automatique. Le premier énoncé peut être démontré dans le cadre d’un modèle ; le second constitue une thèse beaucoup plus générale.

Nous retrouvons donc les trois niveaux distingués plus tôt :

- une opération déterminée ;
- une analogie ou une formalisation ;
- une thèse totale sur la nature de l’esprit.

### Question d’ouverture vers la séquence suivante

> **Que faut-il retirer d’un neurone vivant pour en faire un opérateur logique — et que rend possible ce retrait ?**

Cette question permet de passer au neurone biologique, puis au modèle de McCulloch et Pitts et au perceptron de Rosenblatt sans présenter la cybernétique comme la cause unique et linéaire de l’intelligence artificielle.

---

# Synthèse générale

La cybernétique ne promet pas d’abolir l’incertitude. Elle propose une manière d’agir dans un monde que l’on ne connaît pas entièrement : observer certaines différences, les convertir en signaux, comparer les effets à un objectif et corriger l’action suivante.

Cette opération transforme la conception du contrôle. Le contrôle n’est plus nécessairement la possession d’un savoir total ou l’émission d’un ordre détaillé. Il devient la capacité à entretenir une boucle de mesure et de correction.

Ce déplacement possède une double portée.

Il peut soutenir l’autonomie : une unité locale reçoit les informations nécessaires, apprend de ses erreurs et adapte son comportement sans attendre les ordres d’un centre.

Il peut aussi produire une forme plus diffuse de normalisation : les objectifs, les indicateurs et les infrastructures orientent continuellement les conduites sans commander explicitement chacun de leurs détails.

La question politique décisive n’est donc pas seulement « qui commande ? ». Elle est :

> **Qui définit le système, ses frontières, ses objectifs, ses mesures et les conditions de sa transformation ?**

---

# Repères chronologiques

- **XIXe siècle** — industrialisation, développement des transports, des télécommunications, de l’administration et des techniques de régulation ; usage du terme « cybernétique » par Ampère dans un autre contexte.
- **1943** — Rosenblueth, Wiener et Bigelow publient « Behavior, Purpose and Teleology » ; McCulloch et Pitts publient leur modèle logique du neurone.
- **1945** — Hayek publie « The Use of Knowledge in Society ».
- **1946–1953** — conférences Macy sur les mécanismes de rétroaction et la causalité circulaire dans les systèmes biologiques et sociaux.
- **1947** — Ashby publie « Principles of the Self-Organizing Dynamic System ».
- **1948** — Shannon publie « A Mathematical Theory of Communication » ; Wiener publie *Cybernetics*.
- **1950** — Wiener publie *The Human Use of Human Beings*.
- **1956** — Ashby publie *An Introduction to Cybernetics* ; Shannon publie « The Bandwagon ».
- **Fin des années 1950** — Rosenblatt développe le perceptron et sa règle d’apprentissage.
- **1960** — von Foerster publie « On Self-Organizing Systems and Their Environments ».
- **1971–1973** — développement du projet Cybersyn au Chili.
- **2001** — publication de *L’Hypothèse cybernétique* de Tiqqun.

---

# Bibliographie indicative

## Cybernétique, rétroaction et systèmes

- W. Ross Ashby, *An Introduction to Cybernetics*, Chapman & Hall / John Wiley, 1956.
- Ludwig von Bertalanffy, « An Outline of General System Theory », *The British Journal for the Philosophy of Science*, 1(2), 1950, p. 134–165.
- Heinz von Foerster, « On Self-Organizing Systems and Their Environments », 1960.
- Arturo Rosenblueth, Norbert Wiener et Julian Bigelow, « Behavior, Purpose and Teleology », *Philosophy of Science*, 10(1), 1943, p. 18–24.
- Norbert Wiener, *Cybernetics, or Control and Communication in the Animal and the Machine*, 1948.
- Norbert Wiener, *The Human Use of Human Beings: Cybernetics and Society*, 1950.

## Information

- Claude E. Shannon, « A Mathematical Theory of Communication », *Bell System Technical Journal*, 27, 1948, p. 379–423 et 623–656.
- Claude E. Shannon, « The Bandwagon », *IRE Transactions on Information Theory*, 2(1), 1956, p. 3.

## Conférences Macy et sciences sociales

- Gregory Bateson, *Naven*, 1936 ; 2e édition augmentée, Stanford University Press, 1958.
- Margaret Mead, « The Cybernetics of Cybernetics », dans Heinz von Foerster et al. (dir.), *Purposive Systems*, Spartan Books, 1968.
- Claus Pias (dir.), *Cybernetics: The Macy Conferences 1946–1953. The Complete Transactions*, Diaphanes / University of Chicago Press.

## Contrôle, économie et politique

- James R. Beniger, *The Control Revolution: Technological and Economic Origins of the Information Society*, Harvard University Press, 1986.
- Friedrich A. Hayek, « The Use of Knowledge in Society », *American Economic Review*, 35(4), 1945, p. 519–530.
- Eden Medina, *Cybernetic Revolutionaries: Technology and Politics in Allende’s Chile*, MIT Press, 2011.
- Stafford Beer, « The Viable System Model: Its Provenance, Development, Methodology and Pathology », *Journal of the Operational Research Society*, 35(1), 1984, p. 7–25.
- Tiqqun, *L’Hypothèse cybernétique*, 2001.

## Cerveau et intelligence artificielle

- Warren S. McCulloch et Walter Pitts, « A Logical Calculus of the Ideas Immanent in Nervous Activity », *Bulletin of Mathematical Biophysics*, 5, 1943, p. 115–133.
- Gualtiero Piccinini, « The First Computational Theory of Mind and Brain: A Close Look at McCulloch and Pitts’ “Logical Calculus of Ideas Immanent in Nervous Activity” », *Synthese*, 141, 2004, p. 175–215.

## Matériau complémentaire utilisé pour l’articulation

- « Cybernétique et techniques de gouvernement », entretien avec Ivan Bouchardeau, transcription automatique locale dans `lundimatin.md`. Le transcript est utilisé comme ressource d’orientation et de problématisation ; les affirmations historiques doivent rester appuyées sur les travaux cités ci-dessus.
