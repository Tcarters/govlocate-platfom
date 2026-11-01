import type { Commune, Demarche } from './types';

/**
 * Tout ce que les écrans peuvent demander aux données.
 * La source fictive (mock/) sert la démo ; une source « api » la remplacera
 * sans changer les écrans. L'interface s'étoffe au fil des écrans :
 * voir frontend-context.md, « Source de données ».
 */
export interface SourceDeDonnees {
  listerDemarches(): Promise<Demarche[]>;
  lireDemarche(demarcheId: string): Promise<Demarche | null>;
  listerCommunes(): Promise<Commune[]>;
}
