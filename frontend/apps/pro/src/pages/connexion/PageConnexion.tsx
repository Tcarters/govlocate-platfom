import { Logo } from '@govlocate/ui';
import { ChevronRight, LayoutDashboard, Megaphone } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

/** Connexion de démonstration : un compte d'agent et un compte de responsable, sans mot de passe. */
export function PageConnexion() {
  const { t } = useTranslation();
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-5 py-10">
      <div className="flex justify-center">
        <Logo suffixe={t('suffixe')} couleurTexte="text-encre" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('connexion.titre')}</h1>
        <p className="text-gris-texte">{t('connexion.texte')}</p>
      </div>
      <div className="flex flex-col gap-3">
        <CompteDemo
          vers="/guichet"
          icone={<Megaphone size={24} aria-hidden />}
          titre={t('connexion.agent')}
          detail={t('connexion.agentDetail')}
        />
        <CompteDemo
          vers="/console"
          icone={<LayoutDashboard size={24} aria-hidden />}
          titre={t('connexion.responsable')}
          detail={t('connexion.responsableDetail')}
        />
      </div>
    </main>
  );
}

function CompteDemo({ vers, icone, titre, detail }: { vers: string; icone: ReactNode; titre: string; detail: string }) {
  return (
    <Link
      to={vers}
      className="flex min-h-18 items-center gap-4 rounded-carte border border-bordure bg-blanc px-4 py-3 text-encre no-underline hover:border-vert"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-vert-clair text-vert">
        {icone}
      </span>
      <span className="flex flex-1 flex-col">
        <span className="font-bold">{titre}</span>
        <span className="text-sm text-gris-texte">{detail}</span>
      </span>
      <ChevronRight size={22} className="text-gris-texte" aria-hidden />
    </Link>
  );
}
