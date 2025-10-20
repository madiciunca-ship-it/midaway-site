import "./styles/theme.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

// ajută la prins erori globale care duc la pagină albă
window.addEventListener("error", (e) => {
  console.error("🌍 window error:", e.message, e.error);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("🌍 unhandled rejection:", e.reason);
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
