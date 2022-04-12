/**
 * 节流hooks 用法:const value=useThrottle(state,500)
 */

import { useRef, useState } from "react";
import { useUnMount } from "./useUnMount";
import { useUpdateEffect } from "./useUpdateEffect";

export const useThrottle = <T>(initialState: T, delay = 5000) => {
  const [state, setState] = useState<T>(initialState);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(false);

  useUpdateEffect(() => {
    if (timeout.current) {
      nextValue.current = initialState;
      hasNextValue.current = true;
    } else {
      setState(initialState);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setState(nextValue.current);
        }
        timeout.current = undefined;
      };
      timeout.current = setTimeout(timeoutCallback, delay);
    }
  }, [initialState]);

  useUnMount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  return state;
};
