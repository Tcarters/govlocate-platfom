// Règles de la file d'attente, d'après docs/architecture/04-etats.md.
// Elles sont pures et testées : les tests serviront de référence pour le backend.
import type { StatutTicket, Ticket } from '../types';

export type EmetteurTicket = { type: 'serveur' } | { type: 'guichet'; numero: number };

/** « R-012 » pour le serveur, « G2-034 » pour le guichet n° 2 : deux sources ne se chevauchent jamais. */
export function numeroTicket(emetteur: EmetteurTicket, compteur: number): string {
  const prefixe = emetteur.type === 'serveur' ? 'R' : `G${emetteur.numero}`;
  return `${prefixe}-${String(compteur).padStart(3, '0')}`;
}

export type ActionTicket = 'appeler' | 'servir' | 'marquer_absent' | 'remettre_en_file' | 'annuler';

const transitions: Record<ActionTicket, { depuis: StatutTicket[]; vers: StatutTicket }> = {
  appeler: { depuis: ['en_attente'], vers: 'appele' },
  servir: { depuis: ['appele'], vers: 'servi' },
  marquer_absent: { depuis: ['appele'], vers: 'absent' },
  remettre_en_file: { depuis: ['absent'], vers: 'en_attente' },
  annuler: { depuis: ['en_attente'], vers: 'annule' },
};

export class TransitionInterdite extends Error {
  constructor(ticket: Ticket, action: ActionTicket) {
    super(`Action « ${action} » impossible sur le ticket ${ticket.numero} (${ticket.statut}).`);
    this.name = 'TransitionInterdite';
  }
}

/** Applique une action à un ticket et horodate le changement d'état. */
export function appliquerAction(
  ticket: Ticket,
  action: ActionTicket,
  maintenant: string,
  guichet?: number,
): Ticket {
  const regle = transitions[action];
  if (!regle.depuis.includes(ticket.statut)) throw new TransitionInterdite(ticket, action);
  if (action === 'remettre_en_file' && ticket.remisEnFile) throw new TransitionInterdite(ticket, action);

  const suivant: Ticket = { ...ticket, statut: regle.vers };
  switch (action) {
    case 'appeler':
      return { ...suivant, appeleLe: maintenant, guichet };
    case 'servir':
      return { ...suivant, serviLe: maintenant };
    case 'marquer_absent':
      return { ...suivant, absentLe: maintenant };
    case 'remettre_en_file':
      return { ...suivant, remisEnFile: true, appeleLe: undefined, guichet: undefined };
    case 'annuler':
      return { ...suivant, annuleLe: maintenant };
  }
}

/**
 * Ordre d'appel des tickets en attente. Règle proposée, à valider avec chaque commune :
 * un rendez-vous présent passe avant la file, puis on suit l'heure d'émission.
 */
export function fileOrdonnee(tickets: Ticket[]): Ticket[] {
  return tickets
    .filter((t) => t.statut === 'en_attente')
    .sort((a, b) => {
      const prioriteA = a.rendezVousId ? 0 : 1;
      const prioriteB = b.rendezVousId ? 0 : 1;
      return prioriteA - prioriteB || a.emisLe.localeCompare(b.emisLe);
    });
}

/** Nombre de personnes avant ce ticket, ou null s'il n'est plus en attente. */
export function personnesAvant(tickets: Ticket[], ticketId: string): number | null {
  const index = fileOrdonnee(tickets).findIndex((t) => t.id === ticketId);
  return index === -1 ? null : index;
}
