/**
 * useUpdateEffect的example
 */

import React, { useState } from "react";
import { useUpdateEffect } from "../hooks/useUpdateEffect";

const UseUpdateEffectExample = () => {
  const [num, setNum] = useState(0);

  useUpdateEffect(() => {
    console.log(num, "UseUpdateEffectExample");
    return () => console.log("hello");
  }, [num]);

  return (
    <div>
      {num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};

export default UseUpdateEffectExample;
