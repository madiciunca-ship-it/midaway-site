import './styles/theme.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";  // ← modificat aici
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter> {/* ← modificat aici */}
    <App />
  </HashRouter>
);
