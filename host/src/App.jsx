import { useState } from "react";
import Remote from "./Remote";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: 8 }}>
        <h1>Host (Shell)</h1>
        <div>
          <button onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? "Đóng menu" : "Mở menu"}
          </button>
          {menuOpen && <Remote id="remote2/CartBadge" name="CartBadge" />}
        </div>
      </header>
      <main style={{ marginTop: 16 }}>
        <Remote id="remote/Product" name="Product" />
      </main>
    </div>
  );
}
