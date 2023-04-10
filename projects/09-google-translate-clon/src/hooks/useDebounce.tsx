import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /* IMPORTANT: This function not only is executed when the component is unmounted,
    but also when the value changes */
    return () => {
      console.log('pe');
      clearTimeout(timeout);
    }
  }, [value, delay]);

  return debouncedValue;
}
