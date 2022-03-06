import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import letters from "./letters/lettersTS";
const BLOCK_ROWS = 7;
const BLOCK_COLS = 5;
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
    <div className="container" style={{ margin: "10px" }}>
      <textarea
        className="textarea"
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

const matrixToString = (matrix: DisplayMatrix) => {
  const vals = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      vals.push(matrix[i][j].on ? 1 : 0);
    }
  }
  return vals.join("");
};

const getMatrixInfoString = (matrix: DisplayMatrix) => {
  return `${matrixToString(matrix)},${matrix.length},${
    (matrix[0] || []).length
  }`;
};

const parseMatrixStringToMatrix = (matrixInfoString: string) => {
  const [matrixString, _rows, _cols] = matrixInfoString.split(",");
  const rows = Number(_rows);
  const cols = Number(_cols);
  const matrix = createBaseMatrix(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = { on: matrixString[i * cols + j] === "1" };
    }
  }
  return matrix;
};
const padOne = (matrix: DisplayMatrix): DisplayMatrix => {
  const newMatrix = Array(matrix.length + 2)
    .fill(null)
    .map(() => {
      return Array(matrix[0].length + 2).fill({ on: false });
    });
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      newMatrix[i + 1][j + 1] = matrix[i][j];
    }
  }
  return newMatrix;
};
const stringToPaddedOneMatrix = (str: string) => {
  const paddedBlockCols = BLOCK_COLS + 2;
  const paddedBlockRows = BLOCK_ROWS + 2;
  const matrix = createBaseMatrix(
    paddedBlockRows,
    paddedBlockCols * str.length
  );
  str.split("").forEach((char, idx) => {
    const colOffset = idx * paddedBlockCols;
    const letterMatrix = padOne(letters[char]);
    for (let i = 0; i < paddedBlockRows; i++) {
      for (let j = 0; j < paddedBlockCols; j++) {
        matrix[i][j + colOffset] = letterMatrix[i][j];
      }
    }
  });
  return matrix;
};

const infoStringToMatrix = (str: string) => {
  const [zeroOne, _rows, _cols] = str.split(",");
  const rows = Number(_rows);
  const cols = Number(_cols);
  const matrix = createBaseMatrix(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = { on: zeroOne[i * cols + j] === "1" };
    }
  }
  return matrix;
};
export type { DisplayMatrix, MatrixItem };
export {
  renderMatrix,
  createBaseMatrix,
  BlockJSONWriter,
  padOne,
  stringToPaddedOneMatrix,
  getMatrixInfoString,
  parseMatrixStringToMatrix,
  infoStringToMatrix,
};
