/**
 * 节流Effect
 */

import { useState } from "react";
import { useThrottleEffect } from "../hooks";

const UseThrottleEffectExample = () => {
  const [state, setState] = useState("hello world");

  useThrottleEffect(
    (_state) => {
      console.log(_state, "_state");
    },
    [state],
    1000
  );

  return (
    <div>
      <input value={state} onChange={(e) => setState(e.target.value)} />
    </div>
  );
};

export default UseThrottleEffectExample;
