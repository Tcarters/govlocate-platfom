import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Fournisseurs } from './app/Fournisseurs';
import './i18n';
import './styles.css';

createRoot(document.getElementById('racine')!).render(
  <StrictMode>
    <Fournisseurs />
  </StrictMode>,
);
