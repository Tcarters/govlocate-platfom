import { BandeauDemo } from '@govlocate/ui';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

const modeDemo = import.meta.env.VITE_DEMO === 'true';

export function MiseEnPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-dvh flex-col bg-fond">
      {modeDemo && <BandeauDemo>{t('demo.bandeau')}</BandeauDemo>}
      <Outlet />
    </div>
  );
}
