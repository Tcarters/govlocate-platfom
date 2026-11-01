import type { ReactNode } from 'react';

type Props = {
  titre: string;
  sousTitre?: string;
  /** Lien de retour fourni par l'application, par exemple <BoutonRetour />. */
  retour?: ReactNode;
  children?: ReactNode;
};

/** En-tête blanc des écrans intérieurs : retour, titre, sous-titre. */
export function EnTeteEcran({ titre, sousTitre, retour, children }: Props) {
  return (
    <header className="flex flex-col gap-3 border-b border-bordure bg-blanc px-3 pt-2 pb-3">
      <div className="flex items-center gap-1">
        {retour}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[19px] leading-6 font-bold">{titre}</h1>
          {sousTitre && <span className="text-sm text-gris-texte">{sousTitre}</span>}
        </div>
      </div>
      {children}
    </header>
  );
}
