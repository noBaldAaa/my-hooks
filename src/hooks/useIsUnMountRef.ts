/**
 * 组件是否已经卸载Ref
 */

import { useRef } from "react";
import { useUnMount } from "./useUnMount";

export const useIsUnMountRef = () => {
  const isUnMountRef = useRef(false);
  useUnMount(() => (isUnMountRef.current = true));
  return isUnMountRef;
};
