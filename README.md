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


# English version
Group members
Festa Joey Guilloteaux Kilian

## General description of the application
Web and mobile application allowing users to add their achievements on video games and their successes. Users who are not logged in can go to the site without logging in and see the most popular games at the moment, those in which users have had the most success, and sort them according to this kind of criteria. They can also choose a particular success and view user comments, completion rates and more. They can also view other users' profiles. He can also create an account and log in to add his achievements, either manually one by one or by linking his account to the platforms he uses (Steam in particular). Each of his activities will be recorded in a history, whose entries can be liked and commented on by other users. By adding them as friends, you'll be able to see all your friends' activities on your activity page. They can also send private messages to their friends. They can personalize their profile by adding their most memorable achievements and most-played games.

## Description of the DS used
We decided to use Google's Design System because it offers many elements for both mobile and web application development, unlike the Carbon Design System which doesn't have a large coverage of elements for mobile. Also, as we both own Android cell phones, we're both already used to the Design System. What's more, material design has very good documentation, as well as a React component library, which is less provided in the IBM Design System.

## Features / Screens
### Navigation
The menu is visible because there are few sections to navigate through, so it doesn't detract from the site's legibility. The menu provides access to the activities page, the search page and the account page. The other pages are accessed via other elements on each page, outside the menu.

### HomeJsx
The homepage lists the most-played games, both from this week and from the past, as well as the most successful games in general. This encourages a new user to start browsing the site by looking at games they're likely to enjoy. Games are updated weekly. The user can access a requested game or hit by clicking on it, and log in or navigate to other pages using the side menu.

### Activities
The activities page displays all the updated data for a user and any other users he or she has befriended. Users can therefore see the successes achieved by themselves or by other users, sorted by update date, as well as the change in status of their games or their friends' games (whether they have been completed, whether they have started to be played...).

### Game page
Description + justification + difference between web and mobile + Screenshots Presents a game, with its successes, as well as the user's friends who are playing the game (if the user is logged in).

### Achievements
Description + rationale + difference between web and mobile + screenshots This page describes the success requested by the user, and contains data relating to the success (number of users who have it, description, etc.) as well as tips written by community members. Logged-in users can also write their own comments, which will be displayed on the page. 

### Success 
This page describes the success requested by the user, and contains data relating to the success (number of users who have it, description, etc.) as well as tips written by community members.Logged-in users can also write their own comments, which will be displayed on the page.Each comment on a success can be voted on by a user, and the comments with the most votes will be displayed first, at the top of the section. Other users' profiles can also be accessed by clicking on the friends with the success or on the name of each person who has commented on the success. There is no difference between web and mobile, apart from the layout of the elements.

### Messaging
Allows users to communicate, help each other and discuss their games and successes. On mobile, page split in two. List of communications and messaging screen.

### Search
Allows users to search for games, users or successes and sort them according to certain criteria: most played, most completed, not played or completed by the user, etc.

### Registration screen 
This simple page allows you to create an account using a login, an email address and a password. Later, it will also be possible to create an account from your Steam account.

### Login screen
This simple page lets you log in quickly with an email and password. Later, it will also be possible to log in from your Steam account.
Final mock-ups

### Which design systems have been used? Which one was selected for integration? 
We used the following design systems: Google's Material Design by Kilian, which is widely used and enables us to easily integrate our mock-up on mobile devices IBM's Carbon Design by Joey, with intuitive, easy-to-use components We finally chose to keep the mock-up using Material Design, which seemed more familiar to us and which we prefer to develop further.

## Links to mock-ups 
Festa Joey mock-up (web and mobile): [Joey mock-up](https://www.figma.com/file/ZqseNK5tI08sCXqz5AZhNz/(v11)-All-themes---Carbon-Design-System-(Community)?type=design&node-id=11143%3A31298&mode=design&t=gmGl48vjXtnMYzy7-1)
Guilloteaux Kilian mock-up (web and mobile): [Kilian mock-up](https://www.figma.com/file/n3ZK4caqsjJ1KkUR9PGHNO/Application-Je-Succes?type=design&node-id=54948%3A28218&mode=design&t=lXTf5Qj0GThgu55d-1)
