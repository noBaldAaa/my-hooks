/**
 * 例子
 */

import { useMount } from "../hooks/useMount";

const UseMountExample = () => {
  useMount(() => {
    console.log("useMount");
  });

  return <div>UseMountExample</div>;
};

export default UseMountExample;
