/**
 * 例子
 */
import React, { useState } from "react";
import { useUnMount } from "../hooks/useUnMount";

const UseUnmountExample = () => {
  const [num, setNum] = useState(0);

  useUnMount(() => console.log(num, "num"));

  return <div onClick={() => setNum(num + 1)}>{num}</div>;
};

export default UseUnmountExample;
