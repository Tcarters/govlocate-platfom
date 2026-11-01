import type { SourceDeDonnees } from '../source';
import { communes } from './fixtures/communes';
import { demarches } from './fixtures/demarches';

type Options = {
  /** Délai simulé de chaque appel, en millisecondes : [minimum, maximum]. */
  delaiMs?: [number, number];
};

/** Source fictive : les données vivent dans le navigateur, avec un délai de réseau simulé. */
export function creerSourceMock({ delaiMs = [300, 800] }: Options = {}): SourceDeDonnees {
  const attendre = () => {
    const [min, max] = delaiMs;
    const duree = min + Math.random() * (max - min);
    return new Promise<void>((resolve) => setTimeout(resolve, duree));
  };

  return {
    async listerDemarches() {
      await attendre();
      return structuredClone(demarches);
    },
    async lireDemarche(demarcheId) {
      await attendre();
      const demarche = demarches.find((d) => d.id === demarcheId);
      return demarche ? structuredClone(demarche) : null;
    },
    async listerCommunes() {
      await attendre();
      return structuredClone(communes);
    },
  };
}
