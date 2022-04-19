/**
 * 倒计时hooks demo
 */

import { useCountdown } from "../hooks";

const UseCountDownDemo = () => {
  const [timestamp, { days, hours, minutes, seconds }] = useCountdown({
    targetDate: "2022-12-31 24:00:00",
  });
  return (
    <div>
      UseCountDownDemo
      <br />
      倒计时:{days}-{hours}-{minutes}-{seconds}
    </div>
  );
};

export default UseCountDownDemo;
