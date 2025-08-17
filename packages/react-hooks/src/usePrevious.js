// usePrevious.js
// Returns the previous value of a prop or state
import { useRef, useEffect } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
