/**
 * useUnMount
 * 使用方法：useUnMount(()=>xxx)
 */

import { useEffect, useRef } from "react";

export const useUnMount = (fn: () => any): void => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
};
