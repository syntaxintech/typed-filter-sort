import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppSort from "./AppSort";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppSort />
  </StrictMode>,
);
