/**
 * 深度比较Effect
 */

import { useState } from "react";
import { useDeepCompareEffect } from "../hooks";

const UseDeepCompareEffectDemo = () => {
  const [obj, setObj] = useState({ a: "1" });
  useDeepCompareEffect(() => {
    console.log("12222");
  }, [obj]);
  return (
    <div>
      UseDeepCompareEffectDemo:
      <button onClick={() => setObj({ a: "2" })}>setObj</button>
    </div>
  );
};

export default UseDeepCompareEffectDemo;
