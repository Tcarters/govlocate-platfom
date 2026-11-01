// Place le build de l'application pro sous /pro/ dans le build citoyen,
// pour servir les deux applications sur un seul domaine (voir frontend-context.md).
import { cpSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const racine = fileURLToPath(new URL('..', import.meta.url));
const distCitoyen = `${racine}apps/citoyen/dist`;
const distPro = `${racine}apps/pro/dist`;

for (const dossier of [distCitoyen, distPro]) {
  if (!existsSync(dossier)) {
    console.error(`Build manquant : ${dossier}. Lancez d'abord « pnpm build ».`);
    process.exit(1);
  }
}

const cible = `${distCitoyen}/pro`;
rmSync(cible, { recursive: true, force: true });
cpSync(distPro, cible, { recursive: true });
console.log(`Démo assemblée : ${distCitoyen} (application pro sous /pro/)`);
