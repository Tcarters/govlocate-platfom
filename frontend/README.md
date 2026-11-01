# Frontend de GovLocate

Tout le code du frontend : l'application citoyen, l'application pro (guichet et console), les composants partagés et la source de données fictive.

Le plan, la stack, la structure du dossier et les règles de déploiement sont dans [frontend-context.md](../frontend-context.md).

## Démarrer en local

Il faut Node 22 (version indiquée dans `.nvmrc`). pnpm est fourni par Corepack, inclus avec Node.

```bash
cd frontend
corepack enable          # une seule fois ; sans droits admin : corepack enable --install-directory ~/.local/bin pnpm
pnpm install
pnpm dev
```

| Application | Adresse                     |
| :---------- | :-------------------------- |
| Citoyen     | http://localhost:5173       |
| Pro         | http://localhost:5174/pro/  |

Les données sont fictives par défaut (`VITE_DATA_SOURCE=mock` dans le `.env` de chaque application) : aucun backend n'est nécessaire.

`pnpm dev` sert les deux applications sur deux ports différents, donc elles ne partagent pas le `localStorage`. Pour tester la synchronisation entre le citoyen et le guichet, servez le build assemblé, comme sur Vercel :

```bash
pnpm build:demo
pnpm preview:demo        # citoyen sur http://localhost:4173, pro sur http://localhost:4173/pro/
```

## Autres commandes

| Commande         | Rôle                                         |
| :--------------- | :------------------------------------------- |
| `pnpm lint`      | ESLint sur tout le frontend                  |
| `pnpm typecheck` | Vérification TypeScript de chaque paquet     |
| `pnpm test`      | Tests Vitest (règles de la file)             |
| `pnpm format`    | Mise en forme avec Prettier                  |
