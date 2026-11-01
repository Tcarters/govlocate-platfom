import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function BoutonRetour({ vers }: { vers: string }) {
  const { t } = useTranslation();
  return (
    <Link
      to={vers}
      aria-label={t('retour')}
      className="flex size-11 shrink-0 items-center justify-center rounded-full text-encre hover:bg-fond"
    >
      <ChevronLeft size={24} strokeWidth={2.2} aria-hidden />
    </Link>
  );
}
