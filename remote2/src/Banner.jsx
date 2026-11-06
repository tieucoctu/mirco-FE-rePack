import React from "react";

export default function Banner() {
  console.log("Banner đang chạy React", React.version);
  return (
    <div style={{ padding: "10px", background: "#f0f4ff", border: "1px solid #3b82f6", marginBottom: "10px" }}>
      <h2>Remote 2 Banner (React {React.version})</h2>
    </div>
  );
}

