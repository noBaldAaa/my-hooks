import React from "react";
import "./App.css";

import ExampleUseDebounce from "./hooks/useDebounce/Example";
import ExampleUseMount from "./hooks/useMount/Example";
import ExampleUseUnmount from "./hooks/useUnMount/Example";

function App() {
  return (
    <div className="App">
      <div>ExampleUseDebounce:</div>
      <ExampleUseDebounce />
      <ExampleUseMount />
      <ExampleUseUnmount />
    </div>
  );
}

export default App;
