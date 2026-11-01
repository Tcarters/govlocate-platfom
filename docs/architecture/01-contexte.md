# 1. Contexte (C4 niveau 1)

Ce diagramme montre GovLocate comme une boîte unique, avec les personnes qui l'utilisent et les systèmes externes avec lesquels il échange. Les traits pointillés sont prévus pour la V2 ou la V3.

```mermaid
flowchart TB
  citoyen["Citoyen avec smartphone<br/>[personne]"]
  simple["Citoyen avec téléphone simple<br/>[personne]"]
  agent["Agent de guichet<br/>[personne]"]
  resp["Responsable de service<br/>ou de commune<br/>[personne]"]
  admin["Administration centrale<br/>Ministère, Agence Togo Digital<br/>[personne]"]

  gl["GovLocate<br/>[système]<br/>Annuaire des services publics,<br/>rendez-vous et files d'attente"]

  ops["Opérateurs mobiles<br/>Togocom, Moov Africa Togo<br/>[système externe]"]
  sms["Agrégateur SMS et USSD<br/>[système externe]"]
  osm["Fournisseur de tuiles<br/>OpenStreetMap<br/>[système externe]"]
  portail["service-public.gouv.tg<br/>[système externe, V3]"]
  eid["e-ID nationale<br/>[système externe, V3]"]
  momo["Mobile money<br/>[système externe, V2]"]

  citoyen -->|"cherche, réserve, suit son ticket"| gl
  simple -->|"envoie et reçoit des SMS"| ops
  ops <-->|"SMS, puis USSD en V2"| sms
  sms <-->|"messages entrants et sortants"| gl
  agent -->|"gère la file du jour"| gl
  resp -->|"paramètre services et horaires,<br/>suit l'affluence"| gl
  admin -.->|"consulte la couverture nationale"| gl
  gl -->|"affiche les cartes"| osm
  gl -.->|"API publique"| portail
  gl -.->|"authentification"| eid
  gl -.->|"paiement des frais de dossier"| momo

  classDef person fill:#0A6B47,stroke:#075236,color:#ffffff
  classDef system fill:#14181F,stroke:#000000,color:#ffffff
  classDef external fill:#E9ECEB,stroke:#8A9490,color:#14181F
  class citoyen,simple,agent,resp,admin person
  class gl system
  class ops,sms,osm,portail,eid,momo external
```

## Ce qu'il faut retenir

- **Deux portes d'entrée pour les citoyens** : l'application web (PWA) et le SMS. Le SMS n'est pas un canal secondaire. Dans la commune rurale du pilote, on vise 30 % des réservations par SMS.
- **Un seul fournisseur externe critique au MVP** : l'agrégateur SMS. Il est placé derrière une interface interne, ce qui permet d'en changer sans toucher au reste.
- **Pas de dépendance au portail national au MVP.** GovLocate se présente comme la brique guichet et rendez-vous que le portail pourra intégrer par API en V3.
