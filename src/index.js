// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const preloader = document.getElementById("preloader");

const root = ReactDOM.createRoot(rootElement);

function hidePreloader() {
  if (preloader) {
    preloader.style.display = "none";
  }
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App onLoaded={hidePreloader} />
    </BrowserRouter>
  </React.StrictMode>
);
