import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
  variant?: 'default' | 'outline' | 'primary' | 'secondary';
}

const chipVariant = cva(
  [
    "px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary/20"
  ],
  {
    variants: {
      variant: {
          default: "bg-surface border border-border text-muted-foreground",
          outline: "border border-border bg-transparent text-foreground ",
          primary: "bg-primary text-primary-foreground shadow-sm",
          secondary: "bg-secondary text-secondary-foreground shadow-sm",
      },

      selected: {
        true: "bg-primary text-primary-foreground shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  }
)

export function Chip({ label, selected = false, variant = 'default', className = '', ...props }: ChipProps) {

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        chipVariant({ variant, selected }),
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}