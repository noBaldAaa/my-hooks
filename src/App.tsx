import "./App.css";

import UseDebounceExample from "./example/UseDebounceExample";
import UseMountExample from "./example/UseMountExample";
import UseSafeStateExample from "./example/UseSafeStateExample";
import UseSetStateExample from "./example/UseSetStateExample";
import UseThrottleDemo from "./example/UseThrottleDemo";
import UseUnmountExample from "./example/UseUnmountExample";
import UseUpdateEffectExample from "./example/UseUpdateEffectExample";
import UseThrottleEffectExample from "./example/UseThrottleEffectExample";
import UseLatestStateDemo from "./example/UseLatestStateDemo";
import UseDebounceEffectDemo from "./example/UseDebounceEffectDemo";
import UseDeepCompareEffectDemo from "./example/UseDeepCompareEffectDemo";
import UsePreviousDemo from "./example/UsePreviousDemo";
import UseCountDownDemo from "./example/UseCountDownDemo";

function App() {
  return (
    <div className="App">
      <UseDebounceExample />
      <UseMountExample />
      <UseUnmountExample />
      <UseUpdateEffectExample />
      <UseSetStateExample />
      <UseSafeStateExample />
      <UseThrottleDemo />
      <UseThrottleEffectExample />
      <UseLatestStateDemo />
      <UseDebounceEffectDemo />
      <UseDeepCompareEffectDemo />
      <UsePreviousDemo />
      <UseCountDownDemo />
    </div>
  );
}

export default App;
