/**
 * 例子
 */
import React, { useState } from "react";
import { useDebounce } from ".";

const ExampleUseDebounce = () => {
  const [value, setValue] = useState("hello wrold");
  const debounceValue = useDebounce(value, 1000);

  const handleChanhe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input value={value} onChange={handleChanhe} />
      <span>debounceValue:{debounceValue}</span>
    </div>
  );
};

export default ExampleUseDebounce;
