/**
 * 防抖useEffect,期望用法：
 * useDebounceEffect(()=>{},[deps],delay)
 */

import {
  useState,
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
} from "react";
import { useUnMount } from "./useUnMount";
import { useUpdateEffect } from "./useUpdateEffect";

export const useDebounceEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  delay = 1000
) => {
  const timeoufRef = useRef<ReturnType<typeof setTimeout>>();
  const [refresh, setRefresh] = useState({}); //解决effect中执行销毁函数的问题

  useEffect(() => {
    timeoufRef.current = setTimeout(() => {
      setRefresh({});
    }, delay);

    return () => timeoufRef.current && clearTimeout(timeoufRef.current);
  }, [...deps, delay]);

  useUpdateEffect(effect, [refresh]);

  useUnMount(
    () => () => timeoufRef.current && clearTimeout(timeoufRef.current)
  );
};
