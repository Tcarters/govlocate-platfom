// Types du domaine, d'après docs/architecture/03-modele-domaine.md et 04-etats.md.
// Les noms métier restent en français, sans accents.

export type Canal = 'web' | 'sms' | 'ussd' | 'guichet';
export type StatutPoint = 'ouvert' | 'ferme' | 'inconnu';
export type TypeOrganisme = 'mairie' | 'etat_civil' | 'documents_identite' | 'CEET' | 'TdE';
export type StatutRdv =
  | 'en_attente_code'
  | 'confirme'
  | 'expire'
  | 'annule'
  | 'honore'
  | 'non_honore';
export type StatutTicket = 'en_attente' | 'appele' | 'servi' | 'absent' | 'annule';

/** Icône affichée sur la tuile d'une démarche. */
export type IconeDemarche =
  | 'acte'
  | 'identite'
  | 'passeport'
  | 'electricite'
  | 'eau'
  | 'mariage'
  | 'deces';

export interface PieceRequise {
  libelle: string;
  obligatoire: boolean;
}

export interface Demarche {
  id: string;
  nom: string;
  description: string;
  icone: IconeDemarche;
  /** Null tant que le tarif officiel n'a pas été relu par une commune. */
  coutOfficielFcfa: number | null;
  /** Null tant que le délai n'a pas été relu par une commune. */
  delaiHabituel: string | null;
  pieces: PieceRequise[];
  /** Affichée parmi les « démarches fréquentes » de l'accueil. */
  frequente: boolean;
}

export interface Commune {
  id: string;
  nom: string;
  prefecture: string;
}

export interface Horaire {
  /** 1 = lundi … 7 = dimanche */
  jour: number;
  ouverture: string;
  fermeture: string;
}

export interface PointDeService {
  id: string;
  nom: string;
  organisme: TypeOrganisme;
  communeId: string;
  adresse: string;
  position: { lat: number; lon: number };
  statut: StatutPoint;
  verifieLe: string | null;
  verifiePar: string | null;
  horaires: Horaire[];
  guichets: number[];
}

export interface ServiceOffert {
  id: string;
  pointId: string;
  demarcheId: string;
  dureeMoyenneMin: number;
  creneauxParHeure: number;
  rdvActif: boolean;
  fileActive: boolean;
}

export interface Creneau {
  id: string;
  serviceId: string;
  debut: string;
  fin: string;
  capacite: number;
  placesRestantes: number;
}

export interface RendezVous {
  id: string;
  codeReservation: string;
  statut: StatutRdv;
  canal: Canal;
  serviceId: string;
  creneauId: string;
  creeLe: string;
  confirmeLe?: string;
  arriveLe?: string;
  annuleLe?: string;
}

export interface Ticket {
  id: string;
  /** « R-012 » émis par le serveur, « G2-034 » émis par le guichet n° 2. */
  numero: string;
  statut: StatutTicket;
  canal: Canal;
  serviceId: string;
  /** Renseigné quand le ticket vient d'un rendez-vous honoré. */
  rendezVousId?: string;
  guichet?: number;
  emisLe: string;
  appeleLe?: string;
  serviLe?: string;
  absentLe?: string;
  annuleLe?: string;
  /** Un usager absent ne peut être remis en file qu'une fois. */
  remisEnFile: boolean;
}
