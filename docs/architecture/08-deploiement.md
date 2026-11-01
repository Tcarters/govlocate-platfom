# 8. Déploiement du MVP

Hébergement retenu pour le MVP et le pilote : **Vercel pour les deux PWA, Render (région Francfort) pour le backend**. Les raisons sont dans l'[ADR 0001](../adr/0001-hebergement-mvp.md).

```mermaid
flowchart LR
  subgraph phones["Téléphones et tablettes"]
    navc["Navigateur<br/>PWA citoyen en cache,<br/>IndexedDB"]
    navp["Navigateur du guichet<br/>PWA pro en cache,<br/>IndexedDB"]
    feat["Téléphone simple"]
  end

  subgraph vercel["Vercel, réseau de diffusion mondial"]
    sitec["Site statique<br/>app.govlocate"]
    sitep["Site statique<br/>pro.govlocate"]
  end

  subgraph render["Render, région Francfort"]
    web["Service web<br/>API FastAPI<br/>2 instances"]
    wk["Worker<br/>Celery"]
    bt["Worker<br/>Celery Beat, 1 instance"]
    kv[("Key Value<br/>compatible Redis")]
    db[("PostgreSQL<br/>et PostGIS<br/>sauvegardes quotidiennes")]
  end

  subgraph github["GitHub"]
    repo["Dépôt govlocate-platfom"]
    ci["GitHub Actions"]
  end

  agg["Agrégateur SMS"]
  sentry["Sentry"]

  navc -->|"HTTPS"| sitec
  navp -->|"HTTPS"| sitep
  navc -->|"HTTPS : api.govlocate"| web
  navp -->|"HTTPS : api.govlocate"| web
  feat -->|"SMS"| agg
  agg -->|"webhooks"| web
  web --> db
  web <--> kv
  wk --> kv
  wk --> db
  bt --> kv
  wk --> agg
  repo --> ci
  ci -->|"déploie les PWA"| vercel
  ci -->|"déploie l'image Docker"| render
  web -.-> sentry
  wk -.-> sentry
```

Les noms de domaine (`app.`, `pro.`, `api.`) sont des exemples : le domaine reste à choisir.

## Environnements

| Environnement | Front | Back | Déclenchement |
| :- | :- | :- | :- |
| Local | Vite en mode développement | Docker Compose : API, worker, PostgreSQL et PostGIS, Redis, adaptateur SMS factice | Sur le poste de chaque développeur |
| Aperçu | Un déploiement Vercel par pull request, avec son propre lien | API de préproduction | Automatique à chaque pull request |
| Préproduction | Vercel, branche `master` | Render, services de préproduction, données fictives | Automatique à chaque fusion sur `master` |
| Production | Vercel | Render, services de production | Tag de version et validation manuelle |

Les liens d'aperçu Vercel servent aux revues de maquettes et aux démonstrations aux communes. Chacun peut ouvrir une version sur son téléphone avant la fusion.

## Règles d'exploitation

- **Le front reste un site statique.** On n'utilise ni les fonctions serverless ni le middleware de Vercel : les PWA peuvent partir vers n'importe quel CDN sans réécriture.
- **Le back tourne en images Docker.** La même image sert en local, en préproduction et en production. Elle peut être déplacée vers un hébergeur au Togo si l'avis juridique l'exige (voir le plan B de l'ADR 0001).
- **Infrastructure décrite en code.** Les fournisseurs Terraform de Vercel et de Render décrivent les services, les variables et les domaines.
- **Sauvegardes.** En plus des sauvegardes de Render, un export quotidien part vers un stockage externe. Une restauration est testée chaque mois.
- **Supervision.** Sentry pour les erreurs, les métriques et journaux de Render, et une sonde de disponibilité externe sur `api.` et sur les deux sites.
