/**
 * useUpdateEffect
 * 使用用法与useEffect相同，只是当依赖更新时才会执行
 */
import { DependencyList, useEffect, useRef } from "react";
export const useUpdateEffect = (effect: () => any, deps?: DependencyList) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      effect();
    }

    return () => {
      ref.current = true;
    };
  }, deps);
};
