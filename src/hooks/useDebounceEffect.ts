/**
 * 防抖useEffect,期望用法：
 * useDebounceEffect(()=>{},[deps],delay)
 */

import { DependencyList, EffectCallback, useEffect } from "react";

export const useDebounceEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
  delay = 1000
) => {
  useEffect(effect, deps);
  return;
};
