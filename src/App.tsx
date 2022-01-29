import React, { useState } from "react";
import { createBaseMatrix, renderMatrix, BlockJSONWriter } from "./matrix";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [matrix, setMatrix] = useState(createBaseMatrix());
  const squareOnClick = (r: number, c: number) => {
    return;
    matrix[r][c].on = matrix[r][c].on ? false : true;
    setMatrix([...matrix]);
  };
  return (
    <div className="App">
      <button onClick={() => setMatrix(createBaseMatrix())}>reset</button>
      {/* {BlockJSONWriter()} */}
      <BlockJSONWriter />
      {/* {renderMatrix(createBaseMatrix(8, 4), squareOnClick)} */}
      {/* {renderMatrix(matrix, squareOnClick)} */}
    </div>
  );
}

export default App;
