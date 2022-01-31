import _letters from "../letters/letters.json";
import React from "react";
import { DisplayMatrix, renderMatrix } from "../matrix";
import { Link } from "react-router-dom";

const letters: {
  [key: string]: DisplayMatrix;
} = _letters;
type letterMatrixPairType = {
  char: string;
  matrix: DisplayMatrix;
}[];

const DictTable = ({
  letterMatrixPairs,
}: {
  letterMatrixPairs: letterMatrixPairType;
}) => {
  console.log(letterMatrixPairs);
  return (
    <table>
      <tbody>
        <tr>
          <th>character</th>
          <th>matrix representation</th>
          <th>link to edit</th>
        </tr>
        {letterMatrixPairs
          .sort((a, b) => (a.char > b.char ? 1 : -1))
          .map(({ char, matrix }) => {
            return (
              <tr key={char}>
                <td>
                  <h1>{char.toUpperCase()}</h1>
                </td>
                <td>{renderMatrix(matrix, () => {})}</td>
                <td>
                  <Link state={{ initial: matrix }} to="/editor">
                    to edit
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
class Dictionary extends React.Component {
  letterMatrixPairs(): letterMatrixPairType {
    return Object.keys(letters).map((char) => ({
      char,
      matrix: letters[char],
    }));
  }
  render() {
    return (
      <div>
        <h1>this is the dictionary</h1>
        <DictTable letterMatrixPairs={this.letterMatrixPairs()} />
      </div>
    );
  }
}
export default Dictionary;
