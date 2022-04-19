/**
 * 反转boolean hooks
 */

import { useBoolean } from "../hooks";

const UseBooleanDemo = () => {
  const [state, { toggle }] = useBoolean(true);
  return (
    <div>
      UseBooleanDemo
      <br />
      state:{JSON.stringify(state)}
      <button onClick={toggle}>toggle</button>
    </div>
  );
};

export default UseBooleanDemo;
