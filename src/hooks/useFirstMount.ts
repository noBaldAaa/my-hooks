/**
 * 判断是不是第一次渲染
 */

import { useRef } from "react";

export function useFirstMount(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
