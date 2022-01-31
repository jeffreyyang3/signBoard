import { useLocation } from "react-router-dom";
import React, { useState } from "react";

type DisplayMatrix = Array<Array<MatrixItem>>;
interface MatrixItem {
  on: Boolean;
}

// one block: 8 rows and 4 cols
// 16 rows 32 cols
function createBaseMatrix(r = 16, c = 32): DisplayMatrix {
  return Array(r)
    .fill(null)
    .map((_) =>
      Array(c)
        .fill(null)
        .map(() => ({
          on: false,
        }))
    );
}
function BlockJSONWriter() {
  const location = useLocation();
  const { initial } = (location.state ?? {}) as { initial?: DisplayMatrix };
  const [matrix, setMatrix] = useState(initial || createBaseMatrix(7, 5));
  const [populateVal, setPopulateVal] = useState("");
  const setFromJSON = (val: string) => {
    try {
      setMatrix(JSON.parse(val));
    } catch (e) {
      console.log(e);
    }
    setPopulateVal("");
  };
  const reset = () => setMatrix(createBaseMatrix(7, 5));
  return (
    <div style={{ margin: "10px" }}>
      <textarea
        value={populateVal}
        onChange={(e) => setPopulateVal(e.target.value)}
      />
      <button onClick={() => setFromJSON(populateVal)}> set from json </button>
      <button onClick={reset}>reset</button>
      {renderMatrix(matrix, (r, c) => {
        matrix[r][c].on = matrix[r][c].on ? false : true;
        setMatrix([...matrix]);
      })}
      <div>{JSON.stringify(matrix)}</div>
      <button
        onClick={() => navigator.clipboard.writeText(JSON.stringify(matrix))}
      >
        copy to clipboard
      </button>
    </div>
  );
}

function renderMatrix(
  matrix: DisplayMatrix,
  squareOnClick: (r: number, c: number) => void
) {
  return matrix.map((row, rIdx) => {
    return (
      <div key={rIdx} className="matrixRow">
        {row.map((itemVal: MatrixItem, cIdx) => {
          return (
            <div
              style={
                {
                  backgroundColor: itemVal.on ? "#000000" : "#ffffff",
                  border: "1px solid red",
                } as React.CSSProperties
              }
              onClick={() => squareOnClick(rIdx, cIdx)}
              onMouseOver={(e) => e.buttons === 1 && squareOnClick(rIdx, cIdx)}
              className="matrixItem"
              key={cIdx}
            ></div>
          );
        })}
      </div>
    );
  });
}

export type { DisplayMatrix, MatrixItem };
export { renderMatrix, createBaseMatrix, BlockJSONWriter };
