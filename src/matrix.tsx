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
  const [matrix, setMatrix] = useState(createBaseMatrix(7, 5));
  const [populateVal, setPopulateVal] = useState("");
  const setFromJSON = (val: string) => {
    try {
      setMatrix(JSON.parse(val));
    } catch (e) {
      console.log(e);
    }
    setPopulateVal("");
  };
  return (
    <div>
      <input
        type="text"
        value={populateVal}
        onChange={(e) => setPopulateVal(e.target.value)}
      />
      <button onClick={() => setFromJSON(populateVal)}> set from json </button>
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
              className="matrixItem"
              key={cIdx}
            ></div>
          );
        })}
      </div>
    );
  });
}

export { renderMatrix, createBaseMatrix, BlockJSONWriter };
