'use client';

import { useCallback, useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');

  const show = useCallback((msg: string) => {
    setMessage('');
    setTimeout(() => setMessage(msg), 0);
  }, []);

  return { message, show };
}
