/**
 * 始终能够保证拿到最新的state
 */

import React from "react";
import { useLatestState } from "../hooks";

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatestState(count);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};
export default Demo;
