import { createBrowserRouter } from 'react-router';
import { PageAccueil } from '../pages/accueil/PageAccueil';
import { PageEnPreparation } from '../pages/PageEnPreparation';
import { PageIntrouvable } from '../pages/PageIntrouvable';
import { PageResultats } from '../pages/resultats/PageResultats';
import { MiseEnPage } from './MiseEnPage';

// Routes de frontend-context.md, « Routes ». Les écrans arrivent au fil du plan jour par jour.
export const routeur = createBrowserRouter([
  {
    element: <MiseEnPage />,
    children: [
      { index: true, element: <PageAccueil /> },
      { path: 'demarches/:demarcheId', element: <PageResultats /> },
      { path: 'rendez-vous', element: <PageEnPreparation /> },
      { path: 'ticket', element: <PageEnPreparation /> },
      { path: '*', element: <PageIntrouvable /> },
    ],
  },
]);
