# Documentation de GovLocate

## Maquettes

**[GovLocate maquettes MVP](https://claude.ai/artifact/WKym5MregREkudetRTGRuc)**, version 0, validée le 1er novembre 2026.

Elle contient 9 écrans cliquables : le parcours citoyen de l'accueil à la confirmation du rendez-vous, le suivi du ticket, la réservation par SMS et l'écran du guichet. Le lien est privé : il faut que le propriétaire l'ait partagé avec vous depuis le menu Partager pour que vous puissiez l'ouvrir.

**[GovLocate maquettes MVP dans Figma](https://www.figma.com/design/RR0fF4oT0cv2bjlQXrfcdr)**, reprise de la version 0 le 1er novembre 2026.

Le fichier reproduit les 9 écrans en calques modifiables, avec le prototype cliquable. Sa section « Composants » sert de base au design system : variables de couleur, icônes et composants (bouton, tuile de démarche, carte de point de service, créneau, ticket, ligne de file, bulle SMS). La vue « Carte » des résultats et les styles de texte restent à faire. Le fichier est dans des brouillons : pour l'ouvrir, il faut que son propriétaire vous l'ait partagé ou l'ait déplacé dans un projet de l'équipe.

## Contenu du dossier

| Dossier | Contenu |
| :- | :- |
| [architecture/](architecture/README.md) | Contexte, cas d'utilisation, modèle du domaine, états, conteneurs, séquences, modèle de données, déploiement |
| [adr/](adr/) | Décisions d'architecture, dont l'[hébergement du MVP](adr/0001-hebergement-mvp.md) |
| [design/](design/) | [Textes SMS et menu USSD](design/sms-ussd.md) |

Voir aussi le document de référence du projet, [project-context.md](../project-context.md), qui couvre la stack technique, la méthode de travail et le plan.
