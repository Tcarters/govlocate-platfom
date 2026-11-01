# 2. Cas d'utilisation

Chaque cas d'utilisation deviendra une ou plusieurs user stories dans le backlog. Le diagramme ne montre que le MVP. Le tableau donne aussi les versions suivantes.

## Tableau

| ID | Acteur | Cas d'utilisation | Version |
| :- | :- | :- | :- |
| UC01 | Citoyen | Rechercher un point de service par démarche ou par commune | MVP |
| UC02 | Citoyen | Consulter une fiche démarche : pièces, coût, délai, horaires | MVP |
| UC03 | Citoyen | Prendre rendez-vous | MVP |
| UC04 | Citoyen | Annuler ou déplacer un rendez-vous | MVP |
| UC05 | Citoyen | Prendre un ticket à distance et suivre sa position | MVP |
| UC06 | Citoyen | Recevoir les SMS : code, confirmation, rappel la veille, tour proche | MVP |
| UC07 | Citoyen | Donner un avis, signaler un guichet fermé ou une information fausse | MVP |
| UC08 | Citoyen | Utiliser l'application en éwé ou en kabiyè | V2 |
| UC09 | Citoyen sans smartphone | Réserver un rendez-vous par SMS | MVP |
| UC10 | Citoyen sans smartphone | Réserver et suivre son ticket par menu USSD | V2 |
| UC11 | Agent | Voir les rendez-vous et la file du jour sur un seul écran | MVP |
| UC12 | Agent | Appeler l'usager suivant | MVP |
| UC13 | Agent | Marquer un usager présent, absent ou servi | MVP |
| UC14 | Agent | Ajouter un usager venu sans réservation | MVP |
| UC15 | Agent | Continuer à travailler hors connexion, puis synchroniser | MVP |
| UC16 | Responsable | Déclarer services, horaires, créneaux et fermetures | MVP |
| UC17 | Responsable | Tenir à jour les fiches démarches | MVP |
| UC18 | Responsable | Consulter le tableau de bord de la commune | MVP |
| UC19 | Responsable | Créer et désactiver les comptes des agents | MVP |
| UC20 | Planificateur (système) | Envoyer les rappels la veille et libérer les créneaux non honorés | MVP |
| UC21 | Administration centrale | Voir la carte nationale de couverture | V2 |
| UC22 | Administration centrale | Comparer les communes et exporter les indicateurs | V2 |

## Diagramme du MVP

```mermaid
flowchart LR
  citoyen(["Citoyen"])
  simple(["Citoyen sans smartphone"])
  agent(["Agent de guichet"])
  resp(["Responsable"])
  planif(["Planificateur"])

  subgraph GL["GovLocate, MVP"]
    direction TB
    UC01("UC01 Rechercher un point de service")
    UC02("UC02 Consulter une fiche démarche")
    UC03("UC03 Prendre rendez-vous")
    UC04("UC04 Annuler ou déplacer")
    UC05("UC05 Ticket à distance")
    UC06("UC06 Recevoir les SMS")
    UC07("UC07 Avis et signalement")
    UC09("UC09 Réserver par SMS")
    UC11("UC11 Voir la file du jour")
    UC12("UC12 Appeler le suivant")
    UC13("UC13 Présent, absent, servi")
    UC14("UC14 Ajouter sans réservation")
    UC15("UC15 Travailler hors connexion")
    UC16("UC16 Services, horaires, créneaux")
    UC17("UC17 Fiches démarches")
    UC18("UC18 Tableau de bord commune")
    UC19("UC19 Comptes des agents")
    UC20("UC20 Rappels et libération des créneaux")
  end

  citoyen --- UC01 & UC02 & UC03 & UC04 & UC05 & UC06 & UC07
  simple --- UC09 & UC06
  agent --- UC11 & UC12 & UC13 & UC14 & UC15
  resp --- UC16 & UC17 & UC18 & UC19
  planif --- UC20
```

## Règles métier déjà connues

- **Pas de compte citoyen.** Un rendez-vous en ligne est confirmé par un code reçu par SMS. Un rendez-vous pris par SMS n'a pas besoin de code, puisque le message entrant prouve que l'usager possède le numéro.
- **Parcours de réservation en 3 écrans** après la fiche démarche : créneau, coordonnées et code, confirmation.
- **Priorité au guichet** entre rendez-vous et usagers sans réservation : à définir avec chaque commune pendant la phase 0. Proposition : un rendez-vous présent à l'heure passe avant la file.
- **Un agent ne voit que sa commune.** Un responsable ne gère que les services de sa commune.
