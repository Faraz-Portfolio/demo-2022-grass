import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import Tag from "./Tag";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <App />
    <Tag />
  </>
);
