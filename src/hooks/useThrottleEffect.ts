/**
 * 节流函数
 * 期望用法：  
 * useThrottleEffect(
    () => { //callback },
    [value],
    time,
  );
 */

import { useEffect, useRef, useState } from "react";
import { useUnMount } from "./useUnMount";

export const useThrottleEffect = <T, U extends any[]>(
  fn: (...args: U) => T,
  args: U,
  delay = 200
) => {
  const [state, setState] = useState<T | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextArgs = useRef<U>();

  useEffect(() => {
    if (timeout.current) {
      nextArgs.current = args;
    } else {
      setState(fn(...args));
      const timeoutCallback = () => {
        if (nextArgs.current) {
          setState(fn(...nextArgs.current));
          nextArgs.current = undefined;
        }
        timeout.current = undefined;
      };
      timeout.current = setTimeout(timeoutCallback, delay);
    }
  }, args);

  useUnMount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  return state;
};
