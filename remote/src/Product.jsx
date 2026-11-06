import { bus } from "../../eventBus";

const PRODUCTS = [
  { id: "p1", name: "Bàn phím cơ" },
  { id: "p2", name: "Chuột không dây" },
];

function addToCart(productId) {
  bus.emit("cart:add-item", { productId, qty: 1 });
}

export default function Product() {
  return (
    <div>
      <h2>Products</h2>
      {PRODUCTS.map((p) => (
        <div key={p.id} style={{ marginBottom: 8 }}>
          <span>{p.name}</span>{" "}
          <button onClick={() => addToCart(p.id)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
