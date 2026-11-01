import { Slot, Slottable } from '@radix-ui/react-slot';
import type { ReactNode } from 'react';

type Props = {
  icone: ReactNode;
  libelle: string;
  /** Passer un lien vide en enfant : <TuileDemarche asChild …><Link to="…" /></TuileDemarche> */
  asChild?: boolean;
  children?: ReactNode;
};

/** Tuile de l'accueil : une démarche fréquente, choisie d'un geste. */
export function TuileDemarche({ icone, libelle, asChild = false, children }: Props) {
  const Composant = asChild ? Slot : 'div';
  return (
    <Composant className="flex min-h-21 flex-col justify-between gap-2 rounded-carte border border-bordure bg-blanc p-3 text-encre no-underline hover:border-vert">
      <span className="text-vert">{icone}</span>
      <span className="text-base font-medium">{libelle}</span>
      <Slottable>{children}</Slottable>
    </Composant>
  );
}
