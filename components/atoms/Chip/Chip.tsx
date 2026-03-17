import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
  variant?: 'default' | 'outline' | 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';
  selectable?: boolean;
  active?: boolean;
}

const chipVariant = cva(
  [
    "px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary/20"
  ],
  {
    variants: {
      variant: {
        default: "bg-surface border border-border text-muted-foreground",
        outline: "border border-border bg-transparent text-foreground",
        primary: "bg-primary text-primary-foreground border border-transparent shadow-sm",
        secondary: "bg-secondary text-secondary-foreground border border-transparent shadow-sm",
        'outline-primary': "border border-primary bg-transparent text-primary",
        'outline-secondary': "border border-secondary bg-transparent text-secondary"
      },
      selected: {
        true: "",
        false: "",
      },
      selectable: {
        true: "cursor-pointer",
        false: "cursor-default"
      },
      active: {
        true: "",
        false: "opacity-50 cursor-not-allowed pointer-events-none grayscale"
      }
    },
    compoundVariants: [
      { variant: 'default', selectable: true, selected: false, active: true, className: 'hover:bg-surface-hover hover:text-foreground' },
      { variant: 'outline', selectable: true, selected: false, active: true, className: 'hover:bg-surface hover:text-foreground' },
      { variant: 'primary', selectable: true, selected: false, active: true, className: 'hover:bg-primary/90' },
      { variant: 'secondary', selectable: true, selected: false, active: true, className: 'hover:bg-secondary/90' },
      { variant: 'outline-primary', selectable: true, selected: false, active: true, className: 'hover:bg-primary/10' },
      { variant: 'outline-secondary', selectable: true, selected: false, active: true, className: 'hover:bg-secondary/10' },

      { variant: 'default', selected: true, active: true, className: 'bg-primary text-background border-primary shadow-md' },
      { variant: 'outline', selected: true, active: true, className: 'bg-foreground text-background border-primary shadow-md' },

      { variant: 'primary', selected: true, active: true, className: 'ring-2 ring-primary ring-offset-2 ring-offset-background' },
      { variant: 'secondary', selected: true, active: true, className: 'ring-2 ring-secondary ring-offset-2 ring-offset-background' },

      { variant: 'outline-primary', selected: true, active: true, className: 'bg-primary text-primary-foreground border-primary shadow-sm' },
      { variant: 'outline-secondary', selected: true, active: true, className: 'bg-secondary text-secondary-foreground border-secondary shadow-sm' }
    ],

    defaultVariants: {
      variant: 'default',
      selected: false,
      selectable: false,
      active: true,
    }
  }
)

export function Chip({ label, selected = false, variant = 'default', selectable = false, active = true, className = '', ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        chipVariant({ variant, selected, selectable, active }),
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}