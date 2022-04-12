/**
 * 例子
 */
import React, { useState } from "react";
import { useThrottle } from "../hooks/useThrottle";

const UseThrottleDemo = () => {
  const [keyword, setKeyword] = useState("hello");
  const throttleValue = useThrottle(keyword, 1000);

  return (
    <div>
      UseThrottleDemo:
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <span>throttleValue:{throttleValue}</span>
    </div>
  );
};

export default UseThrottleDemo;
