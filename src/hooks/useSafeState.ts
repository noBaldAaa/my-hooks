/**
 * 防止一个内存泄漏hooks
 */
import { useState } from "react";
import { useIsUnMountRef } from "./useIsUnMountRef";

export const useSafeState = <T>(initialState: T | (() => T)) => {
  const [state, setState] = useState<T>(initialState);
  const isUnMountRef = useIsUnMountRef();

  const set = (values: T | ((preState: T) => T)) => {
    //如果已经卸载则不处理
    if (!isUnMountRef.current) {
      setState(values);
    }
  };

  return [state, set] as const;
};
