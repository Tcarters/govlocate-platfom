import type { ReactNode } from 'react';

/** Façon dont l'usager est arrivé dans la file, comme sur l'écran du guichet de la maquette. */
export type OrigineFile = 'rendez-vous' | 'distance' | 'sms' | 'sur-place';

const styles: Record<OrigineFile, string> = {
  'rendez-vous': 'bg-vert-clair text-vert-fonce',
  distance: 'bg-jaune-clair text-encre border border-jaune',
  sms: 'bg-encre text-blanc',
  'sur-place': 'bg-fond text-encre border border-bordure',
};

export function BadgeCanal({
  origine,
  grand = false,
  children,
}: {
  origine: OrigineFile;
  grand?: boolean;
  children: ReactNode;
}) {
  const taille = grand ? 'rounded-[10px] px-3.5 py-2 text-base font-bold' : 'rounded-badge px-2 py-1 text-[13px] font-medium';
  return <span className={`whitespace-nowrap ${taille} ${styles[origine]}`}>{children}</span>;
}
