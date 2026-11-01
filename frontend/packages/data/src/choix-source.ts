import { creerSourceMock } from './mock/source-mock';
import type { SourceDeDonnees } from './source';

// VITE_DATA_SOURCE vaut « mock » par défaut. La source « api » arrivera avec le backend.
function choisirSource(): SourceDeDonnees {
  if (import.meta.env.VITE_DATA_SOURCE === 'api') {
    throw new Error('La source « api » arrivera avec le backend : utilisez VITE_DATA_SOURCE=mock.');
  }
  return creerSourceMock();
}

export const source = choisirSource();
