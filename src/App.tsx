import React from "react";
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
    </div>
  );
}

export default App;
