import { Trans, useTranslation } from 'react-i18next';
import { EnTetePro } from '../../composants/EnTetePro';

// La file du jour et les actions de l'agent arrivent le jeudi 5 novembre (plan jour par jour).
export function PageGuichet() {
  const { t } = useTranslation();
  return (
    <>
      <EnTetePro
        contexte={<Trans i18nKey="guichet.contexte" components={{ strong: <strong className="text-blanc" /> }} />}
        statut={
          <span role="status" className="flex items-center gap-1.5 rounded-full bg-vert px-3 py-1.5 text-sm font-medium">
            <span className="size-2 rounded-full bg-blanc" aria-hidden />
            {t('guichet.connecte')}
          </span>
        }
      />
      <main className="mx-auto w-full max-w-7xl px-6 py-5">
        <h1 className="sr-only">{t('guichet.titre')}</h1>
        <p className="rounded-carte border border-bordure bg-blanc p-6 text-gris-texte">{t('enPreparation')}</p>
      </main>
    </>
  );
}
