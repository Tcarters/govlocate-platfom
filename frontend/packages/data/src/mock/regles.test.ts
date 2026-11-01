import { describe, expect, it } from 'vitest';
import type { Ticket } from '../types';
import {
  appliquerAction,
  fileOrdonnee,
  numeroTicket,
  personnesAvant,
  TransitionInterdite,
} from './regles';

const MAINTENANT = '2026-11-09T08:30:00+00:00';

function ticket(champs: Partial<Ticket> & Pick<Ticket, 'id' | 'emisLe'>): Ticket {
  return {
    numero: champs.id,
    statut: 'en_attente',
    canal: 'web',
    serviceId: 'svc-acte-naissance-agoe-1',
    remisEnFile: false,
    ...champs,
  };
}

describe('numeroTicket', () => {
  it('préfixe R pour le serveur et G<n> pour le guichet, sur 3 chiffres', () => {
    expect(numeroTicket({ type: 'serveur' }, 12)).toBe('R-012');
    expect(numeroTicket({ type: 'guichet', numero: 2 }, 34)).toBe('G2-034');
    expect(numeroTicket({ type: 'guichet', numero: 2 }, 1034)).toBe('G2-1034');
  });
});

describe('appliquerAction', () => {
  it("suit le cycle attente, appel, service et horodate chaque étape", () => {
    const appele = appliquerAction(ticket({ id: 'R-001', emisLe: '08:00' }), 'appeler', MAINTENANT, 2);
    expect(appele).toMatchObject({ statut: 'appele', appeleLe: MAINTENANT, guichet: 2 });

    const servi = appliquerAction(appele, 'servir', MAINTENANT);
    expect(servi).toMatchObject({ statut: 'servi', serviLe: MAINTENANT });
  });

  it("refuse de servir un ticket qui n'a pas été appelé", () => {
    expect(() =>
      appliquerAction(ticket({ id: 'R-001', emisLe: '08:00' }), 'servir', MAINTENANT),
    ).toThrow(TransitionInterdite);
  });

  it("ne remet un absent en file qu'une seule fois", () => {
    const absent = ticket({ id: 'R-001', emisLe: '08:00', statut: 'absent' });
    const remis = appliquerAction(absent, 'remettre_en_file', MAINTENANT);
    expect(remis).toMatchObject({ statut: 'en_attente', remisEnFile: true });

    const deNouveauAbsent = appliquerAction(
      appliquerAction(remis, 'appeler', MAINTENANT, 2),
      'marquer_absent',
      MAINTENANT,
    );
    expect(() => appliquerAction(deNouveauAbsent, 'remettre_en_file', MAINTENANT)).toThrow(
      TransitionInterdite,
    );
  });
});

describe('ordre de la file', () => {
  const tickets = [
    ticket({ id: 'G2-035', emisLe: '2026-11-09T08:05:00Z', canal: 'guichet' }),
    ticket({ id: 'R-009', emisLe: '2026-11-09T07:52:00Z' }),
    ticket({ id: 'GL-7K4P', emisLe: '2026-11-09T08:20:00Z', rendezVousId: 'rdv-1' }),
    ticket({ id: 'R-008', emisLe: '2026-11-09T07:40:00Z', statut: 'servi' }),
  ];

  it("place les rendez-vous en tête, puis suit l'heure d'émission, sans les tickets terminés", () => {
    expect(fileOrdonnee(tickets).map((t) => t.id)).toEqual(['GL-7K4P', 'R-009', 'G2-035']);
  });

  it('compte les personnes avant un ticket', () => {
    expect(personnesAvant(tickets, 'GL-7K4P')).toBe(0);
    expect(personnesAvant(tickets, 'G2-035')).toBe(2);
    expect(personnesAvant(tickets, 'R-008')).toBeNull();
  });
});
