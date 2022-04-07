/**
 * useUpdateEffect
 * 使用用法与useEffect相同，只是当依赖更新时才会执行
 */
import { useEffect } from "react";
import { useFirstMountState } from "./useFirstMountState";

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};
