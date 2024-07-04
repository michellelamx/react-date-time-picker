import { useRef } from 'react';

export function useTimePickerRefs() {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLButtonElement>(null);

  const refs = {
    minuteRef,
    hourRef,
    periodRef,
  };

  const focusNext = (current: 'hour' | 'minute' | 'period', direction: 'left' | 'right') => {
    if (current === 'hour' && direction === 'right') minuteRef.current?.focus();
    if (current === 'minute' && direction === 'left') hourRef.current?.focus();
    if (current === 'minute' && direction === 'right') periodRef.current?.focus();
    if (current === 'period' && direction === 'left') minuteRef.current?.focus();
  };

  return { refs, focusNext };
}
