import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';

type Variante = 'principal' | 'secondaire' | 'danger' | 'discret';
type Taille = 'normale' | 'grande';

const classesVariante: Record<Variante, string> = {
  principal: 'bg-vert text-blanc hover:bg-vert-fonce',
  secondaire: 'border-2 border-vert bg-blanc text-vert hover:bg-vert-clair',
  danger: 'border-2 border-rouge bg-blanc text-rouge hover:bg-rouge-clair',
  discret: 'bg-transparent text-vert underline hover:text-vert-fonce',
};

const classesTaille: Record<Taille, string> = {
  normale: 'min-h-12 px-4 text-base',
  grande: 'min-h-16 px-6 text-lg',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  taille?: Taille;
  pleineLargeur?: boolean;
  /** Rend l'enfant (un lien, par exemple) avec le style d'un bouton. */
  asChild?: boolean;
};

export function Bouton({
  variante = 'principal',
  taille = 'normale',
  pleineLargeur = false,
  asChild = false,
  className = '',
  type = 'button',
  ...props
}: Props) {
  const Composant = asChild ? Slot : 'button';
  return (
    <Composant
      type={asChild ? undefined : type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-carte font-bold no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        classesVariante[variante],
        classesTaille[taille],
        pleineLargeur ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
