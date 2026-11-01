import { Logo } from '@govlocate/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

/** En-tête sombre de l'application pro, comme sur l'écran du guichet de la maquette. */
export function EnTetePro({ contexte, statut }: { contexte: ReactNode; statut?: ReactNode }) {
  const { t } = useTranslation();
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 bg-encre px-6 py-3 text-blanc">
      <div className="flex flex-wrap items-center gap-3.5">
        <Logo suffixe={t('suffixe')} />
        <span className="text-[15px] text-bordure">{contexte}</span>
      </div>
      <div className="flex items-center gap-3">
        {statut}
        <Link to="/connexion" className="text-sm text-blanc underline">
          {t('deconnexion')}
        </Link>
      </div>
    </header>
  );
}
