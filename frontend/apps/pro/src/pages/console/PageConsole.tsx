import { useTranslation } from 'react-i18next';
import { EnTetePro } from '../../composants/EnTetePro';

// Le tableau de bord arrive le vendredi 6 novembre (plan jour par jour).
export function PageConsole() {
  const { t } = useTranslation();
  return (
    <>
      <EnTetePro contexte={t('connexion.responsableDetail')} />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5">
        <h1 className="text-2xl font-bold">{t('console.titre')}</h1>
        <p className="rounded-carte border border-bordure bg-blanc p-6 text-gris-texte">{t('enPreparation')}</p>
      </main>
    </>
  );
}
