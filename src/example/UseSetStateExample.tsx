/**
 * 例子
 */

import { useSetState } from "../hooks";

const UseSetStateExample = () => {
  const [tablePage, setTablePage] = useSetState({
    page: 1,
    pageSize: 10,
  });
  return (
    <div>
      <div>{JSON.stringify(tablePage)}</div>
      <button onClick={() => setTablePage(({ page }) => ({ page: page + 1 }))}>
        setTablePage
      </button>
    </div>
  );
};

export default UseSetStateExample;
