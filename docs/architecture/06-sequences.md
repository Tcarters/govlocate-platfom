# 6. Séquences des flux critiques

Quatre flux concentrent les risques techniques du MVP. Les autres (recherche, fiches, console) sont de simples lectures et écritures.

## 6.1 Réserver en ligne

```mermaid
sequenceDiagram
  autonumber
  actor U as Citoyen
  participant P as PWA citoyen
  participant A as API
  participant DB as PostgreSQL
  participant Q as Redis
  participant W as Worker
  participant S as Agrégateur SMS

  U->>P: Choisit la démarche, le lieu et le créneau
  P->>A: GET /services/:id/creneaux
  A->>DB: Créneaux avec des places restantes
  A-->>P: Liste des créneaux
  U->>P: Saisit son nom et son numéro, accepte la collecte
  P->>A: POST /rendez-vous
  A->>DB: Réserve la place et crée le rendez-vous en attente du code
  A->>Q: Tâche « envoyer le code »
  A-->>P: Rendez-vous en attente du code
  Q->>W: Tâche
  W->>S: SMS avec le code
  S-->>U: Reçoit le code
  U->>P: Saisit le code
  P->>A: POST /rendez-vous/:id/confirmation
  A->>DB: Passe le rendez-vous à Confirmé et horodate
  A->>Q: Tâche « SMS de confirmation »
  A-->>P: Code de réservation
```

- La place est réservée **dès l'étape 7**, pour qu'un autre usager ne la prenne pas pendant la saisie du code. Si le code n'est pas validé à temps, le rendez-vous passe en `Expiré` et la place est libérée.
- L'envoi du code est **plafonné** par numéro et par adresse IP, et limité aux numéros en +228, contre la fraude au « SMS pumping ».

## 6.2 Réserver par SMS

```mermaid
sequenceDiagram
  autonumber
  actor U as Citoyen sans smartphone
  participant S as Agrégateur SMS
  participant A as API
  participant R as Redis
  participant DB as PostgreSQL
  participant W as Worker

  U->>S: Envoie RDV au numéro court
  S->>A: Webhook POST /sms/entrant
  A->>R: Ouvre une conversation pour ce numéro, expire après 30 min
  A->>W: Menu des démarches
  W->>S: SMS
  S-->>U: Menu des démarches
  U->>S: Répond 1
  S->>A: Webhook
  A->>R: Lit l'étape en cours, enregistre le choix
  Note over U,A: Même échange pour la commune, puis pour le créneau
  U->>S: Répond 1 pour le premier créneau
  S->>A: Webhook
  A->>DB: Réserve la place et crée le rendez-vous Confirmé, canal SMS
  A->>W: SMS de confirmation avec le code de réservation
  W->>S: SMS
  S-->>U: Confirmation
```

- **Pas de code de vérification** : le SMS entrant prouve déjà que l'usager possède le numéro.
- L'API **vérifie la signature** de chaque webhook et ignore un message déjà reçu, car l'agrégateur peut renvoyer le même message plusieurs fois.
- Les textes exacts sont dans [sms-ussd.md](../design/sms-ussd.md).

## 6.3 Appeler l'usager suivant

```mermaid
sequenceDiagram
  autonumber
  actor G as Agent
  participant PP as PWA pro
  participant A as API
  participant DB as PostgreSQL
  participant R as Redis
  participant W as Worker
  participant PC as PWA citoyen

  G->>PP: Appuie sur « Appeler le suivant »
  PP->>A: POST /files/:id/appeler depuis le guichet 2
  A->>DB: Prend le prochain ticket en attente et le passe à Appelé
  A->>R: Publie « file mise à jour »
  A->>W: SMS « c'est votre tour » et SMS « bientôt votre tour »
  A-->>PP: Ticket appelé
  R-->>A: Toutes les instances de l'API reçoivent l'événement
  A-->>PC: SSE : nouvelle position dans la file
  W->>W: Envoie les SMS via l'agrégateur
```

- Le prochain ticket est pris avec un verrou qui **saute les lignes déjà verrouillées** (`FOR UPDATE SKIP LOCKED`). Deux guichets qui appellent au même instant n'obtiennent jamais le même usager.
- Le SMS « bientôt votre tour » part quand il reste **2 personnes** avant l'usager. Ce seuil est réglable par service.

## 6.4 Synchroniser après une coupure

```mermaid
sequenceDiagram
  autonumber
  actor G as Agent
  participant PP as PWA pro
  participant L as IndexedDB
  participant A as API
  participant DB as PostgreSQL

  Note over PP,A: Le réseau est coupé
  G->>PP: Ajoute un usager sans réservation
  PP->>L: Enregistre l'opération avec un UUID et l'heure locale, ticket G2-035
  G->>PP: Appelle le suivant, puis le marque servi
  PP->>L: Enregistre les opérations dans l'ordre
  Note over PP,A: Le réseau revient
  PP->>A: POST /sync avec le lot d'opérations
  loop Pour chaque opération
    A->>DB: Ignore l'opération si son UUID est déjà connu, sinon l'applique
  end
  A-->>PP: État à jour de la file et conflits éventuels
  PP->>L: Supprime les opérations confirmées
  PP-->>G: Affiche les conflits à traiter
```

### Règles de résolution des conflits (à valider en phase 1)

| Situation | Règle |
| :- | :- |
| Un ticket à distance a été annulé par l'usager, mais le guichet hors ligne l'a servi | **Le guichet gagne** : l'usager était physiquement présent. |
| Deux guichets hors ligne ont appelé le même ticket à distance | Le premier lot reçu par le serveur gagne. L'autre agent voit un conflit et rappelle quelqu'un d'autre. |
| Le guichet a créé des tickets hors ligne | Pas de conflit possible : la série `G2-` n'appartient qu'au guichet n° 2. |
| La session de l'agent a expiré pendant la coupure | Les opérations restent dans IndexedDB. L'agent se reconnecte, puis la synchronisation reprend. |
