import { useMemo, useEffect, useRef } from 'react';
import debounce from '../lib/debounce';

const useDebounce = (callback, ms = 300) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, ms);
  }, [ms]);

  return debouncedCallback;
};

export default useDebounce
