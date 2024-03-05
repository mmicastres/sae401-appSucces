# Dossier UX V1

## Membres du groupe
Festa Joey
Guilloteaux Kilian
## Description générale de l'application

Application web et mobile permettant d'ajouter ses accomplissements sur des jeux vidéo et leurs succès.
Un utilisateur non connecté pourra aller sur le site sans se connecter et pourra voir les jeux les plus joués du moment, ceux où les utilisateurs ont le plus de succès et les trier selon ce genre de critères. Il pourra également choisir un succès en particulier et pourra consulter les commentaires des utilisateurs, les taux de complétion etc. Il peut également consulter le profil des autres utilisateurs. Il pourra également se créer un compte et se connecter pour ajouter ses réussites, que ce soit manuellement un par un ou en liant son compte aux plateformes qu'il utilise (Steam en particulier). 
Chacune de ses activités sera consignée dans un historique dont les entrées pourront être likées et commentées par les autres utilisateurs. En les ajoutant en amis, il pourra voir dans sa page d'activités les activités de tous ses amis. Il pourra aussi envoyer des messages privés à ses amis 
Il pourra personnaliser son profil en ajoutant ses hauts faits marquants, ses jeux les plus joués 

## Description des DS utilisés
Nous avons décidé d’utiliser le design system de Google car il propose de nombreux éléments pour le développement d’application mobile comme web, contrairement au Carbon Design System qui ne possède pas une grande couverture d’éléments pour le mobile. Également, possédant tous les deux un téléphone portable Android, nous sommes tous les deux déjà habitués à ce Design System.
De plus, le material design possède une très bonne documentation ainsi qu’une librairie de composants React, qui est moins fournie dans le Design System d’IBM.

## Fonctionnalités / Écrans
### Navigation
Le menu est visible car il y a peu de sections dans lesquelles naviguer, cela ne nuit donc pas à la lisibilité du site. Le menu permet d’accéder à la page d’activités, la page de recherche et la page du compte. Les autres pages sont accessibles via d’autres éléments de chaque page, en dehors du menu. 

### Accueil
Description + justification + différence entre web et mobile + captures d'écran 
La homepage ou page d’accueil recense les jeux les plus joués, à la fois de cette semaine et depuis toujours, ainsi que les succès les plus obtenus de manière générale. Cela incite un nouvel utilisateur à commencer à naviguer sur le site en regardant des jeux qu’il serait susceptible d’apprécier. Les jeux sont actualisés chaque semaine.
Il peut accéder à un jeu ou un succès demandé en cliquant sur ceux-ci, et se connecter ou naviguer sur d’autres pages à l’aide du menu latéral.


### Activités
Description de la page d'accueil et justification de vos choix de conception (ex. pourquoi vous avez choisi de mettre en avant (ou non) tel élément, avez vous fait des choix par défaut ?  )
La page d’activités permet de visualiser toutes les données mises à jour d’un utilisateur et des autres utilisateurs qu’il possède en ami. Il peut donc voir les succès obtenus par lui ou d’autres utilisateurs, triés selon leur date de mise à jour, ainsi que le changement de statut de ses jeux ou des jeux de ses amis (s’ils ont été complétés, s’ils ont commencé à être joués…).


### Page jeu
Description + justification + différence entre web et mobile + Captures d'écran
Présente un jeu, avec ses succès, ainsi que les amis de l’utilisateur qui jouent au jeu (si l’utilisateur est connecté)

### Succès
Description + justification + différence entre web et mobile + captures d'écran
Cette page décrit le succès demandé par l’utilisateur, elle contient les données relatives au succès (nombre d’utilisateurs le possédant, description…) ainsi que des astuces rédigées par les membres de la communauté. L’utilisateur connecté peut également rédiger son commentaire, qui sera affiché sur la page. Chaque commentaire sur un succès peut être voté par un utilisateur, et les commentaires ayant le plus de votes seront affichés en premiers, en haut de la section. On peut également accéder au profil d’autres utilisateurs en cliquant sur les amis ayant le succès ou sur le nom de chaque personne ayant commenté le succès. Il n’y a pas de différence entre web et mobile hormis la disposition des éléments.

### Messagerie
Description + justification + différence entre web et mobile + captures d'écran
Permet aux utilisateur de communiquer et de s’entraider et discuter a propos de leurs jeux, leurs succès.
Sur mobile page séparer en deux. Liste des communications et ecran de messagerie.

### Recherche
Description + justification + différence entre web et mobile + captures d'écran
Permet à l'utilisateur de rechercher des jeux, utilisateurs, ou succès et de les trier selon certains critères : les plus joués, les plus complétés, non joué ou complété par l’utilisateur, etc.


### Ecran d’inscription
Cette page simple permet de créer son compte à l’aide d’un identifiant, d’un email et d’un mot de passe. Plus tard, il sera également possible de créer un compte à partir de son compte Steam


### Ecran de connexion
Description + justification + différence entre web et mobile + captures d'écran
Cette page simple permet de se connecter rapidement à l’aide d’un email et d’un mot de passe. Plus tard, il sera également possible de se connecter à partir de son compte Steam

## Maquettes finales
Quels design system ont été utilisés. Lequel a été sélectionné pour l'integration.
Nous avons utilisés les design system suivants : 
Material Design de Google par Kilian, très utilisé, qui nous permet d’intégrer facilement notre maquette sur mobile
Carbon Design d’IBM par Joey, avec des composants intuitifs et agréable à manipuler
Nous avons finalement choisi de garder la maquette utilisant Material Design, qui nous semblait plus familière et que nous préférons développer

Liens vers les maquettes
Maquette Festa Joey (web et mobile) : [Maquette Joey](https://www.figma.com/file/ZqseNK5tI08sCXqz5AZhNz/(v11)-All-themes---Carbon-Design-System-(Community)?type=design&node-id=11143%3A31298&mode=design&t=gmGl48vjXtnMYzy7-1)
Maquette Guilloteaux Kilian (web et mobile) :
[Maquette Kilian](https://www.figma.com/file/n3ZK4caqsjJ1KkUR9PGHNO/Application-Je-Succes?type=design&node-id=54948%3A28218&mode=design&t=lXTf5Qj0GThgu55d-1)

