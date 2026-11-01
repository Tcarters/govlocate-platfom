import { createBrowserRouter, Navigate } from 'react-router';
import { PageConnexion } from '../pages/connexion/PageConnexion';
import { PageConsole } from '../pages/console/PageConsole';
import { PageGuichet } from '../pages/guichet/PageGuichet';
import { MiseEnPage } from './MiseEnPage';

export const routeur = createBrowserRouter(
  [
    {
      element: <MiseEnPage />,
      children: [
        { index: true, element: <Navigate to="/connexion" replace /> },
        { path: 'connexion', element: <PageConnexion /> },
        { path: 'guichet', element: <PageGuichet /> },
        { path: 'console', element: <PageConsole /> },
        { path: '*', element: <Navigate to="/connexion" replace /> },
      ],
    },
  ],
  { basename: '/pro' },
);
