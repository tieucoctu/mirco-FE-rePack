import { useEffect, useState } from "react";
import { bus } from "../../eventBus";

export default function CartBadge() {
  // Đọc giá trị hiện tại ngay khi mount (không mất các lần bấm trước đó)
  const [count, setCount] = useState(() => bus.getCartCount());

  useEffect(() => {
    return bus.on("cart:add-item", ({ qty }) => {
      setCount((c) => c + qty);
    });
  }, []);

  return <span>🛒 {count}</span>;
}
