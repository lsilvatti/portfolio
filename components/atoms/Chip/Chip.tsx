import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export function Chip({ label, selected = false, className = '', ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/20",
        selected
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-surface border border-border text-muted-foreground hover:bg-surface-hover hover:text-foreground",
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}