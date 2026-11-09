import { useDemarche } from '@govlocate/data';
import { EnTeteEcran } from '@govlocate/ui';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { BoutonRetour } from '../../composants/BoutonRetour';
import { EtatRequete } from '../../composants/EtatRequete';

// Les lieux, la liste et la carte arrivent le mercredi 4 novembre (plan jour par jour).
export function PageResultats() {
  const { t } = useTranslation();
  const { demarcheId = '' } = useParams();
  const demarche = useDemarche(demarcheId);

  return (
    <>
      <EnTeteEcran titre={demarche.data?.nom ?? '…'} retour={<BoutonRetour vers="/" />} />
      <main className="largeur-page flex flex-1 flex-col gap-3 px-4 py-4 lg:px-5">
        {demarche.isPending || demarche.isError ? (
          <EtatRequete erreur={demarche.isError} reessayer={() => void demarche.refetch()} />
        ) : (
          <p className="rounded-carte border border-bordure bg-blanc p-4 text-gris-texte">
            {t('enPreparation.texte')}
          </p>
        )}
      </main>
    </>
  );
}
