# 3. Modèle du domaine

Le modèle est découpé en deux parties pour rester lisible : l'**annuaire** (où aller, quoi apporter) et l'**accueil des usagers** (rendez-vous, files, tickets).

## 3.1 Annuaire

```mermaid
classDiagram
  direction LR
  class Region {
    +String nom
  }
  class Prefecture {
    +String nom
    +MultiPolygon contour
  }
  class Commune {
    +String nom
    +Int population
  }
  class Organisme {
    +String nom
    +TypeOrganisme type
  }
  class PointDeService {
    +UUID id
    +String nom
    +String adresse
    +Point position
    +StatutPoint statut
    +Date verifie_le
    +String verifie_par
  }
  class Guichet {
    +Int numero
    +Bool actif
  }
  class Horaire {
    +JourSemaine jour
    +Time ouverture
    +Time fermeture
  }
  class Fermeture {
    +Date debut
    +Date fin
    +String motif
  }
  class Demarche {
    +String nom
    +String description
    +Int cout_officiel_fcfa
    +String delai_habituel
  }
  class PieceRequise {
    +String libelle
    +Bool obligatoire
  }
  class ServiceOffert {
    +Int duree_moyenne_min
    +Int creneaux_par_heure
    +Bool rdv_actif
    +Bool file_active
  }
  class TypeOrganisme {
    <<enumeration>>
    mairie
    etat_civil
    documents_identite
    CEET
    TdE
  }
  class StatutPoint {
    <<enumeration>>
    ouvert
    ferme
    inconnu
  }

  Region "1" --> "*" Prefecture : contient
  Prefecture "1" --> "*" Commune : contient
  Commune "1" --> "*" PointDeService : contient
  Organisme "1" --> "*" PointDeService : gère
  PointDeService "1" *-- "*" Guichet
  PointDeService "1" *-- "*" Horaire
  PointDeService "1" *-- "*" Fermeture
  Demarche "1" *-- "*" PieceRequise
  PointDeService "1" --> "*" ServiceOffert : propose
  Demarche "1" --> "*" ServiceOffert : proposée via
```

- **`ServiceOffert`** relie une démarche à un point de service. C'est à ce niveau qu'on règle la durée moyenne, le nombre de créneaux par heure, et l'activation des rendez-vous ou de la file.
- **`verifie_le` et `verifie_par`** s'affichent sur chaque fiche : c'est la parade du cadrage contre un annuaire périmé.
- Les 107 agences CEET et TdE du défi 2 sont importées comme `PointDeService`. Les 15 agences au statut inconnu gardent `statut = inconnu` jusqu'à leur vérification.

## 3.2 Accueil des usagers

```mermaid
classDiagram
  direction LR
  class ServiceOffert
  class Guichet
  class Creneau {
    +DateTime debut
    +DateTime fin
    +Int capacite
    +Int places_restantes
  }
  class RendezVous {
    +UUID id
    +String code_reservation
    +StatutRdv statut
    +Canal canal
    +DateTime cree_le
    +DateTime confirme_le
    +DateTime arrive_le
    +DateTime annule_le
  }
  class FileDuJour {
    +Date date
  }
  class Ticket {
    +UUID id
    +String numero
    +StatutTicket statut
    +Canal canal
    +DateTime emis_le
    +DateTime appele_le
    +DateTime servi_le
    +DateTime absent_le
    +DateTime annule_le
  }
  class ContactUsager {
    +UUID id
    +String nom
    +String telephone
    +DateTime consentement_le
    +Date purge_prevue_le
  }
  class CompteAgent {
    +UUID id
    +String nom
    +String identifiant
    +Role role
    +Bool actif
  }
  class JournalAudit {
    +DateTime horodatage
    +String action
    +String cible
  }
  class OperationSync {
    +UUID id
    +String appareil
    +String type
    +DateTime horodatage_local
    +DateTime recu_le
  }
  class MessageSms {
    +Direction direction
    +String telephone
    +String contenu
    +StatutLivraison statut
    +String fournisseur
  }
  class Avis {
    +Int note
    +String commentaire
  }
  class Signalement {
    +TypeSignalement type
    +String description
    +StatutSignalement statut
  }
  class Canal {
    <<enumeration>>
    web
    sms
    ussd
    guichet
  }
  class Role {
    <<enumeration>>
    agent
    responsable
    admin_commune
    admin_national
  }

  ServiceOffert "1" --> "*" Creneau : ouvre
  Creneau "1" --> "*" RendezVous : reçoit
  ServiceOffert "1" --> "*" FileDuJour : une par jour
  FileDuJour "1" *-- "*" Ticket
  RendezVous "0..1" --> "0..1" Ticket : arrivée enregistrée
  ContactUsager "1" --> "*" RendezVous
  ContactUsager "0..1" --> "*" Ticket
  Guichet "0..1" --> "*" Ticket : appelle
  CompteAgent "1" --> "*" JournalAudit : trace
  CompteAgent "1" --> "*" OperationSync : envoie
  ContactUsager "1" --> "*" MessageSms
  RendezVous "0..1" --> "0..1" Avis
  Ticket "0..1" --> "0..1" Avis
```

- **`ContactUsager`** regroupe toutes les données personnelles (nom, téléphone). Les isoler dans une seule table permet de les purger à date fixe sans toucher aux statistiques.
- **Un usager sans réservation** peut ne pas laisser de numéro. Son ticket existe alors sans `ContactUsager`.
- **`OperationSync`** garde l'identifiant de chaque opération faite hors ligne. Si le même lot arrive deux fois, le serveur ne l'applique qu'une fois.
- **`MessageSms`** trace chaque SMS envoyé ou reçu. On s'en sert pour suivre le coût des SMS, la part des réservations par SMS et les échecs de livraison.
- **`Signalement`** est rattaché au `PointDeService` concerné (non représenté ici, voir 3.1).
