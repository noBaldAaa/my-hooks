/**
 * 优雅的管理boolean类型state
 */

import { useState } from "react";

export const useBoolean = (flag: boolean) => {
  const [_flag, setFlag] = useState(flag);

  const toggle = () => {
    setFlag(!_flag);
  };

  return [_flag, { toggle }] as const;
};
