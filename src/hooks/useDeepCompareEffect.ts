/**
 * 进行深度比较Effect
 */
import { useEffect, useRef } from "react";
import type { DependencyList, EffectCallback } from "react";
import _ from "lodash";

const isEqual = (a: any, b: any): boolean => {
  return _.isEqual(a, b);
};

export const useDeepCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList
) => {
  const preRef = useRef<DependencyList>();
  const updateRef = useRef<number>(1);

  if (isEqual(preRef.current, deps)) {
    //相同则不处理
  } else {
    preRef.current = deps; //更新之前deps
    updateRef.current += 1; //更新updateRef 让useEffect执行
  }

  useEffect(effect, [updateRef.current]);
};
