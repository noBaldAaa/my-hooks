/**
 * useUpdateEffect的example
 */

import { useState } from "react";
import { useUpdateEffect } from "../hooks/useUpdateEffect";

const UseUpdateEffectExample = () => {
  const [num, setNum] = useState(0);

  useUpdateEffect(() => {
    console.log(num, "123456");

    return () => {
      console.log("销毁之前num:", num);
    };
  }, [num]);

  return (
    <div>
      {num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};

export default UseUpdateEffectExample;
