import { FlaskConical } from 'lucide-react';
import type { ReactNode } from 'react';

/** Bandeau permanent du mode démo : rappelle que les données sont fictives. */
export function BandeauDemo({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="flex items-center justify-center gap-2 bg-jaune px-4 py-1.5 text-sm font-bold text-encre"
    >
      <FlaskConical size={16} aria-hidden />
      {children}
    </div>
  );
}
