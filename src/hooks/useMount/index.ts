import { EffectCallback, useEffect } from "react";
/**
 * 使用方式：
 * useMount(()=>{xxx})
 */

export const useMount = (callback: EffectCallback) => {
  if (typeof callback !== "function") {
    return console.error("callback不为function类型");
  }
  useEffect(callback, []);
};
