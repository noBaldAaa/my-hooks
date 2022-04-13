/**
 * 防抖Effect hooks
 */

import { useState } from "react";
import { useDebounceEffect } from "../hooks/useDebounceEffect";
const UseDebounceEffectDemo = () => {
  const [number, setNumber] = useState("100");
  const [double, setDouble] = useState(0);

  useDebounceEffect(
    () => {
      setDouble(Number(number) * 2);
    },
    [number],
    1000
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <div>{double}</div>
    </div>
  );
};

export default UseDebounceEffectDemo;
