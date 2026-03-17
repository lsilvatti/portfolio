'use client';

import { useCallback, useState } from 'react';

// Exportamos o tipo para poder reaproveitar no componente do Toast
export type ToastVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export function useToast() {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const show = useCallback((msg: ToastMessage) => {
    setMessage(null);
    setTimeout(() => setMessage(msg), 0);
  }, []);

  return { message, show };
}