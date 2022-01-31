import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BlockJSONWriter } from "./matrix";
import Dictionary from "../src/views/Dictionary";
import BoardView from "./views/BoardView";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <nav>
        <Link to="/editor">Editor</Link>
        <Link to="/dict">Dictionary</Link>
        <Link to="/">Board</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BoardView />}></Route>
        <Route path="/editor" element={<BlockJSONWriter />}></Route>
        <Route path="/dict" element={<Dictionary />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
