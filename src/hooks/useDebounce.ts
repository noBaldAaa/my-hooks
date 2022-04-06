import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value, delay]);

  return debouncedValue;
}
