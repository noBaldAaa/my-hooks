/**
 * 保证始终能够拿到最新的state
 */

import { useRef } from "react";

export const useLatestState = <T>(value: T): { current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
