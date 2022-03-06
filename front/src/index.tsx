import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bulma/css/bulma.min.css";
import { BlockJSONWriter } from "./matrix";
import Dictionary from "../src/views/Dictionary";
import BoardView from "./views/BoardView";
import AllPresets from "./views/AllPresets";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const links = [
  {
    href: "/editor",
    title: "Editor",
  },
  {
    href: "/dict",
    title: "Dictionary",
  },
  {
    href: "/",
    title: "Board",
  },
  {
    href: "/presets",
    title: "Presets",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 className="is-size-3">cool cool cool</h1>
        </div>
        <div className="navbar-start">
          {links.map(({ href, title }) => {
            return (
              <Link className="navbar-item" to={href} key={title}>
                {" "}
                {title}
              </Link>
            );
          })}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<BoardView />}></Route>
        <Route path="/editor" element={<BlockJSONWriter />}></Route>
        <Route path="/dict" element={<Dictionary />}></Route>
        <Route path="/presets" element={<AllPresets />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
