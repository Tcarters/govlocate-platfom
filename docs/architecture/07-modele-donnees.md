# 7. Modèle de données (PostgreSQL)

Version 0, issue du [modèle du domaine](03-modele-domaine.md). Seules les colonnes structurantes sont montrées. Le schéma définitif sera écrit sous forme de migrations Alembic au sprint 1.

```mermaid
erDiagram
  REGION ||--o{ PREFECTURE : contient
  PREFECTURE ||--o{ COMMUNE : contient
  COMMUNE ||--o{ POINT_SERVICE : contient
  ORGANISME ||--o{ POINT_SERVICE : gere
  POINT_SERVICE ||--o{ GUICHET : possede
  POINT_SERVICE ||--o{ HORAIRE : ouvre
  POINT_SERVICE ||--o{ FERMETURE : ferme
  DEMARCHE ||--o{ PIECE_REQUISE : exige
  POINT_SERVICE ||--o{ SERVICE_OFFERT : propose
  DEMARCHE ||--o{ SERVICE_OFFERT : "proposee via"
  SERVICE_OFFERT ||--o{ CRENEAU : ouvre
  CRENEAU ||--o{ RENDEZ_VOUS : recoit
  SERVICE_OFFERT ||--o{ FILE_JOUR : "une par jour"
  FILE_JOUR ||--o{ TICKET : contient
  RENDEZ_VOUS |o--o| TICKET : "arrivee enregistree"
  CONTACT_USAGER ||--o{ RENDEZ_VOUS : reserve
  CONTACT_USAGER |o--o{ TICKET : prend
  GUICHET |o--o{ TICKET : appelle
  COMMUNE ||--o{ COMPTE_AGENT : emploie
  COMPTE_AGENT ||--o{ JOURNAL_AUDIT : trace
  COMPTE_AGENT ||--o{ OPERATION_SYNC : envoie
  CONTACT_USAGER |o--o{ MESSAGE_SMS : echange
  POINT_SERVICE ||--o{ SIGNALEMENT : concerne

  POINT_SERVICE {
    uuid id PK
    uuid commune_id FK
    uuid organisme_id FK
    text nom
    geography position "Point WGS 84, index GiST"
    text statut "ouvert, ferme, inconnu"
    date verifie_le
  }
  SERVICE_OFFERT {
    uuid id PK
    uuid point_service_id FK
    uuid demarche_id FK
    int creneaux_par_heure
    bool rdv_actif
    bool file_active
  }
  CRENEAU {
    uuid id PK
    uuid service_offert_id FK
    timestamptz debut
    int capacite
    int places_restantes "jamais negatif"
  }
  RENDEZ_VOUS {
    uuid id PK
    uuid creneau_id FK
    uuid contact_id FK
    text code_reservation UK
    text statut
    text canal
    timestamptz cree_le
    timestamptz confirme_le
    timestamptz arrive_le
    timestamptz annule_le
  }
  FILE_JOUR {
    uuid id PK
    uuid service_offert_id FK
    date jour
  }
  TICKET {
    uuid id PK
    uuid file_jour_id FK
    uuid contact_id FK "nullable"
    uuid guichet_id FK "nullable"
    text numero "R-012 ou G2-034"
    text statut
    text canal
    timestamptz emis_le
    timestamptz appele_le
    timestamptz servi_le
  }
  CONTACT_USAGER {
    uuid id PK
    text nom
    text telephone "format E.164"
    timestamptz consentement_le
    date purge_prevue_le
  }
  COMPTE_AGENT {
    uuid id PK
    uuid commune_id FK
    text identifiant UK
    text mot_de_passe_hash "Argon2"
    text role
    bool actif
  }
  OPERATION_SYNC {
    uuid id PK "genere par l'appareil"
    uuid compte_agent_id FK
    text type
    timestamptz horodatage_local
    timestamptz recu_le
  }
```

## Contraintes et index importants

| Élément | Pourquoi |
| :- | :- |
| Index GiST sur `point_service.position` | Recherche des points les plus proches (`ST_DWithin`, tri par distance) |
| `UNIQUE (file_jour_id, numero)` | Un numéro de ticket n'existe qu'une fois par file et par jour |
| `UNIQUE (service_offert_id, jour)` sur `file_jour` | Une seule file par service et par jour |
| `UNIQUE code_reservation` | Le code présenté au guichet désigne un seul rendez-vous |
| `CHECK (places_restantes >= 0)` sur `creneau` | Impossible de surréserver, même avec des requêtes simultanées |
| Index partiel sur `ticket (file_jour_id, emis_le) WHERE statut = 'en_attente'` | « Appeler le suivant » reste instantané, même avec beaucoup de tickets |
| Clé primaire `operation_sync.id` fournie par l'appareil | Un lot de synchronisation reçu deux fois n'est appliqué qu'une fois |

## Données personnelles

- Le nom et le téléphone ne sont stockés que dans `contact_usager`.
- Le planificateur efface ou anonymise les contacts arrivés à `purge_prevue_le`. Les rendez-vous et tickets restent pour les statistiques, sans lien vers une personne.
- La durée de conservation reste à fixer avec le juriste en phase 0.
