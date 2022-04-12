/**
 * 节流Effect
 */

import React, { useState } from "react";
import { useThrottleEffect } from "../hooks";

const UseThrottleEffectExample = () => {
  const [state, setState] = useState("hello world");

  useThrottleEffect(
    (s) => {
      console.log(s, "s");
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
