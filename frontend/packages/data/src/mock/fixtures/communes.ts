import type { Commune } from '../../types';

// Les 13 communes du Grand Lomé. Les communes pilotes s'ajouteront dès qu'elles seront connues.
const golfe = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  id: `golfe-${n}`,
  nom: `Golfe ${n}`,
  prefecture: 'Golfe',
}));

const agoe = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `agoe-nyive-${n}`,
  nom: `Agoè-Nyivé ${n}`,
  prefecture: 'Agoè-Nyivé',
}));

export const communes: Commune[] = [...golfe, ...agoe];

/** Commune choisie par défaut, comme dans la maquette. */
export const communeParDefaut = 'agoe-nyive-1';
