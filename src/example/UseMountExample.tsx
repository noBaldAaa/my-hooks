/**
 * 例子
 */

import { useState } from "react";
import { useMount } from "../hooks/useMount";

const UseMountExample = () => {
  const [num, setNum] = useState(0);

  useMount(() => {
    console.log("useMount");
  });

  return (
    <div>
      num:{num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};

export default UseMountExample;
