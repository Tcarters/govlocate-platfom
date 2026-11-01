// Sert le build assemblé avec les mêmes réécritures que vercel.json.
// Les deux applications partagent ainsi une origine, comme en ligne.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../apps/citoyen/dist', import.meta.url));
const port = Number(process.env.PORT ?? 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function fichierExiste(chemin) {
  return existsSync(chemin) && statSync(chemin).isFile();
}

createServer((requete, reponse) => {
  const chemin = decodeURIComponent(new URL(requete.url, 'http://localhost').pathname);
  let fichier = join(dist, normalize(chemin));
  if (!fichier.startsWith(dist)) {
    reponse.writeHead(403).end();
    return;
  }
  if (!fichierExiste(fichier)) {
    const pro = chemin === '/pro' || chemin.startsWith('/pro/');
    fichier = join(dist, pro ? 'pro/index.html' : 'index.html');
  }
  reponse.writeHead(200, { 'Content-Type': types[extname(fichier)] ?? 'application/octet-stream' });
  createReadStream(fichier).pipe(reponse);
}).listen(port, () => {
  console.log(`Démo servie sur http://localhost:${port} (pro : http://localhost:${port}/pro/)`);
});
