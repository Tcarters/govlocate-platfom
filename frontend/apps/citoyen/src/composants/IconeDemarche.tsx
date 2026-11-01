import type { IconeDemarche as TypeIcone } from '@govlocate/data';
import {
  BookUser,
  FileText,
  HeartHandshake,
  IdCard,
  ScrollText,
  Zap,
  Droplet,
  type LucideIcon,
} from 'lucide-react';

const icones: Record<TypeIcone, LucideIcon> = {
  acte: FileText,
  identite: IdCard,
  passeport: BookUser,
  electricite: Zap,
  eau: Droplet,
  mariage: HeartHandshake,
  deces: ScrollText,
};

export function IconeDemarche({ icone, taille = 26 }: { icone: TypeIcone; taille?: number }) {
  const Icone = icones[icone];
  return <Icone size={taille} strokeWidth={2} aria-hidden />;
}
