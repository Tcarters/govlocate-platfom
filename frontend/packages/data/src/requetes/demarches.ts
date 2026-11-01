import { useQuery } from '@tanstack/react-query';
import { source } from '../choix-source';

export function useDemarches() {
  return useQuery({ queryKey: ['demarches'], queryFn: () => source.listerDemarches() });
}

export function useDemarche(demarcheId: string) {
  return useQuery({
    queryKey: ['demarches', demarcheId],
    queryFn: () => source.lireDemarche(demarcheId),
  });
}

export function useCommunes() {
  return useQuery({ queryKey: ['communes'], queryFn: () => source.listerCommunes() });
}
