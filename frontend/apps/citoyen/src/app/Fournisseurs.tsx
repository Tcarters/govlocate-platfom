import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { routeur } from './routeur';

const clientRequetes = new QueryClient({
  defaultOptions: {
    // Réseau lent ou coupé : on garde les données affichées et on ne relance pas en boucle.
    queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false },
  },
});

export function Fournisseurs() {
  return (
    <QueryClientProvider client={clientRequetes}>
      <RouterProvider router={routeur} />
    </QueryClientProvider>
  );
}
