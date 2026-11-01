import { communeParDefaut } from '@govlocate/data';
import { useState } from 'react';

const CLE = 'govlocate-commune';

function lire(): string {
  try {
    return localStorage.getItem(CLE) ?? communeParDefaut;
  } catch {
    return communeParDefaut;
  }
}

/** Commune de l'usager, gardée sur le téléphone d'une visite à l'autre. */
export function useCommuneChoisie() {
  const [communeId, setCommuneId] = useState(lire);
  const choisir = (id: string) => {
    setCommuneId(id);
    try {
      localStorage.setItem(CLE, id);
    } catch {
      // Navigation privée : le choix vaut pour cette visite seulement.
    }
  };
  return [communeId, choisir] as const;
}
