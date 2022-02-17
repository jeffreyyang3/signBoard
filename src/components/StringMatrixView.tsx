import { renderMatrix, stringToPaddedOneMatrix } from "../matrix";
const blockRows = 7 + 2;
const blockCols = 5 + 2;

const StringMatrixView = ({ str }: { str: string }) => {
  const matrixRows = blockRows;
  const matrixCols = blockCols * str.length;
  const matrix = stringToPaddedOneMatrix(str);

  return (
    <div>
      <div>rows bobo: {matrix.length}</div>
      <div>cols: {matrix[0].length}</div>
      {renderMatrix(matrix, () => {})}
    </div>
  );
};

export default StringMatrixView;
