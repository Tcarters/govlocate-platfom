/** « Étape 2 sur 3 » avec une barre de progression. Le libellé vient des traductions. */
export function Etapes({ actuelle, total, libelle }: { actuelle: number; total: number; libelle: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gris-texte">{libelle}</span>
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < actuelle ? 'bg-vert' : 'bg-bordure'}`} />
        ))}
      </div>
    </div>
  );
}
