import { useEffect, useState } from "react";
import { eventBus } from "../../eventBus";

export default function Cart() {
  const [rawCount, setRawCount] = useState(0);
  const [busItems, setBusItems] = useState([]);

  // 1. Lắng nghe bằng CustomEvent thuần (Sẽ MẤT các event phát trước khi Cart mount)
  useEffect(() => {
    const onRawAdd = (e) => {
      setRawCount((c) => c + e.detail.qty);
    };
    window.addEventListener("cart:add-item", onRawAdd);
    return () => window.removeEventListener("cart:add-item", onRawAdd);
  }, []);

  // 2. Lắng nghe qua Typed Event Bus có replay: true (Nhận đủ cả event trước khi mount)
  useEffect(() => {
    const unsubscribe = eventBus.on(
      "cart:add-item",
      (item) => {
        setBusItems((prev) => [...prev, item]);
      },
      { replay: true }
    );
    return unsubscribe;
  }, []);

  const busCount = busItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div style={{ padding: 12, border: "1px solid #3b82f6", background: "#f0f4ff" }}>
      <h3>Cart MFE (remote2 :3003)</h3>
      <p>
        Badge dùng <b>CustomEvent thuần</b> (chỉ tính từ lúc Cart đã mount):{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{rawCount}</span>
      </p>
      <p>
        Badge dùng <b>Typed Event Bus (Replay)</b> (không mất event trước lúc mount):{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>{busCount}</span>
      </p>
    </div>
  );
}

