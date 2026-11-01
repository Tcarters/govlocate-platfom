/** Chiffre clé du guichet ou du tableau de bord : « En attente 6 ». */
export function Indicateur({ libelle, valeur }: { libelle: string; valeur: string | number }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-champ border border-bordure bg-blanc px-4 py-3">
      <span className="text-sm text-gris-texte">{libelle}</span>
      <span className="text-[28px] font-bold">{valeur}</span>
    </div>
  );
}
