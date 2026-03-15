'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  [
    'fixed z-50 px-4 py-2.5 rounded-xl',
    'border border-border bg-surface shadow-lg',
    'text-sm text-foreground',
    'pointer-events-none select-none',
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
    },
    defaultVariants: {
      position: 'bottom-center',
    },
  },
);

export type ToastPosition = NonNullable<VariantProps<typeof toastVariants>['position']>;

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
  /** Duration in ms before the toast fades out. Default: 2500 */
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

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={cn(
        toastVariants({ position }),
        fading ? 'animate-toast-out' : 'animate-toast-in',
        className,
      )}
    >
      {message}
    </div>,
    document.body,
  );
}

export { toastVariants };
