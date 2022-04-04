/**
 * 例子
 */
import React from "react";
import { useMount } from ".";

const ExampleUseMount = () => {
  useMount(() => {
    console.log("useMount");
  });

  return <div>ExampleUseMount</div>;
};

export default ExampleUseMount;
