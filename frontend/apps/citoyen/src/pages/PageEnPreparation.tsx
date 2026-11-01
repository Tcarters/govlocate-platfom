import { Bouton } from '@govlocate/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function PageEnPreparation() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-bold">{t('enPreparation.titre')}</h1>
      <p className="text-gris-texte">{t('enPreparation.texte')}</p>
      <Bouton asChild variante="secondaire">
        <Link to="/">{t('enPreparation.accueil')}</Link>
      </Bouton>
    </main>
  );
}
