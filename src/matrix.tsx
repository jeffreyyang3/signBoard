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
  return (
    <div>
      {renderMatrix(matrix, (r, c) => {
        matrix[r][c].on = matrix[r][c].on ? false : true;
        setMatrix([...matrix]);
      })}
      <div>{JSON.stringify(matrix)}</div>
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
