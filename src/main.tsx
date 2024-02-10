import React from "react";
import ReactDOM from "react-dom/client";
import Explorer from "./TreeView";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <article className="content">
      <h1 className="title">TreeView</h1>
      <Explorer title="root"  />
    </article>
  </React.StrictMode>
);
