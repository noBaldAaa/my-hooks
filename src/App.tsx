import React from "react";
import "./App.css";

import UseDebounceExample from "./example/UseDebounceExample";
import UseMountExample from "./example/UseMountExample";
import UseSetStateExample from "./example/UseSetStateExample";
import UseUnmountExample from "./example/UseUnmountExample";
import UseUpdateEffectExample from "./example/UseUpdateEffectExample";

function App() {
  return (
    <div className="App">
      <UseDebounceExample />
      <UseMountExample />
      <UseUnmountExample />
      <UseUpdateEffectExample />
      <UseSetStateExample />
    </div>
  );
}

export default App;
