# ADR 0002 : stack du frontend

- **Statut :** accepté le 1er novembre 2026 par le porteur du projet
- **Date :** 1er novembre 2026

## Contexte

Le cadrage laissait ouvert le choix entre React et Svelte, à trancher en S2. GovLocate doit maintenant présenter une démonstration en ligne aux administrations le 9 novembre 2026, ce qui oblige à choisir tout de suite.

Les contraintes :

- **Un seul développeur** pour l'instant, avec une seconde personne qui relit et teste.
- **Des usagers peu habitués au numérique**, sur des Android d'entrée de gamme et des réseaux 2G ou 3G : WCAG 2.2 niveau AA, compatibilité avec TalkBack, 150 Ko compressés au plus pour le premier écran citoyen.
- **Un guichet qui continue de fonctionner hors connexion** au MVP.
- **Un projet bénévole**, qui gagnera à attirer d'autres contributeurs.

## Options étudiées

| Option | Avantages | Inconvénients |
| :- | :- | :- |
| **A. React** | Écosystème le plus large : primitives accessibles (Radix, React Aria), react-leaflet, Recharts, TanStack Query, i18next, vite-plugin-pwa. Le plus de développeurs disponibles. | Plus de concepts à apprendre (hooks, effets). Un peu plus lourd. |
| **B. Vue** | Prise en main plus douce, un peu plus léger | Bibliothèques équivalentes, avec de plus petites communautés. Reka UI, son équivalent de Radix, est plus récent. |
| **C. Svelte** | Le plus léger | Moins de bibliothèques pour l'accessibilité et le mode hors ligne, moins de développeurs disponibles |

L'apparence n'entre pas dans le choix. Elle vient des maquettes, des jetons de design et de Tailwind, et serait la même avec les trois options.

## Décision

**Option A : React avec TypeScript**, construit avec Vite, en application monopage sans rendu serveur.

| Besoin | Choix |
| :- | :- |
| Routage | React Router, en mode bibliothèque |
| Données | TanStack Query, derrière une interface `SourceDeDonnees` |
| Styles | Tailwind CSS v4 et jetons de design partagés |
| Composants complexes | Primitives Radix, via shadcn/ui |
| Icônes | lucide-react |
| Cartes | Leaflet et react-leaflet, chargés à la demande |
| Graphiques | Recharts, dans la console pro seulement |
| Traductions | i18next |
| PWA | vite-plugin-pwa |
| Tests | Vitest, Testing Library, Playwright |
| Outillage | pnpm, ESLint, Prettier |

Tout le frontend vit dans le dossier `frontend/` du dépôt, en espace de travail pnpm : les deux applications (`apps/citoyen`, `apps/pro`) et les paquets partagés (`packages/ui`, `packages/data`).

## Conséquences

- **La démo n'est pas jetable.** Les écrans passent par l'interface `SourceDeDonnees`. Une source fictive sert la démo. Une source branchée sur l'API FastAPI la remplacera sans réécrire les écrans.
- **Le poids est à surveiller.** React est plus lourd que Svelte. Si le premier écran citoyen dépasse 150 Ko compressés, on essaie d'abord Preact, compatible avec React.
- **La question « React ou Svelte » est close** dans project-context.md.

Détails, structure du dossier et plan de la démo : [frontend-context.md](../../frontend-context.md).
