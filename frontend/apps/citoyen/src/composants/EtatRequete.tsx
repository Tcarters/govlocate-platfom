import { Bouton } from '@govlocate/ui';
import { useTranslation } from 'react-i18next';

/** Chargement et erreur, dits avec des mots, pour un réseau lent ou coupé. */
export function EtatRequete({ erreur, reessayer }: { erreur: boolean; reessayer: () => void }) {
  const { t } = useTranslation();
  if (!erreur) {
    return (
      <p role="status" className="py-6 text-center text-gris-texte">
        {t('chargement')}
      </p>
    );
  }
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-6 text-center">
      <p>{t('erreur')}</p>
      <Bouton variante="secondaire" onClick={reessayer}>
        {t('reessayer')}
      </Bouton>
    </div>
  );
}
