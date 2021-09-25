import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJsonData } from "../../dataSlice";

export const Export = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data.dataState);
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(getJsonData());
    }
  }, [dispatch, dataState]);

  return (<h2>Export</h2>);
}