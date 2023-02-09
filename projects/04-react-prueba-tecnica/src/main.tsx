import { createRoot } from "react-dom/client";
// import React from "react";
import App from "./App";
import './index.css';

createRoot(document.getElementById("app") as HTMLElement).render(
    <App />
  // <React.StrictMode>
  // </React.StrictMode>
);
