'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import type { ToastMessage } from '@/hooks';

const toastVariants = cva(
  [
    'fixed z-50 px-4 py-3 rounded-xl flex items-start gap-3',
    'bg-surface border border-border shadow-lg',
    'text-sm text-foreground',
    'pointer-events-none select-none',
    'border-l-4',
  ],
  {
    variants: {
      position: {
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
      },
      variant: {
        default: 'border-l-border',
        primary: 'border-l-primary',
        success: 'border-l-green-500',
        warning: 'border-l-amber-500',
        error: 'border-l-red-500',
      }
    },
    defaultVariants: {
      position: 'bottom-center',
      variant: 'default',
    },
  },
);

export type ToastPosition = NonNullable<VariantProps<typeof toastVariants>['position']>;

export interface ToastProps extends Omit<VariantProps<typeof toastVariants>, 'variant'> {
  message: ToastMessage | null;
  duration?: number;
  className?: string;
}

export function Toast({ message, position, duration = 2500, className }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    clearTimeout(fadeTimer.current);
    clearTimeout(hideTimer.current);

    setFading(false);
    setVisible(true);

    fadeTimer.current = setTimeout(() => setFading(true), duration);
    hideTimer.current = setTimeout(() => setVisible(false), duration + 350);

    return () => {
      clearTimeout(fadeTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, [message, duration]);

  if (!mounted || !visible || !message) return null;

  const currentVariant = message?.variant || 'default';

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={cn(
        toastVariants({ position, variant: currentVariant }),
        fading ? 'animate-toast-out' : 'animate-toast-in',
        className,
      )}
    >
      <div className='flex flex-col'>
        <Typography variant="body" className="font-medium text-foreground">
          {message.title}
        </Typography>
        
        {message.description && (
          <Typography variant="body" className="text-[13px] text-muted-foreground leading-tight mt-0.5">
            {message.description}
          </Typography>
        )}
      </div>
    </div>,
    document.body,
  );
}

export { toastVariants };