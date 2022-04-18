/**
 * 取前一次的值
 */

import { useEffect, useRef } from "react";

export const usePrevious = <T>(state: T) => {
  const ref = useRef<T>(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
};
