/**
 * 取之前一次的state demo
 */

import { useState } from "react";
import { usePrevious } from "../hooks";

const UsePreviousDemo = () => {
  const [num, setNum] = useState(1);

  const pre = usePrevious(num);

  return (
    <div>
      num:{num}
      <br />
      pre:{pre}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};

export default UsePreviousDemo;
