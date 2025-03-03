import React, { useState, useEffect } from "react";

const Counter = ({ label, end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter += Math.ceil(end / 50);
      if (counter >= end) {
        counter = end;
        clearInterval(interval);
      }
      setCount(counter);
    }, 50);
  }, [end]);

  return (
    <div className="counter-box">
      <h2>{count}+</h2>
      <p>{label}</p>
    </div>
  );
};

export default Counter;
