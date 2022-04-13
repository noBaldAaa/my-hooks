/**
 * 防止内存泄漏的example
 * React已删除该警告⚠️[https://github.com/facebook/react/blob/main/CHANGELOG.md]
 */

import { useEffect, useState } from "react";
import { useSafeState } from "../hooks";

const Child = () => {
  const [data, setData] = useSafeState<any[]>(["1"]);

  useEffect(() => {
    setTimeout(() => {
      setData([...data, "2"]);
    }, 5000);
  }, []);

  return (
    <div>
      child:
      {data.map((s) => s)}
    </div>
  );
};

const UseSafeStateExample = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      {visible && <Child />}
      <button onClick={() => setVisible(false)}>隐藏</button>
    </div>
  );
};

export default UseSafeStateExample;
