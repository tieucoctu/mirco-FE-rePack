import { createRoot } from "react-dom/client";
import App from "./App";
import { setupRemotes } from "./setupRemotes";

setupRemotes().then(() => {
  createRoot(document.getElementById("root")).render(<App />);
});