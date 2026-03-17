import React from 'react';
import { cn } from '@/lib/utils';

export function BlockQuote({ className, children, ...props }: React.QuoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-primary bg-surface/30 pl-4 py-3 my-6 italic text-muted-foreground rounded-r-lg shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}