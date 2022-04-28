/**
 * 例子
 */
import { useState } from "react";
import { useUnMount } from "../hooks/useUnMount";

const Child = () => {
  const [num, setNum] = useState(0);
  useUnMount(() => console.log(num, "num"));
  return (
    <div>
      num:{num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};

const UseUnmountExample = () => {
  const [showFlag, setShowFlag] = useState(true);

  return (
    <div>
      {showFlag && <Child />}
      <button onClick={() => setShowFlag(false)}>销毁child</button>
    </div>
  );
};

export default UseUnmountExample;
