/**
 * useUpdateEffect
 * 使用用法与useEffect相同，只是当依赖更新时才会执行
 */
import { useEffect } from "react";
import { useFirstMount } from "./useFirstMount";

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMount();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};
