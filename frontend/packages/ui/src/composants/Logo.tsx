import { MapPin } from 'lucide-react';

/** Logo GovLocate : repère jaune et nom. Aucun emblème officiel. */
export function Logo({ suffixe, couleurTexte = 'text-blanc' }: { suffixe?: string; couleurTexte?: string }) {
  return (
    <span className={`flex items-center gap-2 ${couleurTexte}`}>
      <MapPin size={26} strokeWidth={2.2} className="text-jaune" aria-hidden />
      <span className="text-[21px] font-bold tracking-tight">
        GovLocate{suffixe ? ` ${suffixe}` : ''}
      </span>
    </span>
  );
}
