import { BandeauDemo, Logo } from '@govlocate/ui';
import { Calendar, Search, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, ScrollRestoration } from 'react-router';

const modeDemo = import.meta.env.VITE_DEMO === 'true';

const liens = [
  { vers: '/', Icone: Search, cle: 'navigation.rechercher' },
  { vers: '/rendez-vous', Icone: Calendar, cle: 'navigation.mesRendezVous' },
  { vers: '/ticket', Icone: Ticket, cle: 'navigation.monTicket' },
] as const;

/**
 * Pleine largeur, avec la navigation en bas sur téléphone et en haut à partir de 1024 px.
 * Il y a deux barres plutôt qu'une déplacée en CSS : le clavier suit ainsi l'ordre de l'écran.
 */
export function MiseEnPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-dvh flex-col bg-fond">
      {modeDemo && <BandeauDemo>{t('demo.bandeau')}</BandeauDemo>}
      <BarreHaut />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <BarreBas />
      <ScrollRestoration />
    </div>
  );
}

function BarreHaut() {
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 z-10 hidden bg-vert text-blanc lg:block">
      <div className="largeur-page flex h-16 items-center justify-between px-5">
        <Logo />
        <nav aria-label={t('navigation.libelle')} className="flex gap-1">
          {liens.map(({ vers, Icone, cle }) => (
            <NavLink
              key={vers}
              to={vers}
              end
              className={({ isActive }) =>
                `flex h-12 items-center gap-2 rounded-champ px-3 no-underline hover:bg-vert-fonce ${
                  isActive ? 'bg-vert-fonce font-bold' : 'font-medium'
                }`
              }
            >
              <Icone size={20} aria-hidden />
              {t(cle)}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

function BarreBas() {
  const { t } = useTranslation();
  return (
    <nav
      aria-label={t('navigation.libelle')}
      className="sticky bottom-0 grid h-17 grid-cols-3 border-t border-bordure bg-blanc lg:hidden"
    >
      {liens.map(({ vers, Icone, cle }) => (
        <NavLink
          key={vers}
          to={vers}
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-[13px] no-underline ${
              isActive ? 'font-bold text-vert' : 'font-medium text-gris-texte'
            }`
          }
        >
          <Icone size={24} aria-hidden />
          {t(cle)}
        </NavLink>
      ))}
    </nav>
  );
}
