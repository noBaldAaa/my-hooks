/**
 * 防抖useEffect,期望用法：
 * useDebounceEffect(()=>{},[deps],delay)
 */

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useDebounceEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
  delay = 1000
) => {
  const timeoufRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeoufRef.current = setTimeout(() => {
      effect();
    }, delay);

    return () => timeoufRef.current && clearTimeout(timeoufRef.current);
  }, deps);
};
