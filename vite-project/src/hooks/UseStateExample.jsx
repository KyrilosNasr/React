import { useState } from "react";

const UseStateExample = () => {
  const [count, setCount] = useState(0);

  const increamentHandeler = () => {
    setCount(count + 1);
  };
  const decreamentHandeler = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <button onClick={increamentHandeler}>+</button>
      <span> {count} </span>
      <button onClick={decreamentHandeler}>-</button>
    </div>
  );
};
export default UseStateExample;
