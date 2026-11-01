import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';

// Français au MVP. L'éwé et le kabiyè arriveront en V2, avec les mêmes clés.
void i18n.use(initReactI18next).init({
  lng: 'fr',
  fallbackLng: 'fr',
  resources: { fr: { translation: fr } },
  interpolation: { escapeValue: false },
});

export default i18n;
