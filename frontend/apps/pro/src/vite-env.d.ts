/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE?: 'mock' | 'api';
  /** « true » affiche le bandeau de démonstration. */
  readonly VITE_DEMO?: string;
}
