import { useEffect, useState } from "react";
import { get } from "../helpers/apiClient";
import { MatrixDisplayInfo } from "../types";
export default () => {
  const [presets, setPresets] = useState("loading");
  useEffect(() => {
    (async function () {
      const res = (await get({
        path: "presets",
      })) as [MatrixDisplayInfo];
      console.log(res);
      setPresets(JSON.stringify(res));
    })();
  });
  return (
    <div>
      <h1>all presets view</h1>
      <div>data: {presets}</div>
    </div>
  );
};
