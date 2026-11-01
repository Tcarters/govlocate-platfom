# Architecture de GovLocate

Version 0 du 1er novembre 2026. **Brouillon à valider** après les entretiens terrain de la phase 0 : les noms, statuts et règles métier peuvent encore changer.

Les diagrammes sont écrits en [Mermaid](https://mermaid.js.org). GitHub, VS Code (aperçu Markdown) et Notion les affichent directement. Pour modifier un diagramme, on modifie le texte et on passe par une pull request, comme pour le code.

| # | Document | Contenu |
| :- | :- | :- |
| 1 | [Contexte](01-contexte.md) | GovLocate, ses utilisateurs et les systèmes externes (C4 niveau 1) |
| 2 | [Cas d'utilisation](02-cas-utilisation.md) | Ce que fait chaque acteur, version par version |
| 3 | [Modèle du domaine](03-modele-domaine.md) | Entités métier et relations (diagramme de classes) |
| 4 | [États](04-etats.md) | Cycle de vie d'un rendez-vous et d'un ticket, et indicateurs qui en découlent |
| 5 | [Conteneurs](05-conteneurs.md) | Applications, API, bases et files de messages (C4 niveau 2) |
| 6 | [Séquences](06-sequences.md) | Les 4 flux critiques, étape par étape |
| 7 | [Modèle de données](07-modele-donnees.md) | Tables, clés et index de PostgreSQL |
| 8 | [Déploiement](08-deploiement.md) | Hébergement du MVP et environnements |

Décisions liées : [ADR 0001, hébergement du MVP](../adr/0001-hebergement-mvp.md). Canaux sans smartphone : [textes SMS et menu USSD](../design/sms-ussd.md).

## Conventions

- Les noms métier sont en français, comme dans le cadrage : `PointDeService`, `RendezVous`, `Ticket`. Le code reprendra les mêmes noms, sans accents.
- Chaque changement d'état est horodaté. Les indicateurs du pilote en dépendent (voir [États](04-etats.md)).
- Les numéros de ticket portent leur source : `R-012` pour un ticket émis par le serveur (à distance ou par SMS), `G2-034` pour un ticket émis par le guichet n° 2. Deux sources ne peuvent donc jamais produire le même numéro, même hors connexion.
