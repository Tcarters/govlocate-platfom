import { useCommunes, useDemarches, type Demarche } from '@govlocate/data';
import { Logo, TuileDemarche } from '@govlocate/ui';
import { List, MapPin, MessageSquare, Search } from 'lucide-react';
import { useId, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { EtatRequete } from '../../composants/EtatRequete';
import { IconeDemarche } from '../../composants/IconeDemarche';
import { useCommuneChoisie } from './useCommuneChoisie';

const numeroCourt = import.meta.env.VITE_NUMERO_COURT ?? '[NUMÉRO COURT]';

/** « acte de naissance » trouve « Acte de naissance », avec ou sans accents. */
function normaliser(texte: string) {
  return texte.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}

export function PageAccueil() {
  const { t } = useTranslation();
  const [recherche, setRecherche] = useState('');
  const [toutesVisibles, setToutesVisibles] = useState(false);
  const demarches = useDemarches();

  const motCle = normaliser(recherche);
  const filtre = (d: Demarche) =>
    normaliser(d.nom).includes(motCle) || normaliser(d.description).includes(motCle);

  return (
    <>
      <header className="bg-vert text-blanc">
        <div className="largeur-page flex flex-col gap-4 px-5 pt-4 pb-6 lg:gap-5 lg:pt-8 lg:pb-10">
          {/* À partir de 1024 px, le logo est dans la barre du haut. */}
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="text-[26px] leading-8 font-bold lg:text-4xl lg:leading-tight">
            {t('accueil.titre')}
          </h1>
          <label className="flex h-13 items-center gap-2.5 rounded-champ bg-blanc px-3.5 text-gris-texte focus-within:outline-3 focus-within:outline-jaune lg:max-w-2xl">
            <Search size={22} aria-hidden />
            <span className="sr-only">{t('accueil.recherche.libelle')}</span>
            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder={t('accueil.recherche.exemple')}
              className="min-w-0 flex-1 bg-transparent text-[17px] text-encre outline-none placeholder:text-gris-texte"
            />
          </label>
        </div>
      </header>

      <BarreCommune />

      <main className="largeur-page flex flex-1 flex-col gap-4 px-5 pt-4 pb-6 lg:pt-8">
        {demarches.isPending || demarches.isError ? (
          <EtatRequete erreur={demarches.isError} reessayer={() => void demarches.refetch()} />
        ) : motCle ? (
          <ListeRecherche demarches={demarches.data.filter(filtre)} />
        ) : (
          <>
            <h2 className="mt-1 text-lg font-bold">{t('accueil.frequentes')}</h2>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
              {demarches.data
                .filter((d) => toutesVisibles || d.frequente)
                .map((d) => (
                  <TuileDemarche key={d.id} asChild icone={<IconeDemarche icone={d.icone} />} libelle={d.nom}>
                    <Link to={`/demarches/${d.id}`} />
                  </TuileDemarche>
                ))}
              {!toutesVisibles && (
                <TuileDemarche asChild icone={<List size={26} aria-hidden />} libelle={t('accueil.toutes')}>
                  <button type="button" className="text-left" onClick={() => setToutesVisibles(true)} />
                </TuileDemarche>
              )}
            </div>
          </>
        )}

        <p className="flex items-center gap-3 rounded-carte border border-dashed border-gris bg-blanc px-3.5 py-2.5 text-[15px] leading-5">
          <MessageSquare size={24} className="shrink-0 text-vert" aria-hidden />
          <span>
            <Trans i18nKey="accueil.sms" values={{ numero: numeroCourt }} components={{ strong: <strong /> }} />
          </span>
        </p>
      </main>
    </>
  );
}

function ListeRecherche({ demarches }: { demarches: Demarche[] }) {
  const { t } = useTranslation();
  if (demarches.length === 0) {
    return (
      <p role="status" className="py-4 text-gris-texte">
        {t('accueil.aucunResultat')}
      </p>
    );
  }
  return (
    <>
      <p role="status" className="text-sm text-gris-texte">
        {t('accueil.resultats', { count: demarches.length })}
      </p>
      <ul className="grid gap-2 lg:grid-cols-2">
        {demarches.map((d) => (
          <li key={d.id}>
            <Link
              to={`/demarches/${d.id}`}
              className="flex min-h-14 items-center gap-3 rounded-carte border border-bordure bg-blanc px-3.5 py-2 text-encre no-underline hover:border-vert"
            >
              <span className="text-vert">
                <IconeDemarche icone={d.icone} taille={22} />
              </span>
              <span className="flex flex-col">
                <span className="font-medium">{d.nom}</span>
                <span className="text-sm text-gris-texte">{d.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function BarreCommune() {
  const { t } = useTranslation();
  const [communeId, choisirCommune] = useCommuneChoisie();
  const [ouvert, setOuvert] = useState(false);
  const communes = useCommunes();
  const idListe = useId();
  const nom = communes.data?.find((c) => c.id === communeId)?.nom ?? '…';

  return (
    <div className="border-b border-bordure bg-blanc">
      <div className="largeur-page px-5">
        <div className="flex h-13 items-center justify-between lg:justify-start lg:gap-4">
          <span className="flex items-center gap-2">
            <MapPin size={20} className="text-vert" aria-hidden />
            <span>
              <Trans i18nKey="accueil.commune.pres" values={{ commune: nom }} components={{ strong: <strong /> }} />
            </span>
          </span>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls={idListe}
            onClick={() => setOuvert((o) => !o)}
            className="h-11 px-1 font-medium text-vert underline"
          >
            {t('accueil.commune.changer')}
          </button>
        </div>
        {ouvert && communes.data && (
          <div id={idListe} className="pb-3">
            <label className="flex flex-col gap-1.5 text-sm font-medium lg:max-w-sm">
              {t('accueil.commune.choisir')}
              <select
                value={communeId}
                onChange={(e) => {
                  choisirCommune(e.target.value);
                  setOuvert(false);
                }}
                className="h-12 rounded-champ border border-bordure bg-blanc px-3 text-base text-encre"
              >
                {communes.data.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
