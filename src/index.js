//React 17
// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./components/app";

// import "./index.css";

// ReactDOM.render(<App />, document.getElementById("root"));

//React 18
import { createRoot } from "react-dom/client";

import App from "./components/app";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<App />);
