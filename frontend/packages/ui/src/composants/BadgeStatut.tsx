import { Check, CircleHelp, X } from 'lucide-react';
import type { ReactNode } from 'react';

export type StatutAffiche = 'ouvert' | 'ferme' | 'inconnu';

const styles: Record<StatutAffiche, string> = {
  ouvert: 'bg-vert-clair text-vert-fonce',
  ferme: 'bg-rouge-clair text-rouge',
  inconnu: 'bg-fond text-encre border border-bordure',
};

const icones: Record<StatutAffiche, ReactNode> = {
  ouvert: <Check size={14} strokeWidth={2.5} aria-hidden />,
  ferme: <X size={14} strokeWidth={2.5} aria-hidden />,
  inconnu: <CircleHelp size={14} strokeWidth={2.5} aria-hidden />,
};

/** Badge « Ouvert jusqu'à 16 h 30 », « Fermé aujourd'hui »… Le texte vient des traductions. */
export function BadgeStatut({ statut, children }: { statut: StatutAffiche; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-badge px-2 py-1 text-sm font-medium ${styles[statut]}`}
    >
      {icones[statut]}
      {children}
    </span>
  );
}
