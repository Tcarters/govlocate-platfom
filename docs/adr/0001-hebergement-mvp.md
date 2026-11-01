# ADR 0001 : hébergement du MVP

- **Statut :** proposé, à valider en équipe. La localisation des données reste soumise à l'avis juridique de la phase 0.
- **Date :** 1er novembre 2026
- **Révision du 1er novembre 2026 :** les PWA passent sur le plan gratuit Hobby de Vercel, car GovLocate est une initiative bénévole et non commerciale.

## Contexte

Le MVP comprend deux types de composants aux besoins très différents :

- **Deux PWA** (citoyen et pro). Ce sont des fichiers statiques qui doivent arriver vite sur des réseaux 2G et 3G, puis fonctionner depuis le cache du téléphone.
- **Un backend** qui tourne en continu : l'API avec des connexions SSE ouvertes longtemps, un worker Celery, un planificateur, PostgreSQL avec PostGIS et Redis.

L'équipe compte un développeur, et une seconde personne qui relit et teste. GovLocate est une initiative bénévole et non commerciale au service de l'État, sans budget pour l'instant. On veut donc un minimum d'exploitation et de coûts pendant le pilote, sans s'enfermer chez un fournisseur.

La question posée était : peut-on tout héberger sur Vercel ?

## Options étudiées

| Option | Avantages | Inconvénients |
| :- | :- | :- |
| **A. Tout sur Vercel** | Un seul outil, déploiement très simple | Les fonctions serverless ont une durée d'exécution limitée : pas de connexions SSE longues, pas de worker Celery ni de planificateur permanent. Il faudrait réécrire le backend autour de ces limites. |
| **B. Vercel pour les PWA, Render pour le backend** | Chaque composant est sur une plateforme faite pour lui. Render gère PostgreSQL (avec PostGIS), Redis, les services web, les workers et les sauvegardes. Les deux plateformes ont un fournisseur Terraform. | Deux fournisseurs à suivre. Render reste payant pour le backend. |
| **C. Machines virtuelles avec Docker Compose** | Coût le plus bas, contrôle total, possible chez un hébergeur au Togo | Mises à jour, sauvegardes, TLS et supervision à notre charge. Trop lourd pour un seul développeur pendant le pilote. |
| **D. Cloud avec région en Afrique du Sud** | Données sur le continent | Pas forcément plus rapide depuis Lomé : les câbles sous-marins du Togo, dont Equiano, remontent vers l'Europe. Coût et complexité plus élevés. |

## Décision

**Option B : les deux PWA sur Vercel, le backend sur Render dans la région de Francfort.**

- **Vercel** sert les PWA depuis son réseau de diffusion mondial et crée un lien d'aperçu à chaque pull request. Ces liens permettent de tester une maquette ou une fonction sur un vrai téléphone, et de la montrer aux communes avant la fusion.
- **Render** fait tourner les images Docker du backend : l'API (2 instances), le worker, le planificateur, plus PostgreSQL et PostGIS et le stockage compatible Redis, tous gérés.
- **Francfort** est la région Render la plus proche du Togo par les câbles sous-marins. La latence réelle depuis Lomé sera mesurée en phase 0, en comparant Francfort avec les autres régions proposées.

## Conséquences

- **Le front reste un site statique.** On n'utilise ni les fonctions ni le middleware de Vercel, pour pouvoir changer de CDN sans réécriture.
- **Le back reste portable.** Tout est en Docker : la même image tourne en local, sur Render ou sur une machine virtuelle.
- **Plan Vercel gratuit (Hobby).** Ce plan est réservé à un usage personnel ou non commercial. GovLocate y a droit tant que personne n'est payé pour le construire et que rien n'est vendu. Il a deux limites. Sur un dépôt privé, seuls les commits du propriétaire du compte Vercel se déploient. Et Vercel peut suspendre un projet Hobby sans préavis : le site étant statique, il se republie ailleurs sans réécriture. Si l'équipe est un jour rémunérée, il faudra passer au plan Pro.
- **Coût du pilote.** Vercel ne coûte rien. Le backend sur Render reste payant, hors SMS : le montant est à chiffrer sur les grilles tarifaires en vigueur au moment de créer les comptes, et son financement reste à trouver.
- **Données personnelles hors du Togo.** Les noms et téléphones des usagers seraient stockés dans l'Union européenne. C'est acceptable seulement si l'avis juridique le confirme.

## Plan B : hébergement imposé au Togo

Si l'avis juridique impose d'héberger les données au Togo :

1. Les PWA restent sur Vercel. Elles ne stockent aucune donnée personnelle sur le serveur : ces données ne vivent que sur le téléphone de l'usager et dans la base.
2. Le backend part sur des machines virtuelles chez un hébergeur au Togo (option C), avec les mêmes images Docker. Terraform crée les serveurs et Ansible les configure.
3. La base est migrée par export et import de PostgreSQL.

## À vérifier avant de valider

- [ ] Avis juridique sur la localisation des données personnelles
- [ ] Mesure de la latence depuis Lomé vers les régions candidates
- [ ] Prise en charge de PostGIS sur l'offre PostgreSQL de Render retenue
- [ ] Coûts mensuels réels de Render pour la configuration du pilote, et leur financement
