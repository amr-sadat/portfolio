import { useEffect, useRef, useState } from 'react';

export type CopyEmailState = 'idle' | 'copied' | 'fallback';

const COPY_RESET_MS = 2500;

export function useCopyEmail(email: string) {
  const [copyState, setCopyState] = useState<CopyEmailState>('idle');
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setCopyState('idle');
      resetTimerRef.current = null;
    }, COPY_RESET_MS);
  };

  const copyEmail = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setCopyState('fallback');
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopyState('copied');
      scheduleReset();
    } catch {
      setCopyState('fallback');
    }
  };

  return { copyState, copyEmail } as const;
}
