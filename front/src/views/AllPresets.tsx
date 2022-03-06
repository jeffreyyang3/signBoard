import { useEffect, useState } from "react";
import { get } from "../helpers/apiClient";
import { MatrixDisplayInfo } from "../types";
import { infoStringToMatrix, renderMatrix } from "../matrix";
export default () => {
  const [presets, setPresets] = useState([] as Array<MatrixDisplayInfo>);
  useEffect(() => {
    (async function () {
      const res = (await get({
        path: "presets",
      })) as Array<MatrixDisplayInfo>;
      setPresets(res);
    })();
  });
  return (
    <div>
      <h1>all presets view</h1>
      <div>
        {presets.map(({ info_string, title }, idx) => {
          return (
            <>
              <h1 className="is-size-3">{title}</h1>
              <div key={idx}>
                {renderMatrix(infoStringToMatrix(info_string), () => {})}
              </div>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
};
