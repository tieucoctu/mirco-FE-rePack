import React, { useState } from "react";

export default function Button() {
  const [count, setCount] = useState(0);
  console.log("Button đang chạy React", React.version);
  return (
    <button onClick={() => setCount(count + 1)}>
      Remote Button - clicked {count} times
    </button>
  );
}