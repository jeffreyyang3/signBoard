import React from "react";
import { createBaseMatrix, renderMatrix } from "../matrix";
import { DisplayMatrix } from "../matrix";
import { padOne } from "../matrix";
import letters from "../letters/lettersTS";
const blockRows = 7 + 2;
const blockCols = 5 + 2;

const StringMatrixView = ({ str }: { str: string }) => {
  const matrixRows = blockRows;
  const matrixCols = blockCols * str.length;
  const matrix = createBaseMatrix(matrixRows, matrixCols);

  str.split("").forEach((char, idx) => {
    const colOffset = idx * blockCols;
    const letterMatrix = padOne(letters[char]);

    for (let i = 0; i < blockRows; i++) {
      for (let j = 0; j < blockCols; j++) {
        matrix[i][j + colOffset] = letterMatrix[i][j];
      }
    }
  });
  const matrixToString = () => {
    const vals = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        vals.push(matrix[i][j].on ? 1 : 0);
      }
    }
    return vals.join('');
  };
  return (
    <div>
    <div>rows: {matrix.length}</div>
    <div>cols: {matrix[0].length}</div>
    {matrixToString()}
    {renderMatrix(matrix, () => {})}</div>
  );
};

interface Props {}
interface State {
  lineOne: string;
  lineTwo: string;
}

class BoardView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lineOne: "",
      lineTwo: "",
    };
  }

  render() {
    return (
      <div>
        <h1>this is the board</h1>
        line 1{" "}
        <input
          type="text"
          value={this.state.lineOne}
          onChange={(e) =>
            this.setState({
              lineOne: e.target.value,
            })
          }
        />
        line 1{" "}
        <input
          type="text"
          value={this.state.lineTwo}
          onChange={(e) =>
            this.setState({
              lineTwo: e.target.value,
            })
          }
        />
        <div>
          line one is <strong>{this.state.lineOne}</strong>
          <br />
          line two is <strong>{this.state.lineTwo}</strong>
        </div>
        <StringMatrixView str={this.state.lineOne}></StringMatrixView>
      </div>
    );
  }
}
export default BoardView;
