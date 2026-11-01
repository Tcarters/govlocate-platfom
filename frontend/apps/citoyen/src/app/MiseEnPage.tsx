import { BandeauDemo } from '@govlocate/ui';
import { Calendar, Search, Ticket } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, ScrollRestoration } from 'react-router';

const modeDemo = import.meta.env.VITE_DEMO === 'true';

/** Colonne au format téléphone, centrée sur un grand écran, avec la barre de navigation en bas. */
export function MiseEnPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col bg-fond shadow-[0_0_0_1px_var(--color-bordure)]">
      {modeDemo && <BandeauDemo>{t('demo.bandeau')}</BandeauDemo>}
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <nav
        aria-label={t('navigation.libelle')}
        className="sticky bottom-0 grid h-17 grid-cols-3 border-t border-bordure bg-blanc"
      >
        <LienNavigation vers="/" icone={<Search size={24} aria-hidden />} libelle={t('navigation.rechercher')} />
        <LienNavigation
          vers="/rendez-vous"
          icone={<Calendar size={24} aria-hidden />}
          libelle={t('navigation.mesRendezVous')}
        />
        <LienNavigation vers="/ticket" icone={<Ticket size={24} aria-hidden />} libelle={t('navigation.monTicket')} />
      </nav>
      <ScrollRestoration />
    </div>
  );
}

function LienNavigation({ vers, icone, libelle }: { vers: string; icone: ReactNode; libelle: string }) {
  return (
    <NavLink
      to={vers}
      end
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1 text-[13px] no-underline ${
          isActive ? 'font-bold text-vert' : 'font-medium text-gris-texte'
        }`
      }
    >
      {icone}
      {libelle}
    </NavLink>
  );
}
