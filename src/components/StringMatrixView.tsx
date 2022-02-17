import {
  renderMatrix,
  stringToPaddedOneMatrix,
  getMatrixInfoString,
} from "../matrix";

const StringMatrixView = ({ str }: { str: string }) => {
  const matrix = stringToPaddedOneMatrix(str);

  return (
    <div>
      {renderMatrix(matrix, () => {})}
      {/* <div>two</div>
      {renderMatrix(
        parseMatrixStringToMatrix(getMatrixInfoString(matrix)),
        () => {}
      )} */}
    </div>
  );
};

export default StringMatrixView;
